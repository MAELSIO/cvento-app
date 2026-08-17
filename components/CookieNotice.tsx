"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cvento_consent"; // "accept" | "refuse"
const GA_ID = "G-421LT5NX2J";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function loadGA4() {
  if (window.gtag) return; // déjà chargé
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);
}

/** Supprime les cookies GA déjà déposés (cas d'un refus après un accord précédent). */
function purgeGA4Cookies() {
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    if (/^_ga/.test(name)) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${location.hostname};`;
    }
  });
}

/**
 * Bandeau de consentement réel : Google Analytics n'est chargé qu'après un
 * clic explicite sur "Accepter". "Refuser" est aussi simple qu'accepter,
 * aucune case pré-cochée, choix mémorisé et respecté aux visites suivantes.
 * Le cookie de session Supabase Auth reste actif dans tous les cas : c'est
 * un cookie strictement nécessaire au service, non soumis à consentement.
 */
export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      setVisible(true);
    } else if (existing === "accept") {
      loadGA4();
    }
  }, []);

  function choose(choice: "accept" | "refuse") {
    localStorage.setItem(STORAGE_KEY, choice);
    if (choice === "accept") {
      loadGA4();
    } else {
      purgeGA4Cookies();
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-ink px-4 py-3 text-white shadow-[0_-4px_12px_rgba(0,0,0,0.2)]">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-white/80">
          CVento utilise un cookie de connexion nécessaire au service. Avec votre accord, nous
          utilisons aussi Google Analytics pour mieux comprendre l&apos;usage du site.{" "}
          <a href="/cookies" className="font-semibold text-white underline">
            En savoir plus
          </a>
        </p>
        <div className="flex flex-none gap-2">
          <button
            type="button"
            onClick={() => choose("refuse")}
            className="rounded-[var(--radius-sm)] border border-white/40 px-3 py-1.5 text-xs font-bold text-white"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => choose("accept")}
            className="rounded-[var(--radius-sm)] bg-primary px-3 py-1.5 text-xs font-bold text-white"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
