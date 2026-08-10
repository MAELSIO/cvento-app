import type { CvContent } from "@/lib/types/cv";

export type AtsCriterion = {
  id: string;
  label: string;
  category: "Identité" | "Structure" | "Contenu" | "Formatage" | "Ciblage";
  passed: boolean;
  detail: string;
};

export type AtsScoreResult = {
  score: number; // 0-100
  criteria: AtsCriterion[];
};

const ACTION_VERBS = [
  "géré", "gérée", "dirigé", "dirigée", "développé", "développée", "augmenté", "augmentée",
  "réduit", "réduite", "piloté", "pilotée", "coordonné", "coordonnée", "optimisé", "optimisée",
  "mis en place", "mise en place", "négocié", "négociée", "conçu", "conçue", "lancé", "lancée",
  "amélioré", "améliorée", "formé", "formée", "encadré", "encadrée", "analysé", "analysée",
  "créé", "créée", "organisé", "organisée", "supervisé", "supervisée", "déployé", "déployée",
  "atteint", "atteinte", "généré", "générée",
];

function startsWithActionVerb(bullet: string): boolean {
  const first = bullet.trim().toLowerCase();
  return ACTION_VERBS.some((v) => first.startsWith(v));
}

function hasNumber(text: string): boolean {
  return /\d/.test(text);
}

/**
 * Moteur de scoring déterministe (pas d'appel IA) : rapide, gratuit,
 * toujours disponible même sans quota. ~20 critères couvrant identité,
 * structure, contenu, formatage et ciblage — cohérent avec la promesse
 * "score sur une vingtaine de critères précis" du cahier des charges.
 */
export function computeAtsScore(content: CvContent, targetJobTitle: string): AtsScoreResult {
  const { identite, resume, experiences, formations, competences, langues } = content;
  const allBullets = experiences.flatMap((e) => e.bullets.filter(Boolean));
  const totalWords = [
    resume,
    ...experiences.flatMap((e) => [e.poste, e.entreprise, ...e.bullets]),
    ...formations.map((f) => `${f.diplome} ${f.etablissement}`),
    competences.join(" "),
  ]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  const criteria: AtsCriterion[] = [
    {
      id: "prenom-nom",
      label: "Prénom et nom renseignés",
      category: "Identité",
      passed: !!identite.prenom && !!identite.nom,
      detail: "Indispensable pour que l'ATS identifie le candidat.",
    },
    {
      id: "email",
      label: "Email valide",
      category: "Identité",
      passed: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identite.email),
      detail: "Un email mal formé empêche tout contact.",
    },
    {
      id: "telephone",
      label: "Téléphone renseigné",
      category: "Identité",
      passed: identite.telephone.replace(/\D/g, "").length >= 10,
      detail: "10 chiffres minimum attendus pour un numéro français.",
    },
    {
      id: "ville",
      label: "Ville renseignée",
      category: "Identité",
      passed: !!identite.ville,
      detail: "La localisation est souvent un filtre ATS.",
    },
    {
      id: "titre-pro",
      label: "Titre professionnel renseigné",
      category: "Identité",
      passed: !!identite.titre,
      detail: "Permet à l'ATS de catégoriser le profil.",
    },
    {
      id: "resume",
      label: "Résumé/accroche présent",
      category: "Structure",
      passed: resume.trim().length >= 50 && resume.trim().length <= 500,
      detail: "Entre 50 et 500 caractères, ni absent ni trop long.",
    },
    {
      id: "au-moins-1-exp",
      label: "Au moins une expérience professionnelle",
      category: "Structure",
      passed: experiences.length >= 1,
      detail: "Section obligatoire pour la quasi-totalité des postes.",
    },
    {
      id: "au-moins-2-exp",
      label: "Au moins deux expériences (profondeur du parcours)",
      category: "Structure",
      passed: experiences.length >= 2,
      detail: "Un parcours avec une seule expérience paraît incomplet.",
    },
    {
      id: "formations",
      label: "Au moins une formation renseignée",
      category: "Structure",
      passed: formations.length >= 1,
      detail: "Section attendue par la quasi-totalité des recruteurs.",
    },
    {
      id: "competences-3",
      label: "Au moins 3 compétences listées",
      category: "Structure",
      passed: competences.length >= 3,
      detail: "Les compétences sont un des premiers filtres ATS.",
    },
    {
      id: "langues",
      label: "Au moins une langue renseignée",
      category: "Structure",
      passed: langues.length >= 1,
      detail: "Attendu même pour un poste 100% francophone.",
    },
    {
      id: "bullets-par-exp",
      label: "Chaque expérience a au moins 2 points clés",
      category: "Contenu",
      passed: experiences.length > 0 && experiences.every((e) => e.bullets.filter(Boolean).length >= 2),
      detail: "Une expérience sans détail ne convainc pas un recruteur.",
    },
    {
      id: "verbes-action",
      label: "Points clés commençant par un verbe d'action",
      category: "Contenu",
      passed: allBullets.length > 0 && allBullets.filter(startsWithActionVerb).length / allBullets.length >= 0.6,
      detail: "Ex : 'Géré', 'Développé', 'Augmenté' plutôt que 'Responsable de'.",
    },
    {
      id: "quantification",
      label: "Résultats chiffrés dans les points clés",
      category: "Contenu",
      passed: allBullets.length > 0 && allBullets.filter(hasNumber).length / allBullets.length >= 0.4,
      detail: "Un chiffre (%, €, nombre) rend un résultat concret et crédible.",
    },
    {
      id: "longueur-bullets",
      label: "Points clés ni trop courts ni trop longs",
      category: "Contenu",
      passed:
        allBullets.length > 0 &&
        allBullets.every((b) => b.trim().length >= 15 && b.trim().length <= 220),
      detail: "Entre 15 et 220 caractères par point clé.",
    },
    {
      id: "longueur-totale",
      label: "Longueur totale du CV adaptée",
      category: "Formatage",
      passed: totalWords >= 120 && totalWords <= 900,
      detail: "Entre 120 et 900 mots — ni un CV vide, ni un CV surchargé.",
    },
    {
      id: "pas-doublons-competences",
      label: "Pas de compétences en doublon",
      category: "Formatage",
      passed: new Set(competences.map((c) => c.toLowerCase().trim())).size === competences.length,
      detail: "Les doublons diluent la lisibilité pour l'ATS et le recruteur.",
    },
    {
      id: "dates-experiences",
      label: "Dates renseignées pour chaque expérience",
      category: "Formatage",
      passed: experiences.every((e) => !!e.dateDebut && (e.enCours || !!e.dateFin)),
      detail: "Une expérience sans dates est écartée par de nombreux ATS.",
    },
    {
      id: "permis",
      label: "Mention du permis de conduire (si pertinent)",
      category: "Formatage",
      passed: identite.permis,
      detail: "Standard sur un CV français, à cocher si vous l'avez.",
    },
    {
      id: "poste-vise",
      label: "Poste visé renseigné (ciblage)",
      category: "Ciblage",
      passed: !!targetJobTitle,
      detail: "Indispensable pour activer le ciblage par mots-clés.",
    },
  ];

  const score = Math.round((criteria.filter((c) => c.passed).length / criteria.length) * 100);
  return { score, criteria };
}
