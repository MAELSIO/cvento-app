"use client";

import { useState, useTransition } from "react";
import { createApiToken, revokeApiToken } from "@/lib/actions/api-tokens";

type Token = { id: string; name: string; created_at: string; last_used_at: string | null };

export function ExtensionTokens({ initialTokens }: { initialTokens: Token[] }) {
  const [tokens, setTokens] = useState(initialTokens);
  const [newToken, setNewToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleCreate() {
    startTransition(async () => {
      const token = await createApiToken("Extension navigateur");
      setNewToken(token);
      setTokens((t) => [{ id: crypto.randomUUID(), name: "Extension navigateur", created_at: new Date().toISOString(), last_used_at: null }, ...t]);
    });
  }

  function handleRevoke(id: string) {
    startTransition(async () => {
      await revokeApiToken(id);
      setTokens((t) => t.filter((tok) => tok.id !== id));
    });
  }

  async function handleCopy() {
    if (!newToken) return;
    await navigator.clipboard.writeText(newToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="rounded-[var(--radius-lg)] border border-line bg-surface p-5">
      <h2 className="mb-2 font-display text-lg font-semibold">Extension navigateur</h2>
      <p className="mb-4 text-sm text-ink-soft">
        Créez un jeton d&apos;accès pour connecter l&apos;extension CVento : elle pourra pré-remplir
        vos informations sur les formulaires de candidature.
      </p>

      {newToken && (
        <div className="mb-4 rounded-[var(--radius-sm)] bg-primary-tint p-3">
          <p className="mb-2 text-xs font-semibold text-primary-dark">
            Copiez ce jeton maintenant, il ne sera plus jamais affiché en clair :
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <code className="min-w-0 flex-1 truncate rounded-[var(--radius-sm)] bg-white px-2 py-1.5 text-xs">
              {newToken}
            </code>
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-[var(--radius-sm)] bg-primary px-3 py-1.5 text-xs font-bold text-white"
            >
              {copied ? "Copié !" : "Copier"}
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleCreate}
        disabled={isPending}
        className="mb-4 rounded-[var(--radius-sm)] bg-primary px-4 py-2 text-sm font-bold text-white shadow-[0_4px_0_var(--primary-dark)] disabled:opacity-60"
      >
        {isPending ? "..." : "+ Créer un jeton"}
      </button>

      {tokens.length > 0 && (
        <ul className="flex flex-col gap-2">
          {tokens.map((t) => (
            <li key={t.id} className="flex items-center justify-between rounded-[var(--radius-sm)] border border-line px-3 py-2 text-sm">
              <div>
                <p className="font-semibold">{t.name}</p>
                <p className="text-xs text-ink-faint">
                  Créé le {new Date(t.created_at).toLocaleDateString("fr-FR")}
                  {t.last_used_at && ` · dernier usage le ${new Date(t.last_used_at).toLocaleDateString("fr-FR")}`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleRevoke(t.id)}
                className="text-xs font-semibold text-warn hover:underline"
              >
                Révoquer
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
