import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useCartStore } from '@/stores/cartStore';
import { fetchShopifyProductByHandle } from '@/lib/shopify';
import { toast } from '@/hooks/use-toast';
import ColorSwatches from '@/components/ColorSwatches';
import { detectStones } from '@/data/stoneMeanings';

const imageModules = {
  ...(import.meta.glob('@/assets/**/*.jpg', { eager: true, import: 'default' }) as Record<string, string>),
  ...(import.meta.glob('@/assets/**/*.jpeg', { eager: true, import: 'default' }) as Record<string, string>),
  ...(import.meta.glob('@/assets/**/*.webp', { eager: true, import: 'default' }) as Record<string, string>),
  ...(import.meta.glob('@/assets/**/*.png', { eager: true, import: 'default' }) as Record<string, string>),
};
const getImage = (key: string) => {
  const m = Object.entries(imageModules).find(([p]) => p.includes(key));
  return m ? m[1] : '';
};

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const SANS = "'Inter', 'Instrument Sans', Arial, sans-serif";

const universeConfig = {
  mystic: { label: 'MYSTICLOV', accent: '#C9A84C', back: '/shop?collection=mystic', backLabel: 'MysticLov' },
  standard: { label: 'POWERLOV', accent: '#E63946', back: '/shop?collection=standard', backLabel: 'PowerLov' },
  bijoux: { label: 'STONELOV', accent: '#C4714A', back: '/shop?collection=bijoux', backLabel: 'StoneLov' },
} as const;

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const Accordion = ({ title, children, defaultOpen }: AccordionProps) => {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="border-b border-[#E8E4DD]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
        style={{ fontFamily: SANS, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1A1A1A' }}
      >
        <span>{title}</span>
        <ChevronDown size={14} strokeWidth={1.2} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div style={{ maxHeight: open ? 800 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
        <div className="pb-6" style={{ fontFamily: SANS, fontSize: 13, lineHeight: 1.8, color: '#5F5E5A' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

interface Props {
  product: Product;
}

const ProductPage = ({ product }: Props) => {
  const location = useLocation();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  const addShopifyItem = useCartStore((s) => s.addItem);

  const cfg = universeConfig[product.collection];
  const isJewelry = product.collection === 'bijoux';
  const allImages = [product.image, ...(product.gallery || [])];
  const backLink = typeof location.state?.from === 'string' ? location.state.from : cfg.back;

  // Stock: only shown when explicit data exists ≤ 5. No invented value.
  const stock: number | null = null;

  const handleAddToCart = async () => {
    if (!product.shopifyHandle) {
      addToCart(product);
      toast({ title: 'Ajouté au panier', description: product.name });
      return;
    }
    setIsAdding(true);
    try {
      const sp = await fetchShopifyProductByHandle(product.shopifyHandle);
      if (!sp) {
        toast({ title: 'Produit indisponible', description: 'Réessayez dans un instant.' });
        return;
      }
      const variants = sp.variants.edges.map((e) => e.node);
      const hasSize = sp.options.some((o) => /taille|size/i.test(o.name));
      const hasColor = sp.options.some((o) => /couleur|color/i.test(o.name));
      const variant =
        variants.find((v) => {
          const colorOk = !hasColor || !product.shopifyColor || v.selectedOptions.some((o) => o.value === product.shopifyColor);
          const sizeOk = !hasSize || isJewelry || v.selectedOptions.some((o) => o.value === selectedSize);
          return v.availableForSale && colorOk && sizeOk;
        }) || variants.find((v) => v.availableForSale) || variants[0];
      if (!variant) {
        toast({ title: 'Aucune variante disponible' });
        return;
      }
      await addShopifyItem({
        product: { node: sp },
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
        selectedOptions: variant.selectedOptions,
      });
      toast({ title: 'Ajouté au panier', description: product.name });
    } catch (err) {
      console.error('Add to cart failed', err);
      toast({ title: 'Erreur', description: "Impossible d'ajouter au panier." });
    } finally {
      setIsAdding(false);
    }
  };

  const stones = isJewelry ? detectStones(`${product.name} ${product.description} ${product.details ?? ''}`) : [];

  return (
    <main className="bg-white pt-36 pb-16 px-6 md:px-12" style={{ fontFamily: SANS }}>
      <Link
        to={backLink}
        className="text-xs opacity-50 hover:opacity-100 transition-opacity mb-8 inline-block mt-8 md:mt-10"
        style={{ color: '#1A1A1A', letterSpacing: '0.1em' }}
      >
        ← Retour à {cfg.backLabel}
      </Link>

      {/* Top: 2 columns desktop, 1 column mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 max-w-6xl mx-auto">
        {/* Gallery */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <div className="aspect-[3/4] overflow-hidden bg-[#FAFAF8] mb-3">
            <img src={getImage(allImages[activeImage])} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {allImages.length > 1 && (
            <div className="flex gap-2 flex-wrap">
              {allImages.map((img, i) => (
                <button
                  key={img + i}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square w-16 md:w-20 overflow-hidden bg-[#FAFAF8] border transition-all ${
                    activeImage === i ? 'border-[#1A1A1A]' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={getImage(img)} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Purchase block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col justify-start md:pt-4"
        >
          <p
            className="mb-4"
            style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.25em', color: cfg.accent, fontWeight: 500 }}
          >
            {cfg.label}
          </p>
          <h1
            className="mb-4 leading-[1.05]"
            style={{ fontFamily: SANS, fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 500, color: '#1A1A1A', letterSpacing: '-0.01em' }}
          >
            {product.name}
          </h1>
          <p
            className="italic mb-8"
            style={{ fontFamily: SERIF, fontSize: 16, color: '#5F5E5A', lineHeight: 1.5 }}
          >
            {product.details}
          </p>

          <p className="mb-1" style={{ fontFamily: SANS, fontSize: 20, fontWeight: 500, color: '#1A1A1A' }}>
            €{product.price}
          </p>
          <p className="italic mb-8" style={{ fontFamily: SANS, fontSize: 11, color: '#888780' }}>
            4x sans frais avec Alma
          </p>

          <ColorSwatches product={product} />

          {!isJewelry && (
            <div className="mb-3">
              <p className="mb-3 uppercase" style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.18em', color: '#888780' }}>
                Taille
              </p>
              <div className="flex gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-11 h-11 text-[11px] border transition-colors ${
                      selectedSize === s
                        ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                        : 'bg-white text-[#1A1A1A] border-[#E8E4DD] hover:border-[#1A1A1A]'
                    }`}
                    style={{ fontFamily: SANS }}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {stock !== null && stock <= 5 && (
                <p className="mt-3" style={{ fontFamily: SANS, fontSize: 11, color: '#C0392B' }}>
                  Plus que {stock} en stock
                </p>
              )}
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full mt-6 transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{
              backgroundColor: '#1A1A1A',
              color: '#FFFFFF',
              padding: '16px',
              fontFamily: SANS,
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            {isAdding ? 'Ajout en cours…' : 'Ajouter au panier'}
          </button>

          {/* Reassurance — single occurrence */}
          <div
            className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-6"
            style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.1em', color: '#888780', textTransform: 'uppercase' }}
          >
            <span>Livraison offerte dès 99€</span>
            <span aria-hidden>·</span>
            <span>Retours 14 jours</span>
            <span aria-hidden>·</span>
            <span>Paris</span>
          </div>
        </motion.div>
      </div>

      {/* Récit — full width below */}
      <section className="max-w-3xl mx-auto mt-24 md:mt-32 text-center px-2">
        <p
          className="mb-6 uppercase"
          style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.3em', color: cfg.accent, fontWeight: 500 }}
        >
          Le Récit
        </p>
        <p
          style={{ fontFamily: SERIF, fontSize: 'clamp(18px, 2vw, 22px)', lineHeight: 1.7, color: '#2A2A2A', fontWeight: 300 }}
        >
          {product.description}
        </p>
      </section>

      {/* Details accordions */}
      <section className="max-w-3xl mx-auto mt-20">
        <Accordion title="Matière & fabrication" defaultOpen>
          {isJewelry ? (
            <ul className="list-none p-0 space-y-1">
              <li>· Monture en laiton doré</li>
              <li>· Pierre naturelle</li>
              <li>· {product.name.toLowerCase().includes('bracelet') ? 'Poids : environ 30g' : 'Poids : environ 100g'}</li>
            </ul>
          ) : product.collection === 'mystic' ? (
            <p>Broderie dorée main · Coton premium · Fabriqué à Paris.</p>
          ) : (
            <p>Coton lourd 280g, coupe oversize. Sérigraphie en France. Unisex.</p>
          )}
        </Accordion>

        <Accordion title="Coupe & fit">
          {isJewelry ? (
            <p>{product.name.toLowerCase().includes('bracelet') ? 'Bracelet ajustable au poignet.' : 'Longueur ajustable : 42 — 48 cm.'}</p>
          ) : (
            <p>Coupe oversize unisex. Tailles XS à XL.</p>
          )}
        </Accordion>

        <Accordion title="Entretien">
          {isJewelry ? (
            <p>Éviter le contact avec l'eau, les parfums et les produits chimiques. Ranger à plat dans la pochette d'origine.</p>
          ) : (
            <p>Lavage à 30°C sur l'envers. Ne pas utiliser de sèche-linge. Repasser à l'envers, sans toucher la broderie ou la sérigraphie.</p>
          )}
        </Accordion>

        <Accordion title="Livraison & retours">
          <ul className="list-none p-0 space-y-1">
            <li>· Livraison standard : 3 à 5 jours ouvrés — 9,90€</li>
            <li>· Livraison offerte dès 99€ d'achat</li>
            <li>· Retours acceptés sous 14 jours</li>
            <li>· La pièce doit être retournée dans son emballage d'origine, non portée</li>
          </ul>
        </Accordion>

        {isJewelry && stones.length > 0 && (
          <Accordion title="L'énergie de la pierre">
            <ul className="list-none p-0 m-0 space-y-4">
              {stones.map((s) => (
                <li key={s.key}>
                  <p
                    className="mb-1"
                    style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.18em', color: cfg.accent, fontWeight: 600, textTransform: 'uppercase' }}
                  >
                    {s.name}
                  </p>
                  <p className="italic m-0" style={{ fontFamily: SERIF, fontSize: 14, lineHeight: 1.7 }}>{s.meaning}</p>
                </li>
              ))}
            </ul>
          </Accordion>
        )}
      </section>
    </main>
  );
};

export default ProductPage;
