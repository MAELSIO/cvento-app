import { createClient } from "@/lib/supabase/server";
import { createCoverLetter, deleteCoverLetter } from "@/lib/actions/cover-letters";

export default async function LettresPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: letters }, { data: cvs }] = await Promise.all([
    supabase
      .from("cover_letters")
      .select("id, title, updated_at")
      .eq("user_id", user!.id)
      .order("updated_at", { ascending: false }),
    supabase.from("cvs").select("id, title").eq("user_id", user!.id),
  ]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Lettres de motivation</h1>
      </div>

      {!cvs || cvs.length === 0 ? (
        <div className="rounded-[var(--radius-lg)] border border-dashed border-line bg-surface p-10 text-center text-sm text-ink-soft">
          Créez d&apos;abord un CV pour pouvoir générer une lettre de motivation associée.
        </div>
      ) : (
        <form action={async (formData) => {
          "use server";
          const cvId = formData.get("cvId") as string;
          await createCoverLetter(cvId);
        }} className="mb-8 flex flex-wrap items-center gap-3 rounded-[var(--radius-lg)] border border-line bg-surface p-4">
          <label className="text-sm font-semibold text-ink-soft">Pour quel CV ?</label>
          <select name="cvId" required className="rounded-[var(--radius-sm)] border-2 border-line px-3 py-2 text-sm">
            {cvs.map((cv) => (
              <option key={cv.id} value={cv.id}>{cv.title}</option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-[var(--radius-sm)] bg-primary px-4 py-2 text-sm font-bold text-white shadow-[0_4px_0_var(--primary-dark)]"
          >
            + Nouvelle lettre
          </button>
        </form>
      )}

      {letters && letters.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {letters.map((letter) => (
            <div key={letter.id} className="rounded-[var(--radius)] border border-line bg-surface p-5 shadow-sm">
              <h2 className="font-display text-lg font-semibold">{letter.title}</h2>
              <p className="mt-1 text-xs text-ink-faint">
                Modifiée le {new Date(letter.updated_at).toLocaleDateString("fr-FR")}
              </p>
              <div className="mt-4 flex gap-2">
                <a
                  href={`/dashboard/lettres/${letter.id}`}
                  className="rounded-[var(--radius-sm)] bg-primary px-3 py-2 text-xs font-bold text-white"
                >
                  Éditer
                </a>
                <form action={deleteCoverLetter.bind(null, letter.id)}>
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
