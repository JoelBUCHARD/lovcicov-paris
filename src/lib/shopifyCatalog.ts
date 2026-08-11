import { SHOPIFY_STOREFRONT_URL, SHOPIFY_STOREFRONT_TOKEN } from '@/config/shopify';

/**
 * Catalogue Shopify — source de vérité unique pour le prix, le type,
 * la disponibilité et les identifiants de variantes.
 *
 * Rien de tout cela n'est écrit en dur dans le code : le catalogue est chargé
 * une fois au démarrage (avec un instantané localStorage pour l'affichage
 * immédiat), puis interrogé par handle.
 */

export interface CatalogVariant {
  id: string;
  title: string;
  price: { amount: string; currencyCode: string };
  availableForSale: boolean;
  currentlyNotInStock: boolean;
  quantityAvailable?: number | null;
  selectedOptions: { name: string; value: string }[];
}

export interface CatalogEntry {
  handle: string;
  title: string;
  productType: string;
  /** Type normalisé pour l'affichage du site. */
  type?: 'tshirt' | 'crewneck' | 'hoodie' | 'kimono' | 'sac' | 'bijou' | 'accessoire';
  price: number;
  availableForSale: boolean;
  options: { name: string; values: string[] }[];
  variants: CatalogVariant[];
  /** URLs des visuels produit — Storefront API uniquement, jamais de fichier local. */
  images: string[];
}

const CATALOG_QUERY = `
  query Catalog($first: Int!) {
    products(first: $first) {
      edges {
        node {
          handle
          title
          productType
          availableForSale
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 10) { edges { node { url } } }
          options { name values }
          variants(first: 50) {
            edges {
              node {
                id
                title
                availableForSale
                currentlyNotInStock
                price { amount currencyCode }
                selectedOptions { name value }
              }
            }
          }
        }
      }
    }
  }
`;

// Instantané de session uniquement : aucune donnée produit (et donc aucune URL
// d'image) n'est conservée au-delà de l'onglet en cours.
const STORAGE_KEY = 'lovcicov-shopify-catalog-v2';

let catalog: Map<string, CatalogEntry> = new Map();
let loaded = false;

const normalizeType = (productType: string): CatalogEntry['type'] => {
  const t = (productType || '').toLowerCase();
  if (t.includes('hoodie') || t.includes('capuche')) return 'hoodie';
  if (t.includes('crewneck') || t.includes('sweat')) return 'crewneck';
  if (t.includes('shirt')) return 'tshirt';
  if (t.includes('kimono')) return 'kimono';
  if (t.includes('sac') || t.includes('bag')) return 'sac';
  if (t.includes('bijou')) return 'bijou';
  if (t.includes('accessoire')) return 'accessoire';
  return undefined;
};

type RawNode = {
  handle: string;
  title: string;
  productType: string;
  availableForSale: boolean;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images?: { edges: { node: { url: string } }[] };
  options: { name: string; values: string[] }[];
  variants: { edges: { node: CatalogVariant }[] };
};

const toEntries = (nodes: RawNode[]): CatalogEntry[] =>
  nodes.map((n) => ({
    handle: n.handle,
    title: n.title,
    productType: n.productType,
    type: normalizeType(n.productType),
    price: Math.round(parseFloat(n.priceRange.minVariantPrice.amount)),
    availableForSale: n.availableForSale,
    options: n.options ?? [],
    images: (n.images?.edges ?? []).map((e) => e.node.url),
    variants: (n.variants?.edges ?? []).map((e) => e.node),
  }));

const listeners = new Set<() => void>();
/** Abonnement au rafraîchissement du catalogue (rendu non bloquant). */
export const onCatalogUpdate = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

const setCatalog = (entries: CatalogEntry[]) => {
  catalog = new Map(entries.map((e) => [e.handle, e]));
  loaded = entries.length > 0;
  listeners.forEach((cb) => cb());
};

/** Instantané synchrone (localStorage) pour éviter un écran vide au chargement. */
const restoreSnapshot = () => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const entries = JSON.parse(raw) as CatalogEntry[];
    if (Array.isArray(entries) && entries.length) setCatalog(entries);
  } catch {
    /* ignore */
  }
};

restoreSnapshot();

let inflight: Promise<void> | null = null;

export async function loadShopifyCatalog(force = false): Promise<void> {
  if (inflight && !force) return inflight;
  if (force) inflight = null;
  inflight = (async () => {
    try {
      const res = await fetch(SHOPIFY_STOREFRONT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
        },
        cache: 'no-store',
        body: JSON.stringify({ query: CATALOG_QUERY, variables: { first: 250 } }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (json.errors) throw new Error(json.errors.map((e: { message: string }) => e.message).join(', '));
      const nodes: RawNode[] = (json?.data?.products?.edges ?? []).map((e: { node: RawNode }) => e.node);
      const entries = toEntries(nodes);
      if (!entries.length) throw new Error('catalogue vide');
      setCatalog(entries);
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      } catch {
        /* quota */
      }
    } catch (err) {
      console.error('[Shopify] Chargement du catalogue impossible', err);
    }
  })();
  return inflight;
}

/** Relecture forcée de la Storefront API (appelée au chargement de chaque fiche produit). */
export const refreshShopifyCatalog = () => loadShopifyCatalog(true);

export const isCatalogLoaded = () => loaded;
export const getCatalogEntry = (handle?: string): CatalogEntry | undefined =>
  handle ? catalog.get(handle) : undefined;
export const getCatalogEntries = (): CatalogEntry[] => [...catalog.values()];

/** Variante correspondant exactement aux options choisies (taille / couleur). */
export function findVariant(
  entry: CatalogEntry | undefined,
  opts: { size?: string; color?: string }
): CatalogVariant | undefined {
  if (!entry) return undefined;
  const hasSize = entry.options.some((o) => /taille|size/i.test(o.name));
  const hasColor = entry.options.some((o) => /couleur|color/i.test(o.name));
  const matches = (v: CatalogVariant) => {
    const colorOk = !hasColor || !opts.color || v.selectedOptions.some((o) => o.value === opts.color);
    const sizeOk = !hasSize || !opts.size || v.selectedOptions.some((o) => o.value === opts.size);
    return colorOk && sizeOk;
  };
  return entry.variants.find(matches) ?? (hasSize && opts.size ? undefined : entry.variants[0]);
}
