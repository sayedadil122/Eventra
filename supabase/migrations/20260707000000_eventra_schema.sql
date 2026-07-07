-- Eventra PostgreSQL schema for Supabase production setup.
-- Run after creating a Supabase project and enabling Auth.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null unique,
  role text not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  event_type text not null,
  event_date date not null,
  city text not null,
  guest_count integer not null check (guest_count > 0),
  total_budget numeric(12,2) not null check (total_budget >= 0),
  functions integer not null default 1,
  services text[] not null default '{}',
  priorities text[] not null default '{}',
  style text,
  status text not null default 'planning',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.budget_categories (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  name text not null,
  recommended numeric(12,2) not null default 0,
  percent numeric(5,2) not null default 0,
  risk text not null default 'Low',
  locked boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vendors (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete set null,
  name text not null,
  category text not null,
  location text,
  listed_price numeric(12,2),
  quoted_price numeric(12,2),
  estimated_final_min numeric(12,2),
  estimated_final_max numeric(12,2),
  match_score integer,
  badge text,
  availability boolean,
  response_time text,
  included text[] not null default '{}',
  excluded text[] not null default '{}',
  confidence text,
  risks text[] not null default '{}',
  questions text[] not null default '{}',
  score_breakdown jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  vendor_id uuid references public.vendors(id) on delete set null,
  vendor_name text not null,
  category text not null,
  quoted_price numeric(12,2) not null,
  quote_text text,
  file_path text,
  analysis jsonb not null default '{}'::jsonb,
  status text not null default 'analysed',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.hidden_costs (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  category text not null,
  name text not null,
  amount_range text not null,
  risk text not null,
  status text not null default 'unconfirmed',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  vendor_id uuid references public.vendors(id) on delete set null,
  vendor_name text not null,
  amount numeric(12,2) not null,
  type text,
  due_date date not null,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.events enable row level security;
alter table public.budget_categories enable row level security;
alter table public.vendors enable row level security;
alter table public.quotes enable row level security;
alter table public.hidden_costs enable row level security;
alter table public.payments enable row level security;

create policy "profiles own rows" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "events own rows" on public.events for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "budget categories via event" on public.budget_categories for all using (exists (select 1 from public.events e where e.id = event_id and e.user_id = auth.uid())) with check (exists (select 1 from public.events e where e.id = event_id and e.user_id = auth.uid()));
create policy "quotes own rows" on public.quotes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "hidden costs via event" on public.hidden_costs for all using (exists (select 1 from public.events e where e.id = event_id and e.user_id = auth.uid())) with check (exists (select 1 from public.events e where e.id = event_id and e.user_id = auth.uid()));
create policy "payments via event" on public.payments for all using (exists (select 1 from public.events e where e.id = event_id and e.user_id = auth.uid())) with check (exists (select 1 from public.events e where e.id = event_id and e.user_id = auth.uid()));
create policy "vendors readable" on public.vendors for select using (true);
create policy "vendors writable by owner" on public.vendors for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
