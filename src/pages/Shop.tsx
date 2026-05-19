import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { standardProducts, bijouxProducts } from '@/data/products';
import type { Product } from '@/data/products';
import { fetchShopifyProducts, type ShopifyProduct } from '@/lib/shopify';
import ProductCard from '@/components/ProductCard';
import ShopifyProductCard from '@/components/ShopifyProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type Collection = 'all' | 'standard' | 'mystic' | 'bijoux';
type Subcategory = 'all' | 'tshirt' | 'crewneck' | 'hoodie';

const validCollections: Collection[] = ['all', 'standard', 'mystic', 'bijoux'];

const Shop = () => {
  const [searchParams] = useSearchParams();
  const collectionParam = searchParams.get('collection') as Collection | null;
  const initialCollection = collectionParam && validCollections.includes(collectionParam) ? collectionParam : 'all';

  const [active, setActive] = useState<Collection>(initialCollection);
  const [sub, setSub] = useState<Subcategory>('all');
  const [shopifyProducts, setShopifyProducts] = useState<ShopifyProduct[]>([]);
  const [shopifyLoading, setShopifyLoading] = useState(true);

  useEffect(() => {
    fetchShopifyProducts(20)
      .then(setShopifyProducts)
      .catch(console.error)
      .finally(() => setShopifyLoading(false));
  }, []);

  useEffect(() => {
    if (collectionParam && validCollections.includes(collectionParam)) {
      setActive(collectionParam);
      setSub('all');
      return;
    }

    setActive('all');
    setSub('all');
  }, [collectionParam]);

  const handleCollectionChange = (key: Collection) => {
    setActive(key);
    setSub('all');
  };

  // Local products for standard and bijoux
  const localProducts = useMemo(() => {
    if (active === 'mystic') return [];
    if (active === 'standard') return standardProducts;
    if (active === 'bijoux') return bijouxProducts;
    return [...standardProducts, ...bijouxProducts]; // "all" shows local + shopify
  }, [active]);

  // Show shopify products for mystic and all
  const showShopify = active === 'all' || active === 'mystic';

  // Detect which subcategories exist
  const availableSubs = useMemo(() => {
    if (active === 'all' || active === 'bijoux' || active === 'mystic') return [];
    const subs = new Set(localProducts.map(p => p.subcategory).filter(Boolean));
    return subs.size > 1 ? Array.from(subs) : [];
  }, [active, localProducts]);

  const filteredLocal = sub === 'all'
    ? localProducts
    : localProducts.filter(p => p.subcategory === sub);

  const subLabels: Record<string, string> = {
    tshirt: 'T-Shirts',
    crewneck: 'Sweats Col Rond',
    hoodie: 'Sweats Capuche',
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-40 md:pt-44 pb-24 px-6 md:px-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>

          {/* Subcategory filter */}
          {availableSubs.length > 0 && (
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setSub('all')}
                className={`text-brand text-[11px] px-4 py-2 border transition-all ${
                  sub === 'all' ? 'border-foreground text-foreground' : 'border-border text-muted-foreground hover:border-foreground'
                }`}
              >
                Tout
              </button>
              {availableSubs.map((s) => (
                <button
                  key={s}
                  onClick={() => setSub(s as Subcategory)}
                  className={`text-brand text-[11px] px-4 py-2 border transition-all ${
                    sub === s ? 'border-foreground text-foreground' : 'border-border text-muted-foreground hover:border-foreground'
                  }`}
                >
                  {subLabels[s!] || s}
                </button>
              ))}
            </div>
          )}

          {/* Collection headers */}
          {active === 'all' && (
            <motion.div key="all-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-12 max-w-lg mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-medium mb-4">Toutes les pièces</h2>
            </motion.div>
          )}
          {active === 'standard' && (
            <motion.div key="standard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-12 max-w-lg mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-medium mb-4">PowerLov</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">PowerLov incarne la conviction que la vie que l'on construit reflète les standards que l'on choisit.</p>
                <p className="text-muted-foreground text-sm leading-relaxed">La collection rassemble des pièces aux lignes épurées et affirmées, pensées pour accompagner une présence et une attitude.</p>
                <p className="text-muted-foreground text-sm leading-relaxed">Des créations conçues pour celles et ceux qui avancent avec intention et définissent leur propre direction.</p>
              </div>
            </motion.div>
          )}
          {active === 'bijoux' && (
            <motion.div key="bijoux" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-12 max-w-lg mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-medium mb-4">StoneLov</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">La collection StoneLov rassemble des créations composées de pierres naturelles choisies pour leur caractère et leur beauté.</p>
                <p className="text-muted-foreground text-sm leading-relaxed">Chaque bijou est pensé comme un objet personnel, où la matière devient signature.</p>
                <p className="text-muted-foreground text-sm leading-relaxed">Des pièces singulières, destinées à accompagner celles et ceux qui recherchent des objets porteurs de sens et de présence.</p>
              </div>
            </motion.div>
          )}

          {/* Shopify products (MysticLov) */}
          {showShopify && (
            <>
              {active === 'all' && shopifyProducts.length > 0 && (
                <h3 className="text-brand text-[11px] tracking-[0.15em] text-muted-foreground mb-6 text-center">MysticLov</h3>
              )}
              {shopifyLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="animate-spin text-muted-foreground" size={24} />
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 mb-12">
                  {shopifyProducts.map((product, i) => (
                    <ShopifyProductCard key={product.node.id} product={product} index={i} />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Local products (PowerLov / StoneLov) */}
          {filteredLocal.length > 0 && (
            <>
              {active === 'all' && (
                <h3 className="text-brand text-[11px] tracking-[0.15em] text-muted-foreground mb-6 text-center">PowerLov & StoneLov</h3>
              )}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
                {filteredLocal.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            </>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
