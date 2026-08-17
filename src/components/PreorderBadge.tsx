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
    const unsubscribe = onCatalogUpdate(() => setPreorder(isPreorder(productId)));
    return () => {
      unsubscribe();
    };
  }, [productId]);

  if (!preorder) return null;

  return (
    <span
      className="pointer-events-none absolute z-10"
      style={{
        left: 16,
        bottom: 16,
        backgroundColor: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        color: '#1A1A1A',
        fontSize: 11,
        fontWeight: 450,
        letterSpacing: '0.08em',
        textTransform: 'none',
        padding: '6px 12px',
        borderRadius: 2,
        lineHeight: 1,
      }}
    >
      Précommande
    </span>
  );
}
