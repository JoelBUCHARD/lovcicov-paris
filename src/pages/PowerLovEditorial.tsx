import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JourneyContinuation from "@/components/JourneyContinuation";
import SEO from "@/components/SEO";
import { prefetchRoute, prefetchImage } from "@/lib/prefetch";
import { standardProducts } from "@/data/products";
import { resolveProductImage } from "@/lib/productImage";

// Lifestyle images — exclusivement celles déjà présentes sur la page PowerLov actuelle
import heroAsset from "@/assets/powerlov/powerlov-hero-sacred-heart-paris.png.asset.json";
import lifeCafeFlore from "@/assets/powerlov/powerlov-topwide-cafe-flore-v3.png.asset.json";
import lifePorscheSaintDominique from "@/assets/powerlov/powerlov-bottomwide-porsche-saint-dominique.png.asset.json";

type Category = "all" | "tshirts" | "sweats" | "new";

type ProductCard = {
  id: string;
  name: string;
  price: number;
  image: string;
  hover?: string;
  categories: Exclude<Category, "all">[];
};

// Nouveautés = derniers ajouts (les 2 pièces Sacred Heart les plus récentes)
const NEW_IDS = new Set(["powerlov-sacred-heart-sweat", "powerlov-sacred-heart-hoodie"]);

const products: ProductCard[] = standardProducts.map((p) => {
  const cats: Exclude<Category, "all">[] = [];
  if (p.subcategory === "tshirt") cats.push("tshirts");
  if (p.subcategory === "hoodie" || p.subcategory === "crewneck") cats.push("sweats");
  if (NEW_IDS.has(p.id)) cats.push("new");
  return {
    id: p.id,
    name: p.name.replace(/^T-Shirt\s+|^Sweat\s+Capuche\s+|^Sweat\s+/i, ""),
    price: p.price,
    image: resolveProductImage(p.image),
    hover: p.gallery?.[0] ? resolveProductImage(p.gallery[0]) : undefined,
    categories: cats,
  };
});

// Lifestyle inserts : seulement des images qui figuraient déjà sur la page PowerLov
const lifestyleImages = [
  { image: lifeCafeFlore.url, alt: "PowerLov — Café de Flore, Paris", objectPosition: "center 60%" },
];

const CATEGORY_LABELS: { key: Category; label: string }[] = [
  { key: "all", label: "Tout voir" },
  { key: "tshirts", label: "T-shirts" },
  { key: "sweats", label: "Sweats" },
  { key: "new", label: "Nouveautés" },
];

const pageStyle = {
  backgroundColor: "#FAF8F4",
  color: "#0D0D0D",
  fontFamily: "Instrument Sans, system-ui, sans-serif",
};


const PowerLovEditorial = () => {
  const location = useLocation();
  const [category, setCategory] = useState<Category>("all");

  const filtered = useMemo(
    () => (category === "all" ? products : products.filter((p) => p.categories.includes(category as Exclude<Category, "all">))),
    [category]
  );

  // Build grid items: alternate 2 products then 1 lifestyle tile (spans 2 rows).
  // Every 6th product slot inserts a lifestyle image so it never breaks the rhythm.
  type GridItem =
    | { kind: "product"; product: ProductCard; index: number }
    | { kind: "lifestyle"; image: string; alt: string; objectPosition?: string; key: string };

  const gridItems: GridItem[] = useMemo(() => {
    const items: GridItem[] = [];
    let lifestyleCursor = 0;
    filtered.forEach((product, i) => {
      items.push({ kind: "product", product, index: i });
      // After every 4 products (i.e. two rows of 2 on a 3-col grid where 1 col is lifestyle),
      // insert a lifestyle tile.
      if ((i + 1) % 4 === 0 && lifestyleCursor < lifestyleImages.length) {
        const life = lifestyleImages[lifestyleCursor % lifestyleImages.length];
        items.push({ kind: "lifestyle", ...life, key: `life-${lifestyleCursor}` });
        lifestyleCursor += 1;
      }
    });
    return items;
  }, [filtered]);

  const scrollToGrid = () => {
    document.getElementById("powerlov-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const from = `${location.pathname}${location.search}`;

  return (
    <div style={pageStyle} className="min-h-screen">
      <SEO
        title="PowerLov — Wear your power. | LOVCICOV Paris"
        description="PowerLov par LOVCICOV Paris : silhouettes affirmées, coton lourd, sérigraphies manifestes. Wear your power."
        path="/powerlov"
      />
      <Navbar />

      <main className="pt-[73px] overflow-hidden">
        {/* HERO — unchanged */}
        <section className="relative w-screen h-[58svh] md:h-[78vh] overflow-hidden">
          <img
            src={heroAsset.url}
            alt="PowerLov par LOVCICOV Paris"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(1.15) contrast(0.98)", objectPosition: "center 30%" }}
            loading="eager"
            fetchPriority="high"
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
                className="mb-1 text-[8px] md:text-[11px] uppercase"
                style={{ color: "rgba(244,240,232,0.82)", letterSpacing: "0.22em" }}
              >
                PowerLov
              </p>
              <p
                className="mb-2 md:mb-4 italic"
                style={{
                  fontWeight: 300,
                  fontSize: "clamp(13px, 2vw, 22px)",
                  color: "rgba(244,240,232,0.82)",
                }}
              >
                Wear your power.
              </p>
              <button
                type="button"
                onClick={scrollToGrid}
                className="mt-2 md:mt-6 inline-flex items-center justify-center px-3.5 py-1.5 md:px-7 md:py-3 text-[8px] md:text-[11px] uppercase transition-colors duration-300"
                style={{ backgroundColor: "#FFFFFF", color: "#0D0D0D", letterSpacing: "0.2em" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#E8E4DD"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#FFFFFF"; }}
              >
                Découvrir la collection
              </button>
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
            POWERLOV
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mx-auto mt-6 md:mt-10 max-w-2xl"
            style={{
              fontSize: "clamp(13px, 1.3vw, 16px)",
              color: "rgba(13,13,13,0.7)",
              letterSpacing: "0.02em",
              lineHeight: 1.7,
            }}
          >
            Silhouettes affirmées. Coupes précises. L'énergie d'une allure choisie.
          </motion.p>
        </section>

        {/* STICKY FILTER BAR */}
        <div
          className="sticky z-30 border-y border-[rgba(13,13,13,0.08)] backdrop-blur"
          style={{ top: 73, backgroundColor: "rgba(250,248,244,0.92)" }}
          id="powerlov-grid"
        >
          <div
            className="mx-auto flex items-center justify-between gap-4"
            style={{ padding: "14px clamp(16px, 4vw, 48px)", maxWidth: 1600 }}
          >
            <p
              className="uppercase whitespace-nowrap"
              style={{ fontSize: 10, letterSpacing: "0.24em", color: "rgba(13,13,13,0.6)" }}
            >
              {filtered.length} {filtered.length > 1 ? "pièces" : "pièce"}
            </p>

            <nav
              aria-label="Catégories PowerLov"
              className="flex-1 overflow-x-auto no-scrollbar"
            >
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

            <button
              type="button"
              className="uppercase whitespace-nowrap"
              style={{ fontSize: 10, letterSpacing: "0.24em", color: "rgba(13,13,13,0.6)" }}
            >
              Filtres
            </button>
          </div>
        </div>

        {/* PRODUCT GRID WITH LIFESTYLE INSERTS */}
        <section aria-label="Sélection PowerLov" style={{ padding: "clamp(24px, 4vw, 56px) clamp(12px, 3vw, 40px)" }}>
          <style>{`
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
          <div
            className="mx-auto grid grid-cols-2 md:grid-cols-3 gap-x-3 md:gap-x-5 gap-y-10 md:gap-y-14"
            style={{ maxWidth: 1600, gridAutoRows: "auto" }}
          >
            {gridItems.map((item) => {
              if (item.kind === "lifestyle") {
                return (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.8 }}
                    className="hidden md:block row-span-2"
                    style={{ height: "100%" }}
                  >
                    <div className="relative w-full h-full overflow-hidden bg-[#F0EDE7]" style={{ minHeight: 640 }}>
                      <img
                        src={item.image}
                        alt={item.alt}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover"
                        style={{ objectPosition: item.objectPosition ?? "center center" }}
                      />
                    </div>
                  </motion.div>
                );
              }

              const { product, index } = item;
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: Math.min(index, 6) * 0.04 }}
                  className="h-full w-full"
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
                    className="group flex flex-col h-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0D0D0D]"
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F0EDE7]">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        className={`absolute inset-0 h-full w-full object-cover transition-all duration-[700ms] ease-out ${
                          product.hover ? "group-hover:opacity-0" : "group-hover:scale-[1.02]"
                        }`}
                      />
                      {product.hover && (
                        <img
                          src={product.hover}
                          alt=""
                          aria-hidden
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[700ms] ease-out group-hover:opacity-100 group-hover:scale-[1.02]"
                        />
                      )}
                    </div>
                    <div className="pt-4 md:pt-5 pb-2 text-center">
                      <h3
                        className="text-[#0D0D0D] font-light"
                        style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", lineHeight: 1.4 }}
                      >
                        {product.name}
                      </h3>
                      <p className="mt-2 text-[#5F5E5A] font-light" style={{ fontSize: 12, letterSpacing: "0.06em" }}>
                        €{product.price}
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
              Aucune pièce dans cette catégorie
            </p>
          )}
        </section>

        {/* FULL-WIDTH EDITORIAL QUOTE */}
        <section
          className="w-full text-center"
          style={{ padding: "clamp(64px, 10vw, 140px) clamp(24px, 6vw, 96px)", backgroundColor: "#FAF8F4" }}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9 }}
            className="mx-auto max-w-5xl uppercase"
            style={{
              fontFamily: "Instrument Sans, system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(28px, 5vw, 72px)",
              letterSpacing: "-0.01em",
              lineHeight: 1.05,
              color: "#0D0D0D",
            }}
          >
            La discipline devient allure.
          </motion.p>
        </section>

        {/* BOTTOM WIDE IMAGE + MYSTICLOV CTA */}
        <section style={{ backgroundColor: "#FAF8F4" }}>
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 9", backgroundColor: "#FAF8F4" }}>
            <img
              src={lifePorscheSaintDominique.url}
              alt="PowerLov — femme de dos en sweat gris LOVCICOV PARIS rue Saint-Dominique, Paris"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "center 30%" }}
            />
            <div
              className="absolute inset-x-0 bottom-3 z-10 md:bottom-6 flex justify-center"
              style={{ paddingInline: "clamp(24px, 5vw, 72px)" }}
            >
              <Link
                to="/mysticlov"
                onMouseEnter={() => prefetchRoute("/mysticlov")}
                className="inline-flex items-center justify-center px-3.5 py-1.5 md:px-7 md:py-3 text-[8px] md:text-[11px] uppercase transition-colors duration-300"
                style={{ backgroundColor: "#FFFFFF", color: "#0D0D0D", letterSpacing: "0.2em" }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#E8E4DD"; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#FFFFFF"; }}
              >
                Découvrir MysticLov
              </Link>
            </div>
          </div>
        </section>

        {/* TRUST BAND */}
        <section
          aria-label="Nos engagements"
          style={{ padding: "clamp(48px, 6vw, 88px) clamp(24px, 5vw, 72px)", backgroundColor: "#FAF8F4" }}
        >
          <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 max-w-5xl text-center">
            {[
              { title: "Livraison offerte", text: "En France métropolitaine dès 150 € d'achat. Expédition Europe et international depuis Marseille." },
              { title: "Paiement sécurisé", text: "Cartes bancaires, Apple Pay et Google Pay. Transactions chiffrées, données jamais conservées." },
              { title: "Retours faciles", text: "14 jours pour changer d'avis. Articles non portés dans leur emballage d'origine." },
            ].map((b) => (
              <div key={b.title}>
                <p
                  className="uppercase mb-4"
                  style={{ fontSize: 11, letterSpacing: "0.24em", color: "#0D0D0D" }}
                >
                  {b.title}
                </p>
                <p
                  className="mx-auto max-w-xs"
                  style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(13,13,13,0.65)" }}
                >
                  {b.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <JourneyContinuation current="power" />

      <Footer />
    </div>
  );
};

export default PowerLovEditorial;
