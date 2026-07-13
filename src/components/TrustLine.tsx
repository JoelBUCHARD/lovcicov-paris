interface TrustLineProps {
  variant?: 'default' | 'muted';
  className?: string;
}

const items = [
  'Livraison offerte dès 99€',
  'Retours sous 14 jours',
  'Paiement sécurisé',
  'Une conseillère à votre écoute',
];

/**
 * Discrete editorial trust strip — no icons, no badges.
 * Reused across Shop, Cart summary footer and Homepage.
 */
const TrustLine = ({ variant = 'default', className = '' }: TrustLineProps) => {
  const color = variant === 'muted' ? 'text-muted-foreground/80' : 'text-muted-foreground';
  return (
    <ul
      className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] tracking-[0.22em] uppercase ${color} ${className}`}
    >
      {items.map((label, i) => (
        <li key={label} className="flex items-center gap-6">
          <span>{label}</span>
          {i < items.length - 1 && <span aria-hidden className="hidden md:inline w-px h-3 bg-border" />}
        </li>
      ))}
    </ul>
  );
};

export default TrustLine;
