"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createCoverLetter(cvId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: cv } = await supabase
    .from("cvs")
    .select("title")
    .eq("id", cvId)
    .eq("user_id", user.id)
    .single();
  if (!cv) throw new Error("CV introuvable.");

  const { data: letter, error } = await supabase
    .from("cover_letters")
    .insert({ user_id: user.id, cv_id: cvId, title: `Lettre — ${cv.title}` })
    .select("id")
    .single();

  if (error || !letter) throw new Error(error?.message ?? "Impossible de créer la lettre.");

  redirect(`/dashboard/lettres/${letter.id}`);
}

export async function saveCoverLetter(letterId: string, input: { title: string; content: string }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase
    .from("cover_letters")
    .update({ title: input.title || "Ma lettre de motivation", content: input.content })
    .eq("id", letterId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath(`/dashboard/lettres/${letterId}`);
  revalidatePath("/dashboard/lettres");
}

export async function deleteCoverLetter(letterId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  await supabase.from("cover_letters").delete().eq("id", letterId).eq("user_id", user.id);
  revalidatePath("/dashboard/lettres");
}
