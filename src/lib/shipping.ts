// Shipping policy — single source of truth
export const SHIPPING_FEE = 9.9;
export const FREE_SHIPPING_THRESHOLD = 99;

export const isFreeShipping = (subtotal: number) => subtotal >= FREE_SHIPPING_THRESHOLD;

export const getShippingFee = (subtotal: number) =>
  isFreeShipping(subtotal) ? 0 : SHIPPING_FEE;

export const getRemainingForFreeShipping = (subtotal: number) =>
  Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

export const formatEuro = (value: number) =>
  value.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '€';

export const SHIPPING_LINE_LABEL = `Livraison ${formatEuro(SHIPPING_FEE)} — offerte dès ${FREE_SHIPPING_THRESHOLD}€ d'achat`;
