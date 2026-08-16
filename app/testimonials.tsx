import { TESTIMONIALS, type Testimonial } from "@/lib/data/testimonials";

function Stars({ note }: { note?: number }) {
  if (typeof note !== "number" || note < 1 || note > 5) return null;
  const full = Math.round(note);
  return (
    <div className="text-gold text-sm tracking-widest" aria-label={`Note : ${full} sur 5`}>
      {"★".repeat(full)}
      {"☆".repeat(5 - full)}
    </div>
  );
}

function reviewSchema(entries: Testimonial[]) {
  const review = entries.map((t) => ({
    "@type": "Review",
    author: { "@type": "Person", name: t.prenom },
    reviewBody: t.citation,
    ...(typeof t.note === "number"
      ? { reviewRating: { "@type": "Rating", ratingValue: t.note, bestRating: 5 } }
      : {}),
  }));
  const noted = entries.filter((t) => typeof t.note === "number");
  const aggregateRating = noted.length
    ? {
        "@type": "AggregateRating",
        ratingValue: Math.round((noted.reduce((s, t) => s + (t.note ?? 0), 0) / noted.length) * 10) / 10,
        reviewCount: noted.length,
      }
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CVento",
    url: "https://www.cvento.fr",
    review,
    ...(aggregateRating ? { aggregateRating } : {}),
  };
}

export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="border-t border-line bg-surface py-16">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center font-display text-2xl font-bold">Ce qu'en disent les utilisateurs</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.prenom + t.dateAjout} className="rounded-[var(--radius-lg)] border border-line bg-white p-6">
              <Stars note={t.note} />
              <blockquote className="mt-2 text-sm text-ink-soft">&ldquo;{t.citation}&rdquo;</blockquote>
              <div className="mt-4 flex items-center gap-3">
                {t.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={t.photo}
                    alt={`Photo de ${t.prenom}`}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : null}
                <div>
                  <p className="font-display text-sm font-semibold">{t.prenom}</p>
                  <p className="text-xs text-ink-faint">{[t.role, t.ville].filter(Boolean).join(", ")}</p>
                </div>
              </div>
              {t.lienSource && (
                <a
                  href={t.lienSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-xs font-bold text-primary hover:underline"
                >
                  {t.lienLabel ?? "Voir l'avis original"} ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema(TESTIMONIALS)) }}
      />
    </section>
  );
}
