/**
 * Coupe-circuit temporaire. Actuellement `true` : l'IA tourne sur Gemini
 * (niveau gratuit, voir lib/ai/client.ts) en attendant les premières
 * ventes. Repasser à `false` si le quota gratuit Gemini est épuisé et
 * qu'aucun crédit Anthropic n'est encore disponible.
 */
export const AI_FEATURES_ENABLED = true;

export const AI_COMING_SOON_MESSAGE = "Bientôt disponible.";
