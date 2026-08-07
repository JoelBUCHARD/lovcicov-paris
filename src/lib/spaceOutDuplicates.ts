/**
 * Réordonne une liste de vignettes de façon déterministe (aucun aléatoire)
 * pour que deux entrées du même article ne soient jamais adjacentes dans la grille,
 * ni horizontalement ni verticalement (jusqu'à 4 colonnes).
 *
 * Aucune entrée n'est supprimée ni fusionnée : seul l'ordre change.
 */
export function spaceOutDuplicates<T>(
  items: T[],
  keyOf: (item: T) => string,
  minGap = 4,
): T[] {
  if (items.length < 3) return [...items];

  const remaining = [...items];
  const out: T[] = [];

  while (remaining.length > 0) {
    let pick = remaining.findIndex((item) => {
      const key = keyOf(item);
      const look = Math.min(minGap - 1, out.length);
      for (let d = 1; d <= look; d++) {
        if (keyOf(out[out.length - d]) === key) return false;
      }
      return true;
    });

    // Aucun candidat parfait : on relâche progressivement la contrainte
    if (pick === -1) {
      for (let gap = minGap - 1; gap >= 2 && pick === -1; gap--) {
        pick = remaining.findIndex((item) => {
          const key = keyOf(item);
          const look = Math.min(gap - 1, out.length);
          for (let d = 1; d <= look; d++) {
            if (keyOf(out[out.length - d]) === key) return false;
          }
          return true;
        });
      }
    }

    if (pick === -1) pick = 0;
    out.push(remaining.splice(pick, 1)[0]);
  }

  return out;
}
