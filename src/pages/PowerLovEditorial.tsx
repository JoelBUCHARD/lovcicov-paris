import { useEffect, useState, type ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/powerlov/powerlov-hero.png";
import disciplineLounge from "@/assets/powerlov/powerlov-discipline-lounge.png";
import connectedNight from "@/assets/powerlov/powerlov-connected-night.png";
import energyParis from "@/assets/powerlov/powerlov-energy-paris.png";
import dancerBack from "@/assets/powerlov/powerlov-dancer-back.png";
import godDjBlack from "@/assets/powerlov/powerlov-god-dj-black.png";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

// Designs Bertrand 01, 02, 03, 04, 07 — mix t-shirts blancs & noirs, message centré devant
const products = [
  { image: disciplineLounge, alt: "PowerLov — design 01" },
  { image: connectedNight, alt: "PowerLov — design 02" },
  { image: energyParis, alt: "PowerLov — design 03" },
  { image: dancerBack, alt: "PowerLov — design 04" },
  { image: godDjBlack, alt: "PowerLov — design 07" },
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
        <section className="relative min-h-[calc(100vh-73px)] w-full">
          <img
            src={heroImage}
            alt="PowerLov par LOVCICOV Paris"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center center" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(13,13,13,0.18) 0%, rgba(13,13,13,0.3) 48%, rgba(13,13,13,0.72) 100%)",
            }}
          />

          <div className="relative z-10 flex min-h-[calc(100vh-73px)] items-end" style={{ padding: sectionPadding }}>
            <Reveal className="max-w-3xl" delay={120}>
              <p
                className="mb-5 text-[11px] uppercase"
                style={{
                  color: "rgba(244,240,232,0.82)",
                  letterSpacing: "0.22em",
                }}
              >
                PowerLov
              </p>
              <button
                type="button"
                onClick={scrollToManifesto}
                className="mt-8 inline-flex items-center justify-center px-7 py-3 text-[11px] uppercase transition-colors duration-300"
                style={{
                  backgroundColor: "#C8102E",
                  color: "#F4F0E8",
                  letterSpacing: "0.2em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#9E0C24";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#C8102E";
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

        {/* PRODUITS — images seules, message centré sur le devant */}
        <section style={{ backgroundColor: "#F4F0E8" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: "#0D0D0D" }}>
            {products.map((product) => (
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
                />
              </div>
            ))}
          </div>
        </section>

        {/* REJOINDRE LE CERCLE — version simple */}
        <section
          className="w-full"
          style={{ backgroundColor: "#0D0D0D", padding: `${sectionPadding} clamp(24px, 6vw, 88px)` }}
        >
          <Reveal className="mx-auto max-w-2xl text-center">
            <p
              className="mb-5 text-[11px] uppercase"
              style={{ color: "rgba(244,240,232,0.6)", letterSpacing: "0.22em" }}
            >
              Le Cercle
            </p>
            <h2
              style={{
                ...editorialTitleStyle,
                color: "#F4F0E8",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(28px, 4vw, 44px)",
                lineHeight: 1.1,
              }}
              className="m-0 mb-6"
            >
              Rejoindre Le Cercle
            </h2>
            <p
              className="mx-auto text-[15px] md:text-[16px]"
              style={{ color: "rgba(244,240,232,0.78)", lineHeight: 1.9 }}
            >
              Recevez nos newsletters confidentielles et accédez en avant-première à nos gifts,
              drops limités et invitations privées.
            </p>
            <a
              href="/le-cercle"
              className="mt-9 inline-flex items-center justify-center px-7 py-3 text-[11px] uppercase transition-colors duration-300"
              style={{
                backgroundColor: "#C8102E",
                color: "#F4F0E8",
                letterSpacing: "0.2em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#9E0C24";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#C8102E";
              }}
            >
              Rejoindre Le Cercle →
            </a>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PowerLovEditorial;
