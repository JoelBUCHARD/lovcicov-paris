import { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Heart, Truck, ShieldCheck, RotateCcw, MessageCircle, X, ZoomIn } from 'lucide-react';
import { Product, products as allProducts } from '@/data/products';
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
const assetJsonModules = import.meta.glob('@/assets/**/*.asset.json', { eager: true }) as Record<string, { url?: string; default?: { url?: string } }>;
const getImage = (key: string) => {
  if (!key) return '';
  const m = Object.entries(imageModules).find(([p]) => p.includes(key));
  if (m) return m[1];
  const j = Object.entries(assetJsonModules).find(([p]) => p.includes(key));
  if (j) {
    const mod = j[1] as any;
    return (mod.default?.url ?? mod.url) || '';
  }
  return '';
};

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const SANS = "'Inter', 'Instrument Sans', Arial, sans-serif";

const universeConfig = {
  mystic: { label: 'MYSTICLOV', accent: '#C9A84C', back: '/mysticlov/shop', backLabel: 'MysticLov', recitBg: '#F8F5EE' },
  standard: { label: 'POWERLOV', accent: '#E63946', back: '/powerlov/shop', backLabel: 'PowerLov', recitBg: '#FAF6F4' },
  bijoux: { label: 'STONELOV', accent: '#C4714A', back: '/stonelov/shop', backLabel: 'StoneLov', recitBg: '#F6F1EB' },
  sacs: { label: 'SACS LOVCICOV', accent: '#8B6A4A', back: '/sacs', backLabel: 'Sacs', recitBg: '#F6F1EB' },
} as const;

// ─── Helpers: separate story (récit) from technical specs (material) ───
// Reuses existing product fields. Never invents copy.

const TECH_TAIL_RE = /(Broderie dor[ée]e main|Coton premium|Coton lourd|Sweat à capuche|Poids\s*:|Triple rang|Double rang|Sérigraphie|Intercalaires)/i;

const splitStoryAndSpecs = (text: string): { story: string; specs: string } => {
  if (!text) return { story: '', specs: '' };
  const sentences = text.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter(Boolean);
  const storyParts: string[] = [];
  const specParts: string[] = [];
  for (const s of sentences) {
    if (TECH_TAIL_RE.test(s)) specParts.push(s);
    else storyParts.push(s);
  }
  return { story: storyParts.join(' '), specs: specParts.join(' ') };
};

const getRecit = (product: Product): string => {
  const { story } = splitStoryAndSpecs(product.description);
  // PowerLov: description is mostly tech → use details (already a real editorial line)
  if (product.collection === 'standard') {
    return product.details || story || product.description;
  }
  // Mystic / Bijoux: description IS the editorial story
  return story || product.details || product.description;
};

const getMaterial = (product: Product): string => {
  const { specs } = splitStoryAndSpecs(product.description);
  // Love t-shirts (MysticLov) : description matière enrichie
  if (product.collection === 'mystic' && product.subcategory === 'tshirt') {
    return "Coton 100% premium peigné, tissé dans un grammage lourd de 240 g/m² pour une tenue structurée qui ne se déforme pas au fil des lavages. Un toucher dense et soyeux, une opacité parfaite et une coupe oversize unisexe qui tombe droite sur le corps. Encolure côtelée renforcée, épaules tombées, finitions surpiquées. Broderie LOVE dorée signature, fil doré métallisé.";
  }
  if (specs) return specs;
  // Fallbacks by universe (existing site copy, not invented)
  if (product.collection === 'mystic') return 'Broderie dorée main · Coton premium · Fabriqué à Paris.';
  if (product.collection === 'standard') return 'Coton lourd 280g, coupe oversize. Sérigraphie en France. Unisex.';
  return product.description;
};

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
  const [wishlisted, setWishlisted] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const { addToCart } = useCart();
  const addShopifyItem = useCartStore((s) => s.addItem);

  const cfg = universeConfig[product.collection];
  const isJewelry = product.collection === 'bijoux';
  const allImages = [product.image, ...(product.gallery || [])];
  const backLink = typeof location.state?.from === 'string' ? location.state.from : cfg.back;

  const recit = getRecit(product);
  const material = getMaterial(product);
  const stones = isJewelry ? detectStones(`${product.name} ${product.description} ${product.details ?? ''}`) : [];

  // Stock: only shown when explicit data exists ≤ 5. No invented value.
  const stock: number | null = null;

  // Complete the look — up to 3 sibling pieces from the same universe
  const completeTheLook = useMemo(
    () =>
      allProducts
        .filter((p) => p.collection === product.collection && p.id !== product.id)
        .slice(0, 3),
    [product.id, product.collection]
  );

  // Sticky mobile CTA: show after user scrolls past the primary buy button
  useEffect(() => {
    const onScroll = () => setShowStickyCta(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lightbox keyboard: Esc to close, arrows to navigate
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') setActiveImage((i) => (i + 1) % allImages.length);
      if (e.key === 'ArrowLeft') setActiveImage((i) => (i - 1 + allImages.length) % allImages.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, allImages.length]);


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

  const reassurance = [
    { Icon: Truck, label: 'Livraison offerte dès 99€' },
    { Icon: ShieldCheck, label: 'Paiement sécurisé' },
  ];

  return (
    <main className="bg-white pt-36 pb-16 px-6 md:px-12" style={{ fontFamily: SANS }}>
      <div className="max-w-[1100px] mx-auto">
        <Link
          to={backLink}
          className="text-xs opacity-50 hover:opacity-100 transition-opacity mb-8 inline-block mt-8 md:mt-10"
          style={{ color: '#1A1A1A', letterSpacing: '0.1em' }}
        >
          Retour à {cfg.backLabel}
        </Link>
      </div>

      {/* Top: 2 columns desktop, 1 column mobile */}
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(380px,440px)] gap-10 md:gap-16 max-w-[1100px] mx-auto">

        {/* Gallery: vertical thumbs + main image (desktop) — with lightbox zoom */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <div className="flex gap-4">
            {allImages.length > 1 && (
              <div className="hidden md:flex flex-col gap-2 w-16 shrink-0">
                {allImages.map((img, i) => (
                  <button
                    key={img + i}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square overflow-hidden bg-white border transition-all ${
                      activeImage === i ? 'border-[#1A1A1A]' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    aria-label={`Image ${i + 1}`}
                  >
                  <img src={getImage(img)} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="relative flex-1 aspect-[3/4] overflow-hidden bg-white group md:min-h-[640px] cursor-zoom-in text-left"
              aria-label="Agrandir l'image"
            >
              <img
                src={getImage(allImages[activeImage])}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                style={{ objectPosition: 'center center' }}
                loading="eager"
              />
              <span className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm p-2 rounded-full">
                <ZoomIn size={14} strokeWidth={1.2} className="text-[#1A1A1A]" />
              </span>
            </button>
          </div>
          {/* Mobile thumbnails */}
          {allImages.length > 1 && (
            <div className="flex md:hidden gap-2 mt-3 flex-wrap">
              {allImages.map((img, i) => (
                <button
                  key={img + i + '-m'}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square w-16 overflow-hidden bg-white border transition-all ${
                    activeImage === i ? 'border-[#1A1A1A]' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={getImage(img)} alt="" className="w-full h-full object-contain" />
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
            className="mb-6 leading-[1.05]"
            style={{ fontFamily: SANS, fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 500, color: '#1A1A1A', letterSpacing: '-0.01em' }}
          >
            {product.name}
          </h1>

          <p className="mb-1" style={{ fontFamily: SANS, fontSize: 20, fontWeight: 500, color: '#1A1A1A' }}>
            €{product.price}
          </p>
          <p className="italic mb-3" style={{ fontFamily: SANS, fontSize: 11, color: '#888780' }}>
            4x sans frais avec Alma
          </p>
          {product.collection === 'mystic' && product.subcategory === 'tshirt' && (
            <p
              className="mb-8 pt-3 border-t border-[#EDE9E2] max-w-[420px]"
              style={{ fontFamily: SANS, fontSize: 12, lineHeight: 1.65, color: '#6B6A65' }}
            >
              Coton 100% peigné, grammage lourd 240&nbsp;g/m². Coupe oversize unisexe, épaules tombées, encolure côtelée. Broderie LOVE dorée signature.
            </p>
          )}
          {product.collection === 'mystic' && product.subcategory === 'hoodie' && (
            <p
              className="mb-8 pt-3 border-t border-[#EDE9E2] max-w-[420px]"
              style={{ fontFamily: SANS, fontSize: 12, lineHeight: 1.65, color: '#6B6A65' }}
            >
              Molleton de coton brossé 400&nbsp;g/m², doux à l'intérieur et structuré à l'extérieur. Coupe oversize unisexe, épaules tombées, capuche doublée, cordons plats, poche kangourou. Bords-côtes renforcés au col, poignets et ourlet. Broderie LOVE dorée signature.
            </p>
          )}
          {!(product.collection === 'mystic' && (product.subcategory === 'tshirt' || product.subcategory === 'hoodie')) && (
            <p
              className="mb-8 pt-3 border-t border-[#EDE9E2] max-w-[420px]"
              style={{ fontFamily: SANS, fontSize: 12, lineHeight: 1.65, color: '#6B6A65' }}
            >
              {product.collection === 'bijoux'
                ? 'Pierres naturelles montées à la main. Fermoir ajustable, finitions soignées.'
                : product.collection === 'mystic'
                ? 'Coton premium, coupe oversize unisexe. Signature LOVE brodée à la main.'
                : 'Coton lourd 280\u00a0g/m², coupe oversize unisexe. Sérigraphie haute densité, col bord-côte renforcé.'}
            </p>
          )}

          <ColorSwatches product={product} />

          {!isJewelry && (
            <div className="mb-3">
              <div className="flex items-center justify-between mb-3">
                <p className="uppercase" style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.18em', color: '#888780' }}>
                  Taille — {selectedSize}
                </p>
                <button
                  type="button"
                  onClick={() => setSizeGuideOpen(true)}
                  className="uppercase underline underline-offset-4 hover:text-[#1A1A1A] transition-colors"
                  style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.14em', color: '#888780' }}
                >
                  Guide des tailles
                </button>
              </div>

              <div className="flex gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    aria-pressed={selectedSize === s}
                    className={`w-11 h-11 text-[11px] border transition-all ${
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
              <p className="mt-3" style={{ fontFamily: SANS, fontSize: 11, color: '#888780' }}>
                Coupe oversize — nous recommandons votre taille habituelle.
              </p>
              {stock !== null && stock <= 5 && (
                <p className="mt-2" style={{ fontFamily: SANS, fontSize: 11, color: '#C0392B' }}>
                  Plus que {stock} en stock
                </p>
              )}
            </div>
          )}

          {/* CTA + wishlist */}
          <div className="flex gap-2 mt-6">
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="flex-1 transition-opacity hover:opacity-90 disabled:opacity-60"
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
            <button
              onClick={() => setWishlisted((v) => !v)}
              aria-label="Ajouter à la wishlist"
              className="w-[52px] flex items-center justify-center border border-[#1A1A1A] hover:bg-[#F0ECE4] transition-colors"
            >
              <Heart
                size={18}
                strokeWidth={1.4}
                style={{ color: '#1A1A1A', fill: wishlisted ? '#1A1A1A' : 'transparent' }}
              />
            </button>
          </div>


          {/* Reassurance — single occurrence */}
          <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-[#E8E4DD]">
            {reassurance.map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon size={16} strokeWidth={1.2} style={{ color: '#5F5E5A' }} />
                <span
                  style={{
                    fontFamily: SANS,
                    fontSize: 10,
                    letterSpacing: '0.1em',
                    color: '#5F5E5A',
                    textTransform: 'uppercase',
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Détails produits — accordéons pleine largeur */}
      <section
        className="mt-12 md:mt-16 max-w-3xl mx-auto"
        style={{ ['--accent' as any]: cfg.accent }}
      >
        <div className="border-t border-[#EFEDE8]">
          <Accordion title="Matière & fabrication" defaultOpen>
            <p>{material}</p>
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
                    <p className="m-0" style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.7, fontWeight: 400 }}>{s.meaning}</p>
                  </li>
                ))}
              </ul>
            </Accordion>
          )}
        </div>
      </section>

      {/* ─── Editorial Story ─────────────────────────────────── */}
      <section className="mt-24 md:mt-32 px-6" style={{ backgroundColor: cfg.recitBg }}>
        <div className="max-w-[820px] mx-auto py-20 md:py-28 text-center">
          <p
            className="mb-6"
            style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.32em', color: cfg.accent, textTransform: 'uppercase' }}
          >
            Le Récit
          </p>
          <p
            style={{
              fontFamily: SANS,
              fontSize: 'clamp(17px, 1.8vw, 21px)',
              lineHeight: 1.75,
              color: '#1A1A1A',
              fontWeight: 300,
              letterSpacing: '0.005em',
            }}
          >
            {recit}
          </p>
        </div>
      </section>

      {/* ─── Craftsmanship pillars ───────────────────────────── */}
      <section className="mt-0 px-6 md:px-12 bg-white">
        <div className="max-w-[1100px] mx-auto py-20 md:py-28">
          <p
            className="text-center mb-14"
            style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.32em', color: '#1A1A1A', textTransform: 'uppercase' }}
          >
            Savoir-faire
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {[
              {
                title: isJewelry ? 'Pierres naturelles' : 'Matière',
                body: isJewelry
                  ? 'Chaque pierre est sélectionnée pour son grain, sa densité et son unicité. Aucune ne ressemble à une autre.'
                  : product.collection === 'mystic'
                  ? 'Coton peigné premium, tissé dans un grammage lourd pour une tenue structurée qui traverse les saisons.'
                  : 'Coton lourd 280 g/m², sélectionné pour sa densité et sa tenue dans le temps.',
              },
              {
                title: isJewelry ? 'Monture main' : 'Confection',
                body: isJewelry
                  ? 'Sertissage et montage réalisés à la main. Fermoir ajustable, finitions soignées à chaque étape.'
                  : product.collection === 'mystic'
                  ? 'Coupe oversize unisexe, épaules tombées, encolure côtelée renforcée. Chaque pièce est finie à Paris.'
                  : 'Coupe oversize unisex. Sérigraphie haute densité réalisée en France, col bord-côte renforcé.',
              },
              {
                title: 'Signature',
                body: isJewelry
                  ? "Chaque pièce est numérotée et livrée dans son écrin d'origine — une pièce, une histoire."
                  : product.collection === 'mystic'
                  ? 'Broderie LOVE dorée signature, réalisée au fil métallisé — le geste qui fait la pièce.'
                  : 'Impression signature LOVCICOV, garantie résistante aux lavages successifs.',
              },
            ].map((p) => (
              <div key={p.title} className="text-center">
                <p
                  className="mb-4"
                  style={{
                    fontFamily: SANS,
                    fontSize: 10,
                    letterSpacing: '0.22em',
                    color: cfg.accent,
                    textTransform: 'uppercase',
                    fontWeight: 500,
                  }}
                >
                  {p.title}
                </p>
                <p
                  style={{
                    fontFamily: SANS,
                    fontSize: 13.5,
                    lineHeight: 1.85,
                    color: '#5F5E5A',
                    fontWeight: 300,
                  }}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Complete the look ───────────────────────────────── */}
      {completeTheLook.length > 0 && (
        <section className="px-6 md:px-12 bg-white border-t border-[#EFEDE8]">
          <div className="max-w-[1100px] mx-auto py-20 md:py-24">
            <p
              className="text-center mb-3"
              style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.32em', color: cfg.accent, textTransform: 'uppercase' }}
            >
              Le vestiaire
            </p>
            <h2
              className="text-center mb-12"
              style={{ fontFamily: SANS, fontSize: 'clamp(22px, 2.4vw, 28px)', fontWeight: 400, color: '#1A1A1A', letterSpacing: '-0.005em' }}
            >
              Complétez la pièce
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
              {completeTheLook.map((p) => (
                <Link
                  key={p.id}
                  to={`/shop/${p.id}`}
                  className="group block"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-[#F8F6F1] mb-4">
                    <img
                      src={getImage(p.image)}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <p
                    className="text-center"
                    style={{ fontFamily: SANS, fontSize: 13, color: '#1A1A1A', fontWeight: 400 }}
                  >
                    {p.name}
                  </p>
                  <p
                    className="text-center mt-1"
                    style={{ fontFamily: SANS, fontSize: 12, color: '#888780' }}
                  >
                    €{p.price}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}


      <section className="px-6 border-t border-[#EFEDE8] bg-white">
        <div className="max-w-[720px] mx-auto py-20 md:py-24 text-center">
          <p
            className="mb-5"
            style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.32em', color: '#1A1A1A', textTransform: 'uppercase' }}
          >
            LOVCICOV Paris
          </p>
          <p
            style={{
              fontFamily: SANS,
              fontSize: 'clamp(15px, 1.5vw, 17px)',
              lineHeight: 1.85,
              color: '#5F5E5A',
              fontWeight: 300,
              fontStyle: 'italic',
            }}
          >
            Nous croyons à la pièce que l'on garde. Au geste que l'on transmet. À la qualité qui traverse le temps.
            Chaque LOVCICOV est pensée pour durer — dans la matière, dans le style, dans la mémoire.
          </p>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E8E4DD] px-4 py-3 transition-transform duration-300 ${
          showStickyCta ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.04)' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="truncate" style={{ fontFamily: SANS, fontSize: 12, fontWeight: 500, color: '#1A1A1A' }}>
              {product.name}
            </p>
            <p style={{ fontFamily: SANS, fontSize: 12, color: '#5F5E5A' }}>€{product.price}</p>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="px-5 py-3 disabled:opacity-60"
            style={{
              backgroundColor: '#1A1A1A',
              color: '#FFFFFF',
              fontFamily: SANS,
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            {isAdding ? '…' : 'Ajouter'}
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
