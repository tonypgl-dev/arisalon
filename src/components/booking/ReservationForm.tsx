'use client';

import { useMemo, useState } from 'react';
import { BookingSummary } from '@/components/booking/BookingSummary';
import { BookingSuccess } from '@/components/booking/BookingSuccess';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { ReservationPayload } from '@/types/booking';

type Props = {
  date: string;
  startTime: string;
  minBookingHours: number;
};

function addHours(time: string, hours: number) {
  if (!time) return '';
  const [h, m] = time.split(':').map(Number);
  const totalMinutes = h * 60 + m + hours * 60;
  const nextHours = Math.floor(totalMinutes / 60);
  const nextMinutes = totalMinutes % 60;
  return `${String(nextHours).padStart(2, '0')}:${String(nextMinutes).padStart(2, '0')}`;
}

const initialState = {
  fullName: '',
  phone: '',
  email: '',
  eventType: 'Ședință foto',
  guestCount: '' as unknown as number,
  message: '',
};

export function ReservationForm({ date, startTime, minBookingHours }: Props) {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const endTime = useMemo(() => addHours(startTime, minBookingHours), [startTime, minBookingHours]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccess(false);

    const payload: ReservationPayload = {
      fullName: form.fullName,
      phone: form.phone,
      email: form.email,
      eventType: form.eventType,
      guestCount: Number(form.guestCount),
      date,
      startTime,
      endTime,
      message: form.message,
    };

    setLoading(true);

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'A apărut o eroare la trimiterea cererii.');
      }

      setSuccess(true);
      setForm(initialState);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'A apărut o eroare neașteptată.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <BookingSummary date={date} startTime={startTime} endTime={endTime} />
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          placeholder="Nume și prenume"
          value={form.fullName}
          onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
        />
        <Input
          placeholder="Telefon"
          value={form.phone}
          onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
        />
      </div>
      <Input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Select value={form.eventType} onChange={(event) => setForm((current) => ({ ...current, eventType: event.target.value }))}>
          <option>Ședință foto</option>
          <option>Filmare / Podcast</option>
          <option>Workshop / Curs</option>
          <option>Vernisaj / Expoziție</option>
          <option>Eveniment privat</option>
          <option>Alt tip de proiect</option>
        </Select>
        <Input
          type="number"
          inputMode="numeric"
          min={1}
          placeholder="Numărul persoanelor"
          value={form.guestCount || ''}
          onChange={(event) => setForm((current) => ({ ...current, guestCount: Number(event.target.value) }))}
        />
      </div>
      <Textarea
        placeholder="Spune-ne pe scurt ce fel de eveniment pregătești și ce atmosferă ai în minte."
        value={form.message}
        onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {success ? <BookingSuccess /> : null}
      <Button type="submit" disabled={!date || !startTime || loading} className="w-full sm:w-auto">
        {loading ? 'Trimitem...' : 'Trimite cererea'}
      </Button>
    </form>
  );
}
