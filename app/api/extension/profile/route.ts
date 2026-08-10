import { createHash } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { EMPTY_CV_CONTENT, type CvContent } from "@/lib/types/cv";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

/**
 * Lecture seule pour l'extension navigateur (voir extension/). Auth par
 * jeton personnel (Authorization: Bearer cvt_live_...), pas par cookie —
 * l'extension n'a pas de session Supabase. Le jeton est vérifié par son
 * empreinte SHA-256 (jamais stocké en clair, voir lib/actions/api-tokens.ts).
 * CORS ouvert : cette route est en lecture seule et protégée par le
 * jeton, pas par l'origine de la requête.
 */
export async function GET(request: NextRequest) {
  const auth = request.headers.get("authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) {
    return NextResponse.json({ error: "Jeton manquant." }, { status: 401, headers: CORS_HEADERS });
  }

  const tokenHash = createHash("sha256").update(token).digest("hex");
  const supabase = createServiceClient();

  const { data: apiToken } = await supabase
    .from("api_tokens")
    .select("id, user_id")
    .eq("token_hash", tokenHash)
    .single();

  if (!apiToken) {
    return NextResponse.json({ error: "Jeton invalide." }, { status: 401, headers: CORS_HEADERS });
  }

  await supabase
    .from("api_tokens")
    .update({ last_used_at: new Date().toISOString() })
    .eq("id", apiToken.id);

  const [{ data: profile }, { data: authUser }, { data: cvs }] = await Promise.all([
    supabase.from("profiles").select("full_name, phone").eq("id", apiToken.user_id).single(),
    supabase.auth.admin.getUserById(apiToken.user_id),
    supabase
      .from("cvs")
      .select("id, title, content")
      .eq("user_id", apiToken.user_id)
      .order("updated_at", { ascending: false })
      .limit(1),
  ]);

  const latestCv = cvs?.[0];
  const content: CvContent = {
    ...EMPTY_CV_CONTENT,
    ...((latestCv?.content as Partial<CvContent>) ?? {}),
  };

  return NextResponse.json(
    {
      email: authUser?.user?.email ?? "",
      fullName: profile?.full_name || [content.identite.prenom, content.identite.nom].filter(Boolean).join(" "),
      prenom: content.identite.prenom,
      nom: content.identite.nom,
      phone: profile?.phone || content.identite.telephone,
      ville: content.identite.ville,
      titre: content.identite.titre,
      permis: content.identite.permis,
      cvTitle: latestCv?.title ?? null,
    },
    { headers: CORS_HEADERS }
  );
}
