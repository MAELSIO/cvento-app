"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { hasProAccess, FREE_PLAN_MAX_CVS } from "@/lib/plan";
import type { CvContent } from "@/lib/types/cv";
import { getTemplate, DEFAULT_TEMPLATE_ID } from "@/lib/templates/registry";

/** Crée un nouveau CV vide et redirige vers son édition. Bloque au-delà de la limite du plan gratuit. */
export async function createCv() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status, is_lifetime")
    .eq("user_id", user.id)
    .single();

  if (!hasProAccess(subscription)) {
    const { count } = await supabase
      .from("cvs")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id);

    if ((count ?? 0) >= FREE_PLAN_MAX_CVS) {
      redirect("/tarifs?limite=cv");
    }
  }

  const { data: cv, error } = await supabase
    .from("cvs")
    .insert({ user_id: user.id, template: DEFAULT_TEMPLATE_ID })
    .select("id")
    .single();

  if (error || !cv) {
    throw new Error(error?.message ?? "Impossible de créer le CV.");
  }

  redirect(`/dashboard/cv/${cv.id}`);
}

export async function deleteCv(cvId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  await supabase.from("cvs").delete().eq("id", cvId).eq("user_id", user.id);
  revalidatePath("/dashboard");
}

type SaveCvInput = {
  title: string;
  targetJobTitle: string;
  targetJobDescription: string;
  content: CvContent;
};

export async function saveCv(cvId: string, input: SaveCvInput) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase
    .from("cvs")
    .update({
      title: input.title || "Mon CV",
      target_job_title: input.targetJobTitle || null,
      target_job_description: input.targetJobDescription || null,
      content: input.content,
    })
    .eq("id", cvId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);

  revalidatePath(`/dashboard/cv/${cvId}`);
  revalidatePath("/dashboard");
}

/**
 * Change le template d'un CV. Revérifié côté serveur (jamais confiance au
 * client) : un compte gratuit ne peut choisir que le template gratuit,
 * même si la requête est forgée manuellement.
 */
export async function setCvTemplate(cvId: string, templateId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const template = getTemplate(templateId);

  if (!template.free) {
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("status, is_lifetime")
      .eq("user_id", user.id)
      .single();
    if (!hasProAccess(subscription)) {
      throw new Error("Ce template est réservé au plan Pro.");
    }
  }

  const { error } = await supabase
    .from("cvs")
    .update({ template: template.id })
    .eq("id", cvId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath(`/dashboard/cv/${cvId}`);
}
