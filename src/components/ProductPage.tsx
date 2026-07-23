import { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Heart, Truck, ShieldCheck, RotateCcw, MessageCircle, X, ZoomIn, WashingMachine, Wind, Sparkles, Ban, Sun, Leaf, Award } from 'lucide-react';
import { Product, products as allProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useCartStore } from '@/stores/cartStore';
import { fetchShopifyProductByHandle } from '@/lib/shopify';
import { toast } from '@/hooks/use-toast';
import ColorSwatches from '@/components/ColorSwatches';
import { detectStones } from '@/data/stoneMeanings';
import { useProductVisibility, localKey } from '@/hooks/useProductVisibility';
import SEO from '@/components/SEO';
import ZoomBubble from '@/components/ZoomBubble';

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
  const exactMatch = Object.entries(imageModules).find(([p]) => {
    const filename = p.split('/').pop() ?? '';
    const stem = filename.replace(/\.asset\.json$/, '').replace(/\.(jpg|jpeg|webp|png)$/i, '');
    return stem === key;
  });
  if (exactMatch) return exactMatch[1];
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
  mystic: { label: 'MYSTICLOV', accent: '#C9A84C', back: '/mysticlov', backLabel: 'MysticLov', recitBg: '#F8F5EE' },
  standard: { label: 'POWERLOV', accent: '#E63946', back: '/powerlov', backLabel: 'PowerLov', recitBg: '#FAF6F4' },
  bijoux: { label: 'STONELOV', accent: '#C4714A', back: '/stonelov', backLabel: 'StoneLov', recitBg: '#F6F1EB' },
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
  // Image principale + miniatures optionnelles (gallery) pour les fiches qui en ont.
  const allImages = product.gallery?.length
    ? [product.image, ...product.gallery]
    : [product.image];
  const backLink = cfg.back;
  const navigate = useNavigate();

  // Force le retour navigateur (bouton back) vers la page éditoriale de l'univers.
  useEffect(() => {
    window.history.pushState({ __lovcicovBack: true }, '');
    const onPop = () => {
      navigate(cfg.back, { replace: true });
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [cfg.back, navigate]);

  useEffect(() => {
    setActiveImage(0);
    setLightboxOpen(false);
  }, [product.id]);

  const recit = getRecit(product);
  const material = getMaterial(product);
  const stones = isJewelry ? detectStones(`${product.name} ${product.description} ${product.details ?? ''} ${product.stoneMeaning ?? ''}`) : [];

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


  const seoImage = getImage(allImages[0]);
  const seoTitle = `${product.name} — LOVCICOV Paris`;
  const seoDesc = (product.description || product.details || `${product.name} — pièce ${cfg.backLabel} par LOVCICOV Paris.`).slice(0, 158);
  const seoPath = product.shopifyHandle ? `/product/${product.shopifyHandle}` : `/shop/${product.id}`;
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: seoDesc,
    image: seoImage ? [seoImage] : undefined,
    brand: { "@type": "Brand", name: "LOVCICOV Paris" },
    offers: {
      "@type": "Offer",
      price: String(product.price),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `https://lovcicov.com${seoPath}`,
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://lovcicov.com/" },
      { "@type": "ListItem", position: 2, name: cfg.backLabel, item: `https://lovcicov.com${cfg.back}` },
      { "@type": "ListItem", position: 3, name: product.name, item: `https://lovcicov.com${seoPath}` },
    ],
  };

  return (
    <main className="bg-white pt-28 md:pt-36 pb-16 px-4 md:px-12" style={{ fontFamily: SANS }}>
      <SEO
        title={seoTitle}
        description={seoDesc}
        path={seoPath}
        image={seoImage}
        type="product"
        jsonLd={[productJsonLd, breadcrumbJsonLd]}
      />
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
                  <img src={getImage(img)} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <ZoomBubble
              src={getImage(allImages[activeImage])}
              alt={product.name}
              onOpenLightbox={() => setLightboxOpen(true)}
            />

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
          {!(product.collection === 'mystic' && (product.subcategory === 'tshirt' || product.subcategory === 'hoodie')) && product.collection !== 'standard' && product.collection !== 'bijoux' && (
            <p
              className="mb-8 pt-3 border-t border-[#EDE9E2] max-w-[420px]"
              style={{ fontFamily: SANS, fontSize: 12, lineHeight: 1.65, color: '#6B6A65' }}
            >
              Coton premium, coupe oversize unisexe. Signature LOVE brodée à la main.
            </p>
          )}
          {product.collection === 'bijoux' && (
            <div className="mb-8 pt-3 border-t border-[#EDE9E2] max-w-[420px]">
              {stones.length > 0 ? (
                <div className="space-y-3">
                  {stones.map((s) => (
                    <div key={s.key}>
                      <p
                        className="mb-1"
                        style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.22em', color: cfg.accent, fontWeight: 600, textTransform: 'uppercase' }}
                      >
                        {s.name}
                      </p>
                      <p style={{ fontFamily: SANS, fontSize: 12, lineHeight: 1.65, color: '#6B6A65' }}>
                        {s.meaning}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontFamily: SANS, fontSize: 12, lineHeight: 1.65, color: '#6B6A65' }}>
                  Pierres naturelles montées à la main. Fermoir ajustable, finitions soignées.
                </p>
              )}
            </div>
          )}

          {/* ─── Histoire produit — toujours visible ───────── */}
          <div className="mb-8 pt-5 border-t border-[#EDE9E2] max-w-[440px]">
            <p
              className="mb-2"
              style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.24em', color: cfg.accent, textTransform: 'uppercase', fontWeight: 500 }}
            >
              L'histoire
            </p>
            <p style={{ fontFamily: SANS, fontSize: 13.5, lineHeight: 1.75, color: '#3F3E3B', fontWeight: 400 }}>
              {recit || (
                <span style={{ color: '#B5B3AD', fontStyle: 'italic' }}>
                  [À COMPLÉTER — 2 à 3 phrases éditoriales sur l'inspiration et le geste de cette pièce.]
                </span>
              )}
            </p>
          </div>


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

          {/* 1. Détails & confection */}
          <Accordion title="Détails & confection" defaultOpen>
            <ul className="list-none p-0 m-0 space-y-1.5">
              {(isJewelry
                ? [
                    'Fermoir ajustable, montage main',
                    'Finitions soignées, contrôle qualité pièce à pièce',
                  ]
                : [
                    product.collection === 'mystic' ? 'Encolure côtelée renforcée' : 'Col bord-côte renforcé',
                    'Épaules tombées, coupe oversize unisexe',
                    product.subcategory === 'hoodie' ? 'Capuche doublée, cordons plats, poche kangourou' : 'Ourlet et manches surpiqués',
                    product.collection === 'mystic' ? 'Broderie LOVE dorée signature au fil métallisé' : 'Sérigraphie signature haute densité',
                  ]
              ).map((d) => (

                <li key={d} className="flex gap-2">
                  <span aria-hidden style={{ color: cfg.accent }}>·</span>
                  <span className={d.startsWith('[À COMPLÉTER') ? 'italic text-[#B5B3AD]' : ''}>{d}</span>
                </li>
              ))}
            </ul>
          </Accordion>

          {/* 2. Matières & composition */}
          <Accordion title="Matières & composition">
            <p className="mb-3">{material}</p>
            {!isJewelry && (
              <ul className="list-none p-0 m-0 space-y-1.5">
                <li className="italic text-[#B5B3AD]">
                  · [À COMPLÉTER — composition exacte, ex. « 100% coton biologique, 240 g/m² »]
                </li>
                <li className="italic text-[#B5B3AD]">
                  · [À COMPLÉTER — certifications éventuelles, ex. GOTS, OEKO-TEX]
                </li>
                <li className="flex gap-2">
                  <Leaf size={14} strokeWidth={1.4} style={{ color: cfg.accent, marginTop: 3 }} />
                  <span className="italic text-[#B5B3AD]">[À COMPLÉTER — note responsable si applicable]</span>
                </li>
              </ul>
            )}

          </Accordion>

          {/* 3. Coupe & taille */}
          <Accordion title="Coupe & taille">
            {isJewelry ? (
              <p>{product.name.toLowerCase().includes('bracelet') ? 'Bracelet ajustable au poignet — tour de main 15 à 19 cm.' : 'Collier ajustable : 42 — 48 cm.'}</p>
            ) : (
              <>
                <p className="mb-3">Coupe oversize unisexe. Tailles disponibles : XS à XL.</p>
                <p className="italic text-[#B5B3AD] mb-3">
                  [À COMPLÉTER — Le mannequin mesure 1m__ et porte une taille __.]
                </p>
                <button
                  type="button"
                  onClick={() => setSizeGuideOpen(true)}
                  className="underline underline-offset-4 hover:text-[#1A1A1A] transition-colors"
                  style={{ fontFamily: SANS, fontSize: 12, letterSpacing: '0.1em', color: '#5F5E5A', textTransform: 'uppercase' }}
                >
                  Ouvrir le guide des tailles
                </button>
              </>
            )}
          </Accordion>

          {/* 4. Entretien */}
          <Accordion title="Entretien">
            {isJewelry ? (
              <ul className="list-none p-0 m-0 space-y-2.5">
                <li className="flex items-center gap-3"><Ban size={16} strokeWidth={1.3} style={{ color: '#5F5E5A' }} /> Éviter l'eau, les parfums et produits chimiques</li>
                <li className="flex items-center gap-3"><Sparkles size={16} strokeWidth={1.3} style={{ color: '#5F5E5A' }} /> Nettoyer délicatement avec un chiffon doux</li>
                <li className="flex items-center gap-3"><Award size={16} strokeWidth={1.3} style={{ color: '#5F5E5A' }} /> Ranger à plat dans la pochette d'origine</li>
              </ul>
            ) : (
              <ul className="list-none p-0 m-0 space-y-2.5">
                <li className="flex items-center gap-3"><WashingMachine size={16} strokeWidth={1.3} style={{ color: '#5F5E5A' }} /> Lavage à 30°C sur l'envers</li>
                <li className="flex items-center gap-3"><Ban size={16} strokeWidth={1.3} style={{ color: '#5F5E5A' }} /> Ne pas utiliser de sèche-linge</li>
                <li className="flex items-center gap-3"><Wind size={16} strokeWidth={1.3} style={{ color: '#5F5E5A' }} /> Séchage à l'air libre, à plat</li>
                <li className="flex items-center gap-3"><Sun size={16} strokeWidth={1.3} style={{ color: '#5F5E5A' }} /> Repasser à l'envers, sans toucher la broderie / sérigraphie</li>
              </ul>
            )}
          </Accordion>

          {/* 5. Origine & responsabilité */}
          <Accordion title="Origine & responsabilité">
            <p className="mb-2 italic text-[#B5B3AD]">
              [À COMPLÉTER — pays / atelier de fabrication, ex. « Confectionné au Portugal dans un atelier familial ».]
            </p>
            <p className="italic text-[#B5B3AD]">
              [À COMPLÉTER — engagement responsable, production limitée, traçabilité.]
            </p>
          </Accordion>

          {/* 6. Livraison & retours */}
          <Accordion title="Livraison & retours">
            <ul className="list-none p-0 space-y-1">
              <li>· Livraison standard : 3 à 5 jours ouvrés — 9,90€</li>
              <li>· Livraison offerte dès 99€ d'achat</li>
              <li>· Retours gratuits sous 14 jours</li>
              <li>· La pièce doit être retournée dans son emballage d'origine, non portée</li>
            </ul>
          </Accordion>

          {isJewelry && (
            <Accordion title="L'énergie des pierres">
              {stones.length > 0 ? (
                <ul className="list-none p-0 m-0 space-y-6">
                  {stones.map((s) => (
                    <li key={s.key}>
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          aria-hidden
                          style={{
                            display: 'inline-block',
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            background: s.color,
                            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)',
                          }}
                        />
                        <p
                          className="m-0"
                          style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.22em', color: cfg.accent, fontWeight: 600, textTransform: 'uppercase' }}
                        >
                          {s.name}
                        </p>
                        {s.symbol && (
                          <span
                            style={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.18em', color: '#888780', textTransform: 'uppercase' }}
                          >
                            — {s.symbol}
                          </span>
                        )}
                      </div>
                      <p className="m-0 mb-2" style={{ fontFamily: SANS, fontSize: 14, lineHeight: 1.7, fontWeight: 400, color: '#3F3E3B' }}>
                        {s.meaning}
                      </p>
                      {s.deep && (
                        <p className="m-0 mb-2" style={{ fontFamily: SANS, fontSize: 13.5, lineHeight: 1.75, fontWeight: 400, color: '#6B6A65' }}>
                          {s.deep}
                        </p>
                      )}
                      {s.ritual && (
                        <p
                          className="m-0"
                          style={{ fontFamily: SANS, fontSize: 12, lineHeight: 1.65, color: '#888780', fontStyle: 'italic' }}
                        >
                          Rituel — {s.ritual}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="m-0" style={{ fontFamily: SANS, fontSize: 13.5, lineHeight: 1.75, color: '#3F3E3B' }}>
                  {product.stoneMeaning || "Pierres naturelles sélectionnées à la main. Chaque pièce est unique et porte sa propre vibration."}
                </p>
              )}
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
