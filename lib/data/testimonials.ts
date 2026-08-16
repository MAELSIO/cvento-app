export type Testimonial = {
  /** Prénom du client. Ex: "Julie" */
  prenom: string;
  /** Sa situation. Ex: "Étudiante en marketing", "En reconversion" */
  role: string;
  /** Sa ville (optionnel). Ex: "Lyon" */
  ville?: string;
  /** Le témoignage, mot pour mot si possible. */
  citation: string;
  /**
   * Note sur 5 (entier 1 à 5) — UNIQUEMENT si le client vous l'a donnée
   * explicitement (ex: avis Google 5 étoiles). Ne jamais deviner ou inventer.
   */
  note?: number;
  /** Lien vers l'avis original (Google, LinkedIn, Trustpilot...), rend le témoignage vérifiable. */
  lienSource?: string;
  /** Texte du lien. Par défaut : "Voir l'avis original" */
  lienLabel?: string;
  /** Chemin ou URL vers une photo du client (optionnel). */
  photo?: string;
  /** Date à laquelle CE témoignage a été ajouté ici (AAAA-MM-JJ) — repère interne, pas la date du témoignage. */
  dateAjout: string;
};

/**
 * Vide intentionnellement : ne jamais fabriquer de faux avis. Ajoutez ici les
 * vrais retours clients au fur et à mesure — la section s'affiche
 * automatiquement dès qu'il y en a au moins un (voir components/Testimonials.tsx).
 *
 * Comment ajouter un témoignage (pas besoin de savoir coder) :
 * 1. Copiez le bloc d'exemple ci-dessous, collez-le entre les crochets [ ].
 * 2. Remplissez les champs avec le vrai retour du client.
 * 3. Sauvegardez — le témoignage apparaît automatiquement sur le site.
 *
 * Exemple de format attendu :
 * {
 *   prenom: "Prénom N.",
 *   role: "Poste, ville",
 *   citation: "Le vrai retour du client, mot pour mot si possible.",
 *   note: 5,
 *   lienSource: "https://...",
 *   lienLabel: "Avis Google",
 *   dateAjout: "2026-08-16",
 * }
 *
 * Pour un avis Google : ouvrez votre fiche Google Business Profile > Avis >
 * cliquez sur l'avis > icône de partage > copier le lien.
 */
export const TESTIMONIALS: Testimonial[] = [];
