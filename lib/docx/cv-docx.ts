import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  BorderStyle,
  ShadingType,
} from "docx";
import type { CvContent } from "@/lib/types/cv";
import { getTemplate, type TemplateLayout } from "@/lib/templates/registry";

const MUTED_HEX = "555555";

function fontFor(layout: TemplateLayout) {
  return layout === "classique" ? "Georgia" : "Arial";
}

function makeSectionTitle(layout: TemplateLayout, accentHex: string, text: string) {
  const upper = text.toUpperCase();
  if (layout === "moderne") {
    return new Paragraph({
      spacing: { before: 240, after: 120 },
      shading: { type: ShadingType.SOLID, color: accentHex, fill: accentHex },
      children: [new TextRun({ text: upper, bold: true, color: "FFFFFF", size: 20 })],
    });
  }
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: layout === "compact" ? 160 : 240, after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: accentHex } },
    children: [new TextRun({ text: upper, bold: true, color: accentHex, size: 20 })],
  });
}

/**
 * Même contenu et même structure que lib/pdf/cv-pdf.tsx, rendus en DOCX
 * éditable (docx.js) — export réservé au plan Pro. La variation par
 * template reste limitée à la police et à la couleur, jamais la structure.
 */
export async function buildCvDocx(content: CvContent, templateId: string): Promise<Buffer> {
  const template = getTemplate(templateId);
  const font = fontFor(template.layout);
  const accent = template.color.hex;
  const { identite, resume, experiences, formations, competences, langues } = content;
  const nomComplet = [identite.prenom, identite.nom].filter(Boolean).join(" ") || "Votre nom";

  const children: Paragraph[] = [
    new Paragraph({
      children: [new TextRun({ text: nomComplet, bold: true, size: 40, font })],
    }),
  ];

  if (identite.titre) {
    children.push(
      new Paragraph({ children: [new TextRun({ text: identite.titre, size: 24, color: MUTED_HEX, font })] })
    );
  }

  const contact = [identite.email, identite.telephone, identite.ville, identite.permis ? "Permis B" : ""]
    .filter(Boolean)
    .join("  ·  ");
  if (contact) {
    children.push(
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: contact, size: 18, color: MUTED_HEX, font })],
      })
    );
  }

  if (resume) {
    children.push(
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: resume, font })] })
    );
  }

  if (experiences.length > 0) {
    children.push(makeSectionTitle(template.layout, accent, "Expérience professionnelle"));
    for (const exp of experiences) {
      const dates = `${exp.dateDebut} – ${exp.enCours ? "Aujourd'hui" : exp.dateFin}`;
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${exp.poste}${exp.entreprise ? " — " + exp.entreprise : ""}`, bold: true, font }),
            new TextRun({ text: `   ${dates}`, color: MUTED_HEX, size: 18, font }),
          ],
        })
      );
      if (exp.lieu) {
        children.push(
          new Paragraph({ children: [new TextRun({ text: exp.lieu, color: MUTED_HEX, size: 18, font })] })
        );
      }
      for (const bullet of exp.bullets.filter(Boolean)) {
        children.push(
          new Paragraph({ bullet: { level: 0 }, children: [new TextRun({ text: bullet, font })] })
        );
      }
      children.push(new Paragraph({ text: "" }));
    }
  }

  if (formations.length > 0) {
    children.push(makeSectionTitle(template.layout, accent, "Formation"));
    for (const f of formations) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${f.diplome}${f.etablissement ? " — " + f.etablissement : ""}`, bold: true, font }),
            new TextRun({ text: `   ${f.dateDebut} – ${f.dateFin}`, color: MUTED_HEX, size: 18, font }),
          ],
        })
      );
      if (f.lieu) {
        children.push(
          new Paragraph({ children: [new TextRun({ text: f.lieu, color: MUTED_HEX, size: 18, font })] })
        );
      }
    }
  }

  if (competences.length > 0) {
    children.push(makeSectionTitle(template.layout, accent, "Compétences"));
    children.push(new Paragraph({ children: [new TextRun({ text: competences.join(" · "), font })] }));
  }

  if (langues.length > 0) {
    children.push(makeSectionTitle(template.layout, accent, "Langues"));
    children.push(
      new Paragraph({
        children: [new TextRun({ text: langues.map((l) => `${l.langue} (${l.niveau})`).join(" · "), font })],
      })
    );
  }

  const doc = new Document({ sections: [{ children }] });
  return Packer.toBuffer(doc);
}
