import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasProAccess } from "@/lib/plan";

/**
 * Le proxy (proxy.ts) ne vérifie que la session (connecté ou non). Ici on
 * charge le plan pour l'affichage (badge, CTA upgrade) — contrairement à
 * Facilo Pro, le dashboard CVento reste accessible aux comptes gratuits :
 * chaque fonctionnalité vérifie individuellement si elle est limitée.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status, is_lifetime")
    .eq("user_id", user.id)
    .single();

  const isPro = hasProAccess(subscription);

  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-4">
          <a href="/dashboard" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
              C
            </span>
            CVento
          </a>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-ink-soft">
            <a href="/dashboard" className="hover:text-primary">Mes CV</a>
            <a href="/dashboard/lettres" className="hover:text-primary">Lettres</a>
            <a href="/dashboard/entretien" className="hover:text-primary">Entretien</a>
            <a href="/dashboard/parrainage" className="hover:text-primary">Parrainage</a>
            <a href="/dashboard/parametres" className="hover:text-primary">Paramètres</a>
            <span
              className={
                isPro
                  ? "rounded-full bg-primary-tint px-2 py-1 text-primary-dark"
                  : "rounded-full bg-gold-tint px-2 py-1 text-gold"
              }
            >
              {isPro ? "Pro" : "Gratuit"}
            </span>
            {!isPro && (
              <a
                href="/tarifs"
                className="rounded-full bg-primary px-3 py-1 text-white hover:bg-primary-dark"
              >
                Passer au Pro
              </a>
            )}
          </nav>
          <span className="text-xs text-ink-faint">{user.email}</span>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
      <footer className="border-t border-line px-6 py-6 text-center text-xs text-ink-faint">
        Une question, un souci ?{" "}
        <a href="mailto:maelsiohan01@gmail.com" className="text-primary hover:underline">
          maelsiohan01@gmail.com
        </a>
      </footer>
    </div>
  );
}
