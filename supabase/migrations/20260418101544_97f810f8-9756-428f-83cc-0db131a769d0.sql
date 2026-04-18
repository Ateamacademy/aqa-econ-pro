create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  category text not null,
  description text not null,
  user_email text,
  page text not null,
  board text,
  paper_code text,
  question_number text,
  session_id text not null,
  status text not null default 'new'
);

create index if not exists reports_session_created_idx
  on public.reports (session_id, created_at desc);

alter table public.reports enable row level security;

create policy "Anyone can insert reports"
  on public.reports
  for insert
  with check (true);

create policy "Service role can read reports"
  on public.reports
  for select
  using (auth.role() = 'service_role');

create policy "Service role can update reports"
  on public.reports
  for update
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');