"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function dashboardNext(ref: string | null): string {
  return ref ? `/dashboard?ref=${encodeURIComponent(ref)}` : "/dashboard";
}

function SignupForm() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(dashboardNext(ref))}`,
      },
    });

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
      return;
    }
    setStatus("sent");
  }

  async function handleGoogle() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: ref
          ? `${window.location.origin}/auth/callback?next=${encodeURIComponent(dashboardNext(ref))}`
          : `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-[var(--radius-lg)] border border-line bg-surface p-8 shadow-sm">
        <a href="/" className="mb-6 flex items-center gap-2.5 font-display text-lg font-bold text-ink">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            C
          </span>
          CVento
        </a>

        <h1 className="mb-2 text-2xl font-bold">Créer votre compte</h1>
        <p className="mb-6 text-sm text-ink-soft">
          Gratuit, sans carte bancaire. Créez votre premier CV en quelques minutes.
        </p>

        {status === "sent" ? (
          <p className="rounded-[var(--radius-sm)] bg-primary-tint p-4 text-sm font-medium text-primary-dark">
            Vérifiez votre boîte mail : un lien de confirmation vient de vous être envoyé à {email}.
          </p>
        ) : (
          <>
            <button
              type="button"
              onClick={handleGoogle}
              className="mb-4 flex w-full items-center justify-center gap-2 rounded-[var(--radius-sm)] border-2 border-line bg-surface px-4 py-3 text-sm font-semibold text-ink transition hover:border-primary"
            >
              Continuer avec Google
            </button>

            <div className="mb-4 flex items-center gap-3 text-xs font-semibold text-ink-faint">
              <span className="h-px flex-1 bg-line" />
              ou
              <span className="h-px flex-1 bg-line" />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nom complet"
                className="rounded-[var(--radius-sm)] border-2 border-line px-4 py-3 text-sm focus:border-primary focus:outline-none"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.fr"
                className="rounded-[var(--radius-sm)] border-2 border-line px-4 py-3 text-sm focus:border-primary focus:outline-none"
              />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe (6 caractères min.)"
                className="rounded-[var(--radius-sm)] border-2 border-line px-4 py-3 text-sm focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-[var(--radius-sm)] bg-primary px-4 py-3 text-sm font-bold text-white shadow-[0_4px_0_var(--primary-dark)] transition disabled:opacity-60"
              >
                {status === "sending" ? "Création..." : "Créer mon compte"}
              </button>
              {status === "error" && (
                <p className="text-sm font-semibold text-warn">{errorMsg}</p>
              )}
            </form>
          </>
        )}

        <p className="mt-6 text-xs text-ink-faint">
          Déjà un compte ?{" "}
          <a href="/login" className="font-semibold text-primary hover:underline">
            Connectez-vous
          </a>
        </p>
      </div>
    </main>
  );
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
}
