export type MetierExemple = {
  slug: string;
  nom: string;
  intro: string;
  accroche: string;
  bullets: string[];
  competences: string[];
  formation: string;
};

/**
 * Jeu de données de départ pour les pages SEO /exemples-cv/[metier].
 * Structure réutilisable — voir cahier des charges ("chaque page a du
 * contenu unique par métier"). ~20 métiers pour démarrer, extensible sans
 * changement de code (il suffit d'ajouter des entrées ici).
 */
export const METIERS: MetierExemple[] = [
  {
    slug: "comptable",
    nom: "Comptable",
    intro:
      "Le CV d'un comptable doit mettre en avant la rigueur, la maîtrise des outils de gestion et les résultats chiffrés obtenus (clôtures, réduction de délais, fiabilisation des comptes).",
    accroche:
      "Comptable avec 5 ans d'expérience en cabinet et en entreprise, spécialisé dans la clôture des comptes et le suivi de la trésorerie.",
    bullets: [
      "Géré la comptabilité générale d'un portefeuille de 40 clients, réduisant les délais de clôture de 20%",
      "Mis en place un tableau de suivi de trésorerie, réduisant les impayés de 15% en un an",
      "Piloté la déclaration de TVA mensuelle pour 12 sociétés sans erreur sur 3 exercices",
    ],
    competences: ["Sage", "Excel avancé", "Clôture comptable", "Déclarations fiscales", "SEPA", "Normes IFRS"],
    formation: "BTS Comptabilité et Gestion, ou DCG",
  },
  {
    slug: "developpeur-web",
    nom: "Développeur web",
    intro:
      "Un CV de développeur web doit être scannable rapidement par un ATS comme par un recruteur technique : stack maîtrisée en évidence, projets avec impact mesurable.",
    accroche:
      "Développeur web full-stack, spécialisé React/Node.js, avec 3 ans d'expérience en startup et agence.",
    bullets: [
      "Développé une refonte complète du parcours de paiement, augmentant le taux de conversion de 18%",
      "Réduit le temps de chargement moyen des pages de 40% via l'optimisation du bundle et du cache",
      "Mis en place une suite de tests automatisés couvrant 80% du code, réduisant les régressions en production",
    ],
    competences: ["React", "Node.js", "TypeScript", "PostgreSQL", "Git", "CI/CD"],
    formation: "Titre RNCP Développeur web et web mobile, ou école d'ingénieur",
  },
  {
    slug: "assistant-commercial",
    nom: "Assistant commercial",
    intro:
      "Le CV d'un(e) assistant(e) commercial(e) valorise l'organisation, la relation client et la contribution directe au chiffre d'affaires de l'équipe commerciale.",
    accroche:
      "Assistant(e) commercial(e) organisé(e) et réactif(ve), support d'une équipe de 6 commerciaux terrain depuis 2 ans.",
    bullets: [
      "Géré l'administration des ventes pour un portefeuille de 200 clients, réduisant les erreurs de commande de 25%",
      "Coordonné la prise de rendez-vous de l'équipe commerciale, augmentant le taux de rendez-vous honorés de 12%",
      "Mis en place un reporting hebdomadaire des ventes suivi par la direction commerciale",
    ],
    competences: ["CRM (Salesforce/HubSpot)", "Excel", "Relation client", "Gestion des commandes", "Facturation"],
    formation: "BTS NDRC ou BTS Gestion de la PME",
  },
  {
    slug: "chef-de-projet",
    nom: "Chef de projet",
    intro:
      "Un CV de chef de projet doit démontrer la capacité à livrer dans les délais et le budget, avec des exemples concrets de pilotage d'équipe et de gestion des risques.",
    accroche:
      "Chef de projet avec 6 ans d'expérience en pilotage de projets digitaux, méthodologies Agile et gestion de budgets jusqu'à 500 K€.",
    bullets: [
      "Piloté 8 projets simultanés avec un taux de livraison dans les délais de 95%",
      "Coordonné une équipe pluridisciplinaire de 12 personnes sur un projet de refonte SI de 400 K€",
      "Réduit les coûts de développement de 15% par la renégociation des contrats prestataires",
    ],
    competences: ["Agile/Scrum", "Jira", "Gestion budgétaire", "Gestion des risques", "MS Project"],
    formation: "Master en gestion de projet, ou certification PMP",
  },
  {
    slug: "infirmier",
    nom: "Infirmier / Infirmière",
    intro:
      "Le CV d'un infirmier valorise les services et spécialités, les compétences techniques précises et les responsabilités d'encadrement le cas échéant.",
    accroche:
      "Infirmier(ère) diplômé(e) d'État avec 4 ans d'expérience en service de chirurgie, spécialisé(e) dans la prise en charge post-opératoire.",
    bullets: [
      "Assuré le suivi post-opératoire de 15 à 20 patients par jour en service de chirurgie viscérale",
      "Formé 5 nouveaux infirmiers aux protocoles du service en tant que tuteur de stage",
      "Participé à la mise en place d'un nouveau protocole de gestion de la douleur, réduisant les réadmissions de 10%",
    ],
    competences: ["Soins post-opératoires", "Gestion de la douleur", "Pansements complexes", "Logiciel DPI", "AFGSU"],
    formation: "Diplôme d'État d'Infirmier (DEI)",
  },
  {
    slug: "vendeur",
    nom: "Vendeur / Vendeuse",
    intro:
      "Un CV de vendeur met en avant les résultats de vente, la relation client et l'adaptabilité à différents produits ou secteurs.",
    accroche:
      "Vendeur(se) polyvalent(e) avec 3 ans d'expérience en prêt-à-porter, régulièrement dans le top 3 des ventes de l'équipe.",
    bullets: [
      "Atteint 115% des objectifs de vente mensuels en moyenne sur les 12 derniers mois",
      "Développé la fidélisation client via un suivi personnalisé, augmentant le panier moyen de 10%",
      "Formé 4 nouveaux vendeurs aux techniques de vente additionnelle du magasin",
    ],
    competences: ["Techniques de vente", "Merchandising", "Encaissement", "Relation client", "Gestion des stocks"],
    formation: "Bac Pro Commerce ou BTS MCO",
  },
  {
    slug: "charge-de-clientele",
    nom: "Chargé de clientèle",
    intro:
      "Le CV d'un(e) chargé(e) de clientèle doit démontrer la satisfaction client mesurée et la gestion efficace des volumes de demandes.",
    accroche:
      "Chargé(e) de clientèle en centre d'appels avec 4 ans d'expérience, spécialisé(e) dans la résolution de litiges.",
    bullets: [
      "Traité en moyenne 60 appels clients par jour avec un taux de satisfaction de 92%",
      "Réduit le taux de réclamations non résolues au premier contact de 30% à 12%",
      "Formé 6 nouveaux conseillers aux outils et procédures du service client",
    ],
    competences: ["Gestion de la relation client", "CRM", "Gestion des litiges", "Écoute active", "Multicanal"],
    formation: "BTS NDRC ou expérience équivalente",
  },
  {
    slug: "secretaire-medicale",
    nom: "Secrétaire médicale",
    intro:
      "Un CV de secrétaire médicale valorise la rigueur administrative, la confidentialité et la maîtrise des logiciels métier de santé.",
    accroche:
      "Secrétaire médicale avec 5 ans d'expérience en cabinet de spécialistes, en charge de la prise de rendez-vous et de la facturation.",
    bullets: [
      "Géré l'agenda de 3 praticiens, optimisant le taux de remplissage des consultations à 95%",
      "Traité la facturation et le tiers payant pour plus de 1 000 patients par mois sans erreur significative",
      "Mis en place un système de rappel SMS, réduisant le taux de rendez-vous manqués de 18%",
    ],
    competences: ["Doctolib", "Frappe médicale", "Télétransmission", "Secret médical", "Facturation/tiers payant"],
    formation: "Titre de Secrétaire Assistant(e) Médico-Social(e)",
  },
  {
    slug: "technicien-de-maintenance",
    nom: "Technicien de maintenance",
    intro:
      "Le CV d'un technicien de maintenance doit préciser les équipements maîtrisés et les résultats en termes de disponibilité des machines.",
    accroche:
      "Technicien de maintenance industrielle avec 6 ans d'expérience en environnement de production 24/7.",
    bullets: [
      "Réduit le taux de pannes non planifiées de 25% via la mise en place d'une maintenance préventive",
      "Diagnostiqué et réparé en moyenne 15 interventions par semaine sur des lignes de production automatisées",
      "Formé l'équipe de production aux gestes de premier niveau, réduisant les temps d'arrêt de 10%",
    ],
    competences: ["Maintenance préventive", "Automatisme", "Électromécanique", "GMAO", "Habilitations électriques"],
    formation: "Bac Pro MEI ou BTS Maintenance des Systèmes",
  },
  {
    slug: "responsable-rh",
    nom: "Responsable RH",
    intro:
      "Un CV de responsable RH doit démontrer un impact mesurable sur le recrutement, la rétention et le climat social.",
    accroche:
      "Responsable RH avec 7 ans d'expérience, en charge du recrutement, de la formation et des relations sociales pour un effectif de 150 personnes.",
    bullets: [
      "Réduit le délai moyen de recrutement de 45 à 28 jours en refondant le processus de sourcing",
      "Piloté le plan de formation annuel pour 150 salariés avec un budget de 80 K€",
      "Réduit le taux de turnover de 22% à 14% en un an via un plan d'amélioration de l'onboarding",
    ],
    competences: ["Recrutement", "Droit du travail", "SIRH", "Relations sociales", "Gestion de la formation"],
    formation: "Master RH ou équivalent",
  },
  {
    slug: "community-manager",
    nom: "Community manager",
    intro:
      "Le CV d'un(e) community manager doit être orienté résultats : croissance d'audience, engagement, conversion — pas seulement créativité.",
    accroche:
      "Community manager avec 3 ans d'expérience, spécialisé(e) dans la croissance organique sur Instagram et TikTok.",
    bullets: [
      "Fait croître une communauté Instagram de 8 000 à 45 000 abonnés en 18 mois",
      "Augmenté le taux d'engagement moyen des publications de 2,1% à 6,5%",
      "Généré 120 K€ de chiffre d'affaires additionnel via des campagnes social ads gérées en autonomie",
    ],
    competences: ["Réseaux sociaux", "Canva/Adobe", "Social ads", "Analytics", "Calendrier éditorial"],
    formation: "Bachelor/Licence en communication digitale",
  },
  {
    slug: "electricien",
    nom: "Électricien",
    intro:
      "Un CV d'électricien met en avant les habilitations, les types de chantiers réalisés et le respect des normes de sécurité.",
    accroche:
      "Électricien bâtiment avec 8 ans d'expérience en installation et rénovation, spécialisé dans le tertiaire.",
    bullets: [
      "Réalisé le câblage électrique complet de 30+ chantiers tertiaires sans incident de sécurité",
      "Diagnostiqué et corrigé des non-conformités sur des installations existantes pour 15 clients par an",
      "Encadré une équipe de 3 électriciens sur des chantiers de plus de 500 m²",
    ],
    competences: ["Habilitations électriques B1-B2-BR", "Normes NF C 15-100", "Lecture de plans", "Câblage tertiaire"],
    formation: "CAP/Bac Pro Électricien, habilitations à jour",
  },
  {
    slug: "cuisinier",
    nom: "Cuisinier",
    intro:
      "Le CV d'un cuisinier valorise les types de cuisine maîtrisés, la gestion des coûts matière et le management d'équipe en cuisine.",
    accroche:
      "Cuisinier avec 5 ans d'expérience en restauration traditionnelle, spécialisé dans la cuisine de saison.",
    bullets: [
      "Géré la partie chaude d'un restaurant de 80 couverts par service avec un taux de satisfaction client de 4,6/5",
      "Réduit le coût matière de 8% via une meilleure gestion des stocks et des pertes",
      "Encadré une brigade de 4 commis lors des services de forte affluence",
    ],
    competences: ["Cuisine de saison", "HACCP", "Gestion des stocks", "Management d'équipe", "Fiches techniques"],
    formation: "CAP Cuisine ou Bac Pro Cuisine",
  },
  {
    slug: "aide-soignant",
    nom: "Aide-soignant",
    intro:
      "Un CV d'aide-soignant(e) valorise le type d'établissement, les publics accompagnés et les compétences relationnelles autant que techniques.",
    accroche:
      "Aide-soignant(e) diplômé(e) avec 4 ans d'expérience en EHPAD, spécialisé(e) dans l'accompagnement des patients dépendants.",
    bullets: [
      "Assuré les soins d'hygiène et de confort quotidiens pour 12 résidents en moyenne",
      "Participé à la mise en place d'un protocole de prévention des escarres, réduisant leur apparition de 30%",
      "Formé 3 nouveaux aides-soignants aux protocoles et bonnes pratiques du service",
    ],
    competences: ["Soins d'hygiène", "Prévention des escarres", "Transmissions ciblées", "Accompagnement fin de vie"],
    formation: "Diplôme d'État d'Aide-Soignant (DEAS)",
  },
  {
    slug: "ingenieur-informatique",
    nom: "Ingénieur informatique",
    intro:
      "Un CV d'ingénieur informatique doit préciser les architectures et technologies maîtrisées, avec des résultats mesurables sur la performance ou la fiabilité.",
    accroche:
      "Ingénieur informatique avec 5 ans d'expérience en architecture cloud et développement backend.",
    bullets: [
      "Conçu une architecture microservices supportant une multiplication par 4 du trafic sans incident",
      "Réduit les coûts d'infrastructure cloud de 30% via l'optimisation des ressources AWS",
      "Piloté la migration d'un monolithe vers une architecture cloud-native pour une équipe de 15 développeurs",
    ],
    competences: ["AWS/Azure", "Kubernetes", "Java/Python", "Architecture microservices", "CI/CD"],
    formation: "Diplôme d'ingénieur ou Master informatique",
  },
  {
    slug: "graphiste",
    nom: "Graphiste",
    intro:
      "Le CV d'un(e) graphiste doit renvoyer vers un portfolio solide et démontrer l'impact business des créations (conversion, notoriété).",
    accroche:
      "Graphiste freelance avec 4 ans d'expérience, spécialisé(e) dans l'identité de marque pour PME.",
    bullets: [
      "Conçu l'identité visuelle complète de 25+ marques, avec un taux de satisfaction client de 98%",
      "Augmenté le taux de clic des supports print et digitaux de 20% via une refonte des templates",
      "Livré en moyenne 12 projets par mois en respectant les délais dans 95% des cas",
    ],
    competences: ["Adobe Creative Suite", "Identité de marque", "Direction artistique", "Figma", "Print & digital"],
    formation: "BTS Design graphique ou école de communication visuelle",
  },
  {
    slug: "auxiliaire-de-vie",
    nom: "Auxiliaire de vie",
    intro:
      "Un CV d'auxiliaire de vie valorise l'expérience auprès de publics spécifiques (personnes âgées, en situation de handicap) et les qualités relationnelles.",
    accroche:
      "Auxiliaire de vie avec 6 ans d'expérience auprès de personnes âgées dépendantes à domicile.",
    bullets: [
      "Accompagné au quotidien 5 bénéficiaires en perte d'autonomie dans les actes de la vie courante",
      "Mis en place un suivi personnalisé ayant permis le maintien à domicile de 3 bénéficiaires au-delà des pronostics initiaux",
      "Coordonné avec les familles et le personnel médical pour assurer la continuité des soins",
    ],
    competences: ["Aide à la toilette", "Aide aux repas", "Accompagnement social", "Diplôme d'État AES"],
    formation: "Diplôme d'État d'Accompagnant Éducatif et Social (DEAES)",
  },
  {
    slug: "conducteur-de-travaux",
    nom: "Conducteur de travaux",
    intro:
      "Le CV d'un conducteur de travaux met en avant les budgets et types de chantiers pilotés, la gestion des équipes et le respect des délais.",
    accroche:
      "Conducteur de travaux avec 7 ans d'expérience en gros œuvre, pilotage de chantiers jusqu'à 3 M€.",
    bullets: [
      "Piloté simultanément 4 chantiers de gros œuvre pour un budget cumulé de 5 M€",
      "Livré 90% des chantiers dans les délais contractuels sur les 3 dernières années",
      "Encadré des équipes de 15 à 40 compagnons selon les phases de chantier",
    ],
    competences: ["Gestion de chantier", "Lecture de plans", "Sécurité BTP", "Négociation fournisseurs", "AutoCAD"],
    formation: "BTS Bâtiment ou école d'ingénieur travaux publics",
  },
  {
    slug: "data-analyst",
    nom: "Data analyst",
    intro:
      "Un CV de data analyst doit démontrer l'impact business des analyses produites, pas seulement les outils maîtrisés.",
    accroche:
      "Data analyst avec 3 ans d'expérience, spécialisé(e) dans l'analyse marketing et la construction de tableaux de bord décisionnels.",
    bullets: [
      "Construit des tableaux de bord suivis par 5 directions, réduisant le temps de reporting de 60%",
      "Identifié un segment client représentant 15% du chiffre d'affaires additionnel via une analyse de cohortes",
      "Automatisé 8 rapports récurrents, économisant 10 heures de travail manuel par semaine",
    ],
    competences: ["SQL", "Python", "Power BI/Tableau", "Statistiques", "A/B testing"],
    formation: "Master en data science, statistiques ou école d'ingénieur",
  },
];

export function getMetier(slug: string) {
  return METIERS.find((m) => m.slug === slug);
}
