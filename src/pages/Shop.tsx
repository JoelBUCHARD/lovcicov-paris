import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { standardProducts, mysticProducts, bijouxProducts } from '@/data/products';
import type { Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type Collection = 'all' | 'standard' | 'mystic' | 'bijoux';
type Subcategory = 'all' | 'tshirt' | 'crewneck' | 'hoodie';

const Shop = () => {
  const [active, setActive] = useState<Collection>('all');
  const [sub, setSub] = useState<Subcategory>('all');

  const handleCollectionChange = (key: Collection) => {
    setActive(key);
    setSub('all');
  };

  const getCollectionProducts = (): Product[] => {
    if (active === 'all') return [...standardProducts, ...mysticProducts, ...bijouxProducts];
    if (active === 'standard') return standardProducts;
    if (active === 'mystic') return mysticProducts;
    return bijouxProducts;
  };

  const collectionProducts = getCollectionProducts();

  // Detect which subcategories exist in the current collection
  const availableSubs = useMemo(() => {
    if (active === 'all') return [];
    const subs = new Set(collectionProducts.map(p => p.subcategory).filter(Boolean));
    return subs.size > 1 ? Array.from(subs) : [];
  }, [active, collectionProducts]);

  const filtered = sub === 'all'
    ? collectionProducts
    : collectionProducts.filter(p => p.subcategory === sub);

  const subLabels: Record<string, string> = {
    tshirt: 'T-Shirts',
    crewneck: 'Sweats Col Rond',
    hoodie: 'Sweats Capuche',
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-24 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-serif font-light mb-4">Boutique</h1>
          <p className="text-muted-foreground text-sm mb-16">Toutes les collections LOVCICOV</p>

          {/* Collection filter */}
          <div className="flex gap-8 mb-8 border-b border-border">
            {([
              { key: 'all' as Collection, label: 'Tout' },
              { key: 'standard' as Collection, label: 'Standards' },
              { key: 'mystic' as Collection, label: 'Mystic Lov' },
              { key: 'bijoux' as Collection, label: 'Bijoux' },
            ]).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleCollectionChange(key)}
                className={`text-brand text-xs pb-4 transition-all border-b-2 -mb-[2px] ${
                  active === key
                    ? 'border-foreground opacity-100'
                    : 'border-transparent opacity-40 hover:opacity-70'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Subcategory filter — shown when collection has multiple subcategories */}
          {availableSubs.length > 0 && (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex gap-4 mb-8"
            >
              <button
                onClick={() => setSub('all')}
                className={`text-[11px] px-4 py-2 border transition-all ${
                  sub === 'all'
                    ? 'border-foreground text-foreground'
                    : 'border-border text-muted-foreground hover:border-foreground'
                }`}
              >
                Tout
              </button>
              {availableSubs.map((s) => (
                <button
                  key={s}
                  onClick={() => setSub(s as Subcategory)}
                  className={`text-[11px] px-4 py-2 border transition-all ${
                    sub === s
                      ? 'border-foreground text-foreground'
                      : 'border-border text-muted-foreground hover:border-foreground'
                  }`}
                >
                  {subLabels[s!] || s}
                </button>
              ))}
            </motion.div>
          )}

          {/* Collection header */}
          {active === 'standard' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-serif font-light mb-3">Collection Standards</h2>
              <p className="text-muted-foreground text-sm max-w-lg">
                Des pièces à message fort. Pensées pour ceux qui choisissent leur propre direction.
              </p>
            </motion.div>
          )}
          {active === 'mystic' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-serif font-light mb-3">Mystic Lov</h2>
              <p className="text-muted-foreground text-sm max-w-lg">
                Coton bio certifié vegan, traçable de la graine au sweat. Pour celles et ceux qui veulent porter un message sans faire de compromis.
              </p>
            </motion.div>
          )}
          {active === 'bijoux' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-serif font-light mb-3">Bijoux</h2>
              <p className="text-muted-foreground text-sm max-w-lg leading-relaxed">
                Chaque pièce est composée de pierres naturelles sélectionnées pour leur caractère et leur couleur. Assemblés à la main, ces bijoux sont inspirés de symboles intemporels et de compositions vibrantes. Chaque création est unique, comme l'histoire de la personne qui la porte.
              </p>
            </motion.div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
