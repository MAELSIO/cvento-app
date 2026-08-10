"use server";

import { randomBytes, createHash } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/**
 * Crée un nouveau jeton d'accès personnel pour l'extension navigateur.
 * Le jeton en clair n'est retourné qu'une seule fois, à la création — la
 * base ne conserve que son empreinte SHA-256 (voir 0003_api_tokens.sql).
 */
export async function createApiToken(name: string): Promise<string> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const token = `cvt_live_${randomBytes(32).toString("hex")}`;

  const { error } = await supabase.from("api_tokens").insert({
    user_id: user.id,
    token_hash: hashToken(token),
    name: name || "Extension navigateur",
  });
  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/parametres");
  return token;
}

export async function listApiTokens() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data } = await supabase
    .from("api_tokens")
    .select("id, name, created_at, last_used_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return data ?? [];
}

export async function revokeApiToken(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  await supabase.from("api_tokens").delete().eq("id", id).eq("user_id", user.id);
  revalidatePath("/dashboard/parametres");
}
