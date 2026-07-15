import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JourneyContinuation from "@/components/JourneyContinuation";
import SEO from "@/components/SEO";
import EditorialCollectionGrid, { type LifestyleImage, type FilterOption } from "@/components/EditorialCollectionGrid";
import EditorialTrustBand from "@/components/EditorialTrustBand";
import StoneUniverse from "@/components/StoneUniverse";
import { bijouxProducts, type Product } from "@/data/products";
import { prefetchRoute } from "@/lib/prefetch";

import hero from "@/assets/stonelov/hero.png";
import talisman from "@/assets/stonelov/talisman.png";
import savoirfaire from "@/assets/stonelov/savoirfaire.png";
import closing from "@/assets/stonelov/closing.png";
import bookDeskAsset from "@/assets/stonelov/book-lalune-desk.png.asset.json";
import gridSmall1Asset from "@/assets/stonelov/grid-small-1.jpg.asset.json";
import gridSmall2Asset from "@/assets/stonelov/grid-small-2.jpg.asset.json";

const BG = "#FAF8F4";
const INK = "#1A1A1A";
const MUTED = "#5F5E5A";
const TERRA = "#C4714A";

const lifestyleImages: LifestyleImage[] = [
  { src: talisman, alt: "StoneLov talisman", wide: true, objectPosition: "center 25%" },
  { src: gridSmall1Asset.url, alt: "StoneLov détail" },
  { src: bookDeskAsset.url, alt: "Savoir-faire StoneLov", wide: true },
  { src: gridSmall2Asset.url, alt: "StoneLov détail" },
  { src: savoirfaire, alt: "Savoir-faire StoneLov", wide: true },
];

const typeOf = (p: Product): string => {
  const id = p.id.toLowerCase();
  if (id.startsWith("bracelet")) return "bracelet";
  if (id === "big-lov" || id === "small-lov") return "sac";
  return "collier";
};

const filters: FilterOption[] = [
  { key: "colliers", label: "Colliers", match: (p) => typeOf(p) === "collier" },
  { key: "bracelets", label: "Bracelets", match: (p) => typeOf(p) === "bracelet" },
];

const typeLabel = (p: Product) => {
  const t = typeOf(p);
  return t === "collier" ? "Collier" : t === "bracelet" ? "Bracelet" : "Sac";
};

const scrollToGrid = () => {
  document.getElementById("stonelov-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const StoneLovEditorial = () => {
  return (
    <div style={{ backgroundColor: BG, scrollBehavior: "smooth" }} className="min-h-screen">
      <SEO
        title="StoneLov — Wear the stone. | LOVCICOV Paris"
        description="StoneLov par LOVCICOV Paris : bijoux en pierres naturelles. La matière comme mémoire, la pierre comme signature."
        path="/stonelov"
      />
      <Navbar />

      <main className="pt-[73px] overflow-hidden">
        {/* HERO */}
        <section
          className="relative w-screen h-[75svh] md:h-[95vh] overflow-hidden"
          style={{ backgroundColor: BG }}
        >
          <img
            src={hero}
            alt="StoneLov par LOVCICOV Paris"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center 25%" }}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div
            className="absolute inset-x-0 bottom-3 z-10 md:bottom-6"
            style={{ paddingInline: "clamp(24px, 5vw, 72px)" }}
          >
            <div className="max-w-[19rem] md:max-w-3xl">
              <p
                className="mb-1 text-[8px] md:text-[11px] uppercase inline-block px-2 py-0.5 rounded-sm"
                style={{
                  color: TERRA,
                  letterSpacing: "0.22em",
                  backgroundColor: "rgba(255,255,255,0.4)",
                  fontFamily: "Instrument Sans, system-ui, sans-serif",
                }}
              >
                StoneLov
              </p>
              <p
                className="mt-2 mb-2 md:mb-4 italic"
                style={{
                  fontFamily: "Instrument Sans, system-ui, sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(13px, 2vw, 22px)",
                  color: INK,
                  textShadow: "0 1px 6px rgba(255,255,255,0.6)",
                }}
              >
                Rooted in the earth.
              </p>
              <button
                type="button"
                onClick={scrollToGrid}
                className="mt-2 md:mt-6 inline-flex items-center justify-center px-3.5 py-1.5 md:px-7 md:py-3 text-[8px] md:text-[11px] uppercase transition-colors duration-300"
                style={{
                  backgroundColor: TERRA,
                  color: "#FFFFFF",
                  letterSpacing: "0.2em",
                  fontFamily: "Instrument Sans, system-ui, sans-serif",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#A55A35"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = TERRA; }}
              >
                Découvrir la collection
              </button>
            </div>
          </div>
        </section>

        {/* GIANT TITLE + INTRO */}
        <section
          className="w-full text-center"
          style={{ padding: "clamp(48px, 8vw, 96px) clamp(16px, 4vw, 48px) clamp(24px, 4vw, 48px)", backgroundColor: BG }}
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
              color: INK,
            }}
          >
            STONELOV
          </motion.h1>
          <p
            className="mx-auto mt-6 md:mt-10 italic font-light"
            style={{
              fontFamily: "Instrument Sans, system-ui, sans-serif",
              fontSize: "clamp(14px, 1.4vw, 18px)",
              maxWidth: 640,
              lineHeight: 1.7,
              color: `${INK}CC`,
            }}
          >
            La matière comme mémoire, la pierre comme signature.
          </p>
        </section>

        {/* UNIVERS DES PIERRES (existing block preserved) */}
        <StoneUniverse />

        {/* PRODUCT GRID + STICKY FILTERS + QUOTE */}
        <EditorialCollectionGrid
          anchorId="stonelov-grid"
          products={bijouxProducts}
          lifestyleImages={lifestyleImages}
          filters={filters}
          quote="Rooted in the earth."
          colors={{ bg: BG, ink: INK, muted: MUTED }}
          typeLabel={typeLabel}
        />

        {/* BRIDGE — closing image + CTA to PowerLov */}
        <section style={{ backgroundColor: BG }}>
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 9", backgroundColor: BG }}>
            <img
              src={closing}
              alt="StoneLov par LOVCICOV Paris"
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
                to="/powerlov"
                onMouseEnter={() => prefetchRoute("/powerlov")}
                className="inline-flex items-center justify-center px-3.5 py-1.5 md:px-7 md:py-3 text-[8px] md:text-[11px] uppercase transition-colors duration-300"
                style={{
                  backgroundColor: TERRA,
                  color: "#FFFFFF",
                  letterSpacing: "0.2em",
                  fontFamily: "Instrument Sans, system-ui, sans-serif",
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#A55A35"; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = TERRA; }}
              >
                Découvrir PowerLov
              </Link>
            </div>
          </div>
        </section>

        {/* TRUST BAND */}
        <EditorialTrustBand bg={BG} ink={INK} />
      </main>

      <JourneyContinuation current="stone" />
      <Footer />
    </div>
  );
};

export default StoneLovEditorial;
