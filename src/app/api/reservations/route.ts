import { NextRequest, NextResponse } from 'next/server';
import { getAvailability } from '@/lib/booking/availability';
import { hasConflict } from '@/lib/booking/slots';
import { validateReservation } from '@/lib/booking/validators';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { ReservationPayload } from '@/types/booking';

const RESERVATION_NOTIFICATION_EMAIL =
  process.env.RESERVATION_NOTIFICATION_EMAIL || '';

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function sendReservationNotification(payload: ReservationPayload) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const notificationEmail = RESERVATION_NOTIFICATION_EMAIL;

  if (!resendApiKey || !notificationEmail) {
    return;
  }

  const from = process.env.RESERVATION_FROM_EMAIL || 'Salon Aristocratic <onboarding@resend.dev>';
  const subject = `Cerere noua rezervare - ${payload.fullName}`;
  const safeMessage = payload.message ? escapeHtml(payload.message) : 'Fara mesaj';

  const html = `
    <h2>Cerere noua de rezervare</h2>
    <p><strong>Nume:</strong> ${escapeHtml(payload.fullName)}</p>
    <p><strong>Telefon:</strong> ${escapeHtml(payload.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Tip eveniment:</strong> ${escapeHtml(payload.eventType)}</p>
    <p><strong>Numar persoane:</strong> ${payload.guestCount}</p>
    <p><strong>Data:</strong> ${escapeHtml(payload.date)}</p>
    <p><strong>Interval:</strong> ${escapeHtml(payload.startTime)} - ${escapeHtml(payload.endTime)}</p>
    <p><strong>Mesaj:</strong><br/>${safeMessage}</p>
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [notificationEmail],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    throw new Error('Notificarea pe email nu a putut fi trimisa.');
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as ReservationPayload;
    const availability = await getAvailability(payload.date);

    const validationError = validateReservation(payload, availability.settings.minBookingHours);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    if (hasConflict(payload.startTime, payload.endTime, availability.blockedRanges)) {
      return NextResponse.json({ error: 'Intervalul selectat a devenit indisponibil. Alege alt slot.' }, { status: 409 });
    }

    const supabase = getSupabaseServerClient();

    if (supabase) {
      const { error } = await supabase.from('reservation_requests').insert({
        full_name: payload.fullName,
        phone: payload.phone,
        email: payload.email,
        event_type: payload.eventType,
        guest_count: payload.guestCount,
        date: payload.date,
        start_time: payload.startTime,
        end_time: payload.endTime,
        message: payload.message || null,
        status: 'pending',
      });

      if (error) {
        return NextResponse.json({ error: 'Nu am putut salva cererea de rezervare.' }, { status: 500 });
      }
    }

    await sendReservationNotification(payload);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Cererea nu a putut fi procesată.' }, { status: 500 });
  }
}
