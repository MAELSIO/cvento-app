export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <a href="/" className="mb-8 inline-flex items-center gap-2.5 font-display text-lg font-bold">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
          C
        </span>
        CVento
      </a>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-1 text-xs text-ink-faint">Dernière mise à jour : {updated}</p>
      <div className="prose-legal mt-8 flex flex-col gap-6 text-sm leading-relaxed text-ink-soft">{children}</div>
    </main>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 font-display text-lg font-semibold text-ink">{title}</h2>
      <div className="flex flex-col gap-2">{children}</div>
    </section>
  );
}
