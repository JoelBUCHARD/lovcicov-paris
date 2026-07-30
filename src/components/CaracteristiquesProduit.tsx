const SANS = "'Inter', 'Instrument Sans', Arial, sans-serif";

const CARACTERISTIQUES: string[] = [
  'Jersey simple — 100 % coton biologique cardé open-end',
  'Grammage : 240 g/m² — tissu lavé',
  'Coupe : oversize, épaules tombantes',
  'Certifications : GOTS · OEKO-TEX Standard 100 · Fair Wear Foundation',
  'Entretien : lavage 30° avec couleurs similaires, laver et repasser à l’envers, ne pas repasser sur l’imprimé, pas de sèche-linge',
  'Origine : confectionné au Bangladesh dans un atelier certifié Fair Wear',
  'Imprimé en France',
];

interface Props {
  accent?: string;
  className?: string;
}

const CaracteristiquesProduit = ({ accent = '#E63946', className = '' }: Props) => (
  <div className={`mb-8 pt-5 border-t border-[#EDE9E2] max-w-[440px] ${className}`}>
    <p
      className="mb-2"
      style={{
        fontFamily: SANS,
        fontSize: 10,
        letterSpacing: '0.24em',
        color: accent,
        textTransform: 'uppercase',
        fontWeight: 500,
      }}
    >
      Caractéristiques
    </p>
    <ul className="list-none p-0 m-0 space-y-1">
      {CARACTERISTIQUES.map((line) => (
        <li key={line} style={{ fontFamily: SANS, fontSize: 13, lineHeight: 1.8, color: '#5F5E5A' }}>
          · {line}
        </li>
      ))}
    </ul>
  </div>
);

export default CaracteristiquesProduit;
