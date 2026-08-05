import { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JourneyContinuation from "@/components/JourneyContinuation";
import SEO from "@/components/SEO";
import ProductCard from "@/components/ProductCard";
import { prefetchRoute } from "@/lib/prefetch";
import { grigriProducts, sacsProducts, BAGS } from "@/data/products";
import { resolveProductImage } from "@/lib/productImage";

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

const Sacs = () => {
  const location = useLocation();
  const [tab, setTab] = useState<Tab>("sacs");
  const [silhouette, setSilhouette] = useState<Silhouette>("all");
  const [motif, setMotif] = useState<Motif>("all");

  // Filtres cumulables, sans rechargement
  const visibleBags = useMemo(
    () =>
      BAGS.filter(
        (b) => (silhouette === "all" || b.silhouette === silhouette) && (motif === "all" || b.motif === motif)
      )
        .map((b) => sacsProducts.find((p) => p.id === b.slug)!)
        .filter(Boolean),
    [silhouette, motif]
  );

  const goToNewsletter = () => {
    const el = document.getElementById("footer-newsletter-email");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(() => (el as HTMLInputElement).focus(), 600);
    }
  };

  const from = `${location.pathname}${location.search}`;


  return (
    <div style={pageStyle} className="min-h-screen">
      <SEO
        title="LovBag — Sacs cuir tressé | LOVCICOV Paris"
        description="LovBag par LOVCICOV Paris : sacs en cuir pleine fleur tressés à la main. Big LOV et Small LOV, une palette de teintes signatures."
        path="/sacs"
      />
      <Navbar />

      <main className="pt-[73px] overflow-hidden">
        {/* HERO — placeholder gradient en attendant les visuels */}
        <section
          className="relative w-screen h-[95svh] md:h-[115vh] overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #6B4A2E 0%, #A0623E 35%, #C8463A 70%, #E8DCC8 100%)",
          }}
        >
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
                LovBag
              </p>
              <p
                className="mb-2 md:mb-4 italic"
                style={{ fontWeight: 300, fontSize: "clamp(13px, 2vw, 22px)", color: "rgba(244,240,232,0.9)" }}
              >
                Le cuir tressé, geste après geste. Un sac pensé pour durer.
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
        </section>

        {/* TABS */}
        <div
          className="sticky z-30 border-y border-[rgba(13,13,13,0.08)] backdrop-blur"
          style={{ top: 73, backgroundColor: "rgba(250,248,244,0.92)" }}
          id="lovbag-grid"
        >
          <nav aria-label="Catégories LovBag" style={{ padding: "14px clamp(16px, 4vw, 48px)" }}>
            <ul className="flex items-center justify-center gap-8 md:gap-12 whitespace-nowrap">
              {TABS.map(({ key, label }) => {
                const active = tab === key;
                return (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => setTab(key)}
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
        </div>

        {tab === "sacs" ? (
          <>
            {/* En-tête collection + chapô */}
            <section
              className="w-full text-center"
              style={{ padding: "clamp(32px, 5vw, 64px) clamp(16px, 4vw, 48px) clamp(8px, 2vw, 16px)" }}
            >
              <div className="mx-auto" style={{ maxWidth: 720 }}>
                <h2
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
                </h2>
                <p
                  className="mt-3 uppercase"
                  style={{ fontSize: 10, letterSpacing: "0.24em", color: "rgba(13,13,13,0.5)" }}
                >
                  Cuir de buffle tressé main. Ouverture en V. Charm cœur signature.
                </p>
                <p
                  className="mx-auto mt-5 font-light"
                  style={{ fontSize: 13, lineHeight: 1.8, color: "#5F5E5A", maxWidth: 520 }}
                >
                  Tressés à la main en Inde, un fil de cuir de buffle après l'autre. Deux silhouettes,
                  douze coloris, un même geste : celui de l'artisan.
                </p>
              </div>
            </section>

            {/* Filtres cumulables : silhouette + motif */}
            <section
              aria-label="Filtres de la collection Sacs"
              style={{ padding: "clamp(8px, 2vw, 16px) clamp(12px, 3vw, 40px) clamp(16px, 3vw, 32px)" }}
            >
              <div className="mx-auto flex flex-col items-center gap-3" style={{ maxWidth: 1400 }}>
                <ul className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                  {SILHOUETTE_FILTERS.map(({ key, label }) => {
                    const active = silhouette === key;
                    return (
                      <li key={key}>
                        <button
                          type="button"
                          onClick={() => setSilhouette(key)}
                          aria-pressed={active}
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
                <ul className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                  {MOTIF_FILTERS.map(({ key, label }) => {
                    const active = motif === key;
                    return (
                      <li key={key}>
                        <button
                          type="button"
                          onClick={() => setMotif(key)}
                          aria-pressed={active}
                          className="uppercase transition-colors duration-200 px-3 py-2 border"
                          style={{
                            fontSize: 9,
                            letterSpacing: "0.22em",
                            color: active ? "#FAF8F4" : "rgba(13,13,13,0.6)",
                            backgroundColor: active ? "#0D0D0D" : "transparent",
                            borderColor: active ? "#0D0D0D" : "#E8D8C8",
                          }}
                        >
                          {label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>

            {/* Grille produits — carte et grille standard du site */}
            <section
              aria-label="Sacs tressés LOVCICOV"
              style={{ padding: "0 clamp(12px, 3vw, 40px) clamp(32px, 5vw, 64px)" }}
            >
              <div
                className="mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 md:gap-x-4 gap-y-8 md:gap-y-10"
                style={{ maxWidth: 1400 }}
              >
                {visibleBags.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
              {visibleBags.length === 0 && (
                <p
                  className="text-center uppercase"
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
              style={{ padding: "clamp(48px, 7vw, 96px) clamp(16px, 4vw, 48px)" }}
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
            style={{ padding: "clamp(24px, 4vw, 56px) clamp(12px, 3vw, 40px) clamp(32px, 5vw, 64px)" }}
          >
            <div
              className="mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 md:gap-x-4 gap-y-8 md:gap-y-10"
              style={{ maxWidth: 1400 }}
            >
              {grigriProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: Math.min(i, 6) * 0.035 }}
                >
                  <Link
                    to={`/shop/${p.id}`}
                    state={{ from }}
                    onMouseEnter={() => prefetchRoute("/shop/item")}
                    onTouchStart={() => prefetchRoute("/shop/item")}
                    className="group flex flex-col focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0D0D0D]"
                  >
                    <div className="relative w-full overflow-hidden bg-[#F0EDE7]" style={{ aspectRatio: "1 / 1" }}>
                      <img
                        src={resolveProductImage(p.image)}
                        alt={p.name}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="pt-3 text-center">
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
                        €{p.price}
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
