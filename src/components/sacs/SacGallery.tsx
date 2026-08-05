import { useEffect, useState } from "react";

interface Props {
  images: string[];
  alt: string;
}

/**
 * Galerie de fiche produit « Sacs tressés ».
 * - 1 image  : affichage plein cadre, sans vignettes ni flèches.
 * - 2+ images: vignettes verticales à gauche (desktop) + carrousel swipe (mobile).
 * Zoom au clic dans tous les cas.
 */
const SacGallery = ({ images, alt }: Props) => {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const multi = images.length > 1;

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoomed(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomed]);

  const main = (
    <button
      type="button"
      onClick={() => setZoomed(true)}
      aria-label={`Agrandir l'image : ${alt}`}
      className="block w-full overflow-hidden bg-[#F3EFE8] cursor-zoom-in focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1A1A1A]"
    >
      <img
        src={images[active]}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full h-auto object-cover"
      />
    </button>
  );

  return (
    <>
      <div className="flex gap-3">
        {multi && (
          <div className="hidden md:flex flex-col gap-3 shrink-0" style={{ width: 78 }}>
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Voir le visuel ${i + 1}`}
                aria-current={i === active}
                className="overflow-hidden bg-[#F3EFE8] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1A1A1A]"
                style={{
                  border: i === active ? "1px solid #1A1A1A" : "1px solid transparent",
                  aspectRatio: "3 / 4",
                }}
              >
                <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="flex-1 min-w-0">
          {/* Desktop / mono-image : image principale */}
          <div className={multi ? "hidden md:block" : "block"}>{main}</div>

          {/* Mobile multi-images : carrousel swipe */}
          {multi && (
            <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-2">
              {images.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setZoomed(true)}
                  className="snap-start shrink-0 w-full bg-[#F3EFE8] cursor-zoom-in"
                  aria-label={`Agrandir l'image : ${alt}`}
                >
                  <img src={src} alt={alt} loading="lazy" className="w-full h-auto object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setZoomed(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 cursor-zoom-out"
          style={{ backgroundColor: "rgba(13,13,13,0.92)" }}
        >
          <button
            type="button"
            onClick={() => setZoomed(false)}
            aria-label="Fermer le zoom"
            className="absolute top-4 right-5 text-[#FAF8F4] uppercase"
            style={{ fontSize: 11, letterSpacing: "0.2em" }}
          >
            Fermer
          </button>
          <img src={images[active]} alt={alt} className="max-h-[92vh] max-w-full object-contain" />
        </div>
      )}
    </>
  );
};

export default SacGallery;
