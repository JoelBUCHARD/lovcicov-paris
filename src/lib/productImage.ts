const imageModulesJpg = import.meta.glob('@/assets/**/*.jpg', { eager: true, import: 'default' }) as Record<string, string>;
const imageModulesJpeg = import.meta.glob('@/assets/**/*.jpeg', { eager: true, import: 'default' }) as Record<string, string>;
const imageModulesWebp = import.meta.glob('@/assets/**/*.webp', { eager: true, import: 'default' }) as Record<string, string>;
const imageModulesPng = import.meta.glob('@/assets/**/*.png', { eager: true, import: 'default' }) as Record<string, string>;
const assetJsonModules = import.meta.glob('@/assets/**/*.asset.json', { eager: true }) as Record<string, { url?: string; default?: { url?: string } }>;

const assetJsonAsImages: Record<string, string> = {};
for (const [path, mod] of Object.entries(assetJsonModules)) {
  const url = mod?.url ?? mod?.default?.url;
  if (url) assetJsonAsImages[path.replace(/\.asset\.json$/, '')] = url;
}

const imageModules = { ...imageModulesJpg, ...imageModulesJpeg, ...imageModulesWebp, ...imageModulesPng, ...assetJsonAsImages };

export const resolveProductImage = (key: string): string => {
  if (!key) return '';
  if (key.startsWith('http') || key.startsWith('/') || key.startsWith('data:')) return key;
  const exactMatch = Object.entries(imageModules).find(([path]) => {
    const filename = path.split('/').pop() ?? '';
    const stem = filename.replace(/\.asset\.json$/, '').replace(/\.(jpg|jpeg|webp|png)$/i, '');
    return stem === key;
  });
  if (exactMatch) return exactMatch[1];

  const match = Object.entries(imageModules).find(([path]) => path.includes(key));
  return match ? match[1] : '';
};
