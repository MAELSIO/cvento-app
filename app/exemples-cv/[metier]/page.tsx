import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { METIERS, getMetier } from "@/lib/data/metiers";

export function generateStaticParams() {
  return METIERS.map((m) => ({ metier: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ metier: string }>;
}): Promise<Metadata> {
  const { metier: slug } = await params;
  const metier = getMetier(slug);
  if (!metier) return {};

  return {
    title: `Exemple de CV ${metier.nom} (2026) — CVento`,
    description: `Exemple de CV pour ${metier.nom} : accroche, points clés d'expérience chiffrés et compétences à mettre en avant. Créez le vôtre en quelques minutes.`,
  };
}

export default async function MetierPage({
  params,
}: {
  params: Promise<{ metier: string }>;
}) {
  const { metier: slug } = await params;
  const metier = getMetier(slug);
  if (!metier) notFound();

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <a href="/" className="mb-8 inline-flex items-center gap-2.5 font-display text-lg font-bold">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
          C
        </span>
        CVento
      </a>

      <p className="text-xs font-semibold text-primary">
        <a href="/exemples-cv" className="hover:underline">Exemples de CV</a> / {metier.nom}
      </p>
      <h1 className="mt-2 text-3xl font-bold">Exemple de CV {metier.nom}</h1>
      <p className="mt-3 text-ink-soft">{metier.intro}</p>

      <section className="mt-8 rounded-[var(--radius-lg)] border border-line bg-surface p-6">
        <h2 className="font-display text-lg font-semibold">Accroche / résumé</h2>
        <p className="mt-2 text-sm text-ink-soft">{metier.accroche}</p>
      </section>

      <section className="mt-6 rounded-[var(--radius-lg)] border border-line bg-surface p-6">
        <h2 className="font-display text-lg font-semibold">Points clés d&apos;expérience</h2>
        <ul className="mt-3 flex flex-col gap-2">
          {metier.bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-sm text-ink-soft">
              <span className="text-primary">•</span>
              {b}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 rounded-[var(--radius-lg)] border border-line bg-surface p-6">
        <h2 className="font-display text-lg font-semibold">Compétences à mettre en avant</h2>
        <p className="mt-2 text-sm text-ink-soft">{metier.competences.join(" · ")}</p>
      </section>

      <section className="mt-6 rounded-[var(--radius-lg)] border border-line bg-surface p-6">
        <h2 className="font-display text-lg font-semibold">Formation type</h2>
        <p className="mt-2 text-sm text-ink-soft">{metier.formation}</p>
      </section>

      <div className="mt-8 rounded-[var(--radius-lg)] bg-primary-tint p-6 text-center">
        <p className="mb-3 font-semibold text-primary-dark">
          Créez votre CV {metier.nom} avec CVento, prêt en quelques minutes.
        </p>
        <a
          href="/signup"
          className="inline-block rounded-[var(--radius-sm)] bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-[0_4px_0_var(--primary-dark)]"
        >
          Créer mon CV gratuitement
        </a>
      </div>
    </main>
  );
}
