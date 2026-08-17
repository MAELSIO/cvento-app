const ROWS: [string, string, string][] = [
  [
    "Lettre de motivation à la française",
    "Générée nativement (formule d'appel, 3 paragraphes, formule de politesse)",
    "Génération générique, souvent traduite de l'anglais",
  ],
  [
    "Intitulés attendus par les ATS français",
    "« Expérience professionnelle », « Formation »…",
    "Intitulés anglo-saxons ou traductions approximatives",
  ],
  [
    "Score de compatibilité ciblé sur l'offre",
    "Calculé sur une vingtaine de critères, pour le poste visé",
    "Rarement disponible, ou générique",
  ],
  [
    "Paiement unique, accès à vie",
    "149 € une fois, sans engagement récurrent",
    "Généralement abonnement uniquement",
  ],
  [
    "Support client en français",
    "Par une vraie personne, réponse rapide",
    "Support générique, souvent anglophone",
  ],
];

export function ComparisonTable({ compact = false }: { compact?: boolean }) {
  return (
    <div>
      {!compact && (
        <>
          <h2 className="text-center font-display text-2xl font-bold">
            CVento face aux générateurs généralistes
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-ink-soft">
            Canva, Zety, Novoresume, ChatCV… sont de bons outils, mais pensés d&apos;abord pour le
            marché anglo-saxon. Voici ce que ça change concrètement.
          </p>
        </>
      )}
      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse overflow-hidden rounded-[var(--radius-lg)] border border-line text-sm">
          <thead>
            <tr className="bg-white text-left">
              <th className="border-b border-line p-4 font-display font-semibold text-ink-soft">
                &nbsp;
              </th>
              <th className="border-b border-line bg-primary-tint p-4 font-display font-semibold text-primary-dark">
                CVento
              </th>
              <th className="border-b border-line p-4 font-display font-semibold text-ink-soft">
                Canva / Zety / Novoresume / ChatCV
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([label, cvento, autres]) => (
              <tr key={label} className="odd:bg-surface">
                <th scope="row" className="border-b border-line p-4 text-left font-medium">{label}</th>
                <td className="border-b border-line bg-primary-tint p-4 text-ink-soft">
                  <span className="mr-1.5 text-primary">✓</span>
                  {cvento}
                </td>
                <td className="border-b border-line p-4 text-ink-faint">{autres}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-center text-xs text-ink-faint">
        Comparaison basée sur le positionnement général de ces outils — à vérifier sur leurs
        sites respectifs, qui évoluent régulièrement.
      </p>
    </div>
  );
}
