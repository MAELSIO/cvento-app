"use client";

import { useState, type ChangeEvent } from "react";

type Result = {
  score: number;
  criteria: { id: string; label: string; passed: boolean }[];
  wordCount: number;
};

function scoreColor(score: number) {
  if (score >= 75) return { text: "text-primary-dark", bg: "bg-primary-tint" };
  if (score >= 45) return { text: "text-gold", bg: "bg-gold-tint" };
  return { text: "text-warn", bg: "bg-warn-tint" };
}

export default function DiagnosticPage() {
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setError("");
    setResult(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/diagnostic", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur inattendue.");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inattendue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <a href="/" className="mb-8 inline-flex items-center gap-2.5 font-display text-lg font-bold">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
          C
        </span>
        CVento
      </a>

      <h1 className="text-3xl font-bold">Diagnostic gratuit de votre CV</h1>
      <p className="mt-2 text-ink-soft">
        Déposez votre CV actuel (PDF ou Word), obtenez un premier score en quelques secondes.
        Aucune inscription requise.
      </p>

      <label className="mt-8 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[var(--radius-lg)] border-2 border-dashed border-line bg-surface p-10 text-center hover:border-primary">
        <span className="font-semibold">
          {loading ? "Analyse en cours..." : fileName || "Cliquez pour choisir un fichier"}
        </span>
        <span className="text-xs text-ink-faint">PDF ou DOCX, 10 Mo maximum</span>
        <input type="file" accept=".pdf,.docx" onChange={handleFileChange} className="hidden" disabled={loading} />
      </label>

      {error && (
        <p className="mt-4 rounded-[var(--radius-sm)] bg-warn-tint p-3 text-sm font-semibold text-warn">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-8 rounded-[var(--radius-lg)] border border-line bg-surface p-6">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-16 w-16 flex-none items-center justify-center rounded-full text-xl font-bold ${scoreColor(result.score).bg} ${scoreColor(result.score).text}`}
            >
              {result.score}
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold">Score de votre CV</h2>
              <p className="text-xs text-ink-soft">
                {result.criteria.filter((c) => c.passed).length}/{result.criteria.length} critères validés
                · {result.wordCount} mots
              </p>
            </div>
          </div>

          <ul className="mt-5 flex flex-col gap-1.5">
            {result.criteria.map((c) => (
              <li key={c.id} className="flex items-start gap-2 text-sm">
                <span className={c.passed ? "text-primary" : "text-warn"}>{c.passed ? "✓" : "✕"}</span>
                {c.label}
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-[var(--radius)] bg-primary-tint p-4 text-center">
            <p className="mb-3 text-sm font-semibold text-primary-dark">
              Pour un score détaillé sur ~20 critères et corriger chaque point, créez votre CV avec
              CVento.
            </p>
            <a
              href="/signup"
              className="inline-block rounded-[var(--radius-sm)] bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-[0_4px_0_var(--primary-dark)]"
            >
              Créer mon CV gratuitement
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
