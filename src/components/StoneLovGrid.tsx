import { Link } from "react-router-dom";
import grid1 from "@/assets/stonelov/grid-1.jpg";
import grid2 from "@/assets/stonelov/grid-2.jpg";
import grid3 from "@/assets/stonelov/grid-3.jpg";
import grid4 from "@/assets/stonelov/grid-4.jpg";
import grid5 from "@/assets/stonelov/grid-5.jpg";
import grid6 from "@/assets/stonelov/grid-6.jpg";
import gridSmall1 from "@/assets/stonelov/grid-small-1.jpg.asset.json";
import gridSmall2 from "@/assets/stonelov/grid-small-2.jpg.asset.json";

const images = [
  { src: grid1, alt: "Collier œil de tigre rose sur sable", handle: "collier-oeil-de-tigre-fuchsia" },
  { src: grid2, alt: "Collier malachite verte avec pendentif corail rouge", handle: "collier-malachite-et-corail" },
  { src: gridSmall1.url, alt: "Collier améthyste, citrine et malachite sur rocher", handle: "collier-citrine-malachite-amethyste" },
  { src: grid3, alt: "Collier jade vert avec pendentif pierre blanche", handle: "collier-jade-et-nacre" },
  { src: grid4, alt: "Colliers multicolores en pierres sur rocher", handle: "collier-corail-et-pierres-multicolores" },
  { src: gridSmall2.url, alt: "Bracelets turquoise et corail sur sable", handle: "bracelet-turquoise-et-corail-rouge" },
  { src: grid5, alt: "Collier corail rouge sur rocher", handle: "collier-corail-rouge-et-or" },
  { src: grid6, alt: "Collier turquoise et calcédoine bleue sur rocher", handle: "collier-turquoise-et-or" },
];

const StoneLovGrid = () => {
  return (
    <section style={{ backgroundColor: "#FAF7F2" }}>
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-5"
        style={{ padding: "clamp(20px, 3vw, 40px)" }}
      >
        {images.map((img, i) => (
          <Link
            key={i}
            to={`/product/${img.handle}`}
            className="overflow-hidden block group cursor-pointer"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full aspect-[3/4] object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default StoneLovGrid;
