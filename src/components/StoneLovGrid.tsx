import { useState } from "react";
import grid1 from "@/assets/stonelov/grid-1.jpg";
import grid2 from "@/assets/stonelov/grid-2.jpg";
import grid3 from "@/assets/stonelov/grid-3.jpg";
import grid4 from "@/assets/stonelov/grid-4.jpg";
import grid5 from "@/assets/stonelov/grid-5.jpg";
import grid6 from "@/assets/stonelov/grid-6.jpg";
import gridSmall1 from "@/assets/stonelov/grid-small-1.jpg.asset.json";
import gridSmall2 from "@/assets/stonelov/grid-small-2.jpg.asset.json";

const images = [
  { src: grid1, alt: "Collier œil de tigre rose sur sable" },
  { src: grid2, alt: "Collier malachite verte avec pendentif corail rouge" },
  { src: gridSmall1.url, alt: "Collier améthyste, citrine et malachite sur rocher" },
  { src: grid3, alt: "Collier jade vert avec pendentif pierre blanche" },
  { src: grid4, alt: "Colliers multicolores en pierres sur rocher" },
  { src: gridSmall2.url, alt: "Bracelets turquoise et corail sur sable" },
  { src: grid5, alt: "Collier corail rouge sur rocher" },
  { src: grid6, alt: "Collier turquoise et calcédoine bleue sur rocher" },
];

const StoneLovGrid = () => {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section style={{ backgroundColor: "#FAF7F2" }}>
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-5"
        style={{ padding: "clamp(20px, 3vw, 40px)" }}
      >
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setLightbox(img.src)}
            className="overflow-hidden block group p-0 border-0 bg-transparent cursor-pointer"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full aspect-[3/4] object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.9)", cursor: "zoom-out" }}
        >
          <img src={lightbox} alt="" className="max-w-full max-h-full object-contain" />
        </div>
      )}
    </section>
  );
};

export default StoneLovGrid;
