# CVento

Générateur de CV et lettre de motivation assisté par IA pour le marché français. Plan gratuit limité + plan payant (mensuel / annuel / à vie).

**État actuel : le cahier des charges est codé de bout en bout** — auth, facturation (mensuel/annuel/à vie), éditeur de CV (1 template ATS-safe), IA (rédaction, ciblage mots-clés, score détaillé, lettre de motivation, entretien), export PDF/DOCX, diagnostic gratuit sans inscription, pages SEO `/exemples-cv/[metier]`, blog, parrainage, relances email, offre de lancement activable, parcours de rétention à l'annulation.

**Tout ce code est écrit, compile (`npm run build` propre) et a été testé en local avec des clés factices — mais n'a jamais tourné contre de vrais comptes Supabase/Stripe/Anthropic/Resend.** Voir "Mise en route" ci-dessous ; c'est la seule chose qui reste à faire pour un lancement réel.

Reste hors code, volontairement non couvert par un MVP : plus de templates (15-20 visés, 1 aujourd'hui : "sobre"), bibliothèque de centaines d'exemples de CV (20 métiers de départ aujourd'hui, structure extensible sans changement de code), extension de navigateur, génération de types TypeScript depuis le schéma Supabase réel.

## Stack

Next.js 16 (App Router, TypeScript) · Supabase (Postgres + Auth email/mot de passe + Google OAuth) · Stripe (Checkout mensuel/annuel + paiement unique) · Anthropic Claude (rédaction, ciblage mots-clés, score, lettre de motivation, entretien) · `@react-pdf/renderer` + `docx` (export PDF/Word) · `pdf-parse` + `mammoth` (diagnostic gratuit) · Resend (email) · Vercel · Tailwind CSS v4.

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

Dans le SQL Editor de votre projet Supabase, exécutez **dans l'ordre** `supabase/migrations/0001_init.sql` puis `0002_growth.sql`.

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

**Auth et CV**
1. Inscription email/mot de passe → vérifier l'email de confirmation → connexion.
2. Inscription/connexion via Google.
3. `/dashboard` → "Créer un CV" → remplir l'éditeur → "✨ Générer avec l'IA" sur une expérience → "Enregistrer" → "Télécharger PDF" (mention "Créé avec CVento" attendue en plan gratuit) — "Word (Pro)" doit rester grisé en plan gratuit.
4. Coller une offre d'emploi dans "Poste visé" → "✨ Analyser les mots-clés" → vérifier les badges trouvés/manquants.
5. Vérifier le score de compatibilité : détail complet visible seulement en Pro, teaser (3 critères) en gratuit.
6. Créer un 2ᵉ CV en plan gratuit → doit rediriger vers `/tarifs?limite=cv`.
7. Dépasser 5 générations IA dans la journée en plan gratuit → message de quota atteint.

**Lettre de motivation et entretien**
8. `/dashboard/lettres` → nouvelle lettre pour un CV → "✨ Générer avec l'IA" → vérifier la cohérence avec le CV et l'offre ciblée.
9. `/dashboard/entretien` → générer des questions pour un CV avec poste visé → répondre → "Obtenir un feedback IA".

**Facturation (3 plans)**
10. `/tarifs` → tester les 3 boutons (mensuel, annuel, à vie) avec la carte de test `4242 4242 4242 4242`.
11. Vérifier dans Supabase (table `subscriptions`) que `status`/`is_lifetime` se met à jour selon le plan choisi.
12. `/dashboard/parametres` → "Résilier mon abonnement" → vérifier le parcours de rétention (pause 1 mois, puis résiliation confirmée) avant de repasser en plan gratuit.
13. "Supprimer mon compte" → vérifier la suppression réelle dans Supabase (cascade sur toutes les tables).

**Croissance**
14. `/diagnostic` → uploader un CV PDF et un CV DOCX existants → vérifier un score cohérent sans compte.
15. `/dashboard/parrainage` → copier le lien → ouvrir `/signup?ref=VOTRECODE` dans une fenêtre privée, créer un compte → vérifier +10 crédits IA des deux côtés (table `subscriptions.bonus_ai_credits`).
16. Activer l'offre de lancement : `curl -X POST https://votre-domaine/api/admin/launch-offer -H "x-admin-key: VOTRE_ADMIN_KEY" -d '{"active":true,"message":"..."}'` → vérifier la bannière sur `/`.
17. Appeler `/api/cron/relances` avec `Authorization: Bearer VOTRE_CRON_SECRET` → vérifier l'envoi (compte sans CV après 24h, compte gratuit avec CV après 3 jours) et l'absence de doublon au second appel.

### 8. Déployer sur Vercel

1. Poussez ce repo sur GitHub.
2. Sur Vercel, "Import Project" → ajoutez **toutes** les variables de `.env.local` dans Project Settings > Environment Variables, y compris `CRON_SECRET` et `ADMIN_KEY` (générez des chaînes aléatoires longues).
3. Ajoutez l'URL de production aux Redirect URLs Supabase, et créez un nouvel endpoint de webhook Stripe pointant vers `https://votre-domaine/api/webhooks/stripe`.
4. Vercel active automatiquement le cron défini dans `vercel.json` (relances email, quotidien) dès le déploiement.
5. Refaites le parcours de test (étape 7) sur l'URL de production en mode Stripe **test** avant de passer en **live**.

## Ce qui reste volontairement hors scope

- Plus de templates de CV (15-20 visés au cahier des charges, 1 aujourd'hui : "sobre" — architecture prête pour en ajouter dans `lib/pdf/`, `lib/docx/`, `app/dashboard/cv/[id]/cv-preview.tsx`).
- Bibliothèque de centaines d'exemples de CV (20 métiers de départ dans `lib/data/metiers.ts`, structure réutilisable — ajouter des entrées ne demande aucun changement de code).
- Extension de navigateur (remplissage automatique de candidatures).
- Génération de types TypeScript depuis le schéma Supabase réel (`supabase gen types typescript`) — le code type les entités manuellement.
