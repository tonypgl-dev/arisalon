import { ReservationPayload } from '@/types/booking';
import { toMinutes } from '@/lib/utils/dates';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateReservation(payload: ReservationPayload, minBookingHours: number) {
  if (payload.fullName.trim().length < 2) return 'Numele trebuie să aibă cel puțin 2 caractere.';
  if (!emailRegex.test(payload.email)) return 'Adresa de email nu este validă.';
  if (payload.phone.trim().length < 8) return 'Numărul de telefon nu este valid.';
  if (!payload.date) return 'Selectează o dată.';
  if (!payload.startTime || !payload.endTime) return 'Selectează intervalul dorit.';
  if (toMinutes(payload.endTime) <= toMinutes(payload.startTime)) return 'Ora de final trebuie să fie după ora de început.';

  const durationMinutes = toMinutes(payload.endTime) - toMinutes(payload.startTime);
  if (durationMinutes < minBookingHours * 60) {
    return `Durata minimă a rezervării este de ${minBookingHours} ore.`;
  }

  return null;
}
