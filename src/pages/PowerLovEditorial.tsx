import { formatPrice } from '@/lib/price';
import { useMemo, useState } from "react";
import SortFilterMenu, { type SortKey } from "@/components/SortFilterMenu";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JourneyContinuation from "@/components/JourneyContinuation";
import SEO from "@/components/SEO";
import { prefetchRoute, prefetchImage } from "@/lib/prefetch";
import { standardProducts } from "@/data/products";
import { resolveProductImage } from "@/lib/productImage";
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
  "powerlov-sacred-heart-hoodie": {
    porteFace: "powerlov-standard-porte-face",
    porteDos: "powerlov-standard-porte-dos",
    packFace: "powerlov-standard-packshot-face",
    packDos: "powerlov-standard-packshot-dos",
  },
  "powerlov-lovcicov-2019-bird": {
    porteFace: "powerlov-holy-dove-porte-face",
    packFace: "powerlov-holy-dove-packshot-face",
    packDos: "powerlov-holy-dove-packshot-dos",
  },
  "powerlov-iconic-by-nature-heart": {
    porteFace: "powerlov-iconic-porte-face",
    packFace: "powerlov-iconic-packshot-face",
    packDos: "powerlov-iconic-packshot-dos",
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

const TYPE_LABELS: Record<string, string> = {
  "powerlov-discipline": "T-shirt",
  "powerlov-if-god-dj-frequency": "T-shirt",
  "powerlov-god-is-a-dancer": "T-shirt",
  "powerlov-protected-aligned-unstoppable": "T-shirt",
  "powerlov-sacred-heart-hoodie": "Sweat capuche",
  "powerlov-lovcicov-2019-bird": "Sweat",
  "powerlov-iconic-by-nature-heart": "Sweat",
  "powerlov-mom-boss-crisis-manager": "T-shirt",
  "powerlov-lovcicov-2019-hoodie": "T-shirt",
  "powerlov-energy-never-lies-hoodie": "Sweat capuche",
  "powerlov-lovcicov-2029-bird": "Sweat",
  "powerlov-less-drama-champagne": "T-shirt",
};

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
  { id: "powerlov-sacred-heart-hoodie", side: "face" },
  { id: "powerlov-sacred-heart-hoodie", side: "dos" },
  { id: "powerlov-lovcicov-2019-bird", side: "face" },
  { id: "powerlov-iconic-by-nature-heart", side: "face" },
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

const products: ProductCard[] = CARD_SPEC.flatMap(({ id, side }, index) => {
  const p = standardProducts.find((sp) => sp.id === id);
  const set = IMAGES[id];
  if (!p || !set) return [];
  const imageKey = side === "dos" ? set.porteDos : set.porteFace;
  const image = resolveProductImage(imageKey ?? "");
  if (!image) return [];
  const typeLabel = TYPE_LABELS[id] ?? "T-shirt";
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


const heroImage =
  resolveProductImage("powerlov-standard-porte-dos") ||
  resolveProductImage("powerlov-bottomwide-lovcicov-2019-bird-market") ||
  products[0]?.image ||
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

  const filtered = useMemo(() => {
    const base =
      category === "all"
        ? products
        : products.filter((p) => p.categories.includes(category as Exclude<Category, "all">));
    const sorted = [...base];
    if (sort === "price-asc") sorted.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    else if (sort === "price-desc") sorted.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    else if (sort === "name-asc") sorted.sort((a, b) => a.name.localeCompare(b.name, "fr"));
    return sorted;
  }, [category, sort]);

  // Grille éditoriale : rangée « grande carte + 2 cartes empilées », alternée gauche/droite,
  // séparée par des rangées de 3 cartes standard. Placement explicite ≥ 768px uniquement.
  const layout = useMemo(() => {
    const rules: string[] = [];
    const big = new Set<number>();
    let i = 0;
    let row = 1;
    let type1 = true;
    let left = true;
    while (i < filtered.length) {
      const remaining = filtered.length - i;
      if (type1 && remaining >= 3) {
        const bigCols = left ? "1 / 3" : "2 / 4";
        const stdCol = left ? "3" : "1";
        rules.push(`.pw-${i}{grid-column:${bigCols};grid-row:${row} / ${row + 2};}`);
        rules.push(`.pw-${i + 1}{grid-column:${stdCol};grid-row:${row};}`);
        rules.push(`.pw-${i + 2}{grid-column:${stdCol};grid-row:${row + 1};}`);
        big.add(i);
        i += 3;
        row += 2;
        type1 = false;
        left = !left;
      } else {
        const n = Math.min(3, remaining);
        for (let k = 0; k < n; k++) {
          rules.push(`.pw-${i + k}{grid-column:${k + 1};grid-row:${row};}`);
        }
        i += n;
        row += 1;
        type1 = true;
      }
    }
    return { css: `@media (min-width:768px){${rules.join("")}}`, big };
  }, [filtered]);

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
          className="relative w-screen overflow-hidden aspect-[16/9]"
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
            <span className="whitespace-nowrap" aria-hidden="true" />

            <nav aria-label="Catégories PowerLov" className="flex-1 overflow-x-auto no-scrollbar">
              <ul className="flex items-center justify-center gap-5 md:gap-9 whitespace-nowrap">
                {CATEGORY_LABELS.map(({ key, label }) => {
                  const active = category === key;
                  return (
                    <li key={key}>
                      <button
                        type="button"
                        onClick={() => setCategory(key)}
                        className="uppercase transition-colors duration-200"
                        style={{
                          fontSize: 10,
                          letterSpacing: "0.24em",
                          color: active ? "#0D0D0D" : "rgba(13,13,13,0.5)",
                          borderBottom: active ? "1px solid #0D0D0D" : "1px solid transparent",
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

            <SortFilterMenu sort={sort} onChange={setSort} />
          </div>
        </div>

        {/* PRODUCT GRID — grille éditoriale (grandes cartes alternées) */}
        <section
          aria-label="Sélection PowerLov"
          style={{ padding: "clamp(24px, 4vw, 56px) clamp(12px, 3vw, 40px) 4px" }}
        >
          <style>{`
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            ${layout.css}
          `}</style>

          <div
            className="mx-auto grid grid-cols-2 md:grid-cols-3 gap-x-1 md:gap-x-2 gap-y-1 md:gap-y-2"
            style={{ maxWidth: 1400 }}
          >
            {filtered.map((product, i) => {
              const isBig = layout.big.has(i);
              return (
              <motion.div
                key={product.key}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: Math.min(i, 6) * 0.035 }}
                className={`col-span-1 md:h-full pw-${i}`}
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
                  className="group flex flex-col md:h-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0D0D0D]"
                >
                  <div
                    className={`relative w-full overflow-hidden aspect-[4/5] ${
                      isBig ? "md:aspect-auto md:flex-1 md:min-h-0" : ""
                    }`}
                    style={{ backgroundColor: "#F0EDE7" }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300${
                        product.hover ? " [@media(hover:hover)]:group-hover:opacity-0" : ""
                      }`}
                      style={{ objectPosition: "center top" }}
                    />
                    {product.hover && (
                      <img
                        src={product.hover}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-100"
                        style={{ objectPosition: "center top" }}
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
