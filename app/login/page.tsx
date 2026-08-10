"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setStatus("error");
      setErrorMsg(
        error.message === "Invalid login credentials"
          ? "Email ou mot de passe incorrect."
          : error.message
      );
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  async function handleGoogle() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-[var(--radius-lg)] border border-line bg-surface p-8 shadow-sm">
        <a href="/" className="mb-6 flex items-center gap-2 font-display text-lg font-bold text-ink">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            C
          </span>
          CVento
        </a>

        <h1 className="mb-2 text-2xl font-bold">Connexion</h1>
        <p className="mb-6 text-sm text-ink-soft">Accédez à votre espace CVento.</p>

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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="rounded-[var(--radius-sm)] border-2 border-line px-4 py-3 text-sm focus:border-primary focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-[var(--radius-sm)] bg-primary px-4 py-3 text-sm font-bold text-white shadow-[0_4px_0_var(--primary-dark)] transition disabled:opacity-60"
          >
            {status === "sending" ? "Connexion..." : "Se connecter"}
          </button>
          {status === "error" && (
            <p className="text-sm font-semibold text-warn">{errorMsg}</p>
          )}
        </form>

        <p className="mt-6 text-xs text-ink-faint">
          Pas encore de compte ?{" "}
          <a href="/signup" className="font-semibold text-primary hover:underline">
            Inscrivez-vous gratuitement
          </a>
        </p>
      </div>
    </main>
  );
}
