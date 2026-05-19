import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { standardProducts, mysticProducts, bijouxProducts, type Product } from '@/data/products';

const imageModulesJpg = import.meta.glob('@/assets/*.jpg', { eager: true, import: 'default' }) as Record<string, string>;
const imageModulesWebp = import.meta.glob('@/assets/*.webp', { eager: true, import: 'default' }) as Record<string, string>;
const imageModules = { ...imageModulesJpg, ...imageModulesWebp };
const getImage = (key: string) => {
  const match = Object.entries(imageModules).find(([path]) => path.includes(key));
  return match ? match[1] : '';
};

const find = (arr: Product[], id: string) => arr.find((p) => p.id === id)!;

type BadgeKey = 'powerlov' | 'mysticlov' | 'stonelov';

const badgeStyles: Record<BadgeKey, { bg: string; color: string; label: string }> = {
  powerlov: { bg: '#F2D9E0', color: '#C4407A', label: 'POWERLOV' },
  mysticlov: { bg: '#EDE8FC', color: '#6B3FA0', label: 'MYSTICLOV' },
  stonelov: { bg: '#FDF5EF', color: '#C4714A', label: 'STONELOV' },
};

const slides: { badge: BadgeKey; products: Product[] }[] = [
  {
    badge: 'powerlov',
    products: [
      find(standardProducts, 'hoodie-signature'),
      find(standardProducts, 'tshirt-statement'),
      find(standardProducts, 'crewneck-standard'),
    ],
  },
  {
    badge: 'mysticlov',
    products: [
      find(mysticProducts, 'mystic-hoodie-noir'),
      find(mysticProducts, 'mystic-tshirt-noir'),
      find(mysticProducts, 'mystic-crewneck-noir'),
    ],
  },
  {
    badge: 'stonelov',
    products: [
      find(bijouxProducts, 'collier-fuchsia-or'),
      find(bijouxProducts, 'collier-quartz-aventurine'),
      find(bijouxProducts, 'collier-malachite-corail'),
    ],
  },
];

const Card = ({ product, badgeKey }: { product: Product; badgeKey: BadgeKey }) => {
  const b = badgeStyles[badgeKey];
  return (
    <div className="bg-white rounded-[4px] overflow-hidden flex flex-col" style={{ border: '0.5px solid #E8E4DC' }}>
      <Link to={`/shop/${product.id}`} className="block relative">
        <div className="aspect-[3/4] overflow-hidden bg-[#FAF7F2]">
          <img src={getImage(product.image)} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <span
          className="absolute top-3 left-3 text-[9px] uppercase tracking-[0.12em] font-medium px-2 py-1"
          style={{ background: b.bg, color: b.color }}
        >
          {b.label}
        </span>
      </Link>
      <h3 className="text-[14px] font-normal text-[#1A1A1A] px-4 pt-3 pb-1">{product.name}</h3>
      <p className="text-[13px] text-[#5F5E5A] px-4 pb-3">€{product.price}</p>
      <Link
        to={`/shop/${product.id}`}
        className="mt-auto block text-center bg-[#1A1A1A] text-white text-[9px] uppercase tracking-[0.15em] py-3 transition-colors hover:bg-[#E8529A]"
      >
        Découvrir la pièce
      </Link>
    </div>
  );
};

const CoupsDeCoeurCarousel = () => {
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const go = (i: number) => setIndex((i + total) % total);

  return (
    <section className="bg-[#FAF7F2] py-20 md:py-24 px-6 md:px-10">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-[9px] uppercase tracking-[0.2em] text-[#B4A99A] mb-3">Nos coups de coeur</p>
        <h2 className="text-[22px] font-light text-[#1A1A1A] mb-12">Les pièces du moment</h2>

        <div className="relative">
          {/* Arrows */}
          <button
            onClick={() => go(index - 1)}
            aria-label="Précédent"
            className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-[#1A1A1A] hover:opacity-60 transition-opacity"
          >
            <ChevronLeft size={28} strokeWidth={1.25} />
          </button>
          <button
            onClick={() => go(index + 1)}
            aria-label="Suivant"
            className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-[#1A1A1A] hover:opacity-60 transition-opacity"
          >
            <ChevronRight size={28} strokeWidth={1.25} />
          </button>

          {/* Track */}
          <div className="overflow-hidden mx-8 md:mx-10">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {slides.map((slide, i) => (
                <div key={i} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {slide.products.map((p) => (
                      <Card key={p.id} product={p} badgeKey={slide.badge} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Slide ${i + 1}`}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === index ? 24 : 6,
                background: i === index ? '#1A1A1A' : '#E8E4DC',
              }}
            />
          ))}
        </div>

        {/* Footer link */}
        <Link
          to="/shop"
          className="inline-block mt-10 text-[10px] uppercase tracking-[0.15em] text-[#1A1A1A] hover:text-[#E8529A] hover:underline transition-colors"
        >
          Voir toute la collection →
        </Link>
      </div>
    </section>
  );
};

export default CoupsDeCoeurCarousel;
