import { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JourneyContinuation from "@/components/JourneyContinuation";
import SEO from "@/components/SEO";
import SortFilterMenu, { type SortKey } from "@/components/SortFilterMenu";
import { prefetchRoute, prefetchImage } from "@/lib/prefetch";
import { grigriProducts, sacsProducts, BAGS } from "@/data/products";
import { resolveProductImage } from "@/lib/productImage";
import { formatPrice } from "@/lib/price";

type Tab = "sacs" | "accessoires";
type Silhouette = "all" | "big" | "sml";
type Motif = "all" | "Tricolore" | "Bicolore" | "Aztèque";

const TABS: { key: Tab; label: string }[] = [
  { key: "sacs", label: "Sacs" },
  { key: "accessoires", label: "Accessoires" },
];

const SILHOUETTE_FILTERS: { key: Silhouette; label: string }[] = [
  { key: "all", label: "Toutes" },
  { key: "big", label: "Big LOV" },
  { key: "sml", label: "Small LOV" },
];

const MOTIF_FILTERS: { key: Motif; label: string }[] = [
  { key: "all", label: "Tous motifs" },
  { key: "Tricolore", label: "Tricolore" },
  { key: "Bicolore", label: "Bicolore" },
  { key: "Aztèque", label: "Aztèque" },
];

const SAVOIR_FAIRE = [
  {
    title: "Cuir de buffle tressé main",
    text: "Un fil de cuir après l'autre, selon la technique intrecciato. Chaque sac demande plusieurs heures de travail.",
  },
  {
    title: "Ouverture en V",
    text: "La signature de la collection : une ligne d'ouverture nette, bordée d'un tressage sur tout le pourtour.",
  },
  {
    title: "Charm cœur signature",
    text: "Un charm en cuir gravé LOVCICOV PARIS, accroché à chaque pièce de la collection.",
  },
];

const pageStyle = {
  backgroundColor: "#FAF8F4",
  color: "#0D0D0D",
  fontFamily: "Instrument Sans, system-ui, sans-serif",
};

// Style d'onglet souligné — identique à la barre de filtres PowerLov
const tabStyle = (active: boolean) => ({
  fontSize: 10,
  letterSpacing: "0.24em",
  color: active ? "#0D0D0D" : "rgba(13,13,13,0.5)",
  borderBottom: active ? "1px solid #0D0D0D" : "1px solid transparent",
  paddingBottom: 4,
});

const Sacs = () => {
  const location = useLocation();
  const [tab, setTab] = useState<Tab>("sacs");
  const [silhouette, setSilhouette] = useState<Silhouette>("all");
  const [motif, setMotif] = useState<Motif>("all");
  const [sort, setSort] = useState<SortKey>("default");

  // Filtres cumulables, sans rechargement
  const visibleBags = useMemo(() => {
    const base = BAGS.filter(
      (b) => (silhouette === "all" || b.silhouette === silhouette) && (motif === "all" || b.motif === motif)
    )
      .map((b) => sacsProducts.find((p) => p.id === b.slug)!)
      .filter(Boolean);
    const sorted = [...base];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "name-asc") sorted.sort((a, b) => a.name.localeCompare(b.name, "fr"));
    return sorted;
  }, [silhouette, motif, sort]);

  const from = `${location.pathname}${location.search}`;

  return (
    <div style={pageStyle} className="min-h-screen">
      <SEO
        title="LovBag — Sacs cuir tressé | LOVCICOV Paris"
        description="LovBag par LOVCICOV Paris : sacs en cuir pleine fleur tressés à la main. Big LOV et Small LOV, une palette de teintes signatures."
        path="/sacs"
      />
      <Navbar />

      <main className="overflow-hidden" style={{ paddingTop: 'var(--header-height, 154px)' }}>
        {/* EN-TÊTE DE PAGE — titre + sous-titre */}
        <section
          className="w-full text-center"
          style={{ padding: "clamp(48px, 8vw, 96px) clamp(16px, 4vw, 48px) clamp(16px, 3vw, 32px)" }}
        >
          <div className="mx-auto" style={{ maxWidth: 720 }}>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8 }}
              className="uppercase"
              style={{
                fontFamily: "Instrument Sans, system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(18px, 2.4vw, 26px)",
                letterSpacing: "0.16em",
                color: "#0D0D0D",
              }}
            >
              La collection Sacs tressés
            </motion.h1>
            <p className="mt-3 uppercase" style={{ fontSize: 10, letterSpacing: "0.24em", color: "rgba(13,13,13,0.5)" }}>
              Cuir de buffle tressé main. Ouverture en V. Charm cœur signature.
            </p>
            <p className="mx-auto mt-5 font-light" style={{ fontSize: 13, lineHeight: 1.8, color: "#5F5E5A", maxWidth: 520 }}>
              Tressés à la main en Inde, un fil de cuir de buffle après l'autre. Deux silhouettes,
              douze coloris, un même geste : celui de l'artisan.
            </p>
          </div>
        </section>

        {/* BARRE DE FILTRES STICKY — même composition que PowerLov */}
        <div
          className="sticky z-30 border-y border-[rgba(13,13,13,0.08)] backdrop-blur"
          style={{ top: "var(--header-height, 154px)", backgroundColor: "rgba(250,248,244,0.92)" }}
          id="lovbag-grid"
        >
          <div
            className="mx-auto flex items-center justify-between gap-4"
            style={{ padding: "14px clamp(16px, 4vw, 48px)", maxWidth: 1600 }}
          >
            <span className="whitespace-nowrap" aria-hidden="true" />

            <nav aria-label="Catégories LovBag" className="flex-1 overflow-x-auto no-scrollbar">
              <ul className="flex items-center justify-center gap-5 md:gap-9 whitespace-nowrap">
                {TABS.map(({ key, label }) => (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => setTab(key)}
                      className="uppercase transition-colors duration-200"
                      style={tabStyle(tab === key)}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <SortFilterMenu sort={sort} onChange={setSort} />
          </div>
        </div>

        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        {tab === "sacs" ? (
          <>
            {/* Filtres cumulables : silhouette + motif — même style d'onglet souligné */}
            <section
              aria-label="Filtres de la collection Sacs"
              style={{ padding: "clamp(16px, 3vw, 32px) clamp(12px, 3vw, 40px) 0" }}
            >
              <div className="mx-auto flex flex-col items-center gap-3" style={{ maxWidth: 1400 }}>
                <ul className="flex flex-wrap items-center justify-center gap-5 md:gap-9">
                  {SILHOUETTE_FILTERS.map(({ key, label }) => (
                    <li key={key}>
                      <button
                        type="button"
                        onClick={() => setSilhouette(key)}
                        aria-pressed={silhouette === key}
                        className="uppercase transition-colors duration-200"
                        style={tabStyle(silhouette === key)}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
                <ul className="flex flex-wrap items-center justify-center gap-5 md:gap-9">
                  {MOTIF_FILTERS.map(({ key, label }) => (
                    <li key={key}>
                      <button
                        type="button"
                        onClick={() => setMotif(key)}
                        aria-pressed={motif === key}
                        className="uppercase transition-colors duration-200"
                        style={tabStyle(motif === key)}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* GRILLE PRODUITS — grille et carte PowerLov */}
            <section
              aria-label="Sacs tressés LOVCICOV"
              style={{ padding: "clamp(24px, 4vw, 56px) clamp(12px, 3vw, 40px) 4px" }}
            >
              <div
                className="mx-auto grid grid-cols-2 md:grid-cols-3 gap-x-1 md:gap-x-2 gap-y-1 md:gap-y-2"
                style={{ maxWidth: 1400 }}
              >
                {visibleBags.map((p, i) => {
                  const image = resolveProductImage(p.image);
                  return (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.7, delay: Math.min(i, 6) * 0.035 }}
                      className="col-span-1 md:h-full"
                    >
                      <Link
                        to={`/sacs/${p.id}`}
                        state={{ from }}
                        onMouseEnter={() => {
                          prefetchRoute("/sacs/item");
                          prefetchImage(image);
                        }}
                        onTouchStart={() => prefetchRoute("/sacs/item")}
                        className="group flex flex-col md:h-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0D0D0D]"
                      >
                        <div
                          className="relative w-full overflow-hidden aspect-[4/5]"
                          style={{ backgroundColor: "#F0EDE7" }}
                        >
                          <img
                            src={image}
                            alt={`${p.name} en cuir de buffle tressé main, charm cœur LOVCICOV`}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover"
                            style={{ objectPosition: "center top" }}
                          />
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
                            Sac
                          </p>
                          <h3
                            className="text-[#0D0D0D] font-light product-card-title"
                            style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", lineHeight: 1.35 }}
                          >
                            {p.name}
                          </h3>
                          <p className="mt-0.5 text-[#5F5E5A] font-light" style={{ fontSize: 11, letterSpacing: "0.06em" }}>
                            {formatPrice(p.price)}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {visibleBags.length === 0 && (
                <p
                  className="text-center uppercase mt-10"
                  style={{ fontSize: 10, letterSpacing: "0.24em", color: "rgba(13,13,13,0.5)" }}
                >
                  Aucun sac ne correspond à cette sélection.
                </p>
              )}
            </section>

            {/* Le savoir-faire — 3 colonnes */}
            <section
              aria-label="Le savoir-faire"
              className="border-t border-[rgba(13,13,13,0.08)]"
              style={{ padding: "clamp(48px, 7vw, 96px) clamp(16px, 4vw, 48px)", marginTop: "clamp(24px, 4vw, 48px)" }}
            >
              <p
                className="text-center uppercase"
                style={{ fontSize: 10, letterSpacing: "0.28em", color: "rgba(13,13,13,0.5)", marginBottom: 32 }}
              >
                Le savoir-faire
              </p>
              <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center" style={{ maxWidth: 1000 }}>
                {SAVOIR_FAIRE.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.7, delay: i * 0.035 }}
                  >
                    <h3
                      className="uppercase"
                      style={{ fontSize: 11, letterSpacing: "0.16em", color: "#0D0D0D", marginBottom: 10 }}
                    >
                      {item.title}
                    </h3>
                    <p className="font-light" style={{ fontSize: 12.5, lineHeight: 1.75, color: "#5F5E5A" }}>
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <section
            aria-label="Grigris LovBag"
            style={{ padding: "clamp(24px, 4vw, 56px) clamp(12px, 3vw, 40px) clamp(48px, 8vw, 96px)" }}
          >
            <div
              className="mx-auto grid grid-cols-2 md:grid-cols-3 gap-x-1 md:gap-x-2 gap-y-1 md:gap-y-2"
              style={{ maxWidth: 1400 }}
            >
              {grigriProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: Math.min(i, 6) * 0.035 }}
                  className="col-span-1 md:h-full"
                >
                  <Link
                    to={`/shop/${p.id}`}
                    state={{ from }}
                    onMouseEnter={() => prefetchRoute("/shop/item")}
                    onTouchStart={() => prefetchRoute("/shop/item")}
                    className="group flex flex-col md:h-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0D0D0D]"
                  >
                    <div className="relative w-full overflow-hidden aspect-[4/5]" style={{ backgroundColor: "#F0EDE7" }}>
                      <img
                        src={resolveProductImage(p.image)}
                        alt={p.name}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover"
                        style={{ objectPosition: "center top" }}
                      />
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
                        Grigri
                      </p>
                      <h3
                        className="text-[#0D0D0D] font-light product-card-title"
                        style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", lineHeight: 1.35 }}
                      >
                        {p.name}
                      </h3>
                      <p className="mt-0.5 text-[#5F5E5A] font-light" style={{ fontSize: 11, letterSpacing: "0.06em" }}>
                        {formatPrice(p.price)}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        <JourneyContinuation
          eyebrow="Explorer"
          title="Trois univers, une même maison"
        />
      </main>

      <Footer />
    </div>
  );
};

export default Sacs;
