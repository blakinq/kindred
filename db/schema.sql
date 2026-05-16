-- kindred schema
-- Run this in the Supabase SQL editor BEFORE policies.sql

create extension if not exists "pgcrypto";

-- ============================================================
-- USERS (mirrors auth.users for app-side joins)
-- ============================================================
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text not null,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-create a public.users row when a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- EVENTS
-- ============================================================
create type event_visibility as enum ('public_link', 'link_invited_only', 'invited_only');
create type event_status as enum ('active', 'archived', 'deleted');
create type location_type as enum ('physical', 'virtual', 'both', 'tbd');

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  host_user_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  event_type text,
  description text,
  event_date date not null,
  start_time time not null,
  end_time time,
  timezone text not null default 'UTC',
  location_type location_type not null default 'tbd',
  location_name text,
  address text,
  virtual_link text,
  rsvp_deadline timestamptz,
  rsvps_closed boolean not null default false,
  plus_one_allowed boolean not null default false,
  max_plus_ones_per_guest integer not null default 0 check (max_plus_ones_per_guest >= 0),
  visibility event_visibility not null default 'public_link',
  guest_list_visible boolean not null default false,
  food_claiming_enabled boolean not null default true,
  task_guest_interaction_enabled boolean not null default false,
  budget_target_cents integer check (budget_target_cents is null or budget_target_cents >= 0),
  currency text not null default 'USD',
  invite_slug text not null unique,
  status event_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists events_host_idx on public.events(host_user_id);
create index if not exists events_slug_idx on public.events(invite_slug);

-- ============================================================
-- CO-HOSTS
-- ============================================================
create table if not exists public.event_cohosts (
  event_id uuid not null references public.events(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (event_id, user_id)
);

-- ============================================================
-- GUESTS
-- ============================================================
create type rsvp_status as enum ('invited', 'going', 'maybe', 'not_going', 'no_response');

create table if not exists public.guests (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  rsvp_status rsvp_status not null default 'no_response',
  party_size integer not null default 1 check (party_size >= 1),
  dietary_restrictions text,
  note text,
  invite_token text not null unique default replace(gen_random_uuid()::text, '-', ''),
  invitation_sent_at timestamptz,
  rsvp_updated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists guests_event_idx on public.guests(event_id);
create index if not exists guests_event_email_idx on public.guests(event_id, lower(email));
create index if not exists guests_token_idx on public.guests(invite_token);

-- ============================================================
-- EXPENSES
-- ============================================================
create type expense_category as enum (
  'food', 'drinks', 'venue', 'decorations', 'supplies',
  'entertainment', 'gifts', 'transportation', 'other'
);
create type payment_status as enum ('unpaid', 'paid', 'reimbursed');

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  name text not null,
  category expense_category not null default 'other',
  estimated_amount_cents integer check (estimated_amount_cents is null or estimated_amount_cents >= 0),
  actual_amount_cents integer check (actual_amount_cents is null or actual_amount_cents >= 0),
  paid_by_name text,
  paid_by_user_id uuid references public.users(id) on delete set null,
  payment_status payment_status not null default 'unpaid',
  expense_date date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists expenses_event_idx on public.expenses(event_id);

-- ============================================================
-- FOOD & SUPPLY ITEMS
-- ============================================================
create type food_category as enum (
  'appetizers', 'main_dishes', 'sides', 'desserts', 'snacks',
  'non_alcoholic_drinks', 'alcoholic_drinks', 'ice',
  'plates_cups_cutlery', 'decorations', 'equipment', 'other_supplies'
);
create type food_status as enum ('needed', 'claimed', 'purchased', 'prepared', 'completed');

create table if not exists public.food_supply_items (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  name text not null,
  category food_category not null default 'other_supplies',
  quantity numeric(10,2),
  unit text,
  needed_count integer not null default 1 check (needed_count >= 1),
  claimed_count integer not null default 0 check (claimed_count >= 0),
  claimed_by_guest_id uuid references public.guests(id) on delete set null,
  claimed_by_name text,
  estimated_cost_cents integer check (estimated_cost_cents is null or estimated_cost_cents >= 0),
  actual_cost_cents integer check (actual_cost_cents is null or actual_cost_cents >= 0),
  status food_status not null default 'needed',
  is_guest_claimable boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (claimed_count <= needed_count)
);

create index if not exists food_items_event_idx on public.food_supply_items(event_id);

-- ============================================================
-- TASKS
-- ============================================================
create type assignee_type as enum ('host', 'cohost', 'guest', 'unassigned');
create type task_priority as enum ('low', 'medium', 'high');
create type task_status as enum ('not_started', 'in_progress', 'blocked', 'done');
create type task_visibility as enum ('host_only', 'assignee_visible', 'all_participants');

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  title text not null,
  description text,
  assignee_type assignee_type not null default 'unassigned',
  assignee_user_id uuid references public.users(id) on delete set null,
  assignee_guest_id uuid references public.guests(id) on delete set null,
  assignee_name text,
  due_date date,
  priority task_priority not null default 'medium',
  status task_status not null default 'not_started',
  visibility task_visibility not null default 'host_only',
  created_by_user_id uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tasks_event_idx on public.tasks(event_id);

-- ============================================================
-- MENU ITEMS (host-planned dishes — what they're cooking)
-- ============================================================
create type menu_course as enum (
  'appetizer', 'main', 'side', 'dessert', 'drink', 'snack', 'other'
);
create type menu_status as enum (
  'planning', 'shopping', 'prepping', 'cooking', 'ready'
);
create type dietary_tag as enum (
  'vegetarian', 'vegan', 'gluten_free', 'dairy_free',
  'nut_free', 'shellfish_free', 'halal', 'kosher', 'spicy'
);

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  name text not null,
  course menu_course not null default 'main',
  serves integer check (serves is null or serves >= 1),
  dietary_tags dietary_tag[] not null default '{}',
  prep_time_minutes integer check (prep_time_minutes is null or prep_time_minutes >= 0),
  cook_time_minutes integer check (cook_time_minutes is null or cook_time_minutes >= 0),
  recipe_url text,
  notes text,
  status menu_status not null default 'planning',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists menu_items_event_idx on public.menu_items(event_id);

-- ============================================================
-- ACTIVITY LOG
-- ============================================================
create table if not exists public.event_activities (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  actor_type text not null,
  actor_id text,
  action_type text not null,
  entity_type text,
  entity_id text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index if not exists activities_event_idx on public.event_activities(event_id, created_at desc);

-- ============================================================
-- updated_at trigger
-- ============================================================
create or replace function public.tg_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare t text;
begin
  for t in select unnest(array['users','events','guests','expenses','food_supply_items','tasks','menu_items'])
  loop
    execute format('drop trigger if exists set_updated_at on public.%I', t);
    execute format('create trigger set_updated_at before update on public.%I for each row execute function public.tg_set_updated_at()', t);
  end loop;
end$$;
