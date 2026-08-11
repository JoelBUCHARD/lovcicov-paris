type AssetDescriptor = { url?: string };
type AssetModule = AssetDescriptor | { default?: AssetDescriptor };

// Les binaires ne sont plus présents dans le dépôt : la seule source d'images
// produit est désormais l'URL portée par chaque descripteur CDN.
const assetModules = import.meta.glob<AssetModule>('@/assets/**/*.asset.json', { eager: true });

const assetUrlByKey = new Map<string, string>();

for (const [path, module] of Object.entries(assetModules)) {
  const descriptor = (module as { default?: AssetDescriptor }).default ?? (module as AssetDescriptor);
  const url = descriptor.url;
  if (!url) continue;

  const filename = path.split('/').pop() ?? '';
  const key = filename.replace(/\.(?:png|jpe?g|webp|avif|gif|svg)\.asset\.json$/i, '');
  if (key) assetUrlByKey.set(key, url);
}

export const resolveProductImage = (key: string): string => {
  if (!key) return '';
  if (key.startsWith('http') || key.startsWith('/') || key.startsWith('data:')) return key;
  return assetUrlByKey.get(key) ?? '';
};

export const hasProductImage = (key: string): boolean => Boolean(resolveProductImage(key));
