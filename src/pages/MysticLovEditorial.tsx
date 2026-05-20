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

const GOLD = "#C9A84C";
const ACCENT = "#E66060";
const BG = "#1A1A1A";

const MysticLovEditorial = () => {
  return (
    <div style={{ backgroundColor: BG, scrollBehavior: "smooth" }} className="min-h-screen text-white">
      <Navbar />
      <div className="pt-[73px]">
      {/* STICKY HEADER */}
      <header
        className="sticky top-[73px] left-0 right-0 z-40 flex items-center justify-between px-6"
        style={{ backgroundColor: BG, height: 48 }}
      >
        <Link to="/mysticlov" className="text-white text-[11px] uppercase" style={{ letterSpacing: "0.2em" }}>
          MYSTICLOV
        </Link>
        <div className="hidden md:block flex-1 mx-8 h-px" style={{ backgroundColor: GOLD, opacity: 0.5 }} />
        <Link
          to="/mysticlov/shop"
          className="text-black text-[10px] uppercase px-4 py-2"
          style={{ backgroundColor: "#FFFFFF", letterSpacing: "0.15em" }}
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
          style={{ objectPosition: "center 65%" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.9) 100%)" }}
        />
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-12 pb-12 md:pb-16 z-10">
          <p className="text-[10px] uppercase mb-3" style={{ color: GOLD, letterSpacing: "0.25em" }}>
            MYSTICLOV
          </p>
          <h1 className="text-white italic mb-3" style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, lineHeight: 1.2 }}>
            La pièce qui vous appartient.
          </h1>
          <p className="text-white text-[11px]" style={{ opacity: 0.7, letterSpacing: "0.05em" }}>
            Broderie dorée · Pièce unique · Paris
          </p>
          <Link
            to="/mysticlov/shop"
            className="inline-block mt-6 text-white text-[10px] uppercase"
            style={{ backgroundColor: ACCENT, padding: "12px 28px", letterSpacing: "0.15em" }}
          >
            DÉCOUVRIR LA COLLECTION →
          </Link>
        </div>
      </section>

      {/* BLOCK 2 — SPLIT 50/50 */}
      <section className="flex flex-col md:flex-row w-full my-5" style={{ minHeight: "100vh" }}>
        <div className="w-full md:w-1/2 h-[70vh] md:h-auto">
          <img src={seatedRooftop} alt="L'histoire MysticLov" className="w-full h-full object-cover" />
        </div>
        <div
          className="w-full md:w-1/2 flex items-center justify-center px-10 py-20 md:py-0"
          style={{ backgroundColor: BG }}
        >
          <div className="max-w-md">
            <p className="text-[9px] uppercase mb-6" style={{ color: GOLD, letterSpacing: "0.2em" }}>
              L'HISTOIRE
            </p>
            <h2 className="text-white mb-6" style={{ fontSize: 26, fontWeight: 300 }}>
              Chaque symbole a une raison d'être.
            </h2>
            <p className="text-white text-[13px]" style={{ opacity: 0.7, lineHeight: 1.9 }}>
              MysticLov est né d'une conviction : que ce qu'on porte dit quelque chose de qui on est.
              Ces broderies ne sont pas décoratives. Elles sont intentionnelles.
            </p>
            <div className="my-6 h-px" style={{ width: 40, backgroundColor: ACCENT }} />
            <p className="text-[11px]" style={{ color: GOLD }}>
              Broderie dorée sur coton premium. Pièce unique.
            </p>
          </div>
        </div>
      </section>

      {/* BLOCK 3 — FULL WIDTH IMAGE WITH SIDE TEXT */}
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
            <p className="text-[9px] uppercase mb-5" style={{ color: GOLD, letterSpacing: "0.2em" }}>
              LA COMMUNAUTÉ
            </p>
            <h2 className="text-white mb-5" style={{ fontSize: 30, fontWeight: 300 }}>
              Portée par celles qui avancent.
            </h2>
            <p className="text-white text-[12px]" style={{ opacity: 0.7, lineHeight: 1.8 }}>
              MysticLov s'adresse aux femmes qui assument. Qui choisissent leurs symboles.
              Qui savent ce qu'elles portent et pourquoi.
            </p>
          </div>
        </div>
      </section>

      {/* BLOCK 3.5 — MOSAIQUE 6 IMAGES */}
      <section className="w-full my-5" style={{ backgroundColor: BG }}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {[duoRooftop, greenTee, hoodieRooftop, heroSolo, groupShot, rooftopMadonna].map((img, i) => (
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


      {/* BLOCK 4 — CLOSING FULL SCREEN */}
      <section className="relative w-screen h-screen overflow-hidden my-5">
        <img
          src={closingJoy}
          alt="Very Slow Fashion"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center text-center px-6 z-10">
          <h2 className="text-white italic mb-3" style={{ fontSize: 40, fontWeight: 200, letterSpacing: "0.05em" }}>
            Very Slow Fashion.
          </h2>
          <p className="text-white text-[13px] mb-8" style={{ opacity: 0.6 }}>
            Fait avec intention. Porté avec sens.
          </p>
          <Link
            to="/mysticlov/shop"
            className="text-white text-[11px] uppercase"
            style={{
              backgroundColor: ACCENT,
              padding: "14px 32px",
              letterSpacing: "0.15em",
              borderRadius: 0,
            }}
          >
            DÉCOUVRIR LA COLLECTION
          </Link>
        </div>
      </section>

      {/* BOTTOM SECTION */}
      <section className="py-12 px-6" style={{ backgroundColor: BG }}>
        <div className="w-full h-px mb-8" style={{ backgroundColor: GOLD, opacity: 0.5 }} />
        <p
          className="text-center text-[10px] uppercase mb-4"
          style={{ color: GOLD, letterSpacing: "0.2em" }}
        >
          MYSTICLOV · Broderies dorées · Pièces uniques · Paris
        </p>
        <div className="flex justify-center gap-6 text-[11px] uppercase" style={{ letterSpacing: "0.15em" }}>
          <Link to="/powerlov" className="text-white" style={{ opacity: 0.4 }}>
            PowerLov
          </Link>
          <span className="text-white" style={{ opacity: 0.4 }}>·</span>
          <Link to="/stonelov" className="text-white" style={{ opacity: 0.4 }}>
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
