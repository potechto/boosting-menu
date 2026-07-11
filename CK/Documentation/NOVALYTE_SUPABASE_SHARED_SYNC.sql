-- Novalyte v6.0.5 shared data setup
-- Run this entire file once in the Supabase SQL Editor.
-- IMPORTANT: Use only the anon/publishable key in the website. Never expose service_role.

create table if not exists public.novalyte_admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.novalyte_admin_profiles enable row level security;

create or replace function public.novalyte_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public, auth
as $$
  select exists (
    select 1
    from public.novalyte_admin_profiles p
    where p.user_id = auth.uid()
  );
$$;

revoke all on function public.novalyte_is_admin() from public;
grant execute on function public.novalyte_is_admin() to authenticated;

create table if not exists public.novalyte_shared_state (
  key text primary key,
  payload jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now(),
  constraint novalyte_shared_state_payload_is_array check (jsonb_typeof(payload) = 'array')
);

alter table public.novalyte_shared_state enable row level security;

drop policy if exists "Novalyte public catalog read" on public.novalyte_shared_state;
create policy "Novalyte public catalog read"
on public.novalyte_shared_state
for select
to anon, authenticated
using (key in ('public_services', 'public_digital_products'));

drop policy if exists "Novalyte admin private read" on public.novalyte_shared_state;
create policy "Novalyte admin private read"
on public.novalyte_shared_state
for select
to authenticated
using (public.novalyte_is_admin());

drop policy if exists "Novalyte admin insert" on public.novalyte_shared_state;
create policy "Novalyte admin insert"
on public.novalyte_shared_state
for insert
to authenticated
with check (public.novalyte_is_admin());

drop policy if exists "Novalyte admin update" on public.novalyte_shared_state;
create policy "Novalyte admin update"
on public.novalyte_shared_state
for update
to authenticated
using (public.novalyte_is_admin())
with check (public.novalyte_is_admin());

drop policy if exists "Novalyte admin delete" on public.novalyte_shared_state;
create policy "Novalyte admin delete"
on public.novalyte_shared_state
for delete
to authenticated
using (public.novalyte_is_admin());

grant select on public.novalyte_shared_state to anon, authenticated;
grant insert, update, delete on public.novalyte_shared_state to authenticated;

-- Public order lookup returns only client-safe fields. It never exposes provider
-- rates, provider charges, profit/revenue, contact details, notes, or target links.
create or replace function public.novalyte_lookup_orders(p_client_ref text)
returns table (
  order_id text,
  client_name text,
  service_name text,
  client_charge numeric,
  status text,
  created_at text,
  order_type text
)
language sql
stable
security definer
set search_path = public
as $$
  select
    coalesce(order_row->>'id', '') as order_id,
    coalesce(order_row->>'clientName', '') as client_name,
    coalesce(order_row->>'serviceName', 'Novalyte order') as service_name,
    case
      when coalesce(order_row->>'clientCharge', '') ~ '^-?[0-9]+([.][0-9]+)?$'
        then (order_row->>'clientCharge')::numeric
      else 0::numeric
    end as client_charge,
    coalesce(order_row->>'status', 'pending') as status,
    coalesce(order_row->>'createdAt', '') as created_at,
    coalesce(order_row->>'orderType', 'service') as order_type
  from public.novalyte_shared_state state_row
  cross join lateral jsonb_array_elements(state_row.payload) as order_row
  where state_row.key = 'orders'
    and length(btrim(coalesce(p_client_ref, ''))) > 0
    and lower(btrim(coalesce(order_row->>'clientName', ''))) = lower(btrim(p_client_ref))
    and coalesce(order_row->>'status', 'pending') not in ('cancelled', 'voided')
  order by coalesce(order_row->>'createdAt', '') desc
  limit 50;
$$;

revoke all on function public.novalyte_lookup_orders(text) from public;
grant execute on function public.novalyte_lookup_orders(text) to anon, authenticated;

-- Public order board for the client page. Returns only the five fields displayed
-- in the prepared order list. Internal costs, revenue, contacts, links, and notes
-- are never returned.
drop function if exists public.novalyte_list_orders();

create function public.novalyte_list_orders()
returns table (
  order_id text,
  provider_id text,
  item_id text,
  service_id text,
  client_name text,
  service_name text,
  client_charge numeric,
  status text,
  created_at text,
  order_type text
)
language sql
stable
security definer
set search_path = public
as $$
  select
    coalesce(order_row->>'id', '') as order_id,
    coalesce(order_row->>'providerId', '') as provider_id,
    coalesce(order_row->>'itemId', '') as item_id,
    coalesce(order_row->>'serviceId', '') as service_id,
    coalesce(order_row->>'clientName', '') as client_name,
    coalesce(order_row->>'serviceName', order_row->>'itemName', 'Novalyte order') as service_name,
    0::numeric as client_charge,
    coalesce(order_row->>'status', 'pending') as status,
    coalesce(order_row->>'createdAt', '') as created_at,
    coalesce(order_row->>'orderType', 'service') as order_type
  from public.novalyte_shared_state state_row
  cross join lateral jsonb_array_elements(state_row.payload) as order_row
  where state_row.key = 'orders'
    and coalesce(order_row->>'status', 'pending') not in ('cancelled', 'voided')
  order by coalesce(order_row->>'createdAt', '') desc
  limit 250;
$$;

revoke all on function public.novalyte_list_orders() from public;
grant execute on function public.novalyte_list_orders() to anon, authenticated;

-- AFTER creating the admin user in Authentication > Users, register that user.
-- Replace the email below, then run this statement separately:
--
-- insert into public.novalyte_admin_profiles (user_id)
-- select id from auth.users where lower(email) = lower('YOUR_ADMIN_EMAIL@example.com')
-- on conflict (user_id) do nothing;
