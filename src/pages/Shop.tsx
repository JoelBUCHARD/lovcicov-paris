import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { standardProducts, mysticProducts, bijouxProducts } from '@/data/products';
import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import Footer from '@/components/Footer';
import JourneyContinuation from '@/components/JourneyContinuation';
import TrustLine from '@/components/TrustLine';
import CollectionHeader from '@/components/CollectionHeader';
import EditorialProductCard from '@/components/EditorialProductCard';
import EditorialPause from '@/components/EditorialPause';
import { useProductVisibility, localKey } from '@/hooks/useProductVisibility';

type Collection = 'all' | 'standard' | 'mystic' | 'bijoux';
type SortKey = 'featured' | 'price-asc' | 'price-desc';

const validCollections: Collection[] = ['all', 'standard', 'mystic', 'bijoux'];

const filterMeta: Record<Collection, { label: string; accent: string }> = {
  all: { label: 'Tout', accent: '#1A1A1A' },
  standard: { label: 'PowerLov', accent: '#1A1A1A' },
  mystic: { label: 'MysticLov', accent: '#C94A4A' },
  bijoux: { label: 'StoneLov', accent: '#A55A35' },
};

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const collectionParam = searchParams.get('collection') as Collection | null;
  const initialCollection =
    collectionParam && validCollections.includes(collectionParam) ? collectionParam : 'all';

  const [active, setActive] = useState<Collection>(initialCollection);
  const [sort, setSort] = useState<SortKey>('featured');

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

  const products = useMemo(() => {
    const base =
      active === 'standard'
        ? visibleStandard
        : active === 'mystic'
        ? visibleMystic
        : active === 'bijoux'
        ? visibleBijoux
        : [...visibleStandard, ...visibleMystic, ...visibleBijoux];

    const sorted = [...base];
    if (sort === 'price-asc') sorted.sort((a, b) => Number(a.price) - Number(b.price));
    if (sort === 'price-desc') sorted.sort((a, b) => Number(b.price) - Number(a.price));
    return sorted;
  }, [active, sort, visibleStandard, visibleMystic, visibleBijoux]);

  const setCollection = (c: Collection) => {
    setActive(c);
    const next = new URLSearchParams(searchParams);
    if (c === 'all') next.delete('collection');
    else next.set('collection', c);
    setSearchParams(next, { replace: true });
  };

  const accent = filterMeta[active].accent;
  const headerCopy = {
    all: {
      title: 'La boutique.',
      intro: "Toutes les pièces LOVCICOV, réunies. Une sélection restreinte, portée avec intention.",
    },
    standard: {
      title: 'Wear your power.',
      intro: 'Des silhouettes affirmées, pensées comme une posture.',
    },
    mystic: {
      title: 'Wear your intention.',
      intro: 'Des talismans contemporains, brodés à la main.',
    },
    bijoux: {
      title: 'Wear the stone.',
      intro: 'La pierre choisie comme un signe. La matière comme mémoire.',
    },
  }[active];

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <SEO
        title="Boutique — LOVCICOV Paris"
        description="Découvrez la boutique LOVCICOV Paris : t-shirts, sweats et bijoux PowerLov, MysticLov et StoneLov. Pièces éditoriales, matières nobles."
        path={active === 'all' ? '/shop' : `/shop?collection=${active}`}
      />
      <Navbar />

      <main className="pt-32 md:pt-40 pb-24">
        <CollectionHeader
          kicker="Maison LOVCICOV · Boutique"
          title={headerCopy.title}
          intro={headerCopy.intro}
          accent={accent}
        />

        {/* Filters + sort */}
        <div className="px-6 md:px-12 mb-14 md:mb-20">
          <div className="mx-auto max-w-[1360px] flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-t border-b border-[#E8E1D5] py-5">
            <nav aria-label="Filtres collection" className="flex flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-3">
              {(Object.keys(filterMeta) as Collection[]).map((key) => {
                const isActive = active === key;
                return (
                  <button
                    key={key}
                    onClick={() => setCollection(key)}
                    className="uppercase transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FAF7F2] pb-1 border-b"
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.28em',
                      color: isActive ? filterMeta[key].accent : '#8B7D6B',
                      borderBottomColor: isActive ? filterMeta[key].accent : 'transparent',
                    }}
                    aria-pressed={isActive}
                  >
                    {filterMeta[key].label}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center justify-center md:justify-end gap-3">
              <label
                htmlFor="sort"
                className="uppercase text-[#8B7D6B] font-light"
                style={{ fontSize: 10, letterSpacing: '0.28em' }}
              >
                Tri
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="bg-transparent border-b border-[#E8E1D5] pb-1 pr-6 uppercase text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] cursor-pointer"
                style={{ fontSize: 10, letterSpacing: '0.22em' }}
              >
                <option value="featured">Sélection</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid */}
        <section aria-label="Produits" className="px-6 md:px-12">
          <div className="mx-auto max-w-[1360px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active + sort}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-10 gap-y-16 md:gap-y-24"
              >
                {products.slice(0, 4).map((p, i) => (
                  <EditorialProductCard
                    key={p.id}
                    product={{ id: p.id, name: p.name, price: p.price, image: p.image, hover: p.gallery?.[0] }}
                    index={i}
                    eager={i < 2}
                  />
                ))}



                {products.slice(4).map((p, i) => (
                  <EditorialProductCard
                    key={p.id}
                    product={{ id: p.id, name: p.name, price: p.price, image: p.image, hover: p.gallery?.[0] }}
                    index={i}
                  />
                ))}

                {products.length === 0 && (
                  <div className="col-span-2 md:col-span-4 py-24 text-center">
                    <p
                      className="uppercase font-light mb-4"
                      style={{ fontSize: 10, letterSpacing: '0.32em', color: accent }}
                    >
                      Aucune pièce
                    </p>
                    <p
                      className="italic font-light text-[#1A1A1A] mx-auto"
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: 'clamp(22px, 2.4vw, 28px)',
                        lineHeight: 1.4,
                        maxWidth: 480,
                      }}
                    >
                      Rien à afficher dans cette sélection.
                    </p>
                    <button
                      onClick={() => setCollection('all')}
                      className="inline-block mt-8 uppercase border-b border-[#1A1A1A] pb-1 text-[#1A1A1A]"
                      style={{ fontSize: 10, letterSpacing: '0.28em' }}
                    >
                      Voir toutes les pièces
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Discreet reassurance */}
        {products.length > 0 && (
          <div className="mt-20 md:mt-28 border-t border-[#EFE9DF] pt-10">
            <TrustLine />
          </div>
        )}

        {/* Closing editorial line */}
        {products.length > 0 && (
          <div className="mt-16 md:mt-20 text-center px-6">
            <p
              className="italic font-light text-[#1A1A1A] mx-auto"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(22px, 2.6vw, 30px)',
                lineHeight: 1.4,
                maxWidth: 520,
              }}
            >
              Presence over appearance.
            </p>
            <Link
              to="/fondatrice"
              className="inline-block mt-8 uppercase border-b border-[#1A1A1A] pb-1 text-[#1A1A1A]"
              style={{ fontSize: 10, letterSpacing: '0.28em' }}
            >
              Notre histoire
            </Link>
          </div>
        )}
      </main>

      <JourneyContinuation />
      <Footer />
    </div>
  );
};

export default Shop;
