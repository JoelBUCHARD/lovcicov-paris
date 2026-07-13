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
import { useProductVisibility, localKey } from '@/hooks/useProductVisibility';

const imageModules = {
  ...(import.meta.glob('@/assets/**/*.jpg', { eager: true, import: 'default' }) as Record<string, string>),
  ...(import.meta.glob('@/assets/**/*.jpeg', { eager: true, import: 'default' }) as Record<string, string>),
  ...(import.meta.glob('@/assets/**/*.webp', { eager: true, import: 'default' }) as Record<string, string>),
  ...(import.meta.glob('@/assets/**/*.png', { eager: true, import: 'default' }) as Record<string, string>),
};
const assetJsonModules = import.meta.glob('@/assets/**/*.asset.json', { eager: true }) as Record<string, { url?: string; default?: { url?: string } }>;
const getImage = (key: string) => {
  if (!key) return '';
  if (/^https?:\/\//i.test(key) || key.startsWith('/')) return key;
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
  const { isVisible } = useProductVisibility();

  const cfg = universeConfig[product.collection];
  const isJewelry = product.collection === 'bijoux';
  const allImages = [product.image, ...(product.gallery || [])];
  const backLink = typeof location.state?.from === 'string' ? location.state.from : cfg.back;

  const recit = getRecit(product);
  const material = getMaterial(product);
  const stones = isJewelry ? detectStones(`${product.name} ${product.description} ${product.details ?? ''}`) : [];

  // Stock: only shown when explicit data exists ≤ 5. No invented value.
  const stock: number | null = null;

  // Complete the look — up to 3 sibling pieces from the same universe (visible only)
  const completeTheLook = useMemo(
    () =>
      allProducts
        .filter((p) => p.collection === product.collection && p.id !== product.id && isVisible(localKey(p.id)))
        .slice(0, 3),
    [product.id, product.collection, isVisible]
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
    { Icon: RotateCcw, label: 'Retours 14 jours' },
    { Icon: ShieldCheck, label: 'Paiement sécurisé' },
    { Icon: MessageCircle, label: 'Conseil personnalisé' },
  ];


  return (
    <main className="bg-white pt-28 md:pt-36 pb-16 px-4 md:px-12" style={{ fontFamily: SANS }}>
      <div className="max-w-[1100px] mx-auto">
        <Link
          to={backLink}
          className="text-[12px] md:text-xs opacity-60 hover:opacity-100 transition-opacity mb-6 md:mb-8 inline-block mt-6 md:mt-10 min-h-11 flex items-center"
          style={{ color: '#1A1A1A', letterSpacing: '0.1em' }}
        >
          Retour à {cfg.backLabel}
        </Link>
      </div>

      {/* Top: 2 columns desktop, 1 column mobile */}
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(380px,440px)] gap-8 md:gap-16 max-w-[1100px] mx-auto">


        {/* Gallery: vertical thumbs + main image (desktop) — with lightbox zoom */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <div className="flex gap-4 items-stretch">
            {allImages.length > 1 && (
              <div className="hidden md:flex flex-col justify-between gap-2 w-16 shrink-0 self-stretch">
                {allImages.map((img, i) => (
                  <button
                    key={img + i}
                    onClick={() => setActiveImage(i)}
                    className={`flex-1 min-h-0 overflow-hidden bg-white border transition-all ${
                      activeImage === i ? 'border-[#1A1A1A]' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                    aria-label={`Image ${i + 1}`}
                  >
                  <img src={getImage(img)} alt="" className="w-full h-full object-cover" />
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
                className="w-full h-full object-cover md:object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
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
            <div className="flex md:hidden gap-2 mt-4 overflow-x-auto scrollbar-hide -mx-4 px-4 snap-x">
              {allImages.map((img, i) => (
                <button
                  key={img + i + '-m'}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square w-[68px] shrink-0 overflow-hidden bg-white border transition-all snap-start ${
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
          {!(product.collection === 'mystic' && (product.subcategory === 'tshirt' || product.subcategory === 'hoodie')) && product.collection !== 'standard' && (
            <p
              className="mb-8 pt-3 border-t border-[#EDE9E2] max-w-[420px]"
              style={{ fontFamily: SANS, fontSize: 12, lineHeight: 1.65, color: '#6B6A65' }}
            >
              {product.collection === 'bijoux'
                ? 'Pierres naturelles montées à la main. Fermoir ajustable, finitions soignées.'
                : 'Coton premium, coupe oversize unisexe. Signature LOVE brodée à la main.'}
            </p>
          )}


          <ColorSwatches product={product} />

          {!isJewelry && (
            <div className="mb-3">
              <div className="flex items-center justify-between mb-3">
                <p className="uppercase" style={{ fontFamily: SANS, fontSize: 11, letterSpacing: '0.18em', color: '#888780' }}>
                  Taille — {selectedSize}
                </p>
                <button
                  type="button"
                  onClick={() => setSizeGuideOpen(true)}
                  className="uppercase underline underline-offset-4 hover:text-[#1A1A1A] transition-colors min-h-11 flex items-center px-1"
                  style={{ fontFamily: SANS, fontSize: 11, letterSpacing: '0.14em', color: '#888780' }}
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
                    className={`flex-1 md:flex-none md:w-12 h-12 md:h-11 text-[12px] md:text-[11px] border transition-all active:scale-[0.97] ${
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
              className="flex-1 transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-60 min-h-[56px]"
              style={{
                backgroundColor: '#1A1A1A',
                color: '#FFFFFF',
                padding: '18px',
                fontFamily: SANS,
                fontSize: 12,
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
              className="w-[56px] min-h-[56px] flex items-center justify-center border border-[#1A1A1A] hover:bg-[#F0ECE4] active:scale-[0.97] transition-all"
            >
              <Heart
                size={20}
                strokeWidth={1.4}
                style={{ color: '#1A1A1A', fill: wishlisted ? '#1A1A1A' : 'transparent' }}
              />
            </button>
          </div>



          {/* Reassurance — single occurrence */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-4 mt-10 pt-8 border-t border-[#E8E4DD]">
            {reassurance.map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <Icon size={18} strokeWidth={1.2} style={{ color: '#5F5E5A' }} />
                <span
                  className="text-[11px] md:text-[10px]"
                  style={{
                    fontFamily: SANS,
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


      {/* ─── Craftsmanship pillars ───────────────────────────── */}
      <section className="mt-0 px-6 md:px-12 bg-white">
        <div className="max-w-[1100px] mx-auto pt-16 md:pt-20 pb-8 md:pb-10">
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




      {/* ─── Lightbox / Image zoom ────────────────────────── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-white/98 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
              className="absolute top-6 right-6 md:top-8 md:right-8 p-2 hover:opacity-60 transition-opacity z-10"
              aria-label="Fermer"
            >
              <X size={22} strokeWidth={1.2} className="text-[#1A1A1A]" />
            </button>
            <div
              className="max-w-[90vw] max-h-[88vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={getImage(allImages[activeImage])}
                alt={product.name}
                className="max-w-full max-h-[88vh] object-contain"
              />
            </div>
            {allImages.length > 1 && (
              <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                {allImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setActiveImage(i); }}
                    className={`h-[3px] transition-all ${activeImage === i ? 'w-8 bg-[#1A1A1A]' : 'w-4 bg-[#B5B3AD]'}`}
                    aria-label={`Voir image ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Size guide modal ─────────────────────────────── */}
      <AnimatePresence>
        {sizeGuideOpen && !isJewelry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center px-4"
            onClick={() => setSizeGuideOpen(false)}
          >
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white max-w-[520px] w-full p-8 md:p-10 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSizeGuideOpen(false)}
                className="absolute top-4 right-4 p-1 hover:opacity-60"
                aria-label="Fermer"
              >
                <X size={18} strokeWidth={1.2} />
              </button>
              <p
                className="mb-3"
                style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.28em', color: cfg.accent, textTransform: 'uppercase' }}
              >
                Guide des tailles
              </p>
              <h3
                className="mb-6"
                style={{ fontFamily: SANS, fontSize: 20, fontWeight: 500, color: '#1A1A1A' }}
              >
                Coupe oversize unisexe
              </h3>
              <table className="w-full text-left" style={{ fontFamily: SANS, fontSize: 12 }}>
                <thead>
                  <tr className="border-b border-[#EFEDE8]">
                    <th className="py-2 font-normal uppercase text-[10px] tracking-[0.14em] text-[#888780]">Taille</th>
                    <th className="py-2 font-normal uppercase text-[10px] tracking-[0.14em] text-[#888780]">Poitrine</th>
                    <th className="py-2 font-normal uppercase text-[10px] tracking-[0.14em] text-[#888780]">Longueur</th>
                  </tr>
                </thead>
                <tbody className="text-[#5F5E5A]">
                  {[
                    ['XS', '96 cm', '68 cm'],
                    ['S', '104 cm', '70 cm'],
                    ['M', '112 cm', '72 cm'],
                    ['L', '120 cm', '74 cm'],
                    ['XL', '128 cm', '76 cm'],
                  ].map((r) => (
                    <tr key={r[0]} className="border-b border-[#F5F2EC]">
                      <td className="py-3">{r[0]}</td>
                      <td className="py-3">{r[1]}</td>
                      <td className="py-3">{r[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-6" style={{ fontFamily: SANS, fontSize: 12, color: '#888780', lineHeight: 1.7 }}>
                Coupe unisexe volontairement ample. Pour un tomber plus près du corps, choisissez la taille en dessous.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky mobile CTA */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E8E4DD] px-4 pt-3 pb-3 safe-bottom transition-transform duration-300 ${
          showStickyCta ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.04)' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="truncate" style={{ fontFamily: SANS, fontSize: 13, fontWeight: 500, color: '#1A1A1A' }}>
              {product.name}
            </p>
            <p style={{ fontFamily: SANS, fontSize: 13, color: '#5F5E5A' }}>€{product.price}</p>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="px-6 min-h-[48px] active:scale-[0.98] transition-transform disabled:opacity-60"
            style={{
              backgroundColor: '#1A1A1A',
              color: '#FFFFFF',
              fontFamily: SANS,
              fontSize: 11,
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
