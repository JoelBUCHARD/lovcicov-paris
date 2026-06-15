import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type VisibilityKey = string; // "local:<id>" or "shopify:<handle>"

type VisibilityMap = Record<string, boolean>;

let cachedMap: VisibilityMap | null = null;
let inflight: Promise<VisibilityMap> | null = null;
const listeners = new Set<(m: VisibilityMap) => void>();

async function loadMap(): Promise<VisibilityMap> {
  if (cachedMap) return cachedMap;
  if (inflight) return inflight;
  inflight = (async () => {
    const { data, error } = await supabase
      .from('product_visibility')
      .select('product_handle, visible');
    const map: VisibilityMap = {};
    if (!error && data) {
      for (const row of data) map[row.product_handle] = row.visible;
    }
    cachedMap = map;
    inflight = null;
    return map;
  })();
  return inflight;
}

function notify() {
  if (!cachedMap) return;
  for (const l of listeners) l(cachedMap);
}

async function upsertVisibility(keys: VisibilityKey[], visible: boolean) {
  const uniqueKeys = [...new Set(keys)];
  const { error } = await supabase
    .from('product_visibility')
    .upsert(
      uniqueKeys.map((product_handle) => ({ product_handle, visible })),
      { onConflict: 'product_handle' }
    );

  if (error) throw error;

  if (cachedMap) {
    for (const key of uniqueKeys) cachedMap[key] = visible;
    notify();
  }
}

export function invalidateVisibilityCache() {
  cachedMap = null;
}

export function useProductVisibility() {
  const [map, setMap] = useState<VisibilityMap>(() => cachedMap ?? {});
  const [loading, setLoading] = useState(!cachedMap);

  useEffect(() => {
    let mounted = true;
    loadMap().then((m) => {
      if (mounted) {
        setMap({ ...m });
        setLoading(false);
      }
    });
    const cb = (m: VisibilityMap) => mounted && setMap({ ...m });
    listeners.add(cb);
    return () => {
      mounted = false;
      listeners.delete(cb);
    };
  }, []);

  // Visible unless explicitly false in the map. Default true.
  const isVisible = useCallback(
    (key: VisibilityKey) => map[key] !== false,
    [map]
  );

  return { map, isVisible, loading };
}

export async function setProductVisible(key: VisibilityKey, visible: boolean) {
  await upsertVisibility([key], visible);
}

export async function setProductsVisible(keys: VisibilityKey[], visible: boolean) {
  await upsertVisibility(keys, visible);
}

export const localKey = (id: string) => `local:${id}`;
export const shopifyKey = (handle: string) => `shopify:${handle}`;
