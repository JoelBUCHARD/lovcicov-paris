import { formatPrice } from '@/lib/price';
import { useMemo, useState } from "react";
import { spaceOutDuplicates } from "@/lib/spaceOutDuplicates";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import CategoryTabs from "@/components/CategoryTabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JourneyContinuation from "@/components/JourneyContinuation";
import SEO from "@/components/SEO";
import { prefetchRoute, prefetchImage } from "@/lib/prefetch";
import { BAGS, BAG_SILHOUETTES, grigriProducts, sacsProducts } from "@/data/products";
import { resolveProductImage } from "@/lib/productImage";
import { displayProductName } from '@/lib/productDisplayName';

type Section = "sacs" | "accessoires";

const resolveImage = (key: string) => (key.startsWith("/") ? key : resolveProductImage(key));

type ProductCard = {
  key: string;
  id: string;
  name: string;
  typeLabel: string;
  price: number;
  image: string;
  hoverImage?: string;
  gallery: string[];
  to: string;
};

// ORDRE D'AFFICHAGE DE LA GRILLE SACS
// Pour réordonner : déplacer simplement les slugs ci-dessous.
// Un sac absent de cette liste est affiché à la fin.
const displayOrder: string[] = [
  'big-lov-tricolore-rouge',
  'small-lov-bicolore-argent',
  'big-lov-azteque-vert',
  'small-lov-bicolore-bleu',
  'big-lov-tricolore-marine',
  'small-lov-azteque-rouge',
  'big-lov-azteque-noir',
  'small-lov-tricolore-or',
  'big-lov-bicolore-rose',
  'small-lov-azteque-terracotta',
  'big-lov-bicolore-kaki',
  'small-lov-tricolore-kaki',
];

const orderIndex = (slug: string) => {
  const i = displayOrder.indexOf(slug);
  return i === -1 ? displayOrder.length : i;
};

const products: ProductCard[] = BAGS.filter((b) => sacsProducts.some((p) => p.id === b.slug)).map((b) => ({
  key: b.slug,
  id: b.slug,
  name: b.name,
  typeLabel: BAG_SILHOUETTES[b.silhouette].label,
  price: sacsProducts.find((p) => p.id === b.slug)?.price ?? 0,
  image: resolveImage(b.images[0]),
  hoverImage: b.images[1] ? resolveImage(b.images[1]) : undefined,
  gallery: b.images.slice(1),
  to: `/sacs/${b.slug}`,
})).sort((a, b) => orderIndex(a.id) - orderIndex(b.id));

const accessoires: ProductCard[] = grigriProducts.map((g) => ({
  key: g.id,
  id: g.id,
  name: g.name,
  typeLabel: "Grigri",
  price: Number(g.price),
  image: resolveImage(g.image),
  hoverImage: g.gallery?.[0] ? resolveImage(g.gallery[0]) : undefined,
  gallery: g.gallery ?? [],
  to: `/shop/${g.id}`,
}));


const heroImage = "/images/sacs/hero-lovbag.jpg";

const SECTION_LABELS: { key: Section; label: string }[] = [
  { key: "sacs", label: "Sacs" },
  { key: "accessoires", label: "Accessoires" },
];

const pageStyle = {
  backgroundColor: "#FAF8F4",
  color: "#0D0D0D",
  fontFamily: "Instrument Sans, system-ui, sans-serif",
};

const Sacs = () => {
  const location = useLocation();
  const [section, setSection] = useState<Section>("sacs");

  const filtered = useMemo(
    () => spaceOutDuplicates(section === "accessoires" ? accessoires : products, (p) => p.id || p.name),
    [section]
  );


  const from = `${location.pathname}${location.search}`;

  return (
    <div style={pageStyle} className="min-h-screen">
      <SEO
        title="La collection Sacs tressés | LOVCICOV Paris"
        description="Cuir de buffle tressé main. Ouverture en V. Charm cœur signature. Deux silhouettes, douze coloris, tressés à la main en Inde."
        path="/sacs"
      />
      <Navbar />

      <main className="overflow-hidden" style={{ paddingTop: "var(--collection-offset)" }}>
        {/* HERO */}
        <section
          className="relative w-screen overflow-hidden aspect-[4/5] md:aspect-[16/9]"
        >
          <img
            src={heroImage}
            alt="La collection Sacs tressés par LOVCICOV Paris"
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
                LovBag
              </p>
              <p
                className="mb-2 md:mb-4 italic"
                style={{
                  fontWeight: 300,
                  fontSize: "clamp(18px, 5vw, 22px)",
                  color: "rgba(244,240,232,0.82)",
                }}
              >
                Le cuir tressé main.
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
            LOVBAG
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8 }}
            className="mx-auto"
            style={{
              maxWidth: 620,
              marginTop: "clamp(16px, 2vw, 24px)",
              fontSize: 11,
              lineHeight: 1.8,
              letterSpacing: "0.06em",
              color: "rgba(13,13,13,0.5)",
            }}
          >
            Tressés à la main en Inde, un fil de cuir de buffle après l'autre. Deux silhouettes, douze coloris,
            un même geste : celui de l'artisan.
          </motion.p>
        </section>

        {/* STICKY FILTER BAR */}
        <div
          className="sticky z-30 border-y border-[rgba(13,13,13,0.08)] backdrop-blur"
          style={{ top: "var(--header-height)", backgroundColor: "rgba(250,248,244,0.92)" }}
          id="sacs-grid"
        >
          <div
            className="mx-auto flex items-center justify-between gap-4"
            style={{ padding: "14px clamp(16px, 4vw, 48px)", maxWidth: 1600 }}
          >
            <span className="whitespace-nowrap" aria-hidden="true" />

            <CategoryTabs
              ariaLabel="Sacs et accessoires"
              tabs={SECTION_LABELS}
              active={section}
              onChange={(k) => setSection(k as typeof section)}
            />

            <span className="whitespace-nowrap" aria-hidden="true" />
          </div>
        </div>

        {/* PRODUCT GRID — grille éditoriale (grandes cartes alternées) */}
        <section
          aria-label="Sélection Sacs"
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
              const layout = (arr as any).__lbLayout ?? (() => {
                const heroSet = new Set<number>();
                for (let k = 0; k < arr.length; k += 5) {
                  if (arr.length - k >= 7) heroSet.add(k);
                }
                const H = heroSet.size;
                const rem = (3 * H + arr.length) % 4;
                const landSet = new Set<number>();
                const promote = (n: number) => {
                  let c = 0;
                  for (let k = arr.length - 1; k >= 0 && c < n; k--) {
                    if (!heroSet.has(k)) { landSet.add(k); c++; }
                  }
                };
                if (rem === 2) promote(2);
                else if (rem === 3) promote(1);
                else if (rem === 1) promote(3);
                const data = { heroSet, landSet };
                (arr as any).__lbLayout = data;
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
                  to={product.to}
                  state={{ from, galleryOrder: product.gallery }}
                  onMouseEnter={() => {
                    prefetchRoute(product.to);
                    prefetchImage(product.image);
                    if (product.hoverImage) prefetchImage(product.hoverImage);
                  }}
                  onTouchStart={() => prefetchRoute(product.to)}
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
                        product.hoverImage ? " [@media(hover:hover)]:group-hover:opacity-0" : ""
                      }`}
                      style={{ objectPosition: "center" }}
                    />
                    {product.hoverImage && (
                      <img
                        src={product.hoverImage}
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

        <JourneyContinuation current="lovbag" />
      </main>

      <Footer />
    </div>
  );
};

export default Sacs;
