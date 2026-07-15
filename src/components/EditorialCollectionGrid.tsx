import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { resolveProductImage } from "@/lib/productImage";
import { prefetchRoute, prefetchImage } from "@/lib/prefetch";

export type LifestyleImage = {
  src: string;
  alt: string;
  objectPosition?: string;
  wide?: boolean; // spans 2 cols on desktop
};

export type FilterOption = {
  key: string;
  label: string;
  match: (p: Product) => boolean;
};

interface Props {
  anchorId: string;
  products: Product[];
  lifestyleImages: LifestyleImage[];
  filters: FilterOption[];
  quote: string;
  productLinkPrefix?: string; // default "/shop/"
  colors: { bg: string; ink: string; muted: string };
  typeLabel: (p: Product) => string;
}

const EditorialCollectionGrid = ({
  anchorId,
  products,
  lifestyleImages,
  filters,
  quote,
  productLinkPrefix = "/shop/",
  colors,
  typeLabel,
}: Props) => {
  const location = useLocation();
  const [active, setActive] = useState<string>("all");
  const from = `${location.pathname}${location.search}`;

  const allFilters: FilterOption[] = useMemo(
    () => [{ key: "all", label: "Tout voir", match: () => true }, ...filters],
    [filters]
  );

  const filtered = useMemo(() => {
    const f = allFilters.find((x) => x.key === active);
    return f ? products.filter(f.match) : products;
  }, [active, products, allFilters]);

  type Item =
    | { kind: "product"; product: Product; index: number }
    | { kind: "lifestyle"; image: LifestyleImage; index: number }
    | { kind: "quote"; index: number };

  const items: Item[] = useMemo(() => {
    const out: Item[] = [];
    const showExtras = active === "all";
    const cadence = 6; // 1 lifestyle every 6 product cards
    const quoteAt = Math.floor(filtered.length / 2);
    let lifestyleIdx = 0;
    filtered.forEach((p, i) => {
      out.push({ kind: "product", product: p, index: i });
      if (!showExtras) return;
      if (i === quoteAt) out.push({ kind: "quote", index: i });
      if ((i + 1) % cadence === 0 && lifestyleIdx < lifestyleImages.length) {
        out.push({ kind: "lifestyle", image: lifestyleImages[lifestyleIdx], index: i });
        lifestyleIdx++;
      }
    });
    // Ensure any remaining lifestyle images appear at the end
    if (showExtras) {
      while (lifestyleIdx < lifestyleImages.length) {
        out.push({ kind: "lifestyle", image: lifestyleImages[lifestyleIdx], index: filtered.length + lifestyleIdx });
        lifestyleIdx++;
      }
    }
    return out;
  }, [filtered, lifestyleImages, active]);

  return (
    <>
      {/* Sticky filter bar */}
      <div
        id={anchorId}
        className="sticky z-30 border-y backdrop-blur"
        style={{
          top: 73,
          backgroundColor: `${colors.bg}EE`,
          borderColor: "rgba(13,13,13,0.08)",
        }}
      >
        <div
          className="mx-auto flex items-center justify-between gap-4"
          style={{ padding: "14px clamp(16px, 4vw, 48px)", maxWidth: 1600 }}
        >
          <span
            className="whitespace-nowrap uppercase font-light"
            style={{ fontSize: 10, letterSpacing: "0.24em", color: `${colors.ink}99` }}
          >
            {filtered.length} pièces
          </span>

          <nav
            aria-label="Catégories collection"
            className="flex-1 overflow-x-auto no-scrollbar"
          >
            <ul className="flex items-center justify-center gap-5 md:gap-9 whitespace-nowrap">
              {allFilters.map(({ key, label }) => {
                const isActive = active === key;
                return (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => setActive(key)}
                      className="uppercase transition-colors duration-200"
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.24em",
                        color: isActive ? colors.ink : `${colors.ink}80`,
                        borderBottom: isActive ? `1px solid ${colors.ink}` : "1px solid transparent",
                        paddingBottom: 4,
                      }}
                    >
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            type="button"
            className="uppercase whitespace-nowrap font-light"
            style={{ fontSize: 10, letterSpacing: "0.24em", color: `${colors.ink}99` }}
          >
            Filtres
          </button>
        </div>
      </div>

      <section
        aria-label="Sélection collection"
        style={{ padding: "clamp(24px, 4vw, 56px) clamp(12px, 3vw, 40px)" }}
      >
        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        <div
          className="mx-auto grid grid-cols-2 md:grid-cols-3 gap-x-1 md:gap-x-2 gap-y-1 md:gap-y-3"
          style={{ maxWidth: 1400 }}
        >
          {items.map((item, i) => {
            if (item.kind === "quote") {
              return (
                <motion.div
                  key={`quote-${i}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.8 }}
                  className="col-span-2 md:col-span-3 flex items-center justify-center text-center"
                  style={{ padding: "clamp(48px, 8vw, 120px) clamp(16px, 4vw, 64px)" }}
                >
                  <p
                    className="italic font-light"
                    style={{
                      fontFamily: "Instrument Sans, system-ui, sans-serif",
                      fontSize: "clamp(28px, 5vw, 64px)",
                      lineHeight: 1.15,
                      letterSpacing: "-0.01em",
                      color: colors.ink,
                      maxWidth: 1100,
                    }}
                  >
                    « {quote} »
                  </p>
                </motion.div>
              );
            }

            if (item.kind === "lifestyle") {
              const img = item.image;
              return (
                <motion.div
                  key={`life-${i}`}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7 }}
                  className={img.wide ? "col-span-2 md:col-span-2" : "col-span-2 md:col-span-1"}
                >
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ aspectRatio: img.wide ? "8 / 5" : "4 / 5", backgroundColor: "#F0EDE7" }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover"
                      style={img.objectPosition ? { objectPosition: img.objectPosition } : undefined}
                    />
                  </div>
                </motion.div>
              );
            }

            const p = item.product;
            const image = resolveProductImage(p.image);
            const hoverImage = p.gallery?.[0] ? resolveProductImage(p.gallery[0]) : "";
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: Math.min(item.index, 6) * 0.03 }}
                className="col-span-1"
              >
                <Link
                  to={`${productLinkPrefix}${p.id}`}
                  state={{ from }}
                  onMouseEnter={() => {
                    prefetchRoute(productLinkPrefix);
                    prefetchImage(image);
                    if (hoverImage) prefetchImage(hoverImage);
                  }}
                  onTouchStart={() => prefetchRoute(productLinkPrefix)}
                  className="group flex flex-col h-full focus:outline-none focus-visible:ring-1"
                  style={{ ["--ring-color" as string]: colors.ink }}
                >
                  <div
                    className="relative w-full overflow-hidden flex-1"
                    style={{ aspectRatio: "4 / 5", backgroundColor: "#F0EDE7" }}
                  >
                    <img
                      src={image}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    />
                    {hoverImage && (
                      <img
                        src={hoverImage}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                      />
                    )}
                  </div>
                  <div className="pt-1 md:pt-2 pb-1 text-center" style={{ minHeight: 72 }}>
                    <p
                      className="font-light"
                      style={{
                        fontSize: 9,
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        color: `${colors.ink}80`,
                        marginBottom: 4,
                      }}
                    >
                      {typeLabel(p)}
                    </p>
                    <h3
                      className="font-light"
                      style={{
                        color: colors.ink,
                        fontSize: 11,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        lineHeight: 1.35,
                      }}
                    >
                      {p.name}
                    </h3>
                    <p
                      className="mt-0.5 font-light"
                      style={{ fontSize: 11, letterSpacing: "0.06em", color: colors.muted }}
                    >
                      €{p.price}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p
            className="text-center uppercase mt-10"
            style={{ fontSize: 10, letterSpacing: "0.24em", color: `${colors.ink}80` }}
          >
            Aucune pièce dans cette catégorie
          </p>
        )}
      </section>
    </>
  );
};

export default EditorialCollectionGrid;
