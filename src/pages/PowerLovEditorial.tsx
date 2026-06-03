import { useEffect, useState, type ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroAsset from "@/assets/powerlov/powerlov-hero-new.png.asset.json";
import godDjCafeWideAsset from "@/assets/powerlov/powerlov-grid-god-dj-cafe-wide.png.asset.json";
import energyNeverLiesAsset from "@/assets/powerlov/powerlov-grid-energy-never-lies.png.asset.json";
import connectedDisciplinedEmpoweredAsset from "@/assets/powerlov/powerlov-grid-connected-disciplined-empowered.png.asset.json";
import godIsADancerAsset from "@/assets/powerlov/powerlov-grid-god-is-a-dancer.png.asset.json";
import godIsADjStreetAsset from "@/assets/powerlov/powerlov-grid-god-is-a-dj-street.png.asset.json";
import disciplineIsMyLuxuryAsset from "@/assets/powerlov/powerlov-grid-discipline-is-my-luxury.png.asset.json";
import boldBadassSweatAsset from "@/assets/powerlov/powerlov-bold-badass-no-filter-sweat.png.asset.json";
import boldBadassTeeBackAsset from "@/assets/powerlov/powerlov-bold-badass-no-filter-tee-back.png.asset.json";
import disciplineLuxuryAsset from "@/assets/powerlov/powerlov-discipline-is-my-luxury.png.asset.json";
import ifGodIsADjAsset from "@/assets/powerlov/powerlov-if-god-is-a-dj.png.asset.json";
const heroImage = heroAsset.url;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const topWide = {
  image: godDjCafeWideAsset.url,
  alt: "PowerLov — femme en t-shirt noir God is a DJ. en terrasse parisienne, plan large",
  objectPosition: "center center",
};

const bottomWide = {
  image: disciplineIsMyLuxuryAsset.url,
  alt: "PowerLov — t-shirt blanc Discipline Is My Luxury devant une voiture vintage",
  objectPosition: "center 32%",
};

const midProducts = [
  {
    image: connectedDisciplinedEmpoweredAsset.url,
    alt: "PowerLov — femme en t-shirt blanc Connected. Disciplined. Empowered.",
    objectPosition: "center 28%",
  },
  {
    image: boldBadassSweatAsset.url,
    alt: "PowerLov — homme en sweat blanc Bold. Badass. No Filter. dans une rue parisienne",
    objectPosition: "center 30%",
  },
  {
    image: ifGodIsADjAsset.url,
    alt: "PowerLov — femme en t-shirt noir If God Is A DJ, I Am The Frequency en terrasse parisienne",
    objectPosition: "center 30%",
  },
  {
    image: disciplineLuxuryAsset.url,
    alt: "PowerLov — homme en t-shirt noir Discipline Is My Luxury devant le Café de Flore",
    objectPosition: "center 35%",
  },
];

const secondaryProducts = [
  {
    image: godIsADjStreetAsset.url,
    alt: "PowerLov — femme en t-shirt noir God is a DJ. devant une vitrine parisienne",
    objectPosition: "center 26%",
  },
  {
    image: boldBadassTeeBackAsset.url,
    alt: "PowerLov — dos du t-shirt blanc Bold, Badass, No Filter. (homme)",
    objectPosition: "center 35%",
  },
  {
    image: energyNeverLiesAsset.url,
    alt: "PowerLov — hoodie noir Energy Never Lies sur balcon parisien",
    objectPosition: "center 34%",
  },
  {
    image: godIsADancerAsset.url,
    alt: "PowerLov — dos du t-shirt blanc God is a Dancer dans la rue",
    objectPosition: "center 30%",
  },
];


const Reveal = ({ children, className, delay = 0 }: RevealProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), delay);
    return () => window.clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(28px)",
        transition: "opacity 900ms ease, transform 900ms ease",
      }}
    >
      {children}
    </div>
  );
};

const sectionPadding = "clamp(28px, 5vw, 72px)";
const pageStyle = {
  backgroundColor: "#F4F0E8",
  color: "#0D0D0D",
  fontFamily: "Instrument Sans, system-ui, sans-serif",
};

const editorialTitleStyle = {
  fontFamily: "Instrument Sans, system-ui, sans-serif",
  fontWeight: 400,
  letterSpacing: 0,
};

const PowerLovEditorial = () => {
  const scrollToManifesto = () => {
    document.getElementById("powerlov-manifesto")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div style={pageStyle} className="min-h-screen">
      <Navbar />

      <main className="pt-[73px] overflow-hidden">
        {/* HERO */}
        <section className="relative w-screen h-[58svh] md:h-screen overflow-hidden">
          <img
            src={heroImage}
            alt="PowerLov par LOVCICOV Paris"
            className="absolute inset-0 w-full h-full object-cover object-top md:object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(13,13,13,0.18) 0%, rgba(13,13,13,0.3) 48%, rgba(13,13,13,0.22) 100%)",
            }}
          />

          <div
            className="absolute inset-x-0 bottom-3 z-10 md:bottom-6"
            style={{ paddingInline: "clamp(24px, 5vw, 72px)" }}
          >
            <Reveal className="max-w-[19rem] md:max-w-3xl" delay={120}>
              <p
                className="mb-1 text-[8px] md:text-[11px] uppercase"
                style={{
                  color: "rgba(244,240,232,0.82)",
                  letterSpacing: "0.22em",
                }}
              >
                PowerLov
              </p>
              <p
                className="mb-2 md:mb-4 italic"
                style={{
                  fontFamily: "Instrument Sans, system-ui, sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(13px, 2vw, 22px)",
                  color: "rgba(244,240,232,0.82)",
                }}
              >
                Wear your power.
              </p>
              <button
                type="button"
                onClick={scrollToManifesto}
                className="mt-2 md:mt-6 inline-flex items-center justify-center px-3.5 py-1.5 md:px-7 md:py-3 text-[8px] md:text-[11px] uppercase transition-colors duration-300"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#0D0D0D",
                  letterSpacing: "0.2em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#E8E4DD";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                }}
              >
                Découvrir la collection →
              </button>
            </Reveal>
          </div>
        </section>

        {/* DESCRIPTIF */}
        <section
          id="powerlov-manifesto"
          className="w-full"
          style={{ backgroundColor: "#F4F0E8", padding: `${sectionPadding} clamp(24px, 6vw, 88px)` }}
        >
          <Reveal className="mx-auto max-w-3xl text-center">
            <p
              className="mb-5 text-[11px] uppercase"
              style={{ color: "rgba(13,13,13,0.48)", letterSpacing: "0.22em" }}
            >
              La collection
            </p>
            <h2
              style={{
                ...editorialTitleStyle,
                fontSize: "clamp(28px, 4vw, 44px)",
                lineHeight: 1.1,
              }}
              className="m-0 mb-3"
            >
              PowerLov
            </h2>
            <p
              className="mb-10 italic"
              style={{
                fontFamily: "Instrument Sans, system-ui, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(18px, 2vw, 22px)",
                color: "rgba(13,13,13,0.7)",
              }}
            >
              Wear your power.
            </p>
            <div
              className="space-y-6 text-[15px] md:text-[16px]"
              style={{ color: "rgba(13,13,13,0.78)", lineHeight: 1.9 }}
            >
              <p>
                PowerLov incarne une vision contemporaine de la puissance parisienne : silencieuse,
                instinctive et parfaitement maîtrisée.
              </p>
              <p>
                Inspirée par l'allure effortless de la Parisienne, la collection explore cette capacité
                unique à imposer une présence sans jamais en faire trop.
              </p>
              <p>
                Des lignes fortes.<br />
                Des silhouettes épurées.<br />
                Des pièces pensées pour accompagner le mouvement, structurer l'allure et révéler une
                confiance naturelle.
              </p>
              <p>
                Ici, la puissance ne se montre pas.<br />
                Elle se ressent dans une attitude, une démarche, une façon d'occuper l'espace.
              </p>
              <p>
                PowerLov mélange sophistication minimaliste, énergie urbaine et élégance émotionnelle
                dans un vestiaire conçu pour celles et ceux qui avancent avec calme, intensité et liberté.
              </p>
            </div>
          </Reveal>
        </section>

        {/* PRODUITS — mosaïque harmonisée */}
        <section style={{ backgroundColor: "#F4F0E8" }}>
          {/* Top wide image */}
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "16 / 9", backgroundColor: "#F4F0E8" }}
          >
            <img
              src={topWide.image}
              alt={topWide.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: topWide.objectPosition }}
            />
          </div>

          {/* Middle grid — smaller, like MysticLov / StoneLov */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-5"
            style={{ padding: "clamp(20px, 3vw, 40px)" }}
          >
            {midProducts.map((product) => (
              <div
                key={product.alt}
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "4 / 5", backgroundColor: "#F4F0E8" }}
              >
                <img
                  src={product.image}
                  alt={product.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: product.objectPosition }}
                />
              </div>
            ))}
          </div>

          {/* Second smaller grid — alternance homme / femme */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-5"
            style={{ padding: "0 clamp(20px, 3vw, 40px) clamp(20px, 3vw, 40px)" }}
          >
            {secondaryProducts.map((product) => (
              <div
                key={product.alt}
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "4 / 5", backgroundColor: "#F4F0E8" }}
              >
                <img
                  src={product.image}
                  alt={product.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: product.objectPosition }}
                />
              </div>
            ))}
          </div>

          {/* Bottom wide image with CTA overlay */}
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "16 / 9", backgroundColor: "#F4F0E8" }}
          >
            <img
              src={bottomWide.image}
              alt={bottomWide.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: bottomWide.objectPosition }}
            />
            <div
              className="absolute inset-x-0 bottom-3 z-10 md:bottom-6 flex justify-center"
              style={{ paddingInline: "clamp(24px, 5vw, 72px)" }}
            >
              <button
                type="button"
                onClick={scrollToManifesto}
                className="inline-flex items-center justify-center px-3.5 py-1.5 md:px-7 md:py-3 text-[8px] md:text-[11px] uppercase transition-colors duration-300"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#0D0D0D",
                  letterSpacing: "0.2em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#E8E4DD";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                }}
              >
                Découvrir la collection →
              </button>
            </div>
          </div>
        </section>

      </main>


      <Footer />
    </div>
  );
};

export default PowerLovEditorial;

