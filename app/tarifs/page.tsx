import { createClient } from "@/lib/supabase/server";
import { AI_FEATURES_ENABLED } from "@/lib/ai/feature-flag";
import { CheckoutButton } from "./checkout-button";
import { ComparisonTable } from "@/app/comparison-table";

const ctaClass =
  "block w-full rounded-[var(--radius-sm)] bg-primary px-4 py-3 text-center text-sm font-bold text-white shadow-[0_4px_0_var(--primary-dark)]";

export default async function TarifsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-10 text-center">
        <a href="/" className="mb-6 inline-flex items-center gap-2.5 font-display text-lg font-bold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            C
          </span>
          CVento
        </a>
        <h1 className="text-3xl font-bold">Des tarifs simples</h1>
        <p className="mt-2 text-ink-soft">Commencez gratuitement, passez au Pro quand vous en avez besoin.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Gratuit */}
        <div className="rounded-[var(--radius-lg)] border border-line bg-surface p-6">
          <h2 className="font-display text-lg font-semibold">Gratuit</h2>
          <p className="mt-1 text-2xl font-bold">0 €</p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-ink-soft">
            <li>1 CV actif</li>
            <li>1 template</li>
            <li>IA limitée{!AI_FEATURES_ENABLED && " (bientôt disponible)"}</li>
            <li>Export PDF avec mention CVento</li>
          </ul>
          <a href="/signup" className="mt-6 block rounded-[var(--radius-sm)] border-2 border-line px-4 py-3 text-center text-sm font-bold text-ink hover:border-primary">
            Commencer gratuitement
          </a>
        </div>

        {/* Mensuel */}
        <div className="rounded-[var(--radius-lg)] border-2 border-primary bg-surface p-6">
          <p className="mb-2 inline-block rounded-full bg-primary-tint px-2 py-1 text-xs font-bold text-primary-dark">
            Le plus flexible
          </p>
          <h2 className="font-display text-lg font-semibold">Pro mensuel</h2>
          <p className="mt-1 text-2xl font-bold">9,90 €<span className="text-sm font-normal text-ink-faint">/mois</span></p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-ink-soft">
            <li>CV illimités</li>
            <li>15-20 templates</li>
            <li>IA illimitée + ciblage mots-clés{!AI_FEATURES_ENABLED && " (bientôt disponible)"}</li>
            <li>Lettre de motivation IA{!AI_FEATURES_ENABLED && " (bientôt disponible)"}</li>
            <li>Préparation d&apos;entretien{!AI_FEATURES_ENABLED && " (bientôt disponible)"}</li>
            <li>Export PDF et Word sans filigrane</li>
          </ul>
          <CheckoutButton plan="monthly" loggedIn={!!user} className={`${ctaClass} mt-6`}>
            Passer au Pro
          </CheckoutButton>
        </div>

        {/* Annuel */}
        <div className="rounded-[var(--radius-lg)] border border-line bg-surface p-6">
          <p className="mb-2 inline-block rounded-full bg-gold-tint px-2 py-1 text-xs font-bold text-gold">
            2 mois offerts
          </p>
          <h2 className="font-display text-lg font-semibold">Pro annuel</h2>
          <p className="mt-1 text-2xl font-bold">79 €<span className="text-sm font-normal text-ink-faint">/an</span></p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-ink-soft">
            <li>Tout le Pro mensuel</li>
            <li>Facturé une fois par an</li>
          </ul>
          <CheckoutButton plan="annual" loggedIn={!!user} className={`${ctaClass} mt-6`}>
            Passer au Pro annuel
          </CheckoutButton>
        </div>

        {/* À vie */}
        <div className="rounded-[var(--radius-lg)] border border-line bg-surface p-6">
          <h2 className="font-display text-lg font-semibold">Accès à vie</h2>
          <p className="mt-1 text-2xl font-bold">149 €<span className="text-sm font-normal text-ink-faint"> une fois</span></p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-ink-soft">
            <li>Tout le Pro, pour toujours</li>
            <li>Aucun engagement récurrent</li>
            <li>Un seul paiement</li>
          </ul>
          <CheckoutButton plan="lifetime" loggedIn={!!user} className={`${ctaClass} mt-6`}>
            Payer une fois, accès à vie
          </CheckoutButton>
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-ink-soft">
        🛡️ Satisfait ou remboursé 14 jours, sans justification —{" "}
        <a href="/cgu" className="text-primary hover:underline">
          voir les CGV
        </a>
        .
      </p>

      <div className="mt-16 border-t border-line pt-16">
        <ComparisonTable />
      </div>

      <footer className="mt-16 border-t border-line pt-8 text-center text-xs text-ink-faint">
        <p>
          Une question avant de vous décider ?{" "}
          <a href="mailto:maelsiohan01@gmail.com" className="text-primary hover:underline">
            maelsiohan01@gmail.com
          </a>
          , on répond vite.
        </p>
      </footer>
    </main>
  );
}
