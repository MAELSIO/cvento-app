import { TESTIMONIALS } from "@/lib/data/testimonials";

export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="border-t border-line bg-surface py-16">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center font-display text-2xl font-bold">Ce qu'en disent les utilisateurs</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="rounded-[var(--radius-lg)] border border-line bg-white p-6">
              <p className="text-sm text-ink-soft">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-4 font-display text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-ink-faint">{t.role}</p>
              {t.sourceUrl && (
                <a
                  href={t.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-xs font-bold text-primary hover:underline"
                >
                  {t.sourceLabel ?? "Voir l'avis original"} ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
