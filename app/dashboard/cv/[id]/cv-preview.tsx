import type { CvContent } from "@/lib/types/cv";
import { getTemplate } from "@/lib/templates/registry";

const SERIF_STACK = "Georgia, 'Times New Roman', serif";
const SANS_STACK = "'Inter', system-ui, -apple-system, Arial, sans-serif";

/**
 * Aperçu web — reflète exactement la structure des exports PDF/DOCX
 * (lib/pdf, lib/docx). Les 18 templates (lib/templates/registry.ts) ne
 * varient jamais la structure, seulement couleur/typo/espacement — c'est
 * ce qui garantit qu'ils restent tous compatibles ATS.
 */
export function CvPreview({ content, templateId }: { content: CvContent; templateId: string }) {
  const template = getTemplate(templateId);
  const { identite, resume, experiences, formations, competences, langues } = content;
  const nomComplet = [identite.prenom, identite.nom].filter(Boolean).join(" ");
  const accent = `#${template.color.hex}`;
  const isCompact = template.layout === "compact";
  const fontFamily = template.layout === "classique" ? SERIF_STACK : SANS_STACK;
  const sectionGap = isCompact ? "mt-4" : "mt-6";
  const entryGap = isCompact ? "gap-2" : "gap-4";
  const bodySize = isCompact ? "text-xs" : "text-sm";

  function SectionTitle({ children }: { children: React.ReactNode }) {
    if (template.layout === "moderne") {
      return (
        <h3
          className="px-2 py-1 text-xs font-bold uppercase tracking-wide text-white"
          style={{ backgroundColor: accent }}
        >
          {children}
        </h3>
      );
    }
    return (
      <h3
        className="border-b pb-1 text-xs font-bold uppercase tracking-wide"
        style={{ color: accent, borderColor: accent }}
      >
        {children}
      </h3>
    );
  }

  return (
    <div
      className={`rounded-[var(--radius-lg)] border border-line bg-white p-8 text-[#1a1a1a] shadow-sm ${bodySize}`}
      style={{ fontFamily }}
    >
      <h2 className="text-2xl font-bold" style={{ color: template.layout === "moderne" ? accent : undefined }}>
        {nomComplet || "Votre nom"}
      </h2>
      {identite.titre && <p className="mt-0.5 text-base text-ink-soft">{identite.titre}</p>}

      <p className="mt-2 flex flex-wrap gap-x-3 text-xs text-ink-faint">
        {identite.email && <span>{identite.email}</span>}
        {identite.telephone && <span>{identite.telephone}</span>}
        {identite.ville && <span>{identite.ville}</span>}
        {identite.permis && <span>Permis B</span>}
      </p>

      {resume && (
        <section className={sectionGap}>
          <p>{resume}</p>
        </section>
      )}

      {experiences.length > 0 && (
        <section className={sectionGap}>
          <SectionTitle>Expérience professionnelle</SectionTitle>
          <div className={`mt-3 flex flex-col ${entryGap}`}>
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
        <section className={sectionGap}>
          <SectionTitle>Formation</SectionTitle>
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
        <section className={sectionGap}>
          <SectionTitle>Compétences</SectionTitle>
          <p className="mt-3">{competences.join(" · ")}</p>
        </section>
      )}

      {langues.length > 0 && (
        <section className={sectionGap}>
          <SectionTitle>Langues</SectionTitle>
          <p className="mt-3">
            {langues.map((l) => `${l.langue} (${l.niveau})`).join(" · ")}
          </p>
        </section>
      )}
    </div>
  );
}
