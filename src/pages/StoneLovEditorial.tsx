import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JourneyContinuation from "@/components/JourneyContinuation";
import SEO from "@/components/SEO";
import { prefetchRoute, prefetchImage } from "@/lib/prefetch";
import { bijouxProducts } from "@/data/products";
import { resolveProductImage } from "@/lib/productImage";
import heroImg from "@/assets/stonelov/hero.png";
import closingImg from "@/assets/stonelov/closing.png";

type Category = "all" | "colliers" | "bracelets";

type ProductCard = {
  id: string;
  name: string;
  typeLabel: string;
  price: number;
  image: string;
  hover?: string;
};

const getTypeLabel = (name: string) => {
  const n = name.toLowerCase();
  if (n.startsWith("bracelet")) return "Bracelet";
  if (n.startsWith("collier")) return "Collier";
  return "Bijou";
};

const products: ProductCard[] = bijouxProducts.map((p) => ({
  id: p.id,
  name: p.name,
  typeLabel: getTypeLabel(p.name),
  price: typeof p.price === "number" ? p.price : Number(p.price) || 0,
  image: resolveProductImage(p.image),
  hover: p.gallery?.[0] ? resolveProductImage(p.gallery[0]) : undefined,
}));

const CATEGORY_LABELS: { key: Category; label: string }[] = [
  { key: "all", label: "Tout voir" },
  { key: "colliers", label: "Colliers" },
  { key: "bracelets", label: "Bracelets" },
];

const pageStyle = {
  backgroundColor: "#FAF8F4",
  color: "#0D0D0D",
  fontFamily: "Instrument Sans, system-ui, sans-serif",
};

type SortKey = "default" | "price-asc" | "price-desc" | "name-asc";

const SORT_LABELS: { key: SortKey; label: string }[] = [
  { key: "default", label: "Notre sélection" },
  { key: "price-asc", label: "Prix croissant" },
  { key: "price-desc", label: "Prix décroissant" },
  { key: "name-asc", label: "Ordre alphabétique" },
];

const StoneLovEditorial = () => {
  const location = useLocation();
  const [category, setCategory] = useState<Category>("all");
  const [sort, setSort] = useState<SortKey>("default");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!filtersOpen) return;
    const onClick = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFiltersOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [filtersOpen]);

  const filtered = useMemo(() => {
    const base = products.filter((p) =>
      category === "all" ? true : category === "colliers" ? p.typeLabel === "Collier" : p.typeLabel === "Bracelet"
    );
    const sorted = [...base];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "name-asc") sorted.sort((a, b) => a.name.localeCompare(b.name, "fr"));
    return sorted;
  }, [category, sort]);


  const scrollToGrid = () => {
    document.getElementById("stonelov-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const from = `${location.pathname}${location.search}`;

  return (
    <div style={pageStyle} className="min-h-screen">
      <SEO
        title="StoneLov — Wear the stone. | LOVCICOV Paris"
        description="StoneLov par LOVCICOV Paris : bijoux en pierres naturelles assemblés main. La matière comme mémoire, la pierre comme signature."
        path="/stonelov"
      />
      <Navbar />

      <main className="pt-[73px] overflow-hidden">
        {/* HERO */}
        <section className="relative w-screen h-[95svh] md:h-[115vh] overflow-hidden">
          <img
            src={heroImg}
            alt="StoneLov par LOVCICOV Paris"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(1.05) contrast(0.98)", objectPosition: "center 10%" }}
            loading="eager"
            decoding="async"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(13,13,13,0.14) 0%, rgba(13,13,13,0.24) 48%, rgba(13,13,13,0.22) 100%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-3 z-10 md:bottom-6"
            style={{ paddingInline: "clamp(24px, 5vw, 72px)" }}
          >
            <div className="max-w-[19rem] md:max-w-3xl">
              <p
                className="mb-1 text-[8px] md:text-[11px] uppercase"
                style={{ color: "rgba(244,240,232,0.85)", letterSpacing: "0.22em" }}
              >
                StoneLov
              </p>
              <p
                className="mb-2 md:mb-4 italic"
                style={{ fontWeight: 300, fontSize: "clamp(13px, 2vw, 22px)", color: "rgba(244,240,232,0.92)" }}
              >
                Rooted in the earth.
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
            STONELOV
          </motion.h1>
        </section>

        {/* STICKY FILTER BAR */}
        <div
          className="sticky z-30 border-y border-[rgba(13,13,13,0.08)] backdrop-blur"
          style={{ top: 73, backgroundColor: "rgba(250,248,244,0.92)" }}
          id="stonelov-grid"
        >
          <div
            className="mx-auto flex items-center justify-between gap-4"
            style={{ padding: "14px clamp(16px, 4vw, 48px)", maxWidth: 1600 }}
          >
            <span className="whitespace-nowrap" aria-hidden="true" />
            <nav aria-label="Catégories StoneLov" className="flex-1 overflow-x-auto no-scrollbar">
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

        {/* PRODUCT GRID */}
        <section aria-label="Sélection StoneLov" style={{ padding: "clamp(24px, 4vw, 56px) clamp(12px, 3vw, 40px) 4px" }}>
          <style>{`
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>

          <div
            className="mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-1 md:gap-x-2 gap-y-1 md:gap-y-1.5 md:[grid-auto-flow:dense]"
            style={{ maxWidth: 1400 }}
          >
            {filtered.map((product, i, arr) => {
              const uniformMode = category !== "all";
              const layout = (arr as any).__stoneLayout ?? (() => {
                const heroSet = new Set<number>();
                if (!uniformMode) {
                  for (let k = 0; k < arr.length; k += 5) {
                    if (arr.length - k >= 7) heroSet.add(k);
                  }
                }
                const H = heroSet.size;
                const cells = 3 * H + arr.length;
                const rem = cells % 4;
                const landSet = new Set<number>();
                const promote = (n: number) => {
                  let c = 0;
                  for (let k = arr.length - 1; k >= 0 && c < n; k--) {
                    if (!heroSet.has(k)) { landSet.add(k); c++; }
                  }
                };
                if (!uniformMode) {
                  if (rem === 2) promote(2);
                  else if (rem === 3) promote(1);
                  else if (rem === 1) promote(3);
                }
                const data = { heroSet, landSet };
                (arr as any).__stoneLayout = data;
                return data;
              })();
              const heroIndex = Math.floor(i / 5);
              const isHero = !uniformMode && layout.heroSet.has(i);
              const isLandscape = !uniformMode && !isHero && layout.landSet.has(i);
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
                        aspectRatio: isHero ? undefined : "4 / 5",
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        loading={i < 4 ? "eager" : "lazy"}
                        decoding="async"
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[700ms] ease-out ${product.hover ? "group-hover:opacity-0" : ""}`}
                      />
                      {product.hover && (
                        <img
                          src={product.hover}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[700ms] ease-out group-hover:opacity-100"
                        />
                      )}
                    </div>
                    <div className="pt-1 md:pt-1.5 pb-1 text-center" style={{ minHeight: 72 }}>
                      <p
                        className="font-light"
                        style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(13,13,13,0.5)", marginBottom: 4 }}
                      >
                        {product.typeLabel}
                      </p>
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

          <div className="mx-auto flex justify-center" style={{ maxWidth: 1400, marginTop: "clamp(24px, 4vw, 48px)", marginBottom: "clamp(72px, 10vw, 128px)" }}>
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
        </section>

      </main>

      <JourneyContinuation current="stone" />

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
              <p className="uppercase mb-4" style={{ fontSize: 11, letterSpacing: "0.24em", color: "#0D0D0D" }}>
                {b.title}
              </p>
              <p className="mx-auto max-w-xs" style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(13,13,13,0.65)" }}>
                {b.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StoneLovEditorial;
