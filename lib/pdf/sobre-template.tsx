import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { CvContent } from "@/lib/types/cv";

/**
 * Template PDF "sobre" : une seule colonne, polices standard (Helvetica),
 * aucune icône ni tableau — pensé pour être parsé sans erreur par les
 * logiciels de tri automatique (ATS). Ne pas ajouter de mise en page en
 * colonnes ni d'éléments graphiques ici, c'est la contrainte n°1 du produit.
 */
const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: "Helvetica", color: "#1a1a1a" },
  name: { fontSize: 20, fontFamily: "Helvetica-Bold", marginBottom: 2 },
  titre: { fontSize: 12, color: "#444444", marginBottom: 6 },
  contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 12 },
  contactItem: { fontSize: 9, color: "#555555" },
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    borderBottom: "1pt solid #cccccc",
    paddingBottom: 3,
    marginTop: 14,
    marginBottom: 8,
    color: "#24398f",
  },
  entryHeaderRow: { flexDirection: "row", justifyContent: "space-between" },
  entryTitle: { fontFamily: "Helvetica-Bold" },
  entryDates: { fontSize: 9, color: "#555555" },
  entryLieu: { fontSize: 9, color: "#555555", marginBottom: 3 },
  bulletRow: { flexDirection: "row", marginBottom: 2, paddingLeft: 4 },
  bulletDot: { width: 10 },
  entry: { marginBottom: 10 },
  watermark: { position: "absolute", bottom: 20, left: 40, fontSize: 8, color: "#999999" },
});

export function SobrePdfTemplate({
  content,
  watermark,
}: {
  content: CvContent;
  watermark?: boolean;
}) {
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
            <Text style={styles.sectionTitle}>Expérience professionnelle</Text>
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
            <Text style={styles.sectionTitle}>Formation</Text>
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
            <Text style={styles.sectionTitle}>Compétences</Text>
            <Text>{competences.join(" · ")}</Text>
          </View>
        )}

        {langues.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Langues</Text>
            <Text>{langues.map((l) => `${l.langue} (${l.niveau})`).join(" · ")}</Text>
          </View>
        )}

        {watermark ? <Text style={styles.watermark} fixed>Créé avec CVento — cvento.fr</Text> : null}
      </Page>
    </Document>
  );
}
