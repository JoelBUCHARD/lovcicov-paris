// Utilitaires partagés pour les barres de filtres dynamiques.
// Une sous-catégorie n'est affichée que si au moins un produit visible lui correspond.

export type FilterTab<K extends string = string> = { key: K; label: string; accent?: string };

/**
 * Ne conserve que les onglets ayant au moins un produit visible.
 * L'onglet "all" (Tout voir) est conservé dès qu'il reste au moins un produit.
 */
export function availableTabs<K extends string, P>(
  tabs: FilterTab<K>[],
  items: P[],
  matches: (item: P, key: K) => boolean,
  allKey: K = 'all' as K,
): FilterTab<K>[] {
  const kept = tabs.filter((t) =>
    t.key === allKey ? items.length > 0 : items.some((item) => matches(item, t.key)),
  );
  // Un seul onglet réel en plus de "Tout voir" : la barre reste utile, on la garde telle quelle.
  return kept;
}

/** Compteur : toujours basé sur le nombre de produits réellement affichés. */
export const countLabel = (n: number) => `${n} produit${n > 1 ? 's' : ''}`;
