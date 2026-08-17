type CrossPromoTipProps = {
  message: string;
  href: string;
  linkLabel: string;
};

/**
 * Encart contextuel court vers un des autres outils du même créateur
 * (Facilo, Relance Chantier) — jamais un lien générique "découvrez aussi",
 * toujours un message qui répond à un besoin précis du lecteur à cet endroit.
 */
export function CrossPromoTip({ message, href, linkLabel }: CrossPromoTipProps) {
  return (
    <div className="mt-6 flex gap-3 rounded-[var(--radius-lg)] border border-line border-l-4 border-l-gold bg-surface p-4 text-sm text-ink-soft">
      <span aria-hidden="true">💡</span>
      <p>
        {message}{" "}
        <a href={href} className="font-semibold text-primary underline" rel="noopener">
          {linkLabel} →
        </a>
      </p>
    </div>
  );
}
