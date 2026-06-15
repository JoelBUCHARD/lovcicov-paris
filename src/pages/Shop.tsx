import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { standardProducts, mysticProducts, bijouxProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useProductVisibility, localKey } from '@/hooks/useProductVisibility';

type Collection = 'all' | 'standard' | 'mystic' | 'bijoux';

const validCollections: Collection[] = ['all', 'standard', 'mystic', 'bijoux'];

const Shop = () => {
  const [searchParams] = useSearchParams();
  const collectionParam = searchParams.get('collection') as Collection | null;
  const initialCollection = collectionParam && validCollections.includes(collectionParam) ? collectionParam : 'all';

  const [active, setActive] = useState<Collection>(initialCollection);

  useEffect(() => {
    if (collectionParam && validCollections.includes(collectionParam)) {
      setActive(collectionParam);
      return;
    }
    setActive('all');
  }, [collectionParam]);

  const { isVisible } = useProductVisibility();
  const visibleStandard = useMemo(() => standardProducts.filter((p) => isVisible(localKey(p.id))), [isVisible]);
  const visibleMystic = useMemo(() => mysticProducts.filter((p) => isVisible(localKey(p.id))), [isVisible]);
  const visibleBijoux = useMemo(() => bijouxProducts.filter((p) => isVisible(localKey(p.id))), [isVisible]);

  const localProducts = useMemo(() => {
    if (active === 'standard') return visibleStandard;
    if (active === 'mystic') return visibleMystic;
    if (active === 'bijoux') return visibleBijoux;
    return [...visibleStandard, ...visibleMystic, ...visibleBijoux];
  }, [active, visibleStandard, visibleMystic, visibleBijoux]);


  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-52 md:pt-56 pb-24 px-6 md:px-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>

          {/* Collection headers */}
          {active === 'all' && (
            <motion.div key="all-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-12 max-w-lg mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-medium mb-4">Toutes les pièces</h2>
            </motion.div>
          )}
          {active === 'standard' && (
            <motion.div key="standard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-12 max-w-lg mx-auto text-center">
              <p className="text-[9px] tracking-[0.18em] text-[#1A1A1A] mb-8 font-medium">
                PowerLov
              </p>
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">La collection rassemble des pièces aux lignes épurées et affirmées, pensées pour accompagner une présence et une attitude.</p>
                <p className="text-muted-foreground text-sm leading-relaxed">Des créations conçues pour celles et ceux qui avancent avec intention et définissent leur propre direction.</p>
              </div>
            </motion.div>
          )}
          {active === 'mystic' && (
            <motion.div key="mystic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-12 max-w-lg mx-auto text-center">
              <p className="text-[9px] tracking-[0.18em] text-[#E66060] mb-8 font-medium">MysticLov</p>

              <div className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">Pièces brodées main, symboles sacrés et énergie portée. Chaque création est un mantra à porter.</p>
              </div>
            </motion.div>
          )}
          {active === 'bijoux' && (
            <motion.div key="bijoux" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-12 max-w-lg mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-medium mb-4">StoneLov</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">La collection StoneLov rassemble des créations composées de pierres naturelles choisies pour leur caractère et leur beauté.</p>
                <p className="text-muted-foreground text-sm leading-relaxed">Chaque bijou est pensé comme un objet personnel, où la matière devient signature.</p>
              </div>
            </motion.div>
          )}

          {/* All view: grouped by universe */}
          {active === 'all' ? (
            <>
              {visibleStandard.length > 0 && (
                <section className="mb-16">
                  <h3 className="text-brand text-[11px] tracking-[0.15em] text-muted-foreground mb-6 text-center">PowerLov</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
                    {visibleStandard.map((product, i) => (
                      <ProductCard key={product.id} product={product} index={i} />
                    ))}
                  </div>
                </section>
              )}

              {visibleMystic.length > 0 && (
                <section className="mb-16">
                  <h3 className="text-brand text-[11px] tracking-[0.15em] text-muted-foreground mb-6 text-center">MysticLov</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
                    {visibleMystic.map((product, i) => (
                      <ProductCard key={product.id} product={product} index={i} />
                    ))}
                  </div>
                </section>
              )}

              {visibleBijoux.length > 0 && (
                <section>
                  <h3 className="text-brand text-[11px] tracking-[0.15em] text-muted-foreground mb-6 text-center">StoneLov</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
                    {visibleBijoux.map((product, i) => (
                      <ProductCard key={product.id} product={product} index={i} />
                    ))}
                  </div>
                </section>
              )}
            </>
          ) : (
            localProducts.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
                {localProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
