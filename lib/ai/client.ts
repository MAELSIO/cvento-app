/**
 * Client IA — Gemini (niveau gratuit) en attendant les premières ventes.
 * Anthropic (Claude Sonnet) reste la cible long terme pour la qualité
 * rédactionnelle en français ; repasser sur Claude dès que des crédits
 * Anthropic sont disponibles (voir lib/ai/feature-flag.ts) demande
 * seulement de restaurer l'ancienne implémentation de ce fichier — les
 * signatures askClaudeJson/askClaudeText sont inchangées, donc aucun
 * autre fichier n'a besoin d'être touché.
 */
const GEMINI_MODEL = "gemini-flash-latest";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;

const AI_UNAVAILABLE_MESSAGE =
  "Le service IA est momentanément indisponible. Réessayez dans quelques instants.";

/**
 * Next.js redacte en production le message des erreurs non contrôlées
 * levées depuis une Server Action (sécurité : pas de fuite de stack/clé
 * API côté client). Sans ce garde-fou, une erreur Gemini (quota, limite
 * de débit, réseau) remonte comme une erreur React générique illisible
 * plutôt que le message clair attendu par l'UI (aiError).
 */
async function callGemini(system: string, user: string, jsonMode: boolean): Promise<string> {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": GEMINI_API_KEY },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: [{ role: "user", parts: [{ text: user }] }],
          ...(jsonMode ? { generationConfig: { responseMimeType: "application/json" } } : {}),
        }),
      }
    );
    if (!res.ok) {
      console.error("Erreur API Gemini:", res.status, await res.text());
      throw new Error(AI_UNAVAILABLE_MESSAGE);
    }
    const data = await res.json();
    const text: string | undefined = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error(AI_UNAVAILABLE_MESSAGE);
    return text;
  } catch (err) {
    if (err instanceof Error && err.message === AI_UNAVAILABLE_MESSAGE) throw err;
    console.error("Erreur API Gemini:", err);
    throw new Error(AI_UNAVAILABLE_MESSAGE);
  }
}

/**
 * Demande une réponse strictement JSON à l'IA. Le prompt doit exiger
 * explicitement un objet/tableau JSON en sortie, sans texte autour.
 */
export async function askClaudeJson<T>(system: string, user: string): Promise<T> {
  const text = await callGemini(system, user, true);
  const jsonMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error("Réponse IA non exploitable (JSON introuvable).");
  return JSON.parse(jsonMatch[0]) as T;
}

export async function askClaudeText(system: string, user: string): Promise<string> {
  const text = await callGemini(system, user, false);
  return text.trim();
}
