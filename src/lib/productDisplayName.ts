// Titre AFFICHÉ uniquement : retire le type en tête du nom (T-Shirt / Crewneck / Hoodie / Sweat).
// Le nom d'origine reste inchangé en base, dans les URLs, le panier, le checkout et les emails.
const LEADING_TYPE = /^(t[-\s]?shirt|tee|crewneck|hoodie|sweat[-\s]?capuche|sweat[-\s]?shirt|sweat|kimono|grigri)\b[\s—–-]*/i;

export const displayProductName = (name: string): string => {
  if (!name) return name;
  const stripped = name.replace(LEADING_TYPE, '').trim();
  if (!stripped) return name;
  return stripped;
};
