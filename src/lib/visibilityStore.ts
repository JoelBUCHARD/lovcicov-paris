import { supabase } from '@/integrations/supabase/client';

/**
 * Source de vérité unique de la visibilité produit.
 * Chargée une seule fois au démarrage, puis consultée de façon SYNCHRONE
 * par le catalogue (src/data/products.ts) — ainsi chaque grille, page ou
 * nouvel emplacement d'affichage hérite automatiquement du filtre.
 */

let hidden = new Set<string>();
let loaded = false;
let inflight: Promise<void> | null = null;
const subscribers = new Set<() => void>();

const notify = () => subscribers.forEach((cb) => cb());

export const isKeyHidden = (key: string) => hidden.has(key);
export const isVisibilityLoaded = () => loaded;
export const getHiddenKeys = () => [...hidden];

export const onVisibilityUpdate = (cb: () => void) => {
  subscribers.add(cb);
  return () => {
    subscribers.delete(cb);
  };
};

export function loadVisibility(force = false): Promise<void> {
  if (loaded && !force) return Promise.resolve();
  if (inflight) return inflight;
  inflight = (async () => {
    const { data, error } = await supabase
      .from('product_visibility')
      .select('product_handle, visible')
      .eq('visible', false);
    if (!error && data) {
      hidden = new Set(data.map((r) => r.product_handle));
    }
    loaded = true;
    inflight = null;
    notify();
  })();
  return inflight;
}

/** Mise à jour optimiste après un toggle dans l'admin. */
export function applyVisibilityLocally(keys: string[], visible: boolean) {
  for (const key of keys) {
    if (visible) hidden.delete(key);
    else hidden.add(key);
  }
  notify();
}

// Chargement immédiat, sans bloquer le premier rendu.
loadVisibility();
