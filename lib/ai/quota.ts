import type { SupabaseClient } from "@supabase/supabase-js";
import { FREE_PLAN_AI_QUOTA_PER_DAY } from "@/lib/plan";

export type AiUsageKind = "bullet" | "keywords" | "score" | "cover_letter" | "interview";

/**
 * Lève une erreur si le quota IA gratuit du jour est dépassé. Les comptes
 * Pro ne sont jamais limités. `bonus_ai_credits` (parrainage) s'ajoute au
 * quota du jour — voir supabase/migrations/0002_growth.sql.
 */
export async function assertAiQuota(
  supabase: SupabaseClient,
  userId: string,
  isPro: boolean
) {
  if (isPro) return;

  const since = new Date();
  since.setHours(0, 0, 0, 0);

  const [{ count }, { data: sub }] = await Promise.all([
    supabase
      .from("ai_usage")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("created_at", since.toISOString()),
    supabase.from("subscriptions").select("bonus_ai_credits").eq("user_id", userId).single(),
  ]);

  const bonus = sub?.bonus_ai_credits ?? 0;
  if ((count ?? 0) >= FREE_PLAN_AI_QUOTA_PER_DAY + bonus) {
    throw new Error("QUOTA_EXCEEDED");
  }
}

export async function logAiUsage(supabase: SupabaseClient, userId: string, kind: AiUsageKind) {
  await supabase.from("ai_usage").insert({ user_id: userId, kind });
}
