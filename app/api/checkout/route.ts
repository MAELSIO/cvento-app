import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { stripe, priceIdForPlan, LAUNCH_PROMO_CODE, type BillingPlan } from "@/lib/stripe";

const VALID_PLANS: BillingPlan[] = ["monthly", "annual", "lifetime"];

/**
 * Crée une session Stripe Checkout pour l'utilisateur connecté.
 * `plan` détermine le mode : "monthly"/"annual" → abonnement récurrent,
 * "lifetime" → paiement unique (mode "payment", pas de subscription).
 */
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non connecté." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const plan = body.plan as BillingPlan;
  if (!VALID_PLANS.includes(plan)) {
    return NextResponse.json({ error: "Plan invalide." }, { status: 400 });
  }

  const { data: sub } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .single();

  const origin = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const priceId = priceIdForPlan(plan);

  const session = await stripe.checkout.sessions.create({
    mode: plan === "lifetime" ? "payment" : "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    // Nos produits Stripe n'ont pas de tax_code renseigné ; Managed Payments
    // (activé par défaut sur les nouveaux comptes) exige ce code sinon la
    // session échoue avec "the product tax code is missing". On désactive
    // Managed Payments plutôt que de dépendre d'un tax_code correctement
    // configuré côté Dashboard.
    managed_payments: { enabled: false },
    customer: sub?.stripe_customer_id || undefined,
    customer_email: sub?.stripe_customer_id ? undefined : user.email,
    client_reference_id: user.id,
    ...(plan !== "lifetime"
      ? { subscription_data: { metadata: { user_id: user.id } } }
      : { payment_intent_data: { metadata: { user_id: user.id } } }),
    payment_method_collection: "if_required",
    metadata: { user_id: user.id, plan },
    ...(LAUNCH_PROMO_CODE
      ? { discounts: [{ promotion_code: LAUNCH_PROMO_CODE }] }
      : { allow_promotion_codes: true }),
    success_url: `${origin}/dashboard?checkout=success`,
    cancel_url: `${origin}/dashboard?checkout=cancelled`,
  });

  return NextResponse.json({ url: session.url });
}
