"use client";

import { useState, useTransition } from "react";
import { setCvTemplate } from "@/lib/actions/cvs";
import { TEMPLATES, TEMPLATE_LAYOUTS, getTemplate } from "@/lib/templates/registry";

export function TemplatePicker({
  cvId,
  templateId,
  isPro,
  onChange,
}: {
  cvId: string;
  templateId: string;
  isPro: boolean;
  onChange: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const current = getTemplate(templateId);

  function handlePick(id: string) {
    const template = getTemplate(id);
    if (!template.free && !isPro) {
      setError("Ce template est réservé au plan Pro.");
      return;
    }
    setError("");
    startTransition(async () => {
      try {
        await setCvTemplate(cvId, id);
        onChange(id);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur.");
      }
    });
  }

  return (
    <section className="rounded-[var(--radius-lg)] border border-line bg-surface p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold">Template</h2>
          <p className="text-xs text-ink-soft">{current.name}</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="text-xs font-bold text-primary hover:underline"
        >
          {open ? "Fermer" : "Changer de template"}
        </button>
      </div>

      {error && <p className="mt-2 text-xs font-semibold text-warn">{error}</p>}

      {open && (
        <div className="mt-4 flex flex-col gap-4">
          {TEMPLATE_LAYOUTS.map((layout) => (
            <div key={layout.id}>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-faint">{layout.name}</p>
              <div className="grid grid-cols-6 gap-2">
                {TEMPLATES.filter((t) => t.layout === layout.id).map((t) => {
                  const locked = !t.free && !isPro;
                  const selected = t.id === templateId;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      title={t.name}
                      onClick={() => handlePick(t.id)}
                      disabled={isPending}
                      className={`relative flex h-14 flex-col items-center justify-center rounded-[var(--radius-sm)] border-2 text-[9px] font-semibold text-white disabled:opacity-60 ${
                        selected ? "border-ink" : "border-transparent"
                      }`}
                      style={{ backgroundColor: `#${t.color.hex}` }}
                    >
                      {locked && <span className="absolute right-1 top-1 text-[10px]">🔒</span>}
                      {t.color.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          {!isPro && (
            <a href="/tarifs" className="text-xs font-bold text-gold hover:underline">
              Débloquer les 17 autres templates avec le plan Pro →
            </a>
          )}
        </div>
      )}
    </section>
  );
}
