import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import slide1landscape from '@/assets/hero-slide-3.png';
import slide2landscape from '@/assets/slide2-landscape.jpeg';
import slide3landscape from '@/assets/slide3-landscape.png';

type Slide = { images: string[]; landscape?: string };

const slides: Slide[] = [
  { images: [], landscape: slide3landscape },
  { images: [], landscape: slide2landscape },
  { images: [], landscape: slide1landscape },
];

const HeroCarousel = () => {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + slides.length) % slides.length);
  const next = () => setActive((a) => (a + 1) % slides.length);

  return (
    <section className="w-full bg-[#FAF7F2]">
      <div className="relative w-full">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div key={i} className="w-full flex-shrink-0">
                {slide.landscape ? (
                  <div className="overflow-hidden bg-[#F0EBE3] h-[60vh] md:h-[65vh]">
                    <img
                      src={slide.landscape}
                      alt={`Slide ${i + 1}`}
                      className={`w-full h-full object-cover ${i === 0 ? 'object-[center_10%]' : i === 2 ? 'object-[center_35%]' : ''}`}
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 px-6 md:px-10">
                    {slide.images.length > 0 ? (
                      slide.images.map((src, j) => (
                        <div key={j} className="aspect-[3/4] overflow-hidden bg-[#F0EBE3]">
                          <img
                            src={src}
                            alt={`Slide ${i + 1} visuel ${j + 1}`}
                            className={`w-full h-full ${i === 1 ? 'object-contain' : 'object-cover'}`}
                          />
                        </div>
                      ))
                    ) : (
                      [0, 1, 2].map((j) => (
                        <div
                          key={j}
                          className="aspect-[3/4] bg-[#F0EBE3] flex items-center justify-center text-[10px] tracking-[0.2em] uppercase text-[#B4A99A]"
                        >
                          Visuel à venir
                        </div>
                      ))
                    )}
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>

        <button
          onClick={prev}
          aria-label="Précédent"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-white/70 hover:text-white transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          aria-label="Suivant"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-white/70 hover:text-white transition-colors"
        >
          <ChevronRight size={18} />
        </button>

        <div className="flex items-center justify-center gap-2 mt-6 pb-6">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Aller à la slide ${i + 1}`}
              className={`h-[2px] transition-all ${
                active === i ? 'w-8 bg-[#1A1A1A]' : 'w-4 bg-[#D8D2C7]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
