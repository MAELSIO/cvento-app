import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page introuvable — CVento" };

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 text-center">
      <a href="/" className="mb-8 inline-flex items-center gap-2.5 font-display text-lg font-bold">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
          C
        </span>
        CVento
      </a>
      <p className="font-display text-5xl font-bold text-primary">404</p>
      <h1 className="mt-4 text-xl font-bold">Cette page n&apos;existe pas</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Le lien est peut-être incorrect, ou la page a été déplacée.
      </p>
      <a
        href="/"
        className="mt-6 rounded-[var(--radius-sm)] bg-primary px-6 py-3 text-sm font-bold text-white shadow-[0_4px_0_var(--primary-dark)]"
      >
        Retour à l&apos;accueil
      </a>
    </main>
  );
}
