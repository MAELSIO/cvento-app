"use client";

import { useState, useTransition } from "react";
import { deleteAccount } from "@/lib/actions/profile";

export function DangerZone() {
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deleteAccount();
    });
  }

  return (
    <section className="rounded-[var(--radius-lg)] border border-warn/30 bg-warn-tint p-5">
      <h2 className="mb-2 font-display text-lg font-semibold text-warn">Zone de danger</h2>
      <p className="mb-3 text-sm text-ink-soft">
        Supprimer votre compte efface définitivement votre profil, vos CV, vos lettres de
        motivation et votre historique. Cette action est irréversible.
      </p>
      {!confirming ? (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="rounded-[var(--radius-sm)] border-2 border-warn px-4 py-2 text-sm font-bold text-warn"
        >
          Supprimer mon compte
        </button>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm font-semibold text-warn">Confirmer la suppression définitive ?</p>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="rounded-[var(--radius-sm)] bg-warn px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
          >
            {isPending ? "Suppression..." : "Oui, tout supprimer"}
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            className="text-sm font-semibold text-ink-soft hover:underline"
          >
            Annuler
          </button>
        </div>
      )}
    </section>
  );
}
