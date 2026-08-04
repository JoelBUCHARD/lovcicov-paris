// Mention taille mannequin — modifiable ici uniquement, se répercute partout.
export const MODEL_SIZE_NOTE = 'Le mannequin mesure 1m75 et porte une taille XS.';

// Produits unisexes portés par un mannequin femme ET un mannequin homme.
export const MODEL_SIZE_NOTE_DUAL =
  'Mannequin femme : 1m75, porte une taille XS · Mannequin homme : 1m85, porte une taille M';

// IDs des produits concernés par la double mention.
export const DUAL_MODEL_PRODUCT_IDS = new Set<string>([
  'mystic-tshirt-noir',
  'mystic-tshirt-natural',
  'mystic-tshirt-green',
  'mystic-tshirt-rose',
  'mystic-crewneck-noir',
  'mystic-hoodie-noir',
  'mystic-hoodie-natural',
]);

export const isDualModelProduct = (id?: string) => !!id && DUAL_MODEL_PRODUCT_IDS.has(id);

export const MODEL_SIZE_NOTE_MAN = 'Le mannequin mesure 1m85 et porte une taille M.';

// Étiquetage automatique d'après le nom de fichier : femme / homme / packshot.
export type ModelTag = 'woman' | 'man' | 'packshot';

export const modelTagForImage = (key?: string): ModelTag => {
  if (!key) return 'packshot';
  const k = key.toLowerCase();
  if (k.includes('woman')) return 'woman';
  if (/\bman|-man|man-/.test(k)) return 'man';
  return 'packshot';
};

export const modelSizeNoteFor = (id?: string, imageKey?: string) => {
  if (!isDualModelProduct(id)) return MODEL_SIZE_NOTE;
  const tag = modelTagForImage(imageKey);
  if (tag === 'woman') return MODEL_SIZE_NOTE;
  if (tag === 'man') return MODEL_SIZE_NOTE_MAN;
  return MODEL_SIZE_NOTE_DUAL;
};

const SANS = "'Instrument Sans', sans-serif";

interface ModelSizeNoteProps {
  className?: string;
  productId?: string;
}

const ModelSizeNote = ({ className = '', productId }: ModelSizeNoteProps) => (
  <p
    className={`italic ${className}`}
    style={{ fontFamily: SANS, fontSize: 11.5, lineHeight: 1.6, color: '#6B6A65' }}
  >
    {modelSizeNoteFor(productId)}
  </p>
);

export default ModelSizeNote;
