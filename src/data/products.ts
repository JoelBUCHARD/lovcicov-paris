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
    name: 'The Signature T-Shirt',
    price: 120,
    collection: 'signature',
    description: '240g heavy cotton. Structured silhouette.',
    details: 'Cut to support grounding and posture.',
    image: 'signature-tshirt',
    state: 'Grounded',
  },
  {
    id: 'structured-trousers',
    name: 'Structured Trousers',
    price: 280,
    collection: 'signature',
    description: 'Tailored wool blend. Clean drape.',
    details: 'Designed for presence and vertical alignment.',
    image: 'product-trousers',
    state: 'Present',
  },
  {
    id: 'oversized-shirt',
    name: 'The Oversized Shirt',
    price: 195,
    collection: 'signature',
    description: 'Crisp cotton poplin. Relaxed structure.',
    details: 'Engineered for ease and quiet confidence.',
    image: 'product-shirt',
    state: 'Confident',
  },
  {
    id: 'structured-hoodie',
    name: 'The Structured Hoodie',
    price: 220,
    collection: 'signature',
    description: '380g heavyweight fleece. Architectural fit.',
    details: 'Built for grounding and comfort in motion.',
    image: 'product-hoodie',
    state: 'Grounded',
  },
  {
    id: 'mystic-coat',
    name: 'Mystic Coat',
    price: 450,
    collection: 'mystic',
    description: 'Structured wool. Subtle geometric stitching.',
    details: 'Minimal forms designed to support how you feel.',
    image: 'product-mystic-coat',
    state: 'Confident',
  },
  {
    id: 'mystic-blazer',
    name: 'Mystic Blazer',
    price: 380,
    collection: 'mystic',
    description: 'Tailored silhouette. Subtle symbolic detail.',
    details: 'Clean lines that support presence.',
    image: 'mystic-collection',
    state: 'Present',
  },
];

export const scanQuestions = [
  {
    id: 1,
    question: 'When you get dressed, what matters most?',
    options: [
      { text: 'Feeling anchored and stable', state: 'Grounded' },
      { text: 'Being fully aware of the moment', state: 'Present' },
      { text: 'Projecting quiet strength', state: 'Confident' },
    ],
  },
  {
    id: 2,
    question: 'How do you naturally carry yourself?',
    options: [
      { text: 'Rooted and deliberate', state: 'Grounded' },
      { text: 'Open and attentive', state: 'Present' },
      { text: 'Upright and composed', state: 'Confident' },
    ],
  },
  {
    id: 3,
    question: 'What kind of fabric weight feels right?',
    options: [
      { text: 'Heavy — I want to feel the garment', state: 'Grounded' },
      { text: 'Medium — balanced and adaptive', state: 'Present' },
      { text: 'Structured — it holds its shape', state: 'Confident' },
    ],
  },
  {
    id: 4,
    question: 'In a room of people, you tend to…',
    options: [
      { text: 'Observe before engaging', state: 'Grounded' },
      { text: 'Read the energy of the space', state: 'Present' },
      { text: 'Set the tone naturally', state: 'Confident' },
    ],
  },
  {
    id: 5,
    question: 'What does comfort mean to you?',
    options: [
      { text: 'Weight and warmth', state: 'Grounded' },
      { text: 'Freedom of movement', state: 'Present' },
      { text: 'Knowing you look right', state: 'Confident' },
    ],
  },
  {
    id: 6,
    question: 'Your ideal silhouette is…',
    options: [
      { text: 'Relaxed but substantial', state: 'Grounded' },
      { text: 'Clean and balanced', state: 'Present' },
      { text: 'Sharp and intentional', state: 'Confident' },
    ],
  },
  {
    id: 7,
    question: 'How do you start your day?',
    options: [
      { text: 'Slowly — with ritual', state: 'Grounded' },
      { text: 'With awareness of what matters', state: 'Present' },
      { text: 'With clarity and purpose', state: 'Confident' },
    ],
  },
  {
    id: 8,
    question: 'When you feel your best, you feel…',
    options: [
      { text: 'Centered and calm', state: 'Grounded' },
      { text: 'Alive and connected', state: 'Present' },
      { text: 'Assured and in control', state: 'Confident' },
    ],
  },
];

export const stateDescriptions: Record<string, { title: string; description: string }> = {
  Grounded: {
    title: 'Grounded',
    description: 'You seek stability and substance. Heavy fabrics, structured silhouettes, and deliberate design anchor you in your body.',
  },
  Present: {
    title: 'Present',
    description: 'You move with awareness. Balanced proportions and clean construction help you stay connected to the moment.',
  },
  Confident: {
    title: 'Confident',
    description: 'You lead with intention. Sharp tailoring and structured forms reinforce your natural authority.',
  },
};
