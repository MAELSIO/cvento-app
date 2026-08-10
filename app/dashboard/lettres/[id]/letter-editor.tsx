"use client";

import { useState, useTransition } from "react";
import { saveCoverLetter } from "@/lib/actions/cover-letters";
import { generateCoverLetter } from "@/lib/actions/ai";

export function LetterEditor({
  letterId,
  initialTitle,
  initialContent,
  cvSummaryText,
  targetJobTitle,
  targetJobDescription,
}: {
  letterId: string;
  initialTitle: string;
  initialContent: string;
  cvSummaryText: string;
  targetJobTitle: string;
  targetJobDescription: string;
}) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [entreprise, setEntreprise] = useState("");
  const [isPending, startTransition] = useTransition();
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  function handleSave() {
    startTransition(async () => {
      await saveCoverLetter(letterId, { title, content });
      setSavedAt(new Date());
    });
  }

  async function handleGenerate() {
    setError("");
    setGenerating(true);
    try {
      const letter = await generateCoverLetter({
        cvSummaryText,
        targetJobTitle,
        targetJobDescription,
        entreprise,
      });
      setContent(letter);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la génération IA.");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="font-display text-2xl font-bold focus:outline-none"
        />
        <div className="flex items-center gap-3">
          {savedAt && (
            <span className="text-xs text-ink-faint">Enregistré à {savedAt.toLocaleTimeString("fr-FR")}</span>
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

      {!targetJobTitle && (
        <p className="mb-4 rounded-[var(--radius-sm)] bg-gold-tint p-3 text-sm text-gold">
          Astuce : renseignez le poste visé (et idéalement l&apos;offre) sur le CV associé pour une
          lettre bien plus pertinente.
        </p>
      )}

      <div className="mb-4 flex flex-wrap items-end gap-3 rounded-[var(--radius-lg)] border border-line bg-surface p-4">
        <div className="flex-1">
          <label className="text-xs font-semibold text-ink-soft">Entreprise destinataire (optionnel)</label>
          <input
            value={entreprise}
            onChange={(e) => setEntreprise(e.target.value)}
            className="mt-1 w-full rounded-[var(--radius-sm)] border-2 border-line px-3 py-2 text-sm focus:border-primary focus:outline-none"
            placeholder="Ex : Entreprise Dupont SAS"
          />
        </div>
        <button
          type="button"
          onClick={handleGenerate}
          disabled={generating}
          className="rounded-[var(--radius-sm)] bg-gold px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
        >
          {generating ? "Génération..." : "✨ Générer avec l'IA"}
        </button>
      </div>

      {error && (
        <p className="mb-4 rounded-[var(--radius-sm)] bg-warn-tint p-3 text-sm font-semibold text-warn">
          {error}
        </p>
      )}

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={20}
        className="w-full rounded-[var(--radius-lg)] border border-line bg-white p-6 text-sm leading-relaxed focus:border-primary focus:outline-none"
        placeholder="Le texte de votre lettre apparaîtra ici après génération, ou écrivez-le vous-même."
      />
    </div>
  );
}
