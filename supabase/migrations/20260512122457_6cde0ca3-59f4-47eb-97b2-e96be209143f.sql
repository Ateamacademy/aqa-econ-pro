
create table if not exists public.paid_users (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  stripe_session_id text unique,
  stripe_customer_id text,
  amount_paid integer,
  currency text,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists paid_users_email_idx on public.paid_users (lower(email));

alter table public.paid_users enable row level security;

create policy "Users can view their own paid record"
  on public.paid_users for select
  to authenticated
  using (lower(email) = lower((auth.jwt() ->> 'email')));
