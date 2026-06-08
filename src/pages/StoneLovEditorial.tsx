import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import hero from "@/assets/stonelov/hero.png";
import talisman from "@/assets/stonelov/talisman.png";
import savoirfaire from "@/assets/stonelov/savoirfaire.png";
import closing from "@/assets/stonelov/closing.png";
import bookDesk from "@/assets/stonelov/book-lalune-desk.png.asset.json";
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
          <Link to="/stonelov" className="text-[11px] uppercase" style={{ color: INK, letterSpacing: "0.22em", fontFamily: "Instrument Sans, system-ui, sans-serif" }}>
            StoneLov
          </Link>

          <div className="hidden md:block flex-1 mx-8 h-px" style={{ backgroundColor: BORDER }} />
          <Link
            to="/le-cercle"
            className="uppercase px-7 py-3 transition-colors text-[11px]"
            style={{ backgroundColor: TERRA, color: "#FFFFFF", letterSpacing: "0.2em", fontFamily: "Instrument Sans, system-ui, sans-serif" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#A55A35")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = TERRA)}
          >
            Rejoindre Le Cercle
          </Link>
        </header>

        {/* BLOCK 1 — HERO */}
        <section className="relative w-screen h-[58svh] md:h-screen overflow-hidden" style={{ backgroundColor: BG }}>
          <img
            src={hero}
            alt="StoneLov hero"
            className="absolute inset-0 w-full h-full object-cover object-top md:object-center md:scale-[1.2]"
            style={{ transformOrigin: "center 42%" }}
          />
          <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 pb-5 md:pb-8">
            <p className="mb-2 md:mb-5 text-[8px] md:text-[11px] uppercase inline-block px-2 py-0.5 rounded-sm" style={{ color: TERRA, letterSpacing: "0.22em", backgroundColor: "rgba(255,255,255,0.4)", fontFamily: "Instrument Sans, system-ui, sans-serif" }}>
              StoneLov
            </p>

            <h1
              className="mb-2 md:mb-4 italic"
              style={{ color: INK, fontFamily: "Instrument Sans, system-ui, sans-serif", fontWeight: 300, lineHeight: 1.1, fontSize: "clamp(13px, 2vw, 22px)", textShadow: "0 1px 6px rgba(255,255,255,0.6)" }}
            >
              Rooted in the earth.
            </h1>
            <Link
              to="/collections/bijoux"
              className="inline-block mt-2 md:mt-6 uppercase transition-colors text-[8px] md:text-[11px] px-3.5 py-1.5 md:px-7 md:py-3"
              style={{ backgroundColor: TERRA, color: "#FFFFFF", letterSpacing: "0.2em", fontFamily: "Instrument Sans, system-ui, sans-serif" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#A55A35")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = TERRA)}
            >
              Découvrir la collection
            </Link>
          </div>
        </section>


        {/* DESCRIPTIF — harmonisé PowerLov / MysticLov */}
        <section className="w-full px-6 md:px-10 py-8 md:py-16" style={{ backgroundColor: BG }}>
          <div className="max-w-[640px] mx-auto text-center">
            <p
              className="mb-5 text-[11px] uppercase"
              style={{ color: "rgba(26,26,26,0.48)", letterSpacing: "0.22em", fontFamily: "Instrument Sans, system-ui, sans-serif" }}
            >
              La collection
            </p>
            <div
              style={{
                fontFamily: "Instrument Sans, system-ui, sans-serif",
                fontSize: 15,
                color: "rgba(26,26,26,0.78)",
                maxWidth: 600,
                margin: "0 auto",
                lineHeight: 1.9,
              }}
              className="space-y-6 text-center"
            >
              <p>
                StoneLov puise son inspiration dans la pierre, la terre et les matières brutes.
                Une vision organique et intemporelle du luxe, où l'ancrage devient élégance et où
                la matière protège autant qu'elle révèle.
              </p>
              <p>
                Chaque collier StoneLov est assemblé à la main. Chaque pierre est sélectionnée une
                à une, pour sa qualité, son énergie, sa singularité.
              </p>
              <p>
                Aucune pièce n'est identique. Aucune n'est anodine.
              </p>
              <p>
                Ici, on ne crée pas des accessoires. On crée des objets qui vous accompagnent.
              </p>
              <p>
                StoneLov mélange artisanat précieux, énergie minérale et élégance instinctive dans
                une collection de bijoux conçus pour celles et ceux qui cherchent du sens dans la
                matière, et de la profondeur dans le détail.
              </p>
            </div>
          </div>
        </section>

        {/* L'UNIVERS DES PIERRES */}
        <StoneUniverse />

        {/* BLOCK 2 — FULL WIDTH TALISMAN */}
        <section className="relative w-screen overflow-hidden h-[60vh] md:h-[80vh]" style={{ backgroundColor: BG }}>
          <img src={talisman} alt="Talisman" className="absolute inset-0 w-full h-full object-cover md:scale-[1.08]" style={{ objectPosition: "center 25%", transformOrigin: "center 25%" }} />
        </section>

        {/* PHOTO GRID */}
        <StoneLovGrid />

        {/* SAVOIR-FAIRE — image only */}
        <section className="relative w-screen overflow-hidden h-[50vh] md:h-[70vh]" style={{ backgroundColor: BG, marginTop: 20 }}>
          <img src={savoirfaire} alt="Savoir-faire StoneLov" className="absolute inset-0 w-full h-full object-cover md:hidden" style={{ objectPosition: "center center" }} />
          <img src={bookDesk.url} alt="Savoir-faire StoneLov" className="absolute inset-0 w-full h-full object-cover hidden md:block" style={{ objectPosition: "center center" }} />
        </section>

        {/* BLOCK 4 — CLOSING */}
        <div style={{ height: 20, backgroundColor: BG }} />
        <section className="relative w-screen h-auto md:h-screen overflow-hidden" style={{ backgroundColor: BG }}>
          <img src={closing} alt="Very Slow Fashion" className="block w-full h-auto md:absolute md:inset-0 md:h-full md:object-cover" style={{ objectPosition: "center 30%" }} />

          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center text-center px-6 z-10 pb-10 md:pb-20">
            <Link
              to="/collections/bijoux"
              className="uppercase transition-colors px-3.5 py-1.5 md:px-7 md:py-3 text-[8px] md:text-[11px]"
              style={{ backgroundColor: TERRA, color: "#FFFFFF", letterSpacing: "0.2em", fontFamily: "Instrument Sans, system-ui, sans-serif" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#A55A35")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = TERRA)}
            >
              Découvrir la collection
            </Link>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
};

export default StoneLovEditorial;
