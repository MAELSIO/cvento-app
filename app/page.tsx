import { createClient } from "@/lib/supabase/server";
import { CvPreview } from "@/app/dashboard/cv/[id]/cv-preview";
import { computeAtsScore } from "@/lib/scoring/ats-score";
import { AI_FEATURES_ENABLED } from "@/lib/ai/feature-flag";
import type { CvContent } from "@/lib/types/cv";

/**
 * Contenu d'exemple pour l'aperçu produit de la page d'accueil — un CV
 * fictif, pas un vrai utilisateur. Rendu avec le vrai composant CvPreview
 * et le vrai moteur de score (lib/scoring/ats-score.ts), donc le score
 * affiché est réellement calculé, pas inventé.
 */
const exampleCv: CvContent = {
  identite: {
    prenom: "Camille",
    nom: "Lefèvre",
    titre: "Chargée de projet marketing digital",
    email: "camille.lefevre@email.fr",
    telephone: "06 12 34 56 78",
    ville: "Lyon",
    permis: true,
  },
  resume:
    "Chargée de projet marketing avec 5 ans d'expérience en pilotage de campagnes digitales et gestion d'équipes. Spécialisée en acquisition, analyse de performance et coordination de prestataires.",
  experiences: [
    {
      id: "1",
      poste: "Chargée de projet marketing",
      entreprise: "Nova Digital",
      lieu: "Lyon",
      dateDebut: "2021",
      dateFin: "",
      enCours: true,
      bullets: [
        "Piloté 12 campagnes multicanales par an, avec une hausse de 34 % du taux de conversion moyen.",
        "Encadré une équipe de 3 alternants et coordonné 5 prestataires externes.",
        "Réduit le coût d'acquisition client de 22 % en 18 mois grâce à l'optimisation continue des budgets.",
      ],
    },
    {
      id: "2",
      poste: "Chargée de communication",
      entreprise: "Atelier Verre",
      lieu: "Villeurbanne",
      dateDebut: "2019",
      dateFin: "2021",
      enCours: false,
      bullets: [
        "Développé la présence réseaux sociaux de la marque, avec une audience multipliée par 3.",
        "Créé et animé le calendrier éditorial mensuel, en lien avec l'équipe commerciale.",
      ],
    },
  ],
  formations: [
    {
      id: "1",
      diplome: "Master Marketing Digital",
      etablissement: "IAE Lyon",
      lieu: "Lyon",
      dateDebut: "2017",
      dateFin: "2019",
    },
  ],
  competences: ["Google Ads", "Meta Ads", "SEO", "Analytics", "Gestion de projet", "Notion"],
  langues: [
    { id: "1", langue: "Anglais", niveau: "Courant" },
    { id: "2", langue: "Espagnol", niveau: "Intermédiaire" },
  ],
};

const exampleScore = computeAtsScore(exampleCv, exampleCv.identite.titre);
const exampleHighlights = exampleScore.criteria.filter((c) => c.passed).slice(0, 4);

const steps = [
  {
    title: "Créez votre compte",
    text: "Inscription en 30 secondes, gratuite, sans carte bancaire.",
  },
  {
    title: "Décrivez votre parcours",
    text: AI_FEATURES_ENABLED
      ? "Postes, missions, résultats : l'IA rédige des points d'expérience clairs et orientés résultats à partir de vos réponses."
      : "Postes, missions, résultats : décrivez votre parcours vous-même dès maintenant. La rédaction assistée par IA arrive très bientôt.",
  },
  {
    title: "Collez l'offre visée",
    text: "CVento détecte les mots-clés attendus et calcule un score de compatibilité détaillé avec l'offre.",
  },
  {
    title: "Téléchargez votre CV",
    text: "Export PDF ou Word, prêt à envoyer, avec votre lettre de motivation ciblée.",
  },
];

const faq = [
  {
    q: "Est-ce vraiment gratuit ?",
    a: AI_FEATURES_ENABLED
      ? "Oui. La création d'un CV, l'export PDF et le diagnostic sont accessibles gratuitement, sans carte bancaire. Les fonctionnalités Pro (CV illimités, IA illimitée, export Word, templates supplémentaires) sont proposées en abonnement optionnel."
      : "Oui. La création d'un CV, l'export PDF et le diagnostic sont accessibles gratuitement, sans carte bancaire. Les fonctionnalités Pro (CV illimités, export Word, templates supplémentaires) sont proposées en abonnement optionnel — la rédaction et le ciblage par IA sont en cours d'activation et arrivent très bientôt, pour tous les plans.",
  },
  {
    q: "Mes données sont-elles en sécurité ?",
    a: "Vos données sont hébergées en Europe et ne sont jamais revendues ni utilisées pour entraîner des modèles d'IA tiers. Vous pouvez supprimer votre compte et vos données à tout moment depuis vos paramètres.",
  },
  {
    q: "Combien de temps pour créer un CV ?",
    a: "Comptez 5 à 10 minutes pour un premier CV complet si vous partez de zéro, et quelques minutes seulement pour l'adapter ensuite à une nouvelle offre grâce au ciblage automatique.",
  },
  {
    q: "Le CV est-il vraiment optimisé pour les logiciels de recrutement (ATS) ?",
    a: "Oui. Les templates CVento utilisent une structure simple à parser (pas de tableaux, colonnes complexes ou images en fond) et le ciblage par mots-clés vous montre exactement ce qui manque par rapport à l'offre visée, deux critères déterminants pour les logiciels ATS.",
  },
  {
    q: "Puis-je annuler à tout moment ?",
    a: "Oui, en un clic depuis vos paramètres, sans engagement ni justification à fournir.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default async function HomePage() {
  const supabase = await createClient();
  const { data: launchOffer } = await supabase
    .from("app_settings")
    .select("value")
    .eq("key", "launch_offer")
    .single();
  const offer = launchOffer?.value as { active: boolean; message: string } | undefined;

  return (
    <main>
      {offer?.active && offer.message && (
        <div className="bg-gold px-6 py-2 text-center text-sm font-semibold text-white">
          {offer.message}
        </div>
      )}
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <a href="/" className="flex items-center gap-2.5 font-display text-lg font-bold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            C
          </span>
          CVento
        </a>
        <nav className="flex items-center gap-4 text-sm font-semibold text-ink-soft">
          <a href="/diagnostic" className="hover:text-primary">Diagnostic gratuit</a>
          <a href="/tarifs" className="hover:text-primary">Tarifs</a>
          <a href="/login" className="hover:text-primary">Connexion</a>
          <a
            href="/signup"
            className="rounded-[var(--radius-sm)] bg-primary px-4 py-2 text-white shadow-[0_4px_0_var(--primary-dark)]"
          >
            Créer mon CV gratuitement
          </a>
        </nav>
      </header>

      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="mx-auto mb-4 inline-block rounded-full bg-primary-tint px-3 py-1 text-xs font-bold text-primary-dark">
          100% gratuit pour commencer — sans carte bancaire
        </p>
        <h1 className="text-4xl font-bold sm:text-5xl">
          Un CV qui passe les filtres ATS,{" "}
          <span className="text-primary">écrit avec vous par l&apos;IA</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">
          CVento génère votre CV et votre lettre de motivation, ciblés sur l&apos;offre
          que vous visez, avec un score de compatibilité détaillé — pensé pour le
          marché français.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/signup"
            className="rounded-[var(--radius-sm)] bg-primary px-6 py-3 text-sm font-bold text-white shadow-[0_4px_0_var(--primary-dark)]"
          >
            Créer mon CV gratuitement
          </a>
          <a
            href="/tarifs"
            className="rounded-[var(--radius-sm)] border-2 border-line px-6 py-3 text-sm font-bold text-ink hover:border-primary"
          >
            Voir les tarifs
          </a>
        </div>
        <p className="mt-4 text-xs text-ink-faint">
          Gratuit pour commencer, sans carte bancaire.
        </p>
        {!AI_FEATURES_ENABLED && (
          <p className="mx-auto mt-3 max-w-md text-xs font-semibold text-gold">
            La rédaction et le ciblage par IA arrivent très bientôt. Le CV, le score
            de compatibilité et l&apos;export sont utilisables dès maintenant.
          </p>
        )}
      </section>

      <section className="border-t border-line bg-surface py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center font-display text-2xl font-bold">À quoi ressemble le résultat</h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm text-ink-soft">
            Exemple de CV et de score générés avec CVento — pas les données d&apos;un vrai utilisateur.
          </p>
          <div className="mt-10 grid gap-8 lg:grid-cols-[3fr_2fr] lg:items-start">
            <div>
              <CvPreview content={exampleCv} templateId="moderne-bleu" />
            </div>
            <div className="rounded-[var(--radius-lg)] border border-line bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
                Score de compatibilité (exemple)
              </p>
              <p className="mt-2 font-display text-4xl font-bold text-primary">
                {exampleScore.score}<span className="text-xl text-ink-faint">/100</span>
              </p>
              <p className="mt-1 text-xs text-ink-faint">
                Pour le poste : {exampleCv.identite.titre}
              </p>
              <ul className="mt-4 flex flex-col gap-2 text-sm">
                {exampleHighlights.map((c) => (
                  <li key={c.id} className="flex items-start gap-2">
                    <span className="mt-0.5 flex-none text-primary">✓</span>
                    <span className="text-ink-soft">{c.label}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-ink-faint">
                Calculé sur une vingtaine de critères (identité, structure, contenu, formatage, ciblage).
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center font-display text-2xl font-bold">Comment ça marche</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step.title}>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="mt-3 font-display text-base font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface py-16">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 sm:grid-cols-3">
          <div>
            <h2 className="font-display text-lg font-semibold">
              Rédaction IA
              {!AI_FEATURES_ENABLED && (
                <span className="ml-2 text-xs font-semibold text-gold">(bientôt disponible)</span>
              )}
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              Décrivez votre poste, l&apos;IA rédige des points d&apos;expérience
              orientés résultats, avec verbes d&apos;action et chiffres.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold">
              Ciblage par mots-clés
              {!AI_FEATURES_ENABLED && (
                <span className="ml-2 text-xs font-semibold text-gold">(bientôt disponible)</span>
              )}
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              Collez l&apos;offre d&apos;emploi, CVento détecte les mots-clés
              importants et vous montre ce qu&apos;il manque à votre CV.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold">
              Lettre de motivation
              {!AI_FEATURES_ENABLED && (
                <span className="ml-2 text-xs font-semibold text-gold">(bientôt disponible)</span>
              )}
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              Générée à partir de votre CV et de l&apos;offre ciblée, adaptée aux
              codes français.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center font-display text-2xl font-bold">
            Pensé pour le marché français, concrètement
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-ink-soft">
            La plupart des générateurs de CV populaires sont conçus pour le marché
            anglo-saxon. Les codes n&apos;y sont pas les mêmes.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-display text-base font-semibold">
                La lettre de motivation reste incontournable
              </h3>
              <p className="mt-1 text-sm text-ink-soft">
                Aux États-Unis et au Royaume-Uni, elle a quasiment disparu. En France,
                elle est encore attendue pour la majorité des candidatures — CVento la
                génère nativement, pas comme un module accessoire.
              </p>
            </div>
            <div>
              <h3 className="font-display text-base font-semibold">
                Une structure de CV différente
              </h3>
              <p className="mt-1 text-sm text-ink-soft">
                Pas de &laquo; objective statement &raquo; à l&apos;américaine : les templates
                CVento suivent la structure attendue par les recruteurs français
                (identité, résumé, expériences, formation, compétences), sur une page.
              </p>
            </div>
            <div>
              <h3 className="font-display text-base font-semibold">
                Des intitulés de section en français
              </h3>
              <p className="mt-1 text-sm text-ink-soft">
                Les logiciels de tri (ATS) utilisés par les entreprises françaises
                cherchent des intitulés comme &laquo; Expérience professionnelle &raquo; ou
                &laquo; Formation &raquo;, pas leurs équivalents anglais mal traduits.
              </p>
            </div>
            <div>
              <h3 className="font-display text-base font-semibold">
                Des formules de politesse françaises
              </h3>
              <p className="mt-1 text-sm text-ink-soft">
                Les lettres générées respectent les codes français (formule d&apos;appel,
                structure en trois paragraphes, formule de politesse de clôture),
                pas des tournures traduites de l&apos;anglais.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-16">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-center font-display text-2xl font-bold">Questions fréquentes</h2>
          <div className="mt-8 flex flex-col gap-3">
            {faq.map((item) => (
              <details
                key={item.q}
                className="group rounded-[var(--radius-sm)] border border-line bg-surface p-4"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-display text-sm font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="flex-none text-primary transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 text-sm text-ink-soft">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface py-16 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-display text-2xl font-bold">Prêt à créer un CV qui passe les filtres ?</h2>
          <a
            href="/signup"
            className="mt-6 inline-block rounded-[var(--radius-sm)] bg-primary px-6 py-3 text-sm font-bold text-white shadow-[0_4px_0_var(--primary-dark)]"
          >
            Créer mon CV gratuitement
          </a>
          <p className="mt-3 text-xs text-ink-faint">Gratuit pour commencer, sans carte bancaire.</p>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <footer className="px-6 py-10 text-center text-xs text-ink-faint">
        <nav className="mb-3 flex flex-wrap items-center justify-center gap-4">
          <a href="/tarifs" className="hover:text-primary">Tarifs</a>
          <a href="/blog" className="hover:text-primary">Blog</a>
          <a href="/exemples-cv" className="hover:text-primary">Exemples de CV</a>
          <a href="/diagnostic" className="hover:text-primary">Diagnostic gratuit</a>
          <a href="/cgu" className="hover:text-primary">CGU</a>
          <a href="/confidentialite" className="hover:text-primary">Confidentialité</a>
          <a href="/cookies" className="hover:text-primary">Cookies</a>
        </nav>
        <p className="mb-3">
          Une question ?{" "}
          <a href="mailto:maelsiohan01@gmail.com" className="text-primary hover:underline">
            maelsiohan01@gmail.com
          </a>
        </p>
        © {new Date().getFullYear()} CVento
      </footer>
    </main>
  );
}
