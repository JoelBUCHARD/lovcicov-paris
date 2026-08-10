// Adresses sociales universelles (desktop + mobile).
// Ne jamais utiliser de schéma d'application (whatsapp://, instagram://, fb://).
export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/lovcicov',
  instagram: 'https://www.instagram.com/lovcicov.paris/',
  whatsapp: 'https://wa.me/33786386782',
} as const;

export const SOCIAL_LABELS = {
  facebook: 'Facebook LOVCICOV',
  instagram: 'Instagram LOVCICOV',
  whatsapp: 'WhatsApp LOVCICOV',
} as const;

// Lien WhatsApp avec message pré-rempli (reste une URL https universelle).
export const whatsappLink = (message = 'Bonjour LOVCICOV') =>
  `${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent(message)}`;
