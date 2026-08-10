"use client";

import { useMemo } from "react";
import { computeAtsScore } from "@/lib/scoring/ats-score";
import type { CvContent } from "@/lib/types/cv";

const CATEGORY_ORDER = ["Identité", "Structure", "Contenu", "Formatage", "Ciblage"] as const;

function scoreColor(score: number) {
  if (score >= 75) return { text: "text-primary-dark", bg: "bg-primary-tint", ring: "var(--primary)" };
  if (score >= 45) return { text: "text-gold", bg: "bg-gold-tint", ring: "var(--gold)" };
  return { text: "text-warn", bg: "bg-warn-tint", ring: "var(--warn)" };
}

export function CvScore({
  content,
  targetJobTitle,
  isPro,
}: {
  content: CvContent;
  targetJobTitle: string;
  isPro: boolean;
}) {
  const { score, criteria } = useMemo(
    () => computeAtsScore(content, targetJobTitle),
    [content, targetJobTitle]
  );
  const colors = scoreColor(score);

  // Teaser gratuit : seulement les critères en échec les plus impactants, sans détail complet.
  const teaser = criteria.filter((c) => !c.passed).slice(0, 3);

  return (
    <section className="rounded-[var(--radius-lg)] border border-line bg-surface p-5">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-16 w-16 flex-none items-center justify-center rounded-full text-xl font-bold ${colors.bg} ${colors.text}`}
        >
          {score}
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold">Score de compatibilité ATS</h2>
          <p className="text-xs text-ink-soft">
            {criteria.filter((c) => c.passed).length}/{criteria.length} critères validés
          </p>
        </div>
      </div>

      {isPro ? (
        <div className="mt-4 flex flex-col gap-4">
          {CATEGORY_ORDER.map((cat) => {
            const items = criteria.filter((c) => c.category === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat}>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-faint">{cat}</h3>
                <ul className="flex flex-col gap-1.5">
                  {items.map((c) => (
                    <li key={c.id} className="flex items-start gap-2 text-sm">
                      <span className={c.passed ? "text-primary" : "text-warn"}>
                        {c.passed ? "✓" : "✕"}
                      </span>
                      <span>
                        <span className={c.passed ? "" : "font-semibold"}>{c.label}</span>
                        {!c.passed && <span className="block text-xs text-ink-faint">{c.detail}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-4">
          {teaser.length > 0 && (
            <ul className="mb-3 flex flex-col gap-1.5">
              {teaser.map((c) => (
                <li key={c.id} className="flex items-start gap-2 text-sm">
                  <span className="text-warn">✕</span>
                  <span className="font-semibold">{c.label}</span>
                </li>
              ))}
            </ul>
          )}
          <a
            href="/tarifs"
            className="block rounded-[var(--radius-sm)] bg-gold px-4 py-2 text-center text-xs font-bold text-white"
          >
            Passez au Pro pour voir le détail des {criteria.length} critères et les corriger
          </a>
        </div>
      )}
    </section>
  );
}
