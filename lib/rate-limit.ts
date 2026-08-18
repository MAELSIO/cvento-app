import type { NextRequest } from "next/server";

/**
 * Limiteur de débit en mémoire, par IP. Suffisant pour dissuader l'abus
 * occasionnel sur les endpoints publics sans auth (spam email, coûts de
 * traitement) — pas une protection anti-DDoS distribuée, la mémoire est
 * propre à chaque instance serverless et se réinitialise à froid.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

/** Retourne true si la requête est autorisée, false si la limite est atteinte. */
export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now >= entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) return false;

  entry.count += 1;
  return true;
}
