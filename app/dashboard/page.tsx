import { createClient } from "@/lib/supabase/server";
import { hasProAccess, FREE_PLAN_MAX_CVS } from "@/lib/plan";
import { createCv, deleteCv } from "@/lib/actions/cvs";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status, is_lifetime")
    .eq("user_id", user!.id)
    .single();
  const isPro = hasProAccess(subscription);

  const { data: cvs } = await supabase
    .from("cvs")
    .select("id, title, template, updated_at")
    .eq("user_id", user!.id)
    .order("updated_at", { ascending: false });

  const atLimit = !isPro && (cvs?.length ?? 0) >= FREE_PLAN_MAX_CVS;

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Mes CV</h1>
          {!isPro && (
            <p className="mt-1 text-sm text-ink-soft">
              Plan gratuit : {cvs?.length ?? 0}/{FREE_PLAN_MAX_CVS} CV actif.
            </p>
          )}
        </div>
        {atLimit ? (
          <a
            href="/tarifs?limite=cv"
            className="rounded-[var(--radius-sm)] bg-gold px-4 py-3 text-sm font-bold text-white shadow-[0_4px_0_#a8730f]"
          >
            Passer au Pro pour créer plus de CV
          </a>
        ) : (
          <form action={createCv}>
            <button
              type="submit"
              className="rounded-[var(--radius-sm)] bg-primary px-4 py-3 text-sm font-bold text-white shadow-[0_4px_0_var(--primary-dark)]"
            >
              + Créer un CV
            </button>
          </form>
        )}
      </div>

      {!cvs || cvs.length === 0 ? (
        <div className="rounded-[var(--radius-lg)] border border-dashed border-line bg-surface p-10 text-center text-sm text-ink-soft">
          Vous n&apos;avez pas encore de CV. Créez le premier en quelques minutes.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {cvs.map((cv) => (
            <div
              key={cv.id}
              className="rounded-[var(--radius)] border border-line bg-surface p-5 shadow-sm"
            >
              <h2 className="font-display text-lg font-semibold">{cv.title}</h2>
              <p className="mt-1 text-xs text-ink-faint">
                Modifié le {new Date(cv.updated_at).toLocaleDateString("fr-FR")}
              </p>
              <div className="mt-4 flex gap-2">
                <a
                  href={`/dashboard/cv/${cv.id}`}
                  className="rounded-[var(--radius-sm)] bg-primary px-3 py-2 text-xs font-bold text-white"
                >
                  Éditer
                </a>
                <form action={deleteCv.bind(null, cv.id)}>
                  <button
                    type="submit"
                    className="rounded-[var(--radius-sm)] border border-line px-3 py-2 text-xs font-semibold text-ink-soft hover:border-warn hover:text-warn"
                  >
                    Supprimer
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
