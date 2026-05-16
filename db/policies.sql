-- kindred Row-Level Security policies
-- Run AFTER schema.sql.
--
-- Model:
--   * Host dashboard data is accessed via authenticated users only (host or co-host).
--   * The public invite page does NOT use RLS to read events/guests; it uses a
--     SECURITY DEFINER RPC `get_public_event(slug)` and `submit_rsvp(...)` so the
--     server-side code controls exactly which fields leak to anonymous visitors.
--   * This keeps RLS simple and keeps budget/private fields off the public surface.

alter table public.users               enable row level security;
alter table public.events              enable row level security;
alter table public.event_cohosts       enable row level security;
alter table public.guests              enable row level security;
alter table public.expenses            enable row level security;
alter table public.food_supply_items   enable row level security;
alter table public.tasks               enable row level security;
alter table public.menu_items          enable row level security;
alter table public.event_activities    enable row level security;

-- ============================================================
-- Helper: is_event_member(event_id) -> boolean
-- ============================================================
create or replace function public.is_event_member(p_event_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.events e
    where e.id = p_event_id and e.host_user_id = auth.uid()
  ) or exists (
    select 1 from public.event_cohosts c
    where c.event_id = p_event_id and c.user_id = auth.uid()
  );
$$;

-- ============================================================
-- USERS
-- ============================================================
drop policy if exists users_self_select on public.users;
create policy users_self_select on public.users
  for select using (id = auth.uid());

drop policy if exists users_self_update on public.users;
create policy users_self_update on public.users
  for update using (id = auth.uid());

-- ============================================================
-- EVENTS
-- ============================================================
drop policy if exists events_member_select on public.events;
create policy events_member_select on public.events
  for select using (host_user_id = auth.uid() or public.is_event_member(id));

drop policy if exists events_host_insert on public.events;
create policy events_host_insert on public.events
  for insert with check (host_user_id = auth.uid());

drop policy if exists events_member_update on public.events;
create policy events_member_update on public.events
  for update using (host_user_id = auth.uid() or public.is_event_member(id));

drop policy if exists events_host_delete on public.events;
create policy events_host_delete on public.events
  for delete using (host_user_id = auth.uid());

-- ============================================================
-- CO-HOSTS
-- ============================================================
drop policy if exists cohosts_member_select on public.event_cohosts;
create policy cohosts_member_select on public.event_cohosts
  for select using (public.is_event_member(event_id));

drop policy if exists cohosts_host_write on public.event_cohosts;
create policy cohosts_host_write on public.event_cohosts
  for all using (
    exists (select 1 from public.events e where e.id = event_id and e.host_user_id = auth.uid())
  );

-- ============================================================
-- GUESTS (host-side only; public RSVP goes through RPC)
-- ============================================================
drop policy if exists guests_member_all on public.guests;
create policy guests_member_all on public.guests
  for all using (public.is_event_member(event_id))
  with check (public.is_event_member(event_id));

-- ============================================================
-- EXPENSES
-- ============================================================
drop policy if exists expenses_member_all on public.expenses;
create policy expenses_member_all on public.expenses
  for all using (public.is_event_member(event_id))
  with check (public.is_event_member(event_id));

-- ============================================================
-- FOOD & SUPPLY ITEMS
-- ============================================================
drop policy if exists food_member_all on public.food_supply_items;
create policy food_member_all on public.food_supply_items
  for all using (public.is_event_member(event_id))
  with check (public.is_event_member(event_id));

-- ============================================================
-- TASKS
-- ============================================================
drop policy if exists tasks_member_all on public.tasks;
create policy tasks_member_all on public.tasks
  for all using (public.is_event_member(event_id))
  with check (public.is_event_member(event_id));

-- ============================================================
-- MENU ITEMS
-- ============================================================
drop policy if exists menu_items_member_all on public.menu_items;
create policy menu_items_member_all on public.menu_items
  for all using (public.is_event_member(event_id))
  with check (public.is_event_member(event_id));

-- ============================================================
-- ACTIVITIES
-- ============================================================
drop policy if exists activities_member_select on public.event_activities;
create policy activities_member_select on public.event_activities
  for select using (public.is_event_member(event_id));

drop policy if exists activities_member_insert on public.event_activities;
create policy activities_member_insert on public.event_activities
  for insert with check (public.is_event_member(event_id));

-- ============================================================
-- PUBLIC RPC: get_public_event(slug)
-- Returns only fields safe for anonymous viewers. Never returns budget data.
-- ============================================================
create or replace function public.get_public_event(p_slug text)
returns table (
  id uuid,
  name text,
  event_type text,
  description text,
  event_date date,
  start_time time,
  end_time time,
  timezone text,
  location_type location_type,
  location_name text,
  address text,
  virtual_link text,
  rsvp_deadline timestamptz,
  rsvps_closed boolean,
  plus_one_allowed boolean,
  max_plus_ones_per_guest integer,
  visibility event_visibility,
  food_claiming_enabled boolean,
  host_name text
)
language sql
stable
security definer
set search_path = public
as $$
  select e.id, e.name, e.event_type, e.description, e.event_date, e.start_time,
         e.end_time, e.timezone, e.location_type, e.location_name, e.address,
         e.virtual_link, e.rsvp_deadline, e.rsvps_closed, e.plus_one_allowed,
         e.max_plus_ones_per_guest, e.visibility, e.food_claiming_enabled,
         u.name as host_name
  from public.events e
  join public.users u on u.id = e.host_user_id
  where e.invite_slug = p_slug
    and e.status = 'active'
    and e.visibility in ('public_link', 'link_invited_only');
$$;

grant execute on function public.get_public_event(text) to anon, authenticated;

-- ============================================================
-- PUBLIC RPC: submit_public_rsvp
-- Single-trip RSVP submit + upsert. Server-controlled so anonymous users
-- can never write arbitrary guest fields or other events.
-- ============================================================
create or replace function public.submit_public_rsvp(
  p_slug text,
  p_name text,
  p_email text,
  p_rsvp_status rsvp_status,
  p_party_size integer,
  p_dietary_restrictions text,
  p_note text,
  p_invite_token text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_event public.events%rowtype;
  v_guest_id uuid;
  v_max_party integer;
begin
  select * into v_event from public.events
    where invite_slug = p_slug and status = 'active';

  if not found then
    raise exception 'Event not found';
  end if;

  if v_event.rsvps_closed then
    raise exception 'RSVPs are closed for this event';
  end if;

  -- Plus-one validation
  v_max_party := 1 + coalesce(v_event.max_plus_ones_per_guest, 0);
  if not v_event.plus_one_allowed then v_max_party := 1; end if;
  if p_party_size < 1 or p_party_size > v_max_party then
    raise exception 'Invalid party size (allowed 1..%)', v_max_party;
  end if;

  -- Token-based update path
  if p_invite_token is not null and length(p_invite_token) > 0 then
    update public.guests
       set name = coalesce(nullif(p_name, ''), name),
           email = coalesce(nullif(p_email, ''), email),
           rsvp_status = p_rsvp_status,
           party_size = p_party_size,
           dietary_restrictions = p_dietary_restrictions,
           note = p_note,
           rsvp_updated_at = now()
     where invite_token = p_invite_token and event_id = v_event.id
     returning id into v_guest_id;
    if v_guest_id is not null then
      return v_guest_id;
    end if;
  end if;

  -- Invited-only events require a pre-existing guest match
  if v_event.visibility = 'link_invited_only' then
    update public.guests
       set rsvp_status = p_rsvp_status,
           party_size = p_party_size,
           dietary_restrictions = p_dietary_restrictions,
           note = p_note,
           rsvp_updated_at = now()
     where event_id = v_event.id
       and lower(email) = lower(p_email)
       and p_email is not null
       and length(p_email) > 0
     returning id into v_guest_id;

    if v_guest_id is null then
      raise exception 'No invitation found for this email';
    end if;
    return v_guest_id;
  end if;

  -- Public link: upsert by email (if provided) or insert new
  if p_email is not null and length(p_email) > 0 then
    update public.guests
       set name = coalesce(nullif(p_name, ''), name),
           rsvp_status = p_rsvp_status,
           party_size = p_party_size,
           dietary_restrictions = p_dietary_restrictions,
           note = p_note,
           rsvp_updated_at = now()
     where event_id = v_event.id and lower(email) = lower(p_email)
     returning id into v_guest_id;
    if v_guest_id is not null then
      return v_guest_id;
    end if;
  end if;

  insert into public.guests (
    event_id, name, email, rsvp_status, party_size,
    dietary_restrictions, note, rsvp_updated_at
  ) values (
    v_event.id, p_name, nullif(p_email, ''), p_rsvp_status, p_party_size,
    p_dietary_restrictions, p_note, now()
  )
  returning id into v_guest_id;

  return v_guest_id;
end;
$$;

grant execute on function public.submit_public_rsvp(text, text, text, rsvp_status, integer, text, text, text) to anon, authenticated;

-- ============================================================
-- PUBLIC RPC: get_public_food_items(slug)
-- Returns guest-claimable items for events with food_claiming_enabled.
-- Cost columns are intentionally NOT exposed.
-- ============================================================
create or replace function public.get_public_food_items(p_slug text)
returns table (
  id uuid,
  name text,
  category food_category,
  quantity numeric,
  unit text,
  needed_count integer,
  claimed_count integer,
  claimed_by_name text,
  status food_status,
  notes text
)
language sql
stable
security definer
set search_path = public
as $$
  select i.id, i.name, i.category, i.quantity, i.unit,
         i.needed_count, i.claimed_count, i.claimed_by_name, i.status, i.notes
  from public.food_supply_items i
  join public.events e on e.id = i.event_id
  where e.invite_slug = p_slug
    and e.status = 'active'
    and e.visibility in ('public_link', 'link_invited_only')
    and e.food_claiming_enabled = true
    and i.is_guest_claimable = true
  order by i.category asc, i.created_at asc;
$$;

grant execute on function public.get_public_food_items(text) to anon, authenticated;

-- ============================================================
-- PUBLIC RPC: claim_public_food_item
-- Increments claimed_count by 1 and appends the claimer's name.
-- Row is locked while updating so simultaneous claims can't overflow.
-- ============================================================
create or replace function public.claim_public_food_item(
  p_slug text,
  p_item_id uuid,
  p_guest_name text,
  p_invite_token text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_event public.events%rowtype;
  v_item public.food_supply_items%rowtype;
  v_guest_id uuid;
  v_name text;
  v_new_count integer;
  v_new_name text;
begin
  v_name := nullif(btrim(p_guest_name), '');
  if v_name is null then
    raise exception 'Name is required to claim an item';
  end if;

  select * into v_event from public.events
    where invite_slug = p_slug and status = 'active';
  if not found then raise exception 'Event not found'; end if;
  if v_event.visibility not in ('public_link', 'link_invited_only') then
    raise exception 'Event not found';
  end if;
  if not v_event.food_claiming_enabled then
    raise exception 'Food claiming is turned off for this event';
  end if;

  select * into v_item from public.food_supply_items
    where id = p_item_id and event_id = v_event.id
    for update;
  if not found then raise exception 'Item not found'; end if;
  if not v_item.is_guest_claimable then
    raise exception 'This item is not claimable';
  end if;
  if v_item.claimed_count >= v_item.needed_count then
    raise exception 'Already fully claimed';
  end if;

  if p_invite_token is not null and length(p_invite_token) > 0 then
    select id into v_guest_id from public.guests
      where invite_token = p_invite_token and event_id = v_event.id;
  end if;

  v_new_count := v_item.claimed_count + 1;
  v_new_name := case
    when v_item.claimed_by_name is null or length(btrim(v_item.claimed_by_name)) = 0
      then v_name
    else v_item.claimed_by_name || ', ' || v_name
  end;

  update public.food_supply_items
    set claimed_count = v_new_count,
        claimed_by_name = v_new_name,
        claimed_by_guest_id = coalesce(claimed_by_guest_id, v_guest_id),
        status = case
          when v_new_count >= needed_count then 'claimed'::food_status
          else status
        end
    where id = p_item_id and event_id = v_event.id;

  return p_item_id;
end;
$$;

grant execute on function public.claim_public_food_item(text, uuid, text, text) to anon, authenticated;
