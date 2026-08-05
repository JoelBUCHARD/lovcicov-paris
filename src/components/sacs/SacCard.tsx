import { Link } from "react-router-dom";
import type { SacProduct } from "@/data/sacsTresses";

const SacCard = ({ product }: { product: SacProduct }) => (
  <Link
    to={`/sacs/${product.slug}`}
    className="group block focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1A1A1A]"
  >
    <div className="relative w-full overflow-hidden bg-[#F3EFE8]" style={{ aspectRatio: "3 / 4" }}>
      <img
        src={product.images[0]}
        alt={product.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
    </div>
    <div className="pt-4 text-center">
      <h3
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 20,
          lineHeight: 1.3,
          color: "#1A1A1A",
        }}
      >
        {product.name}
      </h3>
      <p style={{ fontSize: 12, color: "rgba(13,13,13,0.6)", marginTop: 4 }}>{product.coloris}</p>
      <div className="mt-2 flex items-center justify-center gap-1.5" aria-hidden="true">
        {product.swatch.map((c) => (
          <span
            key={c}
            className="inline-block rounded-full"
            style={{ width: 9, height: 9, backgroundColor: c, border: "0.5px solid rgba(13,13,13,0.25)" }}
          />
        ))}
      </div>
      <p
        className="mt-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
        style={{ fontSize: 13, color: "#1A1A1A" }}
      >
        {product.price} €
      </p>
    </div>
  </Link>
);

export default SacCard;
