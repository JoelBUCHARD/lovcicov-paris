import { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useCartStore } from '@/stores/cartStore';
import { fetchShopifyProductByHandle } from '@/lib/shopify';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StoneMeaningBlock from '@/components/StoneMeaningBlock';
import StoneLovProductPanel from '@/components/StoneLovProductPanel';
import ColorSwatches from '@/components/ColorSwatches';
import RelatedProducts, { trackViewedProduct } from '@/components/RelatedProducts';
import { useEffect } from 'react';

const imageModulesJpg = import.meta.glob('@/assets/*.jpg', { eager: true, import: 'default' }) as Record<string, string>;
const imageModulesJpeg = import.meta.glob('@/assets/*.jpeg', { eager: true, import: 'default' }) as Record<string, string>;
const imageModulesWebp = import.meta.glob('@/assets/*.webp', { eager: true, import: 'default' }) as Record<string, string>;
const imageModulesPng = import.meta.glob('@/assets/*.png', { eager: true, import: 'default' }) as Record<string, string>;
const imageModules = { ...imageModulesJpg, ...imageModulesJpeg, ...imageModulesWebp, ...imageModulesPng };

const getImage = (key: string) => {
  const match = Object.entries(imageModules).find(([path]) => path.includes(key));
  return match ? match[1] : '';
};

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const product = products.find((p) => p.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  const addShopifyItem = useCartStore((s) => s.addItem);

  const handleAddToCart = async () => {
    if (!product) return;

    // Local fallback for products not yet linked to Shopify
    if (!product.shopifyHandle) {
      addToCart(product);
      toast({ title: 'Ajouté au panier', description: product.name });
      return;
    }

    setIsAdding(true);
    try {
      const shopifyProduct = await fetchShopifyProductByHandle(product.shopifyHandle);
      if (!shopifyProduct) {
        toast({ title: 'Produit indisponible', description: 'Réessayez dans un instant.' });
        return;
      }

      const variants = shopifyProduct.variants.edges.map((e) => e.node);
      const hasSizeOption = shopifyProduct.options.some((o) => o.name.toLowerCase().includes('taille') || o.name.toLowerCase() === 'size');
      const hasColorOption = shopifyProduct.options.some((o) => o.name.toLowerCase().includes('couleur') || o.name.toLowerCase() === 'color');

      const variant =
        variants.find((v) => {
          const opts = v.selectedOptions;
          const colorOk = !hasColorOption || !product.shopifyColor || opts.some((o) => o.value === product.shopifyColor);
          const sizeOk = !hasSizeOption || opts.some((o) => o.value === selectedSize);
          return v.availableForSale && colorOk && sizeOk;
        }) || variants.find((v) => v.availableForSale) || variants[0];

      if (!variant) {
        toast({ title: 'Aucune variante disponible' });
        return;
      }

      await addShopifyItem({
        product: { node: shopifyProduct },
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
        selectedOptions: variant.selectedOptions,
      });
      toast({ title: 'Ajouté au panier', description: product.name });
    } catch (err) {
      console.error('Add to cart failed', err);
      toast({ title: 'Erreur', description: 'Impossible d\'ajouter au panier.' });
    } finally {
      setIsAdding(false);
    }
  };


  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-40 px-6 md:px-12 text-center">
          <h1 className="text-2xl font-mediumm">Produit introuvable</h1>
          <Link to="/shop" className="text-brand text-xs mt-4 inline-block opacity-60 hover:opacity-100">
            Retour à la Boutique
          </Link>
        </div>
      </div>
    );
  }

  const collectionLabel =
    product.collection === 'mystic' ? 'MysticLov'
    : product.collection === 'bijoux' ? 'StoneLov'
    : 'PowerLov';
  const universe = product.collection === 'mystic' ? 'mysticlov'
    : product.collection === 'bijoux' ? 'stonelov'
    : 'powerlov';
  const fallbackBackLink = `/shop?collection=${product.collection}`;
  const backLink = typeof location.state?.from === 'string' ? location.state.from : fallbackBackLink;

  // Build all images: main + gallery
  const allImages = [product.image, ...(product.gallery || [])];

  // Track recently viewed
  useEffect(() => {
    if (!product) return;
    const resolved = getImage(product.image);
    trackViewedProduct({
      key: `local:${product.id}`,
      name: product.name,
      price: String(product.price),
      image: resolved,
      universe: universe as 'powerlov' | 'mysticlov' | 'stonelov',
      link: `/shop/${product.id}`,
    });
  }, [product?.id]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-36 pb-8 px-6 md:px-12">
        <Link
          to={backLink}
          className="text-brand text-xs opacity-50 hover:opacity-100 transition-opacity mb-8 inline-block"
        >
          ← Retour à {collectionLabel}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main image */}
            <div className="aspect-[3/4] overflow-hidden bg-secondary mb-3">
              <img
                src={getImage(allImages[activeImage])}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail gallery */}
            {allImages.length > 1 && (
              <div className="flex gap-2">
                {allImages.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square w-16 md:w-20 overflow-hidden bg-secondary border-2 transition-all ${
                      activeImage === i ? 'border-foreground' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={getImage(img)}
                      alt={`${product.name} - vue ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {product.collection === 'bijoux' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <StoneLovProductPanel product={product} />
            </motion.div>
          ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`flex flex-col justify-center p-8 md:p-12 ${
              product.collection === 'mystic'
                ? 'bg-[#F7F5F0]'
                : 'bg-[#FAF7F2]'
            }`}
          >
            <p
              className={`text-[9px] uppercase tracking-[0.18em] font-medium mb-4 ${
                product.collection === 'mystic'
                  ? 'text-[#8A8985]'
                  : 'text-[#E63946]'
              }`}
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              {collectionLabel.toUpperCase()}
            </p>
            <h1
              className="text-[22px] font-light text-[#1A1A1A] mb-2"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              {product.name}
            </h1>
            {product.collection !== 'mystic' && (
              <p
                className="italic mb-4"
                style={{ fontSize: '11px', color: '#888780' }}
              >
                Une piece pensee pour transformer votre posture.
              </p>
            )}
            {product.collection === 'mystic' && (
              <p
                className="italic mb-4"
                style={{ fontSize: '11px', color: '#E66060' }}
              >
                Un mantra. Une vibration. Une énergie à porter.
              </p>
            )}
            <ColorSwatches product={product} />
            <p
              className="font-bold text-[#1A1A1A] mb-1"
              style={{ fontFamily: 'Arial, sans-serif', fontSize: '20px' }}
            >
              €{product.price}
            </p>
            <p className="italic" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#888780' }}>
              4x sans frais avec Alma
            </p>
            {(() => {
              const ship =
                product.subcategory === 'tshirt' ? "Livraison 4.50€ · Offerte dès 250€ d'achat"
                : product.subcategory === 'crewneck' ? "Livraison 5.50€ · Offerte dès 250€ d'achat"
                : product.subcategory === 'hoodie' ? "Livraison 6.50€ · Offerte dès 250€ d'achat"
                : null;
              return ship && product.collection !== 'mystic' ? (
                <p className="italic mt-1" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#888780' }}>
                  {ship}
                </p>
              ) : null;
            })()}
            {product.collection === 'standard' ? (
              <>
                <p
                  className="italic text-[#888780] mb-1"
                  style={{ fontFamily: 'Arial, sans-serif', fontSize: '10px' }}
                >
                  Qualite premium justifiee — matiere, coupe, intention
                </p>
                <p
                  className="text-[11px] text-[#5F5E5A] mb-1"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Disponible en 2 coloris : Noir et Ecru
                </p>
                <p
                  className="text-[11px] text-[#5F5E5A] mb-8"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Unisex · Coupe oversize · Coton 280g double fil
                </p>
              </>
            ) : product.collection === 'mystic' ? (
              <p
                className="text-[11px] text-[#5F5E5A] mb-8 mt-2"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                Unisex · Coupe oversize · Paris
              </p>
            ) : (
              <div className="mb-7" />
            )}


            <p
              className="text-[#5F5E5A] text-[12px] leading-[1.8] mb-2"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              {product.description}
            </p>
            <p
              className="text-[#5F5E5A] text-[12px] leading-[1.8] mb-8"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              {product.details}
            </p>


            <div className="mb-6">
              <p className="text-[9px] uppercase tracking-[0.15em] text-[#888780] mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>Taille</p>
              <div className="flex gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-11 h-11 text-[11px] border transition-colors ${
                      selectedSize === size
                        ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                        : 'bg-white text-[#1A1A1A] border-[#E8E4DD] hover:border-[#1A1A1A]'
                    }`}
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <p
              className="text-[11px] text-[#C0392B] mb-3"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              Plus que 3 en stock
            </p>

            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`px-8 py-4 text-[10px] tracking-[0.15em] uppercase transition-colors w-full rounded-[2px] disabled:opacity-60 ${
                product.collection === 'mystic'
                  ? 'bg-[#F5D0D0] text-[#1A1A1A] hover:bg-[#F5D0D0]'
                  : 'bg-[#1A1A1A] text-white hover:bg-[#E63946]'
              }`}
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              {isAdding ? 'Ajout en cours…' : 'Ajouter au Panier'}
            </button>


            <p
              className="text-[11px] text-[#888780] text-center mt-4"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              Livraison offerte dès 120€ &nbsp;·&nbsp; Retours 14 jours
            </p>
          </motion.div>
          )}
        </div>
      </main>

      <RelatedProducts
        currentKey={`local:${product.id}`}
        currentUniverse={universe as 'powerlov' | 'mysticlov' | 'stonelov'}
      />

      <Footer />
    </div>
  );
};

export default ProductDetail;
