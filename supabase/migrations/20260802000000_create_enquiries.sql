create table if not exists public.enquiries (
  id uuid primary key,
  received_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 200),
  email text not null check (char_length(email) <= 320),
  phone text not null check (char_length(phone) between 8 and 30),
  service text check (service is null or char_length(service) <= 200),
  property text check (property is null or char_length(property) <= 500),
  message text check (message is null or char_length(message) <= 5000)
);

create index if not exists enquiries_received_at_idx
  on public.enquiries (received_at desc);

alter table public.enquiries enable row level security;

revoke all on table public.enquiries from anon, authenticated;
grant insert, select on table public.enquiries to service_role;

comment on table public.enquiries is
  'Website enquiries inserted only by the server-side Proofit API.';
