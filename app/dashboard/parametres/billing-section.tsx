"use client";

import { useState, useTransition } from "react";
import {
  pauseSubscriptionOneMonth,
  applyRetentionDiscount,
  confirmCancellation,
} from "@/lib/actions/billing";

type Step = "idle" | "retention" | "confirmed";

export function BillingSection({
  status,
  isLifetime,
  hasStripeSubscription,
  currentPeriodEnd,
}: {
  status: string;
  isLifetime: boolean;
  hasStripeSubscription: boolean;
  currentPeriodEnd: string | null;
}) {
  const [step, setStep] = useState<Step>("idle");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [portalLoading, setPortalLoading] = useState(false);

  async function openPortal() {
    setPortalLoading(true);
    const res = await fetch("/api/portal", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else {
      setError(data.error ?? "Impossible d'ouvrir la facturation.");
      setPortalLoading(false);
    }
  }

  function handlePause() {
    setError("");
    startTransition(async () => {
      try {
        await pauseSubscriptionOneMonth();
        setStep("confirmed");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur.");
      }
    });
  }

  function handleDiscount() {
    setError("");
    startTransition(async () => {
      try {
        await applyRetentionDiscount();
        setStep("confirmed");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur.");
      }
    });
  }

  function handleConfirmCancel() {
    setError("");
    startTransition(async () => {
      try {
        await confirmCancellation();
        setStep("confirmed");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur.");
      }
    });
  }

  return (
    <section className="rounded-[var(--radius-lg)] border border-line bg-surface p-5">
      <h2 className="mb-3 font-display text-lg font-semibold">Facturation</h2>

      {isLifetime ? (
        <p className="text-sm text-ink-soft">
          Vous avez un accès CVento Pro à vie. Rien à gérer, rien à renouveler.
        </p>
      ) : !hasStripeSubscription ? (
        <div>
          <p className="mb-3 text-sm text-ink-soft">Vous êtes actuellement en plan gratuit.</p>
          <a
            href="/tarifs"
            className="inline-block rounded-[var(--radius-sm)] bg-primary px-4 py-2 text-sm font-bold text-white shadow-[0_4px_0_var(--primary-dark)]"
          >
            Passer au Pro
          </a>
        </div>
      ) : step === "confirmed" ? (
        <p className="rounded-[var(--radius-sm)] bg-primary-tint p-3 text-sm text-primary-dark">
          C&apos;est fait. Si vous avez choisi la pause ou la réduction, votre accès Pro continue.
          Si vous avez confirmé la résiliation, votre accès reste actif jusqu&apos;à la fin de la
          période déjà payée{currentPeriodEnd ? ` (${new Date(currentPeriodEnd).toLocaleDateString("fr-FR")})` : ""}.
        </p>
      ) : step === "retention" ? (
        <div>
          <p className="mb-4 text-sm font-semibold">Avant de partir, un mot :</p>
          <div className="flex flex-col gap-3">
            <div className="rounded-[var(--radius)] border border-line p-4">
              <p className="text-sm font-semibold">Mettre en pause 1 mois</p>
              <p className="mt-1 text-xs text-ink-soft">
                Aucun prélèvement pendant 30 jours, vous gardez l&apos;accès Pro. Reprend automatiquement ensuite.
              </p>
              <button
                type="button"
                onClick={handlePause}
                disabled={isPending}
                className="mt-2 rounded-[var(--radius-sm)] bg-primary px-3 py-2 text-xs font-bold text-white disabled:opacity-60"
              >
                Mettre en pause
              </button>
            </div>
            <div className="rounded-[var(--radius)] border border-line p-4">
              <p className="text-sm font-semibold">Rappel de ce que vous perdez</p>
              <p className="mt-1 text-xs text-ink-soft">
                CV illimités, IA illimitée, ciblage mots-clés, score détaillé, lettre de motivation,
                préparation d&apos;entretien, export sans filigrane.
              </p>
              <button
                type="button"
                onClick={handleDiscount}
                disabled={isPending}
                className="mt-2 rounded-[var(--radius-sm)] border-2 border-line px-3 py-2 text-xs font-bold text-ink hover:border-primary disabled:opacity-60"
              >
                Voir si une réduction est disponible
              </button>
            </div>
            <button
              type="button"
              onClick={handleConfirmCancel}
              disabled={isPending}
              className="text-xs font-semibold text-warn hover:underline disabled:opacity-60"
            >
              Non merci, résilier quand même
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-3 text-sm text-ink-soft">
            Statut : <span className="font-semibold">{status === "active" ? "actif" : status === "trialing" ? "en essai" : status}</span>
            {currentPeriodEnd && ` · renouvellement le ${new Date(currentPeriodEnd).toLocaleDateString("fr-FR")}`}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={openPortal}
              disabled={portalLoading}
              className="rounded-[var(--radius-sm)] border-2 border-line px-4 py-2 text-sm font-bold text-ink hover:border-primary disabled:opacity-60"
            >
              {portalLoading ? "Ouverture..." : "Gérer ma facturation"}
            </button>
            <button
              type="button"
              onClick={() => setStep("retention")}
              className="rounded-[var(--radius-sm)] px-4 py-2 text-sm font-semibold text-warn hover:underline"
            >
              Résilier mon abonnement
            </button>
          </div>
        </div>
      )}

      {error && <p className="mt-3 text-sm font-semibold text-warn">{error}</p>}
    </section>
  );
}
