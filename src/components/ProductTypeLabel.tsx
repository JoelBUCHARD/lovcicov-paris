// Type de produit affiché en grand au-dessus du nom — composant unique partagé.
const SANS = "'Inter', 'Instrument Sans', Arial, sans-serif";

interface Props {
  label: string;
  className?: string;
}

const ProductTypeLabel = ({ label, className = '' }: Props) => {
  if (!label) return null;
  return (
    <p
      className={`mb-3 uppercase ${className}`}
      style={{
        fontFamily: SANS,
        fontSize: 'clamp(15px, 1.6vw, 18px)',
        letterSpacing: '0.2em',
        color: '#1A1A1A',
        fontWeight: 500,
        lineHeight: 1.2,
      }}
    >
      {label}
    </p>
  );
};

export default ProductTypeLabel;
