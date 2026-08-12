"use client";

import { useState } from "react";
import { generateInterviewQuestions, getInterviewFeedback } from "@/lib/actions/ai";
import { AI_FEATURES_ENABLED, AI_COMING_SOON_MESSAGE } from "@/lib/ai/feature-flag";

type Cv = {
  id: string;
  title: string;
  target_job_title: string | null;
  target_job_description: string | null;
};

type QA = {
  question: string;
  answer: string;
  feedback: string | null;
  loadingFeedback: boolean;
};

export function InterviewSimulator({ cvs }: { cvs: Cv[] }) {
  const [selectedCvId, setSelectedCvId] = useState(cvs[0]?.id ?? "");
  const [questions, setQuestions] = useState<QA[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [error, setError] = useState("");

  const selectedCv = cvs.find((c) => c.id === selectedCvId);

  async function handleGenerateQuestions() {
    if (!selectedCv) return;
    if (!AI_FEATURES_ENABLED) {
      setError(AI_COMING_SOON_MESSAGE);
      return;
    }
    setError("");
    setLoadingQuestions(true);
    const result = await generateInterviewQuestions({
      targetJobTitle: selectedCv.target_job_title ?? "",
      targetJobDescription: selectedCv.target_job_description ?? "",
    });
    if (result.error !== undefined) {
      setError(result.error);
    } else {
      setQuestions(
        result.data.map((q) => ({ question: q, answer: "", feedback: null, loadingFeedback: false }))
      );
    }
    setLoadingQuestions(false);
  }

  function updateAnswer(idx: number, answer: string) {
    setQuestions((qs) => qs.map((q, i) => (i === idx ? { ...q, answer } : q)));
  }

  async function handleFeedback(idx: number) {
    const qa = questions[idx];
    if (!qa.answer.trim()) return;
    if (!AI_FEATURES_ENABLED) {
      setError(AI_COMING_SOON_MESSAGE);
      return;
    }
    setQuestions((qs) => qs.map((q, i) => (i === idx ? { ...q, loadingFeedback: true } : q)));
    const result = await getInterviewFeedback({ question: qa.question, answer: qa.answer });
    if (result.error !== undefined) {
      setError(result.error);
      setQuestions((qs) => qs.map((q, i) => (i === idx ? { ...q, loadingFeedback: false } : q)));
    } else {
      setQuestions((qs) =>
        qs.map((q, i) => (i === idx ? { ...q, feedback: result.data, loadingFeedback: false } : q))
      );
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end gap-3 rounded-[var(--radius-lg)] border border-line bg-surface p-4">
        <div className="flex-1">
          <label className="text-xs font-semibold text-ink-soft">CV / poste visé</label>
          <select
            value={selectedCvId}
            onChange={(e) => setSelectedCvId(e.target.value)}
            className="mt-1 w-full rounded-[var(--radius-sm)] border-2 border-line px-3 py-2 text-sm"
          >
            {cvs.map((cv) => (
              <option key={cv.id} value={cv.id}>
                {cv.title}{cv.target_job_title ? ` — ${cv.target_job_title}` : ""}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={handleGenerateQuestions}
          disabled={loadingQuestions || !selectedCv?.target_job_title || !AI_FEATURES_ENABLED}
          className="rounded-[var(--radius-sm)] bg-primary px-4 py-2 text-sm font-bold text-white shadow-[0_4px_0_var(--primary-dark)] disabled:opacity-60"
        >
          {!AI_FEATURES_ENABLED
            ? "✨ Générer des questions (bientôt disponible)"
            : loadingQuestions
              ? "Génération..."
              : "✨ Générer des questions"}
        </button>
      </div>

      {selectedCv && !selectedCv.target_job_title && (
        <p className="mb-4 text-xs text-warn">
          Renseignez un poste visé sur ce CV pour générer des questions pertinentes.
        </p>
      )}

      {error && (
        <p className="mb-4 rounded-[var(--radius-sm)] bg-warn-tint p-3 text-sm font-semibold text-warn">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-5">
        {questions.map((qa, idx) => (
          <div key={idx} className="rounded-[var(--radius-lg)] border border-line bg-surface p-5">
            <p className="mb-3 font-display font-semibold">{idx + 1}. {qa.question}</p>
            <textarea
              value={qa.answer}
              onChange={(e) => updateAnswer(idx, e.target.value)}
              rows={3}
              placeholder="Votre réponse..."
              className="w-full rounded-[var(--radius-sm)] border-2 border-line px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handleFeedback(idx)}
              disabled={qa.loadingFeedback || !qa.answer.trim() || !AI_FEATURES_ENABLED}
              className="mt-2 text-xs font-bold text-primary hover:underline disabled:opacity-50"
            >
              {!AI_FEATURES_ENABLED
                ? "Obtenir un feedback IA (bientôt disponible)"
                : qa.loadingFeedback
                  ? "Analyse..."
                  : "Obtenir un feedback IA"}
            </button>
            {qa.feedback && (
              <p className="mt-3 rounded-[var(--radius-sm)] bg-primary-tint p-3 text-sm text-primary-dark">
                {qa.feedback}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
