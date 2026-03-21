export function formatRoDate(date: string) {
  return new Intl.DateTimeFormat('ro-RO', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date(`${date}T12:00:00`));
}

export function toMinutes(value: string) {
  const [hours, minutes] = value.split(':').map(Number);
  return hours * 60 + minutes;
}

export function minutesToTime(value: number) {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

export function getUpcomingDates(days = 21) {
  const list: string[] = [];
  const now = new Date();

  for (let index = 0; index < days; index += 1) {
    const current = new Date(now);
    current.setDate(now.getDate() + index);
    list.push(current.toISOString().slice(0, 10));
  }

  return list;
}
