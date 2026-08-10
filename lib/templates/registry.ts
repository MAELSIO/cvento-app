export type TemplateLayout = "classique" | "moderne" | "compact";

export type TemplateColor = {
  id: string;
  name: string;
  hex: string;
};

export type CvTemplate = {
  id: string; // `${layout}-${color.id}`
  name: string;
  layout: TemplateLayout;
  color: TemplateColor;
  free: boolean;
};

/**
 * 18 templates = 3 mises en page ATS-safe (mono-colonne, pas d'icônes, pas
 * de tableaux) × 6 couleurs d'accent. La variation reste volontairement
 * limitée à la typographie, l'espacement et la couleur des titres de
 * section — jamais la structure — pour garantir la compatibilité avec les
 * logiciels de tri automatique sur les 18 combinaisons (voir cahier des
 * charges : "pas de mise en page complexe en colonnes ni d'icônes non
 * reconnues par les parseurs").
 */
export const TEMPLATE_LAYOUTS: { id: TemplateLayout; name: string; description: string }[] = [
  {
    id: "classique",
    name: "Classique",
    description: "Titres soulignés, espacement généreux — le plus traditionnel.",
  },
  {
    id: "moderne",
    name: "Moderne",
    description: "Sans-serif, titres de section en couleur pleine — plus contemporain.",
  },
  {
    id: "compact",
    name: "Compact",
    description: "Espacement réduit — pour un parcours riche tenant sur une page.",
  },
];

export const TEMPLATE_COLORS: TemplateColor[] = [
  { id: "gris", name: "Gris ardoise", hex: "3F4756" },
  { id: "bleu", name: "Bleu", hex: "2454C7" },
  { id: "vert", name: "Vert forêt", hex: "0F6A52" },
  { id: "bordeaux", name: "Bordeaux", hex: "7A2048" },
  { id: "ambre", name: "Ambre", hex: "B5720E" },
  { id: "violet", name: "Violet", hex: "5B3E9C" },
];

export const TEMPLATES: CvTemplate[] = TEMPLATE_LAYOUTS.flatMap((layout) =>
  TEMPLATE_COLORS.map((color) => ({
    id: `${layout.id}-${color.id}`,
    name: `${layout.name} ${color.name}`,
    layout: layout.id,
    color,
    free: layout.id === "classique" && color.id === "gris",
  }))
);

export const DEFAULT_TEMPLATE_ID = "classique-gris";

export function getTemplate(id: string): CvTemplate {
  return TEMPLATES.find((t) => t.id === id) ?? TEMPLATES.find((t) => t.id === DEFAULT_TEMPLATE_ID)!;
}
