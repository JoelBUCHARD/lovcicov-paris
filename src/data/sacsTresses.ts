/**
 * Collection « Sacs tressés » LOVCICOV Paris
 * ------------------------------------------
 * Source de vérité unique pour la page /sacs et les fiches /sacs/:slug.
 *
 * Convention d'images : /images/sacs/{REFERENCE}_{numero}.jpg
 *   ex. LOV-BIG-01_01.jpg = visuel principal du produit LOV-BIG-01
 *
 * `images` est TOUJOURS un tableau : pour ajouter un visuel supplémentaire,
 * il suffit d'ajouter "/images/sacs/LOV-BIG-01_02.jpg" à la suite.
 * La galerie de la fiche produit affiche automatiquement des vignettes
 * (desktop) / un carrousel swipe (mobile) dès qu'il y a plus d'une image.
 */

export type SacSilhouette = "big" | "small";
export type SacMotif = "tricolore" | "bicolore" | "azteque";

export interface SacProduct {
  /** Référence fournisseur, sert aussi de préfixe de nom de fichier image */
  ref: string;
  slug: string;
  name: string;
  silhouette: SacSilhouette;
  motif: SacMotif;
  /** Coloris affiché (corps du sac) */
  coloris: string;
  /** Bordures & anses */
  finitions: string;
  /** Pastille de couleur affichée sur la carte / le sélecteur de coloris */
  swatch: string[];
  price: number;
  /** Description courte, ton sensoriel (2–3 phrases) */
  description: string;
  /** Tableau d'images — prévu pour accueillir _02, _03… */
  images: string[];
  alt: string;
}

export const SILHOUETTES: Record<
  SacSilhouette,
  { label: string; dimensions: string; anses: string; price: number }
> = {
  big: {
    label: "Big LOV",
    dimensions: "35 cm (L) × 24 cm (H) × 15 cm (P)",
    anses: "Anses 25 cm",
    price: 260,
  },
  small: {
    label: "Small LOV",
    dimensions: "29 cm (L) × 16 cm (H) × 13 cm (P)",
    anses: "Anses 25 cm",
    price: 180,
  },
};

export const MOTIF_LABEL: Record<SacMotif, string> = {
  tricolore: "Tricolore",
  bicolore: "Bicolore",
  azteque: "Aztèque",
};

/** Bloc « Détails & finitions » — identique sur les 12 références */
export const DETAILS_FINITIONS: string[] = [
  "Cuir de buffle tressé à la main, technique intrecciato",
  "Fabriqué à la main en Inde",
  "Ouverture en V, signature de la collection",
  "Anses tressées, longueur 25 cm",
  "Bandoulière amovible incluse",
  "Poche intérieure zippée",
  "Bordures tressées sur tout le pourtour de l'ouverture",
  "Charm cœur en cuir gravé LOVCICOV PARIS",
];

export const MATIERE_ENTRETIEN =
  "Cuir de buffle tressé à la main. Chaque pièce est unique : les nuances et le grain du cuir peuvent varier légèrement d'un sac à l'autre. Ranger à l'abri de la lumière directe dans son dustbag. Nettoyer avec un chiffon doux et sec. Éviter l'exposition prolongée à l'humidité.";

export const DIMENSIONS_TOLERANCE =
  "Dimensions données à titre indicatif, tolérance ± 1 cm — chaque sac étant tressé à la main.";

export const LIVRAISON_RETOURS =
  "Livraison offerte en France métropolitaine dès 150 € d'achat. Expédition Europe et international. Retours acceptés sous 14 jours, article non porté, dans son emballage d'origine.";

const img = (ref: string, n = 1) =>
  `/images/sacs/${ref}_${String(n).padStart(2, "0")}.jpg`;

export const sacsProducts: SacProduct[] = [
  // ---------- BIG LOV — 260 € ----------
  {
    ref: "LOV-BIG-01",
    slug: "big-lov-tricolore-rouge",
    name: "Big LOV Tricolore Rouge",
    silhouette: "big",
    motif: "tricolore",
    coloris: "Rouge, rose clair, blanc",
    finitions: "Bordures & anses rose clair",
    swatch: ["#C0392B", "#F2B8C6", "#FFFFFF"],
    price: 260,
    description:
      "Trois fils de cuir de buffle, rouge, rose et blanc, tressés à la main en un damier vibrant. Le format généreux du Big LOV, la douceur d'une bordure rose clair.",
    images: [img("LOV-BIG-01")],
    alt: "Sac Big LOV tricolore rouge en cuir de buffle tressé main, charm cœur LOVCICOV",
  },
  {
    ref: "LOV-BIG-02",
    slug: "big-lov-tricolore-marine",
    name: "Big LOV Tricolore Marine",
    silhouette: "big",
    motif: "tricolore",
    coloris: "Bleu marine, rose, blanc",
    finitions: "Bordures & anses bleu marine",
    swatch: ["#1F2A44", "#E08A9B", "#FFFFFF"],
    price: 260,
    description:
      "Le marine tempère, le rose réveille, le blanc éclaire. Un tressage graphique pour un sac qui se porte du bureau au week-end.",
    images: [img("LOV-BIG-02")],
    alt: "Sac Big LOV tricolore marine en cuir de buffle tressé main, charm cœur LOVCICOV",
  },
  {
    ref: "LOV-BIG-03",
    slug: "big-lov-bicolore-rose",
    name: "Big LOV Bicolore Rose",
    silhouette: "big",
    motif: "bicolore",
    coloris: "Rose clair",
    finitions: "Bordures & anses rose",
    swatch: ["#E8547C", "#F2B8C6"],
    price: 260,
    description:
      "Le rose dans toutes ses nuances. Un camaïeu tout en retenue, où seule la bordure vient souligner la ligne du sac.",
    images: [img("LOV-BIG-03")],
    alt: "Sac Big LOV bicolore rose en cuir de buffle tressé main, charm cœur LOVCICOV",
  },
  {
    ref: "LOV-BIG-04",
    slug: "big-lov-bicolore-kaki",
    name: "Big LOV Bicolore Kaki",
    silhouette: "big",
    motif: "bicolore",
    coloris: "Kaki",
    finitions: "Bordures & anses rouge",
    swatch: ["#4B4327", "#C0392B"],
    price: 260,
    description:
      "Un kaki profond réveillé d'un liseré rouge. L'accord le plus parisien de la collection.",
    images: [img("LOV-BIG-04")],
    alt: "Sac Big LOV bicolore kaki en cuir de buffle tressé main, charm cœur LOVCICOV",
  },
  {
    ref: "LOV-BIG-05",
    slug: "big-lov-azteque-vert",
    name: "Big LOV Aztèque Vert",
    silhouette: "big",
    motif: "azteque",
    coloris: "Vert, blanc cassé",
    finitions: "Bordures & anses vert",
    swatch: ["#1F4D34", "#EFE6D2"],
    price: 260,
    description:
      "Le motif losangé, tressé fil à fil en vert et blanc cassé. Un travail d'artisan qui se lit de loin.",
    images: [img("LOV-BIG-05")],
    alt: "Sac Big LOV aztèque vert en cuir de buffle tressé main, charm cœur LOVCICOV",
  },
  {
    ref: "LOV-BIG-06",
    slug: "big-lov-azteque-noir",
    name: "Big LOV Aztèque Noir",
    silhouette: "big",
    motif: "azteque",
    coloris: "Noir, blanc",
    finitions: "Bordures & anses noir",
    swatch: ["#111111", "#FFFFFF"],
    price: 260,
    description:
      "Noir et blanc, le graphisme à l'état pur. Le sac qui va avec tout, sans jamais passer inaperçu.",
    images: [img("LOV-BIG-06")],
    alt: "Sac Big LOV aztèque noir en cuir de buffle tressé main, charm cœur LOVCICOV",
  },

  // ---------- SMALL LOV — 180 € ----------
  {
    ref: "LOV-SML-01",
    slug: "small-lov-tricolore-camel",
    name: "Small LOV Tricolore Camel",
    silhouette: "small",
    motif: "tricolore",
    coloris: "Camel, blanc cassé, doré",
    finitions: "Bordures & anses doré",
    swatch: ["#A9702F", "#EFE6D2", "#C9A227"],
    price: 180,
    description:
      "Camel, blanc cassé et doré. Un format compact qui contient l'essentiel, un tressage qui attire la lumière.",
    images: [img("LOV-SML-01")],
    alt: "Sac Small LOV tricolore camel en cuir de buffle tressé main, charm cœur LOVCICOV",
  },
  {
    ref: "LOV-SML-02",
    slug: "small-lov-tricolore-kaki",
    name: "Small LOV Tricolore Kaki",
    silhouette: "small",
    motif: "tricolore",
    coloris: "Kaki, rose, argenté",
    finitions: "Bordures & anses argenté",
    swatch: ["#4B4327", "#D94F70", "#C0C0C0"],
    price: 180,
    description:
      "Kaki, rose et argent : un contraste inattendu, souligné d'une bordure argentée.",
    images: [img("LOV-SML-02")],
    alt: "Sac Small LOV tricolore kaki en cuir de buffle tressé main, charm cœur LOVCICOV",
  },
  {
    ref: "LOV-SML-03",
    slug: "small-lov-bicolore-argent",
    name: "Small LOV Bicolore Argent",
    silhouette: "small",
    motif: "bicolore",
    coloris: "Argenté",
    finitions: "Bordures & anses doré",
    swatch: ["#C0C0C0", "#C9A227"],
    price: 180,
    description:
      "Argent sur doré. Le petit sac du soir, tressé main comme les autres.",
    images: [img("LOV-SML-03")],
    alt: "Sac Small LOV bicolore argent en cuir de buffle tressé main, charm cœur LOVCICOV",
  },
  {
    ref: "LOV-SML-04",
    slug: "small-lov-bicolore-bleu",
    name: "Small LOV Bicolore Bleu",
    silhouette: "small",
    motif: "bicolore",
    coloris: "Bleu clair",
    finitions: "Bordures & anses rose clair",
    swatch: ["#1E6E82", "#F0857D"],
    price: 180,
    description:
      "Un bleu clair adouci d'une bordure rose. La fraîcheur en format nomade.",
    images: [img("LOV-SML-04")],
    alt: "Sac Small LOV bicolore bleu en cuir de buffle tressé main, charm cœur LOVCICOV",
  },
  {
    ref: "LOV-SML-05",
    slug: "small-lov-azteque-rouge",
    name: "Small LOV Aztèque Rouge",
    silhouette: "small",
    motif: "azteque",
    coloris: "Rouge, vert",
    finitions: "Bordures & anses rouge",
    swatch: ["#C0392B", "#2E4A34"],
    price: 180,
    description:
      "Rouge et vert en motif losangé. Le Small LOV le plus affirmé de la collection.",
    images: [img("LOV-SML-05")],
    alt: "Sac Small LOV aztèque rouge en cuir de buffle tressé main, charm cœur LOVCICOV",
  },
  {
    ref: "LOV-SML-06",
    slug: "small-lov-azteque-terracotta",
    name: "Small LOV Aztèque Terracotta",
    silhouette: "small",
    motif: "azteque",
    coloris: "Terracotta, blanc",
    finitions: "Bordures & anses blanc",
    swatch: ["#8C3A2B", "#FFFFFF"],
    price: 180,
    description:
      "Terracotta et blanc, le motif aztèque dans sa version la plus douce.",
    images: [img("LOV-SML-06")],
    alt: "Sac Small LOV aztèque terracotta en cuir de buffle tressé main, charm cœur LOVCICOV",
  },
];

export const getSacBySlug = (slug?: string) =>
  sacsProducts.find((p) => p.slug === slug);

/** Autres coloris de la même silhouette (sélecteur de la fiche produit) */
export const getSameSilhouette = (product: SacProduct) =>
  sacsProducts.filter((p) => p.silhouette === product.silhouette);

/** Bloc « Vous aimerez aussi » — 3 produits de la même famille de motif */
export const getSameMotif = (product: SacProduct, limit = 3) => {
  const sameMotif = sacsProducts.filter(
    (p) => p.motif === product.motif && p.slug !== product.slug
  );
  const rest = sacsProducts.filter(
    (p) => p.motif !== product.motif && p.slug !== product.slug
  );
  return [...sameMotif, ...rest].slice(0, limit);
};
