import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import hero from "@/assets/stonelov/hero.png";
import talisman from "@/assets/stonelov/talisman.png";
import savoirfaire from "@/assets/stonelov/savoirfaire.png";
import closing from "@/assets/stonelov/closing.png";
import necklacesRock from "@/assets/stonelov/necklaces-rock.jpg";
import StoneUniverse from "@/components/StoneUniverse";

// Design tokens — harmonised
const BG = "#FAF7F2";
const INK = "#1A1A1A";
const WARM = "#5F5E5A";
const MUTED = "#888780";
const TERRA = "#C4714A";
const TERRA_DARK = "#A55A35";
const BORDER = "#E8E4DC";

// Typography presets
const eyebrow = {
  fontSize: 10,
  letterSpacing: "0.25em",
  fontWeight: 600,
  textTransform: "uppercase" as const,
  color: TERRA,
};
const headline = {
  fontStyle: "italic" as const,
  fontWeight: 300,
  lineHeight: 1.2,
  letterSpacing: "0.01em",
};
const body = {
  fontSize: 13,
  lineHeight: 1.9,
  color: WARM,
  letterSpacing: "0.01em",
};
const caption = {
  fontStyle: "italic" as const,
  fontSize: 12,
  color: MUTED,
  letterSpacing: "0.08em",
};
const ctaBase = {
  backgroundColor: TERRA,
  padding: "12px 24px",
  letterSpacing: "0.2em",
  fontSize: 10,
  fontWeight: 500,
};

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
          <Link to="/stonelov" className="uppercase" style={{ ...eyebrow, color: INK }}>
            STONELOV
          </Link>
          <div className="hidden md:block flex-1 mx-8 h-px" style={{ backgroundColor: BORDER }} />
          <Link
            to="/collections/bijoux"
            className="text-white uppercase transition-colors"
            style={ctaBase}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = TERRA_DARK)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = TERRA)}
          >
            VOIR TOUTE LA COLLECTION →
          </Link>
        </header>

        {/* BLOCK 1 — HERO */}
        <section className="relative w-screen overflow-hidden" style={{ height: "90vh" }}>
          <img
            src={hero}
            alt="StoneLov hero"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center 42%", transform: "scale(1.2)", transformOrigin: "center 42%" }}
          />
          <div className="absolute bottom-0 left-0 z-10" style={{ padding: 48, paddingBottom: 32 }}>
            <div
              className="inline-block"
              style={{ backgroundColor: "rgba(250,247,242,0.7)", padding: "4px 10px", marginBottom: 12 }}
            >
              <p style={eyebrow}>STONELOV</p>
            </div>
            <h1 className="mb-5" style={{ ...headline, color: INK, fontSize: "clamp(26px,4vw,36px)" }}>
              Chaque pierre a une raison d'être.
            </h1>
            <Link
              to="/collections/bijoux"
              className="inline-block text-white uppercase transition-colors"
              style={ctaBase}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = TERRA_DARK)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = TERRA)}
            >
              DÉCOUVRIR LA COLLECTION →
            </Link>
          </div>
        </section>

        {/* L'UNIVERS DES PIERRES */}
        <StoneUniverse />

        {/* BLOCK 2 — FULL WIDTH TALISMAN */}
        <section className="relative w-screen overflow-hidden" style={{ height: "80vh" }}>
          <img
            src={talisman}
            alt="Talisman"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center 25%", transform: "scale(1.08)", transformOrigin: "center 25%" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(26,26,26,0) 40%, rgba(26,26,26,0.55) 100%)" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 flex flex-col items-center text-center px-6"
            style={{ paddingBottom: 56 }}
          >
            <h2
              className="text-white mb-5"
              style={{ ...headline, fontSize: "clamp(24px,3vw,30px)" }}
            >
              Ce n'est pas un bijou. C'est un talisman.
            </h2>
            <p className="text-white" style={{ ...body, color: "rgba(255,255,255,0.78)", maxWidth: 480 }}>
              Chaque pierre est choisie pour son énergie, sa couleur, son histoire. Chez StoneLov, on ne crée pas des accessoires. On crée des objets qui vous accompagnent.
            </p>
          </div>
        </section>

        {/* BLOCK 2.5 — NECKLACES ON ROCK */}
        <section className="w-screen">
          <div style={{ height: "80vh", width: "100%" }}>
            <img
              src={necklacesRock}
              alt="Colliers StoneLov sur pierre"
              className="w-full h-full"
              style={{ objectFit: "cover", objectPosition: "center center" }}
            />
          </div>
          <p className="text-center" style={{ ...caption, padding: "20px 0 48px" }}>
            Chaque pierre choisie à la main. Chaque pièce unique.
          </p>
        </section>

        {/* BLOCK 3 — SPLIT */}
        <section className="flex flex-col md:flex-row w-full" style={{ minHeight: "80vh" }}>
          <div
            className="w-full md:w-1/2 flex items-center justify-center px-10 py-24 md:py-0 order-2 md:order-1"
            style={{ backgroundColor: "#FDF5EF" }}
          >
            <div className="max-w-md">
              <p className="mb-6" style={eyebrow}>
                LE SAVOIR-FAIRE
              </p>
              <h2 className="mb-6" style={{ ...headline, color: INK, fontSize: "clamp(24px,3vw,30px)" }}>
                Fabriquées à la main. Pensées pour durer.
              </h2>
              <p style={body}>
                Chaque collier StoneLov est assemblé à la main. Nous sélectionnons chaque pierre une à une, pour sa qualité, son énergie et sa singularité. Aucune pièce n'est identique.
              </p>
              <div className="h-px" style={{ width: 40, backgroundColor: TERRA, margin: "28px 0" }} />
              <p style={{ ...eyebrow, letterSpacing: "0.2em", fontWeight: 500 }}>
                Pierres naturelles · Monture dorée · Paris
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-[70vh] md:h-auto order-1 md:order-2">
            <img src={savoirfaire} alt="Savoir-faire" className="w-full h-full object-cover" />
          </div>
        </section>

        {/* BLOCK 4 — CLOSING */}
        <section className="relative w-screen overflow-hidden" style={{ height: "90vh" }}>
          <img
            src={closing}
            alt="Very Slow Fashion"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center 30%" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 flex flex-col items-center text-center px-6 z-10"
            style={{ paddingBottom: 72 }}
          >
            <h2 style={{ ...headline, color: INK, fontSize: "clamp(28px,5vw,42px)", fontWeight: 200 }}>
              Portez ce qui vous ressemble.
            </h2>
            <p style={{ ...body, marginTop: 14 }}>
              Chaque pièce attend la femme qui lui correspond.
            </p>
            <Link
              to="/collections/bijoux"
              className="text-white uppercase transition-colors"
              style={{ ...ctaBase, padding: "14px 32px", marginTop: 32 }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = TERRA_DARK)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = TERRA)}
            >
              DÉCOUVRIR LA COLLECTION
            </Link>
          </div>
        </section>

        {/* BOTTOM */}
        <section style={{ backgroundColor: BG, borderTop: `1px solid ${BORDER}`, padding: "48px 40px" }}>
          <p className="text-center mb-5" style={{ ...eyebrow, color: "#B4A99A", fontWeight: 500 }}>
            STONELOV · Pierres naturelles · Pièces uniques · Paris
          </p>
          <div className="flex justify-center gap-6 uppercase" style={{ fontSize: 10, letterSpacing: "0.2em" }}>
            <Link
              to="/powerlov"
              style={{ color: WARM, opacity: 0.55 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = TERRA)}
              onMouseLeave={(e) => (e.currentTarget.style.color = WARM)}
            >
              PowerLov
            </Link>
            <span style={{ color: WARM, opacity: 0.4 }}>·</span>
            <Link
              to="/mysticlov"
              style={{ color: WARM, opacity: 0.55 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = TERRA)}
              onMouseLeave={(e) => (e.currentTarget.style.color = WARM)}
            >
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
