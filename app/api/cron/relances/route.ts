import { NextResponse, type NextRequest } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { resend, CVENTO_FROM_EMAIL } from "@/lib/resend";

export const maxDuration = 60;

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_MS = 3 * ONE_DAY_MS;

/**
 * Deux relances automatiques (voir cahier des charges, "emails de
 * relance") :
 *  - relance_cv_inacheve : compte créé depuis 24h, aucun CV créé.
 *  - relance_non_converti : au moins un CV, toujours en plan gratuit
 *    3 jours après l'inscription.
 * `email_log` (unique sur user_id+kind) garantit l'envoi une seule fois
 * par kind et par utilisateur. Planifiée quotidiennement (voir vercel.json),
 * protégée par CRON_SECRET comme le reste des routes de cron du projet.
 */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const supabase = createServiceClient();
  const now = Date.now();
  const results = { relance_cv_inacheve: 0, relance_non_converti: 0, failed: 0 };

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, created_at")
    .lte("created_at", new Date(now - ONE_DAY_MS).toISOString());

  const { data: sentLog } = await supabase.from("email_log").select("user_id, kind");
  const alreadySent = new Set((sentLog ?? []).map((r) => `${r.user_id}:${r.kind}`));

  for (const profile of profiles ?? []) {
    try {
      const [{ count: cvCount }, { data: subscription }] = await Promise.all([
        supabase.from("cvs").select("id", { count: "exact", head: true }).eq("user_id", profile.id),
        supabase.from("subscriptions").select("status, is_lifetime").eq("user_id", profile.id).single(),
      ]);

      const accountAgeMs = now - new Date(profile.created_at).getTime();
      const isPro = subscription?.is_lifetime || ["active", "trialing"].includes(subscription?.status ?? "");

      if ((cvCount ?? 0) === 0 && !alreadySent.has(`${profile.id}:relance_cv_inacheve`)) {
        const sent = await sendRelance(supabase, profile.id, "relance_cv_inacheve");
        if (sent) results.relance_cv_inacheve++;
      } else if (
        (cvCount ?? 0) > 0 &&
        !isPro &&
        accountAgeMs >= THREE_DAYS_MS &&
        !alreadySent.has(`${profile.id}:relance_non_converti`)
      ) {
        const sent = await sendRelance(supabase, profile.id, "relance_non_converti");
        if (sent) results.relance_non_converti++;
      }
    } catch {
      results.failed++;
    }
  }

  return NextResponse.json(results);
}

const SUBJECTS = {
  relance_cv_inacheve: "Votre CV vous attend sur CVento",
  relance_non_converti: "Débloquez tout le potentiel de votre CV",
};

const BODIES = {
  relance_cv_inacheve:
    "Vous vous êtes inscrit sur CVento mais n'avez pas encore créé de CV.\n\n" +
    "Ça prend 5 minutes : renseignez votre parcours, laissez l'IA rédiger vos points d'expérience, " +
    "et téléchargez votre CV en PDF.\n\n" +
    `${process.env.NEXT_PUBLIC_APP_URL}/dashboard\n\n` +
    "À bientôt,\nL'équipe CVento",
  relance_non_converti:
    "Vous avez créé votre CV sur CVento — bravo !\n\n" +
    "Avec le plan Pro, débloquez : CV illimités, IA illimitée, ciblage par mots-clés, score détaillé, " +
    "lettre de motivation générée automatiquement, et export sans filigrane.\n\n" +
    `${process.env.NEXT_PUBLIC_APP_URL}/tarifs\n\n` +
    "L'équipe CVento",
};

async function sendRelance(
  supabase: ReturnType<typeof createServiceClient>,
  userId: string,
  kind: "relance_cv_inacheve" | "relance_non_converti"
): Promise<boolean> {
  const { data: authUser } = await supabase.auth.admin.getUserById(userId);
  const email = authUser?.user?.email;
  if (!email) return false;

  await resend.emails.send({
    from: CVENTO_FROM_EMAIL,
    to: email,
    subject: SUBJECTS[kind],
    text: BODIES[kind],
  });

  await supabase.from("email_log").insert({ user_id: userId, kind });
  return true;
}
