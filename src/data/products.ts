import { getCatalogEntry, isCatalogLoaded, onCatalogUpdate } from '@/lib/shopifyCatalog';
import { isKeyHidden, onVisibilityUpdate } from '@/lib/visibilityStore';


export interface ProductSpecs {
  composition: string;
  care: string[];
  careSymbols: string[];
  certifications: string[];
  sizeChart: {
    sizes: string[];
    rows: { label: string; values: string[] }[];
  };
}

export type Univers = 'powerlov' | 'mysticlov' | 'stonelov' | 'lovbag';

export interface Product {
  id: string;
  name: string;
  /** Prix — récupéré depuis Shopify au chargement (jamais écrit en dur). */
  price: number;
  collection: 'standard' | 'mystic' | 'bijoux' | 'sacs' | 'accessoires';
  /** Univers de rattachement — dérivé automatiquement de `collection`. */
  univers?: Univers;
  /** Toutes les images du produit : [image principale, ...gallery]. Dérivé automatiquement. */
  images?: string[];
  /** Vues typées des images ({ url, vue }). Dérivé automatiquement. */
  views?: { url: string; vue: 'face' | 'dos' | 'porte' | 'detail' }[];
  subcategory?: 'tshirt' | 'crewneck' | 'hoodie' | 'kimono';
  /** Type — récupéré depuis Shopify (productType), jamais écrit en dur. */
  type?: 'hoodie' | 'crewneck' | 'tshirt' | 'kimono' | 'sac' | 'bijou' | 'accessoire';
  /** Disponibilité — récupérée depuis Shopify. */
  availableForSale?: boolean;
  description: string;
  details: string;
  image: string;
  badge?: string;
  colors?: { name: string; id: string }[];
  gallery?: string[]; // Additional images (lifestyle, tarot, etc.)

  stoneMeaning?: string; // Signification des pierres (bijoux only)
  shopifyHandle?: string; // Handle of matching Shopify product
  shopifyVariantId?: string; // Variante Shopify résolue au chargement depuis le handle
  shopifyColor?: string; // Color option value to match on Shopify variant
  specs?: ProductSpecs; // Fiche technique complète (accordéons Composition & entretien / Guide des tailles)
}

// Fiche technique molleton MysticLov (crewneck & hoodie Sacred Heart)
/** Fiche telle qu'écrite dans ce fichier : sans prix ni type (fournis par Shopify). */
export type RawProduct = Omit<Product, 'price'> & { price?: number };

export const MOLLETON_SPECS: ProductSpecs = {
  composition: 'Molleton brossé, 100 % coton — Organic Ring Spun Combed, teint en pièce.',
  care: [
    'Laver avec des couleurs similaires.',
    'Ne pas repasser sur l\'imprimé.',
    'Laver et repasser à l\'envers.',
    'Pas de sèche-linge.',
  ],
  careSymbols: ['Lavage 30 °C', 'Pas de blanchiment', 'Repassage doux', 'Pas de séchage en tambour'],
  certifications: [
    'GOTS Organic — Control Union CU 819434',
    'OEKO-TEX Standard 100 — 2012163 Centexbel',
    'Fair Wear Foundation — statut Leader',
  ],
  sizeChart: {
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    rows: [
      { label: 'A — Demi-poitrine', values: ['59,5', '61,5', '63,5', '67,5', '70,5', '73,5', '77,5', '81,5'] },
      { label: 'B — Longueur dos', values: ['60', '63', '68', '72', '74', '76', '78', '80'] },
      { label: 'C — Longueur de manche', values: ['50', '52', '56,5', '59', '61', '61,5', '62', '62'] },
    ],
  },
};


// Collection "PowerLov" — pièces à message fort
const rawStandardProducts: RawProduct[] = [
  {
    id: 'powerlov-discipline',
    shopifyHandle: 'powerlov-discipline',
    name: 'DISCIPLINE IS MY LUXURY',
    collection: 'standard',
    subcategory: 'tshirt',
    description: 'La discipline n\'est pas une contrainte. C\'est un luxe que tu t\'offres chaque jour. Ce t-shirt oversize en coton biologique lourd porte son manifeste dans le dos, en lettres brossées noir et rouge — et le cœur LOVCICOV brodé près du col, comme un rappel discret. Le mannequin porte une taille XS.',
    details: 'La discipline n\'est pas une contrainte. C\'est un luxe que tu t\'offres chaque jour. Ce t-shirt oversize en coton biologique lourd porte son manifeste dans le dos, en lettres brossées noir et rouge — et le cœur LOVCICOV brodé près du col, comme un rappel discret. Le mannequin porte une taille XS.',
    image: 'powerlov-discipline-porte-face-v3',
    gallery: ['powerlov-discipline-porte-dos', 'powerlov-discipline-packshot-face', 'powerlov-discipline-packshot-dos'],
    badge: 'UNISEX',
  },
  {
    id: 'powerlov-if-god-dj-frequency',
    shopifyHandle: 'powerlov-if-god-dj-frequency',
    name: 'PRETTY. SMART. DANGEROUS.',
    collection: 'standard',
    subcategory: 'tshirt',
    description: 'Coton lourd 280g, coupe oversize. Sérigraphie « PRETTY. SMART. DANGEROUS. ». Unisex.',
    details: 'Une réponse. Une vibration. Une signature.',
    image: 'powerlov-pretty-smart-porte-face-v2',
    gallery: ['powerlov-pretty-smart-porte-dos', 'powerlov-pretty-smart-packshot-face', 'powerlov-pretty-smart-packshot-dos'],
    badge: 'UNISEX',
  },
  {
    id: 'powerlov-god-is-a-dancer',
    shopifyHandle: 'powerlov-god-is-a-dancer',
    name: 'GOD IS A DANCER',
    collection: 'standard',
    subcategory: 'tshirt',
    description: 'Danser, c\'est prier avec le corps. Ce t-shirt oversize en coton biologique lourd affiche sa foi dans le mouvement : GOD IS A DANCER en lettres brossées noir et rouge dans le dos, logo LOVCICOV Paris et cœur brodé près du col. Le mannequin porte une taille XS.',
    details: 'Danser, c\'est prier avec le corps. Ce t-shirt oversize en coton biologique lourd affiche sa foi dans le mouvement : GOD IS A DANCER en lettres brossées noir et rouge dans le dos, logo LOVCICOV Paris et cœur brodé près du col. Le mannequin porte une taille XS.',
    image: 'powerlov-god-dancer-porte-face',
    gallery: ['powerlov-god-dancer-porte-dos', 'powerlov-god-dancer-packshot-face', 'powerlov-god-dancer-packshot-dos'],
    badge: 'UNISEX',
  },
  {
    id: 'powerlov-protected-aligned-unstoppable',
    shopifyHandle: 'powerlov-protected-aligned-unstoppable',
    name: 'PROTECTED. ALIGNED. UNSTOPPABLE.',
    collection: 'standard',
    subcategory: 'tshirt',
    description: 'Trois mots comme une armure invisible. Protégée. Alignée. Inarrêtable. Un mantra brodé fin sur la poitrine, le cœur LOVCICOV près du col — la pièce la plus discrète de la ligne PowerLov, et peut-être la plus puissante. Le mannequin porte une taille XS.',
    details: 'Trois mots comme une armure invisible. Protégée. Alignée. Inarrêtable. Un mantra brodé fin sur la poitrine, le cœur LOVCICOV près du col — la pièce la plus discrète de la ligne PowerLov, et peut-être la plus puissante. Le mannequin porte une taille XS.',
    image: 'powerlov-protected-porte-face',
    gallery: ['powerlov-protected-packshot-face-v2', 'powerlov-protected-packshot-dos-v2'],
    badge: 'UNISEX',
  },
  {
    id: 'powerlov-sacred-heart-sweat',
    shopifyHandle: 'powerlov-sacred-heart-sweat',
    name: 'THE STANDARD IS ME',
    collection: 'standard',
    subcategory: 'hoodie',
    description: 'Sweat à capuche coton molletonné écru. Sérigraphie « LOVCICOV PARIS » en façade, cercle d\'étoiles « THE STANDARD IS ME » au dos. Coupe oversize. Unisex.',
    details: 'La signature comme évidence. Une pièce d\'allure, portée comme une déclaration.',
    image: 'powerlov-standard-porte-face',
    gallery: [
      'powerlov-standard-porte-dos',
      
      'powerlov-standard-packshot-face',
      'powerlov-standard-packshot-dos',
    ],
    badge: 'UNISEX',
  },
  {
    id: 'powerlov-iconic-by-nature',
    shopifyHandle: 'iconic-by-nature',
    name: 'ICONIC BY NATURE',
    collection: 'standard',
    subcategory: 'crewneck',
    description: 'Sweat écru en coton molletonné, patch cœur rouge brodé sur la poitrine gauche et logo LOVCICOV PARIS sous l\'encolure au dos. Coupe oversize unisexe.',
    details: 'Iconique par nature. Le cœur brodé comme signature, porté sans effort.',
    image: 'powerlov-iconic-cream-portrait-v2',
    gallery: ['powerlov-iconic-cream-packshot-front-v3', 'powerlov-iconic-cream-back-lovcicov'],
    badge: 'UNISEX',
  },
  {
    id: 'powerlov-energy-never-lies-hoodie',
    shopifyHandle: 'powerlov-energy-never-lies-hoodie',
    name: 'PERFECTLY IMPERFECT',
    collection: 'standard',
    subcategory: 'hoodie',
    description: 'Sweat à capuche coton molletonné. Sérigraphie « ENERGY NEVER LIES ». Unisex.',
    details: 'Ce que l\'on dégage ne ment jamais.',
    image: 'powerlov-perfectly-porte-face',
    gallery: ['powerlov-perfectly-porte-dos', 'powerlov-perfectly-packshot-face', 'powerlov-perfectly-packshot-dos'],
    badge: 'UNISEX',
  },
  {
    id: 'powerlov-less-drama-champagne',
    shopifyHandle: 'powerlov-less-drama-champagne',
    name: 'LESS DRAMA. MORE CHAMPAGNE.',
    collection: 'standard',
    subcategory: 'tshirt',
    description: 'Coton lourd 280g, coupe oversize. Sérigraphie « LESS DRAMA. MORE CHAMPAGNE. » au dos. Unisex.',
    details: 'Moins de bruit, plus de bulles. Le manifeste léger d\'une élégance qui refuse le drame.',
    image: 'powerlov-less-drama-porte-dos',
    gallery: [
      'powerlov-less-drama-packshot-dos',
      'powerlov-less-drama-packshot-face',
      

    ],
    badge: 'UNISEX',
  },
  {
    id: 'powerlov-lovcicov-2029-bird',
    shopifyHandle: 'powerlov-lovcicov-2029-bird',
    name: 'MY OWN MUSE.',
    collection: 'standard',
    subcategory: 'crewneck',
    description: 'Sweat crewneck coton molletonné écru. Sérigraphie emblème colombe « LOVCICOV 2029 PARIS » au dos. Coupe oversize. Unisex.',
    details: 'La colombe comme signature. Une pièce d\'archive, portée comme un manifeste.',
    image: 'powerlov-my-own-muse-porte-face',
    gallery: ['powerlov-my-own-muse-porte-dos', 'powerlov-my-own-muse-packshot-face', 'powerlov-my-own-muse-packshot-dos'],
    badge: 'UNISEX',
  },
  {
    id: 'powerlov-mom-boss-crisis-manager',
    shopifyHandle: 'powerlov-mom-boss-crisis-manager',
    name: 'HEART ICON.',
    collection: 'standard',
    subcategory: 'tshirt',
    description: 'Coton lourd 280g, coupe oversize. Sérigraphie « LOVCICOV. CRISIS MANAGER. » au dos. Unisex.',
    details: 'Une déclaration d\'admiration pour celles qui tiennent tout, sans jamais rien lâcher.',
    image: 'powerlov-heart-icon-porte-face-v2',
    gallery: ['powerlov-heart-icon-porte-dos-v3', 'powerlov-heart-icon-packshot-face', 'powerlov-heart-icon-packshot-dos'],
    badge: 'UNISEX',
  },
  {
    id: 'powerlov-lovcicov-2019-hoodie',
    shopifyHandle: 'powerlov-lovcicov-2019-hoodie',
    name: 'HEART SIGNATURE.',
    collection: 'standard',
    subcategory: 'tshirt',
    description: 'Sweat à capuche coton molletonné gris chiné. Sérigraphie emblème colombe rouge « LOVCICOV 2019 PARIS » au dos. Coupe oversize. Unisex.',
    details: 'La colombe comme signature. Une pièce d\'archive, portée comme un symbole.',
    image: 'powerlov-heart-signature-porte-face-v2',
    gallery: ['powerlov-heart-signature-packshot-face', 'powerlov-heart-signature-packshot-dos'],
    badge: 'UNISEX',
  },
  {
    id: 'powerlov-lovcicov-2019-bird',
    shopifyHandle: 'powerlov-lovcicov-2019-bird',
    name: 'HOLY DOVE.',
    collection: 'standard',
    subcategory: 'crewneck',
    description: 'Sweat crewneck coton molletonné écru. Sérigraphie colombe auréolée « LOVCICOV 2019 PARIS ». Coupe oversize. Unisex.',
    details: 'La colombe sacrée. Une pièce d\'archive, portée comme un symbole.',
    image: 'powerlov-holy-dove-porte-face',
    gallery: ['powerlov-holy-dove-packshot-face', 'powerlov-holy-dove-packshot-dos'],
    badge: 'UNISEX',
  },
];




// Kimonos MysticLov — pièces uniques en soie d'anciens saris indiens
const KIMONO_BASE_DESCRIPTION =
  "Chaque kimono LOVCICOV est taillé dans la soie d'anciens saris indiens, choisie pour la beauté de ses teintes, puis rebrodée de perles cousues à la main. Aucune pièce n'est identique : celle-ci n'existe qu'en un seul exemplaire.\nTaille unique, coupe ample aux épaules tombantes — il se porte ouvert, comme une seconde peau de lumière.";

const makeKimono = (slug: string, name: string, colorLine: string): RawProduct => ({
  id: `mystic-kimono-${slug}`,
  shopifyHandle: `mystic-kimono-${slug}`,
  name,
  collection: 'mystic',
  subcategory: 'kimono',
  description: `${name} — kimono en soie ${colorLine}.\n${KIMONO_BASE_DESCRIPTION}`,
  details: 'Pièce unique — un seul exemplaire.',
  image: `mysticlov-kimono-${slug}-porte`,
  gallery: [`mysticlov-kimono-${slug}-packshot`],
  badge: 'PIÈCE UNIQUE',
});

const rawKimonoProducts: RawProduct[] = [
  makeKimono('tara', 'Tara', 'bleu ciel tie-dye, brodée de perles turquoise'),
  makeKimono('veda', 'Veda', 'gris perle chiné, brodée de perles turquoise'),
  makeKimono('devi', 'Devi', 'bleu roi profond, brodée de perles argentées'),
  makeKimono('maya', 'Maya', 'noir et beige tie-dye, brodée de perles nacrées'),
  makeKimono('aditi', 'Aditi', 'vert sauge tie-dye, brodée de perles turquoise'),
  makeKimono('leela', 'Leela', 'bleu marine et rose tie-dye, brodée de perles nacrées'),
  makeKimono('meera', 'Meera', 'vert canard et bordeaux à motifs floraux, brodée de perles dorées'),
  { ...makeKimono('kiran', 'Kiran', 'fuchsia profond, brodée de perles dorées'), image: 'mysticlov-kimono-kiran-porte-v4' },
  { ...makeKimono('shakti', 'Shakti', 'rouge à motifs, rehaussée de rayures tie-dye vertes et de perles dorées'), gallery: ['mysticlov-kimono-shakti-packshot-v2'] },
  { ...makeKimono('padma', 'Padma', 'magenta tie-dye, brodée de perles et de fils dorés'), image: 'mysticlov-kimono-padma-porte-v2' },
];

// Collection "MysticLov" — produits du site mysticlov.com
const rawMysticProducts: RawProduct[] = [
  {
    id: 'mystic-tshirt-noir',
    shopifyHandle: 't-shirt-maria',
    shopifyColor: 'Noir',
    name: 'T-Shirt Maria',
    collection: 'mystic',
    subcategory: 'tshirt',
    description: 'LOVE, le mot-mantra. Symbole universel qui ouvre le cœur et appelle à la vibration la plus haute. Georgiana l\'a choisi parce que tout part de là : aimer ce que l\'on porte, ce que l\'on est, ce que l\'on dégage. Broderie dorée · Coton premium.',
    details: 'L\'énergie : ancrage, ouverture, douceur affirmée. Une pièce qui rappelle au monde, et à soi, que l\'amour est la fréquence première.',
    image: 'mysticlov-tshirt-love-noir-porte-face',
    gallery: [
      'mystic-tshirt-love-noir-lifestyle-man',
      'mystic-tshirt-love-noir-flat-front',
      'mystic-tshirt-love-detail-2',
      'mystic-tshirt-love-detail-3',
    ],
    colors: [
      { name: 'Noir', id: 'mystic-tshirt-noir' },
      { name: 'Natural Raw', id: 'mystic-tshirt-natural' },
      { name: 'Green Bottle', id: 'mystic-tshirt-green' },
      { name: 'Rose', id: 'mystic-tshirt-rose' },
    ],
  },
  {
    id: 'mystic-tshirt-natural',
    shopifyHandle: 't-shirt-maria',
    shopifyColor: 'Natural Raw',
    name: 'T-Shirt Maria',
    collection: 'mystic',
    subcategory: 'tshirt',
    description: 'LOVE, le mot-mantra brodé or sur coton brut. Georgiana a choisi le naturel pour rappeler que l\'amour est matière, peau, lumière. Broderie dorée · Coton premium.',
    details: 'L\'énergie : pureté, vérité, racine. Une pièce qui célèbre l\'amour à l\'état brut.',
    image: 'mystic-tshirt-love-natural-man-street-v3',
    gallery: [
      'mystic-tshirt-love-natural-woman-street-v2',
      'mystic-tshirt-love-natural-flat',
      'mystic-tshirt-love-natural-detail-1',
      'mystic-tshirt-love-natural-detail-2',
    ],
    colors: [
      { name: 'Noir', id: 'mystic-tshirt-noir' },
      { name: 'Natural Raw', id: 'mystic-tshirt-natural' },
      { name: 'Green Bottle', id: 'mystic-tshirt-green' },
      { name: 'Rose', id: 'mystic-tshirt-rose' },
    ],
  },
  {
    id: 'mystic-tshirt-green',
    shopifyHandle: 't-shirt-maria',
    shopifyColor: 'Green Bottle',
    name: 'T-Shirt Maria',
    collection: 'mystic',
    subcategory: 'tshirt',
    description: 'LOVE en or sur vert bouteille, couleur du chakra du cœur. Georgiana a choisi ce vert profond comme symbole de guérison et d\'abondance émotionnelle. Broderie dorée · Coton premium.',
    details: 'L\'énergie : soin de soi, équilibre, renouveau. Une pièce qui aligne le cœur et apaise.',
    image: 'mystic-tshirt-love-green-woman-street',
    gallery: [
      'mystic-tshirt-love-green-man-street-v2',
      'mystic-tshirt-love-green-flat',
      'mystic-tshirt-love-green-detail-1',
      'mystic-tshirt-love-green-detail-2',
    ],
    colors: [
      { name: 'Noir', id: 'mystic-tshirt-noir' },
      { name: 'Natural Raw', id: 'mystic-tshirt-natural' },
      { name: 'Green Bottle', id: 'mystic-tshirt-green' },
      { name: 'Rose', id: 'mystic-tshirt-rose' },
    ],
  },
  {
    id: 'mystic-tshirt-rose',
    shopifyHandle: 't-shirt-maria',
    shopifyColor: 'Rose',
    name: 'T-Shirt Maria',
    collection: 'mystic',
    subcategory: 'tshirt',
    description: 'LOVE brodé or sur rose, la teinte de la tendresse sacrée et du quartz rose. Georgiana a choisi cette couleur pour son pouvoir doux : aimer sans condition, à commencer par soi. Broderie dorée · Coton premium.',
    details: 'L\'énergie : compassion, féminité universelle, paix intérieure.',
    image: 'mystic-tshirt-love-rose-woman-street',
    gallery: [
      'mystic-tshirt-love-rose-man-street-v2',
      'mystic-tshirt-love-rose-flat',
      'mystic-tshirt-love-rose-detail-1',
      'mystic-tshirt-love-rose-detail-2',
    ],
    colors: [
      { name: 'Noir', id: 'mystic-tshirt-noir' },
      { name: 'Natural Raw', id: 'mystic-tshirt-natural' },
      { name: 'Green Bottle', id: 'mystic-tshirt-green' },
      { name: 'Rose', id: 'mystic-tshirt-rose' },
    ],
  },
  {
    id: 'mystic-hoodie-noir',
    shopifyHandle: 'burning-heart',
    shopifyColor: 'Noir',
    name: 'Hoodie Burning Heart',
    collection: 'mystic',
    subcategory: 'hoodie',
    description: 'Hoodie LOVE noir avec broderie or et icône Vierge Marie au dos. La Vierge Marie incarne la protection, la grâce et la guidance maternelle universelle. Georgiana l\'a choisie comme figure-talisman : douce mais inébranlable. Broderie dorée · Coton premium.',
    details: 'L\'énergie : protection, ancrage, foi tranquille. Une armure douce pour traverser le monde.',
    image: 'mystic-hoodie-love-noir-woman-street',
    gallery: [
      'mystic-hoodie-love-noir-man-street',
      'mystic-hoodie-love-noir-flat-front',
      'mystic-hoodie-love-noir-flat-back',
      'mystic-hoodie-love-detail-1',
      'mystic-hoodie-love-detail-4',
    ],
    colors: [
      { name: 'Noir', id: 'mystic-hoodie-noir' },
      { name: 'Natural Raw', id: 'mystic-hoodie-natural' },
    ],
  },
  {
    id: 'mystic-hoodie-natural',
    shopifyHandle: 'burning-heart',
    shopifyColor: 'Natural Raw',
    name: 'Hoodie Burning Heart',
    collection: 'mystic',
    subcategory: 'hoodie',
    description: 'Hoodie LOVE natural raw avec broderie or et Vierge Marie au dos. La Vierge incarne la guidance et la protection. Georgiana l\'a posée sur coton brut pour rappeler que le sacré vit aussi dans la matière la plus simple. Broderie dorée · Coton premium.',
    details: 'L\'énergie : douceur protectrice, lumière intérieure, présence calme.',
    image: 'mystic-hoodie-love-natural-woman-street-v2',
    gallery: [
      'mystic-hoodie-love-natural-man-street',
      'mystic-hoodie-love-natural-flat',
      'mystic-hoodie-love-natural-back-red',
      'mystic-hoodie-love-natural-detail-red-embroidery',
      'mystic-hoodie-love-natural-detail-5',
    ],
    colors: [
      { name: 'Noir', id: 'mystic-hoodie-noir' },
      { name: 'Natural Raw', id: 'mystic-hoodie-natural' },
    ],
  },
  {
    id: 'mystic-crewneck-noir',
    shopifyHandle: 'sweat-maria',
    shopifyColor: 'Noir',
    name: 'Crewneck Maria',
    collection: 'mystic',
    subcategory: 'crewneck',
    description: 'Crewneck LOVE noir, mantra brodé or, symbole universel d\'ouverture du cœur. Georgiana a choisi le crewneck pour sa simplicité monastique : un vêtement quotidien transformé en talisman. Broderie dorée · Coton premium.',
    details: 'L\'énergie : conscience douce, rituel discret, amour porté au quotidien.',
    image: 'mystic-crewneck-love-noir-woman-street',
    gallery: [
      'mystic-crewneck-love-noir-man-street',
      'mystic-crewneck-love-noir-flat',
      'mystic-crewneck-love-detail-1',
    ],
    colors: [
      { name: 'Noir', id: 'mystic-crewneck-noir' },
    ],
  },
  {
    specs: MOLLETON_SPECS,
    id: 'mystic-crewneck-sacred-heart',
    shopifyHandle: 'mystic-crewneck-sacred-heart',
    name: 'SACRED HEART',
    collection: 'mystic',
    subcategory: 'crewneck',
    description: 'Crewneck bleu délavé, cœur sacré brodé rouge et or sur la poitrine, petit cœur signature au col et LOVCICOV en lettres gothiques rouges au dos. Le cœur sacré, entouré de sa couronne et de sa flamme, dit l\'amour qui tient debout. Broderie rouge et or · Coton premium délavé.',
    details: 'L\'énergie : courage du cœur, loyauté, feu intérieur.',
    image: 'mysticlov-sacred-crewneck-porte-face',
    gallery: [
      'mysticlov-sacred-crewneck-porte-dos',
      'mysticlov-sacred-crewneck-packshot-face',
      'mysticlov-sacred-crewneck-packshot-dos',
    ],
  },
  {
    specs: MOLLETON_SPECS,
    id: 'mystic-hoodie-sacred-heart',
    shopifyHandle: 'mystic-hoodie-sacred-heart',
    name: 'THE SUN CARD',
    collection: 'mystic',
    subcategory: 'hoodie',
    description: 'Hoodie anthracite délavé, LOVCICOV gothique ton sur ton surmontant un cœur sacré rouge brodé sur la poitrine. Sur la capuche, des écussons brodés — carte de tarot du soleil, cristaux, cœur. Dos sobre, ponctué d\'un petit cœur rouge sous la capuche. Broderie rouge et or · Coton premium délavé.',
    details: 'L\'énergie : protection joyeuse, intuition, feu intérieur.',
    image: 'mysticlov-sacred-hoodie-porte-face-v2',
    gallery: [
      
      'mysticlov-sacred-hoodie-porte-profil',
      'mysticlov-sacred-hoodie-packshot-face',
      'mysticlov-sacred-hoodie-packshot-dos',
    ],
  },
  ...rawKimonoProducts,
];


// Collection "StoneLov" — colliers en pierres naturelles
// Photos classifiées : solo (produit), fleurs (lifestyle), tarot (ambiance)
const rawBijouxProducts: RawProduct[] = [
  {
    id: 'collier-fuchsia-or',
    shopifyHandle: 'collier-fuchsia-or',
    name: 'Collier Fuchsia & Or',
    collection: 'bijoux',
    description: 'Perles œil de tigre rose, sphères dorées martelées.',
    details: 'Présence et caractère. Un collier qui impose sa couleur sans compromis.',
    image: 'stonelov-card-collier-fuchsia-or',
    gallery: ['bijoux-fuchsia-fleurs', 'bijoux-fuchsia-tarot'],
    stoneMeaning: 'Œil de tigre rose — Pierre de confiance en soi et de courage. Elle renforce la détermination et aide à surmonter les doutes intérieurs.',
  },
  {
    id: 'bracelet-sodalite',
    shopifyHandle: 'bracelet-sodalite',
    name: 'Bracelet Sodalite Bleue',
    collection: 'bijoux',
    description: 'Triple rang sodalite et aventurine bleue, fermoir nacre serti d\'or. Poids : environ 30g.',
    details: 'Calme marin. Trois rangs de bleus profonds qui évoquent l\'eau et la clarté de l\'esprit.',
    image: 'stonelov-card-bracelet-sodalite',
    gallery: ['stonelov-br-sodalite', 'bracelet-sodalite-tarot'],
    stoneMeaning: 'Sodalite — Pierre de communication et de logique, elle apaise l\'esprit et favorise la clarté mentale. Aventurine bleue — Pierre d\'équilibre émotionnel et de sérénité.',
  },
  {
    id: 'collier-jade-nacre',
    shopifyHandle: 'collier-jade-nacre',
    name: 'Collier Jade & Nacre',
    collection: 'bijoux',
    description: 'Perles de jade vert facetté, intercalaires dorés, pendentif nacre.',
    details: 'Élégance intemporelle. Le jade profond sublimé par la lumière de la nacre.',
    image: 'stonelov-collier-jade-nacre-model-v4',
    gallery: ['bijoux-jade-pendentif', 'bijoux-jade-tarot'],
    stoneMeaning: 'Jade vert — Pierre de sérénité et de sagesse, elle favorise l\'harmonie et la paix intérieure. Nacre — Symbole de douceur et de féminité, elle protège et apaise les émotions.',
  },
  {
    id: 'collier-corail-rouge-or',
    shopifyHandle: 'collier-corail-rouge-or',
    name: 'Collier Corail Rouge & Or',
    collection: 'bijoux',
    description: 'Triple rang de corail rouge, intercalaires dorés, maillon martelé en pendentif.',
    details: 'Vitalité et lumière. Trois rangs de corail rouge ponctués d\'or pour une présence solaire.',
    image: 'stonelov-collier-corail-rouge-or-model-v2',
    gallery: ['stonelov-corail-rouge-or', 'collier-corail-rouge-or-livre'],
    stoneMeaning: 'Corail rouge — Symbole de vitalité et d\'énergie, il stimule la force de vie, protège et donne du courage dans l\'action.',
  },
  {
    id: 'bracelet-agate-jaune',
    shopifyHandle: 'bracelet-agate-jaune',
    name: 'Bracelet Agate Jaune & Or',
    collection: 'bijoux',
    description: 'Triple rang agate jaune miel, intercalaires dorés. Poids : environ 30g.',
    details: 'Lumière solaire. Trois rangs d\'agate miel ponctués d\'or pour un éclat naturel au poignet.',
    image: 'stonelov-card-bracelet-agate-jaune',
    gallery: ['stonelov-br-agate-jaune', 'stonelov-br-agate-jaune-book'],
    stoneMeaning: 'Agate jaune — Pierre d\'équilibre et de stabilité, elle réchauffe l\'esprit, favorise la confiance et attire une énergie solaire et apaisante.',
  },
  {
    id: 'collier-labradorite-amethyste',
    shopifyHandle: 'collier-labradorite-amethyste',
    name: 'Collier Labradorite & Améthyste',
    collection: 'bijoux',
    description: 'Double rang labradorite et améthyste brute, détails dorés.',
    details: 'Force et intuition. Deux pierres aux reflets mystiques, liées par l\'or.',
    image: 'stonelov-collier-labradorite-amethyste-model-v3',
    gallery: ['bijoux-labradorite-solo', 'bijoux-labradorite-tarot'],
    stoneMeaning: 'Labradorite — Pierre de protection et d\'intuition. Elle absorbe les énergies négatives et éveille la clairvoyance. Améthyste — Pierre de sagesse et de sérénité, elle favorise la méditation et l\'élévation spirituelle.',
  },
  {
    id: 'collier-turquoise-or',
    shopifyHandle: 'collier-turquoise-or',
    name: 'Collier Turquoise & Or',
    collection: 'bijoux',
    description: 'Perles de turquoise, intercalaires dorés, fermoir doré.',
    details: 'Fraîcheur et lumière. La turquoise solaire ponctuée d\'or pour un éclat naturel.',
    image: 'stonelov-card-collier-turquoise-or',
    gallery: ['bijoux-turquoise-solo', 'bijoux-turquoise-tarot'],
    stoneMeaning: 'Turquoise — Pierre de communication et de protection. Considérée comme sacrée par de nombreuses civilisations, elle favorise l\'expression de soi et apporte chance et sérénité.',
  },
  {
    id: 'bracelet-malachite-triple',
    shopifyHandle: 'bracelet-malachite-triple',
    name: 'Bracelet Malachite Triple Rang',
    collection: 'bijoux',
    description: 'Triple rang malachite ronde, intercalaires dorés filigranés. Poids : environ 30g.',
    details: 'Profondeur minérale au poignet. Trois rangs vibrants où la malachite rencontre l\'or travaillé.',
    image: 'stonelov-card-bracelet-malachite-triple',
    gallery: ['stonelov-br-malachite-triple', 'stonelov-br-malachite-triple-book'],
    stoneMeaning: 'Malachite — Pierre de transformation et de protection, elle absorbe les énergies négatives et accompagne les périodes de changement profond.',
  },
  {
    id: 'collier-tourmaline-multicolore',
    shopifyHandle: 'collier-tourmaline-multicolore',
    name: 'Collier Tourmaline Multicolore',
    collection: 'bijoux',
    description: 'Sautoir d\'éclats de tourmaline multicolore, perles dorées martelées et gouttes dorées en pampille.',
    details: 'Lariat solaire. Une cascade d\'éclats colorés ponctuée d\'or, à nouer ou à laisser tomber.',
    image: 'stonelov-card-collier-tourmaline-multicolore',
    gallery: ['collier-tourmaline-multicolore-detail', 'collier-tourmaline-multicolore-tarot'],
    stoneMeaning: 'Tourmaline multicolore — Pierre d\'équilibre et de protection, chaque nuance porte sa propre vibration : énergie, créativité, apaisement et harmonie.',
  },
  {
    id: 'collier-amethyste-lariat',
    shopifyHandle: 'collier-amethyste-lariat',
    name: 'Collier Améthyste Lariat',
    collection: 'bijoux',
    description: 'Collier lariat en perles d\'améthyste violette et chips d\'améthyste lavande, intercalaires dorés, perle dorée centrale et anneaux martelés en pendants.',
    details: 'Élégance fluide. Un lariat sculptural où l\'améthyste profonde danse avec l\'or pour une silhouette à la fois bohème et raffinée.',
    image: 'stonelov-card-collier-amethyste-lariat',
    gallery: ['collier-amethyste-lariat-flat', 'collier-amethyste-lariat-tarot'],
    stoneMeaning: 'Améthyste — Pierre de sagesse et de sérénité, elle favorise la méditation, l\'élévation spirituelle et l\'équilibre intérieur. Elle apaise l\'esprit et éveille l\'intuition.',
  },
  {
    id: 'bracelet-prehnite-perles',
    shopifyHandle: 'bracelet-prehnite-perles',
    name: 'Bracelet Préhnite & Perles',
    collection: 'bijoux',
    description: 'Triple rang préhnite brute, perles d\'eau douce, fermoir doré. Poids : environ 30g.',
    details: 'Douceur végétale. La préhnite brute sublimée par la lumière des perles d\'eau douce.',
    image: 'stonelov-br-prehnite-perles-model',
    gallery: ['stonelov-br-prehnite-perles', 'stonelov-br-prehnite-perles-book'],
    stoneMeaning: 'Préhnite — Pierre de guérison et de renouveau, elle apaise l\'esprit et renforce la connexion à la nature. Perle d\'eau douce — Symbole de pureté et de douceur, elle apaise les émotions.',
  },
  {
    id: 'collier-quartz-aventurine',
    shopifyHandle: 'collier-quartz-aventurine',
    name: 'Collier Quartz Rose & Aventurine',
    collection: 'bijoux',
    description: 'Double rang quartz rose et éclats d\'aventurine, détails dorés.',
    details: 'Douceur brute. Deux pierres, deux énergies, une seule intention.',
    image: 'stonelov-collier-quartz-aventurine-model-v2',
    gallery: ['bijoux-quartz-solo', 'bijoux-quartz-tarot'],
    stoneMeaning: 'Quartz rose — Pierre de l\'amour inconditionnel et de la paix intérieure. Aventurine — Pierre de chance et de prospérité, elle apaise le cœur et attire l\'abondance.',
  },
  {
    id: 'collier-malachite-corail',
    shopifyHandle: 'collier-malachite-corail',
    name: 'Collier Malachite & Corail',
    collection: 'bijoux',
    description: 'Perles de malachite, perles baroques, grappe de corail rouge.',
    details: 'Intensité et contraste. La malachite profonde rencontre l\'éclat du corail.',
    image: 'stonelov-collier-malachite-corail-model-v3',
    gallery: ['bijoux-malachite-solo', 'bijoux-malachite-tarot'],
    stoneMeaning: 'Malachite — Pierre de transformation, elle accompagne les périodes de changement et protège des influences extérieures. Corail rouge — Symbole de vitalité et d\'énergie, il stimule la force de vie et le courage.',
  },
  {
    id: 'bracelet-turquoise-corail',
    shopifyHandle: 'bracelet-turquoise-corail',
    name: 'Bracelet Turquoise & Corail Rouge',
    collection: 'bijoux',
    description: 'Triple rang turquoise, corail rouge, perles d\'eau douce, fermoir doré. Poids : environ 30g.',
    details: 'Contraste solaire. La turquoise vibrante rencontre l\'éclat du corail rouge.',
    image: 'stonelov-card-bracelet-turquoise-corail',
    gallery: ['bracelet-turquoise-corail-original', 'bracelet-turquoise-corail-tarot'],
    stoneMeaning: 'Turquoise — Pierre de protection et de communication, elle favorise l\'expression de soi et apporte sérénité. Corail rouge — Symbole de vitalité, il stimule l\'énergie et la passion.',
  },
  {
    id: 'collier-amethyste-or',
    shopifyHandle: 'collier-amethyste-or',
    name: 'Collier Améthyste & Or',
    collection: 'bijoux',
    description: 'Éclats d\'améthyste violette, intercalaires dorés et pendentif sculptural doré serti de perles violettes.',
    details: 'Violet profond et métal doré. Une pièce signature qui mêle matière brute et lumière chaude.',
    image: 'stonelov-collier-amethyste-or-model-v2',
    gallery: ['collier-amethyste-or-detail', 'collier-amethyste-or-tarot'],
    stoneMeaning: 'Améthyste — Pierre de sérénité et d\'intuition, elle apaise l\'esprit, favorise l\'équilibre intérieur et accompagne la clarté mentale.',
  },
  {
    id: 'bracelet-howlite-amazonite',
    shopifyHandle: 'bracelet-howlite-amazonite',
    name: 'Bracelet Howlite & Amazonite',
    collection: 'bijoux',
    description: 'Triple rang howlite blanche, amazonite et jaspe, fermoir serti d\'amazonite. Poids : environ 30g.',
    details: 'Sérénité minérale. Le blanc apaisant de la howlite ponctué de turquoises naturelles.',
    image: 'stonelov-card-bracelet-howlite-amazonite',
    gallery: ['stonelov-br-howlite-amazonite', 'bracelet-howlite-amazonite-tarot'],
    stoneMeaning: 'Howlite — Pierre d\'apaisement et de patience, elle calme l\'esprit et favorise le lâcher-prise. Amazonite — Pierre d\'harmonie et de communication, elle équilibre les émotions.',
  },
  {
    id: 'collier-quartz-croix-jade',
    shopifyHandle: 'collier-quartz-croix-jade',
    name: 'Collier Quartz Rose & Croix de Jade',
    collection: 'bijoux',
    description: 'Perles de quartz rose, croix de jade vert, pendentif.',
    details: 'Symboles et douceur. Un collier entre spiritualité et élégance naturelle.',
    image: 'stonelov-card-collier-quartz-croix-jade',
    gallery: ['bijoux-quartz-croix-fleurs', 'bijoux-croix-tarot'],
    stoneMeaning: 'Quartz rose — Pierre de l\'amour et de la tendresse, elle ouvre le chakra du cœur. Jade — Pierre d\'harmonie et d\'équilibre, symbole de pureté et de longévité dans de nombreuses cultures.',
  },
  {
    id: 'collier-aigue-marine-agate',
    shopifyHandle: 'collier-aigue-marine-agate',
    name: 'Collier Aigue-Marine & Agate Bleue',
    collection: 'bijoux',
    description: 'Double rang aigue-marine brute et agate bleue, intercalaires dorés.',
    details: 'Fraîcheur marine. Deux rangs qui évoquent l\'eau, le calme et la clarté.',
    image: 'stonelov-collier-aigue-marine-agate-model-v2',
    gallery: ['stonelov-aigue-marine-agate-2', 'stonelov-aigue-marine-agate-book'],
    stoneMeaning: 'Aigue-marine — Pierre de calme et de communication, elle apaise les émotions et clarifie l\'esprit. Agate bleue — Pierre d\'équilibre et de sérénité, elle favorise la confiance et la prise de parole.',
  },
  {
    id: 'bracelet-oeil-tigre-fuchsia',
    shopifyHandle: 'bracelet-oeil-tigre-fuchsia',
    name: 'Bracelet Œil de Tigre Fuchsia',
    collection: 'bijoux',
    description: 'Double rang œil de tigre fuchsia, éclats multicolores, sphères dorées striées. Poids : environ 30g.',
    details: 'Caractère et éclat au poignet. Deux rangs vibrants pour une couleur qui s\'affirme sans détour.',
    image: 'stonelov-bracelet-oeil-tigre-fuchsia-model-v2',
    gallery: ['stonelov-br-oeil-tigre-fuchsia', 'bracelet-oeil-tigre-fuchsia-tarot'],
    stoneMeaning: 'Œil de tigre rose — Pierre de confiance en soi et de courage. Elle renforce la détermination et aide à surmonter les doutes intérieurs.',
  },
  {
    id: 'collier-corail-multicolor',
    shopifyHandle: 'collier-corail-multicolor',
    name: 'Collier Corail & Pierres Multicolores',
    collection: 'bijoux',
    description: 'Perles de corail rouge, éclats multicolores, pendentif doré.',
    details: 'Explosion de couleurs. Un collier vibrant qui célèbre la diversité des pierres.',
    image: 'stonelov-card-collier-corail-multicolor',
    gallery: ['bijoux-corail-multicolor', 'bijoux-corail-tarot'],
    stoneMeaning: 'Corail rouge — Pierre de vitalité, elle stimule l\'énergie et la passion. Les pierres multicolores apportent chacune leur vibration : équilibre, joie, protection et créativité.',
  },
  {
    id: 'collier-malachite-chips-double',
    shopifyHandle: 'collier-malachite-chips-double',
    name: 'Collier Malachite Chips Double',
    collection: 'bijoux',
    description: 'Double rang de chips de malachite, œil de tigre vert et perles filigranées dorées.',
    details: 'Vert profond. Deux rangs sculptés où la malachite brute dialogue avec l\'or travaillé.',
    image: 'stonelov-collier-malachite-chips-double-model-v2',
    gallery: ['stonelov-malachite-chips-double', 'stonelov-malachite-chips-double-book'],
    stoneMeaning: 'Malachite — Pierre de transformation et de protection, elle absorbe les énergies négatives et accompagne les périodes de changement profond.',
  },
  {
    id: 'bracelet-goldstone-perles',
    shopifyHandle: 'bracelet-goldstone-perles',
    name: 'Bracelet Goldstone & Perles',
    collection: 'bijoux',
    description: 'Triple rang goldstone, pierre de lune et perles d\'eau douce, détails dorés. Poids : environ 30g.',
    details: 'Éclat terrestre. La goldstone scintillante rencontre la lumière nacrée des perles.',
    image: 'stonelov-card-bracelet-goldstone-perles',
    gallery: ['stonelov-br-goldstone-perles', 'bracelet-goldstone-perles-tarot'],
    stoneMeaning: 'Goldstone — Pierre de vitalité et de motivation, elle renforce la confiance et attire l\'abondance. Pierre de lune — Pierre de l\'intuition féminine et de la douceur intérieure.',
  },
  {
    id: 'collier-prehnite-malachite',
    shopifyHandle: 'collier-prehnite-malachite',
    name: 'Collier Préhnite & Malachite',
    collection: 'bijoux',
    description: 'Triple rang préhnite et malachite, fermoir doré.',
    details: 'Fraîcheur minérale. Trois rangs de pierres brutes pour une présence végétale.',
    image: 'stonelov-collier-prehnite-malachite-model-v2',
    gallery: ['bijoux-prehnite-solo', 'bijoux-prehnite-tarot'],
    stoneMeaning: 'Préhnite — Pierre de guérison et de renouveau, elle apaise l\'esprit et renforce la connexion à la nature. Malachite — Pierre de transformation et de protection, elle absorbe les énergies négatives et favorise le changement profond.',
  },
  {
    id: 'collier-turquoise-croix-perles',
    shopifyHandle: 'collier-turquoise-croix-perles',
    name: 'Collier Turquoise & Croix Perlée',
    collection: 'bijoux',
    description: 'Collier en perles de turquoise tubulaires, perles d\'eau douce baroques, intercalaires dorés et pendentif croix sertie de turquoises et de perles.',
    details: 'Bleu solaire. La turquoise vibrante rencontre la lumière nacrée des perles, sublimée par une croix sculpturale dorée.',
    image: 'stonelov-card-collier-turquoise-croix-perles',
    gallery: ['collier-turquoise-croix-perles-flat', 'collier-turquoise-croix-perles-tarot'],
    stoneMeaning: 'Turquoise — Pierre de protection et de communication, elle favorise l\'expression de soi, apporte sérénité et apaise les émotions. Perles d\'eau douce — Symbole de pureté et de féminité, elles incarnent la douceur et l\'élégance intemporelle.',
  },
  {
    id: 'collier-oeil-tigre-fuchsia',
    shopifyHandle: 'collier-oeil-tigre-fuchsia',
    name: 'Collier Œil de Tigre Fuchsia',
    collection: 'bijoux',
    description: 'Double rang œil de tigre fuchsia, intercalaires dorés striés.',
    details: 'Caractère et éclat. Deux rangs vibrants pour une couleur qui s\'affirme sans détour.',
    image: 'stonelov-card-collier-oeil-tigre-fuchsia',
    gallery: ['stonelov-oeil-tigre-fuchsia', 'collier-oeil-tigre-fuchsia-tarot'],
    stoneMeaning: 'Œil de tigre rose — Pierre de confiance en soi et de courage. Elle renforce la détermination et aide à surmonter les doutes intérieurs.',
  },
  {
    id: 'bracelet-amethyste-quartz',
    shopifyHandle: 'bracelet-amethyste-quartz',
    name: 'Bracelet Améthyste & Quartz Rose',
    collection: 'bijoux',
    description: 'Triple rang améthyste, quartz rose, intercalaires dorés, pendentif améthyste facetté. Poids : environ 30g.',
    details: 'Sagesse et douceur. Deux pierres complices liées par l\'or, pour une énergie apaisante.',
    image: 'bracelet-amethyste-quartz-model',
    gallery: ['stonelov-br-amethyste-quartz', 'bracelet-amethyste-quartz-tarot'],
    stoneMeaning: 'Améthyste — Pierre de sagesse et de sérénité, elle favorise la méditation et l\'élévation spirituelle. Quartz rose — Pierre de l\'amour inconditionnel et de la paix intérieure.',
  },
  {
    id: 'collier-trio-citrine',
    shopifyHandle: 'collier-trio-citrine',
    name: 'Collier Trio Citrine & Améthyste',
    collection: 'bijoux',
    description: 'Triple rang citrine, malachite et améthyste, détails dorés.',
    details: 'Énergie solaire. Trois pierres vibrantes tissées en un seul collier lumineux.',
    image: 'stonelov-card-collier-trio-citrine',
    gallery: ['bijoux-trio-solo', 'bijoux-trio-tarot'],
    stoneMeaning: 'Citrine — Pierre de joie et d\'abondance, elle rayonne d\'énergie solaire et attire la réussite. Améthyste — Pierre de sagesse spirituelle. Malachite — Pierre de transformation et de renouveau.',
  },
  {
    id: 'collier-malachite-lapis-double-pendentif',
    shopifyHandle: 'collier-malachite-lapis-double-pendentif',
    name: 'Collier Malachite & Lapis Double Pendentif',
    collection: 'bijoux',
    description: 'Double rang malachite et lapis-lazuli, deux pendentifs gouttes sertis d\'or.',
    details: 'Pièce de signature. Deux rangs et deux gouttes de lapis pour une présence affirmée.',
    image: 'stonelov-card-collier-malachite-lapis-double-pendentif',
    gallery: ['stonelov-malachite-lapis-double-pendentif-orange', 'stonelov-malachite-lapis-double-pendentif-book'],
    stoneMeaning: 'Lapis-lazuli — Pierre de vérité, d\'intuition et d\'expression de soi. Malachite — Pierre de transformation, de protection et d\'ancrage profond.',
  },
  {
    id: 'collier-quartz-rose-amethyste',
    shopifyHandle: 'collier-quartz-rose-amethyste',
    name: 'Collier Quartz Rose & Améthyste',
    collection: 'bijoux',
    description: 'Perles de quartz rose, perles d\'eau douce, intercalaires dorés et pendentif sculptural en grappe d\'améthyste violette.',
    details: 'Rose tendre et violet profond. Un ras-de-cou romantique sublimé par une grappe d\'améthyste rehaussée d\'or.',
    image: 'stonelov-collier-quartz-rose-amethyste-model-v2',
    gallery: ['collier-quartz-rose-amethyste-flat', 'collier-quartz-rose-amethyste-tarot'],
    stoneMeaning: 'Quartz rose — Pierre de l\'amour et de la douceur, elle apaise le cœur et invite à la tendresse. Améthyste — Pierre de sérénité et d\'intuition, elle favorise l\'équilibre intérieur et la clarté mentale.',
  },
];

// ─────────────────────────────────────────────────────────────
// Collection "Sacs tressés" — Big LOV & Small LOV
// Source de vérité unique : toute la page /sacs et les 12 fiches
// /sacs/:slug sont générées à partir de BAGS ci-dessous.
// Convention d'image : /images/sacs/{RÉFÉRENCE}_{n}.jpg
// `images` est un TABLEAU : ajouter _02, _03… suffit à activer
// les vignettes et la navigation de galerie, sans refonte.
// ─────────────────────────────────────────────────────────────
export interface BagSpec {
  ref: string;              // Référence fournisseur (LOV-BIG-01…)
  slug: string;             // URL : /sacs/{slug}
  name: string;             // Nom produit affiché
  silhouette: 'big' | 'sml';
  motif: 'Tricolore' | 'Bicolore' | 'Aztèque';
  colorName: string;        // Coloris affiché (pastille + libellé)
  swatch: string;           // Couleur de la pastille de sélection
  body: string;             // Corps du sac
  trim: string;             // Bordures & anses
  description: string;      // Description courte (SEO + fiche)
  images: string[];         // Visuels, le premier est le principal
}

// Caractéristiques communes à chaque silhouette (prix, dimensions)
export const BAG_SILHOUETTES = {
  big: { label: 'Big LOV', dimensions: '35 × 24 × 15 cm', handles: '25 cm' },
  sml: { label: 'Small LOV', dimensions: '29 × 16 × 13 cm', handles: '25 cm' },
} as const;

// Textes communs aux 12 fiches
export const BAG_DETAILS: string[] = [
  'Cuir de buffle tressé à la main, technique intrecciato',
  'Fabriqué à la main en Inde',
  'Ouverture en V, signature de la collection',
  'Anses tressées, longueur 25 cm',
  'Bandoulière amovible incluse',
  'Poche intérieure zippée',
  "Bordures tressées sur tout le pourtour de l'ouverture",
  'Charm cœur en cuir gravé LOVCICOV PARIS',
];

export const BAG_CARE =
  "Cuir de buffle tressé à la main. Chaque pièce est unique : les nuances et le grain du cuir peuvent varier légèrement d'un sac à l'autre. Ranger à l'abri de la lumière directe dans son dustbag. Nettoyer avec un chiffon doux et sec. Éviter l'exposition prolongée à l'humidité.";

export const BAG_DIMENSIONS_NOTE =
  'Dimensions données à titre indicatif, tolérance ± 1 cm — chaque sac étant tressé à la main.';

export const BAGS: BagSpec[] = [
  // ── BIG LOV — 35 × 24 × 15 cm — 260 € ──
  {
    ref: 'LOV-BIG-01', slug: 'big-lov-tricolore-rouge', name: 'Big LOV Tricolore Rouge',
    silhouette: 'big', motif: 'Tricolore', colorName: 'Rouge', swatch: '#A02828',
    body: 'Rouge, rose clair, blanc', trim: 'Rose clair',
    description: "Trois fils de cuir de buffle, rouge, rose et blanc, tressés à la main en un damier vibrant. Le format généreux du Big LOV, la douceur d'une bordure rose clair.",
    images: ['/images/sacs/LOV-BIG-01_01.jpg', '/images/sacs/LOV-BIG-01_02.jpg', '/images/sacs/LOV-BIG-01_03.jpg'],
  },
  {
    ref: 'LOV-BIG-02', slug: 'big-lov-tricolore-marine', name: 'Big LOV Tricolore Marine',
    silhouette: 'big', motif: 'Tricolore', colorName: 'Marine', swatch: '#1E2A4A',
    body: 'Bleu marine, rose, blanc', trim: 'Bleu marine',
    description: "Le marine tempère, le rose réveille, le blanc éclaire. Un tressage graphique pour un sac qui se porte du bureau au week-end.",
    images: ['/images/sacs/LOV-BIG-02_01.jpg', '/images/sacs/LOV-BIG-02_02.jpg', '/images/sacs/LOV-BIG-02_03.jpg'],
  },
  {
    ref: 'LOV-BIG-03', slug: 'big-lov-bicolore-rose', name: 'Big LOV Bicolore Rose',
    silhouette: 'big', motif: 'Bicolore', colorName: 'Rose', swatch: '#E4506B',
    body: 'Rose vif', trim: 'Rose',
    description: "Le rose dans toutes ses nuances. Un camaïeu tout en retenue, où seule la bordure vient souligner la ligne du sac.",
    images: ['/images/sacs/LOV-BIG-03_01.jpg', '/images/sacs/LOV-BIG-03_02.jpg', '/images/sacs/LOV-BIG-03_03.jpg'],
  },

  {
    ref: 'LOV-BIG-04', slug: 'big-lov-bicolore-kaki', name: 'Big LOV Bicolore Kaki',
    silhouette: 'big', motif: 'Bicolore', colorName: 'Kaki', swatch: '#5A5A38',
    body: 'Kaki', trim: 'Rouge',
    description: "Un kaki profond réveillé d'un liseré rouge. L'accord le plus parisien de la collection.",
    images: ['/images/sacs/LOV-BIG-04_01.jpg', '/images/sacs/LOV-BIG-04_02.jpg', '/images/sacs/LOV-BIG-04_03.jpg'],
  },
  {
    ref: 'LOV-BIG-05', slug: 'big-lov-azteque-vert', name: 'Big LOV Aztèque Vert',
    silhouette: 'big', motif: 'Aztèque', colorName: 'Vert', swatch: '#2E6B45',
    body: 'Vert, blanc cassé', trim: 'Vert',
    description: "Le motif losangé, tressé fil à fil en vert et blanc cassé. Un travail d'artisan qui se lit de loin.",
    images: ['/images/sacs/LOV-BIG-05_01.jpg', '/images/sacs/LOV-BIG-05_02.jpg', '/images/sacs/LOV-BIG-05_03.jpg'],
  },
  {
    ref: 'LOV-BIG-06', slug: 'big-lov-azteque-noir', name: 'Big LOV Aztèque Noir',
    silhouette: 'big', motif: 'Aztèque', colorName: 'Noir', swatch: '#1A1A1A',
    body: 'Noir, blanc', trim: 'Noir',
    description: "Noir et blanc, le graphisme à l'état pur. Le sac qui va avec tout, sans jamais passer inaperçu.",
    images: ['/images/sacs/LOV-BIG-06_01.jpg', '/images/sacs/LOV-BIG-06_02.jpg', '/images/sacs/LOV-BIG-06_03.jpg'],
  },
  // ── SMALL LOV — 29 × 16 × 13 cm — 180 € ──
  {
    ref: 'LOV-SML-01', slug: 'small-lov-tricolore-or', name: 'Small LOV Tricolore Or',
    silhouette: 'sml', motif: 'Tricolore', colorName: 'Or', swatch: '#C9A227',
    body: 'Or, blanc cassé, doré', trim: 'Doré',
    description: "Or, blanc cassé et doré. Un format compact qui contient l'essentiel, un tressage qui attire la lumière.",
    images: ['/images/sacs/LOV-SML-01_01.jpg', '/images/sacs/LOV-SML-01_02.jpg', '/images/sacs/LOV-SML-01_03.jpg'],
  },
  {
    ref: 'LOV-SML-02', slug: 'small-lov-tricolore-kaki', name: 'Small LOV Tricolore Rose',
    silhouette: 'sml', motif: 'Tricolore', colorName: 'Rose', swatch: '#E0568A',
    body: 'Rose, bordeaux, argenté', trim: 'Argenté',
    description: "Rose, bordeaux et argent : un contraste inattendu, souligné d'une bordure argentée.",
    images: ['/images/sacs/LOV-SML-02_01.jpg', '/images/sacs/LOV-SML-02_02.jpg', '/images/sacs/LOV-SML-02_03.jpg'],
  },

  {
    ref: 'LOV-SML-03', slug: 'small-lov-bicolore-argent', name: 'Small LOV Bicolore Argent',
    silhouette: 'sml', motif: 'Bicolore', colorName: 'Argent', swatch: '#C0C0C0',
    body: 'Argenté', trim: 'Argenté',
    description: "Argent sur argent. Le petit sac du soir, tressé main comme les autres.",
    images: ['/images/sacs/LOV-SML-03_01.jpg', '/images/sacs/LOV-SML-03_02.jpg', '/images/sacs/LOV-SML-03_03.jpg'],
  },
  {
    ref: 'LOV-SML-04', slug: 'small-lov-bicolore-bleu', name: 'Small LOV Bicolore Bleu',
    silhouette: 'sml', motif: 'Bicolore', colorName: 'Bleu', swatch: '#2E5A6B',
    body: 'Bleu canard', trim: 'Corail',
    description: "Un bleu canard profond réveillé d'une bordure corail. La fraîcheur en format nomade.",

    images: ['/images/sacs/LOV-SML-04_01.jpg', '/images/sacs/LOV-SML-04_02.jpg', '/images/sacs/LOV-SML-04_03.jpg'],
  },
  {
    ref: 'LOV-SML-05', slug: 'small-lov-azteque-rouge', name: 'Small LOV Aztèque Rouge',
    silhouette: 'sml', motif: 'Aztèque', colorName: 'Rouge', swatch: '#A02828',
    body: 'Rouge, vert', trim: 'Rouge',
    description: "Rouge et vert en motif losangé. Le Small LOV le plus affirmé de la collection.",
    images: ['/images/sacs/LOV-SML-05_01.jpg', '/images/sacs/LOV-SML-05_02.jpg', '/__l5e/assets-v1/a33b40eb-679e-4180-abc2-08aa6856b1aa/lovbag-small-lov-azteque-rouge-interieur.png'],
  },
  {
    ref: 'LOV-SML-06', slug: 'small-lov-azteque-terracotta', name: 'Small LOV Aztèque Blanc & Marron',
    silhouette: 'sml', motif: 'Aztèque', colorName: 'Blanc & Marron', swatch: '#8B5E3C',
    body: 'Blanc, marron', trim: 'Marron',
    description: "Blanc et marron, le motif aztèque dans sa version la plus douce.",

    images: ['/images/sacs/LOV-SML-06_01.jpg', '/images/sacs/LOV-SML-06_02.jpg', '/images/sacs/LOV-SML-06_03.jpg'],
  },
];

// Alt descriptif normalisé pour chaque visuel
export const bagAlt = (b: BagSpec) =>
  `Sac ${b.name.replace(/^(Big|Small) LOV /, `${BAG_SILHOUETTES[b.silhouette].label} `).toLowerCase()} en cuir de buffle tressé main, charm cœur LOVCICOV`;

// Projection des sacs vers le modèle Product commun au site
// Le handle Shopify d'un sac est son slug, sauf exception référencée ici.
const BAG_HANDLE_OVERRIDES: Record<string, string> = {
  'small-lov-bicolore-argent': 'small-lov-bicolore-or',
};

const rawSacsProducts: RawProduct[] = BAGS.map((b) => {
  const sil = BAG_SILHOUETTES[b.silhouette];
  return {
    id: b.slug,
    shopifyHandle: BAG_HANDLE_OVERRIDES[b.slug] ?? b.slug,
    name: b.name,
    collection: 'sacs' as const,
    description: b.description,
    details: b.description,
    image: b.images[0],
    gallery: b.images.slice(1),
    // Pastilles : les autres coloris de la même silhouette
    colors: BAGS.filter((o) => o.silhouette === b.silhouette).map((o) => ({ name: o.colorName, id: o.slug })),
  };
});

export const getBagBySlug = (slug?: string) => BAGS.find((b) => b.slug === slug);



// Collection "Accessoires" — grigris LovBag, pièces uniques faites main
const rawGrigriProducts: RawProduct[] = [
  {
    id: 'grigri-fleur-menthe',
    shopifyHandle: 'grigri-fleur-menthe',
    name: 'Fleur Menthe',
    collection: 'accessoires',
    description: 'Grigri fait main, pièce unique — à accrocher à ton sac, tes clés ou ta ceinture. Fleurs crochetées, cordes nouées à la main, mousqueton cœur : aucun n\'est identique à un autre.',
    details: 'Grigri fait main, pièce unique — à accrocher à ton sac, tes clés ou ta ceinture. Fleurs crochetées, cordes nouées à la main, mousqueton cœur : aucun n\'est identique à un autre.',
    image: 'lovbag-grigri-01-fleur-menthe',
    badge: 'PIÈCE UNIQUE',
  },
  {
    id: 'grigri-fleur-bonbon',
    shopifyHandle: 'grigri-fleur-bonbon',
    name: 'Fleur Bonbon',
    collection: 'accessoires',
    description: 'Grigri fait main, pièce unique — à accrocher à ton sac, tes clés ou ta ceinture. Fleurs crochetées, cordes nouées à la main, mousqueton cœur : aucun n\'est identique à un autre.',
    details: 'Grigri fait main, pièce unique — à accrocher à ton sac, tes clés ou ta ceinture. Fleurs crochetées, cordes nouées à la main, mousqueton cœur : aucun n\'est identique à un autre.',
    image: 'lovbag-grigri-02-fleur-bonbon',
    badge: 'PIÈCE UNIQUE',
  },
  {
    id: 'grigri-fleur-rose',
    shopifyHandle: 'grigri-fleur-rose',
    name: 'Fleur Rose',
    collection: 'accessoires',
    description: 'Grigri fait main, pièce unique — à accrocher à ton sac, tes clés ou ta ceinture. Fleurs crochetées, cordes nouées à la main, mousqueton cœur : aucun n\'est identique à un autre.',
    details: 'Grigri fait main, pièce unique — à accrocher à ton sac, tes clés ou ta ceinture. Fleurs crochetées, cordes nouées à la main, mousqueton cœur : aucun n\'est identique à un autre.',
    image: 'lovbag-grigri-03-fleur-rose',
    badge: 'PIÈCE UNIQUE',
  },
  {
    id: 'grigri-arc-en-ciel-pastel',
    shopifyHandle: 'grigri-arc-en-ciel-pastel',
    name: 'Arc-en-Ciel Pastel',
    collection: 'accessoires',
    description: 'Grigri fait main, pièce unique — à accrocher à ton sac, tes clés ou ta ceinture. Fleurs crochetées, cordes nouées à la main, mousqueton cœur : aucun n\'est identique à un autre.',
    details: 'Grigri fait main, pièce unique — à accrocher à ton sac, tes clés ou ta ceinture. Fleurs crochetées, cordes nouées à la main, mousqueton cœur : aucun n\'est identique à un autre.',
    image: 'lovbag-grigri-04-arc-en-ciel-pastel',
    badge: 'PIÈCE UNIQUE',
  },
  {
    id: 'grigri-arc-en-ciel-bleu',
    shopifyHandle: 'grigri-arc-en-ciel-bleu',
    name: 'Arc-en-Ciel Bleu',
    collection: 'accessoires',
    description: 'Grigri fait main, pièce unique — à accrocher à ton sac, tes clés ou ta ceinture. Fleurs crochetées, cordes nouées à la main, mousqueton cœur : aucun n\'est identique à un autre.',
    details: 'Grigri fait main, pièce unique — à accrocher à ton sac, tes clés ou ta ceinture. Fleurs crochetées, cordes nouées à la main, mousqueton cœur : aucun n\'est identique à un autre.',
    image: 'lovbag-grigri-05-arc-en-ciel-bleu',
    badge: 'PIÈCE UNIQUE',
  },
  {
    id: 'grigri-cerise-rouge',
    shopifyHandle: 'grigri-cerise-rouge',
    name: 'Cerise Rouge',
    collection: 'accessoires',
    description: 'Grigri fait main, pièce unique — à accrocher à ton sac, tes clés ou ta ceinture. Fleurs crochetées, cordes nouées à la main, mousqueton cœur : aucun n\'est identique à un autre.',
    details: 'Grigri fait main, pièce unique — à accrocher à ton sac, tes clés ou ta ceinture. Fleurs crochetées, cordes nouées à la main, mousqueton cœur : aucun n\'est identique à un autre.',
    image: 'lovbag-grigri-06-cerise-rouge',
    badge: 'PIÈCE UNIQUE',
  },
  {
    id: 'grigri-cerise-creme',
    shopifyHandle: 'grigri-cerise-creme',
    name: 'Cerise Crème',
    collection: 'accessoires',
    description: 'Grigri fait main, pièce unique — à accrocher à ton sac, tes clés ou ta ceinture. Fleurs crochetées, cordes nouées à la main, mousqueton cœur : aucun n\'est identique à un autre.',
    details: 'Grigri fait main, pièce unique — à accrocher à ton sac, tes clés ou ta ceinture. Fleurs crochetées, cordes nouées à la main, mousqueton cœur : aucun n\'est identique à un autre.',
    image: 'lovbag-grigri-07-cerise-creme',
    badge: 'PIÈCE UNIQUE',
  },
  {
    id: 'grigri-pomme-croquee',
    shopifyHandle: 'grigri-pomme-croquee',
    name: 'Pomme Croquée',
    collection: 'accessoires',
    description: 'Grigri fait main, pièce unique — à accrocher à ton sac, tes clés ou ta ceinture. Fleurs crochetées, cordes nouées à la main, mousqueton cœur : aucun n\'est identique à un autre.',
    details: 'Grigri fait main, pièce unique — à accrocher à ton sac, tes clés ou ta ceinture. Fleurs crochetées, cordes nouées à la main, mousqueton cœur : aucun n\'est identique à un autre.',
    image: 'lovbag-grigri-08-pomme-croquee',
    badge: 'PIÈCE UNIQUE',
  },
  {
    id: 'grigri-pomme-damour',
    shopifyHandle: 'grigri-pomme-damour',
    name: 'Pomme d\'Amour',
    collection: 'accessoires',
    description: 'Grigri fait main, pièce unique — à accrocher à ton sac, tes clés ou ta ceinture. Fleurs crochetées, cordes nouées à la main, mousqueton cœur : aucun n\'est identique à un autre.',
    details: 'Grigri fait main, pièce unique — à accrocher à ton sac, tes clés ou ta ceinture. Fleurs crochetées, cordes nouées à la main, mousqueton cœur : aucun n\'est identique à un autre.',
    image: 'lovbag-grigri-09-pomme-damour',
    badge: 'PIÈCE UNIQUE',
  },
  {
    id: 'grigri-etoile-denim',
    shopifyHandle: 'grigri-etoile-denim',
    name: 'Étoile Denim',
    collection: 'accessoires',
    description: 'Grigri fait main, pièce unique — à accrocher à ton sac, tes clés ou ta ceinture. Fleurs crochetées, cordes nouées à la main, mousqueton cœur : aucun n\'est identique à un autre.',
    details: 'Grigri fait main, pièce unique — à accrocher à ton sac, tes clés ou ta ceinture. Fleurs crochetées, cordes nouées à la main, mousqueton cœur : aucun n\'est identique à un autre.',
    image: 'lovbag-grigri-10-etoile-denim',
    badge: 'PIÈCE UNIQUE',
  },
  {
    id: 'grigri-fleur-neon',
    shopifyHandle: 'grigri-fleur-neon',
    name: 'Fleur Néon',
    collection: 'accessoires',
    description: 'Grigri fait main, pièce unique — à accrocher à ton sac, tes clés ou ta ceinture. Fleurs crochetées, cordes nouées à la main, mousqueton cœur : aucun n\'est identique à un autre.',
    details: 'Grigri fait main, pièce unique — à accrocher à ton sac, tes clés ou ta ceinture. Fleurs crochetées, cordes nouées à la main, mousqueton cœur : aucun n\'est identique à un autre.',
    image: 'lovbag-grigri-11-fleur-neon',
    badge: 'PIÈCE UNIQUE',
  },
];

// ————————————————————————————————————————————————
// Source de vérité unique : normalisation + exports
// ————————————————————————————————————————————————

const UNIVERS_BY_COLLECTION: Record<Product['collection'], Univers> = {
  standard: 'powerlov',
  mystic: 'mysticlov',
  bijoux: 'stonelov',
  sacs: 'lovbag',
  accessoires: 'lovbag',
};

/** Nom affiché : majuscules, sans point final, espaces normalisés. */
export const normalizeProductName = (name: string): string =>
  name.trim().replace(/\s+/g, ' ').replace(/[.\s]+$/, '').toUpperCase();

const vueOf = (key: string): 'face' | 'dos' | 'porte' | 'detail' => {
  if (/(dos|back)/i.test(key)) return 'dos';
  if (/(face|front)/i.test(key)) return 'face';
  if (/(porte|street|walking|lifestyle|model)/i.test(key)) return 'porte';
  return 'detail';
};

const normalize = (p: RawProduct): Product => {
  const images = [p.image, ...(p.gallery ?? [])].filter(Boolean);
  return {
    ...p,
    price: p.price ?? 0,
    name: normalizeProductName(p.name),
    univers: UNIVERS_BY_COLLECTION[p.collection],
    images,
    views: images.map((url) => ({ url, vue: vueOf(url) })),
  };
};

/**
 * Enrichissement Shopify : prix, type, disponibilité et identifiant de variante
 * viennent du catalogue chargé au démarrage. Un produit dont le handle ne
 * correspond à aucune fiche Shopify est masqué (et signalé dans la console).
 */
const enrich = (list: Product[]): Product[] => {
  const catalogAvailable = isCatalogLoaded();
  const out: Product[] = [];
  for (const p of list) {
    const entry = getCatalogEntry(p.shopifyHandle);
    if (!entry) {
      if (catalogAvailable) {
        console.warn(
          `[Catalogue] Produit masqué — aucun produit Shopify pour le handle « ${p.shopifyHandle ?? '(aucun)'} » : ${p.name}`
        );
        continue;
      }
      out.push(p);
      continue;
    }
    out.push({
      ...p,
      price: entry.price,
      type: entry.type ?? p.type,
      availableForSale: entry.availableForSale,
      shopifyVariantId: entry.variants[0]?.id,
    });
  }
  return out;
};

// Listes exportées : remplies immédiatement (instantané localStorage) puis
// mises à jour EN PLACE quand la réponse Shopify arrive — le rendu n'attend jamais.
// Elles n'exposent QUE les produits visibles (drapeau d'admin appliqué ici, une
// seule fois, pour que toutes les grilles/pages en héritent automatiquement).
export const standardProducts: Product[] = [];
export const kimonoProducts: Product[] = [];
export const mysticProducts: Product[] = [];
export const bijouxProducts: Product[] = [];
export const sacsProducts: Product[] = [];
export const grigriProducts: Product[] = [];

/** TOUS les produits VISIBLES du site, chacun une seule fois. */
export const products: Product[] = [];

/** Catalogue complet, masqués inclus — réservé à l'administration. */
export const allProducts: Product[] = [];

const fill = (target: Product[], next: Product[]) => {
  target.length = 0;
  target.push(...next);
};

const visibleOnly = (list: Product[]) => list.filter((p) => !isKeyHidden(`local:${p.id}`));

const rebuild = () => {
  const all = {
    standard: enrich(rawStandardProducts.map(normalize)),
    kimono: enrich(rawKimonoProducts.map(normalize)),
    mystic: enrich(rawMysticProducts.map(normalize)),
    bijoux: enrich(rawBijouxProducts.map(normalize)),
    sacs: enrich(rawSacsProducts.map(normalize)),
    grigri: enrich(rawGrigriProducts.map(normalize)),
  };

  const dedupe = (list: Product[]) => {
    const seen = new Set<string>();
    return list.filter((p) => (seen.has(p.id) ? false : (seen.add(p.id), true)));
  };

  fill(
    allProducts,
    dedupe([...all.standard, ...all.mystic, ...all.bijoux, ...all.sacs, ...all.grigri])
  );

  fill(standardProducts, visibleOnly(all.standard));
  fill(kimonoProducts, visibleOnly(all.kimono));
  fill(mysticProducts, visibleOnly(all.mystic));
  fill(bijouxProducts, visibleOnly(all.bijoux));
  fill(sacsProducts, visibleOnly(all.sacs));
  fill(grigriProducts, visibleOnly(all.grigri));

  fill(products, visibleOnly(allProducts));
};

rebuild();
onCatalogUpdate(rebuild);
onVisibilityUpdate(rebuild);

export const getProductsByUnivers = (u: Univers): Product[] =>
  products.filter((p) => p.univers === u);

export const getProductById = (id?: string): Product | undefined =>
  products.find((p) => p.id === id);

/** Recherche dans le catalogue complet (masqués inclus) — admin & fiches produit. */
export const getAnyProductById = (id?: string): Product | undefined =>
  allProducts.find((p) => p.id === id);

export const isProductHidden = (id?: string): boolean =>
  !!id && isKeyHidden(`local:${id}`);


