import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type VisibilityKey = string; // "local:<id>" or "shopify:<handle>"

type VisibilityMap = Record<string, boolean>;

let cachedMap: VisibilityMap | null = null;
let inflight: Promise<VisibilityMap> | null = null;
const listeners = new Set<(m: VisibilityMap) => void>();

async function loadMap(force = false): Promise<VisibilityMap> {
  if (cachedMap && !force) return cachedMap;
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
    notify();
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
  inflight = null;
}

export function useProductVisibility() {
  const [map, setMap] = useState<VisibilityMap>(() => cachedMap ?? {});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const refresh = () => {
      if (mounted) setLoading(true);
      loadMap(true).then((m) => {
        if (mounted) {
          setMap({ ...m });
          setLoading(false);
        }
      });
    };

    refresh();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') refresh();
    };
    window.addEventListener('focus', refresh);
    window.addEventListener('pageshow', refresh);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const cb = (m: VisibilityMap) => {
      if (mounted) {
        setMap({ ...m });
        setLoading(false);
      }
    };
    listeners.add(cb);
    return () => {
      mounted = false;
      listeners.delete(cb);
      window.removeEventListener('focus', refresh);
      window.removeEventListener('pageshow', refresh);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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
