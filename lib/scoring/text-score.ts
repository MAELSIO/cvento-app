export type TextScoreCriterion = { id: string; label: string; passed: boolean };
export type TextScoreResult = { score: number; criteria: TextScoreCriterion[]; wordCount: number };

const ACTION_VERBS = [
  "géré", "dirigé", "développé", "augmenté", "réduit", "piloté", "coordonné", "optimisé",
  "négocié", "conçu", "lancé", "amélioré", "formé", "encadré", "analysé", "créé", "organisé",
  "supervisé", "déployé", "atteint", "généré",
];

/**
 * Score simplifié pour un CV existant uploadé en texte brut (pas de
 * structure exploitable) — utilisé par le diagnostic gratuit sans
 * inscription. Moins précis que lib/scoring/ats-score.ts (qui a accès
 * aux champs structurés), volontairement : c'est un teaser d'acquisition,
 * pas l'outil complet.
 */
export function computeTextScore(rawText: string): TextScoreResult {
  const text = rawText.trim();
  const lower = text.toLowerCase();
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

  const criteria: TextScoreCriterion[] = [
    { id: "longueur", label: "Longueur adaptée (120 à 900 mots)", passed: wordCount >= 120 && wordCount <= 900 },
    { id: "email", label: "Email détecté", passed: /[^\s@]+@[^\s@]+\.[^\s@]+/.test(text) },
    { id: "telephone", label: "Numéro de téléphone détecté", passed: /(\+33|0)[\s.]?[1-9]([\s.]?\d{2}){4}/.test(text) },
    {
      id: "section-experience",
      label: "Section \"Expérience\" détectée",
      passed: /exp[ée]rience/i.test(text),
    },
    {
      id: "section-formation",
      label: "Section \"Formation\" détectée",
      passed: /formation|dipl[ôo]me|éducation/i.test(text),
    },
    {
      id: "section-competences",
      label: "Section \"Compétences\" détectée",
      passed: /comp[ée]tence/i.test(text),
    },
    {
      id: "verbes-action",
      label: "Verbes d'action présents",
      passed: ACTION_VERBS.some((v) => lower.includes(v)),
    },
    { id: "chiffres", label: "Résultats chiffrés présents", passed: /\d+\s?%|\d{2,}/.test(text) },
    {
      id: "puces",
      label: "Structure en points clés détectée",
      passed: lines.some((l) => /^[•\-*·]/.test(l)),
    },
    { id: "pas-trop-court", label: "Pas anormalement court (page quasi vide)", passed: wordCount >= 80 },
  ];

  const score = Math.round((criteria.filter((c) => c.passed).length / criteria.length) * 100);
  return { score, criteria, wordCount };
}
