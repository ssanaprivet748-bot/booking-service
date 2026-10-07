-- Таблица заявок на запись
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  service text not null,
  date date not null,
  time time not null,
  status text not null default 'new' check (status in ('new', 'confirmed', 'done', 'cancelled')),
  created_at timestamptz not null default now()
);

-- Включаем Row Level Security
alter table bookings enable row level security;

-- Анонимный пользователь может только создавать заявки
create policy "anon can insert bookings"
  on bookings for insert
  to anon
  with check (true);

-- Авторизованный владелец может читать, обновлять и удалять заявки
create policy "authenticated can select bookings"
  on bookings for select
  to authenticated
  using (true);

create policy "authenticated can update bookings"
  on bookings for update
  to authenticated
  using (true)
  with check (true);

create policy "authenticated can delete bookings"
  on bookings for delete
  to authenticated
  using (true);
