import type { CvContent } from "@/lib/types/cv";

/**
 * Aperçu du template "sobre" : une seule colonne, pas d'icônes, pas de
 * tableaux — le format le plus fiable pour les logiciels de tri
 * automatique (ATS). Le rendu PDF final (lib/pdf) suit la même structure.
 */
export function CvPreview({ content }: { content: CvContent }) {
  const { identite, resume, experiences, formations, competences, langues } = content;
  const nomComplet = [identite.prenom, identite.nom].filter(Boolean).join(" ");

  return (
    <div className="rounded-[var(--radius-lg)] border border-line bg-white p-8 text-sm text-[#1a1a1a] shadow-sm">
      <h2 className="font-display text-2xl font-bold">{nomComplet || "Votre nom"}</h2>
      {identite.titre && <p className="mt-0.5 text-base text-ink-soft">{identite.titre}</p>}

      <p className="mt-2 flex flex-wrap gap-x-3 text-xs text-ink-faint">
        {identite.email && <span>{identite.email}</span>}
        {identite.telephone && <span>{identite.telephone}</span>}
        {identite.ville && <span>{identite.ville}</span>}
        {identite.permis && <span>Permis B</span>}
      </p>

      {resume && (
        <section className="mt-5">
          <p>{resume}</p>
        </section>
      )}

      {experiences.length > 0 && (
        <section className="mt-6">
          <h3 className="border-b border-line pb-1 text-xs font-bold uppercase tracking-wide text-primary-dark">
            Expérience professionnelle
          </h3>
          <div className="mt-3 flex flex-col gap-4">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <p className="font-semibold">
                    {exp.poste}
                    {exp.entreprise ? ` — ${exp.entreprise}` : ""}
                  </p>
                  <p className="text-xs text-ink-faint">
                    {exp.dateDebut} – {exp.enCours ? "Aujourd'hui" : exp.dateFin}
                  </p>
                </div>
                {exp.lieu && <p className="text-xs text-ink-faint">{exp.lieu}</p>}
                {exp.bullets.filter(Boolean).length > 0 && (
                  <ul className="mt-1 list-disc pl-5">
                    {exp.bullets.filter(Boolean).map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {formations.length > 0 && (
        <section className="mt-6">
          <h3 className="border-b border-line pb-1 text-xs font-bold uppercase tracking-wide text-primary-dark">
            Formation
          </h3>
          <div className="mt-3 flex flex-col gap-3">
            {formations.map((f) => (
              <div key={f.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <p className="font-semibold">
                    {f.diplome}
                    {f.etablissement ? ` — ${f.etablissement}` : ""}
                  </p>
                  <p className="text-xs text-ink-faint">
                    {f.dateDebut} – {f.dateFin}
                  </p>
                </div>
                {f.lieu && <p className="text-xs text-ink-faint">{f.lieu}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {competences.length > 0 && (
        <section className="mt-6">
          <h3 className="border-b border-line pb-1 text-xs font-bold uppercase tracking-wide text-primary-dark">
            Compétences
          </h3>
          <p className="mt-3">{competences.join(" · ")}</p>
        </section>
      )}

      {langues.length > 0 && (
        <section className="mt-6">
          <h3 className="border-b border-line pb-1 text-xs font-bold uppercase tracking-wide text-primary-dark">
            Langues
          </h3>
          <p className="mt-3">
            {langues.map((l) => `${l.langue} (${l.niveau})`).join(" · ")}
          </p>
        </section>
      )}
    </div>
  );
}
