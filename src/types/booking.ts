export type BookingSettings = {
  openingTime: string;
  closingTime: string;
  minBookingHours: number;
  slotStepMinutes: number;
  bufferMinutes: number;
  isEnabled: boolean;
};

export type BlockedRange = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  label?: string | null;
};

export type AvailabilityResponse = {
  date: string;
  settings: BookingSettings;
  blockedRanges: BlockedRange[];
  availableSlots: string[];
};

export type ReservationPayload = {
  fullName: string;
  phone: string;
  email: string;
  eventType: string;
  guestCount: number;
  date: string;
  startTime: string;
  endTime: string;
  message?: string;
};
