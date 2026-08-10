"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cvento_cookie_notice_dismissed";

/**
 * Bandeau d'information, pas un faux choix "accepter/refuser" : CVento ne
 * dépose aujourd'hui qu'un cookie de session strictement nécessaire (voir
 * /cookies), qui n'est pas soumis à consentement RGPD. Le jour où un
 * cookie non nécessaire est ajouté, ce composant devra être remplacé par
 * un vrai bandeau de consentement avec choix accepter/refuser.
 */
export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-ink-soft">
          CVento utilise uniquement un cookie de connexion nécessaire au service, aucun cookie
          de mesure d&apos;audience.{" "}
          <a href="/cookies" className="font-semibold text-primary hover:underline">
            En savoir plus
          </a>
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="flex-none rounded-[var(--radius-sm)] bg-primary px-3 py-1.5 text-xs font-bold text-white"
        >
          Compris
        </button>
      </div>
    </div>
  );
}
