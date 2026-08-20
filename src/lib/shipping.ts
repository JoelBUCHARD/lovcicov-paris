// Shipping policy — single source of truth
export const SHIPPING_FEE = 9.9;
export const FREE_SHIPPING_THRESHOLD = 99;

export const isFreeShipping = (subtotal: number) => subtotal >= FREE_SHIPPING_THRESHOLD;

export const getShippingFee = (subtotal: number) =>
  isFreeShipping(subtotal) ? 0 : SHIPPING_FEE;

export const getRemainingForFreeShipping = (subtotal: number) =>
  Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

export const formatEuro = (value: number) =>
  value.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '\u00A0€';

export const SHIPPING_LINE_LABEL = `Livraison ${formatEuro(SHIPPING_FEE)} — offerte dès ${FREE_SHIPPING_THRESHOLD}€ d'achat`;

// Zone fees (informational copy)
export const EUROPE_SHIPPING_FEE = 22;
export const INTERNATIONAL_SHIPPING_FEE = 29;

export const FREE_SHIPPING_LABEL = `Livraison offerte dès ${FREE_SHIPPING_THRESHOLD} €`;

export const TRUST_SHIPPING_TEXT = "En France métropolitaine dès 250 € d'achat. Livraison en 3 à 7 jours ouvrés en France métropolitaine, 5 à 10 jours en Belgique et Europe, 7 à 15 jours à l'international.";
export const TRUST_PAYMENT_TEXT = "Cartes bancaires, Apple Pay, Shop Pay, PayPal et Klarna. Transactions chiffrées, vos coordonnées bancaires ne transitent jamais par nos serveurs.";
export const TRUST_RETURNS_TEXT = "14 jours pour changer d'avis. Articles non portés, dans leur emballage d'origine.";

export const CART_SHIPPING_NOTE = `Expédition depuis Paris sous 24 à 48 h pour les articles en stock. Les articles en précommande sont expédiés sous 1 mois. Livraison offerte dès ${FREE_SHIPPING_THRESHOLD} € en France métropolitaine.`;
