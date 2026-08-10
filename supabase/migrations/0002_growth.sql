-- CVento — fonctionnalités de croissance (parrainage, relances, offre de
-- lancement) et quota IA bonus. À exécuter après 0001_init.sql.

-- ---------------------------------------------------------------------
-- bonus_ai_credits : crédits IA supplémentaires gagnés par parrainage,
-- s'ajoutent à FREE_PLAN_AI_QUOTA_PER_DAY (lib/plan.ts) pour les comptes
-- gratuits. Écrit par le serveur uniquement (service_role).
-- ---------------------------------------------------------------------
alter table public.subscriptions
  add column if not exists bonus_ai_credits int not null default 0;

-- ---------------------------------------------------------------------
-- referrals : un code de parrainage par utilisateur, généré à la demande.
-- ---------------------------------------------------------------------
create table if not exists public.referrals (
  code text primary key,
  user_id uuid not null unique references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.referrals enable row level security;

create policy "Un utilisateur lit son propre code de parrainage"
  on public.referrals for select
  using (auth.uid() = user_id);

create policy "Un utilisateur cree son propre code de parrainage"
  on public.referrals for insert
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------
-- referral_redemptions : une ligne par filleul qui s'est inscrit via un
-- lien de parrainage. Un même compte ne peut être filleul qu'une fois.
-- Écrit par le serveur uniquement (service_role, à l'inscription).
-- ---------------------------------------------------------------------
create table if not exists public.referral_redemptions (
  id uuid primary key default gen_random_uuid(),
  code text not null references public.referrals(code) on delete cascade,
  referred_user_id uuid not null unique references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.referral_redemptions enable row level security;

create policy "Un utilisateur voit les filleuls de son propre code"
  on public.referral_redemptions for select
  using (
    exists (
      select 1 from public.referrals r
      where r.code = referral_redemptions.code and r.user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------
-- email_log : historique des emails automatiques envoyés (relances de
-- compte inachevé/non converti), pour ne jamais envoyer deux fois la
-- même relance. Écrit par le serveur uniquement (cron, service_role).
-- ---------------------------------------------------------------------
create table if not exists public.email_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('relance_cv_inacheve', 'relance_non_converti')),
  sent_at timestamptz not null default now()
);

alter table public.email_log enable row level security;

create unique index if not exists email_log_user_kind_idx on public.email_log (user_id, kind);

-- ---------------------------------------------------------------------
-- app_settings : réglages globaux simples (clé/valeur), notamment
-- l'offre de lancement activable/désactivable sans redéploiement.
-- Modifiable uniquement via la route admin (ADMIN_KEY), jamais côté client.
-- ---------------------------------------------------------------------
create table if not exists public.app_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.app_settings enable row level security;

create policy "Les réglages publics sont lisibles par tous"
  on public.app_settings for select
  using (true);

insert into public.app_settings (key, value)
values ('launch_offer', '{"active": false, "message": ""}'::jsonb)
on conflict (key) do nothing;
