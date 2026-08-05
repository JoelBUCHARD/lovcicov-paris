// Format prix français : montant, espace insécable, symbole € après.
export const formatPrice = (value: number | string) => `${value}\u00A0€`;
