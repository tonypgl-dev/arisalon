'use client';

import { cn } from '@/lib/utils/cn';

type Props = {
  slots: string[];
  selected: string;
  onSelect: (value: string) => void;
  durationHours: number;
};

function addHours(time: string, hours: number) {
  const [h, m] = time.split(':').map(Number);
  const totalMinutes = h * 60 + m + hours * 60;
  const nextHours = Math.floor(totalMinutes / 60);
  const nextMinutes = totalMinutes % 60;
  return `${String(nextHours).padStart(2, '0')}:${String(nextMinutes).padStart(2, '0')}`;
}

export function TimeSlotPicker({ slots, selected, onSelect, durationHours }: Props) {
  return (
    <div className="space-y-3">
      <p className="text-xs uppercase tracking-[0.24em] text-bronze">Intervale libere</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {slots.length ? (
          slots.map((slot) => {
            const active = slot === selected;
            return (
              <button
                key={slot}
                type="button"
                onClick={() => onSelect(slot)}
                className={cn(
                  'rounded-2xl border px-4 py-4 text-left transition',
                  active
                    ? 'border-bronze bg-[#f3e9dc] shadow-soft'
                    : 'border-line bg-white/80 hover:bg-white'
                )}
              >
                <span className="block text-[11px] uppercase tracking-[0.18em] text-bronze">Disponibil</span>
                <span className="mt-2 block text-base text-espresso">
                  {slot} — {addHours(slot, durationHours)}
                </span>
              </button>
            );
          })
        ) : (
          <p className="rounded-2xl border border-line bg-white/80 px-4 py-4 text-sm leading-7 text-inksoft">
            Nu există intervale disponibile pentru ziua selectată.
          </p>
        )}
      </div>
    </div>
  );
}
