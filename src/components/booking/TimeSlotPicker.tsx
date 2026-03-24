'use client';

import { cn } from '@/lib/utils/cn';

export const FIXED_SLOTS = [
  { start: '07:00', end: '10:00' },
  { start: '10:00', end: '13:00' },
  { start: '13:00', end: '15:00' },
  { start: '15:00', end: '18:00' },
  { start: '18:00', end: '22:00' },
];

type Props = {
  selected: string[];
  onSelect: (slots: string[]) => void;
};

export function TimeSlotPicker({ selected, onSelect }: Props) {
  const allSelected = selected.length === FIXED_SLOTS.length;

  function toggle(start: string) {
    if (selected.includes(start)) {
      onSelect(selected.filter((s) => s !== start));
    } else {
      onSelect([...selected, start]);
    }
  }

  function toggleAll() {
    onSelect(allSelected ? [] : FIXED_SLOTS.map((s) => s.start));
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.24em] text-gold">Intervale disponibile</p>
        <button
          type="button"
          onClick={toggleAll}
          className={cn(
            'rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em] border transition',
            allSelected
              ? 'border-gold bg-gold text-white'
              : 'border-line text-bronze hover:border-bronze'
          )}
        >
          {allSelected ? 'Deselectează tot' : 'Toată ziua'}
        </button>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {FIXED_SLOTS.map(({ start, end }) => {
          const active = selected.includes(start);
          return (
            <button
              key={start}
              type="button"
              onClick={() => toggle(start)}
              className={cn(
                'rounded-xl border px-4 py-3 text-left transition',
                active
                  ? 'border-gold bg-[#f5ede2] shadow-soft'
                  : 'border-line bg-white/80 hover:bg-white'
              )}
            >
              <span className={cn('block text-[10px] uppercase tracking-[0.18em]', active ? 'text-gold' : 'text-bronze/60')}>
                {active ? 'Selectat' : 'Disponibil'}
              </span>
              <span className="mt-1 block text-sm font-medium text-espresso">
                {start} — {end}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
