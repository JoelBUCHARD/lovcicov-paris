import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JourneyContinuation from "@/components/JourneyContinuation";
import SEO from "@/components/SEO";
import EditorialCollectionGrid, { type LifestyleImage, type FilterOption } from "@/components/EditorialCollectionGrid";
import EditorialTrustBand from "@/components/EditorialTrustBand";
import { mysticProducts, type Product } from "@/data/products";
import { prefetchRoute } from "@/lib/prefetch";

import heroSoloAsset from "@/assets/mysticlov/mysticlov-hero-cafe-paris.png.asset.json";
import groupShotAsset from "@/assets/mysticlov/mysticlov-block4-paris-street.png.asset.json";
import closingJoyAsset from "@/assets/mysticlov/mysticlov-closing-cafedeflore.png.asset.json";
import mosaicOneAsset from "@/assets/mysticlov/mysticlov-mosaic-1.png.asset.json";
import mosaicTwoAsset from "@/assets/mysticlov/mysticlov-mosaic-2.png.asset.json";
import mosaicThreeAsset from "@/assets/mysticlov/mysticlov-mosaic-3.png.asset.json";
import mosaicFourAsset from "@/assets/mysticlov/mysticlov-mosaic-4.png.asset.json";
import mosaicFiveAsset from "@/assets/mysticlov/mysticlov-mosaic-5.png.asset.json";
import mosaicSixAsset from "@/assets/mysticlov/mysticlov-mosaic-6.png.asset.json";

const BG = "#FAF8F4";
const INK = "#1A1A1A";
const MUTED = "#5F5E5A";

const heroSolo = heroSoloAsset.url;
const groupShot = groupShotAsset.url;
const closingJoy = closingJoyAsset.url;

const lifestyleImages: LifestyleImage[] = [
  { src: mosaicOneAsset.url, alt: "MysticLov éditorial" },
  { src: groupShot, alt: "La communauté MysticLov", wide: true, objectPosition: "65% center" },
  { src: mosaicTwoAsset.url, alt: "MysticLov éditorial" },
  { src: mosaicThreeAsset.url, alt: "MysticLov éditorial" },
  { src: mosaicFourAsset.url, alt: "MysticLov éditorial", wide: true },
  { src: mosaicFiveAsset.url, alt: "MysticLov éditorial" },
  { src: mosaicSixAsset.url, alt: "MysticLov éditorial" },
];

const filters: FilterOption[] = [
  { key: "tshirts", label: "T-shirts", match: (p) => p.subcategory === "tshirt" },
  { key: "sweats", label: "Sweats", match: (p) => p.subcategory === "hoodie" || p.subcategory === "crewneck" },
];

const typeLabel = (p: Product) =>
  p.subcategory === "tshirt" ? "T-shirt" : p.subcategory === "hoodie" ? "Hoodie" : "Sweat";

const scrollToGrid = () => {
  document.getElementById("mysticlov-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const MysticLovEditorial = () => {
  return (
    <div style={{ backgroundColor: BG, scrollBehavior: "smooth" }} className="min-h-screen">
      <SEO
        title="MysticLov — Wear your intention. | LOVCICOV Paris"
        description="MysticLov par LOVCICOV Paris : talismans contemporains brodés main. Chaque pièce porte un signe, une intention."
        path="/mysticlov"
      />
      <Navbar />

      <main className="pt-[73px] overflow-hidden">
        {/* HERO */}
        <section className="relative w-screen h-[75svh] md:h-[95vh] overflow-hidden" style={{ backgroundColor: BG }}>
          <img
            src={heroSolo}
            alt="MysticLov par LOVCICOV Paris"
            className="absolute inset-0 w-full h-full object-cover object-top"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.9) 100%)" }}
          />
          <div
            className="absolute inset-x-0 bottom-3 z-10 md:bottom-6"
            style={{ paddingInline: "clamp(24px, 5vw, 72px)" }}
          >
            <div className="max-w-[19rem] md:max-w-3xl">
              <p
                className="mb-1 text-[8px] md:text-[11px] uppercase"
                style={{ color: "rgba(255,255,255,0.82)", letterSpacing: "0.22em", fontFamily: "Instrument Sans, system-ui, sans-serif" }}
              >
                MysticLov
              </p>
              <p
                className="mb-2 md:mb-4 italic"
                style={{
                  fontFamily: "Instrument Sans, system-ui, sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(13px, 2vw, 22px)",
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                Love is my frequency.
              </p>
              <button
                type="button"
                onClick={scrollToGrid}
                className="mt-2 md:mt-6 inline-flex items-center justify-center px-3.5 py-1.5 md:px-7 md:py-3 text-[8px] md:text-[11px] uppercase transition-colors duration-300"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#000000",
                  letterSpacing: "0.2em",
                  fontFamily: "Instrument Sans, system-ui, sans-serif",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F0F0F0"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#FFFFFF"; }}
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
            MYSTICLOV
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
            Des talismans contemporains, portés comme une intention.
          </p>
        </section>

        {/* PRODUCT GRID + STICKY FILTERS + QUOTE */}
        <EditorialCollectionGrid
          anchorId="mysticlov-grid"
          products={mysticProducts}
          lifestyleImages={lifestyleImages}
          filters={filters}
          quote="Love is my frequency."
          colors={{ bg: BG, ink: INK, muted: MUTED }}
          typeLabel={typeLabel}
        />

        {/* BRIDGE — closing image + CTA to StoneLov */}
        <section style={{ backgroundColor: BG }}>
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 9", backgroundColor: BG }}>
            <img
              src={closingJoy}
              alt="MysticLov par LOVCICOV Paris"
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
                to="/stonelov"
                onMouseEnter={() => prefetchRoute("/stonelov")}
                className="inline-flex items-center justify-center px-3.5 py-1.5 md:px-7 md:py-3 text-[8px] md:text-[11px] uppercase transition-colors duration-300"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#000000",
                  letterSpacing: "0.2em",
                  fontFamily: "Instrument Sans, system-ui, sans-serif",
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#F0F0F0"; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#FFFFFF"; }}
              >
                Découvrir StoneLov
              </Link>
            </div>
          </div>
        </section>

        {/* TRUST BAND */}
        <EditorialTrustBand bg={BG} ink={INK} />
      </main>

      <JourneyContinuation current="mystic" />
      <Footer />
    </div>
  );
};

export default MysticLovEditorial;
