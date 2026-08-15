"use client";

import { useState } from "react";

export function ChecklistSignup({ source }: { source: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/leads/checklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-[var(--radius-lg)] bg-primary-tint p-6 text-center">
        <p className="font-semibold text-primary-dark">Checklist envoyée — vérifiez votre boîte mail.</p>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-line bg-surface p-6">
      <p className="font-semibold">📋 Checklist ATS gratuite</p>
      <p className="mt-1 text-sm text-ink-soft">
        Les 10 points à vérifier avant d&apos;envoyer votre CV, reçus par email tout de suite.
      </p>
      <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.fr"
          className="flex-1 rounded-[var(--radius-sm)] border-2 border-line px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-[var(--radius-sm)] bg-primary px-4 py-2 text-sm font-bold text-white shadow-[0_4px_0_var(--primary-dark)] disabled:opacity-60"
        >
          {status === "loading" ? "Envoi..." : "Recevoir la checklist"}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-2 text-xs text-red-600">Un souci est survenu, réessayez dans un instant.</p>
      )}
    </div>
  );
}
