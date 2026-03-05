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
  gallery?: string[]; // Additional images (lifestyle, tarot, etc.)
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
  {
    id: 'mystic-tshirt-namaste',
    name: 'T-Shirt Namaste',
    price: 70,
    collection: 'mystic',
    description: 'Coton bio certifié. Print "Namaste Bitches".',
    details: 'L\'irrévérence assumée. Un message spirituel avec du caractère.',
    image: 'mystic-tshirt-namaste-model',
    gallery: ['mystic-tshirt-namaste-flat'],
  },
  {
    id: 'mystic-tshirt-cosmos',
    name: 'T-Shirt Cosmos',
    price: 70,
    collection: 'mystic',
    description: 'Coton bio certifié. Print cosmique multicolore.',
    details: 'L\'univers sur un t-shirt. Art psychédélique et couleurs vibrantes.',
    image: 'mystic-tshirt-cosmos-model',
    gallery: ['mystic-tshirt-cosmos-flat'],
    badge: 'Nouveau',
  },
  {
    id: 'mystic-tshirt-sunshine',
    name: 'T-Shirt Sunshine',
    price: 70,
    collection: 'mystic',
    description: 'Coton bio certifié. Print "Sunshine Stay Magical".',
    details: 'Soleil, papillons et magie. Un t-shirt qui rayonne.',
    image: 'mystic-tshirt-sunshine-model',
    gallery: ['mystic-tshirt-sunshine-flat'],
  },
  {
    id: 'mystic-tshirt-norisk',
    name: 'T-Shirt No Risk No Magic',
    price: 70,
    collection: 'mystic',
    description: 'Coton bio certifié. Broderie poitrine fluo.',
    details: 'Le mantra des audacieux. Petit message, grand impact.',
    image: 'mystic-tshirt-norisk-model',
    gallery: ['mystic-tshirt-norisk-flat'],
  },
  {
    id: 'mystic-tshirt-heart',
    name: 'T-Shirt Heart Eye',
    price: 70,
    collection: 'mystic',
    description: 'Coton bio certifié. Patch cœur brodé rouge.',
    details: 'L\'œil qui voit tout, dans un cœur qui bat. Patch artisanal.',
    image: 'mystic-tshirt-heart-model',
    gallery: ['mystic-tshirt-heart-flat'],
    badge: 'Nouveau',
  },
  {
    id: 'mystic-tshirt-blanc',
    name: 'T-Shirt Essentiel Blanc',
    price: 55,
    collection: 'mystic',
    description: 'Coton bio certifié. Blanc pur, coupe unisexe.',
    details: 'La base parfaite. Simplicité absolue, qualité sans compromis.',
    image: 'mystic-tshirt-blanc-model',
    gallery: ['mystic-tshirt-blanc-flat'],
  },
];

// Collection "Bijoux" — colliers en pierres naturelles
// Photos classifiées : solo (produit), fleurs (lifestyle), tarot (ambiance)
export const bijouxProducts: Product[] = [
  {
    id: 'collier-fuchsia-or',
    name: 'Collier Fuchsia & Or',
    price: 320,
    collection: 'bijoux',
    description: 'Perles œil de tigre rose, sphères dorées martelées.',
    details: 'Présence et caractère. Un collier qui impose sa couleur sans compromis.',
    image: 'bijoux-fuchsia-solo',
    badge: 'Édition limitée',
    gallery: ['bijoux-fuchsia-fleurs', 'bijoux-fuchsia-tarot'],
  },
  {
    id: 'collier-quartz-aventurine',
    name: 'Collier Quartz Rose & Aventurine',
    price: 260,
    collection: 'bijoux',
    description: 'Double rang quartz rose et éclats d\'aventurine, détails dorés.',
    details: 'Douceur brute. Deux pierres, deux énergies, une seule intention.',
    image: 'bijoux-quartz-solo',
    gallery: ['bijoux-quartz-fleurs', 'bijoux-quartz-tarot'],
  },
  {
    id: 'collier-labradorite-amethyste',
    name: 'Collier Labradorite & Améthyste',
    price: 280,
    collection: 'bijoux',
    description: 'Double rang labradorite et améthyste brute, détails dorés.',
    details: 'Force et intuition. Deux pierres aux reflets mystiques, liées par l\'or.',
    image: 'bijoux-labradorite-solo',
    badge: 'Nouveau',
    gallery: ['bijoux-labradorite-fleurs', 'bijoux-labradorite-tarot'],
  },
  {
    id: 'collier-prehnite-malachite',
    name: 'Collier Préhnite & Malachite',
    price: 300,
    collection: 'bijoux',
    description: 'Triple rang préhnite et malachite, fermoir doré.',
    details: 'Fraîcheur minérale. Trois rangs de pierres brutes pour une présence végétale.',
    image: 'bijoux-prehnite-solo',
    gallery: ['bijoux-prehnite-fleurs', 'bijoux-prehnite-tarot'],
  },
  {
    id: 'collier-quartz-croix-jade',
    name: 'Collier Quartz Rose & Croix de Jade',
    price: 270,
    collection: 'bijoux',
    description: 'Perles de quartz rose, croix de jade vert, pendentif.',
    details: 'Symboles et douceur. Un collier entre spiritualité et élégance naturelle.',
    image: 'bijoux-quartz-croix-fleurs',
    gallery: ['bijoux-croix-tarot'],
  },
  {
    id: 'collier-malachite-corail',
    name: 'Collier Malachite & Corail',
    price: 340,
    collection: 'bijoux',
    description: 'Perles de malachite, perles baroques, grappe de corail rouge.',
    details: 'Intensité et contraste. La malachite profonde rencontre l\'éclat du corail.',
    image: 'bijoux-malachite-solo',
    badge: 'Édition limitée',
    gallery: ['bijoux-malachite-fleurs', 'bijoux-malachite-tarot'],
  },
  {
    id: 'collier-trio-citrine',
    name: 'Collier Trio Citrine & Améthyste',
    price: 290,
    collection: 'bijoux',
    description: 'Triple rang citrine, malachite et améthyste, détails dorés.',
    details: 'Énergie solaire. Trois pierres vibrantes tissées en un seul collier lumineux.',
    image: 'bijoux-trio-solo',
    badge: 'Nouveau',
    gallery: ['bijoux-trio-fleurs', 'bijoux-trio-tarot'],
  },
  {
    id: 'collier-jade-nacre',
    name: 'Collier Jade & Nacre',
    price: 310,
    collection: 'bijoux',
    description: 'Perles de jade vert facetté, intercalaires dorés, pendentif nacre.',
    details: 'Élégance intemporelle. Le jade profond sublimé par la lumière de la nacre.',
    image: 'bijoux-jade-pendentif',
    gallery: ['bijoux-jade-tarot'],
  },
  {
    id: 'collier-corail-multicolor',
    name: 'Collier Corail & Pierres Multicolores',
    price: 350,
    collection: 'bijoux',
    description: 'Perles de corail rouge, éclats multicolores, pendentif doré.',
    details: 'Explosion de couleurs. Un collier vibrant qui célèbre la diversité des pierres.',
    image: 'bijoux-corail-multicolor',
    badge: 'Édition limitée',
    gallery: ['bijoux-corail-fleurs', 'bijoux-corail-tarot'],
  },
  {
    id: 'collier-turquoise-or',
    name: 'Collier Turquoise & Or',
    price: 240,
    collection: 'bijoux',
    description: 'Perles de turquoise, intercalaires dorés, fermoir doré.',
    details: 'Fraîcheur et lumière. La turquoise solaire ponctuée d\'or pour un éclat naturel.',
    image: 'bijoux-turquoise-solo',
    gallery: ['bijoux-turquoise-fleurs', 'bijoux-turquoise-tarot'],
  },
];

export const products: Product[] = [...standardProducts, ...mysticProducts, ...bijouxProducts];
