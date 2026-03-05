export interface Product {
  id: string;
  name: string;
  price: number;
  collection: 'standard';
  description: string;
  details: string;
  image: string;
  badge?: string;
}

export const products: Product[] = [
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
    id: 'veste-presence',
    name: 'Veste Presence',
    price: 450,
    collection: 'standard',
    description: 'Laine structurée. Surpiqûres géométriques subtiles.',
    details: 'Présence et autorité naturelle dans chaque coupe.',
    image: 'product-mystic-coat',
    badge: 'Nouveau',
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
