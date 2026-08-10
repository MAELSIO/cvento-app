import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-07-29.dahlia",
  typescript: true,
});

/** IDs des prix Stripe "CVento Pro" — créés dans le Dashboard Stripe (Produits). */
export const PRICE_MONTHLY = process.env.STRIPE_PRICE_MONTHLY!;
export const PRICE_ANNUAL = process.env.STRIPE_PRICE_ANNUAL!;
/** Paiement unique "à vie" — Prix Stripe en mode "one time", pas récurrent. */
export const PRICE_LIFETIME = process.env.STRIPE_PRICE_LIFETIME!;

/**
 * Code promo optionnel pour une offre de lancement limitée dans le temps
 * (accès Pro temporairement gratuit ou réduit pour les nouveaux inscrits).
 * Créez un Coupon + Promotion Code dans Stripe et renseignez son ID ici.
 * Laissez STRIPE_LAUNCH_PROMO_CODE vide pour ne rien appliquer.
 */
export const LAUNCH_PROMO_CODE = process.env.STRIPE_LAUNCH_PROMO_CODE || undefined;

export type BillingPlan = "monthly" | "annual" | "lifetime";

export function priceIdForPlan(plan: BillingPlan): string {
  switch (plan) {
    case "monthly":
      return PRICE_MONTHLY;
    case "annual":
      return PRICE_ANNUAL;
    case "lifetime":
      return PRICE_LIFETIME;
  }
}
