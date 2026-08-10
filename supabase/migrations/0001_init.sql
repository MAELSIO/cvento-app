-- CVento — schéma initial (auth, facturation, CV, quotas IA)
-- À exécuter dans Supabase (SQL Editor, ou `supabase db push` avec la CLI).

-- ---------------------------------------------------------------------
-- profiles : infos de profil créées à l'onboarding, 1:1 avec auth.users
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Un utilisateur voit/modifie son propre profil"
  on public.profiles for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ---------------------------------------------------------------------
-- subscriptions : source de vérité pour l'accès aux fonctions Pro.
-- Écrite UNIQUEMENT par les webhooks Stripe (service_role) — jamais par
-- le client, d'où l'absence de policy insert/update pour les users.
-- is_lifetime distingue le paiement unique (pas de stripe_subscription_id,
-- pas de current_period_end, jamais annulé automatiquement).
-- ---------------------------------------------------------------------
create table if not exists public.subscriptions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  status text not null default 'none'
    check (status in ('none', 'trialing', 'active', 'past_due', 'canceled')),
  is_lifetime boolean not null default false,
  price_id text,
  current_period_end timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.subscriptions enable row level security;

create policy "Un utilisateur lit son propre abonnement"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------
-- cvs : un CV = un document éditable. Le plan gratuit est limité à 1 CV
-- actif (contrôlé côté application, pas en base — le nombre de CV
-- autorisés peut évoluer sans migration).
-- ---------------------------------------------------------------------
create table if not exists public.cvs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'Mon CV',
  template text not null default 'sobre',
  content jsonb not null default '{}'::jsonb,
  target_job_title text,
  target_job_description text,
  ats_score int,
  ats_details jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.cvs enable row level security;

create policy "Un utilisateur gère ses propres CV"
  on public.cvs for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------
-- cover_letters : lettres de motivation liées à un CV.
-- ---------------------------------------------------------------------
create table if not exists public.cover_letters (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  cv_id uuid references public.cvs(id) on delete cascade,
  title text not null default 'Ma lettre de motivation',
  content text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.cover_letters enable row level security;

create policy "Un utilisateur gère ses propres lettres"
  on public.cover_letters for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------
-- ai_usage : journal de chaque appel IA, sert à calculer le quota du
-- plan gratuit (génération de contenu limitée par jour/mois). Écrit
-- par le serveur (service_role) au moment de chaque appel IA.
-- ---------------------------------------------------------------------
create table if not exists public.ai_usage (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('bullet', 'keywords', 'score', 'cover_letter', 'interview')),
  created_at timestamptz not null default now()
);

alter table public.ai_usage enable row level security;

create policy "Un utilisateur lit sa propre consommation IA"
  on public.ai_usage for select
  using (auth.uid() = user_id);

create index if not exists ai_usage_user_created_idx on public.ai_usage (user_id, created_at desc);

-- ---------------------------------------------------------------------
-- Trigger : crée automatiquement un profil vide + une ligne subscription
-- "none" à la création d'un compte auth.users (première connexion).
-- ---------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id)
  on conflict (id) do nothing;

  insert into public.subscriptions (user_id, status) values (new.id, 'none')
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------
-- Trigger : met à jour updated_at automatiquement sur cvs/cover_letters.
-- ---------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_updated_at on public.cvs;
create trigger set_updated_at before update on public.cvs
  for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at on public.cover_letters;
create trigger set_updated_at before update on public.cover_letters
  for each row execute function public.set_updated_at();
