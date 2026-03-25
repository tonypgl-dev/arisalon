'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils/cn';

const DAYS = ['Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ', 'Du'];
const MONTHS_RO = [
  'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
  'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie',
];

export function AvailabilityCalendar({
  selectedDate,
  onSelect,
}: {
  selectedDate: string;
  onSelect: (date: string) => void;
}) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const todayStr = today.toISOString().slice(0, 10);

  const cells = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1);
    let startDow = firstDay.getDay();
    startDow = startDow === 0 ? 6 : startDow - 1;
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const grid: (number | null)[] = Array(startDow).fill(null);
    for (let d = 1; d <= daysInMonth; d++) grid.push(d);
    while (grid.length % 7 !== 0) grid.push(null);
    return grid;
  }, [viewYear, viewMonth]);

  const rows = useMemo(() => {
    const r: (number | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) {
      r.push(cells.slice(i, i + 7));
    }
    return r;
  }, [cells]);

  function toDateStr(day: number) {
    return `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  }

  return (
    <div className="mx-auto max-w-md space-y-3 rounded-2xl bg-[#f0e6da] p-4 sm:p-6">
      <div className="flex items-center justify-between pb-1">
        <button
          type="button"
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-espresso/15 text-lg text-inksoft transition hover:border-gold hover:text-gold disabled:opacity-25"
        >
          ‹
        </button>
        <p className="font-didot text-2xl tracking-[0.06em] text-espresso">
          {MONTHS_RO[viewMonth]} {viewYear}
        </p>
        <button
          type="button"
          onClick={nextMonth}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-espresso/15 text-lg text-inksoft transition hover:border-gold hover:text-gold"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 border-b border-espresso/[0.06] pb-2">
        {DAYS.map((d) => (
          <div key={d} className="py-1 text-center text-[15px] uppercase tracking-[0.14em] text-espresso/50">
            {d}
          </div>
        ))}
      </div>

      <div className="space-y-0">
        {rows.map((row, ri) => (
          <div key={ri} className={cn('grid grid-cols-7 py-[2px]', ri > 0 && 'border-t border-espresso/[0.04]')}>
            {row.map((day, ci) => {
              const i = ri * 7 + ci;
              if (!day) return <div key={i} />;
              const dateStr = toDateStr(day);
              const past = dateStr < todayStr;
              const selected = dateStr === selectedDate;
              const isToday = dateStr === todayStr;

              return (
                <button
                  key={i}
                  type="button"
                  disabled={past}
                  onClick={() => !past && onSelect(dateStr)}
                  className={cn(
                    'mx-auto flex h-11 w-11 items-center justify-center rounded-lg text-[1.25rem] font-bold transition sm:h-12 sm:w-12 sm:text-[1.5rem]',
                    past && 'cursor-default text-inksoft/25',
                    !past && !selected && 'text-espresso hover:bg-[#e8dcd0] hover:text-gold',
                    selected && 'bg-gold font-medium text-white',
                    isToday && !selected && 'border border-gold/50',
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
