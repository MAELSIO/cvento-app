"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";

async function requireSubscription() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: sub } = await supabase
    .from("subscriptions")
    .select("stripe_subscription_id")
    .eq("user_id", user.id)
    .single();

  if (!sub?.stripe_subscription_id) {
    throw new Error("Aucun abonnement récurrent associé à ce compte.");
  }
  return sub.stripe_subscription_id;
}

/**
 * Parcours de rétention à l'annulation (voir cahier des charges) : avant
 * de renvoyer vers l'annulation définitive, on propose une pause d'un
 * mois. `pause_collection` arrête la facturation mais laisse le statut
 * "active" — l'utilisateur garde l'accès Pro pendant la pause.
 */
export async function pauseSubscriptionOneMonth() {
  const subscriptionId = await requireSubscription();
  const resumesAt = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;

  await stripe.subscriptions.update(subscriptionId, {
    pause_collection: { behavior: "void", resumes_at: resumesAt },
  });

  revalidatePath("/dashboard/parametres");
}

/**
 * Deuxième option de rétention : réduction temporaire, si un coupon de
 * rétention a été créé dans Stripe (Produits > Coupons) et son ID
 * renseigné en variable d'environnement. Sans coupon configuré, cette
 * option reste masquée côté UI (voir parametres/retention-flow.tsx).
 */
export async function applyRetentionDiscount() {
  const subscriptionId = await requireSubscription();
  const couponId = process.env.STRIPE_RETENTION_COUPON_ID;
  if (!couponId) throw new Error("Aucune offre de réduction disponible actuellement.");

  await stripe.subscriptions.update(subscriptionId, { discounts: [{ coupon: couponId }] });
  revalidatePath("/dashboard/parametres");
}

/**
 * Annulation définitive, mais différée à la fin de la période déjà payée
 * (pas de coupure immédiate d'accès) — pratique standard, et cohérent
 * avec ce que fait le Customer Portal Stripe.
 */
export async function confirmCancellation() {
  const subscriptionId = await requireSubscription();
  await stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: true });
  revalidatePath("/dashboard/parametres");
}

export async function resumeSubscription() {
  const subscriptionId = await requireSubscription();
  await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: false,
    pause_collection: null,
  });
  revalidatePath("/dashboard/parametres");
}
