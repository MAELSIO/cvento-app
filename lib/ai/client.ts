import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

/** Sonnet 5 : meilleure qualité rédactionnelle en français, utilisé pour tout le contenu généré. */
export const CLAUDE_MODEL = "claude-sonnet-5";

/**
 * Demande une réponse strictement JSON à Claude. Le prompt doit exiger
 * explicitement un objet/tableau JSON en sortie, sans texte autour.
 */
export async function askClaudeJson<T>(system: string, user: string): Promise<T> {
  const message = await anthropic.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 2048,
    system,
    messages: [{ role: "user", content: user }],
  });

  const block = message.content[0];
  const text = block.type === "text" ? block.text : "";
  const jsonMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error("Réponse IA non exploitable (JSON introuvable).");
  return JSON.parse(jsonMatch[0]) as T;
}

export async function askClaudeText(system: string, user: string): Promise<string> {
  const message = await anthropic.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 2048,
    system,
    messages: [{ role: "user", content: user }],
  });
  const block = message.content[0];
  return block.type === "text" ? block.text.trim() : "";
}
