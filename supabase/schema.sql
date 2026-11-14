-- Ikorodu Realtors: run this ONCE in Supabase > SQL Editor > New query > Run.
-- If you use a different admin email, change it in the 5 places marked ADMIN EMAIL.
-- Writing also requires two-step verification (aal2): a password alone can never change anything.

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  ref_no bigint generated always as identity,
  title text not null,
  category text not null default 'Duplex',
  status text not null default 'Available',
  published boolean not null default true,
  price bigint not null default 0,
  net_price bigint not null default 0,
  address text default '',
  area text default '',
  city text default 'Ikorodu',
  bedrooms int,
  bathrooms int,
  toilets int,
  parking int,
  size numeric,
  size_unit text default 'sqm',
  year_built int,
  furnishing text,
  title_documents text default 'Available on request',
  payment_options text default 'Ask us',
  description text default '',
  features text[] default '{}',
  images text[] default '{}',
  video_url text,
  latitude double precision,
  longitude double precision,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.listings enable row level security;

-- Everyone can see published listings
drop policy if exists "Public can read published listings" on public.listings;
create policy "Public can read published listings"
  on public.listings for select
  using (published = true);

-- Only the admin can read everything and add / edit / delete
drop policy if exists "Admin manages listings" on public.listings;
create policy "Admin manages listings"
  on public.listings for all to authenticated
  using ((auth.jwt() ->> 'email') = 'ikorodurealtors@gmail.com' and (auth.jwt() ->> 'aal') = 'aal2')            -- ADMIN EMAIL
  with check ((auth.jwt() ->> 'email') = 'ikorodurealtors@gmail.com' and (auth.jwt() ->> 'aal') = 'aal2');      -- ADMIN EMAIL

-- Storage bucket for photos and videos (publicly viewable)
insert into storage.buckets (id, name, public)
values ('listing-media', 'listing-media', true)
on conflict (id) do nothing;

drop policy if exists "Public can view listing media" on storage.objects;
create policy "Public can view listing media"
  on storage.objects for select
  using (bucket_id = 'listing-media');

drop policy if exists "Admin uploads listing media" on storage.objects;
create policy "Admin uploads listing media"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'listing-media' and (auth.jwt() ->> 'email') = 'ikorodurealtors@gmail.com' and (auth.jwt() ->> 'aal') = 'aal2');   -- ADMIN EMAIL

drop policy if exists "Admin edits listing media" on storage.objects;
create policy "Admin edits listing media"
  on storage.objects for update to authenticated
  using (bucket_id = 'listing-media' and (auth.jwt() ->> 'email') = 'ikorodurealtors@gmail.com' and (auth.jwt() ->> 'aal') = 'aal2');        -- ADMIN EMAIL

drop policy if exists "Admin deletes listing media" on storage.objects;
create policy "Admin deletes listing media"
  on storage.objects for delete to authenticated
  using (bucket_id = 'listing-media' and (auth.jwt() ->> 'email') = 'ikorodurealtors@gmail.com' and (auth.jwt() ->> 'aal') = 'aal2');        -- ADMIN EMAIL
