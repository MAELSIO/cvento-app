import type { Metadata } from "next";
import { METIERS } from "@/lib/data/metiers";
import { MetierSearch } from "./metier-search";

export const metadata: Metadata = {
  title: "Exemples de CV par métier — CVento",
  description:
    "Des exemples de CV réels par métier et secteur, avec accroche, points clés et compétences, pour vous inspirer et démarrer votre propre CV.",
};

export default function ExemplesCvIndexPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <a href="/" className="mb-8 inline-flex items-center gap-2.5 font-display text-lg font-bold">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
          C
        </span>
        CVento
      </a>
      <h1 className="text-3xl font-bold">Exemples de CV par métier</h1>
      <p className="mt-3 text-ink-soft">
        {METIERS.length} exemples de CV rédigés pour coller aux attentes réelles de chaque métier :
        vocabulaire, chiffres clés et compétences que recruteurs et logiciels de tri (ATS) recherchent
        en priorité. Trouvez le vôtre pour voir concrètement à quoi ressemble une accroche efficace,
        des points d&apos;expérience orientés résultats et une liste de compétences pertinente — puis
        générez le vôtre avec CVento.
      </p>

      <div className="mt-10">
        <MetierSearch metiers={METIERS} />
      </div>

      <div className="mt-16 rounded-[var(--radius-lg)] border border-line bg-surface p-8 text-center">
        <h2 className="font-display text-xl font-bold">Vous ne trouvez pas votre métier ?</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
          Pas besoin d&apos;un exemple tout fait : décrivez votre parcours, CVento génère une accroche
          et des points d&apos;expérience adaptés à votre situation et à l&apos;offre visée.
        </p>
        <a
          href="/signup"
          className="mt-5 inline-block rounded-[var(--radius-sm)] bg-primary px-6 py-3 text-sm font-bold text-white shadow-[0_4px_0_var(--primary-dark)]"
        >
          Créer mon CV gratuitement
        </a>
      </div>
    </main>
  );
}
