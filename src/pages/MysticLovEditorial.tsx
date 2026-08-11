import { formatPrice } from '@/lib/price';
import { useEffect, useMemo, useState } from "react";
import { spaceOutDuplicates } from "@/lib/spaceOutDuplicates";
import SortFilterMenu, { type SortKey } from "@/components/SortFilterMenu";
import { Link, useLocation } from "react-router-dom";
import { availableTabs, countLabel } from "@/lib/filterTabs";
import CategoryTabs from "@/components/CategoryTabs";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JourneyContinuation from "@/components/JourneyContinuation";
import SEO from "@/components/SEO";
import { prefetchRoute, prefetchImage } from "@/lib/prefetch";
import { getProductsByUnivers } from "@/data/products";

const getMysticProducts = () => getProductsByUnivers("mysticlov");
import { resolveProductImage } from "@/lib/productImage";
import heroAsset from "@/assets/mysticlov/mysticlov-hero-cafe-paris.png.asset.json";
import closingAsset from "@/assets/mysticlov/mysticlov-block4-paris-street.png.asset.json";
import { displayProductName } from '@/lib/productDisplayName';

type Category = "all" | "tshirts" | "sweats" | "kimonos";

type ProductCard = {
  id: string;
  name: string;
  typeLabel: string;
  price: number;
  image: string;
  hover?: string;
  subcategory?: string;
};

const TYPE_LABEL: Record<string, string> = {
  tshirt: "T-shirt",
  hoodie: "Sweat capuche",
  crewneck: "Sweat",
  kimono: "Kimono",
};

// Cadrage par carte : par défaut « top center » (tête toujours visible).
// Ajustements individuels pour les visuels où le sujet n'est pas centré en haut.
const CARD_FRAMING: Record<string, { objectPosition: string; scale?: number }> = {};



// Évite le doublon de libellé : si le nom contient déjà le type (« T-Shirt Love »),
// on n'affiche pas le petit libellé au-dessus.
const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]/g, "");


const buildRawProducts = (): ProductCard[] => getMysticProducts().map((p) => {
  const image = resolveProductImage(p.image);
  const hoverRaw = p.gallery?.[0] ? resolveProductImage(p.gallery[0]) : undefined;
  return {
    id: p.id,
    name: p.name,
    typeLabel: TYPE_LABEL[p.subcategory ?? ""] ?? "Pièce",
    price: typeof p.price === "number" ? p.price : Number(p.price) || 0,
    image,
    hover: hoverRaw && hoverRaw !== image ? hoverRaw : undefined,
    subcategory: p.subcategory,
  };
});


// Deterministic shuffle so models/silhouettes are mixed across the grid
const shuffle = <T,>(arr: T[], seed = 42): T[] => {
  const a = [...arr];
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const buildProducts = (): ProductCard[] => shuffle(buildRawProducts(), 137);


const heroImage = heroAsset.url;
const closingImage = closingAsset.url;

const CATEGORY_LABELS: { key: Category; label: string }[] = [
  { key: "all", label: "Tout voir" },
  { key: "tshirts", label: "T-shirts" },
  { key: "sweats", label: "Sweats" },
  { key: "kimonos", label: "Kimonos" },
];

const pageStyle = {
  backgroundColor: "#FAF8F4",
  color: "#0D0D0D",
  fontFamily: "Instrument Sans, system-ui, sans-serif",
};

const MysticLovEditorial = () => {
  const location = useLocation();
  const [category, setCategory] = useState<Category>("all");
  const [sort, setSort] = useState<SortKey>("default");

  const products = buildProducts();

  const filtered = (() => {
      const base = products.filter((p) =>
        category === "all"
          ? true
          : category === "tshirts"
          ? p.subcategory === "tshirt"
          : category === "kimonos"
          ? p.subcategory === "kimono"
          : p.subcategory === "hoodie" || p.subcategory === "crewneck"
      );
      const sorted = [...base];
      if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
      else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
      else if (sort === "name-asc") sorted.sort((a, b) => a.name.localeCompare(b.name, "fr"));
      return spaceOutDuplicates(sorted, (p) => p.id || p.name);
  })();

  const matchesCategory = (p: (typeof products)[number], key: string) =>
    key === "tshirts"
      ? p.subcategory === "tshirt"
      : key === "kimonos"
      ? p.subcategory === "kimono"
      : p.subcategory === "hoodie" || p.subcategory === "crewneck";

  const tabs = availableTabs(CATEGORY_LABELS, products, matchesCategory);

  useEffect(() => {
    if (!tabs.some((t) => t.key === category)) setCategory("all");
  }, [tabs, category]);



  const scrollToGrid = () => {
    document.getElementById("mysticlov-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const from = `${location.pathname}${location.search}`;

  return (
    <div style={pageStyle} className="min-h-screen">
      <SEO
        title="MysticLov — Wear your intention. | LOVCICOV Paris"
        description="MysticLov par LOVCICOV Paris : talismans contemporains brodés main. Chaque pièce porte un signe, une intention."
        path="/mysticlov"
      />
      <Navbar />

      <main className="overflow-hidden" style={{ paddingTop: "var(--collection-offset)" }}>
        {/* HERO */}
        <section
          className="relative w-screen overflow-hidden aspect-[4/5] md:aspect-[16/9]"
        >
          <img
            src={heroImage}
            alt="MysticLov par LOVCICOV Paris"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(1.05) contrast(0.98)", objectPosition: "center 45%" }}
            loading="eager"
            decoding="async"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(13,13,13,0.18) 0%, rgba(13,13,13,0.3) 48%, rgba(13,13,13,0.28) 100%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-3 z-10 md:bottom-6"
            style={{ paddingInline: "clamp(24px, 5vw, 72px)" }}
          >
            <div className="max-w-[19rem] md:max-w-3xl">
              <p
                className="mb-1 text-[8px] md:text-[11px] uppercase"
                style={{ color: "rgba(244,240,232,0.82)", letterSpacing: "0.22em" }}
              >
                MysticLov
              </p>
              <p
                className="mb-2 md:mb-4 italic"
                style={{ fontWeight: 300, fontSize: "clamp(13px, 2vw, 22px)", color: "rgba(244,240,232,0.9)" }}
              >
                Des talismans contemporains.
              </p>
            </div>
          </div>
        </section>

        {/* GIANT TITLE */}
        <section className="w-full text-center" style={{ padding: "clamp(48px, 8vw, 96px) clamp(16px, 4vw, 48px) clamp(24px, 4vw, 48px)" }}>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8 }}
            className="uppercase leading-[0.9]"
            style={{
              fontFamily: "Instrument Sans, system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(64px, 15vw, 260px)",
              letterSpacing: "-0.02em",
              color: "#0D0D0D",
            }}
          >
            MYSTICLOV
          </motion.h1>
        </section>

        {/* STICKY FILTER BAR */}
        <div
          className="sticky z-30 border-y border-[rgba(13,13,13,0.08)] backdrop-blur"
          style={{ top: "var(--header-height)", backgroundColor: "rgba(250,248,244,0.92)" }}
          id="mysticlov-grid"
        >
          <div
            className="mx-auto flex items-center justify-between gap-4"
            style={{ padding: "14px clamp(16px, 4vw, 48px)", maxWidth: 1600 }}
          >
            <span className="whitespace-nowrap" aria-hidden="true" />
            <CategoryTabs
              ariaLabel="Catégories MysticLov"
              tabs={tabs}
              active={category}
              onChange={(k) => setCategory(k as Category)}
            />
            <SortFilterMenu sort={sort} onChange={setSort} />
          </div>
        </div>

        {/* PRODUCT GRID */}
        <section aria-label="Sélection MysticLov" style={{ paddingTop: "clamp(24px, 4vw, 56px)", paddingBottom: 4 }}>
          <style>{`
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>

          {(() => null)()}
          <div
            className="site-container grid grid-cols-2 md:grid-cols-4 gap-x-1 md:gap-x-2 gap-y-0 md:gap-y-1.5 md:[grid-auto-flow:dense]"
          >
            {(() => { /* layout precompute happens inline below via closure */ return null; })()}
            {filtered.map((product, i, arr) => {
              // Precompute hero + landscape indices once (memoize via arr reference)
              // Using a lazy init pattern per render
              const layout = (arr as any).__mysticLayout ?? (() => {
                const heroSet = new Set<number>();
                if (category === "all") {
                  for (let k = 0; k < arr.length; k += 5) {
                    if (arr.length - k >= 7) heroSet.add(k);
                  }
                }
                const H = heroSet.size;
                const cells = 3 * H + arr.length;
                const rem = cells % 4;
                const landSet = new Set<number>();
                if (category === "all") {
                  const promote = (n: number) => {
                    let c = 0;
                    for (let k = arr.length - 1; k >= 0 && c < n; k--) {
                      if (!heroSet.has(k)) { landSet.add(k); c++; }
                    }
                  };
                  if (rem === 2) promote(2);
                  else if (rem === 3) promote(1);
                  else if (rem === 1) promote(3);
                }
                const data = { heroSet, landSet };
                (arr as any).__mysticLayout = data;
                return data;
              })();
              const heroIndex = Math.floor(i / 5);
              const isHero = layout.heroSet.has(i);
              const isLandscape = !isHero && layout.landSet.has(i);
              const heroOnRight = isHero && heroIndex % 2 === 1;
              const spanClass = isHero
                ? `col-span-1 md:col-span-2 md:row-span-2 ${heroOnRight ? "md:col-start-3" : "md:col-start-1"}`
                : isLandscape
                ? "col-span-1 md:col-span-2 self-start"
                : "col-span-1 self-start";

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: Math.min(i, 6) * 0.035 }}
                  className={spanClass}
                >
                  <Link
                    to={`/shop/${product.id}`}
                    state={{ from }}
                    onMouseEnter={() => {
                      prefetchRoute("/shop/item");
                      prefetchImage(product.image);
                      if (product.hover) prefetchImage(product.hover);
                    }}
                    onTouchStart={() => prefetchRoute("/shop/item")}
                    className={`group flex flex-col focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0D0D0D] ${isHero ? "h-full" : ""}`}
                  >
                    <div
                      className={`relative w-full overflow-hidden ${isHero ? "flex-1" : ""}`}
                      style={{
                        backgroundColor: "#F0EDE7",
                        aspectRatio: "2 / 3",
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        loading={i < 4 ? "eager" : "lazy"}
                        decoding="async"
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300${
                          product.hover ? " [@media(hover:hover)]:group-hover:opacity-0" : ""
                        }`}
                        style={{
                          objectPosition: CARD_FRAMING[product.id]?.objectPosition ?? "center",
                          transform: CARD_FRAMING[product.id]?.scale
                            ? `scale(${CARD_FRAMING[product.id]!.scale})`
                            : undefined,
                          transformOrigin: "top center",
                        }}
                      />
                      {product.hover && (
                        <img
                          src={product.hover}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-100"
                          style={{
                            objectPosition: CARD_FRAMING[product.id]?.objectPosition ?? "center",
                            transform: CARD_FRAMING[product.id]?.scale
                              ? `scale(${CARD_FRAMING[product.id]!.scale})`
                              : undefined,
                            transformOrigin: "top center",
                          }}
                        />
                      )}



                    </div>
                    <div className="pt-1 md:pt-1.5 pb-1 text-center" style={{ minHeight: 72 }}>
                      <p
                        className="font-light product-card-eyebrow"
                        style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(13,13,13,0.5)", marginBottom: 4 }}
                      >
                        {product.typeLabel}
                      </p>
                      <h3
                        className="text-[#0D0D0D] font-light product-card-title"
                        style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", lineHeight: 1.35 }}
                      >
                        {displayProductName(product.name)}
                      </h3>
                      <p className="mt-0.5 text-[#5F5E5A] font-light" style={{ fontSize: 11, letterSpacing: "0.06em" }}>
                        {formatPrice(product.price)}
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
              style={{ fontSize: 10, letterSpacing: "0.24em", color: "rgba(13,13,13,0.5)" }}
            >
              Aucune pièce dans cette collection
            </p>
          )}
        </section>

        {/* CTA — Découvrez toute la collection */}
        <section style={{ backgroundColor: "#FAF8F4", padding: "clamp(8px, 2vw, 20px) clamp(12px, 3vw, 40px) clamp(32px, 5vw, 64px)" }}>
          <div className="mx-auto flex justify-center" style={{ maxWidth: 1400 }}>
            <Link
              to="/shop"
              onMouseEnter={() => prefetchRoute("/shop")}
              className="inline-flex items-center justify-center px-7 py-3 text-[11px] uppercase transition-colors duration-300"
              style={{ backgroundColor: "#0D0D0D", color: "#FFFFFF", letterSpacing: "0.24em" }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#2A2A2A"; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#0D0D0D"; }}
            >
              Découvrez toute la collection
            </Link>
          </div>
        </section>



      </main>

      <JourneyContinuation current="mystic" />




      <Footer />
    </div>
  );
};

export default MysticLovEditorial;
