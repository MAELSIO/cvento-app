export type Subscription = {
  status: "none" | "trialing" | "active" | "past_due" | "canceled";
  is_lifetime: boolean;
} | null;

/** Un compte a l'accès Pro s'il est abonné actif/en essai, ou s'il a payé l'accès à vie. */
export function hasProAccess(subscription: Subscription): boolean {
  if (!subscription) return false;
  return subscription.is_lifetime || subscription.status === "active" || subscription.status === "trialing";
}

export const FREE_PLAN_MAX_CVS = 1;
export const FREE_PLAN_AI_QUOTA_PER_DAY = 5;
