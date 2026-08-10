export type CvExperience = {
  id: string;
  poste: string;
  entreprise: string;
  lieu: string;
  dateDebut: string;
  dateFin: string;
  enCours: boolean;
  bullets: string[];
};

export type CvFormation = {
  id: string;
  diplome: string;
  etablissement: string;
  lieu: string;
  dateDebut: string;
  dateFin: string;
};

export type CvLangue = {
  id: string;
  langue: string;
  niveau: string;
};

export type CvContent = {
  identite: {
    prenom: string;
    nom: string;
    titre: string;
    email: string;
    telephone: string;
    ville: string;
    permis: boolean;
  };
  resume: string;
  experiences: CvExperience[];
  formations: CvFormation[];
  competences: string[];
  langues: CvLangue[];
};

export const EMPTY_CV_CONTENT: CvContent = {
  identite: { prenom: "", nom: "", titre: "", email: "", telephone: "", ville: "", permis: false },
  resume: "",
  experiences: [],
  formations: [],
  competences: [],
  langues: [],
};

/** Aplatit le contenu structuré du CV en texte brut (recherche de mots-clés, prompt IA). */
export function cvContentToText(content: CvContent): string {
  const parts = [
    content.identite.titre,
    content.resume,
    ...content.experiences.flatMap((e) => [e.poste, e.entreprise, ...e.bullets]),
    ...content.formations.map((f) => `${f.diplome} ${f.etablissement}`),
    content.competences.join(" "),
    content.langues.map((l) => l.langue).join(" "),
  ];
  return parts.filter(Boolean).join("\n");
}
