import { Fragment, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JourneyContinuation from "@/components/JourneyContinuation";
import SEO from "@/components/SEO";
import { prefetchRoute, prefetchImage } from "@/lib/prefetch";
import { standardProducts } from "@/data/products";
import { resolveProductImage } from "@/lib/productImage";


type Category = "all" | "tshirts" | "sweats" | "new";

type ProductCard = {
  id: string;
  name: string;
  price: number;
  image: string;
  packshots: string[];
  categories: Exclude<Category, "all">[];
};

// Nouveautés = derniers ajouts (les 2 pièces Sacred Heart les plus récentes)
const NEW_IDS = new Set(["powerlov-sacred-heart-sweat", "powerlov-sacred-heart-hoodie"]);
const SELECTED_POWERLOV_IMAGES: Record<string, { image: string; packshots: string[] }> = {
  "powerlov-discipline": {
    image: "powerlov-discipline-back",
    packshots: ["powerlov-discipline-front", "powerlov-sacred-heart-hoodie-cafe-croissant"],
  },
  "powerlov-if-god-dj-frequency": {
    image: "powerlov-pretty-smart-dangerous-white-street",
    packshots: [],
  },
  "powerlov-god-is-a-dancer": {
    image: "powerlov-grid-god-is-a-dancer",
    packshots: [],
  },
  "powerlov-my-own-muse": {
    image: "powerlov-my-own-muse-street",
    packshots: [],
  },
  "powerlov-lovcicov-heart-tee": {
    image: "powerlov-lovcicov-heart-tee-paris-street-sunglasses",
    packshots: [],
  },
  "powerlov-protected-aligned-unstoppable": {
    image: "powerlov-protected-aligned-unstoppable-street",
    packshots: ["powerlov-protected-aligned-unstoppable-editorial"],
  },
  "powerlov-sacred-heart-sweat": {
    image: "powerlov-standard-is-me-street-back",
    packshots: ["powerlov-lovcicov-back-street-jeans", "powerlov-my-own-muse-street-v2"],
  },

  "powerlov-sacred-heart-hoodie": {
    image: "powerlov-sacred-heart-hoodie-street-front",
    packshots: ["powerlov-lovcicov-hoodie-cap-studio"],
  },
  "powerlov-less-drama-champagne": {
    image: "powerlov-less-drama-more-champagne-street",
    packshots: [],
  },
  "powerlov-mom-boss-crisis-manager": {
    image: "powerlov-lovcicov-heart-pocket-studio",
    packshots: [],
  },
  "powerlov-lovcicov-2019-hoodie": {
    image: "powerlov-lovcicov-heart-tee-paris-street",
    packshots: [],
  },
  "powerlov-empowered": {
    image: "powerlov-lovcicov-cream-sweat-nyc-walking",
    packshots: [],
  },
  "powerlov-bold-badass-tee": {
    image: "powerlov-less-drama-champagne-rue-de-seine",
    packshots: [],
  },
  "powerlov-energy-never-lies-hoodie": {
    image: "powerlov-perfectly-imperfect-hoodie-brick",
    packshots: [],
  },
  "powerlov-god-is-a-dj": {
    image: "powerlov-lovcicov-2019-bird-market-street",
    packshots: [],
  },
};

// Ordre d'affichage: on garde l'ordre existant, et on ajoute les 4 nouveaux à la fin
const APPENDED_IDS = [
  "powerlov-empowered",
  "powerlov-bold-badass-tee",
  "powerlov-energy-never-lies-hoodie",
  "powerlov-god-is-a-dj",
];

const buildCard = (p: typeof standardProducts[number]): ProductCard | null => {
  const selectedImages = SELECTED_POWERLOV_IMAGES[p.id];
  if (!selectedImages) return null;

  const cats: Exclude<Category, "all">[] = [];
  if (p.subcategory === "tshirt") cats.push("tshirts");
  if (p.subcategory === "hoodie" || p.subcategory === "crewneck") cats.push("sweats");
  if (NEW_IDS.has(p.id)) cats.push("new");

  const packshots = selectedImages.packshots
    .map((imageKey) => resolveProductImage(imageKey))
    .filter(Boolean);

  return {
    id: p.id,
    name: p.name.replace(/^T-Shirt\s+|^Sweat\s+Capuche\s+|^Sweat\s+/i, ""),
    price: p.price,
    image: resolveProductImage(selectedImages.image),
    packshots: Array.from(new Set(packshots)),
    categories: cats,
  };
};

const baseProducts: ProductCard[] = standardProducts
  .filter((p) => !APPENDED_IDS.includes(p.id))
  .flatMap((p) => {
    const card = buildCard(p);
    return card ? [card] : [];
  });

const appendedProducts: ProductCard[] = APPENDED_IDS.flatMap((id) => {
  const p = standardProducts.find((sp) => sp.id === id);
  if (!p) return [];
  const card = buildCard(p);
  return card ? [card] : [];
});

const products: ProductCard[] = [...baseProducts, ...appendedProducts];


const heroImage = products.find((product) => product.id === "powerlov-sacred-heart-sweat")?.image ?? products[0]?.image ?? "";
const closingImage = products.find((product) => product.id === "powerlov-god-is-a-dj")?.image ?? products[0]?.image ?? "";

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

  type GridItem =
    | { kind: "product"; product: ProductCard; index: number; emphasis: "standard" | "large" }
    | { kind: "packshot"; product: ProductCard; image: string; index: number; imageIndex: number; emphasis: "standard" | "tall" };

  const gridItems: GridItem[] = useMemo(() => {
    const items: GridItem[] = [];
    filtered.forEach((product, i) => {
      items.push({ kind: "product", product, index: i, emphasis: "standard" });
      product.packshots.forEach((image, imageIndex) => {
        items.push({ kind: "packshot", product, image, imageIndex, index: i, emphasis: "standard" });
      });
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
        <section className="relative w-screen h-[75svh] md:h-[95vh] overflow-hidden">
          <img
            src={heroImage}
            alt="PowerLov par LOVCICOV Paris"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(1.15) contrast(0.98)", objectPosition: "center 30%" }}
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
            <span className="whitespace-nowrap" aria-hidden="true" />


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

        {/* PRODUCT GRID — Rouje-style: large lifestyle hero + small product tiles */}
        <section aria-label="Sélection PowerLov" style={{ padding: "clamp(24px, 4vw, 56px) clamp(12px, 3vw, 40px)" }}>
          <style>{`
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
          {(() => {
            const visibleItems = gridItems.filter((item, i) => i !== 12 && i !== 10 && i !== 15 && i !== 16 && item.product.id !== "powerlov-god-is-a-dj");
            const baseItems = visibleItems.filter((item) => !APPENDED_IDS.includes(item.product.id));
            const appendedItems = visibleItems.filter((item) => APPENDED_IDS.includes(item.product.id));

            const renderCard = (item: GridItem, i: number, opts: { appendedRow?: boolean }) => {
              const isProduct = item.kind === "product";
              const product = item.product;
              const image = isProduct ? product.image : item.image;
              const key = isProduct ? product.id : `${product.id}-packshot-${item.imageIndex}`;
              const heroIndex = Math.floor(i / 5);
              const isAppended = !!opts.appendedRow;
              const isHero = !isAppended && isProduct && i % 5 === 0;
              const isLandscape = !isAppended && i === 9;
              const heroOnRight = isHero && heroIndex % 2 === 1;
              const spanClass = isAppended
                ? "col-span-1"
                : isHero
                ? `col-span-2 md:col-span-2 md:row-span-2 ${heroOnRight ? "md:col-start-3" : "md:col-start-1"}`
                : isLandscape
                ? "col-span-2 md:col-span-2"
                : "col-span-1";

              return (
                <motion.div
                  key={key}
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
                      prefetchImage(image);
                    }}
                    onTouchStart={() => prefetchRoute("/shop/item")}
                    className="group flex flex-col h-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0D0D0D]"
                  >
                    <div
                      className="relative w-full overflow-hidden flex-1"
                      style={{
                        backgroundColor: image.includes("cream-sweat-nyc-street") ? "#FAF8F4" : "#F0EDE7",
                        aspectRatio: isAppended
                          ? "4 / 5"
                          : isHero
                          ? undefined
                          : isLandscape
                          ? "8 / 5"
                          : image.includes("my-own-muse")
                          ? "3 / 5"
                          : "4 / 5",
                      }}
                    >
                      <img
                        src={image}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover"
                        style={image.includes("my-own-muse") ? { objectPosition: "center 20%" } : image.includes("cream-sweat-nyc-walking") ? { objectPosition: "center 30%", transform: "scale(1.25)", transformOrigin: "center 30%" } : undefined}

                      />
                    </div>
                    <div className="pt-1 md:pt-1.5 pb-1 text-center" style={{ minHeight: 56 }}>
                      <h3
                        className="text-[#0D0D0D] font-light"
                        style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", lineHeight: 1.35 }}
                      >
                        {product.name}
                      </h3>
                      <p className="mt-0.5 text-[#5F5E5A] font-light" style={{ fontSize: 11, letterSpacing: "0.06em" }}>
                        €{product.price}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            };

            return (
              <>
                <div
                  className="mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-1 md:gap-x-2 gap-y-1 md:gap-y-1.5 md:[grid-auto-flow:dense]"
                  style={{ maxWidth: 1400 }}
                >
                  {baseItems.map((item, i) => renderCard(item, i, {}))}
                </div>
                {appendedItems.length > 0 && (
                  <div
                    className="mx-auto grid grid-cols-3 gap-x-1 md:gap-x-2 gap-y-1 md:gap-y-1.5 mt-1 md:mt-1.5 w-full"
                  >
                    {appendedItems.map((item, i) => renderCard(item, i, { appendedRow: true }))}
                  </div>
                )}
              </>
            );
          })()}





          {filtered.length === 0 && (
            <p
              className="text-center uppercase mt-10"
              style={{ fontSize: 10, letterSpacing: "0.24em", color: "rgba(13,13,13,0.5)" }}
            >
              Aucune pièce dans cette catégorie
            </p>
          )}
        </section>


        {/* BOTTOM WIDE IMAGE + MYSTICLOV CTA */}
        <section style={{ backgroundColor: "#FAF8F4" }}>
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 9", backgroundColor: "#FAF8F4" }}>
            <img
              src={closingImage}
              alt="PowerLov par LOVCICOV Paris"
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
