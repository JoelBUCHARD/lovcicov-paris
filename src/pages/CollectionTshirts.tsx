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
      <main className="pt-32 md:pt-36 pb-20 px-6">
        <div className="text-center mb-12">
          <p
            style={{
              fontFamily: ARIAL,
              fontSize: 9,
              textTransform: 'uppercase',
              color: '#1A1A1A',
              letterSpacing: '0.2em',
            }}
          >
            LOVCICOV PARIS
          </p>
          <h1
            className="italic mt-4"
            style={{
              fontFamily: ARIAL,
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 200,
              color: '#1A1A1A',
              lineHeight: 1.1,
            }}
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
          <div className="mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl">
            {products.map((p) => {
              const img = p.node.images.edges[0]?.node.url;
              return (
                <Link
                  key={p.node.id}
                  to={`/product/${p.node.handle}`}
                  className="block group"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-white mb-3">
                    {img && (
                      <img
                        src={img}
                        alt={p.node.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <p style={{ fontFamily: ARIAL, fontSize: 12, color: '#1A1A1A' }}>
                    {p.node.title}
                  </p>
                  <p style={{ fontFamily: ARIAL, fontSize: 12, color: '#888780', marginTop: 2 }}>
                    €{Number(p.node.priceRange.minVariantPrice.amount).toFixed(0)}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CollectionTshirts;
