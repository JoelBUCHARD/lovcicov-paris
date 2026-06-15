import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { products } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductPage from '@/components/ProductPage';
import RelatedProducts, { trackViewedProduct } from '@/components/RelatedProducts';

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
  const product = products.find((p) => p.id === id);

  // Option 1: when the local product is linked to a Shopify product,
  // redirect to the Shopify-backed page so checkout works through the Storefront API.
  if (product?.shopifyHandle) {
    return <Navigate to={`/product/${product.shopifyHandle}`} replace />;
  }


  const universe =
    product?.collection === 'mystic' ? 'mysticlov'
    : product?.collection === 'bijoux' ? 'stonelov'
    : 'powerlov';

  useEffect(() => {
    if (!product) return;
    trackViewedProduct({
      key: `local:${product.id}`,
      name: product.name,
      price: String(product.price),
      image: getImage(product.image),
      universe: universe as 'powerlov' | 'mysticlov' | 'stonelov',
      link: `/shop/${product.id}`,
    });
  }, [product?.id]);

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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ProductPage product={product} />
      <RelatedProducts
        currentKey={`local:${product.id}`}
        currentUniverse={universe as 'powerlov' | 'mysticlov' | 'stonelov'}
      />
      <Footer />
    </div>
  );
};

export default ProductDetail;
