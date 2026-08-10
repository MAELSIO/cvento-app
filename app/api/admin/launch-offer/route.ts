import { NextResponse, type NextRequest } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

/**
 * Active/désactive l'offre de lancement (bannière + STRIPE_LAUNCH_PROMO_CODE
 * déjà appliqué au checkout — voir lib/stripe.ts). Pas d'interface admin :
 * un simple appel protégé par ADMIN_KEY, cohérent avec le reste du projet
 * (pas de back-office à construire pour un lancement solo).
 *
 * Exemple :
 *   curl -X POST https://votre-domaine/api/admin/launch-offer \
 *     -H "x-admin-key: VOTRE_ADMIN_KEY" -H "Content-Type: application/json" \
 *     -d '{"active": true, "message": "Offre de lancement : -50% ce mois-ci"}'
 */
export async function POST(request: NextRequest) {
  if (request.headers.get("x-admin-key") !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "Clé admin invalide." }, { status: 403 });
  }

  const body = await request.json().catch(() => ({}));
  const active = Boolean(body.active);
  const message = typeof body.message === "string" ? body.message : "";

  const supabase = createServiceClient();
  const { error } = await supabase
    .from("app_settings")
    .update({ value: { active, message }, updated_at: new Date().toISOString() })
    .eq("key", "launch_offer");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, active, message });
}

export async function GET(request: NextRequest) {
  if (request.headers.get("x-admin-key") !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "Clé admin invalide." }, { status: 403 });
  }
  const supabase = createServiceClient();
  const { data } = await supabase.from("app_settings").select("value").eq("key", "launch_offer").single();
  return NextResponse.json(data?.value ?? { active: false, message: "" });
}
