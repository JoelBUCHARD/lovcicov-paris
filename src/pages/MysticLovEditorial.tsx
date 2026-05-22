import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroSolo from "@/assets/mysticlov/hero-solo.png";
import seatedRooftop from "@/assets/mysticlov/seated-rooftop.png";
import groupShot from "@/assets/mysticlov/group.png";
import closingJoy from "@/assets/mysticlov/closing-joy.png";
import duoRooftop from "@/assets/mysticlov/duo-rooftop.png";
import greenTee from "@/assets/mysticlov/green-tee.png";
import hoodieRooftop from "@/assets/mysticlov/hoodie-rooftop.png";
import rooftopMadonna from "@/assets/mysticlov/rooftop-madonna.png";
import hoodieMadonnaParis from "@/assets/mysticlov/hoodie-madonna-paris.png";
import rooftopArmsOpen from "@/assets/mysticlov/rooftop-arms-open.png";

const BG = "#FFF5F5";
const ACCENT = "#E66060";
const ACCENT_HOVER = "#C94A4A";
const INK = "#1A1A1A";
const MUTED = "#5F5E5A";
const SOFT = "#888780";
const SEP = "#F5D0D0";

const MysticLovEditorial = () => {
  return (
    <div style={{ backgroundColor: BG, scrollBehavior: "smooth" }} className="min-h-screen">
      <Navbar />
      <div className="pt-[73px]">
        {/* STICKY HEADER STRIP */}
        <header
          className="sticky top-[73px] left-0 right-0 z-40 flex items-center justify-between px-6"
          style={{
            backgroundColor: INK,
            height: 48,
            borderBottom: `3px solid ${ACCENT}`,
          }}
        >
          <Link
            to="/mysticlov"
            className="uppercase"
            style={{ color: ACCENT, fontSize: 9, letterSpacing: "0.18em" }}
          >
            MYSTICLOV
          </Link>
          <div className="hidden md:block flex-1 mx-8 h-px" style={{ backgroundColor: ACCENT, opacity: 0.5 }} />
          <Link
            to="/mysticlov/shop"
            className="uppercase px-4 py-2 transition-colors"
            style={{
              backgroundColor: ACCENT,
              color: "#FFFFFF",
              fontSize: 10,
              letterSpacing: "0.15em",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = ACCENT_HOVER)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = ACCENT)}
          >
            REJOINDRE LE CERCLE →
          </Link>
        </header>

        {/* BLOCK 1 — HERO */}
        <section className="relative w-screen h-screen overflow-hidden my-5">
          <img
            src={heroSolo}
            alt="MysticLov hero"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center 55%" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.9) 100%)" }}
          />
          <div className="absolute bottom-0 left-0 right-0 px-8 md:px-12 pb-12 md:pb-16 z-10">
            <p className="uppercase mb-3" style={{ color: ACCENT, fontSize: 9, letterSpacing: "0.18em" }}>
              MYSTICLOV
            </p>
            <h1
              className="text-white mb-3"
              style={{ fontFamily: "Arial, sans-serif", fontSize: 36, fontWeight: 200, fontStyle: "italic", lineHeight: 1.2 }}
            >
              Love is my frequency.
            </h1>
            <p style={{ fontFamily: "Arial, sans-serif", fontSize: 11, fontStyle: "italic", color: "#FFFFFF", opacity: 0.85 }}>
              A frequency to wear.
            </p>
            <Link
              to="/mysticlov/shop"
              className="inline-block mt-6 uppercase transition-colors"
              style={{
                backgroundColor: ACCENT,
                color: "#FFFFFF",
                padding: "12px 28px",
                fontSize: 10,
                letterSpacing: "0.15em",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = ACCENT_HOVER)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = ACCENT)}
            >
              DÉCOUVRIR LA COLLECTION →
            </Link>
          </div>
        </section>

        {/* BLOCK 2 — UNIVERSE INTRO */}
        <section className="w-full px-6 md:px-10 py-8 md:py-10" style={{ backgroundColor: BG }}>
          <div className="max-w-[640px] mx-auto text-center">
            <p className="uppercase mb-4" style={{ color: ACCENT, fontSize: 9, letterSpacing: "0.18em" }}>
              MYSTICLOV
            </p>
            <p
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: 13,
                color: MUTED,
                maxWidth: 600,
                margin: "0 auto",
                lineHeight: 1.8,
              }}
            >
              MYSTICLOV mélange spiritualité contemporaine, intuition et esthétique émotionnelle.
              Des créations inspirées par les fréquences, les symboles et l'invisible.
              Chaque pièce devient un mantra, une vibration, une énergie à porter.
            </p>
            <div className="my-6 h-px mx-auto" style={{ width: 60, backgroundColor: SEP }} />
            <p
              className="uppercase"
              style={{
                color: ACCENT,
                fontSize: 10,
                letterSpacing: "0.18em",
                lineHeight: 1.9,
              }}
            >
              Fréquence · Intuition · Énergie · Spiritualité · Rituel · Vibration · Mystère · Symboles · Protection · Guidance · Sacré · Oracle · Éveil
            </p>
          </div>
        </section>

        {/* BLOCK 3 — SPLIT 50/50 */}
        <section className="flex flex-col md:flex-row w-full my-5" style={{ minHeight: "100vh" }}>
          <div className="w-full md:w-1/2 h-[70vh] md:h-auto">
            <img src={seatedRooftop} alt="L'histoire MysticLov" className="w-full h-full object-cover" style={{ objectPosition: "center 70%" }} />
          </div>
          <div
            className="w-full md:w-1/2 flex items-center justify-center px-10 py-20 md:py-0"
            style={{ backgroundColor: BG }}
          >
            <div className="max-w-md text-center">
              <p className="uppercase mb-6" style={{ color: ACCENT, fontSize: 9, letterSpacing: "0.18em" }}>
                L'HISTOIRE
              </p>
              <h2
                style={{ fontFamily: "Arial, sans-serif", fontSize: 28, fontWeight: 300, color: INK, marginBottom: 24 }}
              >
                Portez ce en quoi vous croyez.
              </h2>
              <p style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: MUTED, lineHeight: 1.8 }}>
                Vierge Marie. Tarot. Symboles sacrés. Fréquences invisibles.
                <br />
                MysticLov ne se cache pas. MysticLov s'assume.
              </p>
              <div className="my-8 h-px mx-auto" style={{ width: 60, backgroundColor: SEP }} />
              <p style={{ fontFamily: "Arial, sans-serif", fontSize: 11, fontStyle: "italic", color: SOFT }}>
                More than fashion.
              </p>
            </div>
          </div>
        </section>

        {/* BLOCK 4 — FULL WIDTH IMAGE WITH SIDE TEXT */}
        <section className="relative w-screen overflow-hidden my-5" style={{ height: "100vh", backgroundColor: BG }}>
          <img
            src={groupShot}
            alt="La communauté MysticLov"
            className="absolute inset-0 w-full h-full object-contain md:object-cover"
            style={{ objectPosition: "right center" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 45%, transparent 70%)" }}
          />
          <div className="absolute inset-y-0 left-0 flex items-center" style={{ paddingLeft: 60, paddingRight: 24 }}>
            <div className="max-w-md">
              <p className="uppercase mb-5" style={{ color: ACCENT, fontSize: 9, letterSpacing: "0.18em" }}>
                LE CERCLE
              </p>
              <h2
                className="text-white mb-5"
                style={{ fontFamily: "Arial, sans-serif", fontSize: 30, fontWeight: 200, fontStyle: "italic" }}
              >
                Wear your energy.
              </h2>
              <p className="text-white" style={{ fontFamily: "Arial, sans-serif", fontSize: 12, opacity: 0.8, lineHeight: 1.8 }}>
                MysticLov s'adresse à celles et ceux qui assument leurs symboles.
                Qui savent ce qu'ils portent et pourquoi.
              </p>
            </div>
          </div>
        </section>

        {/* BLOCK 5 — MOSAIQUE 6 IMAGES */}
        <section className="w-full my-5" style={{ backgroundColor: BG }}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[duoRooftop, greenTee, hoodieRooftop, rooftopArmsOpen, hoodieMadonnaParis, rooftopMadonna].map((img, i) => (
              <div key={i} className="relative w-full overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
                <img
                  src={img}
                  alt={`MysticLov communauté ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: i === 1 ? "center 80%" : "center center" }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* BLOCK 6 — CLOSING FULL SCREEN */}
        <section className="relative w-screen h-screen overflow-hidden my-5">
          <img
            src={closingJoy}
            alt="Very Slow Fashion"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center text-center px-6 z-10">
            <h2
              className="text-white mb-3"
              style={{ fontFamily: "Arial, sans-serif", fontSize: 40, fontWeight: 200, fontStyle: "italic", letterSpacing: "0.03em" }}
            >
              More than fashion.
            </h2>
            <p
              className="mb-8"
              style={{ fontFamily: "Arial, sans-serif", fontSize: 11, fontStyle: "italic", color: "#FFFFFF", opacity: 0.85 }}
            >
              Wear your energy.
            </p>
            <Link
              to="/mysticlov/shop"
              className="uppercase transition-colors"
              style={{
                backgroundColor: ACCENT,
                color: "#FFFFFF",
                padding: "14px 32px",
                fontSize: 11,
                letterSpacing: "0.15em",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = ACCENT_HOVER)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = ACCENT)}
            >
              DÉCOUVRIR LA COLLECTION
            </Link>
          </div>
        </section>

        {/* BOTTOM SECTION */}
        <section className="py-12 px-6" style={{ backgroundColor: BG }}>
          <div className="w-full h-px mb-8" style={{ backgroundColor: SEP }} />
          <p
            className="text-center uppercase mb-4"
            style={{ color: ACCENT, fontSize: 10, letterSpacing: "0.18em" }}
          >
            MYSTICLOV · Broderies dorées · Pièces uniques · Paris
          </p>
          <div className="flex justify-center gap-6 uppercase" style={{ fontSize: 11, letterSpacing: "0.15em" }}>
            <Link to="/powerlov" style={{ color: SOFT }}>
              PowerLov
            </Link>
            <span style={{ color: SOFT }}>·</span>
            <Link to="/stonelov" style={{ color: SOFT }}>
              StoneLov
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default MysticLovEditorial;
