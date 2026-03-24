'use client';

import { useEffect, useMemo, useState } from 'react';
import { AvailabilityCalendar } from '@/components/booking/AvailabilityCalendar';
import { TimeSlotPicker } from '@/components/booking/TimeSlotPicker';
import { ReservationForm } from '@/components/booking/ReservationForm';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { AvailabilityResponse } from '@/types/booking';
import { getUpcomingDates } from '@/lib/utils/dates';
import { siteContent } from '@/data/site-content';

export function BookingSection() {
  const [selectedDate, setSelectedDate] = useState(getUpcomingDates(1)[0]);
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setSelectedSlots([]);

    async function loadAvailability() {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`/api/availability?date=${selectedDate}`);
        const data = (await response.json()) as AvailabilityResponse & { error?: string };
        if (!response.ok) throw new Error(data.error || 'Nu am putut încărca disponibilitatea.');
        if (active) setAvailability(data);
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : 'A apărut o eroare.');
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadAvailability();
    return () => { active = false; };
  }, [selectedDate]);

  const minHours = availability?.settings.minBookingHours || 2;

  const statusText = useMemo(() => {
    if (loading) return 'Verificăm disponibilitatea...';
    if (error) return error;
    return selectedSlots.length ? `${selectedSlots.length} interval${selectedSlots.length > 1 ? 'e selectate' : ' selectat'}` : '5 intervale disponibile';
  }, [loading, error, selectedSlots.length]);

  return (
    <section id="rezervare" className="py-8 sm:py-10 lg:py-12">
      <div className="section-shell space-y-6">
        <SectionTitle kicker="Rezervare" title={siteContent.bookingTitle} text={siteContent.bookingText} />
        <div className="grid gap-6 xl:grid-cols-[1.02fr,0.98fr]">

          {/* Left: calendar + slots */}
          <div className="card-soft space-y-6 p-6 sm:p-8">
            <AvailabilityCalendar selectedDate={selectedDate} onSelect={setSelectedDate} />

            <div className="flex items-center justify-between border-t border-line/40 pt-4">
              <p className="text-xs text-inksoft/70">{statusText}</p>
            </div>

            {!loading && !error && (
              <TimeSlotPicker
                selected={selectedSlots}
                onSelect={setSelectedSlots}
              />
            )}
          </div>

          {/* Right: form */}
          <div className="card-soft p-6 sm:p-8">
            <h3 className="font-didot text-[1.7rem] tracking-[0.04em] text-gold sm:text-[2rem]">Trimite detaliile tale</h3>
            <p className="mt-3 text-sm leading-7 text-inksoft">
              Completează datele de contact, selectează intervalul preferat și spune-ne pe scurt ce tip de eveniment pregătești.
            </p>
            <div className="mt-6">
              <ReservationForm date={selectedDate} selectedSlots={selectedSlots} minBookingHours={minHours} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
