import { formatRoDate } from '@/lib/utils/dates';

export function BookingSummary({ date, startTime, endTime }: { date: string; startTime: string; endTime: string }) {
  if (!date || !startTime || !endTime) return null;

  return (
    <div className="rounded-[24px] border border-[#e3d5c4] bg-[#f6eee4] p-4 text-sm text-espresso">
      <p className="text-[11px] uppercase tracking-[0.22em] text-bronze">Selecția ta</p>
      <p className="mt-2 capitalize">{formatRoDate(date)}</p>
      <p className="mt-1">{startTime} — {endTime}</p>
      <p className="mt-2 text-inksoft">Cererea este trimisă pentru confirmare. Revenim rapid cu detaliile finale.</p>
    </div>
  );
}
