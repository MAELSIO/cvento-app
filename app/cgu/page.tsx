import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = { title: "CGU — CVento", robots: { index: false } };

/**
 * [Éditeur] est un placeholder — à remplacer par la raison sociale et le
 * SIRET réels une fois l'entité légale enregistrée (indispensable avant
 * toute activation de paiements Stripe en mode live). Un avocat devrait
 * relire ces CGU avant mise en ligne réelle du service payant, comme pour
 * Facilo Pro.
 */
export default function CguPage() {
  return (
    <LegalPage title="Conditions Générales d'Utilisation et de Vente" updated="10 août 2026">
      <LegalSection title="1. Objet">
        <p>
          Les présentes Conditions Générales d&apos;Utilisation et de Vente (CGU/CGV) régissent
          l&apos;accès et l&apos;utilisation du service CVento, accessible à l&apos;adresse
          cvento.fr, édité par [Éditeur — raison sociale et SIRET à compléter].
        </p>
      </LegalSection>

      <LegalSection title="2. Description du service">
        <p>
          CVento propose un générateur de CV et de lettre de motivation assisté par
          intelligence artificielle, avec un plan gratuit limité (1 CV, fonctions IA limitées)
          et un plan Pro payant (mensuel, annuel ou paiement unique à vie) donnant accès à
          l&apos;ensemble des fonctionnalités décrites sur la page /tarifs.
        </p>
      </LegalSection>

      <LegalSection title="3. Compte utilisateur">
        <p>
          L&apos;utilisation de CVento nécessite la création d&apos;un compte (email/mot de passe
          ou connexion Google). L&apos;utilisateur est responsable de la confidentialité de ses
          identifiants et de toute activité effectuée depuis son compte.
        </p>
      </LegalSection>

      <LegalSection title="4. Prix et paiement">
        <p>
          Les tarifs en vigueur sont affichés sur la page /tarifs. Les paiements sont traités
          par Stripe ; CVento ne stocke jamais les données de carte bancaire. Les abonnements
          mensuels et annuels se renouvellent automatiquement jusqu&apos;à résiliation, réalisable
          à tout moment depuis /dashboard/parametres. L&apos;offre à vie correspond à un paiement
          unique donnant un accès permanent, sans renouvellement.
        </p>
      </LegalSection>

      <LegalSection title="5. Contenu généré par intelligence artificielle">
        <p>
          Les textes générés par l&apos;IA (points d&apos;expérience, lettres de motivation,
          questions et retours d&apos;entretien) sont des suggestions. L&apos;utilisateur reste
          seul responsable de vérifier l&apos;exactitude, la pertinence et la véracité des
          informations avant de les utiliser dans une candidature réelle.
        </p>
      </LegalSection>

      <LegalSection title="6. Propriété intellectuelle">
        <p>
          Les CV, lettres de motivation et contenus créés par l&apos;utilisateur lui
          appartiennent. La marque CVento, le site et son code restent la propriété de
          l&apos;éditeur.
        </p>
      </LegalSection>

      <LegalSection title="7. Responsabilité">
        <p>
          CVento est un outil d&apos;aide à la candidature ; il ne garantit ni entretien ni
          embauche. CVento ne saurait être tenu responsable des décisions prises par des
          employeurs ou recruteurs tiers.
        </p>
      </LegalSection>

      <LegalSection title="8. Résiliation et suppression de compte">
        <p>
          L&apos;utilisateur peut résilier son abonnement et/ou supprimer définitivement son
          compte et ses données à tout moment depuis /dashboard/parametres.
        </p>
      </LegalSection>

      <LegalSection title="9. Droit applicable">
        <p>Les présentes CGU sont soumises au droit français.</p>
      </LegalSection>

      <LegalSection title="10. Contact">
        <p>
          Pour toute question : <a href="mailto:maelsiohan01@gmail.com" className="text-primary hover:underline">maelsiohan01@gmail.com</a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
