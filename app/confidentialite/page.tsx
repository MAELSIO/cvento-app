import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Confidentialité — CVento" };

export default function ConfidentialitePage() {
  return (
    <LegalPage title="Politique de confidentialité" updated="10 août 2026">
      <LegalSection title="1. Responsable du traitement">
        <p>
          [Éditeur — raison sociale à compléter], éditeur de CVento, est responsable du
          traitement des données personnelles décrites ci-dessous. Contact :{" "}
          <a href="mailto:maelsiohan01@gmail.com" className="text-primary hover:underline">
            maelsiohan01@gmail.com
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="2. Données collectées">
        <ul className="list-disc pl-5">
          <li>Données de compte : email, mot de passe (haché), nom, téléphone (optionnel).</li>
          <li>Contenu créé : CV, lettres de motivation, réponses au simulateur d&apos;entretien.</li>
          <li>Données de facturation : gérées directement par Stripe, jamais stockées par CVento.</li>
          <li>Données techniques : historique d&apos;utilisation des fonctions IA (pour le quota gratuit).</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Finalités">
        <p>
          Fourniture du service (création et export de CV/lettres), génération de contenu par
          IA, gestion des abonnements, prévention de la fraude, amélioration du produit,
          communication liée au compte (confirmation, relances).
        </p>
      </LegalSection>

      <LegalSection title="4. Hébergement et sous-traitants">
        <ul className="list-disc pl-5">
          <li><strong>Supabase</strong> (base de données et authentification) — hébergement en Union Européenne (région Frankfurt).</li>
          <li><strong>Anthropic</strong> (génération de contenu par IA) — le contenu du CV et de l&apos;offre ciblée est transmis pour générer les suggestions.</li>
          <li><strong>Stripe</strong> (paiement) — traite les données de paiement selon sa propre politique de confidentialité.</li>
          <li><strong>Resend</strong> (envoi d&apos;emails transactionnels et de relance).</li>
          <li><strong>Vercel</strong> (hébergement de l&apos;application).</li>
        </ul>
        <p>
          Certains de ces sous-traitants peuvent traiter des données hors Union Européenne ;
          dans ce cas, des garanties contractuelles appropriées (clauses contractuelles types)
          encadrent ces transferts.
        </p>
      </LegalSection>

      <LegalSection title="5. Durée de conservation">
        <p>
          Les données sont conservées tant que le compte est actif. En cas de suppression du
          compte (voir /dashboard/parametres), toutes les données associées sont supprimées
          définitivement et immédiatement de la base de données.
        </p>
      </LegalSection>

      <LegalSection title="6. Vos droits">
        <p>
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification,
          d&apos;effacement, de limitation, de portabilité et d&apos;opposition sur vos données.
        </p>
        <ul className="list-disc pl-5">
          <li>Accès et rectification : directement dans /dashboard/parametres.</li>
          <li>Effacement complet : bouton &quot;Supprimer mon compte&quot; dans /dashboard/parametres.</li>
          <li>Toute autre demande : maelsiohan01@gmail.com.</li>
        </ul>
        <p>
          Vous pouvez également introduire une réclamation auprès de la CNIL
          (cnil.fr) si vous estimez que vos droits ne sont pas respectés.
        </p>
      </LegalSection>

      <LegalSection title="7. Sécurité">
        <p>
          Les mots de passe sont hachés, jamais stockés en clair. L&apos;accès aux données est
          protégé par des politiques de sécurité au niveau de la base de données (Row Level
          Security) garantissant qu&apos;un utilisateur ne peut accéder qu&apos;à ses propres
          données.
        </p>
      </LegalSection>

      <LegalSection title="8. Cookies">
        <p>
          Voir notre <a href="/cookies" className="text-primary hover:underline">politique de cookies</a> dédiée.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
