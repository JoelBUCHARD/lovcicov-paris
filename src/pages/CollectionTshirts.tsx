import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShopifyProductCard from '@/components/ShopifyProductCard';
import { fetchShopifyProducts, type ShopifyProduct } from '@/lib/shopify';

const ARIAL = 'Arial, sans-serif';

const isTshirt = (p: ShopifyProduct) => {
  const t = (p.node.productType || '').toLowerCase();
  const title = p.node.title.toLowerCase();
  const tags = (p.node.tags || []).map((x) => x.toLowerCase());
  return (
    t.includes('t-shirt') ||
    t.includes('tshirt') ||
    t.includes('tee') ||
    title.includes('t-shirt') ||
    title.includes('tshirt') ||
    tags.some((x) => x.includes('t-shirt') || x.includes('tshirt') || x.includes('tee'))
  );
};

const CollectionTshirts = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShopifyProducts(100)
      .then((all) => {
        const tees = all.filter(isTshirt);
        setProducts(tees.length ? tees : all);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F2' }}>
      <Navbar />
      <main className="pt-40 md:pt-52 pb-20 px-6">
        <div className="text-center mb-12">
          <h1
            className="italic text-[#1A1A1A]"
            style={{ fontFamily: 'Arial, sans-serif', fontSize: '36px', fontWeight: 200 }}
          >
            Tous les t-shirts
          </h1>
        </div>

        {loading ? (
          <p className="text-center text-[12px] text-[#888780]" style={{ fontFamily: ARIAL }}>
            Chargement…
          </p>
        ) : products.length === 0 ? (
          <p className="text-center text-[12px] text-[#888780]" style={{ fontFamily: ARIAL }}>
            Aucun t-shirt disponible.
          </p>
        ) : (
          <div className="mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 max-w-6xl px-6 md:px-10">
            {products.map((p, i) => (
              <ShopifyProductCard key={p.node.id} product={p} index={i} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CollectionTshirts;
