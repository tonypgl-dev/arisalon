'use client';

import { formatRoDate, getUpcomingDates } from '@/lib/utils/dates';
import { cn } from '@/lib/utils/cn';

export function AvailabilityCalendar({ selectedDate, onSelect }: { selectedDate: string; onSelect: (date: string) => void }) {
  const dates = getUpcomingDates(14);

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-bronze">Alege data</p>
        <p className="mt-2 text-sm leading-7 text-inksoft">Selectează una dintre datele disponibile pentru a vedea intervalele libere.</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-2">
        {dates.map((date) => {
          const selected = date === selectedDate;
          return (
            <button
              key={date}
              type="button"
              onClick={() => onSelect(date)}
              className={cn(
                'rounded-2xl border px-4 py-3 text-left transition',
                selected
                  ? 'border-bronze bg-[#f5ede2] shadow-soft'
                  : 'border-line bg-white/80 hover:bg-white'
              )}
            >
              <span className="block text-[11px] uppercase tracking-[0.18em] text-bronze">Disponibilitate</span>
              <span className="mt-2 block text-sm capitalize text-espresso">{formatRoDate(date)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
