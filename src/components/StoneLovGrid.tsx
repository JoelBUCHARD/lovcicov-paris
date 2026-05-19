import { useState } from "react";
import grid1 from "@/assets/stonelov/grid-1.jpg";
import grid2 from "@/assets/stonelov/grid-2.jpg";
import grid3 from "@/assets/stonelov/grid-3.jpg";
import grid6 from "@/assets/stonelov/grid-6.jpg";
import talisman from "@/assets/stonelov/talisman.png";
import savoirfaire from "@/assets/stonelov/savoirfaire.png";
import closing from "@/assets/stonelov/closing.png";

const images = [
  { src: grid1, alt: "Collier œil de tigre rose sur sable" },
  { src: grid2, alt: "Collier malachite verte avec pendentif corail rouge" },
  { src: grid3, alt: "Collier jade vert avec pendentif pierre blanche" },
  { src: savoirfaire, alt: "Collier malachite vert foncé sur sable" },
  { src: closing, alt: "Collier howlite blanche et turquoise" },
  { src: grid6, alt: "Collier turquoise et corail rouge avec perles" },
];

const StoneLovGrid = () => {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section style={{ backgroundColor: "#FAF7F2", padding: "40px 0" }}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-[4px] md:gap-[6px]">
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
              className="w-full h-[220px] md:h-[420px] object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      <p
        className="text-center"
        style={{
          fontFamily: "Arial, sans-serif",
          fontStyle: "italic",
          fontSize: 12,
          color: "#B4A99A",
          letterSpacing: "0.08em",
          padding: "20px 0 40px",
        }}
      >
        Chaque collier est unique. Aucune pièce ne se répète.
      </p>

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
