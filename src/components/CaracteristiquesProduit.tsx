const SANS = "'Inter', 'Instrument Sans', Arial, sans-serif";

const CARACTERISTIQUES: string[] = [
  'Jersey simple — 100 % coton biologique cardé open-end',
  'Grammage : 240 g/m² — tissu lavé',
  'Coupe : oversize',
  'Certifications : GOTS (coton biologique) · OEKO-TEX Standard 100 · Fair Wear Foundation',
  'Entretien : lavage 30° avec couleurs similaires · laver et repasser à l’envers · ne pas repasser sur l’imprimé · pas de sèche-linge · pas de nettoyage à sec',
  'Origine : tissage, teinture et confection au Bangladesh (atelier certifié Fair Wear) · Impression en France',
];

interface Props {
  accent?: string;
  className?: string;
  items?: string[];
}

const CaracteristiquesProduit = ({ accent = '#E63946', className = '', items }: Props) => (
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
      {(items ?? CARACTERISTIQUES).map((line) => (
        <li key={line} style={{ fontFamily: SANS, fontSize: 13, lineHeight: 1.8, color: '#5F5E5A' }}>
          {line}
        </li>
      ))}
    </ul>
  </div>
);

export default CaracteristiquesProduit;
