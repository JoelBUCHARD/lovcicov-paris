import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import hero from "@/assets/stonelov/hero.png";
import talisman from "@/assets/stonelov/talisman.png";
import savoirfaire from "@/assets/stonelov/savoirfaire.png";
import closing from "@/assets/stonelov/closing.png";
import StoneUniverse from "@/components/StoneUniverse";
import StoneLovGrid from "@/components/StoneLovGrid";

const BG = "#FDF5EF";
const INK = "#1A1A1A";
const WARM = "#5F5E5A";
const TERRA = "#C4714A";
const BORDER = "#E8D8C8";


const StoneLovEditorial = () => {
  return (
    <div style={{ backgroundColor: BG, scrollBehavior: "smooth" }} className="min-h-screen">
      <Navbar />
      <div className="pt-[73px]">
        {/* STICKY HEADER */}
        <header
          className="sticky top-[73px] left-0 right-0 z-40 flex items-center justify-between px-6"
          style={{ backgroundColor: BG, height: 48, borderBottom: `0.5px solid ${BORDER}` }}
        >
          <Link to="/stonelov" className="text-[10px] uppercase" style={{ color: INK, letterSpacing: "0.2em" }}>
            STONELOV
          </Link>
          <div className="hidden md:block flex-1 mx-8 h-px" style={{ backgroundColor: BORDER }} />
          <Link
            to="/collections/bijoux"
            className="uppercase px-4 py-2 transition-colors"
            style={{ backgroundColor: TERRA, color: "#FFFFFF", fontSize: 10, letterSpacing: "0.15em" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#A55A35")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = TERRA)}
          >
            DÉCOUVRIR LA COLLECTION →
          </Link>
        </header>

        {/* BLOCK 1 — HERO */}
        <section className="relative w-screen h-auto md:h-screen overflow-hidden" style={{ backgroundColor: BG }}>
          <img
            src={hero}
            alt="StoneLov hero"
            className="block w-full h-auto md:absolute md:inset-0 md:h-full md:object-cover md:scale-[1.2]"
            style={{ objectPosition: "center 42%", transformOrigin: "center 42%" }}
          />
          <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 pb-8 md:pb-16">
            <p className="uppercase mb-3 text-[8px] md:text-[9px] inline-block px-2 py-0.5 rounded-sm" style={{ color: TERRA, letterSpacing: "0.2em", backgroundColor: "rgba(255,255,255,0.4)" }}>
              STONELOV
            </p>
            <h1
              className="mb-3 text-[18px] md:text-[30px]"
              style={{ color: INK, fontFamily: "Arial, sans-serif", fontWeight: 200, fontStyle: "italic", lineHeight: 1.2, textShadow: "0 1px 6px rgba(255,255,255,0.6)" }}
            >
              Rooted in the earth.
            </h1>
            <Link
              to="/collections/bijoux"
              className="inline-block mt-4 uppercase transition-colors text-[7px] md:text-[9px] px-3 py-1.5 md:px-6 md:py-2.5"
              style={{ backgroundColor: TERRA, color: "#FFFFFF", letterSpacing: "0.15em" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#A55A35")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = TERRA)}
            >
              DÉCOUVRIR LA COLLECTION →
            </Link>
          </div>
        </section>


        {/* L'UNIVERS DES PIERRES */}
        <StoneUniverse />

        {/* BLOCK 2 — FULL WIDTH TALISMAN */}
        <section className="relative w-screen overflow-hidden h-[60vh] md:h-[80vh]" style={{ backgroundColor: BG }}>
          <img src={talisman} alt="Talisman" className="absolute inset-0 w-full h-full object-cover md:scale-[1.08]" style={{ objectPosition: "center 25%", transformOrigin: "center 25%" }} />

          <div
            className="absolute inset-0 hidden md:block"
            style={{ background: "linear-gradient(to bottom, rgba(26,26,26,0) 40%, rgba(26,26,26,0.5) 100%)" }}
          />
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center text-center px-6 pb-6 md:pb-10">
            <p className="text-white text-[11px] md:text-[13px]" style={{ fontFamily: "Arial, sans-serif", opacity: 0.85, maxWidth: 480, lineHeight: 1.8, textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
              Chaque pierre est choisie pour son énergie, sa couleur, son histoire. Chez StoneLov, on ne crée pas des accessoires. On crée des objets qui vous accompagnent.
            </p>
          </div>
        </section>

        {/* PHOTO GRID */}
        <StoneLovGrid />

        {/* BLOCK 3 — SPLIT */}
        <div style={{ height: 20, backgroundColor: BG }} />
        <section className="flex flex-col md:flex-row w-full md:min-h-screen md:pt-5">
          <div className="w-full md:w-1/2 flex items-center justify-center px-10 py-8 md:py-0 order-2 md:order-1" style={{ backgroundColor: "#FDF5EF" }}>
            <div className="max-w-md">
              <p className="uppercase mb-6" style={{ color: TERRA, fontSize: 9, letterSpacing: "0.2em" }}>
                LE SAVOIR-FAIRE
              </p>
              <p style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: WARM, lineHeight: 1.8 }}>
                Chaque collier StoneLov est assemblé à la main. Nous sélectionnons chaque pierre une à une, pour sa qualité, son énergie et sa singularité. Aucune pièce n'est identique.
              </p>
              <div className="h-px" style={{ width: 40, backgroundColor: TERRA, margin: "24px 0" }} />
              <p className="text-[11px]" style={{ color: TERRA, letterSpacing: "0.1em" }}>
                Pierres naturelles · Monture dorée · Paris
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-[70vh] md:h-auto order-1 md:order-2">
            <img src={savoirfaire} alt="Savoir-faire" className="w-full h-full object-cover" />
          </div>
        </section>

        {/* BLOCK 4 — CLOSING */}
        <div style={{ height: 20, backgroundColor: BG }} />
        <section className="relative w-screen h-auto md:h-screen overflow-hidden" style={{ backgroundColor: BG }}>
          <img src={closing} alt="Very Slow Fashion" className="block w-full h-auto md:absolute md:inset-0 md:h-full md:object-cover" style={{ objectPosition: "center 30%" }} />

          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center text-center px-6 z-10 pb-10 md:pb-20">
            <h2
              className="mb-5 text-[22px] md:text-[30px]"
              style={{ color: INK, fontFamily: "Arial, sans-serif", fontWeight: 200, fontStyle: "italic", letterSpacing: "0.03em" }}
            >
              Protected. Guided. Unstoppable.
            </h2>
            <Link
              to="/collections/bijoux"
              className="uppercase transition-colors px-4 py-2 md:px-6 md:py-3"
              style={{ backgroundColor: TERRA, color: "#FFFFFF", fontSize: 7, letterSpacing: "0.15em" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#A55A35")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = TERRA)}
            >
              DÉCOUVRIR LA COLLECTION
            </Link>
          </div>
        </section>

        {/* BOTTOM */}
        <section style={{ backgroundColor: BG, borderTop: `1px solid ${BORDER}`, padding: 40 }}>
          <p className="text-center text-[9px] uppercase mb-4" style={{ color: "#B4A99A", letterSpacing: "0.2em" }}>
            STONELOV · Pierres naturelles · Pièces uniques · Paris
          </p>
          <div className="flex justify-center gap-6 text-[11px] uppercase" style={{ letterSpacing: "0.15em" }}>
            <Link to="/powerlov" style={{ color: WARM, opacity: 0.8 }} onMouseEnter={(e) => (e.currentTarget.style.color = TERRA)} onMouseLeave={(e) => (e.currentTarget.style.color = WARM)}>
              PowerLov
            </Link>
            <span style={{ color: WARM, opacity: 0.4 }}>·</span>
            <Link to="/mysticlov" style={{ color: WARM, opacity: 0.8 }} onMouseEnter={(e) => (e.currentTarget.style.color = TERRA)} onMouseLeave={(e) => (e.currentTarget.style.color = WARM)}>
              MysticLov
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default StoneLovEditorial;
