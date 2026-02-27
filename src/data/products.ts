export interface Product {
  id: string;
  name: string;
  price: number;
  collection: 'signature' | 'mystic';
  description: string;
  details: string;
  image: string;
  state?: string;
}

export const products: Product[] = [
  {
    id: 'signature-tee-black',
    name: 'Le T-Shirt Signature',
    price: 120,
    collection: 'signature',
    description: 'Coton lourd 240g. Silhouette structurée.',
    details: 'Conçu pour favoriser l\'ancrage et la posture.',
    image: 'signature-tshirt',
    state: 'Ancré',
  },
  {
    id: 'structured-trousers',
    name: 'Le Pantalon Structuré',
    price: 280,
    collection: 'signature',
    description: 'Laine mélangée sur mesure. Tombé impeccable.',
    details: 'Conçu pour la présence et l\'alignement vertical.',
    image: 'product-trousers',
    state: 'Présent',
  },
  {
    id: 'oversized-shirt',
    name: 'La Chemise Oversize',
    price: 195,
    collection: 'signature',
    description: 'Popeline de coton craquante. Structure décontractée.',
    details: 'Pensée pour l\'aisance et une confiance discrète.',
    image: 'product-shirt',
    state: 'Confiant',
  },
  {
    id: 'structured-hoodie',
    name: 'Le Hoodie Structuré',
    price: 220,
    collection: 'signature',
    description: 'Molleton lourd 380g. Coupe architecturale.',
    details: 'Pensé pour l\'ancrage et le confort en mouvement.',
    image: 'product-hoodie',
    state: 'Ancré',
  },
  {
    id: 'mystic-coat',
    name: 'Manteau Mystic',
    price: 450,
    collection: 'mystic',
    description: 'Laine structurée. Surpiqûres géométriques subtiles.',
    details: 'Formes minimales conçues pour soutenir votre état.',
    image: 'product-mystic-coat',
    state: 'Confiant',
  },
  {
    id: 'mystic-blazer',
    name: 'Blazer Mystic',
    price: 380,
    collection: 'mystic',
    description: 'Silhouette ajustée. Détail symbolique subtil.',
    details: 'Lignes épurées qui soutiennent la présence.',
    image: 'mystic-collection',
    state: 'Présent',
  },
];

export const scanQuestions = [
  {
    id: 1,
    question: 'Quand vous vous habillez, qu\'est-ce qui compte le plus ?',
    options: [
      { text: 'Se sentir ancré et stable', state: 'Ancré' },
      { text: 'Être pleinement conscient du moment', state: 'Présent' },
      { text: 'Projeter une force tranquille', state: 'Confiant' },
    ],
  },
  {
    id: 2,
    question: 'Comment vous tenez-vous naturellement ?',
    options: [
      { text: 'Enraciné et délibéré', state: 'Ancré' },
      { text: 'Ouvert et attentif', state: 'Présent' },
      { text: 'Droit et composé', state: 'Confiant' },
    ],
  },
  {
    id: 3,
    question: 'Quel poids de tissu vous convient ?',
    options: [
      { text: 'Lourd — je veux sentir le vêtement', state: 'Ancré' },
      { text: 'Moyen — équilibré et adaptable', state: 'Présent' },
      { text: 'Structuré — il garde sa forme', state: 'Confiant' },
    ],
  },
  {
    id: 4,
    question: 'Dans une pièce pleine de monde, vous avez tendance à…',
    options: [
      { text: 'Observer avant d\'interagir', state: 'Ancré' },
      { text: 'Lire l\'énergie de l\'espace', state: 'Présent' },
      { text: 'Donner le ton naturellement', state: 'Confiant' },
    ],
  },
  {
    id: 5,
    question: 'Que signifie le confort pour vous ?',
    options: [
      { text: 'Poids et chaleur', state: 'Ancré' },
      { text: 'Liberté de mouvement', state: 'Présent' },
      { text: 'Savoir qu\'on a le bon look', state: 'Confiant' },
    ],
  },
  {
    id: 6,
    question: 'Votre silhouette idéale est…',
    options: [
      { text: 'Décontractée mais substantielle', state: 'Ancré' },
      { text: 'Épurée et équilibrée', state: 'Présent' },
      { text: 'Nette et intentionnelle', state: 'Confiant' },
    ],
  },
  {
    id: 7,
    question: 'Comment commencez-vous votre journée ?',
    options: [
      { text: 'Lentement — avec un rituel', state: 'Ancré' },
      { text: 'Avec conscience de ce qui compte', state: 'Présent' },
      { text: 'Avec clarté et détermination', state: 'Confiant' },
    ],
  },
  {
    id: 8,
    question: 'Quand vous vous sentez au mieux, vous vous sentez…',
    options: [
      { text: 'Centré et calme', state: 'Ancré' },
      { text: 'Vivant et connecté', state: 'Présent' },
      { text: 'Assuré et maître de la situation', state: 'Confiant' },
    ],
  },
];

export const stateDescriptions: Record<string, { title: string; description: string }> = {
  Ancré: {
    title: 'Ancré',
    description: 'Vous recherchez la stabilité et la substance. Les tissus lourds, les silhouettes structurées et le design délibéré vous ancrent dans votre corps.',
  },
  Présent: {
    title: 'Présent',
    description: 'Vous bougez avec conscience. Des proportions équilibrées et une construction épurée vous aident à rester connecté au moment.',
  },
  Confiant: {
    title: 'Confiant',
    description: 'Vous menez avec intention. Une coupe nette et des formes structurées renforcent votre autorité naturelle.',
  },
};
