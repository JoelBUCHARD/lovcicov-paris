export interface Product {
  id: string;
  name: string;
  price: number;
  collection: 'standard' | 'mystic' | 'bijoux';
  subcategory?: 'tshirt' | 'crewneck' | 'hoodie';
  description: string;
  details: string;
  image: string;
  badge?: string;
  colors?: { name: string; id: string }[];
  gallery?: string[]; // Additional images (lifestyle, tarot, etc.)
  stoneMeaning?: string; // Signification des pierres (bijoux only)
}

// Collection "PowerLov" — pièces à message fort
export const standardProducts: Product[] = [
  {
    id: 'hoodie-signature',
    name: 'Hoodie Signature',
    price: 220,
    collection: 'standard',
    subcategory: 'hoodie',
    description: 'Molleton lourd 380g, coupe oversize architecturale. Au dos : « STANDARD » brodé. Disponible en 2 coloris. Unisex — taille unique ou S/M/L/XL.',
    details: 'Ce que vous portez parle pour vous. Un manifeste discret pour celles et ceux qui imposent leur propre standard.',
    image: 'product-hoodie',
  },
  {
    id: 'tshirt-statement',
    name: 'T-shirt Statement',
    price: 120,
    collection: 'standard',
    subcategory: 'tshirt',
    description: 'Coton lourd 240g, silhouette structurée. Au dos : « POWER » sérigraphié. Disponible en 2 coloris. Unisex — taille unique ou S/M/L/XL.',
    details: 'Un mot, une posture. Pour celles et ceux qui choisissent ce qu\'ils affichent.',
    image: 'signature-tshirt',
  },
  {
    id: 'crewneck-standard',
    name: 'Crewneck The Standard',
    price: 160,
    collection: 'standard',
    subcategory: 'crewneck',
    description: 'Molleton 350g, col rond structuré. Au dos : « THE STANDARD » brodé. Disponible en 2 coloris. Unisex — taille unique ou S/M/L/XL.',
    details: 'Le crewneck essentiel. Coupe nette, présence affirmée, message qui suit ceux qui avancent.',
    image: 'product-shirt',
  },
  {
    id: 'ensemble-the-standard',
    name: 'Ensemble The Standard',
    price: 380,
    collection: 'standard',
    description: 'Pantalon et haut coordonnés, tombé impeccable. Au dos du haut : « DIRECTION » brodé. Disponible en 2 coloris. Unisex — taille unique ou S/M/L/XL.',
    details: 'L\'uniforme moderne de celles et ceux qui choisissent leur propre direction.',
    image: 'product-trousers',
  },
];

// Collection "MysticLov" — produits du site mysticlov.com
export const mysticProducts: Product[] = [
  {
    id: 'mystic-tshirt-noir',
    name: 'T-Shirt Love',
    price: 70,
    collection: 'mystic',
    subcategory: 'tshirt',
    description: 'Coton bio certifié. Coupe unisexe.',
    details: 'Le T-shirt essentiel MysticLov. Doux, conscient, assumé.',
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
    subcategory: 'hoodie',
    description: 'Molleton épais. Coupe décontractée unisexe.',
    details: 'Le hoodie signature MysticLov. Confort et présence.',
    image: 'mystic-hoodie-noir',
    badge: 'EDITION LIMITEE',
  },
  {
    id: 'mystic-crewneck-noir',
    name: 'Crewneck Love',
    price: 120,
    collection: 'mystic',
    subcategory: 'crewneck',
    description: 'Col rond épais. Coton bio traçable.',
    details: 'Le crewneck MysticLov. Simplicité et conscience.',
    image: 'mystic-crewneck-love-front',
    gallery: [
      'mystic-crewneck-love-back',
      'mystic-crewneck-love-detail-1',
      'mystic-crewneck-love-detail-2',
      'mystic-crewneck-love-detail-3',
    ],
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
    subcategory: 'tshirt',
    description: 'Coton bio certifié. Print "Namaste Bitches".',
    details: 'L\'irrévérence assumée. Un message spirituel avec du caractère.',
    image: 'mystic-tshirt-namaste-model',
  },
  {
    id: 'mystic-tshirt-cosmos',
    name: 'T-Shirt Cosmos',
    price: 70,
    collection: 'mystic',
    subcategory: 'tshirt',
    description: 'Coton bio certifié. Print cosmique multicolore.',
    details: 'L\'univers sur un t-shirt. Art psychédélique et couleurs vibrantes.',
    image: 'mystic-tshirt-cosmos-model',
    
    badge: 'NOUVEAU',
  },
  {
    id: 'mystic-tshirt-sunshine',
    name: 'T-Shirt Sunshine',
    price: 70,
    collection: 'mystic',
    subcategory: 'tshirt',
    description: 'Coton bio certifié. Print "Sunshine Stay Magical".',
    details: 'Soleil, papillons et magie. Un t-shirt qui rayonne.',
    image: 'mystic-tshirt-sunshine-model',
    
  },
  {
    id: 'mystic-tshirt-norisk',
    name: 'T-Shirt No Risk No Magic',
    price: 70,
    collection: 'mystic',
    subcategory: 'tshirt',
    description: 'Coton bio certifié. Broderie poitrine fluo.',
    details: 'Le mantra des audacieux. Petit message, grand impact.',
    image: 'mystic-tshirt-norisk-model',
    
  },
  {
    id: 'mystic-tshirt-heart',
    name: 'T-Shirt Heart Eye',
    price: 70,
    collection: 'mystic',
    subcategory: 'tshirt',
    description: 'Coton bio certifié. Patch cœur brodé rouge.',
    details: 'L\'œil qui voit tout, dans un cœur qui bat. Patch artisanal.',
    image: 'mystic-tshirt-heart-model',
    
    badge: 'NOUVEAU',
  },
  {
    id: 'mystic-tshirt-abstract',
    name: 'T-Shirt Abstract Art',
    price: 70,
    collection: 'mystic',
    subcategory: 'tshirt',
    description: 'Coton bio certifié. Print art abstrait multicolore.',
    details: 'L\'art brut sur coton. Composition abstraite vibrante, entre peinture et collage.',
    image: 'mystic-tshirt-abstract-model',
    
  },
  {
    id: 'mystic-tshirt-newworld',
    name: 'T-Shirt New World System',
    price: 70,
    collection: 'mystic',
    subcategory: 'tshirt',
    description: 'Coton bio certifié. Print "New World System" cosmique.',
    details: 'Un nouveau monde à construire. Graphisme rétro-futuriste et énergie galactique.',
    image: 'mystic-tshirt-newworld-model',
    
    badge: 'NOUVEAU',
  },
  {
    id: 'mystic-tshirt-switchoff',
    name: 'T-Shirt Switch Off',
    price: 70,
    collection: 'mystic',
    subcategory: 'tshirt',
    description: 'Coton bio certifié. Print "Switch Off" rétro psychédélique.',
    details: 'Déconnecte pour mieux te reconnecter. Inspiration 70s et ondes cosmiques.',
    image: 'mystic-tshirt-switchoff-model',
    
  },
  {
    id: 'mystic-tshirt-madonna',
    name: 'T-Shirt Madonna',
    price: 70,
    collection: 'mystic',
    subcategory: 'tshirt',
    description: 'Coton bio certifié. Print Vierge pop art.',
    details: 'Sacré et irrévérence. Une icône revisitée en street art explosif.',
    image: 'mystic-tshirt-madonna-model',
    
    badge: 'NOUVEAU',
  },
];

// Collection "StoneLov" — colliers en pierres naturelles
// Photos classifiées : solo (produit), fleurs (lifestyle), tarot (ambiance)
export const bijouxProducts: Product[] = [
  {
    id: 'collier-fuchsia-or',
    name: 'Collier Fuchsia & Or',
    price: 89,
    collection: 'bijoux',
    description: 'Perles œil de tigre rose, sphères dorées martelées.',
    details: 'Présence et caractère. Un collier qui impose sa couleur sans compromis.',
    image: 'bijoux-fuchsia-solo',
    badge: 'EDITION LIMITEE',
    gallery: ['bijoux-fuchsia-fleurs', 'bijoux-fuchsia-tarot'],
    stoneMeaning: 'Œil de tigre rose — Pierre de confiance en soi et de courage. Elle renforce la détermination et aide à surmonter les doutes intérieurs.',
  },
  {
    id: 'collier-quartz-aventurine',
    name: 'Collier Quartz Rose & Aventurine',
    price: 79,
    collection: 'bijoux',
    description: 'Double rang quartz rose et éclats d\'aventurine, détails dorés.',
    details: 'Douceur brute. Deux pierres, deux énergies, une seule intention.',
    image: 'bijoux-quartz-solo',
    gallery: ['bijoux-quartz-fleurs', 'bijoux-quartz-tarot'],
    stoneMeaning: 'Quartz rose — Pierre de l\'amour inconditionnel et de la paix intérieure. Aventurine — Pierre de chance et de prospérité, elle apaise le cœur et attire l\'abondance.',
  },
  {
    id: 'collier-labradorite-amethyste',
    name: 'Collier Labradorite & Améthyste',
    price: 85,
    collection: 'bijoux',
    description: 'Double rang labradorite et améthyste brute, détails dorés.',
    details: 'Force et intuition. Deux pierres aux reflets mystiques, liées par l\'or.',
    image: 'bijoux-labradorite-solo',
    badge: 'NOUVEAU',
    gallery: ['bijoux-labradorite-fleurs', 'bijoux-labradorite-tarot'],
    stoneMeaning: 'Labradorite — Pierre de protection et d\'intuition. Elle absorbe les énergies négatives et éveille la clairvoyance. Améthyste — Pierre de sagesse et de sérénité, elle favorise la méditation et l\'élévation spirituelle.',
  },
  {
    id: 'collier-prehnite-malachite',
    name: 'Collier Préhnite & Malachite',
    price: 89,
    collection: 'bijoux',
    description: 'Triple rang préhnite et malachite, fermoir doré.',
    details: 'Fraîcheur minérale. Trois rangs de pierres brutes pour une présence végétale.',
    image: 'bijoux-prehnite-solo',
    gallery: ['bijoux-prehnite-fleurs', 'bijoux-prehnite-tarot'],
    stoneMeaning: 'Préhnite — Pierre de guérison et de renouveau, elle apaise l\'esprit et renforce la connexion à la nature. Malachite — Pierre de transformation et de protection, elle absorbe les énergies négatives et favorise le changement profond.',
  },
  {
    id: 'collier-quartz-croix-jade',
    name: 'Collier Quartz Rose & Croix de Jade',
    price: 82,
    collection: 'bijoux',
    description: 'Perles de quartz rose, croix de jade vert, pendentif.',
    details: 'Symboles et douceur. Un collier entre spiritualité et élégance naturelle.',
    image: 'bijoux-quartz-croix-fleurs',
    gallery: ['bijoux-croix-tarot'],
    stoneMeaning: 'Quartz rose — Pierre de l\'amour et de la tendresse, elle ouvre le chakra du cœur. Jade — Pierre d\'harmonie et d\'équilibre, symbole de pureté et de longévité dans de nombreuses cultures.',
  },
  {
    id: 'collier-malachite-corail',
    name: 'Collier Malachite & Corail',
    price: 89,
    collection: 'bijoux',
    description: 'Perles de malachite, perles baroques, grappe de corail rouge.',
    details: 'Intensité et contraste. La malachite profonde rencontre l\'éclat du corail.',
    image: 'bijoux-malachite-solo',
    badge: 'EDITION LIMITEE',
    gallery: ['bijoux-malachite-fleurs', 'bijoux-malachite-tarot'],
    stoneMeaning: 'Malachite — Pierre de transformation, elle accompagne les périodes de changement et protège des influences extérieures. Corail rouge — Symbole de vitalité et d\'énergie, il stimule la force de vie et le courage.',
  },
  {
    id: 'collier-trio-citrine',
    name: 'Collier Trio Citrine & Améthyste',
    price: 85,
    collection: 'bijoux',
    description: 'Triple rang citrine, malachite et améthyste, détails dorés.',
    details: 'Énergie solaire. Trois pierres vibrantes tissées en un seul collier lumineux.',
    image: 'bijoux-trio-solo',
    badge: 'NOUVEAU',
    gallery: ['bijoux-trio-fleurs', 'bijoux-trio-tarot'],
    stoneMeaning: 'Citrine — Pierre de joie et d\'abondance, elle rayonne d\'énergie solaire et attire la réussite. Améthyste — Pierre de sagesse spirituelle. Malachite — Pierre de transformation et de renouveau.',
  },
  {
    id: 'collier-jade-nacre',
    name: 'Collier Jade & Nacre',
    price: 87,
    collection: 'bijoux',
    description: 'Perles de jade vert facetté, intercalaires dorés, pendentif nacre.',
    details: 'Élégance intemporelle. Le jade profond sublimé par la lumière de la nacre.',
    image: 'bijoux-jade-pendentif',
    gallery: ['bijoux-jade-tarot'],
    stoneMeaning: 'Jade vert — Pierre de sérénité et de sagesse, elle favorise l\'harmonie et la paix intérieure. Nacre — Symbole de douceur et de féminité, elle protège et apaise les émotions.',
  },
  {
    id: 'collier-corail-multicolor',
    name: 'Collier Corail & Pierres Multicolores',
    price: 89,
    collection: 'bijoux',
    description: 'Perles de corail rouge, éclats multicolores, pendentif doré.',
    details: 'Explosion de couleurs. Un collier vibrant qui célèbre la diversité des pierres.',
    image: 'bijoux-corail-multicolor',
    badge: 'EDITION LIMITEE',
    gallery: ['bijoux-corail-fleurs', 'bijoux-corail-tarot'],
    stoneMeaning: 'Corail rouge — Pierre de vitalité, elle stimule l\'énergie et la passion. Les pierres multicolores apportent chacune leur vibration : équilibre, joie, protection et créativité.',
  },
  {
    id: 'collier-turquoise-or',
    name: 'Collier Turquoise & Or',
    price: 79,
    collection: 'bijoux',
    description: 'Perles de turquoise, intercalaires dorés, fermoir doré.',
    details: 'Fraîcheur et lumière. La turquoise solaire ponctuée d\'or pour un éclat naturel.',
    image: 'bijoux-turquoise-solo',
    gallery: ['bijoux-turquoise-fleurs', 'bijoux-turquoise-tarot'],
    stoneMeaning: 'Turquoise — Pierre de communication et de protection. Considérée comme sacrée par de nombreuses civilisations, elle favorise l\'expression de soi et apporte chance et sérénité.',
  },
];

export const products: Product[] = [...standardProducts, ...mysticProducts, ...bijouxProducts];
