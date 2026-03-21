import { BlockedRange, BookingSettings } from '@/types/booking';
import { minutesToTime, toMinutes } from '@/lib/utils/dates';

export function hasConflict(startTime: string, endTime: string, blockedRanges: BlockedRange[]) {
  const start = toMinutes(startTime);
  const end = toMinutes(endTime);

  return blockedRanges.some((range) => {
    const rangeStart = toMinutes(range.startTime);
    const rangeEnd = toMinutes(range.endTime);
    return start < rangeEnd && end > rangeStart;
  });
}

export function buildAvailableSlots(settings: BookingSettings, blockedRanges: BlockedRange[]) {
  const slots: string[] = [];
  const opening = toMinutes(settings.openingTime);
  const closing = toMinutes(settings.closingTime);
  const step = settings.slotStepMinutes;
  const minDuration = settings.minBookingHours * 60;

  for (let start = opening; start + minDuration <= closing; start += step) {
    const startTime = minutesToTime(start);
    const endTime = minutesToTime(start + minDuration);

    if (!hasConflict(startTime, endTime, blockedRanges)) {
      slots.push(startTime);
    }
  }

  return slots;
}
