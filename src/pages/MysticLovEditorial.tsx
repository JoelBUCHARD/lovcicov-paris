import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import heroSoloAsset from "@/assets/mysticlov/mysticlov-hero-cafe-paris.png.asset.json";
const heroSolo = heroSoloAsset.url;

import groupShotAsset from "@/assets/mysticlov/mysticlov-block4-paris-street.png.asset.json";
const groupShot = groupShotAsset.url;
import closingJoyAsset from "@/assets/mysticlov/mysticlov-closing-cafedeflore.png.asset.json";
const closingJoy = closingJoyAsset.url;
import mosaicOneAsset from "@/assets/mysticlov/mysticlov-mosaic-1.png.asset.json";
const mosaicOne = mosaicOneAsset.url;
import mosaicTwoAsset from "@/assets/mysticlov/mysticlov-mosaic-2.png.asset.json";
const mosaicTwo = mosaicTwoAsset.url;
import mosaicThreeAsset from "@/assets/mysticlov/mysticlov-mosaic-3.png.asset.json";
const mosaicThree = mosaicThreeAsset.url;
import mosaicFourAsset from "@/assets/mysticlov/mysticlov-mosaic-4.png.asset.json";
const mosaicFour = mosaicFourAsset.url;
import mosaicFiveAsset from "@/assets/mysticlov/mysticlov-mosaic-5.png.asset.json";
const mosaicFive = mosaicFiveAsset.url;
import mosaicSixAsset from "@/assets/mysticlov/mysticlov-mosaic-6.png.asset.json";
const mosaicSix = mosaicSixAsset.url;

const BG = "#FAF8F4";
const ACCENT = "#E66060";
const ACCENT_HOVER = "#C94A4A";
const INK = "#1A1A1A";
const MUTED = "#5F5E5A";
const SOFT = "#888780";
const SEP = "#F5D0D0";

const MysticLovEditorial = () => {
  return (
    <div style={{ backgroundColor: BG, scrollBehavior: "smooth" }} className="min-h-screen">
      <SEO
        title="MysticLov — Wear your intention. | LOVCICOV Paris"
        description="MysticLov par LOVCICOV Paris : talismans contemporains brodés main. Chaque pièce porte un signe, une intention."
        path="/mysticlov"
      />
      <Navbar />
      <div className="pt-[73px]">


        {/* BLOCK 1 — HERO */}
        <section className="relative w-screen h-[58svh] md:h-screen overflow-hidden mt-0 mb-5 md:my-5" style={{ backgroundColor: BG }}>
          <img
            src={heroSolo}
            alt="MysticLov hero"
            className="absolute inset-0 w-full h-full object-cover object-top"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.9) 100%)" }}
          />
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-5 md:pb-8 z-10">
            <p className="mb-2 md:mb-5 text-[8px] md:text-[11px] uppercase" style={{ color: "#FFFFFF", letterSpacing: "0.22em", fontFamily: "Instrument Sans, system-ui, sans-serif" }}>
              MysticLov
            </p>

            <h1
              className="text-white mb-2 md:mb-4 italic"
              style={{ fontFamily: "Instrument Sans, system-ui, sans-serif", fontWeight: 300, lineHeight: 1.1, fontSize: "clamp(13px, 2vw, 22px)" }}
            >
              Love is my frequency.
            </h1>
            <Link
              to="/mysticlov/shop"
              className="inline-block mt-2 md:mt-6 uppercase transition-colors text-[8px] md:text-[11px] px-3.5 py-1.5 md:px-7 md:py-3"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#000000",
                letterSpacing: "0.2em",
                fontFamily: "Instrument Sans, system-ui, sans-serif",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F0F0F0")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}
            >
              Découvrir la collection
            </Link>
          </div>
        </section>



        {/* BLOCK 2 — UNIVERSE INTRO */}
        <section className="w-full px-6 md:px-10 py-8 md:py-16" style={{ backgroundColor: BG }}>
          <div className="max-w-[640px] mx-auto text-center">
            <p
              className="mb-5 text-[11px] uppercase"
              style={{ color: "rgba(26,26,26,0.48)", letterSpacing: "0.22em", fontFamily: "Instrument Sans, system-ui, sans-serif" }}
            >
              La collection
            </p>
            <p
              style={{
                fontFamily: "Instrument Sans, system-ui, sans-serif",
                fontSize: 15,
                color: "rgba(26,26,26,0.78)",
                maxWidth: 600,
                margin: "0 auto",
                lineHeight: 1.9,
              }}
            >
              MysticLov explore une esthétique instinctive, spirituelle et contemporaine.
              <br /><br />
              Inspirée par les symboles, l'énergie et les rituels modernes, la collection mélange
              mystère, émotion et élégance minimaliste à travers des pièces pensées comme des
              talismans contemporains.
            </p>
          </div>
        </section>



        {/* BLOCK 4 — FULL WIDTH IMAGE */}
        <section className="relative w-full overflow-hidden mt-2 mb-1 h-[70vh] md:h-screen" style={{ backgroundColor: BG }}>
          <img
            src={groupShot}
            alt="La communauté MysticLov"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "65% center" }}
            loading="lazy"
            decoding="async"
          />
        </section>


        {/* BLOCK 5 — MOSAIQUE 6 IMAGES */}
        <section className="w-full mt-0 mb-0 md:my-5" style={{ backgroundColor: BG }}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { img: mosaicOne, link: "/product/t-shirt-mysticlov", pos: "center center" },
              { img: mosaicTwo, link: "/product/t-shirt-mysticlov", pos: "center center" },
              { img: mosaicThree, link: "/product/t-shirt-mysticlov", pos: "center center" },
              { img: mosaicFour, link: "/product/t-shirt-mysticlov", pos: "center center" },
              { img: mosaicFive, link: "/product/t-shirt-mysticlov", pos: "center center" },
              { img: mosaicSix, link: "/product/t-shirt-mysticlov", pos: "center center" },
            ].map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className="relative w-full overflow-hidden block group"
                style={{ aspectRatio: "1 / 1" }}
              >
                <img
                  src={item.img}
                  alt={`MysticLov ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
                  style={{ objectPosition: item.pos }}
                  loading="lazy"
                  decoding="async"
                />
              </Link>
            ))}
          </div>
        </section>



        {/* BLOCK 6 — CLOSING FULL SCREEN */}
        <section className="relative w-screen h-auto md:h-screen overflow-hidden mt-2 mb-0 md:my-5" style={{ backgroundColor: BG }}>
          <img
            src={closingJoy}
            alt="Very Slow Fashion"
            className="block w-full h-auto md:absolute md:inset-0 md:h-full md:object-cover"
            loading="lazy"
            decoding="async"
          />


          <div className="absolute bottom-6 md:bottom-16 left-0 right-0 flex flex-col items-center text-center px-6 z-10">
            <Link
              to="/mysticlov/shop"
              className="uppercase transition-colors px-3.5 py-1.5 md:px-7 md:py-3 text-[8px] md:text-[11px]"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#000000",
                letterSpacing: "0.2em",
                fontFamily: "Instrument Sans, system-ui, sans-serif",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F0F0F0")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}
            >
              Découvrir la collection
            </Link>
          </div>
        </section>

      </div>
      <JourneyContinuation current="mystic" />
      <Footer />
    </div>
  );
};

export default MysticLovEditorial;
