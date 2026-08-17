import { useEffect, useState } from 'react';
import { getAnyProductById } from '@/data/products';
import { getCatalogEntry, onCatalogUpdate } from '@/lib/shopifyCatalog';

/**
 * Pastille « Précommande » affichée sur les vignettes des grilles.
 * La règle est la même que sur la fiche produit : le produit est vendable
 * chez Shopify mais son stock est à zéro (vente en rupture autorisée).
 */
const isPreorder = (productId?: string): boolean => {
  const product = getAnyProductById(productId);
  const entry = getCatalogEntry(product?.shopifyHandle);
  if (!entry || !entry.availableForSale) return false;
  return entry.variants.some((v) => v.availableForSale && v.currentlyNotInStock);
};

export default function PreorderBadge({ productId }: { productId?: string }) {
  const [preorder, setPreorder] = useState(() => isPreorder(productId));

  useEffect(() => {
    setPreorder(isPreorder(productId));
    return onCatalogUpdate(() => setPreorder(isPreorder(productId)));
  }, [productId]);

  if (!preorder) return null;

  return (
    <span
      className="pointer-events-none absolute left-2 top-2 z-10 bg-[#0D0D0D] text-[#FAF9F7] font-light"
      style={{
        fontSize: 8,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        padding: '3px 6px',
        lineHeight: 1,
      }}
    >
      Précommande
    </span>
  );
}
