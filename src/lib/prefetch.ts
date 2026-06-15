// Centralized route prefetchers. Each entry triggers the dynamic import
// for a page chunk so it lands in the browser cache before the user clicks.
// Pair with <Link onMouseEnter={() => prefetchRoute('/shop')}>.

type Importer = () => Promise<unknown>;

const importers: Record<string, Importer> = {
  '/': () => import('@/pages/Index'),
  '/shop': () => import('@/pages/Shop'),
  '/search': () => import('@/pages/Search'),
  '/cart': () => import('@/pages/Cart'),
  '/auth': () => import('@/pages/Auth'),
  '/account': () => import('@/pages/Account'),
  '/manifeste': () => import('@/pages/Manifeste'),
  '/le-cercle': () => import('@/pages/LeCercle'),
  '/fondatrice': () => import('@/pages/Fondatrice'),
  '/univers': () => import('@/pages/Fondatrice'),
  '/drops': () => import('@/pages/Drops'),
  '/campagne-sac': () => import('@/pages/CampagneSac'),
  '/powerlov': () => import('@/pages/PowerLovEditorial'),
  '/mysticlov': () => import('@/pages/MysticLovEditorial'),
  '/stonelov': () => import('@/pages/StoneLovEditorial'),
  '/collections/standards': () => import('@/pages/CollectionStandards'),
  '/collections/powerlov': () => import('@/pages/CollectionPower'),
  '/collections/mystic-lov': () => import('@/pages/CollectionMystic'),
  '/collections/bijoux': () => import('@/pages/CollectionBijoux'),
  '/collections/t-shirts': () => import('@/pages/CollectionTshirts'),
  '/powerlov/shop': () => import('@/pages/CollectionPower'),
  '/mysticlov/shop': () => import('@/pages/CollectionMystic'),
  '/stonelov/shop': () => import('@/pages/Shop'),
  '/product': () => import('@/pages/ShopifyProductDetail'),
  '/shop/item': () => import('@/pages/ProductDetail'),
};

const triggered = new Set<string>();

export const prefetchRoute = (path: string) => {
  // Normalize dynamic paths (e.g. /product/some-handle -> /product)
  let key = path;
  if (path.startsWith('/product/')) key = '/product';
  else if (path.startsWith('/shop/') && path !== '/shop') key = '/shop/item';

  if (triggered.has(key)) return;
  const importer = importers[key];
  if (!importer) return;
  triggered.add(key);
  importer().catch(() => triggered.delete(key));
};

// Preload an image URL so it's in the browser cache before navigation.
export const prefetchImage = (url?: string | null) => {
  if (!url) return;
  const img = new Image();
  img.decoding = 'async';
  img.src = url;
};
