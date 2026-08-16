export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  /** Lien vers l'avis original (Google, LinkedIn, Trustpilot...) — rend le témoignage vérifiable. */
  sourceUrl?: string;
  sourceLabel?: string;
};

/**
 * Vide intentionnellement : ne jamais fabriquer de faux avis. Ajoutez ici les
 * vrais retours clients au fur et à mesure — la section s'affiche
 * automatiquement dès qu'il y en a au moins un (voir components/Testimonials.tsx).
 *
 * Exemple de format attendu :
 * {
 *   name: "Prénom N.",
 *   role: "Poste, ville",
 *   quote: "Le vrai retour du client, mot pour mot si possible.",
 *   sourceUrl: "https://...",
 *   sourceLabel: "Avis Google",
 * }
 */
export const TESTIMONIALS: Testimonial[] = [];
