import { Document, Packer, Paragraph, TextRun, HeadingLevel, BorderStyle } from "docx";
import type { CvContent } from "@/lib/types/cv";

const PRIMARY_HEX = "24398F";
const MUTED_HEX = "555555";

function sectionTitle(text: string) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" } },
    children: [new TextRun({ text: text.toUpperCase(), bold: true, color: PRIMARY_HEX, size: 20 })],
  });
}

/**
 * Même contenu et même logique que lib/pdf/sobre-template.tsx, mais rendu
 * en DOCX éditable (docx.js) — export réservé au plan Pro.
 */
export async function buildSobreDocx(content: CvContent): Promise<Buffer> {
  const { identite, resume, experiences, formations, competences, langues } = content;
  const nomComplet = [identite.prenom, identite.nom].filter(Boolean).join(" ") || "Votre nom";

  const children: Paragraph[] = [
    new Paragraph({
      children: [new TextRun({ text: nomComplet, bold: true, size: 40 })],
    }),
  ];

  if (identite.titre) {
    children.push(
      new Paragraph({ children: [new TextRun({ text: identite.titre, size: 24, color: MUTED_HEX })] })
    );
  }

  const contact = [identite.email, identite.telephone, identite.ville, identite.permis ? "Permis B" : ""]
    .filter(Boolean)
    .join("  ·  ");
  if (contact) {
    children.push(
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: contact, size: 18, color: MUTED_HEX })] })
    );
  }

  if (resume) {
    children.push(new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: resume })] }));
  }

  if (experiences.length > 0) {
    children.push(sectionTitle("Expérience professionnelle"));
    for (const exp of experiences) {
      const dates = `${exp.dateDebut} – ${exp.enCours ? "Aujourd'hui" : exp.dateFin}`;
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${exp.poste}${exp.entreprise ? " — " + exp.entreprise : ""}`, bold: true }),
            new TextRun({ text: `   ${dates}`, color: MUTED_HEX, size: 18 }),
          ],
        })
      );
      if (exp.lieu) {
        children.push(new Paragraph({ children: [new TextRun({ text: exp.lieu, color: MUTED_HEX, size: 18 })] }));
      }
      for (const bullet of exp.bullets.filter(Boolean)) {
        children.push(new Paragraph({ bullet: { level: 0 }, children: [new TextRun({ text: bullet })] }));
      }
      children.push(new Paragraph({ text: "" }));
    }
  }

  if (formations.length > 0) {
    children.push(sectionTitle("Formation"));
    for (const f of formations) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${f.diplome}${f.etablissement ? " — " + f.etablissement : ""}`, bold: true }),
            new TextRun({ text: `   ${f.dateDebut} – ${f.dateFin}`, color: MUTED_HEX, size: 18 }),
          ],
        })
      );
      if (f.lieu) {
        children.push(new Paragraph({ children: [new TextRun({ text: f.lieu, color: MUTED_HEX, size: 18 })] }));
      }
    }
  }

  if (competences.length > 0) {
    children.push(sectionTitle("Compétences"));
    children.push(new Paragraph({ children: [new TextRun({ text: competences.join(" · ") })] }));
  }

  if (langues.length > 0) {
    children.push(sectionTitle("Langues"));
    children.push(
      new Paragraph({
        children: [new TextRun({ text: langues.map((l) => `${l.langue} (${l.niveau})`).join(" · ") })],
      })
    );
  }

  const doc = new Document({ sections: [{ children }] });
  return Packer.toBuffer(doc);
}
