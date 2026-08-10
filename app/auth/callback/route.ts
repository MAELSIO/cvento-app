import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Point d'arrivée unique pour deux flux Supabase Auth :
 *  - OAuth Google (PKCE) : redirige ici avec ?code=...
 *  - Confirmation email/mot de passe : redirige ici avec
 *    ?token_hash=...&type=signup
 * Configurez dans Supabase Auth > URL Configuration : Redirect URLs doit
 * inclure https://votre-domaine/auth/callback
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/dashboard";

  const supabase = await createClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) redirect(next);
  } else if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) redirect(next);
  }

  redirect("/auth/error");
}
