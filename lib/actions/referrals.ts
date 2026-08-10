"use server";

import { redirect } from "next/navigation";
import { createClient, createServiceClient } from "@/lib/supabase/server";

const REFERRAL_BONUS_CREDITS = 10;

function generateCode(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase();
}

/** Retourne le code de parrainage de l'utilisateur connecté, en le créant s'il n'existe pas encore. */
export async function getOrCreateReferralCode(): Promise<string> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: existing } = await supabase
    .from("referrals")
    .select("code")
    .eq("user_id", user.id)
    .single();
  if (existing) return existing.code;

  // Boucle courte pour éviter une collision improbable sur la clé primaire `code`.
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = generateCode();
    const { error } = await supabase.from("referrals").insert({ code, user_id: user.id });
    if (!error) return code;
  }
  throw new Error("Impossible de générer un code de parrainage.");
}

export async function getReferralStats() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: referral } = await supabase
    .from("referrals")
    .select("code")
    .eq("user_id", user.id)
    .single();
  if (!referral) return { code: null, count: 0 };

  const { count } = await supabase
    .from("referral_redemptions")
    .select("id", { count: "exact", head: true })
    .eq("code", referral.code);

  return { code: referral.code, count: count ?? 0 };
}

/**
 * Appelé juste après l'inscription d'un nouveau compte si l'URL contenait
 * ?ref=CODE. Crédite +10 générations IA au parrain ET au filleul.
 * L'incrément de bonus_ai_credits nécessite service_role (RLS l'interdit
 * en écriture côté client, voir 0001_init.sql/0002_growth.sql).
 */
export async function redeemReferral(code: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !code) return;

  const { data: referral } = await supabase
    .from("referrals")
    .select("user_id")
    .eq("code", code)
    .single();
  if (!referral || referral.user_id === user.id) return;

  const service = createServiceClient();

  const { error } = await service
    .from("referral_redemptions")
    .insert({ code, referred_user_id: user.id });
  if (error) return; // déjà parrainé, ou code invalide entre-temps — silencieux, non bloquant

  for (const uid of [referral.user_id, user.id]) {
    const { data: sub } = await service
      .from("subscriptions")
      .select("bonus_ai_credits")
      .eq("user_id", uid)
      .single();
    await service
      .from("subscriptions")
      .update({ bonus_ai_credits: (sub?.bonus_ai_credits ?? 0) + REFERRAL_BONUS_CREDITS })
      .eq("user_id", uid);
  }
}
