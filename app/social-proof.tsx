import { createServiceClient } from "@/lib/supabase/server";

/**
 * Preuve sociale honnête : ne s'affiche qu'une fois un volume credible
 * atteint (CREDIBLE_THRESHOLD), pour ne jamais montrer un chiffre
 * embarrassant en debut de vie du produit. S'active automatiquement des
 * que les chiffres reels le justifient, sans intervention manuelle.
 */
const CREDIBLE_THRESHOLD = 25;

export async function SocialProof() {
  const supabase = createServiceClient();
  const { count } = await supabase.from("cvs").select("id", { count: "exact", head: true });

  if (!count || count < CREDIBLE_THRESHOLD) return null;

  return (
    <p className="mx-auto mt-6 text-sm font-semibold text-ink-soft">
      <span className="text-primary">{count.toLocaleString("fr-FR")}</span> CV créés avec CVento
    </p>
  );
}
