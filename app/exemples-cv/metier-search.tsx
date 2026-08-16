"use client";

import { useMemo, useState } from "react";
import type { MetierExemple } from "@/lib/data/metiers";

export function MetierSearch({ metiers }: { metiers: MetierExemple[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return metiers;
    return metiers.filter((m) => m.nom.toLowerCase().includes(q));
  }, [metiers, query]);

  return (
    <div>
      <label htmlFor="metier-search" className="sr-only">
        Rechercher un métier
      </label>
      <input
        id="metier-search"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher votre métier (ex : comptable, électricien, chef de projet…)"
        className="w-full rounded-[var(--radius)] border border-line bg-surface px-4 py-3 text-sm outline-none focus:border-primary"
      />

      {filtered.length === 0 ? (
        <p className="mt-6 text-sm text-ink-soft">
          Aucun métier ne correspond à « {query} ». Vous pouvez tout de même{" "}
          <a href="/signup" className="text-primary hover:underline">
            créer votre CV
          </a>{" "}
          à partir d&apos;un modèle vierge.
        </p>
      ) : (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {filtered.map((m) => (
            <a
              key={m.slug}
              href={`/exemples-cv/${m.slug}`}
              className="rounded-[var(--radius)] border border-line bg-surface px-4 py-3 text-sm font-semibold hover:border-primary"
            >
              CV {m.nom}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
