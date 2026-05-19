import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { fetchShopifyProductByHandle, type ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ShopifyProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const { addItem, isLoading: cartLoading } = useCartStore();

  useEffect(() => {
    if (!handle) return;
    setLoading(true);
    fetchShopifyProductByHandle(handle)
      .then((p) => setProduct(p))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-40 flex items-center justify-center">
          <Loader2 className="animate-spin text-muted-foreground" size={24} />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-40 px-6 md:px-12 text-center">
          <h1 className="text-2xl font-medium">Produit introuvable</h1>
          <Link to="/shop" className="text-brand text-xs mt-4 inline-block opacity-60 hover:opacity-100">
            Retour à la Boutique
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images.edges.map(e => e.node);
  const variants = product.variants.edges.map(e => e.node);
  const selectedVariant = variants[selectedVariantIdx];

  // Group options
  const options = product.options || [];

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast({ title: 'Ajouté au panier', description: product.title });
  };

  const price = parseFloat(selectedVariant.price.amount).toFixed(0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-36 pb-24 px-6 md:px-12">
        <Link to="/shop?collection=mystic" className="text-brand text-xs opacity-50 hover:opacity-100 transition-opacity mb-8 inline-block">
          ← Retour
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 max-w-6xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <div className="aspect-[3/4] overflow-hidden bg-secondary mb-3">
              {images[activeImage] ? (
                <img src={images[activeImage].url} alt={product.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">Pas d'image</div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button
                    key={img.url}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square w-16 md:w-20 overflow-hidden bg-secondary border-2 transition-all ${
                      activeImage === i ? 'border-foreground' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={`${product.title} - vue ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col justify-center p-8 md:p-12 bg-[#F7F5F0]">
            <p className="text-[9px] uppercase tracking-[0.18em] font-medium text-[#8A8985] mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
              MYSTICLOV
            </p>
            <h1 className="text-[22px] font-light text-[#1A1A1A] mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
              {product.title}
            </h1>
            <p className="text-[16px] font-normal text-[#1A1A1A] mb-8" style={{ fontFamily: 'Arial, sans-serif' }}>
              €{price}
            </p>

            {product.description && (
              <p className="text-[#8A8985] text-[12px] leading-[1.8] mb-8" style={{ fontFamily: 'Arial, sans-serif' }}>
                {product.description}
              </p>
            )}

            {/* Variant selector */}
            {options.length > 0 && (
              <div className="space-y-4 mb-8">
                {options.map((option) => (
                  <div key={option.name}>
                    <p className="text-[9px] uppercase tracking-[0.15em] text-[#888780] mb-3">{option.name}</p>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value) => {
                        const isSelected = selectedVariant.selectedOptions.some(
                          o => o.name === option.name && o.value === value
                        );
                        return (
                          <button
                            key={value}
                            onClick={() => {
                              const idx = variants.findIndex(v =>
                                v.selectedOptions.some(o => o.name === option.name && o.value === value)
                              );
                              if (idx >= 0) setSelectedVariantIdx(idx);
                            }}
                            className={`text-[11px] px-3 py-2 border transition-all ${
                              isSelected
                                ? 'border-[#1A1A1A] text-[#1A1A1A]'
                                : 'border-[#E8E4DD] text-[#888780] hover:border-[#1A1A1A]'
                            }`}
                            style={{ fontFamily: 'Arial, sans-serif' }}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={cartLoading || !selectedVariant.availableForSale}
              className="bg-[#1A1A1A] text-white px-8 py-4 text-[10px] tracking-[0.15em] uppercase hover:bg-[#333333] transition-colors w-full rounded-[2px] disabled:opacity-50"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              {cartLoading ? (
                <Loader2 className="animate-spin mx-auto" size={16} />
              ) : !selectedVariant.availableForSale ? (
                'Rupture de stock'
              ) : (
                'Ajouter au Panier'
              )}
            </button>

            <p className="text-[11px] text-[#888780] text-center mt-4" style={{ fontFamily: 'Arial, sans-serif' }}>
              Livraison offerte dès 120€ &nbsp;·&nbsp; Retours 14 jours &nbsp;·&nbsp; Made in France / Paris
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShopifyProductDetail;
