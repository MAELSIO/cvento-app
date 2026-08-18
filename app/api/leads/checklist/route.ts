import { NextResponse, type NextRequest } from "next/server";
import { resend, CVENTO_FROM_EMAIL } from "@/lib/resend";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Lead magnet "checklist ATS gratuite" : capture l'email d'un visiteur du
 * blog pas encore prêt à créer un compte, envoie immédiatement la checklist,
 * et notifie l'équipe pour un suivi manuel — pas de table dédiée pour
 * l'instant, le volume ne le justifie pas encore.
 */
export async function POST(request: NextRequest) {
  if (!checkRateLimit(`checklist:${getClientIp(request)}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Trop de demandes, réessayez plus tard." }, { status: 429 });
  }

  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const source = typeof body.source === "string" ? body.source : "blog";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Email invalide." }, { status: 400 });
  }

  await resend.emails.send({
    from: CVENTO_FROM_EMAIL,
    to: email,
    subject: "Votre checklist ATS — 10 points à vérifier sur votre CV",
    html: CHECKLIST_EMAIL_HTML,
  });

  // Notification à l'équipe pour suivi manuel (relance, ajout à une liste
  // de diffusion) — évite d'avoir besoin d'une table dédiée pour l'instant.
  await resend.emails.send({
    from: CVENTO_FROM_EMAIL,
    to: "maelsiohan01@gmail.com",
    subject: "Nouveau lead checklist ATS",
    html: `<p>${email}</p><p>Source : ${source}</p>`,
  }).catch(() => {});

  return NextResponse.json({ ok: true });
}

const CHECKLIST_EMAIL_HTML = `
<div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a;">
  <h1 style="font-size:20px;">Votre checklist ATS</h1>
  <p>10 points à vérifier avant d'envoyer votre CV, pour maximiser vos chances de passer les logiciels de tri automatique :</p>
  <ol style="line-height:1.7;">
    <li>Une seule colonne, de haut en bas (pas de mise en page en colonnes).</li>
    <li>Intitulés de section standards : "Expérience professionnelle", "Formation", "Compétences".</li>
    <li>Pas d'informations essentielles dans des icônes, images ou en-têtes/pieds de page.</li>
    <li>Format .docx ou PDF texte (jamais une image scannée).</li>
    <li>Nom de fichier clair : Prénom-Nom-CV.pdf, pas "CV_final_v3.pdf".</li>
    <li>Coordonnées complètes en haut : nom, téléphone, email, ville.</li>
    <li>Dates au format clair (MM/AAAA) pour chaque expérience.</li>
    <li>Mots-clés de l'offre repris tels quels quand c'est honnête (intitulé de poste, compétences précises).</li>
    <li>Résultats chiffrés plutôt que des tâches décrites vaguement.</li>
    <li>Aucun tableau pour organiser le contenu (mal lu par certains ATS).</li>
  </ol>
  <p>Envie de vérifier tout ça automatiquement sur votre CV actuel ?</p>
  <p><a href="https://www.cvento.fr/diagnostic" style="display:inline-block;background:#3454d1;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none;font-weight:bold;">Diagnostiquer mon CV gratuitement</a></p>
  <p style="color:#666;font-size:12px;margin-top:24px;">CVento — cvento.fr</p>
</div>
`;
