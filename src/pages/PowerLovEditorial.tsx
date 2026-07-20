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
import lifePorscheSaintDominique from "@/assets/powerlov/powerlov-bottomwide-lovcicov-2019-bird-market.png.asset.json";



type Category = "all" | "tshirts" | "sweats" | "new";

type ProductCard = {
  id: string;
  name: string;
  typeLabel: string;
  price: number;
  image: string;
  packshots: { image: string; name: string; productId?: string }[];
  categories: Exclude<Category, "all">[];
};

// Nouveautés = derniers ajouts (les 2 pièces Sacred Heart les plus récentes)
const NEW_IDS = new Set(["powerlov-sacred-heart-sweat", "powerlov-sacred-heart-hoodie"]);
const SELECTED_POWERLOV_IMAGES: Record<string, { image: string; packshots: (string | { image: string; productId: string })[] }> = {
  "powerlov-discipline": {
    image: "powerlov-discipline-back",
    packshots: [
      "powerlov-discipline-front",
      { image: "powerlov-sacred-heart-hoodie-cafe-croissant", productId: "powerlov-sacred-heart-hoodie" },
    ],
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
    packshots: ["powerlov-lovcicov-back-street-jeans", "powerlov-lovcicov-2019-bird-stairs"],
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
    image: "powerlov-lovcicov-cream-sweat-nyc-walking-v2",
    packshots: [],
  },
  "powerlov-bold-badass-tee": {
    image: "powerlov-less-drama-champagne-rue-de-seine",
    packshots: [],
  },
  "powerlov-energy-never-lies-hoodie": {
    image: "powerlov-perfectly-imperfect-hoodie-street-back",
    packshots: ["powerlov-perfectly-imperfect-hoodie-flat-white-front-v3", "powerlov-perfectly-imperfect-hoodie-flat-white-back-v3"],
  },
  "powerlov-god-is-a-dj": {
    image: "powerlov-lovcicov-2019-bird-market-street",
    packshots: [],
  },
};

const POWERLOV_IMAGE_NAMES: Record<string, string> = {
  "powerlov-pretty-smart-dangerous-white-street": "PRETTY. SMART. DANGEROUS.",
  "powerlov-standard-is-me-street-back": "ICONIC BY NATURE",
  "powerlov-lovcicov-back-street-jeans": "PRETTY. SMART. DANGEROUS.",
  "powerlov-protected-aligned-unstoppable-editorial": "SACRED HEART",
  "powerlov-lovcicov-heart-pocket-studio": "HEART ICON",
  "powerlov-lovcicov-cream-sweat-nyc-walking-v2": "LOVCICOV 2019 BIRD",
  "powerlov-less-drama-champagne-rue-de-seine": "LESS DRAMA. MORE CHAMPAGNE.",
  "powerlov-perfectly-imperfect-hoodie-street-back": "PERFECTLY IMPERFECT",
  "powerlov-perfectly-imperfect-hoodie-flat-white-front-v3": "PERFECTLY IMPERFECT",
  "powerlov-perfectly-imperfect-hoodie-flat-white-back-v3": "PERFECTLY IMPERFECT",
  "powerlov-lovcicov-heart-tee-paris-street": "HEART SIGNATURE",
  "powerlov-lovcicov-heart-tee-paris-street-sunglasses": "HEART SIGNATURE",
  "powerlov-sacred-heart-hoodie-cafe-croissant": "PERFECTLY IMPERFECT",
  "powerlov-lovcicov-hoodie-cap-studio": "STANDARD IS ME",
};

const POWERLOV_IMAGE_TYPE_LABELS: Record<string, string> = {
  "powerlov-lovcicov-back-street-jeans": "T-shirt",
  "powerlov-lovcicov-cream-sweat-nyc-walking-v2": "Sweat",
  "powerlov-sacred-heart-hoodie-cafe-croissant": "Sweat",
  "powerlov-standard-is-me-street-back": "Sweat capuche",
};

const cleanProductName = (name: string) => name.replace(/^T-Shirt\s+|^Sweat\s+Capuche\s+|^Sweat\s+/i, "");
const imageName = (imageKey: string, fallback: string) => POWERLOV_IMAGE_NAMES[imageKey] ?? cleanProductName(fallback);

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

  const packshots = selectedImages.packshots
    .map((packshot) => {
      const imageKey = typeof packshot === "string" ? packshot : packshot.image;
      return {
        image: resolveProductImage(imageKey),
        name: imageName(imageKey, p.name),
        productId: typeof packshot === "string" ? undefined : packshot.productId,
      };
    })
    .filter((packshot) => Boolean(packshot.image));

  // Determine displayed type — image-level override wins over product subcategory
  const overrideLabel = POWERLOV_IMAGE_TYPE_LABELS[selectedImages.image];
  const baseTypeLabel =
    p.subcategory === "tshirt" ? "T-shirt" : p.subcategory === "hoodie" ? "Sweat capuche" : "Sweat";
  const typeLabel = overrideLabel ?? baseTypeLabel;

  const cats: Exclude<Category, "all">[] = [];
  if (typeLabel === "T-shirt") cats.push("tshirts");
  if (typeLabel === "Sweat" || typeLabel === "Sweat capuche") cats.push("sweats");
  if (NEW_IDS.has(p.id)) cats.push("new");

  return {
    id: p.id,
    name: imageName(selectedImages.image, p.name),
    typeLabel,
    price: p.price,
    image: resolveProductImage(selectedImages.image),
    packshots: Array.from(new Map(packshots.map((packshot) => [packshot.image, packshot])).values()),
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
const closingImage = lifePorscheSaintDominique.url;

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

  const filtered = useMemo(
    () => (category === "all" ? products : products.filter((p) => p.categories.includes(category as Exclude<Category, "all">))),
    [category]
  );

  type GridItem =
    | { kind: "product"; product: ProductCard; index: number; emphasis: "standard" | "large" }
    | { kind: "packshot"; product: ProductCard; image: string; name: string; productId?: string; index: number; imageIndex: number; emphasis: "standard" | "tall" };

  const gridItems: GridItem[] = useMemo(() => {
    const items: GridItem[] = [];
    const showPackshots = category === "all";
    filtered.forEach((product, i) => {
      items.push({ kind: "product", product, index: i, emphasis: "standard" });
      if (!showPackshots) return;
      product.packshots.forEach((packshot, imageIndex) => {
        items.push({ kind: "packshot", product, image: packshot.image, name: packshot.name, productId: packshot.productId, imageIndex, index: i, emphasis: "standard" });
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
        <section className="relative w-screen h-[95svh] md:h-[115vh] overflow-hidden">
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
        <section aria-label="Sélection PowerLov" style={{ padding: "clamp(24px, 4vw, 56px) clamp(12px, 3vw, 40px) 4px" }}>
          <style>{`
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
          {(() => {
            const visibleItems = gridItems.filter((item, i) => {
              if (item.product.id === "powerlov-god-is-a-dj") return false;
              if (item.kind === "packshot" && item.product.id === "powerlov-energy-never-lies-hoodie") return false;
              // Index-based trims only apply to the "Tout voir" layout
              if (category === "all" && (i === 12 || i === 10 || i === 15 || i === 16)) return false;
              return true;
            });
            const baseItems = visibleItems.filter((item) => !APPENDED_IDS.includes(item.product.id));
            const appendedItems = visibleItems.filter((item) => APPENDED_IDS.includes(item.product.id));

            const renderCard = (item: GridItem, i: number, opts: { appendedRow?: boolean; total?: number }) => {
              const isProduct = item.kind === "product";
              const product = item.product;
              const image = isProduct ? product.image : item.image;
              const cardName = isProduct ? product.name : item.name;
              const productId = isProduct ? product.id : item.productId ?? product.id;
              const key = isProduct ? product.id : `${product.id}-packshot-${item.imageIndex}`;
              const heroIndex = Math.floor(i / 5);
              const isAppended = !!opts.appendedRow;
              const isHero = !isAppended && isProduct && i % 5 === 0;
              const isLandscape = !isAppended && i === 9;
              const shouldFillCell = isHero;
              const heroOnRight = isHero && heroIndex % 2 === 1;
              const isMobileLastOdd = !isAppended && opts.total !== undefined && i === opts.total - 1 && opts.total % 2 === 1 && !isHero && !isLandscape;
              const mobileFullClass = isMobileLastOdd ? "col-span-2 md:col-span-1" : "col-span-1";
              const spanClass = isAppended
                ? "col-span-1 h-full"
                : isHero
                ? `col-span-1 md:col-span-2 md:row-span-2 ${heroOnRight ? "md:col-start-3" : "md:col-start-1"}`
                : isLandscape
                ? "col-span-1 md:col-span-2 md:self-start"
                : `${mobileFullClass} md:self-start`;

              const aspectClass = isAppended
                ? "aspect-[4/5]"
                : isHero
                ? "aspect-[4/5] md:aspect-auto"
                : isLandscape
                ? "aspect-[4/5] md:aspect-auto"
                : "aspect-[4/5]";





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
                    to={`/shop/${productId}`}
                    state={{ from, imageOverride: image }}
                    onMouseEnter={() => {
                      prefetchRoute("/shop/item");
                      prefetchImage(image);
                    }}
                    onTouchStart={() => prefetchRoute("/shop/item")}
                    className={`group flex flex-col focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0D0D0D] ${(shouldFillCell || isAppended) ? "md:h-full" : ""}`}
                  >
                    <div
                      className={`relative w-full overflow-hidden ${aspectClass} ${shouldFillCell ? "md:flex-1" : ""} ${isLandscape ? "md:![aspect-ratio:8/5]" : ""}`}
                      style={{
                        backgroundColor: image.includes("cream-sweat-nyc-street") ? "#FAF8F4" : "#F0EDE7",
                      }}
                    >
                      <img
                        src={image}
                        alt={cardName}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover"
                        style={image.includes("my-own-muse") ? { objectPosition: "center 20%" } : image.includes("cream-sweat-nyc-walking") ? { objectPosition: "center 30%", transform: "scale(1.25)", transformOrigin: "center 30%" } : undefined}

                      />
                    </div>

                    <div className="pt-1 md:pt-1.5 pb-1 text-center" style={{ minHeight: 72 }}>
                      <p
                        className="font-light"
                        style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(13,13,13,0.5)", marginBottom: 4 }}
                      >
                        {(Object.entries(POWERLOV_IMAGE_TYPE_LABELS).find(([k]) => image.includes(k))?.[1]) ?? product.typeLabel}
                      </p>
                      <h3
                        className="text-[#0D0D0D] font-light"
                        style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", lineHeight: 1.35 }}
                      >
                        {cardName}
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
                  {baseItems.map((item, i) => renderCard(item, i, { total: baseItems.length }))}
                </div>
                {category === "all" && appendedItems.length > 0 && (
                  <div
                    className="mx-auto grid gap-x-1 md:gap-x-2 gap-y-1 md:gap-y-1.5 mt-1 md:mt-1.5 w-full items-stretch grid-cols-2 md:grid-cols-4"
                    style={{ maxWidth: 1400 }}
                  >
                    {appendedItems.map((item, i) => renderCard(item, i, { appendedRow: true }))}
                    <div className="col-span-1 h-full">
                      <Link
                        to="/shop/powerlov-lovcicov-2019-bird"
                        onMouseEnter={() => prefetchRoute("/shop/item")}
                        className="group flex flex-col focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0D0D0D]"
                      >
                        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4 / 5", backgroundColor: "#F0EDE7" }}>
                          <img
                            src={closingImage}
                            alt="Sweat LOVCICOV 2019 Bird"
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            style={{ objectPosition: "center 30%" }}
                          />
                        </div>
                        <div className="pt-1 md:pt-1.5 pb-1 text-center" style={{ minHeight: 72 }}>
                          <p className="font-light" style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(13,13,13,0.5)", marginBottom: 4 }}>
                            Sweat
                          </p>
                          <h3 className="text-[#0D0D0D] font-light" style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", lineHeight: 1.35 }}>
                            LOVCICOV 2019 Bird
                          </h3>
                          <p className="mt-0.5 text-[#5F5E5A] font-light" style={{ fontSize: 11, letterSpacing: "0.06em" }}>
                            €109
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
                {appendedItems.length > 0 && (
                  <div className="mx-auto flex justify-center" style={{ maxWidth: 1400, marginTop: "clamp(24px, 4vw, 48px)", marginBottom: "clamp(48px, 8vw, 96px)" }}>
                    <Link
                      to="/shop"
                      onMouseEnter={() => prefetchRoute("/shop")}
                      className="inline-flex items-center justify-center px-7 py-3 text-[11px] uppercase transition-colors duration-300"
                      style={{ backgroundColor: "#0D0D0D", color: "#FFFFFF", letterSpacing: "0.24em" }}
                      onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#2A2A2A"; }}
                      onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#0D0D0D"; }}
                    >
                      Découvrir toute la collection
                    </Link>
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


        <JourneyContinuation current="power" />

        {/* TRUST BAND */}
        <section
          aria-label="Nos engagements"
          style={{ padding: "clamp(48px, 6vw, 88px) clamp(24px, 5vw, 72px)", backgroundColor: "#FFFFFF" }}
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

      <Footer />
    </div>
  );
};

export default PowerLovEditorial;
