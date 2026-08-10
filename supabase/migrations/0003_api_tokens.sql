-- CVento — jetons d'accès personnels pour l'extension de navigateur.
-- À exécuter après 0001_init.sql et 0002_growth.sql.

-- ---------------------------------------------------------------------
-- api_tokens : jetons longue durée utilisés par l'extension navigateur
-- pour lire les données de remplissage automatique (voir
-- app/api/extension/profile/route.ts). Seul le hash SHA-256 est stocké,
-- jamais le jeton en clair (affiché une seule fois à la création, comme
-- un token GitHub) — voir lib/actions/api-tokens.ts.
-- ---------------------------------------------------------------------
create table if not exists public.api_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  token_hash text not null unique,
  name text not null default 'Extension navigateur',
  created_at timestamptz not null default now(),
  last_used_at timestamptz
);

alter table public.api_tokens enable row level security;

create policy "Un utilisateur gère ses propres jetons"
  on public.api_tokens for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists api_tokens_user_idx on public.api_tokens (user_id);
