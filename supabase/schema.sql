create extension if not exists pgcrypto;

create table if not exists public.blocked_time_ranges (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  start_time time not null,
  end_time time not null,
  label text,
  reason text,
  source text default 'manual',
  created_at timestamptz not null default now()
);

create table if not exists public.reservation_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text not null,
  event_type text not null,
  guest_count integer not null default 1,
  date date not null,
  start_time time not null,
  end_time time not null,
  message text,
  status text not null default 'pending' check (status in ('pending','approved','rejected','cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.booking_settings (
  id uuid primary key default gen_random_uuid(),
  opening_time time not null default '08:00',
  closing_time time not null default '23:00',
  min_booking_hours integer not null default 2,
  slot_step_minutes integer not null default 30,
  buffer_minutes integer not null default 0,
  is_enabled boolean not null default true,
  created_at timestamptz not null default now()
);

insert into public.booking_settings (opening_time, closing_time, min_booking_hours, slot_step_minutes, buffer_minutes, is_enabled)
select '08:00', '23:00', 2, 30, 0, true
where not exists (select 1 from public.booking_settings);

alter table public.blocked_time_ranges enable row level security;
alter table public.reservation_requests enable row level security;
alter table public.booking_settings enable row level security;

create policy "public can read blocked ranges"
  on public.blocked_time_ranges
  for select
  using (true);

create policy "public can read booking settings"
  on public.booking_settings
  for select
  using (true);

create policy "public can insert reservation requests"
  on public.reservation_requests
  for insert
  with check (true);
