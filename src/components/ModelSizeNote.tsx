// Mention taille mannequin — modifiable ici uniquement, se répercute partout.
export const MODEL_SIZE_NOTE = 'Le mannequin mesure 1m75 et porte une taille XS.';

const SANS = "'Instrument Sans', sans-serif";

interface ModelSizeNoteProps {
  className?: string;
}

const ModelSizeNote = ({ className = '' }: ModelSizeNoteProps) => (
  <p
    className={`italic ${className}`}
    style={{ fontFamily: SANS, fontSize: 11.5, lineHeight: 1.6, color: '#6B6A65' }}
  >
    {MODEL_SIZE_NOTE}
  </p>
);

export default ModelSizeNote;
