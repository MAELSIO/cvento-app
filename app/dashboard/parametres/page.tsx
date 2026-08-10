import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "./profile-form";
import { BillingSection } from "./billing-section";
import { DangerZone } from "./danger-zone";

export default async function ParametresPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: profile }, { data: subscription }] = await Promise.all([
    supabase.from("profiles").select("full_name, phone").eq("id", user!.id).single(),
    supabase
      .from("subscriptions")
      .select("status, is_lifetime, stripe_subscription_id, current_period_end")
      .eq("user_id", user!.id)
      .single(),
  ]);

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold">Paramètres</h1>
        <p className="mt-1 text-sm text-ink-faint">{user!.email}</p>
      </div>

      <ProfileForm initialFullName={profile?.full_name ?? ""} initialPhone={profile?.phone ?? ""} />

      <BillingSection
        status={subscription?.status ?? "none"}
        isLifetime={subscription?.is_lifetime ?? false}
        hasStripeSubscription={!!subscription?.stripe_subscription_id}
        currentPeriodEnd={subscription?.current_period_end ?? null}
      />

      <DangerZone />
    </div>
  );
}
