import { NextRequest, NextResponse } from 'next/server';
import { getAvailability } from '@/lib/booking/availability';
import { hasConflict } from '@/lib/booking/slots';
import { validateReservation } from '@/lib/booking/validators';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { ReservationPayload } from '@/types/booking';

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

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Cererea nu a putut fi procesată.' }, { status: 500 });
  }
}
