import { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StoneMeaningBlock from '@/components/StoneMeaningBlock';
import StoneLovProductPanel from '@/components/StoneLovProductPanel';
import ColorSwatches from '@/components/ColorSwatches';

const imageModulesJpg = import.meta.glob('@/assets/*.jpg', { eager: true, import: 'default' }) as Record<string, string>;
const imageModulesWebp = import.meta.glob('@/assets/*.webp', { eager: true, import: 'default' }) as Record<string, string>;
const imageModulesPng = import.meta.glob('@/assets/*.png', { eager: true, import: 'default' }) as Record<string, string>;
const imageModules = { ...imageModulesJpg, ...imageModulesWebp, ...imageModulesPng };

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
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast({ title: 'Ajouté au panier', description: product.name });
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
  const fallbackBackLink = `/shop?collection=${product.collection}`;
  const backLink = typeof location.state?.from === 'string' ? location.state.from : fallbackBackLink;

  // Build all images: main + gallery
  const allImages = [product.image, ...(product.gallery || [])];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-36 pb-24 px-6 md:px-12">
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
              className="text-[22px] font-light text-[#1A1A1A] mb-4"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              {product.name}
            </h1>
            <p
              className="text-[16px] font-normal text-[#1A1A1A] mb-1"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              €{product.price}
            </p>
            {product.collection === 'standard' ? (
              <p
                className="text-[11px] italic text-[#888780] mb-8"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                Qualite premium — coton 280g double fil, coupe oversize
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

            {product.colors && product.colors.length > 1 && (
              <div className="mb-8">
                <p className="text-[9px] uppercase tracking-[0.15em] text-[#888780] mb-3">Couleurs</p>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <Link
                      key={color.id}
                      to={`/shop/${color.id}`}
                      className={`text-[11px] px-3 py-2 border transition-all ${
                        color.id === product.id
                          ? 'border-[#1A1A1A] text-[#1A1A1A]'
                          : 'border-[#E8E4DD] text-[#888780] hover:border-[#1A1A1A]'
                      }`}
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      {color.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

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
              className={`text-white px-8 py-4 text-[10px] tracking-[0.15em] uppercase transition-colors w-full rounded-[2px] ${
                product.collection === 'mystic'
                  ? 'bg-[#6B3FA0] hover:bg-[#5432A8]'
                  : 'bg-[#1A1A1A] hover:bg-[#E63946]'
              }`}
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              Ajouter au Panier
            </button>

            <div
              className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-[#5F5E5A] mt-4"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              <span>🔒 Paiement sécurisé</span>
              <span className="text-[#C9C4BC]">·</span>
              <span>📦 Livraison 3-5 jours</span>
              <span className="text-[#C9C4BC]">·</span>
              <span>↩ Retours 14 jours</span>
            </div>

            <p
              className="text-[11px] text-[#888780] text-center mt-4"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              Livraison offerte dès 120€ &nbsp;·&nbsp; Retours 14 jours &nbsp;·&nbsp; Made in France / Paris
            </p>
          </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
