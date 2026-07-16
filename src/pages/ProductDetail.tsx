import { useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { products } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductPage from '@/components/ProductPage';
import RelatedProducts, { trackViewedProduct } from '@/components/RelatedProducts';
import ProductUnavailable from '@/components/ProductUnavailable';
import { useProductVisibility, localKey } from '@/hooks/useProductVisibility';

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

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const product = products.find((p) => p.id === id);
  const { isVisible, loading: visLoading } = useProductVisibility();
  const imageOverride = typeof location.state?.imageOverride === 'string' ? location.state.imageOverride : '';
  const displayedProduct = product && imageOverride ? { ...product, image: imageOverride } : product;



  const universe =
    product?.collection === 'mystic' ? 'mysticlov'
    : product?.collection === 'bijoux' ? 'stonelov'
    : 'powerlov';

  useEffect(() => {
    if (!displayedProduct) return;
    trackViewedProduct({
      key: `local:${displayedProduct.id}`,
      name: displayedProduct.name,
      price: String(displayedProduct.price),
      image: getImage(displayedProduct.image),
      universe: universe as 'powerlov' | 'mysticlov' | 'stonelov',
      link: `/shop/${displayedProduct.id}`,
    });
  }, [displayedProduct?.id, displayedProduct?.image]);

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
  if (!visLoading && !isVisible(localKey(product.id))) {
    return <ProductUnavailable />;
  }


  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {displayedProduct && <ProductPage product={displayedProduct} />}
      <RelatedProducts
        currentKey={`local:${product.id}`}
        currentUniverse={universe as 'powerlov' | 'mysticlov' | 'stonelov'}
      />
      <Footer />
    </div>
  );
};

export default ProductDetail;
