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
  {
    slug: "cv-sans-experience-comment-le-construire",
    title: "CV sans expérience professionnelle : comment le construire quand même",
    excerpt:
      "Étudiant, jeune diplômé, reconversion sans premier poste dans le secteur visé : voici comment construire un CV solide sans expérience professionnelle classique à mettre en avant.",
    date: "2026-02-25",
    sections: [
      {
        heading: "Élargir ce qu'on appelle 'expérience'",
        paragraphs: [
          "Stages, jobs étudiants, projets scolaires, bénévolat associatif, engagement dans une association étudiante : tout cela constitue une expérience valorisable si vous en tirez des responsabilités et des résultats concrets, exactement comme pour un emploi classique.",
          "Un job d'été en caisse peut démontrer la gestion du stress et de la relation client ; un projet de groupe à l'école peut démontrer la gestion de projet et le travail en équipe. C'est la formulation qui fait la différence, pas seulement le contenu.",
        ],
      },
      {
        heading: "Inverser l'ordre des sections",
        paragraphs: [
          "Sans expérience professionnelle solide, la formation devient la section la plus forte : placez-la en haut du CV, juste après le résumé, plutôt qu'en bas comme c'est l'usage classique.",
          "Ajoutez une section 'Projets' si vous en avez (projets scolaires, projets personnels, hackathons) : elle peut remplacer utilement une expérience professionnelle manquante.",
        ],
      },
      {
        heading: "Un résumé qui compense l'absence d'expérience",
        paragraphs: [
          "Le résumé en haut du CV doit expliquer clairement votre situation et votre motivation : 'Étudiant en dernière année de... recherche un poste de... pour mettre en pratique mes compétences en...' — cela cadre immédiatement la lecture du recruteur au lieu de le laisser deviner pourquoi l'expérience est absente.",
        ],
      },
    ],
  },
  {
    slug: "erreurs-courantes-cv-a-eviter",
    title: "10 erreurs courantes sur un CV (et comment les corriger)",
    excerpt:
      "Certaines erreurs reviennent sur la majorité des CV que reçoit un recruteur. En voici 10 parmi les plus fréquentes, avec la correction à apporter.",
    date: "2026-03-05",
    sections: [
      {
        heading: "Les erreurs de contenu",
        paragraphs: [
          "1. Une accroche vague ('Motivé, dynamique, sérieux') sans rien de concret derrière — remplacez-la par un résumé factuel de votre profil et de ce que vous visez.",
          "2. Des missions au lieu de résultats ('Chargé du service client') — ajoutez un résultat chiffré à chaque ligne quand c'est possible.",
          "3. Un CV identique envoyé à toutes les candidatures — même 10 minutes d'ajustement des mots-clés par offre change nettement le taux de réponse.",
        ],
      },
      {
        heading: "Les erreurs de forme",
        paragraphs: [
          "4. Une mise en page en plusieurs colonnes ou avec des icônes — mal lue par les logiciels de tri automatique (voir notre article sur le format ATS).",
          "5. Une police non standard ou une taille de texte inférieure à 10pt — illisible à l'impression comme à l'écran.",
          "6. Un CV de 3 pages pour un début de carrière — une page suffit largement avant 5-7 ans d'expérience.",
        ],
      },
      {
        heading: "Les erreurs qui coûtent cher",
        paragraphs: [
          "7. Une adresse email peu professionnelle (surnom, chiffres aléatoires) — créez une adresse simple prénom.nom@fournisseur.fr dédiée à la recherche d'emploi.",
          "8. Des fautes d'orthographe non relues — faites relire par une tierce personne, l'auteur d'un texte ne voit jamais toutes ses propres fautes.",
          "9. Des dates incohérentes ou des trous non expliqués — une ligne courte suffit à couvrir une période creuse ('Voyage', 'Recherche active', 'Formation personnelle').",
          "10. Un fichier nommé 'CV_final_v3_dernier.pdf' — renommez-le avec votre nom : 'CV_Prenom_Nom.pdf'.",
        ],
      },
    ],
  },
  {
    slug: "repondre-quels-sont-vos-defauts-entretien",
    title: "Comment répondre à 'Quels sont vos défauts ?' en entretien",
    excerpt:
      "C'est l'une des questions les plus redoutées en entretien, et l'une des plus mal préparées. Voici une méthode simple pour y répondre sans se dévaloriser ni sonner faux.",
    date: "2026-03-14",
    sections: [
      {
        heading: "Pourquoi cette question est posée",
        paragraphs: [
          "Le recruteur ne cherche pas une confession : il évalue votre capacité à vous connaître et à prendre du recul sur vous-même. Une réponse trop lisse ('Je suis trop perfectionniste') est reconnue instantanément comme une esquive et joue contre vous.",
        ],
      },
      {
        heading: "La méthode en 3 temps",
        paragraphs: [
          "1. Nommez un vrai défaut, pertinent mais pas éliminatoire pour le poste (évitez par exemple de dire que vous êtes désorganisé pour un poste de gestion de projet).",
          "2. Donnez un exemple concret où ce défaut s'est manifesté — cela rend la réponse crédible plutôt qu'abstraite.",
          "3. Expliquez ce que vous avez mis en place pour le limiter. C'est cette troisième étape qui transforme un aveu de faiblesse en preuve de maturité professionnelle.",
        ],
      },
      {
        heading: "Un exemple concret",
        paragraphs: [
          "'J'ai tendance à vouloir tout vérifier moi-même avant de déléguer, ce qui m'a fait perdre du temps sur un projet où j'aurais dû faire confiance à mon équipe plus tôt. Depuis, je fixe des points d'étape clairs dès le départ plutôt que de tout contrôler en continu.' — précis, honnête, et orienté amélioration.",
        ],
      },
    ],
  },
  {
    slug: "reconversion-professionnelle-cv-parcours-atypique",
    title: "Reconversion professionnelle : comment présenter un parcours atypique sur son CV",
    excerpt:
      "Changer de métier ne veut pas dire repartir de zéro. Voici comment structurer un CV de reconversion pour que votre ancien parcours devienne un atout plutôt qu'un frein.",
    date: "2026-03-22",
    sections: [
      {
        heading: "Le CV par compétences plutôt que chronologique",
        paragraphs: [
          "Un CV chronologique classique met en avant des intitulés de poste qui n'ont rien à voir avec le métier visé, ce qui peut dérouter le recruteur dès la première lecture.",
          "Un CV organisé par compétences transversales (gestion de projet, relation client, analyse de données...) permet de regrouper des expériences de secteurs différents autour de ce qui compte réellement pour le poste visé, sans mentir sur la chronologie.",
        ],
      },
      {
        heading: "Assumer la reconversion dans le résumé",
        paragraphs: [
          "N'essayez pas de cacher le changement de cap : expliquez-le en une phrase claire dans le résumé ('Après 6 ans en comptabilité, en reconversion vers la gestion de projet, formé(e) en...'). Un recruteur qui comprend le POURQUOI est bien plus rassuré qu'un recruteur qui doit le deviner.",
        ],
      },
      {
        heading: "Valoriser la formation récente",
        paragraphs: [
          "Une formation courte ou une certification récente dans le nouveau domaine mérite d'être mise en évidence, même si elle est plus récente que vos expériences professionnelles — elle prouve un investissement concret dans la reconversion, pas seulement une intention.",
        ],
      },
    ],
  },
  {
    slug: "photo-sur-cv-en-france",
    title: "Faut-il mettre une photo sur son CV en France ?",
    excerpt:
      "Contrairement au marché anglophone où la photo est proscrite (pour des raisons de non-discrimination), la question reste ouverte en France. Voici comment trancher selon votre situation.",
    date: "2026-03-30",
    sections: [
      {
        heading: "Ce que dit la loi",
        paragraphs: [
          "En France, la photo sur un CV n'est ni obligatoire ni interdite. Aucun texte de loi n'impose son absence, contrairement à certains pays (États-Unis, Royaume-Uni) où elle est déconseillée voire écartée par les recruteurs eux-mêmes pour éviter tout risque de discrimination à l'embauche.",
        ],
      },
      {
        heading: "Dans quels cas la mettre",
        paragraphs: [
          "Elle reste courante dans les secteurs à forte dimension relationnelle ou commerciale (vente, hôtellerie-restauration, accueil), où le recruteur peut légitimement s'attendre à voir à qui il aura affaire.",
          "Si vous la mettez, choisissez une photo de qualité professionnelle (fond neutre, tenue soignée) — une photo de vacances recadrée fait plus de tort qu'une absence de photo.",
        ],
      },
      {
        heading: "Dans quels cas s'en passer",
        paragraphs: [
          "Pour les métiers techniques, cadres ou candidatures dans des grands groupes internationaux (souvent alignés sur les pratiques anglo-saxonnes), l'absence de photo est de plus en plus la norme et ne pénalise en rien la candidature.",
          "En cas de doute, l'absence de photo reste le choix le plus sûr : elle ne joue jamais contre vous, alors qu'une photo mal choisie peut créer un a priori négatif avant même la lecture du contenu.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
