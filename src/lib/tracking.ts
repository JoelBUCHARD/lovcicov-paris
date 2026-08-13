/** Poussées dataLayer (GTM). Aucun impact visuel. */
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export const pushDataLayer = (payload: Record<string, unknown>) => {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
};

export const trackViewItem = (args: { item_id: string; item_name: string; value: number }) =>
  pushDataLayer({ event: 'view_item', ...args, currency: 'EUR' });

export const trackAddToCart = (args: { item_id: string; value: number }) =>
  pushDataLayer({ event: 'add_to_cart', ...args, currency: 'EUR' });

export const trackBeginCheckout = (args: { num_items: number; value: number }) =>
  pushDataLayer({ event: 'begin_checkout', ...args, currency: 'EUR' });
