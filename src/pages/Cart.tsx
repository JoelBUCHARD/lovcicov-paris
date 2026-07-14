import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Minus, Plus, Loader2, ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';
import { useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JourneyContinuation from '@/components/JourneyContinuation';
import SEO from '@/components/SEO';
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
import { standardProducts, mysticProducts, bijouxProducts } from '@/data/products';
import { resolveProductImage } from '@/lib/productImage';
import { useProductVisibility, localKey } from '@/hooks/useProductVisibility';

const imageModulesJpg = import.meta.glob('@/assets/*.jpg', { eager: true, import: 'default' }) as Record<string, string>;
const imageModulesWebp = import.meta.glob('@/assets/*.webp', { eager: true, import: 'default' }) as Record<string, string>;
const imageModulesPng = import.meta.glob('@/assets/*.png', { eager: true, import: 'default' }) as Record<string, string>;
const localImages = { ...imageModulesJpg, ...imageModulesWebp, ...imageModulesPng };
const getLocalImage = (key: string) => {
  const match = Object.entries(localImages).find(([path]) => path.includes(key));
  return match ? match[1] : '';
};

const Cart = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    isLoading,
    getCheckoutUrl,
    totalPrice,
    totalItems,
  } = useCartStore();
  const {
    items: localItems,
    removeFromCart,
    updateQuantity: updateLocalQty,
    totalItems: localTotal,
    totalPrice: localPriceTotal,
  } = useCart();

  const subtotal = totalPrice() + localPriceTotal;
  const count = totalItems() + localTotal;
  const shipping = getShippingFee(subtotal);
  const grandTotal = subtotal + shipping;
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remaining = getRemainingForFreeShipping(subtotal);

  const { isVisible } = useProductVisibility();

  // Curated cross-sell — same catalog as the shop, only currently online pieces,
  // avoid what's already in the cart, cap at 3.
  const suggestions = useMemo(() => {
    const inCartIds = new Set(localItems.map(i => i.product.id));
    const all = [...standardProducts, ...mysticProducts, ...bijouxProducts];
    return all
      .filter(p => isVisible(localKey(p.id)))
      .filter(p => !inCartIds.has(p.id))
      .slice(0, 3);
  }, [localItems, isVisible]);


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

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Panier — LOVCICOV Paris" description="Votre panier LOVCICOV Paris." path="/cart" noindex />
      <Navbar />


      <main className="pt-28 md:pt-40 pb-32 px-4 md:px-12">
        {count === 0 ? (
          // ————————————————————— EMPTY STATE —————————————————————
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl mx-auto pt-16 md:pt-28 text-center"
            aria-labelledby="empty-cart-heading"
          >
            <p className="text-[10px] tracking-[0.35em] text-muted-foreground uppercase mb-8">
              Votre Sélection
            </p>
            <h1
              id="empty-cart-heading"
              className="text-3xl md:text-[42px] font-light leading-tight mb-6"
            >
              Aucune pièce<br />ne vous accompagne encore.
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto mb-12">
              Chaque création LOVCICOV est pensée comme un talisman.
              Découvrez la pièce qui vous ressemble.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-primary text-primary-foreground px-10 py-4 text-[11px] tracking-[0.25em] uppercase hover:opacity-80 transition-opacity"
            >
              Découvrir la Boutique
            </Link>
            <div className="mt-16 flex items-center justify-center gap-8 text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
              <Link to="/collection/powerlov" className="hover:text-foreground transition-colors">PowerLov</Link>
              <span className="w-px h-3 bg-border" />
              <Link to="/collection/mysticlov" className="hover:text-foreground transition-colors">MysticLov</Link>
              <span className="w-px h-3 bg-border" />
              <Link to="/collection/stonelov" className="hover:text-foreground transition-colors">StoneLov</Link>
            </div>
          </motion.section>
        ) : (
          // ————————————————————— CART WITH ITEMS —————————————————————
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <header className="text-center mb-16 md:mb-20">
              <p className="inline-block text-[10px] tracking-[0.35em] text-muted-foreground uppercase mb-4 px-[0.35em]">
                Votre Sélection
              </p>
              <h1 className="text-3xl md:text-[38px] font-light leading-tight">
                Panier
              </h1>
              <p className="text-xs text-muted-foreground mt-3">
                {count} {count > 1 ? 'pièces' : 'pièce'}
              </p>
            </header>


            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-20">
              {/* ————————— PRODUCTS ————————— */}
              <section aria-label="Articles du panier">
                <AnimatePresence mode="popLayout">
                  {items.map((item) => {
                    const image = item.product.node.images?.edges?.[0]?.node?.url;
                    const title = item.product.node.title;
                    const price = parseFloat(item.price.amount);
                    const size = item.selectedOptions.find(o => o.name.toLowerCase().includes('taille') || o.name.toLowerCase().includes('size'))?.value;
                    const color = item.selectedOptions.find(o => o.name.toLowerCase().includes('couleur') || o.name.toLowerCase().includes('color'))?.value;

                    return (
                      <motion.article
                        key={item.variantId}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="flex gap-6 md:gap-8 py-10 border-b border-border first:pt-0"
                      >
                        <Link
                          to={`/product/${item.product.node.handle}`}
                          className="w-24 md:w-32 aspect-[3/4] bg-secondary overflow-hidden flex-shrink-0 group"
                        >
                          {image ? (
                            <img
                              src={image}
                              alt={title}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                            />
                          ) : (
                            <div className="w-full h-full bg-secondary" />
                          )}
                        </Link>

                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <Link
                              to={`/product/${item.product.node.handle}`}
                              className="text-sm md:text-base font-light tracking-wide hover:opacity-70 transition-opacity block leading-snug"
                            >
                              {title}
                            </Link>
                            <div className="mt-2 space-y-0.5 text-[11px] tracking-wide text-muted-foreground">
                              {color && <p>Coloris — {color}</p>}
                              {size && <p>Taille — {size}</p>}
                            </div>
                          </div>

                          <div className="flex items-end justify-between mt-6 gap-4">
                            <div className="inline-flex items-center border border-border">
                              <button
                                onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                                aria-label="Diminuer la quantité"
                                className="p-3 min-h-11 min-w-11 flex items-center justify-center hover:bg-secondary active:scale-[0.96] transition-all focus-visible:outline focus-visible:outline-1 focus-visible:outline-foreground"
                              >
                                <Minus size={13} strokeWidth={1.5} />
                              </button>
                              <span className="text-xs w-8 text-center tabular-nums">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                aria-label="Augmenter la quantité"
                                className="p-3 min-h-11 min-w-11 flex items-center justify-center hover:bg-secondary active:scale-[0.96] transition-all focus-visible:outline focus-visible:outline-1 focus-visible:outline-foreground"
                              >
                                <Plus size={13} strokeWidth={1.5} />
                              </button>
                            </div>
                            <div className="flex items-center gap-5">
                              <p className="text-sm font-light tabular-nums">
                                {formatEuro(price * item.quantity)}
                              </p>
                              <button
                                onClick={() => removeItem(item.variantId)}
                                aria-label={`Retirer ${title}`}
                                className="text-muted-foreground hover:text-foreground transition-colors p-2 min-h-11 min-w-11 flex items-center justify-center"
                              >
                                <Trash2 size={14} strokeWidth={1.3} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}

                  {localItems.map((item) => {
                    const image = getLocalImage(item.product.image);
                    return (
                      <motion.article
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="flex gap-6 md:gap-8 py-10 border-b border-border"
                      >
                        <Link
                          to={`/shop/${item.product.id}`}
                          className="w-24 md:w-32 aspect-[3/4] bg-secondary overflow-hidden flex-shrink-0 group"
                        >
                          {image ? (
                            <img
                              src={image}
                              alt={item.product.name}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                            />
                          ) : (
                            <div className="w-full h-full bg-secondary" />
                          )}
                        </Link>
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <Link
                              to={`/shop/${item.product.id}`}
                              className="text-sm md:text-base font-light tracking-wide hover:opacity-70 transition-opacity block leading-snug"
                            >
                              {item.product.name}
                            </Link>
                            <p className="mt-2 text-[11px] tracking-wide text-muted-foreground">Édition Signature</p>
                          </div>
                          <div className="flex items-end justify-between mt-6 gap-4">
                            <div className="inline-flex items-center border border-border">
                              <button
                                onClick={() => updateLocalQty(item.product.id, item.quantity - 1)}
                                aria-label="Diminuer la quantité"
                                className="p-3 min-h-11 min-w-11 flex items-center justify-center hover:bg-secondary active:scale-[0.96] transition-all"
                              >
                                <Minus size={13} strokeWidth={1.5} />
                              </button>
                              <span className="text-xs w-8 text-center tabular-nums">{item.quantity}</span>
                              <button
                                onClick={() => updateLocalQty(item.product.id, item.quantity + 1)}
                                aria-label="Augmenter la quantité"
                                className="p-3 min-h-11 min-w-11 flex items-center justify-center hover:bg-secondary active:scale-[0.96] transition-all"
                              >
                                <Plus size={13} strokeWidth={1.5} />
                              </button>
                            </div>
                            <div className="flex items-center gap-5">
                              <p className="text-sm font-light tabular-nums">
                                {formatEuro(item.product.price * item.quantity)}
                              </p>
                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                aria-label={`Retirer ${item.product.name}`}
                                className="text-muted-foreground hover:text-foreground transition-colors p-2 min-h-11 min-w-11 flex items-center justify-center"
                              >
                                <Trash2 size={14} strokeWidth={1.3} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </section>

              {/* ————————— ORDER SUMMARY ————————— */}
              <aside className="lg:sticky lg:top-32 h-fit" aria-label="Récapitulatif de la commande">
                <div className="bg-secondary/40 p-8 md:p-10">
                  <h2 className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground mb-8">
                    Récapitulatif
                  </h2>

                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sous-total</span>
                      <span className="tabular-nums">{formatEuro(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Livraison</span>
                      <span className="tabular-nums">
                        {isFreeShipping(subtotal) ? 'Offerte' : formatEuro(SHIPPING_FEE)}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      TVA incluse. Taxes calculées à la validation.
                    </p>
                  </div>

                  <div className="h-px bg-border my-6" />

                  <div className="flex justify-between items-baseline mb-8">
                    <span className="text-xs tracking-[0.2em] uppercase">Total</span>
                    <span className="text-xl font-light tabular-nums">{formatEuro(grandTotal)}</span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="w-full bg-primary text-primary-foreground py-5 min-h-[56px] text-[12px] tracking-[0.25em] uppercase hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                  >
                    {isLoading ? <Loader2 className="animate-spin" size={14} /> : 'Passer la Commande'}
                  </button>

                  <Link
                    to="/shop"
                    className="block text-center mt-5 py-3 min-h-11 text-[11px] tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Continuer mes Achats
                  </Link>


                  <div className="mt-8 pt-6 border-t border-border/60 space-y-2.5 text-[11px] leading-relaxed text-muted-foreground">
                    <p><span className="text-foreground">Livraison</span> — expédié sous 24 à 48 h depuis Paris, offert dès 99 €.</p>
                    <p><span className="text-foreground">Retours</span> — 14 jours pour changer d'avis, sans justification.</p>
                    <p><span className="text-foreground">Paiement</span> — Visa, Mastercard, Amex, Apple&nbsp;Pay. Transactions cryptées.</p>
                    <p>
                      <span className="text-foreground">Une question&nbsp;?</span>{' '}
                      <a
                        href="https://wa.me/33786386782"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 hover:text-foreground transition-colors"
                      >
                        Écrivez-nous
                      </a>
                      , une conseillère vous répond.
                    </p>
                  </div>
                </div>


              </aside>
            </div>

            {/* ————————— CROSS-SELL ————————— */}
            {suggestions.length > 0 && (
              <section className="mt-16 md:mt-20" aria-labelledby="curation-heading">
                <div className="text-center mb-14">
                  <p className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground mb-3">
                    Notre Sélection
                  </p>
                  <h2 id="curation-heading" className="text-2xl md:text-3xl font-light">
                    Complétez votre écrin
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
                  {suggestions.map((product) => (
                    <Link
                      key={product.id}
                      to={`/shop/${product.id}`}
                      className="group text-center"
                    >
                      <div className="aspect-[3/4] bg-secondary overflow-hidden mb-5">
                        <img
                          src={resolveProductImage(product.image)}
                          alt={product.name}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                      <p className="text-xs tracking-[0.15em] uppercase font-light">{product.name}</p>
                      <p className="text-xs text-muted-foreground mt-2 tabular-nums">{formatEuro(product.price)}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </motion.div>
        )}
      </main>

      <JourneyContinuation />
      <Footer />
    </div>
  );
};

export default Cart;
