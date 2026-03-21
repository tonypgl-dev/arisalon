import { BookingSettings, BlockedRange } from '@/types/booking';

export const defaultSettings: BookingSettings = {
  openingTime: '08:00',
  closingTime: '23:00',
  minBookingHours: 2,
  slotStepMinutes: 30,
  bufferMinutes: 0,
  isEnabled: true
};

export const mockBlockedByDate: Record<string, BlockedRange[]> = {
  '2026-03-23': [
    { id: '1', date: '2026-03-23', startTime: '10:00', endTime: '14:00', label: 'Filmare confirmată' },
    { id: '2', date: '2026-03-23', startTime: '18:00', endTime: '22:00', label: 'Eveniment privat' }
  ],
  '2026-03-24': [
    { id: '3', date: '2026-03-24', startTime: '12:00', endTime: '16:00', label: 'Workshop' }
  ],
  '2026-03-25': [
    { id: '4', date: '2026-03-25', startTime: '08:00', endTime: '11:00', label: 'Ședință foto' },
    { id: '5', date: '2026-03-25', startTime: '17:00', endTime: '23:00', label: 'Rezervare externă' }
  ]
};
