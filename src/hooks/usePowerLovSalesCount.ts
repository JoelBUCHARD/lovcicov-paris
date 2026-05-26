import { useEffect, useState } from 'react';

/**
 * Returns the number of PowerLov t-shirts sold (0..500).
 *
 * Real order counts require the Shopify Admin API and cannot be fetched
 * from the client-side Storefront API. Until an edge function is wired up
 * to expose this number, we default to 0 as specified.
 */
export function usePowerLovSalesCount(): { sold: number; target: number } {
  const [sold, setSold] = useState(0);
  const target = 500;

  useEffect(() => {
    // Placeholder: future edge function call to Shopify Admin API
    // fetch('/api/powerlov-sales-count').then(r => r.json()).then(d => setSold(d.sold ?? 0)).catch(() => setSold(0));
    setSold(0);
  }, []);

  return { sold, target };
}
