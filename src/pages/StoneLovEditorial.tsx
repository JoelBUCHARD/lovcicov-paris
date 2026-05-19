import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import hero from "@/assets/stonelov/hero.png";
import talisman from "@/assets/stonelov/talisman.png";
import savoirfaire from "@/assets/stonelov/savoirfaire.png";
import closing from "@/assets/stonelov/closing.png";
import StoneUniverse from "@/components/StoneUniverse";

const BG = "#FAF7F2";
const INK = "#1A1A1A";
const WARM = "#5F5E5A";
const TERRA = "#C4714A";
const BORDER = "#E8E4DC";

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
            className="text-white text-[10px] uppercase transition-colors"
            style={{ backgroundColor: TERRA, padding: "10px 20px", letterSpacing: "0.15em" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#A55A35")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = TERRA)}
          >
            VOIR TOUTE LA COLLECTION →
          </Link>
        </header>

        {/* BLOCK 1 — HERO */}
        <section className="relative w-screen h-screen overflow-hidden">
          <img
            src={hero}
            alt="StoneLov hero"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center 65%", transform: "scale(1.45)", transformOrigin: "center 65%" }}
          />
          <div className="absolute bottom-0 left-0 z-10" style={{ padding: 48, paddingBottom: 20 }}>
            <div className="inline-block" style={{ backgroundColor: "rgba(250,247,242,0.6)", padding: "4px 10px", borderRadius: 1, marginBottom: 8 }}>
              <p className="text-[9px] uppercase" style={{ color: TERRA, letterSpacing: "0.25em", fontWeight: 700 }}>
                STONELOV
              </p>
            </div>
            <h1 className="italic mb-3" style={{ color: INK, fontSize: "clamp(24px,4vw,34px)", fontWeight: 300, lineHeight: 1.2 }}>
              Chaque pierre a une raison d'être.
            </h1>
            <Link
              to="/stonelov/shop"
              className="inline-block text-white text-[10px] uppercase transition-colors mb-4"
              style={{ backgroundColor: TERRA, padding: "10px 20px", letterSpacing: "0.15em" }}
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
        <section className="relative w-screen overflow-hidden" style={{ height: "90vh" }}>
          <img src={talisman} alt="Talisman" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center", transform: "scale(1.08)", transformOrigin: "center center" }} />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(26,26,26,0) 40%, rgba(26,26,26,0.5) 100%)" }}
          />
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center text-center px-6" style={{ paddingBottom: 60 }}>
            <p className="text-[9px] uppercase mb-3" style={{ color: TERRA, letterSpacing: "0.2em" }}>
              L'ÉNERGIE QUE VOUS PORTEZ
            </p>
            <h2 className="text-white italic mb-4" style={{ fontSize: "clamp(22px,3vw,28px)", fontWeight: 300 }}>
              Ce n'est pas un bijou. C'est un talisman.
            </h2>
            <p className="text-white text-[12px]" style={{ opacity: 0.75, maxWidth: 480, lineHeight: 1.9 }}>
              Chaque pierre est choisie pour son énergie, sa couleur, son histoire. Chez StoneLov, on ne crée pas des accessoires. On crée des objets qui vous accompagnent.
            </p>
          </div>
        </section>

        {/* BLOCK 3 — SPLIT */}
        <section className="flex flex-col md:flex-row w-full" style={{ minHeight: "100vh" }}>
          <div className="w-full md:w-1/2 flex items-center justify-center px-10 py-20 md:py-0 order-2 md:order-1" style={{ backgroundColor: "#FDF5EF" }}>
            <div className="max-w-md">
              <p className="text-[9px] uppercase mb-6" style={{ color: TERRA, letterSpacing: "0.2em" }}>
                LE SAVOIR-FAIRE
              </p>
              <h2 className="mb-6" style={{ color: INK, fontSize: 26, fontWeight: 300 }}>
                Fabriquées à la main. Pensées pour durer.
              </h2>
              <p className="text-[13px]" style={{ color: WARM, lineHeight: 1.9 }}>
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
        <section className="relative w-screen h-screen overflow-hidden">
          <img src={closing} alt="Very Slow Fashion" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center" }} />
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center text-center px-6 z-10" style={{ paddingBottom: 80 }}>
            <p className="text-[9px] uppercase mb-3" style={{ color: TERRA, letterSpacing: "0.25em" }}>
              VERY SLOW FASHION
            </p>
            <h2 className="italic" style={{ color: INK, fontSize: "clamp(28px,5vw,42px)", fontWeight: 200, letterSpacing: "0.03em" }}>
              Portez ce qui vous ressemble.
            </h2>
            <p className="text-[13px]" style={{ color: WARM, marginTop: 12 }}>
              Chaque pièce attend la femme qui lui correspond.
            </p>
            <Link
              to="/collections/bijoux"
              className="text-white text-[11px] uppercase transition-colors"
              style={{ backgroundColor: TERRA, padding: "14px 32px", letterSpacing: "0.15em", marginTop: 28 }}
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
            <Link to="/powerlov" style={{ color: WARM, opacity: 0.5 }} onMouseEnter={(e) => (e.currentTarget.style.color = TERRA)} onMouseLeave={(e) => (e.currentTarget.style.color = WARM)}>
              PowerLov
            </Link>
            <span style={{ color: WARM, opacity: 0.4 }}>·</span>
            <Link to="/mysticlov" style={{ color: WARM, opacity: 0.5 }} onMouseEnter={(e) => (e.currentTarget.style.color = TERRA)} onMouseLeave={(e) => (e.currentTarget.style.color = WARM)}>
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
