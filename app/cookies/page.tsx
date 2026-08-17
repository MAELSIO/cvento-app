import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";
import { ManageCookiesButton } from "@/components/ManageCookiesButton";

export const metadata: Metadata = { title: "Cookies — CVento" };

export default function CookiesPage() {
  return (
    <LegalPage title="Politique de cookies" updated="16 août 2026">
      <LegalSection title="Qu'est-ce qu'un cookie ?">
        <p>
          Un cookie est un petit fichier déposé sur votre appareil lors de la visite d&apos;un
          site, qui permet notamment de vous reconnaître d&apos;une page à l&apos;autre.
        </p>
      </LegalSection>

      <LegalSection title="Ce que CVento utilise">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Un cookie de session strictement nécessaire</strong>, déposé par Supabase
            Auth pour vous maintenir connecté. Non soumis à consentement (cookie nécessaire au
            service demandé par l&apos;utilisateur).
          </li>
          <li>
            <strong>GoatCounter</strong>, un outil de mesure d&apos;audience qui ne dépose aucun
            cookie et ne vous identifie pas individuellement. Toujours actif, sans consentement
            requis, conformément à l&apos;exemption CNIL pour ce type d&apos;outil.
          </li>
          <li>
            <strong>Google Analytics 4</strong>, qui dépose des cookies de mesure d&apos;audience
            (<code>_ga</code>). <strong>Chargé uniquement si vous cliquez sur « Accepter »</strong>{" "}
            sur le bandeau affiché en bas de page — jamais avant.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Votre choix">
        <p>
          Refuser est aussi simple qu&apos;accepter : aucune case n&apos;est cochée par défaut,
          refuser n&apos;empêche jamais d&apos;utiliser CVento, et Google Analytics ne se charge
          pas tant que vous n&apos;avez pas cliqué sur « Accepter ». Un refus supprime aussi les
          cookies déjà déposés le cas échéant. Vous pouvez changer d&apos;avis à tout moment :
        </p>
        <ManageCookiesButton />
      </LegalSection>

      <LegalSection title="Comment gérer vos cookies">
        <p>
          Vous pouvez aussi supprimer les cookies déposés via les réglages de votre navigateur.
          La suppression du cookie de session vous déconnectera simplement de CVento.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
