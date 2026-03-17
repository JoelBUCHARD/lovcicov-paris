import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { standardProducts, mysticProducts, bijouxProducts } from '@/data/products';
import type { Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
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

  useEffect(() => {
    if (collectionParam && validCollections.includes(collectionParam)) {
      setActive(collectionParam);
      setSub('all');
    }
  }, [collectionParam]);

  const handleCollectionChange = (key: Collection) => {
    setActive(key);
    setSub('all');
  };

  const collectionProducts = useMemo(() => {
    if (active === 'all') return [...standardProducts, ...mysticProducts, ...bijouxProducts];
    if (active === 'standard') return standardProducts;
    if (active === 'mystic') return mysticProducts;
    return bijouxProducts;
  }, [active]);

  // Detect which subcategories exist in the current collection
  const availableSubs = useMemo(() => {
    if (active === 'all' || active === 'bijoux') return [];
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

      <main className="pt-32 md:pt-36 pb-24 px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >

          {/* Collection filter */}
          <div className="flex justify-center gap-8 mb-8 border-b border-border">
            {([
              { key: 'all' as Collection, label: 'Voir tout' },
              { key: 'standard' as Collection, label: 'Power Lov' },
              { key: 'mystic' as Collection, label: 'Mystic Lov' },
              { key: 'bijoux' as Collection, label: 'Amulets' },
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
            <div className="flex justify-center gap-4 mb-8">
               <button
                onClick={() => setSub('all')}
                className={`text-brand text-[11px] px-4 py-2 border transition-all ${
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
                  className={`text-brand text-[11px] px-4 py-2 border transition-all ${
                    sub === s
                      ? 'border-foreground text-foreground'
                      : 'border-border text-muted-foreground hover:border-foreground'
                  }`}
                >
                  {subLabels[s!] || s}
                </button>
              ))}
            </div>
          )}

          {/* Collection header for "all" */}
          {active === 'all' && (
            <motion.div
              key="all-header"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-12 max-w-lg mx-auto text-center"
            >
              <h2 className="text-2xl md:text-3xl font-medium mb-4">Toutes les pièces</h2>
            </motion.div>
          )}

          {/* Collection header */}
          {active === 'standard' && (
            <motion.div
              key="standard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-12 max-w-lg mx-auto text-center"
            >
              <h2 className="text-2xl md:text-3xl font-medium mb-4">Standards</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Standards incarne la conviction que la vie que l'on construit reflète les standards que l'on choisit.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  La collection rassemble des pièces aux lignes épurées et affirmées, pensées pour accompagner une présence et une attitude.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Des créations conçues pour celles et ceux qui avancent avec intention et définissent leur propre direction.
                </p>
              </div>
            </motion.div>
          )}
          {active === 'mystic' && (
            <motion.div
              key="mystic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-12 max-w-lg mx-auto text-center"
            >
              <h2 className="text-2xl md:text-3xl font-medium mb-4">MysticLov</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  MysticLov explore une dimension plus intérieure du style.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Inspirée par les symboles intemporels et les archétypes universels, la collection évoque intuition, mystère et expression personnelle.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Chaque pièce devient une manière de porter un signe, une idée ou une histoire qui dépasse le simple vêtement.
                </p>
              </div>
            </motion.div>
          )}
          {active === 'bijoux' && (
            <motion.div
              key="bijoux"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-12 max-w-lg mx-auto text-center"
            >
              <h2 className="text-2xl md:text-3xl font-medium mb-4">Amulets</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  La collection Amulets rassemble des créations composées de pierres naturelles choisies pour leur caractère et leur beauté.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Chaque bijou est pensé comme un objet personnel, où la matière devient signature.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Des pièces singulières, destinées à accompagner celles et ceux qui recherchent des objets porteurs de sens et de présence.
                </p>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
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
