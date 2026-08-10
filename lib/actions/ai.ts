"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasProAccess } from "@/lib/plan";
import { assertAiQuota, logAiUsage } from "@/lib/ai/quota";
import { askClaudeJson, askClaudeText } from "@/lib/ai/client";

/**
 * Next.js redacte en production le message de toute erreur *levée*
 * (throw) depuis une Server Action, quel que soit son contenu — y
 * compris un message déjà "propre" — et le remplace par une erreur
 * générique côté client (React error #441 observé en pratique). La
 * pratique documentée pour une erreur attendue (quota, API IA en
 * panne) est de la retourner comme valeur plutôt que de la lever.
 */
export type AiResult<T> = { data: T; error?: undefined } | { data?: undefined; error: string };

const QUOTA_ERROR_MESSAGE =
  "Quota IA gratuit atteint pour aujourd'hui. Passez au Pro pour une IA illimitée.";

async function requireUserAndQuota(): Promise<
  | { ok: true; supabase: Awaited<ReturnType<typeof createClient>>; user: { id: string } }
  | { ok: false; error: string }
> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status, is_lifetime")
    .eq("user_id", user.id)
    .single();
  const isPro = hasProAccess(subscription);

  try {
    await assertAiQuota(supabase, user.id, isPro);
  } catch {
    return { ok: false, error: QUOTA_ERROR_MESSAGE };
  }

  return { ok: true, supabase, user };
}

/**
 * Génère des points d'expérience orientés résultats (verbes d'action,
 * chiffres) à partir du poste, de l'entreprise et de quelques mots-clés.
 */
export async function generateBullets(input: {
  poste: string;
  entreprise: string;
  motsCles: string;
}): Promise<AiResult<string[]>> {
  const ctx = await requireUserAndQuota();
  if (!ctx.ok) return { error: ctx.error };

  try {
    const bullets = await askClaudeJson<string[]>(
      "Tu es un rédacteur de CV professionnel pour le marché français. " +
        "Tu écris des points d'expérience courts et concrets, orientés résultats : " +
        "verbe d'action au début, contexte bref, résultat chiffré quand c'est plausible. " +
        "Réponds UNIQUEMENT avec un tableau JSON de 3 à 5 chaînes de caractères, sans aucun texte autour.",
      `Poste : ${input.poste}\nEntreprise : ${input.entreprise}\nMots-clés à intégrer si pertinent : ${input.motsCles || "aucun"}`
    );
    await logAiUsage(ctx.supabase, ctx.user.id, "bullet");
    return { data: bullets };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erreur lors de la génération IA." };
  }
}

/**
 * Extrait les mots-clés/compétences importants d'une offre d'emploi collée
 * par l'utilisateur, pour le ciblage du CV.
 */
export async function extractKeywords(jobDescription: string): Promise<AiResult<string[]>> {
  const ctx = await requireUserAndQuota();
  if (!ctx.ok) return { error: ctx.error };

  if (!jobDescription.trim()) return { data: [] };

  try {
    const keywords = await askClaudeJson<string[]>(
      "Tu analyses des offres d'emploi françaises pour en extraire les mots-clés " +
        "importants pour un CV : compétences techniques, outils, certifications, " +
        "qualités attendues explicitement mentionnées. Ignore les formules génériques " +
        "('esprit d'équipe' seul sans contexte, politesse de fin d'annonce, etc.). " +
        "Réponds UNIQUEMENT avec un tableau JSON de 8 à 15 mots-clés courts (1 à 3 mots chacun), sans texte autour.",
      jobDescription
    );
    await logAiUsage(ctx.supabase, ctx.user.id, "keywords");
    return { data: keywords };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erreur lors de l'analyse des mots-clés." };
  }
}

/**
 * Génère une lettre de motivation complète, adaptée aux codes français,
 * à partir du contenu du CV et de l'offre ciblée.
 */
export async function generateCoverLetter(input: {
  cvSummaryText: string;
  targetJobTitle: string;
  targetJobDescription: string;
  entreprise: string;
}): Promise<AiResult<string>> {
  const ctx = await requireUserAndQuota();
  if (!ctx.ok) return { error: ctx.error };

  try {
    const letter = await askClaudeText(
      "Tu rédiges des lettres de motivation en français, selon les codes français " +
        "(formule d'appel, structure en 3 paragraphes : motivation/adéquation au poste, " +
        "preuves concrètes tirées du profil, formule de politesse de clôture). " +
        "Ton professionnel, pas de superlatifs excessifs, pas de tournures traduites de l'anglais. " +
        "Réponds uniquement avec le texte de la lettre, sans titre ni commentaire.",
      `Poste visé : ${input.targetJobTitle}\n` +
        `Entreprise : ${input.entreprise || "non précisée"}\n` +
        `Offre d'emploi : ${input.targetJobDescription || "non fournie"}\n\n` +
        `Profil du candidat (extrait du CV) :\n${input.cvSummaryText}`
    );
    await logAiUsage(ctx.supabase, ctx.user.id, "cover_letter");
    return { data: letter };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erreur lors de la génération IA." };
  }
}

/** Génère des questions d'entretien probables pour le poste visé. */
export async function generateInterviewQuestions(input: {
  targetJobTitle: string;
  targetJobDescription: string;
}): Promise<AiResult<string[]>> {
  const ctx = await requireUserAndQuota();
  if (!ctx.ok) return { error: ctx.error };

  try {
    const questions = await askClaudeJson<string[]>(
      "Tu prépares des candidats français à un entretien d'embauche. " +
        "Génère des questions d'entretien réalistes et variées (motivation, expérience, " +
        "mise en situation, questions techniques liées au poste). " +
        "Réponds UNIQUEMENT avec un tableau JSON de 6 à 8 questions en français, sans texte autour.",
      `Poste visé : ${input.targetJobTitle}\nOffre : ${input.targetJobDescription || "non fournie"}`
    );
    await logAiUsage(ctx.supabase, ctx.user.id, "interview");
    return { data: questions };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erreur lors de la génération des questions." };
  }
}

/** Donne un retour constructif sur la réponse de l'utilisateur à une question d'entretien. */
export async function getInterviewFeedback(input: {
  question: string;
  answer: string;
}): Promise<AiResult<string>> {
  const ctx = await requireUserAndQuota();
  if (!ctx.ok) return { error: ctx.error };

  try {
    const feedback = await askClaudeText(
      "Tu es un coach d'entretien d'embauche bienveillant mais exigeant. " +
        "On te donne une question d'entretien et la réponse d'un candidat. " +
        "Donne un retour court (4-6 phrases) : ce qui fonctionne, ce qui manque " +
        "(structure, exemples concrets, chiffres), et une suggestion d'amélioration concrète. " +
        "Réponds uniquement avec le texte du retour, sans titre.",
      `Question : ${input.question}\nRéponse du candidat : ${input.answer}`
    );
    await logAiUsage(ctx.supabase, ctx.user.id, "interview");
    return { data: feedback };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Erreur lors de l'analyse de la réponse." };
  }
}
