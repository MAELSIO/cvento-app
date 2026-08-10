import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Cookies — CVento" };

export default function CookiesPage() {
  return (
    <LegalPage title="Politique de cookies" updated="10 août 2026">
      <LegalSection title="Qu'est-ce qu'un cookie ?">
        <p>
          Un cookie est un petit fichier déposé sur votre appareil lors de la visite d&apos;un
          site, qui permet notamment de vous reconnaître d&apos;une page à l&apos;autre.
        </p>
      </LegalSection>

      <LegalSection title="Ce que CVento utilise aujourd'hui">
        <p>
          À ce jour, CVento n&apos;utilise <strong>qu&apos;un seul type de cookie, strictement
          nécessaire</strong> au fonctionnement du service : le cookie de session déposé par
          Supabase Auth pour vous maintenir connecté. Ce cookie ne sert à aucune mesure
          d&apos;audience, aucun ciblage publicitaire, et n&apos;est pas soumis à consentement
          au sens de la réglementation (cookie strictement nécessaire au service demandé par
          l&apos;utilisateur).
        </p>
        <p>Aucun cookie de mesure d&apos;audience ou publicitaire n&apos;est déposé aujourd&apos;hui.</p>
      </LegalSection>

      <LegalSection title="Si des cookies de mesure d'audience sont ajoutés">
        <p>
          Si un outil d&apos;analyse de trafic est ajouté à l&apos;avenir, il sera choisi parmi
          les solutions respectueuses de la vie privée (ex : Plausible ou Umami, sans cookie de
          suivi individuel) ; si un cookie non strictement nécessaire devait néanmoins être
          utilisé, un bandeau de consentement avec choix réel (accepter/refuser) serait affiché
          avant tout dépôt.
        </p>
      </LegalSection>

      <LegalSection title="Comment gérer vos cookies">
        <p>
          Vous pouvez à tout moment supprimer les cookies déposés via les réglages de votre
          navigateur. La suppression du cookie de session vous déconnectera simplement de
          CVento.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
