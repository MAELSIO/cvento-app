"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";

export async function updateProfile(input: { fullName: string; phone: string }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: input.fullName, phone: input.phone })
    .eq("id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/parametres");
}

/**
 * Suppression définitive du compte et de toutes les données associées
 * (RGPD — voir cahier des charges). `auth.admin.deleteUser` supprime la
 * ligne auth.users ; les tables applicatives ont toutes une contrainte
 * `on delete cascade` sur `user_id` (voir supabase/migrations), donc tout
 * disparaît en cascade sans requête supplémentaire.
 */
export async function deleteAccount() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const service = createServiceClient();

  // Résilie l'abonnement Stripe avant de supprimer le compte : sinon un
  // client Pro continuerait à être facturé sans plus pouvoir se connecter.
  const { data: sub } = await service
    .from("subscriptions")
    .select("stripe_subscription_id")
    .eq("user_id", user.id)
    .single();
  if (sub?.stripe_subscription_id) {
    await stripe.subscriptions.cancel(sub.stripe_subscription_id).catch(() => {});
  }

  const { error } = await service.auth.admin.deleteUser(user.id);
  if (error) throw new Error(error.message);

  await supabase.auth.signOut();
  redirect("/");
}
