# CVento

Générateur de CV et lettre de motivation assisté par IA pour le marché français. Plan gratuit limité + plan payant (mensuel / annuel / à vie).

**État actuel : Phase 1 (auth + facturation) et un premier morceau de Phase 2 (éditeur de CV, 1 template, export PDF) sont codés.** Reste à connecter l'IA (rédaction, mots-clés, score détaillé, lettre de motivation, entretien), l'export DOCX, les pages SEO publiques (`/exemples-cv/[metier]`), le blog, et les fonctionnalités de croissance (parrainage, relances email, offre de lancement, parcours de rétention).

**Tout ce code est écrit et compile, mais n'a pas encore tourné contre de vrais comptes Supabase/Stripe/Anthropic** — voir "Mise en route" ci-dessous.

## Stack

Next.js 16 (App Router, TypeScript) · Supabase (Postgres + Auth email/mot de passe + Google OAuth) · Stripe (Checkout mensuel/annuel + paiement unique) · Anthropic (Claude, génération IA — pas encore branché) · `@react-pdf/renderer` (export PDF) · `docx` (export Word — pas encore branché) · Resend (email) · Vercel · Tailwind CSS v4.

> **Next.js 16 a des changements de rupture** par rapport aux versions précédentes : le middleware s'appelle maintenant `proxy.ts` (voir `proxy.ts` à la racine), et `cookies()`/`params` sont asynchrones. Avant de modifier ce projet, lisez `AGENTS.md` et `node_modules/next/dist/docs/`.

## Modèle de compte

Contrairement à un gate "tout ou rien", le dashboard CVento reste accessible aux comptes gratuits — chaque fonctionnalité vérifie individuellement si elle est limitée (`lib/plan.ts` : `hasProAccess`, `FREE_PLAN_MAX_CVS`, `FREE_PLAN_AI_QUOTA_PER_DAY`). Un compte a l'accès Pro s'il est abonné actif/en essai **ou** s'il a payé l'accès à vie (`subscriptions.is_lifetime`).

## Mise en route — étape par étape

### 1. Créer les comptes nécessaires

Aucun de ces comptes ne peut être créé à votre place :

1. **[Supabase](https://supabase.com)** — créez un projet en **région Frankfurt (EU)** (conformité RGPD). Dans _Project Settings > API_ : `Project URL`, clé `anon public`, clé `service_role`.
2. **Google OAuth** — dans [Google Cloud Console](https://console.cloud.google.com), créez des identifiants OAuth 2.0 (type "Application Web"), URI de redirection autorisée : `https://VOTRE-PROJET.supabase.co/auth/v1/callback`. Renseignez ensuite le Client ID/Secret dans Supabase (_Authentication > Providers > Google_).
3. **[Stripe](https://stripe.com)** — **compte séparé et dédié à CVento**, jamais partagé avec un autre produit. Créez le produit "CVento Pro" avec **3 prix** : mensuel récurrent, annuel récurrent, et un prix "one time" pour l'accès à vie. Notez les 3 `price_...`.
4. **[Anthropic](https://console.anthropic.com)** — créez une clé API (_Settings > API Keys_).
5. **[Vercel](https://vercel.com)** — connectez votre compte GitHub.
6. **[Resend](https://resend.com)** — réutilisez le compte existant, ajoutez et vérifiez le domaine `cvento.fr` (_Domains_).

### 2. Configurer la base de données

Dans le SQL Editor de votre projet Supabase, exécutez `supabase/migrations/0001_init.sql`.

### 3. Configurer l'auth dans Supabase

_Authentication > URL Configuration_ : ajoutez `http://localhost:3000` et votre future URL de production aux **Redirect URLs**, avec `/auth/callback` (ex : `https://cvento.fr/auth/callback`).

### 4. Variables d'environnement

```bash
cp .env.example .env.local
```
Remplissez `.env.local` (voir les commentaires du fichier pour où trouver chaque clé).

### 5. Lancer en local

```bash
npm install
npm run dev
```

Ouvrez `http://localhost:3000` → "Créer mon CV gratuitement" → inscription email/mot de passe ou Google → `/dashboard`.

### 6. Tester les webhooks Stripe en local

```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```
Copiez le `whsec_...` affiché dans `STRIPE_WEBHOOK_SECRET`, puis redémarrez `npm run dev`.

### 7. Parcours de test complet (avant toute mise en ligne)

1. Inscription email/mot de passe → vérifier l'email de confirmation → connexion.
2. Inscription/connexion via Google.
3. `/dashboard` → "Créer un CV" → remplir l'éditeur → "Enregistrer" → "Télécharger PDF" → vérifier le PDF (mention "Créé avec CVento" attendue en plan gratuit).
4. Créer un 2ᵉ CV en plan gratuit → doit rediriger vers `/tarifs?limite=cv`.
5. `/tarifs` → tester les 3 boutons (mensuel, annuel, à vie) avec la carte de test `4242 4242 4242 4242`.
6. Vérifier dans Supabase (table `subscriptions`) que `status`/`is_lifetime` se met à jour selon le plan choisi.
7. Repasser en plan gratuit (annuler l'abonnement test) et vérifier que la limite de CV et le filigrane PDF reviennent.

### 8. Déployer sur Vercel

1. Poussez ce repo sur GitHub.
2. Sur Vercel, "Import Project" → ajoutez **toutes** les variables de `.env.local` dans Project Settings > Environment Variables.
3. Ajoutez l'URL de production aux Redirect URLs Supabase, et créez un nouvel endpoint de webhook Stripe pointant vers `https://votre-domaine/api/webhooks/stripe`.
4. Refaites le parcours de test (étape 7) sur l'URL de production en mode Stripe **test** avant de passer en **live**.

## Ce qui n'est pas encore fait

- **IA** : rédaction des points d'expérience, ciblage par mots-clés, score de compatibilité détaillé (20 critères), lettre de motivation, préparation d'entretien — tout branché sur `ANTHROPIC_API_KEY` mais pas encore implémenté.
- Export Word (DOCX) — dépendance `docx` déjà installée, pas encore câblée.
- Templates supplémentaires (15-20 attendus, 1 seul aujourd'hui : "sobre").
- Bibliothèque d'exemples de CV par métier.
- Pages SEO publiques `/exemples-cv/[metier]` et blog.
- Outil de diagnostic gratuit sans inscription (upload d'un CV existant).
- Parrainage, relances email (compte inachevé/panier abandonné), offre de lancement activable, parcours de rétention à l'annulation.
- Extension de navigateur (remplissage auto de candidatures).
- Génération de types TypeScript depuis le schéma Supabase réel (`supabase gen types typescript`).
