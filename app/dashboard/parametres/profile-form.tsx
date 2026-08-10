"use client";

import { useState, useTransition } from "react";
import { updateProfile } from "@/lib/actions/profile";

export function ProfileForm({
  initialFullName,
  initialPhone,
}: {
  initialFullName: string;
  initialPhone: string;
}) {
  const [fullName, setFullName] = useState(initialFullName);
  const [phone, setPhone] = useState(initialPhone);
  const [isPending, startTransition] = useTransition();
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  function handleSubmit() {
    startTransition(async () => {
      await updateProfile({ fullName, phone });
      setSavedAt(new Date());
    });
  }

  return (
    <section className="rounded-[var(--radius-lg)] border border-line bg-surface p-5">
      <h2 className="mb-3 font-display text-lg font-semibold">Profil</h2>
      <div className="flex flex-col gap-3">
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Nom complet"
          className="rounded-[var(--radius-sm)] border-2 border-line px-3 py-2 text-sm focus:border-primary focus:outline-none"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Téléphone (optionnel)"
          className="rounded-[var(--radius-sm)] border-2 border-line px-3 py-2 text-sm focus:border-primary focus:outline-none"
        />
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            className="self-start rounded-[var(--radius-sm)] bg-primary px-4 py-2 text-sm font-bold text-white shadow-[0_4px_0_var(--primary-dark)] disabled:opacity-60"
          >
            {isPending ? "Enregistrement..." : "Enregistrer"}
          </button>
          {savedAt && !isPending && (
            <span className="text-xs text-ink-faint">Enregistré à {savedAt.toLocaleTimeString("fr-FR")}</span>
          )}
        </div>
      </div>
    </section>
  );
}
