import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { bijouxProducts, type Product } from '@/data/products';

const imageModulesJpg = import.meta.glob('@/assets/*.jpg', { eager: true, import: 'default' }) as Record<string, string>;
const imageModulesWebp = import.meta.glob('@/assets/*.webp', { eager: true, import: 'default' }) as Record<string, string>;
const imageModules = { ...imageModulesJpg, ...imageModulesWebp };
const getImage = (key: string) => {
  const match = Object.entries(imageModules).find(([path]) => path.includes(key));
  return match ? match[1] : '';
};

const Card = ({ product }: { product: Product }) => (
  <div
    className="bg-white rounded-[4px] overflow-hidden flex flex-col flex-shrink-0 w-[66%] sm:w-[48%] md:w-[calc((100%-2rem)/3)]"
    style={{ border: '0.5px solid #E8D8C8' }}
  >
    <Link to={`/shop/${product.id}`} className="block relative">
      <div className="aspect-square overflow-hidden bg-[#FDF5EF]">
        <img src={getImage(product.image)} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <span
        className="absolute top-3 left-3 text-[9px] uppercase tracking-[0.12em] font-medium px-2 py-1"
        style={{ background: '#FDF5EF', color: '#C4714A' }}
      >
        StoneLov
      </span>
      {product.badge && (
        <span
          className="absolute top-3 right-3 text-[9px] uppercase tracking-[0.12em] font-medium px-2 py-1"
          style={{ background: '#FDF5EF', color: '#C4714A' }}
        >
          {product.badge}
        </span>
      )}
    </Link>
    <h3 className="text-[13px] font-normal text-[#1A1A1A] px-3.5 pt-2.5 pb-1">{product.name}</h3>
    <p className="text-[12px] text-[#5F5E5A] px-3.5 pb-2.5">€{product.price}</p>
    <Link
      to={`/shop/${product.id}`}
      className="mt-auto block text-center text-white text-[9px] uppercase tracking-[0.15em] font-medium py-[11px] transition-colors"
      style={{ background: '#C4714A' }}
      onMouseEnter={(e) => (e.currentTarget.style.background = '#A55A35')}
      onMouseLeave={(e) => (e.currentTarget.style.background = '#C4714A')}
    >
      Découvrir la pièce
    </Link>
  </div>
);

const CoupsDeCoeurCarousel = () => {
  const products = bijouxProducts.slice(0, 10);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);
  const totalDots = Math.max(1, products.length - 2); // groups of 3 visible

  const scrollByCards = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    if (!card) return;
    const gap = 16;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' });
  };

  const goToDot = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    if (!card) return;
    const gap = 16;
    el.scrollTo({ left: i * (card.offsetWidth + gap), behavior: 'smooth' });
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const card = el.querySelector<HTMLElement>('[data-card]');
      if (!card) return;
      const gap = 16;
      const i = Math.round(el.scrollLeft / (card.offsetWidth + gap));
      setActiveDot(Math.min(totalDots - 1, Math.max(0, i)));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [totalDots]);

  return (
    <section className="py-20 md:py-24 px-6 md:px-10" style={{ background: '#FDF5EF' }}>
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-[9px] uppercase tracking-[0.2em] mb-3" style={{ color: '#C4714A' }}>
          StoneLov · Lancement
        </p>
        <h2 className="text-[22px] font-light text-[#1A1A1A] mb-3">Les bijoux du moment</h2>
        <p className="italic text-[12px] text-[#888780] mb-12">
          Pierres naturelles · Pièces singulières · Paris
        </p>

        <div className="relative">
          <button
            onClick={() => scrollByCards(-1)}
            aria-label="Précédent"
            className="hidden md:flex absolute -left-2 top-1/2 -translate-y-1/2 z-10 p-2 hover:opacity-60 transition-opacity"
            style={{ color: '#C4714A' }}
          >
            <ChevronLeft size={28} strokeWidth={1.25} />
          </button>
          <button
            onClick={() => scrollByCards(1)}
            aria-label="Suivant"
            className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 p-2 hover:opacity-60 transition-opacity"
            style={{ color: '#C4714A' }}
          >
            <ChevronRight size={28} strokeWidth={1.25} />
          </button>

          <div
            ref={scrollerRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory md:mx-8 pb-2"
            style={{ scrollbarWidth: 'none' }}
          >
            {products.map((p) => (
              <div key={p.id} data-card className="snap-start">
                <Card product={p} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: totalDots }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToDot(i)}
              aria-label={`Aller à ${i + 1}`}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === activeDot ? 24 : 6,
                background: i === activeDot ? '#C4714A' : '#E8D8C8',
              }}
            />
          ))}
        </div>

        <Link
          to="/collections/bijoux"
          className="inline-block mt-10 text-[10px] uppercase tracking-[0.15em] hover:underline transition-all"
          style={{ color: '#C4714A' }}
        >
          Voir toute la collection StoneLov →
        </Link>

        <p className="mt-4 italic text-[11px]" style={{ color: '#B4A99A' }}>
          PowerLov &amp; MysticLov — Bientôt disponibles
        </p>
      </div>
    </section>
  );
};

export default CoupsDeCoeurCarousel;
