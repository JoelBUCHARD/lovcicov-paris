import { useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { products } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductPage from '@/components/ProductPage';
import RelatedProducts, { trackViewedProduct } from '@/components/RelatedProducts';
import ProductUnavailable from '@/components/ProductUnavailable';
import { refreshShopifyCatalog } from '@/lib/shopifyCatalog';
import { useProductVisibility, localKey } from '@/hooks/useProductVisibility';

// Les visuels produit sont des URLs Shopify (Storefront API) : rien à résoudre localement.
const getImage = (key: string) => key ?? '';

const ProductDetail = () => {
  // Relecture forcée de la Storefront API à chaque ouverture de fiche produit.
  useEffect(() => { void refreshShopifyCatalog(); }, []);

  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navState = location.state as { variantImage?: string; galleryOrder?: string[] } | null;
  const variantImage = navState?.variantImage;
  const galleryOrder = navState?.galleryOrder?.filter(Boolean);
  const product = products.find((p) => p.id === id);
  const { isVisible, loading: visLoading } = useProductVisibility();
  const effectiveImage = galleryOrder?.length
    ? galleryOrder[0]
    : variantImage || product?.image;
  const displayedProduct = product && effectiveImage
    ? {
        ...product,
        image: effectiveImage,
        gallery: galleryOrder?.length
          ? galleryOrder.slice(1)
          : variantImage
          ? [product.image, ...(product.gallery ?? [])].filter((k) => k && k !== variantImage)
          : product.gallery,
      }
    : product;





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
