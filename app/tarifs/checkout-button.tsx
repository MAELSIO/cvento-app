"use client";

import { useState } from "react";
import type { BillingPlan } from "@/lib/stripe";

export function CheckoutButton({
  plan,
  loggedIn,
  className,
  children,
}: {
  plan: BillingPlan;
  loggedIn: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);

  if (!loggedIn) {
    return (
      <a href={`/signup?plan=${plan}`} className={className}>
        {children}
      </a>
    );
  }

  async function handleClick() {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      setLoading(false);
    }
  }

  return (
    <button type="button" onClick={handleClick} disabled={loading} className={className}>
      {loading ? "Redirection..." : children}
    </button>
  );
}
