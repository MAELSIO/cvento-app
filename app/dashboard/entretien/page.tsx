import { createClient } from "@/lib/supabase/server";
import { InterviewSimulator } from "./interview-simulator";

export default async function EntretienPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: cvs } = await supabase
    .from("cvs")
    .select("id, title, target_job_title, target_job_description")
    .eq("user_id", user!.id);

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-2 text-2xl font-bold">Préparation d&apos;entretien</h1>
      <p className="mb-8 text-sm text-ink-soft">
        Générez des questions probables pour le poste visé, entraînez-vous à répondre et
        recevez un retour de l&apos;IA sur chaque réponse.
      </p>

      {!cvs || cvs.length === 0 ? (
        <div className="rounded-[var(--radius-lg)] border border-dashed border-line bg-surface p-10 text-center text-sm text-ink-soft">
          Créez d&apos;abord un CV avec un poste visé pour démarrer une simulation.
        </div>
      ) : (
        <InterviewSimulator cvs={cvs} />
      )}
    </div>
  );
}
