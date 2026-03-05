export interface Product {
  id: string;
  name: string;
  price: number;
  collection: 'standard' | 'mystic' | 'bijoux';
  description: string;
  details: string;
  image: string;
  badge?: string;
  colors?: { name: string; id: string }[];
}

// Collection "Standards" — pièces à message fort
export const standardProducts: Product[] = [
  {
    id: 'hoodie-signature',
    name: 'Hoodie Signature',
    price: 220,
    collection: 'standard',
    description: 'Molleton lourd 380g. Coupe architecturale.',
    details: 'Structure et confort. Un essentiel pensé pour ceux qui imposent leur standard.',
    image: 'product-hoodie',
    badge: 'Bestseller',
  },
  {
    id: 'tshirt-statement',
    name: 'T-shirt Statement',
    price: 120,
    collection: 'standard',
    description: 'Coton lourd 240g. Silhouette structurée.',
    details: 'Minimalisme assumé. Chaque détail compte.',
    image: 'signature-tshirt',
  },
  {
    id: 'ensemble-the-standard',
    name: 'Ensemble The Standard',
    price: 380,
    collection: 'standard',
    description: 'Pantalon et haut coordonnés. Tombé impeccable.',
    details: 'L\'uniforme moderne de ceux qui choisissent leur propre direction.',
    image: 'product-trousers',
  },
];

// Collection "Mystic Lov" — produits du site mysticlov.com
export const mysticProducts: Product[] = [
  {
    id: 'mystic-tshirt-noir',
    name: 'T-Shirt Love',
    price: 70,
    collection: 'mystic',
    description: 'Coton bio certifié. Coupe unisexe.',
    details: 'Le T-shirt essentiel Mystic Lov. Doux, conscient, assumé.',
    image: 'mystic-tshirt-noir',
    colors: [
      { name: 'Noir', id: 'mystic-tshirt-noir' },
      { name: 'Natural Raw', id: 'mystic-tshirt-natural' },
      { name: 'Green Bottle', id: 'mystic-tshirt-green' },
    ],
  },
  {
    id: 'mystic-hoodie-noir',
    name: 'Hoodie Love',
    price: 180,
    collection: 'mystic',
    description: 'Molleton épais. Coupe décontractée unisexe.',
    details: 'Le hoodie signature Mystic Lov. Confort et présence.',
    image: 'mystic-hoodie-noir',
    badge: 'Édition limitée',
  },
  {
    id: 'mystic-crewneck-noir',
    name: 'Crewneck Love',
    price: 120,
    collection: 'mystic',
    description: 'Col rond épais. Coton bio traçable.',
    details: 'Le crewneck Mystic Lov. Simplicité et conscience.',
    image: 'mystic-crewneck-noir',
    colors: [
      { name: 'Noir', id: 'mystic-crewneck-noir' },
      { name: 'Natural Raw', id: 'mystic-crewneck-natural' },
    ],
  },
];

// Collection "Bijoux" — colliers et chaînes
export const bijouxProducts: Product[] = [
  {
    id: 'chaine-or-signature',
    name: 'Chaîne Or Signature',
    price: 290,
    collection: 'bijoux',
    description: 'Maille gourmette plaquée or 18k. 45cm.',
    details: 'La chaîne qui impose sans forcer. Présence dorée, élégance silencieuse.',
    image: 'bijoux-chaine-or',
    badge: 'Nouveau',
  },
  {
    id: 'pendentif-argent-minimal',
    name: 'Pendentif Argent Minimal',
    price: 180,
    collection: 'bijoux',
    description: 'Argent massif 925. Médaillon épuré.',
    details: 'Le pendentif pour ceux qui portent un symbole, pas un accessoire.',
    image: 'bijoux-pendentif-argent',
  },
  {
    id: 'chaines-layered-or',
    name: 'Set Chaînes Layered',
    price: 420,
    collection: 'bijoux',
    description: 'Ensemble de chaînes superposées plaquées or.',
    details: 'Le layering signature LOVCICOV. Trois chaînes, une seule intention.',
    image: 'bijoux-chaines-layered',
    badge: 'Édition limitée',
  },
];

export const products: Product[] = [...standardProducts, ...mysticProducts, ...bijouxProducts];
