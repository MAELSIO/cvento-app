import type { Metadata } from "next";
import { METIERS } from "@/lib/data/metiers";

export const metadata: Metadata = {
  title: "Exemples de CV par métier — CVento",
  description:
    "Des exemples de CV réels par métier et secteur, avec accroche, points clés et compétences, pour vous inspirer et démarrer votre propre CV.",
};

export default function ExemplesCvIndexPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <a href="/" className="mb-8 inline-flex items-center gap-2 font-display text-lg font-bold">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
          C
        </span>
        CVento
      </a>
      <h1 className="text-3xl font-bold">Exemples de CV par métier</h1>
      <p className="mt-2 text-ink-soft">
        Consultez un exemple concret pour votre métier : accroche, points clés d&apos;expérience et
        compétences à mettre en avant.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {METIERS.map((m) => (
          <a
            key={m.slug}
            href={`/exemples-cv/${m.slug}`}
            className="rounded-[var(--radius)] border border-line bg-surface px-4 py-3 text-sm font-semibold hover:border-primary"
          >
            CV {m.nom}
          </a>
        ))}
      </div>
    </main>
  );
}
