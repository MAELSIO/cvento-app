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
  {
    slug: "boulanger",
    nom: "Boulanger",
    intro:
      "Le CV d'un boulanger met en avant les types de production maîtrisés (traditionnelle, viennoiserie) et la gestion des volumes et des horaires spécifiques au métier.",
    accroche:
      "Boulanger avec 7 ans d'expérience en boulangerie artisanale, spécialisé dans le pain au levain naturel.",
    bullets: [
      "Assuré la production quotidienne de 300 à 400 pains, dans le respect des normes d'hygiène HACCP",
      "Développé une nouvelle gamme de pains spéciaux ayant généré 12% de chiffre d'affaires additionnel",
      "Formé 2 apprentis aux techniques de pétrissage et de façonnage traditionnelles",
    ],
    competences: ["Levain naturel", "Pétrissage", "HACCP", "Gestion des cuissons", "Gestion des stocks matières premières"],
    formation: "CAP Boulanger",
  },
  {
    slug: "patissier",
    nom: "Pâtissier",
    intro:
      "Un CV de pâtissier valorise la technicité (entremets, chocolaterie) et la capacité à tenir la cadence en période de forte demande (fêtes, événements).",
    accroche:
      "Pâtissier avec 5 ans d'expérience en pâtisserie fine, spécialisé dans les entremets et pièces sur-mesure.",
    bullets: [
      "Conçu et réalisé plus de 150 pièces sur-mesure par an pour des événements privés et professionnels",
      "Réduit les pertes matière de 15% par une meilleure planification de la production",
      "Géré seul la production de la période de Noël, représentant 25% du chiffre d'affaires annuel de la boutique",
    ],
    competences: ["Entremets", "Chocolaterie", "Tempérage", "Décoration", "Gestion de production"],
    formation: "CAP Pâtissier, Mention Complémentaire ou BTM",
  },
  {
    slug: "agent-immobilier",
    nom: "Agent immobilier",
    intro:
      "Le CV d'un agent immobilier doit être orienté résultats commerciaux : nombre de transactions, volumes vendus, délais de vente.",
    accroche:
      "Agent immobilier avec 4 ans d'expérience, spécialisé dans la vente de biens résidentiels en zone urbaine.",
    bullets: [
      "Réalisé 35 transactions immobilières par an en moyenne, pour un volume de vente de 8 M€",
      "Réduit le délai moyen de vente des biens en portefeuille de 90 à 60 jours",
      "Développé un réseau d'apporteurs d'affaires générant 20% des mandats obtenus",
    ],
    competences: ["Négociation", "Estimation immobilière", "Carte professionnelle", "CRM immobilier", "Droit immobilier"],
    formation: "BTS Professions Immobilières ou carte T",
  },
  {
    slug: "juriste-entreprise",
    nom: "Juriste d'entreprise",
    intro:
      "Un CV de juriste d'entreprise valorise les domaines de droit maîtrisés et l'impact direct des dossiers traités sur les risques ou les coûts de l'entreprise.",
    accroche:
      "Juriste d'entreprise avec 5 ans d'expérience en droit des contrats et droit social, au sein d'un groupe de 500 salariés.",
    bullets: [
      "Sécurisé plus de 200 contrats commerciaux par an, réduisant les litiges contractuels de 30%",
      "Piloté la mise en conformité RGPD de l'entreprise, évitant une sanction identifiée lors d'un audit externe",
      "Conseillé la direction sur 15 dossiers de contentieux prud'homal, avec un taux de règlement amiable de 80%",
    ],
    competences: ["Droit des contrats", "Droit social", "RGPD", "Contentieux", "Veille juridique"],
    formation: "Master en droit des affaires",
  },
  {
    slug: "architecte",
    nom: "Architecte",
    intro:
      "Le CV d'un architecte doit renvoyer vers un portfolio de réalisations et préciser les budgets et surfaces des projets pilotés.",
    accroche:
      "Architecte avec 6 ans d'expérience en agence, spécialisé dans les projets de rénovation et d'extension résidentielle.",
    bullets: [
      "Piloté 20 projets de la conception au dépôt de permis de construire, pour un budget cumulé de 12 M€",
      "Réduit le taux de refus de permis de construire de 15% à 5% via un travail préalable renforcé avec les services urbanisme",
      "Coordonné 8 corps de métier sur un chantier de rénovation de 1 200 m²",
    ],
    competences: ["AutoCAD/Revit", "Permis de construire", "Coordination de chantier", "Réglementation thermique", "Sketchup"],
    formation: "Diplôme d'État d'Architecte (DEA), inscription à l'Ordre",
  },
  {
    slug: "controleur-de-gestion",
    nom: "Contrôleur de gestion",
    intro:
      "Un CV de contrôleur de gestion doit démontrer la fiabilité des analyses produites et leur impact sur les décisions de la direction.",
    accroche:
      "Contrôleur de gestion avec 5 ans d'expérience, en charge du suivi budgétaire d'un périmètre de 15 M€ de chiffre d'affaires.",
    bullets: [
      "Réduit le délai de clôture mensuelle de 10 à 5 jours ouvrés en refondant le processus de reporting",
      "Identifié 400 K€ d'économies potentielles via une analyse des coûts par centre de profit",
      "Piloté la construction du budget annuel pour 6 directions opérationnelles",
    ],
    competences: ["Excel avancé", "SAP/Power BI", "Analyse budgétaire", "Reporting", "Contrôle de coûts"],
    formation: "Master CCA (Comptabilité Contrôle Audit) ou école de commerce",
  },
  {
    slug: "ingenieur-qualite",
    nom: "Ingénieur qualité",
    intro:
      "Le CV d'un ingénieur qualité valorise les certifications maîtrisées et l'impact mesurable sur les taux de non-conformité.",
    accroche:
      "Ingénieur qualité avec 5 ans d'expérience en industrie, spécialisé dans les certifications ISO 9001 et l'amélioration continue.",
    bullets: [
      "Réduit le taux de non-conformité produit de 4,2% à 1,8% en 18 mois via un plan d'action structuré",
      "Piloté avec succès le renouvellement de la certification ISO 9001 pour un site de 200 salariés",
      "Formé 30 opérateurs de production aux outils qualité (5S, AMDEC)",
    ],
    competences: ["ISO 9001", "AMDEC", "5S/Lean", "Audit qualité", "Amélioration continue"],
    formation: "École d'ingénieur ou Master Qualité",
  },
  {
    slug: "chef-de-rayon",
    nom: "Chef de rayon",
    intro:
      "Un CV de chef de rayon met en avant la gestion de compte d'exploitation, le management d'équipe et les résultats de vente du rayon.",
    accroche:
      "Chef de rayon avec 6 ans d'expérience en grande distribution, en charge d'un rayon générant 2 M€ de chiffre d'affaires annuel.",
    bullets: [
      "Augmenté le chiffre d'affaires du rayon de 8% en un an via une réorganisation de l'implantation",
      "Managé une équipe de 6 employés de rayon, avec un taux de turnover inférieur à la moyenne du magasin",
      "Réduit la démarque inconnue de 1,8% à 1,1% du chiffre d'affaires",
    ],
    competences: ["Gestion de compte d'exploitation", "Merchandising", "Management d'équipe", "Négociation fournisseurs"],
    formation: "BTS MCO ou Bac+3 distribution",
  },
  {
    slug: "receptionniste-hotel",
    nom: "Réceptionniste d'hôtel",
    intro:
      "Le CV d'un(e) réceptionniste d'hôtel valorise les langues parlées, le type d'établissement et la satisfaction client mesurée.",
    accroche:
      "Réceptionniste d'hôtel avec 4 ans d'expérience en hôtellerie 4 étoiles, trilingue français/anglais/espagnol.",
    bullets: [
      "Géré l'accueil et le check-in/check-out de 80 chambres en moyenne par jour",
      "Maintenu une note de satisfaction client de 4,7/5 sur les plateformes d'avis",
      "Optimisé le taux d'occupation via l'upselling, générant 25 K€ de revenus additionnels sur l'année",
    ],
    competences: ["PMS hôtelier (Opera)", "Anglais/Espagnol courant", "Gestion des réservations", "Relation client", "Upselling"],
    formation: "BTS Hôtellerie-Restauration ou Bachelor hôtellerie",
  },
  {
    slug: "ambulancier",
    nom: "Ambulancier",
    intro:
      "Un CV d'ambulancier valorise les types de transports effectués, les habilitations et le sang-froid dans les situations d'urgence.",
    accroche:
      "Ambulancier diplômé d'État avec 4 ans d'expérience en transport sanitaire d'urgence et programmé.",
    bullets: [
      "Assuré en moyenne 8 transports sanitaires par jour, dont des urgences vitales, dans le respect des délais",
      "Maintenu un taux de satisfaction patient de 96% sur les enquêtes de la structure",
      "Formé 3 nouveaux ambulanciers aux protocoles d'urgence et à la gestion du matériel médical",
    ],
    competences: ["Diplôme d'État Ambulancier", "AFGSU 2", "Gestes d'urgence", "Conduite d'urgence", "Régulation médicale"],
    formation: "Diplôme d'État d'Ambulancier (DEA)",
  },
  {
    slug: "masseur-kinesitherapeute",
    nom: "Masseur-kinésithérapeute",
    intro:
      "Le CV d'un(e) kinésithérapeute valorise les spécialisations (sport, rééducation post-opératoire) et le volume de patients suivis.",
    accroche:
      "Masseur-kinésithérapeute avec 5 ans d'expérience en cabinet libéral, spécialisé dans la rééducation post-traumatique.",
    bullets: [
      "Suivi en moyenne 12 patients par jour en cabinet libéral, avec un taux de reprise d'activité satisfaisant pour 90% des patients sportifs",
      "Développé un partenariat avec 2 clubs sportifs locaux pour le suivi de leurs athlètes",
      "Mis en place un protocole de rééducation post-opératoire du genou, réduisant la durée moyenne de rééducation de 15%",
    ],
    competences: ["Rééducation post-opératoire", "Kinésithérapie du sport", "Thérapie manuelle", "Diplôme d'État de Masseur-Kinésithérapeute"],
    formation: "Diplôme d'État de Masseur-Kinésithérapeute (DEMK)",
  },
  {
    slug: "professeur-des-ecoles",
    nom: "Professeur des écoles",
    intro:
      "Le CV d'un professeur des écoles valorise les niveaux enseignés, les projets pédagogiques menés et la gestion de classe.",
    accroche:
      "Professeur des écoles avec 6 ans d'expérience, ayant enseigné du CP au CM2 en école publique.",
    bullets: [
      "Enseigné à des classes de 25 à 28 élèves, avec un suivi individualisé des élèves en difficulté",
      "Conçu et piloté un projet pédagogique autour de la lecture ayant impliqué 4 classes de l'école",
      "Formé 2 professeurs stagiaires dans le cadre du compagnonnage académique",
    ],
    competences: ["Pédagogie différenciée", "Gestion de classe", "Projets pédagogiques", "Suivi des élèves à besoins particuliers"],
    formation: "Master MEEF, concours de Professeur des écoles (CRPE)",
  },
  {
    slug: "traducteur-interprete",
    nom: "Traducteur-interprète",
    intro:
      "Un CV de traducteur-interprète doit préciser les langues et domaines de spécialisation (juridique, technique, médical) avec des volumes traités.",
    accroche:
      "Traducteur-interprète indépendant, spécialisé dans la traduction juridique anglais-français, 5 ans d'expérience.",
    bullets: [
      "Traduit plus de 500 000 mots par an pour des cabinets d'avocats et entreprises internationales",
      "Assuré l'interprétariat simultané pour 20 conférences internationales sur les 3 dernières années",
      "Développé un glossaire juridique bilingue réutilisé par l'ensemble de l'équipe de traduction",
    ],
    competences: ["Traduction juridique", "Interprétariat simultané", "CAT tools (Trados)", "Anglais courant", "Relecture"],
    formation: "Master en Traduction (ESIT, ISIT ou équivalent)",
  },
  {
    slug: "charge-de-communication",
    nom: "Chargé de communication",
    intro:
      "Le CV d'un(e) chargé(e) de communication met en avant les campagnes pilotées et leur impact mesurable en visibilité ou en image.",
    accroche:
      "Chargé(e) de communication avec 4 ans d'expérience, spécialisé(e) dans la communication d'entreprise et les relations presse.",
    bullets: [
      "Piloté une campagne de communication ayant généré 40 retombées presse en un an",
      "Refondu la stratégie de contenu du site web, augmentant le trafic organique de 35%",
      "Coordonné la production de 3 événements internes annuels réunissant plus de 200 collaborateurs",
    ],
    competences: ["Relations presse", "Stratégie de contenu", "Réseaux sociaux", "Gestion d'événements", "Rédaction"],
    formation: "Master en communication ou école de communication",
  },
  {
    slug: "business-developer",
    nom: "Business developer",
    intro:
      "Le CV d'un business developer doit être entièrement orienté résultats commerciaux : pipeline généré, taux de conversion, chiffre d'affaires signé.",
    accroche:
      "Business developer avec 4 ans d'expérience en BtoB, spécialisé dans la prospection et le closing de comptes stratégiques.",
    bullets: [
      "Généré 1,2 M€ de chiffre d'affaires signé sur l'année, dépassant l'objectif de 120%",
      "Constitué un pipeline de 3 M€ via une stratégie de prospection outbound structurée",
      "Réduit le cycle de vente moyen de 90 à 65 jours en optimisant le processus de qualification",
    ],
    competences: ["Prospection BtoB", "Closing", "CRM (Salesforce/HubSpot)", "Négociation", "Social selling"],
    formation: "Bachelor/Master école de commerce",
  },
  {
    slug: "chef-de-produit",
    nom: "Chef de produit",
    intro:
      "Un CV de chef de produit démontre la capacité à piloter un produit de bout en bout, avec des indicateurs business à l'appui.",
    accroche:
      "Chef de produit avec 5 ans d'expérience, en charge d'une gamme de produits générant 5 M€ de chiffre d'affaires annuel.",
    bullets: [
      "Lancé 4 nouveaux produits sur 2 ans, représentant 20% du chiffre d'affaires de la gamme",
      "Augmenté la marge produit de 3 points via une renégociation des coûts de production",
      "Piloté une équipe transverse de 8 personnes (marketing, R&D, supply chain) sur le cycle de vie produit",
    ],
    competences: ["Gestion de gamme", "Étude de marché", "Pricing", "Roadmap produit", "Pilotage transverse"],
    formation: "Master en marketing ou école de commerce",
  },
  {
    slug: "analyste-financier",
    nom: "Analyste financier",
    intro:
      "Le CV d'un analyste financier valorise la rigueur analytique et l'impact des recommandations sur les décisions d'investissement.",
    accroche:
      "Analyste financier avec 4 ans d'expérience en corporate finance, spécialisé dans l'analyse de rentabilité des investissements.",
    bullets: [
      "Analysé plus de 30 dossiers d'investissement par an, pour un montant cumulé de 50 M€",
      "Construit des modèles financiers ayant permis d'identifier 2 M€ de surcoûts évitables",
      "Présenté des recommandations d'investissement directement au comité de direction",
    ],
    competences: ["Modélisation financière", "Excel avancé", "Valorisation d'entreprise", "Analyse de rentabilité", "Reporting financier"],
    formation: "Master Finance ou école de commerce",
  },
  {
    slug: "technicien-reseau-informatique",
    nom: "Technicien réseau informatique",
    intro:
      "Le CV d'un technicien réseau met en avant les infrastructures gérées et les indicateurs de disponibilité et de résolution d'incidents.",
    accroche:
      "Technicien réseau et systèmes avec 5 ans d'expérience, en charge de l'infrastructure d'un site de 300 utilisateurs.",
    bullets: [
      "Maintenu un taux de disponibilité réseau de 99,8% sur l'année",
      "Réduit le délai moyen de résolution des tickets de niveau 2 de 4h à 1h30",
      "Piloté la migration de l'infrastructure vers une solution cloud hybride sans interruption de service",
    ],
    competences: ["Administration réseau (Cisco)", "Active Directory", "Cloud hybride", "Sécurité informatique", "Support niveau 2/3"],
    formation: "BTS SIO ou Bac+3 informatique",
  },
  {
    slug: "magasinier-cariste",
    nom: "Magasinier cariste",
    intro:
      "Le CV d'un magasinier cariste valorise les CACES détenus, la précision des inventaires et la gestion des flux logistiques.",
    accroche:
      "Magasinier cariste avec 6 ans d'expérience en entrepôt logistique, titulaire des CACES 1, 3 et 5.",
    bullets: [
      "Géré la réception et l'expédition de 200 palettes par jour en moyenne, sans incident de sécurité",
      "Réduit l'écart d'inventaire annuel de 2,5% à 0,8% via une réorganisation du rangement",
      "Formé 4 nouveaux caristes à la conduite en sécurité et aux procédures de l'entrepôt",
    ],
    competences: ["CACES 1-3-5", "Gestion des stocks", "WMS (logiciel d'entrepôt)", "Préparation de commandes", "Sécurité entrepôt"],
    formation: "CAP Logistique ou titre professionnel Cariste",
  },
  {
    slug: "menuisier",
    nom: "Menuisier",
    intro:
      "Le CV d'un menuisier met en avant les matériaux et techniques maîtrisés (bois, PVC, alu) et les types de chantiers réalisés.",
    accroche:
      "Menuisier avec 7 ans d'expérience en agencement intérieur et pose de menuiseries extérieures.",
    bullets: [
      "Réalisé la pose de menuiseries extérieures sur plus de 100 chantiers résidentiels sans réserve à la réception",
      "Conçu et fabriqué des agencements sur-mesure pour une dizaine de projets haut de gamme par an",
      "Formé 2 apprentis aux techniques de fabrication et de pose",
    ],
    competences: ["Menuiserie bois/PVC/alu", "Lecture de plans", "Pose de menuiseries", "Agencement sur-mesure", "Habilitation travail en hauteur"],
    formation: "CAP/Bac Pro Menuisier",
  },
];

export function getMetier(slug: string) {
  return METIERS.find((m) => m.slug === slug);
}
