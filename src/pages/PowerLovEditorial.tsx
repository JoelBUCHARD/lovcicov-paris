import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JourneyContinuation from "@/components/JourneyContinuation";
import SEO from "@/components/SEO";
import heroAsset from "@/assets/powerlov/powerlov-hero-sacred-heart-paris.png.asset.json";
import godDjCafeWideAsset from "@/assets/powerlov/powerlov-topwide-cafe-flore-v3.png.asset.json";
import disciplineIsMyLuxuryAsset from "@/assets/powerlov/powerlov-bottomwide-porsche-saint-dominique.png.asset.json";
import disciplineLuxuryBackAsset from "@/assets/powerlov/powerlov-grid-discipline-luxury-back.png.asset.json";
import godIsADancerAsset from "@/assets/powerlov/powerlov-grid-god-is-a-dancer.png.asset.json";
import protectedAlignedAsset from "@/assets/powerlov/powerlov-grid-protected-aligned-v2.png.asset.json";
const heroImage = heroAsset.url;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const topWide = {
  image: godDjCafeWideAsset.url,
  alt: "PowerLov — femme en t-shirt blanc LOVCICOV devant le Café de Flore à Paris",
  objectPosition: "center 85%",
  link: "/shop/powerlov-discipline",
};

const bottomWide = {
  image: disciplineIsMyLuxuryAsset.url,
  alt: "PowerLov — femme de dos en sweat gris LOVCICOV PARIS rue Saint-Benoît, Paris",
  objectPosition: "center 30%",
  link: "/shop/powerlov-discipline",
};

const midProducts = [
  {
    image: disciplineLuxuryBackAsset.url,
    alt: "PowerLov — femme de dos en t-shirt blanc Discipline Is My Luxury dans une rue parisienne",
    objectPosition: "center 30%",
    link: "/shop/powerlov-discipline",
  },
  {
    image: godIsADancerAsset.url,
    alt: "PowerLov — femme de dos en t-shirt blanc God Is A Dancer dans une rue parisienne",
    objectPosition: "center 30%",
    link: "/shop/powerlov-god-is-a-dancer",
  },
  {
    image: protectedAlignedAsset.url,
    alt: "PowerLov — femme en t-shirt blanc Protected. Aligned. Unstoppable. devant le Café de Flore",
    objectPosition: "center 30%",
    link: "/shop/powerlov-protected-aligned-unstoppable",
  },
];


const Reveal = ({ children, className }: RevealProps) => {
  return <div className={className}>{children}</div>;
};


const sectionPadding = "clamp(28px, 5vw, 72px)";
const pageStyle = {
  backgroundColor: "#FAF8F4",
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
      <SEO
        title="PowerLov — Wear your power. | LOVCICOV Paris"
        description="PowerLov par LOVCICOV Paris : silhouettes affirmées, coton lourd, sérigraphies manifestes. Wear your power."
        path="/powerlov"
      />
      <Navbar />

      <main className="pt-[73px] overflow-hidden">
        {/* HERO */}
        <section className="relative w-screen h-[58svh] md:h-[78vh] overflow-hidden">
          <img
            src={heroImage}
            alt="PowerLov par LOVCICOV Paris"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(1.15) contrast(0.98)", objectPosition: "center 30%" }}
            loading="eager"
            fetchPriority="high"
            decoding="async"
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
              <Link
                to="/collections/powerlov"
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
                Découvrir la collection
              </Link>
            </Reveal>
          </div>
        </section>

        {/* DESCRIPTIF */}
        <section
          id="powerlov-manifesto"
          className="w-full"
          style={{ backgroundColor: "#FAF8F4", padding: `${sectionPadding} clamp(24px, 6vw, 88px)` }}
        >
          <Reveal className="mx-auto max-w-3xl text-center">
            <p
              className="mb-5 text-[11px] uppercase"
              style={{ color: "rgba(13,13,13,0.48)", letterSpacing: "0.22em" }}
            >
              La collection
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
        <section style={{ backgroundColor: "#FAF8F4" }}>
          {/* Top wide image */}
          <Link
            to={topWide.link}
            className="relative w-full overflow-hidden block group"
            style={{ aspectRatio: "16 / 9", backgroundColor: "#FAF8F4" }}
          >
            <img
              src={topWide.image}
              alt={topWide.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.02]"
              style={{ objectPosition: topWide.objectPosition }}
            />
          </Link>

          {/* Produits — 3 pièces */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
            style={{ padding: "clamp(20px, 3vw, 40px)" }}
          >
            {midProducts.map((product) => (
              <Link
                key={product.alt}
                to={product.link}
                className="relative w-full overflow-hidden block group"
                style={{ aspectRatio: "4 / 5", backgroundColor: "#FAF8F4" }}
              >
                <img
                  src={product.image}
                  alt={product.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
                  style={{ objectPosition: product.objectPosition }}
                />
              </Link>
            ))}
          </div>


          {/* Bottom wide image with CTA overlay */}
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "16 / 9", backgroundColor: "#FAF8F4" }}
          >
            <Link to={bottomWide.link} className="block absolute inset-0 group">
              <img
                src={bottomWide.image}
                alt={bottomWide.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.02]"
                style={{ objectPosition: bottomWide.objectPosition }}
              />
            </Link>

            <div
              className="absolute inset-x-0 bottom-3 z-10 md:bottom-6 flex justify-center"
              style={{ paddingInline: "clamp(24px, 5vw, 72px)" }}
            >
              <Link
                to="/collections/powerlov"
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
                Découvrir la collection
              </Link>
            </div>
          </div>
        </section>

      </main>

      <JourneyContinuation current="power" />

      <Footer />

    </div>
  );
};

export default PowerLovEditorial;

