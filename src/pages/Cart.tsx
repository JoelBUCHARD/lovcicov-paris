import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Trash2, Minus, Plus, Loader2, Lock, Truck, RotateCcw, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCartStore } from '@/stores/cartStore';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import {
  getShippingFee,
  getRemainingForFreeShipping,
  isFreeShipping,
  formatEuro,
  SHIPPING_FEE,
  FREE_SHIPPING_THRESHOLD,
} from '@/lib/shipping';

const imageModulesJpg = import.meta.glob('@/assets/*.jpg', { eager: true, import: 'default' }) as Record<string, string>;
const imageModulesWebp = import.meta.glob('@/assets/*.webp', { eager: true, import: 'default' }) as Record<string, string>;
const imageModulesPng = import.meta.glob('@/assets/*.png', { eager: true, import: 'default' }) as Record<string, string>;
const localImages = { ...imageModulesJpg, ...imageModulesWebp, ...imageModulesPng };
const getLocalImage = (key: string) => {
  const match = Object.entries(localImages).find(([path]) => path.includes(key));
  return match ? match[1] : '';
};

const Reassurance = () => (
  <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 text-[11px] tracking-[0.05em] text-muted-foreground">
    <li className="flex items-start gap-3">
      <Lock size={13} strokeWidth={1.25} className="mt-0.5 flex-shrink-0" />
      <span>Paiement 100% sécurisé — Stripe & PayPal</span>
    </li>
    <li className="flex items-start gap-3">
      <Truck size={13} strokeWidth={1.25} className="mt-0.5 flex-shrink-0" />
      <span>Livraison soignée sous 2 à 4 jours ouvrés</span>
    </li>
    <li className="flex items-start gap-3">
      <RotateCcw size={13} strokeWidth={1.25} className="mt-0.5 flex-shrink-0" />
      <span>Retours simples sous 14 jours</span>
    </li>
    <li className="flex items-start gap-3">
      <Mail size={13} strokeWidth={1.25} className="mt-0.5 flex-shrink-0" />
      <span>Un conseil ? contact@lovcicov.com</span>
    </li>
  </ul>
);

const Cart = () => {
  const { items, removeItem, updateQuantity, isLoading, getCheckoutUrl, totalPrice, totalItems } = useCartStore();
  const {
    items: localItems,
    removeFromCart,
    updateQuantity: updateLocalQty,
    totalItems: localTotal,
    totalPrice: localPriceTotal,
  } = useCart();
  const total = totalPrice() + localPriceTotal;
  const count = totalItems() + localTotal;

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      return;
    }
    toast({
      title: 'Commande indisponible',
      description:
        localItems.length > 0
          ? "Certains articles ne sont pas synchronisés. Retirez-les et ré-ajoutez-les depuis la fiche produit."
          : 'Ajoutez un article au panier pour passer commande.',
    });
  };

  const progress = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main id="main" className="pt-36 md:pt-40 pb-32 px-6 md:px-12 min-h-[60vh]">
        {count === 0 ? (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl mx-auto pt-16 md:pt-24 text-center"
            aria-labelledby="empty-cart-title"
          >
            <ShoppingBag size={28} strokeWidth={1} className="mx-auto mb-8 text-muted-foreground" />
            <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-5">Votre Panier</p>
            <h1 id="empty-cart-title" className="text-3xl md:text-4xl font-light tracking-tight mb-6">
              Une page blanche
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed mb-12 max-w-sm mx-auto">
              Votre panier attend ses premières pièces. Découvrez nos collections pensées pour habiller votre présence.
            </p>
            <div className="flex flex-col items-center gap-5">
              <Link
                to="/shop"
                className="inline-block bg-primary text-primary-foreground px-10 py-4 text-brand text-[11px] tracking-[0.15em] hover:opacity-80 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Explorer la Boutique
              </Link>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground pt-4">
                <Link to="/mysticlov" className="hover:text-foreground transition-colors">MysticLov</Link>
                <Link to="/powerlov" className="hover:text-foreground transition-colors">PowerLov</Link>
                <Link to="/stonelov" className="hover:text-foreground transition-colors">StoneLov</Link>
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <header className="text-center mb-14 md:mb-20">
              <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-4">Panier</p>
              <h1 className="text-3xl md:text-4xl font-light tracking-tight">
                Votre sélection
              </h1>
              <p className="text-[11px] tracking-[0.1em] text-muted-foreground mt-3">
                {count} {count > 1 ? 'pièces' : 'pièce'}
              </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 lg:gap-24">
              {/* Products */}
              <section aria-label="Articles du panier">
                <ul className="divide-y divide-border border-t border-border">
                  {items.map((item) => {
                    const image = item.product.node.images?.edges?.[0]?.node?.url;
                    const title = item.product.node.title;
                    const price = parseFloat(item.price.amount).toFixed(0);
                    const optionsLabel = item.selectedOptions.map((o) => o.value).join(' · ');

                    return (
                      <li key={item.variantId} className="flex gap-6 md:gap-8 py-8 md:py-10">
                        <Link
                          to={`/product/${item.product.node.handle}`}
                          className="w-24 md:w-32 aspect-[3/4] bg-secondary overflow-hidden flex-shrink-0"
                          aria-label={`Voir ${title}`}
                        >
                          {image ? (
                            <img src={image} alt={title} className="w-full h-full object-cover" loading="lazy" />
                          ) : (
                            <div className="w-full h-full bg-secondary" />
                          )}
                        </Link>

                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div className="flex justify-between gap-4">
                            <div className="min-w-0">
                              <Link
                                to={`/product/${item.product.node.handle}`}
                                className="text-sm md:text-base font-light tracking-wide hover:opacity-70 transition-opacity block truncate"
                              >
                                {title}
                              </Link>
                              {optionsLabel && (
                                <p className="text-[11px] tracking-[0.05em] text-muted-foreground mt-2">
                                  {optionsLabel}
                                </p>
                              )}
                            </div>
                            <p className="text-sm font-light whitespace-nowrap">{formatEuro(parseFloat(price))}</p>
                          </div>

                          <div className="flex items-end justify-between mt-6">
                            <div
                              className="inline-flex items-center border border-border"
                              role="group"
                              aria-label="Quantité"
                            >
                              <button
                                onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                                className="p-2.5 hover:bg-secondary transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-primary"
                                aria-label="Diminuer la quantité"
                              >
                                <Minus size={11} strokeWidth={1.5} />
                              </button>
                              <span className="text-xs w-8 text-center tabular-nums" aria-live="polite">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                className="p-2.5 hover:bg-secondary transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-primary"
                                aria-label="Augmenter la quantité"
                              >
                                <Plus size={11} strokeWidth={1.5} />
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.variantId)}
                              className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5 focus-visible:outline focus-visible:outline-1 focus-visible:outline-primary"
                              aria-label={`Retirer ${title} du panier`}
                            >
                              <Trash2 size={12} strokeWidth={1.25} />
                              Retirer
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}

                  {localItems.map((item) => {
                    const image = getLocalImage(item.product.image);
                    return (
                      <li key={item.product.id} className="flex gap-6 md:gap-8 py-8 md:py-10">
                        <Link
                          to={`/shop/${item.product.id}`}
                          className="w-24 md:w-32 aspect-[3/4] bg-secondary overflow-hidden flex-shrink-0"
                        >
                          {image ? (
                            <img src={image} alt={item.product.name} className="w-full h-full object-cover" loading="lazy" />
                          ) : (
                            <div className="w-full h-full bg-secondary" />
                          )}
                        </Link>
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div className="flex justify-between gap-4">
                            <Link
                              to={`/shop/${item.product.id}`}
                              className="text-sm md:text-base font-light tracking-wide hover:opacity-70 transition-opacity block truncate"
                            >
                              {item.product.name}
                            </Link>
                            <p className="text-sm font-light whitespace-nowrap">{formatEuro(item.product.price)}</p>
                          </div>
                          <div className="flex items-end justify-between mt-6">
                            <div className="inline-flex items-center border border-border" role="group" aria-label="Quantité">
                              <button
                                onClick={() => updateLocalQty(item.product.id, item.quantity - 1)}
                                className="p-2.5 hover:bg-secondary transition-colors"
                                aria-label="Diminuer la quantité"
                              >
                                <Minus size={11} strokeWidth={1.5} />
                              </button>
                              <span className="text-xs w-8 text-center tabular-nums">{item.quantity}</span>
                              <button
                                onClick={() => updateLocalQty(item.product.id, item.quantity + 1)}
                                className="p-2.5 hover:bg-secondary transition-colors"
                                aria-label="Augmenter la quantité"
                              >
                                <Plus size={11} strokeWidth={1.5} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                              aria-label={`Retirer ${item.product.name}`}
                            >
                              <Trash2 size={12} strokeWidth={1.25} />
                              Retirer
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-10 text-center lg:text-left">
                  <Link
                    to="/shop"
                    className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ← Continuer mes achats
                  </Link>
                </div>
              </section>

              {/* Summary */}
              <aside aria-label="Récapitulatif de commande" className="lg:sticky lg:top-32 lg:self-start">
                <div className="border border-border p-8 md:p-10 bg-background">
                  <h2 className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-8">
                    Récapitulatif
                  </h2>

                  {!isFreeShipping(total) && total > 0 && (
                    <div className="mb-8">
                      <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
                        Plus que <span className="text-foreground">{formatEuro(getRemainingForFreeShipping(total))}</span> pour la livraison offerte
                      </p>
                      <div className="h-px bg-border relative overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 bg-foreground transition-all duration-500"
                          style={{ width: `${progress}%` }}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  )}

                  <dl className="space-y-4">
                    <div className="flex justify-between text-[12px]">
                      <dt className="text-muted-foreground tracking-[0.05em]">Sous-total</dt>
                      <dd className="tabular-nums">{formatEuro(total)}</dd>
                    </div>
                    <div className="flex justify-between text-[12px]">
                      <dt className="text-muted-foreground tracking-[0.05em]">Livraison</dt>
                      <dd className="tabular-nums">
                        {isFreeShipping(total) ? 'Offerte' : formatEuro(SHIPPING_FEE)}
                      </dd>
                    </div>
                    <div className="flex justify-between text-[12px]">
                      <dt className="text-muted-foreground tracking-[0.05em]">Taxes</dt>
                      <dd className="text-muted-foreground">Incluses</dd>
                    </div>
                    <div className="pt-5 mt-5 border-t border-border flex justify-between items-baseline">
                      <dt className="text-brand text-xs tracking-[0.1em]">Total</dt>
                      <dd className="text-lg font-light tabular-nums">
                        {formatEuro(total + getShippingFee(total))}
                      </dd>
                    </div>
                  </dl>

                  <button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="mt-10 w-full bg-primary text-primary-foreground py-4 text-brand text-[11px] tracking-[0.2em] hover:opacity-85 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {isLoading ? <Loader2 className="animate-spin" size={14} /> : 'Passer la Commande'}
                  </button>

                  <p className="mt-4 text-center text-[10px] tracking-[0.1em] text-muted-foreground inline-flex items-center justify-center gap-1.5 w-full">
                    <Lock size={10} strokeWidth={1.5} />
                    Paiement sécurisé
                  </p>

                  <Reassurance />
                </div>
              </aside>
            </div>

            {/* Sticky mobile CTA */}
            <div className="lg:hidden fixed bottom-0 inset-x-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 z-40">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground">Total</span>
                <span className="text-sm font-light tabular-nums">
                  {formatEuro(total + getShippingFee(total))}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground py-3.5 text-brand text-[11px] tracking-[0.2em] hover:opacity-85 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="animate-spin" size={14} /> : 'Passer la Commande'}
              </button>
            </div>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
