import { getOrCreateReferralCode, getReferralStats } from "@/lib/actions/referrals";
import { AI_FEATURES_ENABLED } from "@/lib/ai/feature-flag";
import { ReferralLink } from "./referral-link";

export default async function ParrainagePage() {
  const code = await getOrCreateReferralCode();
  const { count } = await getReferralStats(code);

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-2xl font-bold">Parrainage</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Partagez votre lien : chaque personne qui s&apos;inscrit avec reçoit 10 générations IA en
        plus, et vous aussi{!AI_FEATURES_ENABLED && " (crédités dès que l'IA sera activée)"}.
      </p>

      {code && <ReferralLink code={code} />}

      <p className="mt-6 text-sm text-ink-soft">
        <span className="font-bold text-ink">{count}</span> filleul{count > 1 ? "s" : ""} inscrit{count > 1 ? "s" : ""} via votre lien.
      </p>
    </div>
  );
}
