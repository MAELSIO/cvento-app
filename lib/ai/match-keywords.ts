/**
 * Fonction pure (pas une Server Action) : compare une liste de mots-clés
 * au texte du CV, insensible à la casse. Utilisable côté client comme
 * côté serveur.
 */
export function matchKeywords(keywords: string[], cvText: string) {
  const haystack = cvText.toLowerCase();
  const found: string[] = [];
  const missing: string[] = [];
  for (const kw of keywords) {
    if (haystack.includes(kw.toLowerCase())) found.push(kw);
    else missing.push(kw);
  }
  return { found, missing };
}
