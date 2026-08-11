import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { sacsProducts } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductPage from '@/components/ProductPage';
import RelatedProducts, { trackViewedProduct } from '@/components/RelatedProducts';
import ProductUnavailable from '@/components/ProductUnavailable';
import { refreshShopifyCatalog } from '@/lib/shopifyCatalog';
import { useProductVisibility, localKey } from '@/hooks/useProductVisibility';

// Les visuels produit sont des URLs Shopify (Storefront API) : rien à résoudre localement.
const getImage = (key: string) => key ?? '';

const SacDetail = () => {
  // Relecture forcée de la Storefront API à chaque ouverture de fiche produit.
  useEffect(() => { void refreshShopifyCatalog(); }, []);

  const { slug: id } = useParams<{ slug: string }>();
  const product = sacsProducts.find((p) => p.id === id);
  const { isVisible, loading: visLoading } = useProductVisibility();
  // Source d'images unique : le tableau `images` du produit (BAGS),
  // projeté en { image, gallery }. Aucun override, aucun fallback externe.
  const displayedProduct = product;






  const universe = 'powerlov';

  useEffect(() => {
    if (!displayedProduct) return;
    trackViewedProduct({
      key: `local:${displayedProduct.id}`,
      name: displayedProduct.name,
      price: String(displayedProduct.price),
      image: getImage(displayedProduct.image),
      universe: universe as 'powerlov' | 'mysticlov' | 'stonelov',
      link: `/sacs/${displayedProduct.id}`,
    });
  }, [displayedProduct?.id, displayedProduct?.image]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-40 px-6 md:px-12 text-center">
          <h1 className="text-2xl font-medium">Produit introuvable</h1>
          <Link to="/sacs" className="text-brand text-xs mt-4 inline-block opacity-60 hover:opacity-100">
            Retour aux Sacs
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

export default SacDetail;
