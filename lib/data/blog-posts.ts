export type BlogSection = { heading: string; paragraphs: string[] };
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  sections: BlogSection[];
};

/**
 * Blog "CMS simple" : contenu versionné dans le code, pas de base de
 * données ni d'interface d'administration — cohérent avec l'objectif SEO
 * (contenu de fond, pas de promotion produit directe) sans complexité
 * opérationnelle supplémentaire pour un lancement solo.
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "cv-format-ats-comment-structurer",
    title: "CV et logiciels de tri (ATS) : comment structurer son CV pour ne pas être rejeté",
    excerpt:
      "La majorité des grandes entreprises françaises utilisent un logiciel de tri automatique avant qu'un recruteur ne voie votre CV. Voici les règles de structure qui évitent le rejet automatique.",
    date: "2026-01-12",
    sections: [
      {
        heading: "Pourquoi votre CV peut être rejeté avant même d'être lu",
        paragraphs: [
          "Un ATS (Applicant Tracking System) est un logiciel qui scanne automatiquement les CV reçus, en extrait le texte, et le classe selon sa pertinence par rapport à l'offre. Le problème : ces logiciels lisent mal les mises en page complexes.",
          "Un CV en colonnes, avec des icônes à la place du texte, des tableaux ou une photo en fond, peut voir son contenu mal extrait, voire totalement illisible pour le logiciel — même si le CV est magnifique à l'œil humain.",
        ],
      },
      {
        heading: "Les règles de structure qui fonctionnent",
        paragraphs: [
          "Privilégiez une seule colonne, de haut en bas : identité, résumé, expériences, formations, compétences, langues. C'est l'ordre le plus universellement bien lu par les ATS.",
          "Utilisez des intitulés de section standards ('Expérience professionnelle', 'Formation', 'Compétences') plutôt que des titres originaux — un ATS cherche ces mots-clés précis pour catégoriser le contenu.",
          "Évitez les tableaux pour organiser l'information : le texte dans les cellules est parfois lu dans le désordre par le logiciel.",
        ],
      },
      {
        heading: "Et pour le contenu ?",
        paragraphs: [
          "Une fois la structure correcte, le contenu compte tout autant : reprenez le vocabulaire exact de l'offre d'emploi quand c'est honnête de le faire, et quantifiez vos résultats (pourcentages, montants, nombres) — c'est ce qui distingue un CV qui passe le filtre ET convainc le recruteur derrière.",
        ],
      },
    ],
  },
  {
    slug: "lettre-motivation-structure-france",
    title: "Lettre de motivation : la structure qui fonctionne (spécificités françaises)",
    excerpt:
      "Contrairement au marché anglophone où elle a presque disparu, la lettre de motivation reste un standard en France. Voici la structure en 3 paragraphes qui fonctionne réellement.",
    date: "2026-01-20",
    sections: [
      {
        heading: "Pourquoi la lettre de motivation compte encore en France",
        paragraphs: [
          "Sur le marché anglophone, le CV seul suffit dans la grande majorité des candidatures. En France, la lettre de motivation reste attendue, en particulier pour les postes cadres, la fonction publique et les candidatures spontanées.",
          "Elle sert un objectif précis : expliquer le POURQUOI (pourquoi ce poste, pourquoi cette entreprise) que le CV, orienté QUOI/COMMENT, ne couvre pas.",
        ],
      },
      {
        heading: "La structure en 3 paragraphes",
        paragraphs: [
          "Paragraphe 1 — la motivation : pourquoi ce poste précis, dans cette entreprise précise. Évitez les formules interchangeables d'une candidature à l'autre.",
          "Paragraphe 2 — l'adéquation : 2 à 3 preuves concrètes tirées de votre parcours qui répondent directement aux exigences de l'offre. C'est le cœur de la lettre, celui qui doit être personnalisé à chaque candidature.",
          "Paragraphe 3 — la clôture : une formule de politesse classique, sans en faire trop. 'Je me tiens à votre disposition pour un entretien' fonctionne très bien, pas besoin de réinventer la formule.",
        ],
      },
      {
        heading: "Les erreurs à éviter",
        paragraphs: [
          "Ne recopiez pas votre CV sous forme de phrases : la lettre doit apporter un angle différent, pas répéter.",
          "Évitez les superlatifs non prouvés ('passionné', 'dynamique', 'excellent relationnel') sans exemple concret derrière — un recruteur les ignore instinctivement.",
        ],
      },
    ],
  },
  {
    slug: "verbes-action-cv-francais",
    title: "15 verbes d'action à utiliser dans son CV (et ceux à éviter)",
    excerpt:
      "Un point clé qui commence par 'Responsable de' se lit passivement. Voici les verbes d'action qui rendent vos expériences concrètes et orientées résultat.",
    date: "2026-02-02",
    sections: [
      {
        heading: "Pourquoi le verbe d'action change tout",
        paragraphs: [
          "'Responsable de la gestion des stocks' décrit une mission. 'Réduit les ruptures de stock de 30%' décrit un résultat. Le second capte l'attention en 2 secondes de lecture — le temps moyen qu'un recruteur passe sur un CV avant de décider s'il continue.",
        ],
      },
      {
        heading: "15 verbes à utiliser",
        paragraphs: [
          "Géré, dirigé, développé, augmenté, réduit, piloté, coordonné, optimisé, négocié, conçu, lancé, amélioré, formé, encadré, généré.",
          "Placez-les en tout début de point clé, à la forme conjuguée (passé composé), suivis directement du résultat obtenu et, si possible, d'un chiffre.",
        ],
      },
      {
        heading: "Ce qu'il faut éviter",
        paragraphs: [
          "'Responsable de', 'en charge de', 'chargé de' : ces formules décrivent une fonction, pas une action ni un résultat. Elles ne sont pas interdites, mais ne doivent pas ouvrir vos points clés les plus importants.",
          "'Participé à' est souvent trop vague : soyez précis sur votre contribution réelle plutôt que de diluer votre implication dans un travail d'équipe.",
        ],
      },
    ],
  },
  {
    slug: "preparer-entretien-embauche-une-semaine",
    title: "Se préparer à un entretien d'embauche en une semaine : le plan concret",
    excerpt:
      "Vous avez décroché un entretien dans une semaine ? Voici un plan de préparation jour par jour, sans y passer vos soirées entières.",
    date: "2026-02-14",
    sections: [
      {
        heading: "J-7 à J-5 : comprendre l'entreprise et le poste",
        paragraphs: [
          "Relisez l'offre ligne par ligne et notez les 5 compétences ou expériences les plus mises en avant — ce sont probablement les critères sur lesquels vous serez évalué.",
          "Recherchez l'actualité récente de l'entreprise (site, réseaux sociaux, presse) : un recruteur remarque toujours quand un candidat a fait cet effort, et c'est souvent une question posée directement.",
        ],
      },
      {
        heading: "J-4 à J-2 : préparer ses réponses, pas les apprendre par cœur",
        paragraphs: [
          "Préparez 4 à 5 exemples concrets tirés de votre parcours (méthode 'situation, action, résultat') que vous pourrez adapter à plusieurs questions différentes — motivation, gestion de conflit, réussite, échec surmonté.",
          "Préparez 2 à 3 questions à poser en fin d'entretien : elles montrent votre intérêt réel et évitent le silence gênant quand le recruteur demande 'avez-vous des questions ?'.",
        ],
      },
      {
        heading: "La veille et le jour J",
        paragraphs: [
          "Relisez votre CV et votre lettre de motivation : un recruteur peut poser une question sur n'importe quelle ligne, et une hésitation sur votre propre parcours se remarque immédiatement.",
          "Le jour J, arrivez 10 minutes en avance, pas plus : trop tôt peut désorganiser le planning du recruteur.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
