"use client";

import { useState, useTransition } from "react";
import { saveCv } from "@/lib/actions/cvs";
import { generateBullets, extractKeywords } from "@/lib/actions/ai";
import { matchKeywords } from "@/lib/ai/match-keywords";
import { cvContentToText, type CvContent, type CvExperience, type CvFormation, type CvLangue } from "@/lib/types/cv";
import { CvPreview } from "./cv-preview";
import { CvScore } from "./cv-score";
import { TemplatePicker } from "./template-picker";

const inputClass =
  "rounded-[var(--radius-sm)] border-2 border-line px-3 py-2 text-sm focus:border-primary focus:outline-none";
const labelClass = "text-xs font-semibold text-ink-soft";

function newExperience(): CvExperience {
  return {
    id: crypto.randomUUID(),
    poste: "",
    entreprise: "",
    lieu: "",
    dateDebut: "",
    dateFin: "",
    enCours: false,
    bullets: [""],
  };
}

function newFormation(): CvFormation {
  return { id: crypto.randomUUID(), diplome: "", etablissement: "", lieu: "", dateDebut: "", dateFin: "" };
}

function newLangue(): CvLangue {
  return { id: crypto.randomUUID(), langue: "", niveau: "Courant" };
}

export function CvEditor({
  cvId,
  initialTitle,
  initialTargetJobTitle,
  initialTargetJobDescription,
  initialContent,
  initialTemplateId,
  isPro,
}: {
  cvId: string;
  initialTitle: string;
  initialTargetJobTitle: string;
  initialTargetJobDescription: string;
  initialContent: CvContent;
  initialTemplateId: string;
  isPro: boolean;
}) {
  const [title, setTitle] = useState(initialTitle);
  const [templateId, setTemplateId] = useState(initialTemplateId);
  const [targetJobTitle, setTargetJobTitle] = useState(initialTargetJobTitle);
  const [targetJobDescription, setTargetJobDescription] = useState(initialTargetJobDescription);
  const [content, setContent] = useState<CvContent>(initialContent);
  const [isPending, startTransition] = useTransition();
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [generatingExpId, setGeneratingExpId] = useState<string | null>(null);
  const [aiError, setAiError] = useState("");
  const [keywordResult, setKeywordResult] = useState<{ found: string[]; missing: string[] } | null>(null);
  const [analyzingKeywords, setAnalyzingKeywords] = useState(false);

  function handleSave() {
    startTransition(async () => {
      await saveCv(cvId, { title, targetJobTitle, targetJobDescription, content });
      setSavedAt(new Date());
    });
  }

  async function handleGenerateBullets(exp: CvExperience) {
    setAiError("");
    setGeneratingExpId(exp.id);
    try {
      const bullets = await generateBullets({
        poste: exp.poste,
        entreprise: exp.entreprise,
        motsCles: content.competences.join(", "),
      });
      setContent((c) => ({
        ...c,
        experiences: c.experiences.map((e) =>
          e.id === exp.id ? { ...e, bullets: [...e.bullets.filter(Boolean), ...bullets] } : e
        ),
      }));
    } catch (err) {
      setAiError(err instanceof Error ? err.message : "Erreur lors de la génération IA.");
    } finally {
      setGeneratingExpId(null);
    }
  }

  async function handleAnalyzeKeywords() {
    setAiError("");
    setAnalyzingKeywords(true);
    try {
      const keywords = await extractKeywords(targetJobDescription);
      setKeywordResult(matchKeywords(keywords, cvContentToText(content)));
    } catch (err) {
      setAiError(err instanceof Error ? err.message : "Erreur lors de l'analyse des mots-clés.");
    } finally {
      setAnalyzingKeywords(false);
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="font-display text-2xl font-bold focus:outline-none"
          placeholder="Titre du CV (ex : CV Comptable)"
        />
        <div className="flex items-center gap-3">
          {savedAt && !isPending && (
            <span className="text-xs text-ink-faint">
              Enregistré à {savedAt.toLocaleTimeString("fr-FR")}
            </span>
          )}
          <a
            href={`/api/cv/${cvId}/pdf`}
            className="rounded-[var(--radius-sm)] border-2 border-line px-4 py-2 text-sm font-bold text-ink hover:border-primary"
          >
            Télécharger PDF
          </a>
          {isPro ? (
            <a
              href={`/api/cv/${cvId}/docx`}
              className="rounded-[var(--radius-sm)] border-2 border-line px-4 py-2 text-sm font-bold text-ink hover:border-primary"
            >
              Télécharger Word
            </a>
          ) : (
            <a
              href="/tarifs"
              title="Export Word réservé au plan Pro"
              className="rounded-[var(--radius-sm)] border-2 border-dashed border-line px-4 py-2 text-sm font-bold text-ink-faint"
            >
              Word (Pro)
            </a>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={isPending}
            className="rounded-[var(--radius-sm)] bg-primary px-4 py-2 text-sm font-bold text-white shadow-[0_4px_0_var(--primary-dark)] disabled:opacity-60"
          >
            {isPending ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </div>

      {aiError && (
        <p className="mb-4 rounded-[var(--radius-sm)] bg-warn-tint p-3 text-sm font-semibold text-warn">
          {aiError}
        </p>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <TemplatePicker cvId={cvId} templateId={templateId} isPro={isPro} onChange={setTemplateId} />

          {/* Ciblage du poste */}
          <section className="rounded-[var(--radius-lg)] border border-line bg-surface p-5">
            <h2 className="mb-3 font-display text-lg font-semibold">Poste visé</h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className={labelClass}>Intitulé du poste</label>
                <input
                  value={targetJobTitle}
                  onChange={(e) => setTargetJobTitle(e.target.value)}
                  className={inputClass}
                  placeholder="Ex : Développeur web"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className={labelClass}>
                  Offre d&apos;emploi ciblée (optionnel, sert au ciblage IA des mots-clés)
                </label>
                <textarea
                  value={targetJobDescription}
                  onChange={(e) => setTargetJobDescription(e.target.value)}
                  className={inputClass}
                  rows={4}
                  placeholder="Collez le texte de l'offre ici"
                />
              </div>
              <button
                type="button"
                onClick={handleAnalyzeKeywords}
                disabled={!targetJobDescription.trim() || analyzingKeywords}
                className="self-start text-xs font-bold text-primary hover:underline disabled:opacity-50"
              >
                {analyzingKeywords ? "Analyse..." : "✨ Analyser les mots-clés"}
              </button>
              {keywordResult && (
                <div className="rounded-[var(--radius-sm)] bg-surface-alt p-3">
                  <p className="mb-2 text-xs font-semibold text-ink-soft">
                    {keywordResult.found.length} mot(s)-clé(s) trouvé(s) sur{" "}
                    {keywordResult.found.length + keywordResult.missing.length}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {keywordResult.found.map((kw) => (
                      <span
                        key={kw}
                        className="rounded-full bg-primary-tint px-2 py-1 text-xs font-semibold text-primary-dark"
                      >
                        ✓ {kw}
                      </span>
                    ))}
                    {keywordResult.missing.map((kw) => (
                      <span
                        key={kw}
                        className="rounded-full bg-warn-tint px-2 py-1 text-xs font-semibold text-warn"
                      >
                        ✕ {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Identité */}
          <section className="rounded-[var(--radius-lg)] border border-line bg-surface p-5">
            <h2 className="mb-3 font-display text-lg font-semibold">Identité</h2>
            <div className="grid grid-cols-2 gap-3">
              <input
                value={content.identite.prenom}
                onChange={(e) =>
                  setContent({ ...content, identite: { ...content.identite, prenom: e.target.value } })
                }
                className={inputClass}
                placeholder="Prénom"
              />
              <input
                value={content.identite.nom}
                onChange={(e) =>
                  setContent({ ...content, identite: { ...content.identite, nom: e.target.value } })
                }
                className={inputClass}
                placeholder="Nom"
              />
              <input
                value={content.identite.titre}
                onChange={(e) =>
                  setContent({ ...content, identite: { ...content.identite, titre: e.target.value } })
                }
                className={`${inputClass} col-span-2`}
                placeholder="Titre professionnel (ex : Comptable confirmé)"
              />
              <input
                value={content.identite.email}
                onChange={(e) =>
                  setContent({ ...content, identite: { ...content.identite, email: e.target.value } })
                }
                className={inputClass}
                placeholder="Email"
              />
              <input
                value={content.identite.telephone}
                onChange={(e) =>
                  setContent({ ...content, identite: { ...content.identite, telephone: e.target.value } })
                }
                className={inputClass}
                placeholder="Téléphone"
              />
              <input
                value={content.identite.ville}
                onChange={(e) =>
                  setContent({ ...content, identite: { ...content.identite, ville: e.target.value } })
                }
                className={inputClass}
                placeholder="Ville"
              />
              <label className="flex items-center gap-2 text-sm text-ink-soft">
                <input
                  type="checkbox"
                  checked={content.identite.permis}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      identite: { ...content.identite, permis: e.target.checked },
                    })
                  }
                />
                Permis B
              </label>
            </div>
          </section>

          {/* Résumé */}
          <section className="rounded-[var(--radius-lg)] border border-line bg-surface p-5">
            <h2 className="mb-3 font-display text-lg font-semibold">Résumé (accroche)</h2>
            <textarea
              value={content.resume}
              onChange={(e) => setContent({ ...content, resume: e.target.value })}
              className={`${inputClass} w-full`}
              rows={3}
              placeholder="2 à 3 phrases qui résument votre profil"
            />
          </section>

          {/* Expériences */}
          <section className="rounded-[var(--radius-lg)] border border-line bg-surface p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Expérience professionnelle</h2>
              <button
                type="button"
                onClick={() =>
                  setContent({ ...content, experiences: [...content.experiences, newExperience()] })
                }
                className="text-xs font-bold text-primary hover:underline"
              >
                + Ajouter
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {content.experiences.map((exp, idx) => (
                <div key={exp.id} className="rounded-[var(--radius)] border border-line p-4">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      value={exp.poste}
                      onChange={(e) => {
                        const experiences = [...content.experiences];
                        experiences[idx] = { ...exp, poste: e.target.value };
                        setContent({ ...content, experiences });
                      }}
                      className={inputClass}
                      placeholder="Poste"
                    />
                    <input
                      value={exp.entreprise}
                      onChange={(e) => {
                        const experiences = [...content.experiences];
                        experiences[idx] = { ...exp, entreprise: e.target.value };
                        setContent({ ...content, experiences });
                      }}
                      className={inputClass}
                      placeholder="Entreprise"
                    />
                    <input
                      value={exp.lieu}
                      onChange={(e) => {
                        const experiences = [...content.experiences];
                        experiences[idx] = { ...exp, lieu: e.target.value };
                        setContent({ ...content, experiences });
                      }}
                      className={inputClass}
                      placeholder="Ville"
                    />
                    <div className="flex gap-2">
                      <input
                        value={exp.dateDebut}
                        onChange={(e) => {
                          const experiences = [...content.experiences];
                          experiences[idx] = { ...exp, dateDebut: e.target.value };
                          setContent({ ...content, experiences });
                        }}
                        className={inputClass}
                        placeholder="Début (ex : 2021)"
                      />
                      <input
                        value={exp.dateFin}
                        disabled={exp.enCours}
                        onChange={(e) => {
                          const experiences = [...content.experiences];
                          experiences[idx] = { ...exp, dateFin: e.target.value };
                          setContent({ ...content, experiences });
                        }}
                        className={`${inputClass} disabled:opacity-50`}
                        placeholder="Fin"
                      />
                    </div>
                  </div>
                  <label className="mt-2 flex items-center gap-2 text-xs text-ink-soft">
                    <input
                      type="checkbox"
                      checked={exp.enCours}
                      onChange={(e) => {
                        const experiences = [...content.experiences];
                        experiences[idx] = { ...exp, enCours: e.target.checked };
                        setContent({ ...content, experiences });
                      }}
                    />
                    Poste actuel
                  </label>
                  <div className="mt-2 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <label className={labelClass}>Points clés (un par ligne)</label>
                      <button
                        type="button"
                        onClick={() => handleGenerateBullets(exp)}
                        disabled={generatingExpId === exp.id || !exp.poste}
                        className="text-xs font-bold text-primary hover:underline disabled:opacity-50"
                      >
                        {generatingExpId === exp.id ? "Génération..." : "✨ Générer avec l'IA"}
                      </button>
                    </div>
                    <textarea
                      value={exp.bullets.join("\n")}
                      onChange={(e) => {
                        const experiences = [...content.experiences];
                        experiences[idx] = { ...exp, bullets: e.target.value.split("\n") };
                        setContent({ ...content, experiences });
                      }}
                      className={inputClass}
                      rows={3}
                      placeholder={"Ex : Géré un portefeuille de 40 clients, +15% de rétention"}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setContent({
                        ...content,
                        experiences: content.experiences.filter((_, i) => i !== idx),
                      })
                    }
                    className="mt-2 text-xs font-semibold text-warn hover:underline"
                  >
                    Supprimer cette expérience
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Formations */}
          <section className="rounded-[var(--radius-lg)] border border-line bg-surface p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Formation</h2>
              <button
                type="button"
                onClick={() =>
                  setContent({ ...content, formations: [...content.formations, newFormation()] })
                }
                className="text-xs font-bold text-primary hover:underline"
              >
                + Ajouter
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {content.formations.map((f, idx) => (
                <div key={f.id} className="rounded-[var(--radius)] border border-line p-4">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      value={f.diplome}
                      onChange={(e) => {
                        const formations = [...content.formations];
                        formations[idx] = { ...f, diplome: e.target.value };
                        setContent({ ...content, formations });
                      }}
                      className={inputClass}
                      placeholder="Diplôme"
                    />
                    <input
                      value={f.etablissement}
                      onChange={(e) => {
                        const formations = [...content.formations];
                        formations[idx] = { ...f, etablissement: e.target.value };
                        setContent({ ...content, formations });
                      }}
                      className={inputClass}
                      placeholder="Établissement"
                    />
                    <input
                      value={f.lieu}
                      onChange={(e) => {
                        const formations = [...content.formations];
                        formations[idx] = { ...f, lieu: e.target.value };
                        setContent({ ...content, formations });
                      }}
                      className={inputClass}
                      placeholder="Ville"
                    />
                    <div className="flex gap-2">
                      <input
                        value={f.dateDebut}
                        onChange={(e) => {
                          const formations = [...content.formations];
                          formations[idx] = { ...f, dateDebut: e.target.value };
                          setContent({ ...content, formations });
                        }}
                        className={inputClass}
                        placeholder="Début"
                      />
                      <input
                        value={f.dateFin}
                        onChange={(e) => {
                          const formations = [...content.formations];
                          formations[idx] = { ...f, dateFin: e.target.value };
                          setContent({ ...content, formations });
                        }}
                        className={inputClass}
                        placeholder="Fin"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setContent({
                        ...content,
                        formations: content.formations.filter((_, i) => i !== idx),
                      })
                    }
                    className="mt-2 text-xs font-semibold text-warn hover:underline"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Compétences */}
          <section className="rounded-[var(--radius-lg)] border border-line bg-surface p-5">
            <h2 className="mb-3 font-display text-lg font-semibold">Compétences</h2>
            <input
              value={content.competences.join(", ")}
              onChange={(e) =>
                setContent({
                  ...content,
                  competences: e.target.value.split(",").map((c) => c.trim()).filter(Boolean),
                })
              }
              className={`${inputClass} w-full`}
              placeholder="Séparées par des virgules : Excel, gestion de projet, SEPA..."
            />
          </section>

          {/* Langues */}
          <section className="rounded-[var(--radius-lg)] border border-line bg-surface p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Langues</h2>
              <button
                type="button"
                onClick={() => setContent({ ...content, langues: [...content.langues, newLangue()] })}
                className="text-xs font-bold text-primary hover:underline"
              >
                + Ajouter
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {content.langues.map((l, idx) => (
                <div key={l.id} className="flex gap-2">
                  <input
                    value={l.langue}
                    onChange={(e) => {
                      const langues = [...content.langues];
                      langues[idx] = { ...l, langue: e.target.value };
                      setContent({ ...content, langues });
                    }}
                    className={inputClass}
                    placeholder="Langue"
                  />
                  <select
                    value={l.niveau}
                    onChange={(e) => {
                      const langues = [...content.langues];
                      langues[idx] = { ...l, niveau: e.target.value };
                      setContent({ ...content, langues });
                    }}
                    className={inputClass}
                  >
                    <option>Notions</option>
                    <option>Intermédiaire</option>
                    <option>Courant</option>
                    <option>Bilingue</option>
                    <option>Langue maternelle</option>
                  </select>
                  <button
                    type="button"
                    onClick={() =>
                      setContent({ ...content, langues: content.langues.filter((_, i) => i !== idx) })
                    }
                    className="text-xs font-semibold text-warn hover:underline"
                  >
                    Retirer
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-6 lg:sticky lg:top-6 lg:self-start">
          <CvScore content={content} targetJobTitle={targetJobTitle} isPro={isPro} />
          <CvPreview content={content} templateId={templateId} />
        </div>
      </div>
    </div>
  );
}
