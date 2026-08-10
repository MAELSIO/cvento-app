export default function AuthErrorPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-[var(--radius-lg)] border border-line bg-surface p-8 text-center shadow-sm">
        <h1 className="mb-2 text-xl font-bold">Lien invalide ou expiré</h1>
        <p className="mb-6 text-sm text-ink-soft">
          Ce lien de connexion n&apos;est plus valable. Redemandez-en un.
        </p>
        <a
          href="/login"
          className="inline-block rounded-[var(--radius-sm)] bg-primary px-4 py-3 text-sm font-bold text-white shadow-[0_4px_0_var(--primary-dark)]"
        >
          Retour à la connexion
        </a>
      </div>
    </main>
  );
}
