import { buildAvailableSlots } from '@/lib/booking/slots';
import { defaultSettings, mockBlockedByDate } from '@/lib/booking/mock';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { AvailabilityResponse, BlockedRange, BookingSettings } from '@/types/booking';

export async function getAvailability(date: string): Promise<AvailabilityResponse> {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    const blockedRanges = mockBlockedByDate[date] || [];
    return {
      date,
      settings: defaultSettings,
      blockedRanges,
      availableSlots: buildAvailableSlots(defaultSettings, blockedRanges),
    };
  }

  const [settingsResult, blockedResult] = await Promise.all([
    supabase.from('booking_settings').select('*').limit(1).maybeSingle(),
    supabase
      .from('blocked_time_ranges')
      .select('*')
      .eq('date', date)
      .order('start_time', { ascending: true }),
  ]);

  const settingsRow = settingsResult.data;
  const blockedRows = blockedResult.data || [];

  const settings: BookingSettings = settingsRow
    ? {
        openingTime: settingsRow.opening_time,
        closingTime: settingsRow.closing_time,
        minBookingHours: settingsRow.min_booking_hours,
        slotStepMinutes: settingsRow.slot_step_minutes,
        bufferMinutes: settingsRow.buffer_minutes,
        isEnabled: settingsRow.is_enabled,
      }
    : defaultSettings;

  const blockedRanges: BlockedRange[] = blockedRows.map((row: any) => ({
    id: row.id,
    date: row.date,
    startTime: row.start_time,
    endTime: row.end_time,
    label: row.label,
  }));

  return {
    date,
    settings,
    blockedRanges,
    availableSlots: buildAvailableSlots(settings, blockedRanges),
  };
}
