import { formatPrice } from '@/lib/price';
import { useEffect, useMemo, useState } from "react";
import SortFilterMenu, { type SortKey } from "@/components/SortFilterMenu";
import { Link, useLocation } from "react-router-dom";
import CategoryTabs from "@/components/CategoryTabs";
import { availableTabs, countLabel } from "@/lib/filterTabs";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JourneyContinuation from "@/components/JourneyContinuation";
import SEO from "@/components/SEO";
import { prefetchRoute, prefetchImage } from "@/lib/prefetch";
import { getProductsByUnivers } from "@/data/products";

// Lu à chaque rendu : hérite du filtre de visibilité global.
const getStandardProducts = () => getProductsByUnivers("powerlov");
import { resolveProductImage } from "@/lib/productImage";
import { spaceOutDuplicates } from "@/lib/spaceOutDuplicates";
import { displayProductName } from '@/lib/productDisplayName';

type Category = "all" | "tshirts" | "sweats";

// ─── SPEC A — les 12 produits PowerLov et leurs visuels ───────────────
type ImageSet = {
  porteFace?: string;
  porteDos?: string;
  packFace: string;
  packDos: string;
};

const IMAGES: Record<string, ImageSet> = {
  "powerlov-discipline": {
    porteFace: "powerlov-discipline-porte-face",
    porteDos: "powerlov-discipline-porte-dos",
    packFace: "powerlov-discipline-packshot-face",
    packDos: "powerlov-discipline-packshot-dos",
  },
  "powerlov-if-god-dj-frequency": {
    porteFace: "powerlov-pretty-smart-porte-face",
    porteDos: "powerlov-pretty-smart-porte-dos",
    packFace: "powerlov-pretty-smart-packshot-face",
    packDos: "powerlov-pretty-smart-packshot-dos",
  },
  "powerlov-god-is-a-dancer": {
    porteFace: "powerlov-god-dancer-porte-face",
    porteDos: "powerlov-god-dancer-porte-dos",
    packFace: "powerlov-god-dancer-packshot-face",
    packDos: "powerlov-god-dancer-packshot-dos",
  },
  "powerlov-protected-aligned-unstoppable": {
    porteFace: "powerlov-protected-porte-face",
    packFace: "powerlov-protected-packshot-face",
    packDos: "powerlov-protected-packshot-dos",
  },
  "powerlov-sacred-heart-sweat": {
    porteFace: "powerlov-standard-porte-face",
    porteDos: "powerlov-standard-porte-dos",
    packFace: "powerlov-standard-packshot-face",
    packDos: "powerlov-standard-packshot-dos",
  },
  "powerlov-iconic-by-nature": {
    porteFace: "powerlov-iconic-stairs-red-boots",
    packFace: "powerlov-iconic-cream-front-heart",
    packDos: "powerlov-iconic-cream-back-lovcicov",
  },
  "powerlov-lovcicov-2019-bird": {
    porteFace: "powerlov-holy-dove-porte-face",
    packFace: "powerlov-holy-dove-packshot-face",
    packDos: "powerlov-holy-dove-packshot-dos",
  },
  "powerlov-mom-boss-crisis-manager": {
    porteFace: "powerlov-heart-icon-porte-face",
    porteDos: "powerlov-heart-icon-porte-dos",
    packFace: "powerlov-heart-icon-packshot-face",
    packDos: "powerlov-heart-icon-packshot-dos",
  },
  "powerlov-lovcicov-2019-hoodie": {
    porteFace: "powerlov-heart-signature-porte-face",
    packFace: "powerlov-heart-signature-packshot-face",
    packDos: "powerlov-heart-signature-packshot-dos",
  },
  "powerlov-energy-never-lies-hoodie": {
    porteFace: "powerlov-perfectly-porte-face",
    porteDos: "powerlov-perfectly-porte-dos",
    packFace: "powerlov-perfectly-packshot-face",
    packDos: "powerlov-perfectly-packshot-dos",
  },
  "powerlov-lovcicov-2029-bird": {
    porteFace: "powerlov-my-own-muse-porte-face",
    porteDos: "powerlov-my-own-muse-porte-dos",
    packFace: "powerlov-my-own-muse-packshot-face",
    packDos: "powerlov-my-own-muse-packshot-dos",
  },
  "powerlov-less-drama-champagne": {
    porteDos: "powerlov-less-drama-porte-dos",
    packFace: "powerlov-less-drama-packshot-face",
    packDos: "powerlov-less-drama-packshot-dos",
  },
};

// Étiquette dérivée du champ `type` de products.ts (source de vérité unique).
const LABEL_BY_TYPE: Record<string, string> = {
  tshirt: "T-shirt",
  crewneck: "Sweat",
  hoodie: "Sweat capuche",
};
const typeLabelFor = (p: { type?: string; subcategory?: string }) =>
  LABEL_BY_TYPE[p.type ?? p.subcategory ?? "tshirt"] ?? "T-shirt";

// SPEC C — ordre des galeries selon la carte cliquée
const galleryFor = (id: string, side: "face" | "dos"): string[] => {
  const s = IMAGES[id];
  if (!s) return [];
  if (side === "dos") {
    return [s.porteDos, s.porteFace, s.packDos, s.packFace].filter(Boolean) as string[];
  }
  return [s.porteFace, s.porteDos, s.packFace, s.packDos].filter(Boolean) as string[];
};

// SPEC B — les 19 cartes, dans l'ordre exact
const CARD_SPEC: { id: string; side: "face" | "dos" }[] = [
  { id: "powerlov-discipline", side: "face" },
  { id: "powerlov-discipline", side: "dos" },
  { id: "powerlov-if-god-dj-frequency", side: "face" },
  { id: "powerlov-if-god-dj-frequency", side: "dos" },
  { id: "powerlov-god-is-a-dancer", side: "face" },
  { id: "powerlov-god-is-a-dancer", side: "dos" },
  { id: "powerlov-protected-aligned-unstoppable", side: "face" },
  { id: "powerlov-sacred-heart-sweat", side: "face" },
  { id: "powerlov-sacred-heart-sweat", side: "dos" },
  { id: "powerlov-iconic-by-nature", side: "face" },
  { id: "powerlov-lovcicov-2019-bird", side: "face" },
  { id: "powerlov-mom-boss-crisis-manager", side: "face" },
  { id: "powerlov-mom-boss-crisis-manager", side: "dos" },
  { id: "powerlov-lovcicov-2019-hoodie", side: "face" },
  { id: "powerlov-energy-never-lies-hoodie", side: "face" },
  { id: "powerlov-energy-never-lies-hoodie", side: "dos" },
  { id: "powerlov-lovcicov-2029-bird", side: "face" },
  { id: "powerlov-lovcicov-2029-bird", side: "dos" },
  { id: "powerlov-less-drama-champagne", side: "dos" },
];

type ProductCard = {
  key: string;
  id: string;
  name: string;
  typeLabel: string;
  price: number;
  image: string;
  hover?: string;
  gallery: string[];
  categories: Exclude<Category, "all">[];
};

const buildProducts = (): ProductCard[] => {
  const standardProducts = getStandardProducts();
  return CARD_SPEC.flatMap(({ id, side }, index) => {
  const p = standardProducts.find((sp) => sp.id === id);
  const set = IMAGES[id];
  if (!p || !set) return [];
  const imageKey = side === "dos" ? set.porteDos : set.porteFace;
  const image = resolveProductImage(imageKey ?? "");
  if (!image) return [];
  const typeLabel = typeLabelFor(p);
  const gallery = galleryFor(id, side);
  const hoverRaw = gallery[1] ? resolveProductImage(gallery[1]) : undefined;
  return [
    {
      key: `${id}-${side}-${index}`,
      id,
      name: p.name,
      typeLabel,
      price: p.price,
      image,
      hover: hoverRaw && hoverRaw !== image ? hoverRaw : undefined,
      gallery,
      categories: [typeLabel === "T-shirt" ? "tshirts" : "sweats"] as Exclude<Category, "all">[],
    },
  ];
  });
};


const heroImage =
  resolveProductImage("powerlov-standard-porte-dos") ||
  resolveProductImage("powerlov-bottomwide-lovcicov-2019-bird-market") ||
  "";

const CATEGORY_LABELS: { key: Category; label: string }[] = [
  { key: "all", label: "Tout voir" },
  { key: "tshirts", label: "T-shirts" },
  { key: "sweats", label: "Sweats" },
];

const pageStyle = {
  backgroundColor: "#FAF8F4",
  color: "#0D0D0D",
  fontFamily: "Instrument Sans, system-ui, sans-serif",
};

const PowerLovEditorial = () => {
  const location = useLocation();
  const [category, setCategory] = useState<Category>("all");
  const [sort, setSort] = useState<SortKey>("default");

  const products = buildProducts();

  const filtered = (() => {
    const base =
      category === "all"
        ? products
        : products.filter((p) => p.categories.includes(category as Exclude<Category, "all">));
    const sorted = [...base];
    if (sort === "price-asc") sorted.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    else if (sort === "price-desc") sorted.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    else if (sort === "name-asc") sorted.sort((a, b) => a.name.localeCompare(b.name, "fr"));
    return spaceOutDuplicates(sorted, (p) => p.id || p.name);
  })();

  const tabs = availableTabs(CATEGORY_LABELS, products, (p, key) =>
    p.categories.includes(key as Exclude<Category, "all">)
  );

  useEffect(() => {
    if (!tabs.some((t) => t.key === category)) setCategory("all");
  }, [tabs, category]);





  const from = `${location.pathname}${location.search}`;

  return (
    <div style={pageStyle} className="min-h-screen">
      <SEO
        title="PowerLov — Wear your power. | LOVCICOV Paris"
        description="PowerLov par LOVCICOV Paris : silhouettes affirmées, coton lourd, sérigraphies manifestes. Wear your power."
        path="/powerlov"
      />
      <Navbar />

      <main className="overflow-hidden" style={{ paddingTop: "var(--collection-offset)" }}>
        {/* HERO */}
        <section
          className="relative w-screen overflow-hidden aspect-[4/5] md:aspect-[16/9]"
        >
          <img
            src={heroImage}
            alt="PowerLov par LOVCICOV Paris"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(1.15) contrast(0.98)", objectPosition: "center 45%" }}
            loading="eager"
            decoding="async"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(13,13,13,0.18) 0%, rgba(13,13,13,0.3) 48%, rgba(13,13,13,0.22) 100%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-3 z-10 md:bottom-6"
            style={{ paddingInline: "clamp(24px, 5vw, 72px)" }}
          >
            <div className="max-w-[19rem] md:max-w-3xl">
              <p
                className="mb-1 text-[11px] md:text-[11px] uppercase"
                style={{ color: "rgba(244,240,232,0.82)", letterSpacing: "0.22em" }}
              >
                PowerLov
              </p>
              <p
                className="mb-2 md:mb-4 italic"
                style={{
                  fontWeight: 300,
                  fontSize: "clamp(18px, 5vw, 22px)",
                  color: "rgba(244,240,232,0.82)",
                }}
              >
                Wear your power.
              </p>
            </div>
          </div>
        </section>

        {/* GIANT TITLE */}
        <section
          className="w-full text-center"
          style={{ padding: "clamp(48px, 8vw, 96px) clamp(16px, 4vw, 48px) clamp(24px, 4vw, 48px)" }}
        >
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
            POWERLOV
          </motion.h1>
        </section>

        {/* STICKY FILTER BAR */}
        <div
          className="sticky z-30 border-y border-[rgba(13,13,13,0.08)] backdrop-blur"
          style={{ top: "var(--header-height)", backgroundColor: "rgba(250,248,244,0.92)" }}
          id="powerlov-grid"
        >
          <div
            className="mx-auto flex items-center justify-between gap-4"
            style={{ padding: "14px clamp(16px, 4vw, 48px)", maxWidth: 1600 }}
          >
            <span
              className="hidden md:inline whitespace-nowrap text-[11px]"
              style={{ color: "rgba(13,13,13,0.5)", letterSpacing: "0.08em" }}
            >
              {countLabel(filtered.length)}
            </span>

            <CategoryTabs
              ariaLabel="Catégories PowerLov"
              tabs={tabs}
              active={category}
              onChange={(k) => setCategory(k as Category)}
            />

            <SortFilterMenu sort={sort} onChange={setSort} />
          </div>
        </div>

        {/* PRODUCT GRID — grille éditoriale (grandes cartes alternées) */}
        <section
          aria-label="Sélection PowerLov"
          style={{ paddingTop: "clamp(24px, 4vw, 56px)", paddingBottom: 4 }}
        >
          <style>{`
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>


          <div
            className="site-container grid grid-cols-2 md:grid-cols-4 gap-x-1 md:gap-x-2 gap-y-0 md:gap-y-1.5 md:[grid-auto-flow:dense]"
          >
            {filtered.map((product, i, arr) => {
              const layout = (arr as any).__pwLayout ?? (() => {
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
                (arr as any).__pwLayout = data;
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
                key={product.key}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: Math.min(i, 6) * 0.035 }}
                className={spanClass}
              >
                <Link
                  to={`/shop/${product.id}`}
                  state={{ from, galleryOrder: product.gallery }}
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
                    style={{ backgroundColor: "#F0EDE7", aspectRatio: "2 / 3" }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading={i < 4 ? "eager" : "lazy"}
                      decoding="async"
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300${
                        product.hover ? " [@media(hover:hover)]:group-hover:opacity-0" : ""
                      }`}
                      style={{ objectPosition: "center" }}
                    />
                    {product.hover && (
                      <img
                        src={product.hover}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-100"
                        style={{ objectPosition: "center" }}
                      />
                    )}
                  </div>


                  <div className="pt-1 md:pt-1.5 pb-1 text-center" style={{ minHeight: 72 }}>
                    <p
                      className="font-light product-card-eyebrow"
                      style={{
                        fontSize: 9,
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        color: "rgba(13,13,13,0.5)",
                        marginBottom: 4,
                      }}
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


          <div
            className="mx-auto flex justify-center"
            style={{ maxWidth: 1400, marginTop: "clamp(24px, 4vw, 48px)", marginBottom: "clamp(48px, 8vw, 96px)" }}
          >
            <Link
              to="/shop"
              onMouseEnter={() => prefetchRoute("/shop")}
              className="inline-flex items-center justify-center px-7 py-3 text-[11px] uppercase transition-colors duration-300"
              style={{ backgroundColor: "#0D0D0D", color: "#FFFFFF", letterSpacing: "0.24em" }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#2A2A2A";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#0D0D0D";
              }}
            >
              Découvrir toute la collection
            </Link>
          </div>

          {filtered.length === 0 && (
            <p
              className="text-center uppercase mt-10"
              style={{ fontSize: 10, letterSpacing: "0.24em", color: "rgba(13,13,13,0.5)" }}
            >
              Aucune pièce dans cette catégorie
            </p>
          )}
        </section>

        <JourneyContinuation current="power" />
      </main>

      <Footer />
    </div>
  );
};

export default PowerLovEditorial;
