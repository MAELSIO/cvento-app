import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { CvContent } from "@/lib/types/cv";
import { getTemplate, type TemplateLayout } from "@/lib/templates/registry";

/**
 * Rendu PDF paramétré par template (lib/templates/registry.ts). La
 * structure (une colonne, pas d'icône, pas de tableau) ne varie JAMAIS
 * entre templates — seuls la police, la couleur d'accent et l'espacement
 * changent. C'est ce qui garantit que les 18 templates restent tous
 * compatibles ATS. Ne pas ajouter de mise en page en colonnes ici.
 */
function fontFor(layout: TemplateLayout) {
  return layout === "classique"
    ? { regular: "Times-Roman", bold: "Times-Bold" }
    : { regular: "Helvetica", bold: "Helvetica-Bold" };
}

function buildStyles(layout: TemplateLayout, accentHex: string) {
  const font = fontFor(layout);
  const compact = layout === "compact";
  const accent = `#${accentHex}`;

  return StyleSheet.create({
    page: {
      padding: compact ? 32 : 40,
      fontSize: compact ? 9 : 10,
      fontFamily: font.regular,
      color: "#1a1a1a",
    },
    name: { fontSize: compact ? 18 : 20, fontFamily: font.bold, marginBottom: 2 },
    titre: { fontSize: compact ? 11 : 12, color: "#444444", marginBottom: 6 },
    contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: compact ? 8 : 12 },
    contactItem: { fontSize: 9, color: "#555555" },
    sectionTitleUnderline: {
      fontSize: compact ? 9 : 10,
      fontFamily: font.bold,
      textTransform: "uppercase",
      borderBottom: `1pt solid ${accent}`,
      paddingBottom: 3,
      marginTop: compact ? 8 : 14,
      marginBottom: compact ? 5 : 8,
      color: accent,
    },
    sectionTitleBlock: {
      fontSize: compact ? 9 : 10,
      fontFamily: font.bold,
      textTransform: "uppercase",
      backgroundColor: accent,
      color: "#ffffff",
      paddingVertical: 3,
      paddingHorizontal: 6,
      marginTop: compact ? 8 : 14,
      marginBottom: compact ? 5 : 8,
    },
    entryHeaderRow: { flexDirection: "row", justifyContent: "space-between" },
    entryTitle: { fontFamily: font.bold },
    entryDates: { fontSize: 9, color: "#555555" },
    entryLieu: { fontSize: 9, color: "#555555", marginBottom: 3 },
    bulletRow: { flexDirection: "row", marginBottom: 2, paddingLeft: 4 },
    bulletDot: { width: 10 },
    entry: { marginBottom: compact ? 6 : 10 },
    watermark: { position: "absolute", bottom: 20, left: compact ? 32 : 40, fontSize: 8, color: "#999999" },
  });
}

export function CvPdfDocument({
  content,
  templateId,
  watermark,
}: {
  content: CvContent;
  templateId: string;
  watermark?: boolean;
}) {
  const template = getTemplate(templateId);
  const styles = buildStyles(template.layout, template.color.hex);
  const sectionTitleStyle = template.layout === "moderne" ? styles.sectionTitleBlock : styles.sectionTitleUnderline;

  const { identite, resume, experiences, formations, competences, langues } = content;
  const nomComplet = [identite.prenom, identite.nom].filter(Boolean).join(" ") || "Votre nom";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{nomComplet}</Text>
        {identite.titre ? <Text style={styles.titre}>{identite.titre}</Text> : null}

        <View style={styles.contactRow}>
          {identite.email ? <Text style={styles.contactItem}>{identite.email}</Text> : null}
          {identite.telephone ? <Text style={styles.contactItem}>{identite.telephone}</Text> : null}
          {identite.ville ? <Text style={styles.contactItem}>{identite.ville}</Text> : null}
          {identite.permis ? <Text style={styles.contactItem}>Permis B</Text> : null}
        </View>

        {resume ? <Text>{resume}</Text> : null}

        {experiences.length > 0 && (
          <View>
            <Text style={sectionTitleStyle}>Expérience professionnelle</Text>
            {experiences.map((exp) => (
              <View key={exp.id} style={styles.entry}>
                <View style={styles.entryHeaderRow}>
                  <Text style={styles.entryTitle}>
                    {exp.poste}
                    {exp.entreprise ? ` — ${exp.entreprise}` : ""}
                  </Text>
                  <Text style={styles.entryDates}>
                    {exp.dateDebut} – {exp.enCours ? "Aujourd'hui" : exp.dateFin}
                  </Text>
                </View>
                {exp.lieu ? <Text style={styles.entryLieu}>{exp.lieu}</Text> : null}
                {exp.bullets.filter(Boolean).map((b, i) => (
                  <View key={i} style={styles.bulletRow}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text>{b}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {formations.length > 0 && (
          <View>
            <Text style={sectionTitleStyle}>Formation</Text>
            {formations.map((f) => (
              <View key={f.id} style={styles.entry}>
                <View style={styles.entryHeaderRow}>
                  <Text style={styles.entryTitle}>
                    {f.diplome}
                    {f.etablissement ? ` — ${f.etablissement}` : ""}
                  </Text>
                  <Text style={styles.entryDates}>
                    {f.dateDebut} – {f.dateFin}
                  </Text>
                </View>
                {f.lieu ? <Text style={styles.entryLieu}>{f.lieu}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {competences.length > 0 && (
          <View>
            <Text style={sectionTitleStyle}>Compétences</Text>
            <Text>{competences.join(" · ")}</Text>
          </View>
        )}

        {langues.length > 0 && (
          <View>
            <Text style={sectionTitleStyle}>Langues</Text>
            <Text>{langues.map((l) => `${l.langue} (${l.niveau})`).join(" · ")}</Text>
          </View>
        )}

        {watermark ? <Text style={styles.watermark} fixed>Créé avec CVento — cvento.fr</Text> : null}
      </Page>
    </Document>
  );
}
