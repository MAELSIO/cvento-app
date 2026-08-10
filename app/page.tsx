import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: launchOffer } = await supabase
    .from("app_settings")
    .select("value")
    .eq("key", "launch_offer")
    .single();
  const offer = launchOffer?.value as { active: boolean; message: string } | undefined;

  return (
    <main>
      {offer?.active && offer.message && (
        <div className="bg-gold px-6 py-2 text-center text-sm font-semibold text-white">
          {offer.message}
        </div>
      )}
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <a href="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            C
          </span>
          CVento
        </a>
        <nav className="flex items-center gap-4 text-sm font-semibold text-ink-soft">
          <a href="/diagnostic" className="hover:text-primary">Diagnostic gratuit</a>
          <a href="/tarifs" className="hover:text-primary">Tarifs</a>
          <a href="/login" className="hover:text-primary">Connexion</a>
          <a
            href="/signup"
            className="rounded-[var(--radius-sm)] bg-primary px-4 py-2 text-white shadow-[0_4px_0_var(--primary-dark)]"
          >
            Créer mon CV gratuitement
          </a>
        </nav>
      </header>

      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">
          Un CV qui passe les filtres ATS,{" "}
          <span className="text-primary">écrit avec vous par l&apos;IA</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">
          CVento génère votre CV et votre lettre de motivation, ciblés sur l&apos;offre
          que vous visez, avec un score de compatibilité détaillé — pensé pour le
          marché français.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/signup"
            className="rounded-[var(--radius-sm)] bg-primary px-6 py-3 text-sm font-bold text-white shadow-[0_4px_0_var(--primary-dark)]"
          >
            Créer mon CV gratuitement
          </a>
          <a
            href="/tarifs"
            className="rounded-[var(--radius-sm)] border-2 border-line px-6 py-3 text-sm font-bold text-ink hover:border-primary"
          >
            Voir les tarifs
          </a>
        </div>
        <p className="mt-4 text-xs text-ink-faint">
          Gratuit pour commencer, sans carte bancaire.
        </p>
      </section>

      <section className="border-t border-line bg-surface py-16">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 sm:grid-cols-3">
          <div>
            <h2 className="font-display text-lg font-semibold">Rédaction IA</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Décrivez votre poste, l&apos;IA rédige des points d&apos;expérience
              orientés résultats, avec verbes d&apos;action et chiffres.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold">Ciblage par mots-clés</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Collez l&apos;offre d&apos;emploi, CVento détecte les mots-clés
              importants et vous montre ce qu&apos;il manque à votre CV.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold">Lettre de motivation</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Générée à partir de votre CV et de l&apos;offre ciblée, adaptée aux
              codes français.
            </p>
          </div>
        </div>
      </section>

      <footer className="px-6 py-10 text-center text-xs text-ink-faint">
        <nav className="mb-3 flex flex-wrap items-center justify-center gap-4">
          <a href="/tarifs" className="hover:text-primary">Tarifs</a>
          <a href="/blog" className="hover:text-primary">Blog</a>
          <a href="/exemples-cv" className="hover:text-primary">Exemples de CV</a>
          <a href="/diagnostic" className="hover:text-primary">Diagnostic gratuit</a>
          <a href="/cgu" className="hover:text-primary">CGU</a>
          <a href="/confidentialite" className="hover:text-primary">Confidentialité</a>
          <a href="/cookies" className="hover:text-primary">Cookies</a>
        </nav>
        © {new Date().getFullYear()} CVento
      </footer>
    </main>
  );
}
