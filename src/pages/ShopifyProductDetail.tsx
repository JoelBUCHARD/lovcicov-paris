import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { fetchShopifyProductByHandle, type ShopifyProduct } from '@/lib/shopify';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductPage from '@/components/ProductPage';
import RelatedProducts, { trackViewedProduct } from '@/components/RelatedProducts';
import { products as localProducts, type Product } from '@/data/products';
import ProductUnavailable from '@/components/ProductUnavailable';
import { useProductVisibility, localKey, shopifyKey } from '@/hooks/useProductVisibility';

const ShopifyProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const { isVisible, loading: visLoading } = useProductVisibility();
  const localProduct = localProducts.find((p) => p.shopifyHandle === handle);
  if (localProduct) {
    if (!visLoading && !isVisible(localKey(localProduct.id))) {
      return <ProductUnavailable />;
    }
    const universe =
      localProduct.collection === 'mystic' ? 'mysticlov'
      : localProduct.collection === 'bijoux' ? 'stonelov'
      : 'powerlov';
    return (
      <div className="min-h-screen bg-white" key={`local-${localProduct.id}`}>
        <Navbar />
        <ProductPage product={localProduct} />
        <RelatedProducts
          currentKey={`local:${localProduct.id}`}
          currentUniverse={universe as 'powerlov' | 'mysticlov' | 'stonelov'}
        />
        <Footer />
      </div>
    );
  }
  if (handle && !visLoading && !isVisible(shopifyKey(handle))) {
    return <ProductUnavailable />;
  }
  return <ShopifyOnlyDetail key={`shopify-${handle}`} />;
};

const detectCollection = (p: ShopifyProduct['node']): Product['collection'] => {
  const t = (p.productType || '').toLowerCase();
  const title = p.title.toLowerCase();
  if (/powerlov|power/.test(title) || /power/.test(t)) return 'standard';
  if (/collier|bracelet|stone|bijou/.test(title) || /stone|bijou/.test(t)) return 'bijoux';
  return 'mystic';
};

const detectSubcategory = (p: ShopifyProduct['node']): Product['subcategory'] => {
  const s = `${p.title} ${p.productType || ''}`.toLowerCase();
  if (/hoodie|capuche/.test(s)) return 'hoodie';
  if (/crewneck|sweat/.test(s)) return 'crewneck';
  if (/t-shirt|tshirt|tee/.test(s)) return 'tshirt';
  return undefined;
};

const ShopifyOnlyDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [node, setNode] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!handle) return;
    setLoading(true);
    fetchShopifyProductByHandle(handle)
      .then((p) => setNode(p))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [handle]);

  const collection = node ? detectCollection(node) : 'mystic';
  const universeKey: 'powerlov' | 'mysticlov' | 'stonelov' =
    collection === 'standard' ? 'powerlov' : collection === 'bijoux' ? 'stonelov' : 'mysticlov';

  useEffect(() => {
    if (!node) return;
    const firstImage = node.images.edges[0]?.node.url || '';
    trackViewedProduct({
      key: `shopify:${node.handle}`,
      name: node.title,
      price: parseFloat(node.priceRange.minVariantPrice.amount).toFixed(0),
      image: firstImage,
      universe: universeKey,
      link: `/product/${node.handle}`,
    });
  }, [node?.handle]);

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

  if (!node) {
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

  const imageUrls = node.images.edges.map((e) => e.node.url);
  const pseudoProduct: Product = {
    id: `shopify-${node.handle}`,
    shopifyHandle: node.handle,
    name: node.title,
    price: Math.round(parseFloat(node.priceRange.minVariantPrice.amount)),
    collection,
    subcategory: detectSubcategory(node),
    description: node.description || '',
    details: '',
    image: imageUrls[0] || '',
    gallery: imageUrls.slice(1),
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ProductPage product={pseudoProduct} />
      <RelatedProducts
        currentKey={`shopify:${node.handle}`}
        currentUniverse={universeKey}
      />
      <Footer />
    </div>
  );
};

export default ShopifyProductDetail;
