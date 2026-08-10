import { NextResponse, type NextRequest } from "next/server";
import { computeTextScore } from "@/lib/scoring/text-score";

export const runtime = "nodejs";

/**
 * Diagnostic gratuit sans inscription : upload d'un CV existant (PDF ou
 * DOCX), extraction du texte, score simplifié. Aimant à visiteurs — voir
 * cahier des charges, section "fonctions pensées pour la croissance".
 */
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Aucun fichier reçu." }, { status: 400 });
  }
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: "Fichier trop volumineux (10 Mo max)." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const name = file.name.toLowerCase();

  let text = "";
  try {
    if (name.endsWith(".pdf")) {
      const { PDFParse } = await import("pdf-parse");
      const parser = new PDFParse({ data: buffer });
      const result = await parser.getText();
      await parser.destroy();
      text = result.text;
    } else if (name.endsWith(".docx")) {
      const mammoth = await import("mammoth");
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else {
      return NextResponse.json(
        { error: "Format non supporté. Envoyez un fichier PDF ou DOCX." },
        { status: 400 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Impossible de lire ce fichier. Vérifiez qu'il n'est pas protégé ou corrompu." },
      { status: 422 }
    );
  }

  if (text.trim().length < 20) {
    return NextResponse.json(
      { error: "Aucun texte détecté dans ce fichier (CV scanné en image ?)." },
      { status: 422 }
    );
  }

  const result = computeTextScore(text);
  return NextResponse.json(result);
}
