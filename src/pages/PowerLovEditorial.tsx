import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
    caption: "Discipline Is My Luxury",
  },
  {
    image: godIsADancerAsset.url,
    alt: "PowerLov — femme de dos en t-shirt blanc God Is A Dancer dans une rue parisienne",
    objectPosition: "center 30%",
    link: "/shop/powerlov-god-is-a-dancer",
    caption: "God Is A Dancer",
  },
  {
    image: protectedAlignedAsset.url,
    alt: "PowerLov — femme en t-shirt blanc Protected. Aligned. Unstoppable. devant le Café de Flore",
    objectPosition: "center 30%",
    link: "/shop/powerlov-protected-aligned-unstoppable",
    caption: "Protected. Aligned. Unstoppable.",
  },
];

const Reveal = ({ children, className }: RevealProps) => (
  <div className={className}>{children}</div>
);

const pageStyle = {
  backgroundColor: "#FAF8F4",
  color: "#0D0D0D",
  fontFamily: "Instrument Sans, system-ui, sans-serif",
};

const PowerLovEditorial = () => {
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
        <section className="relative w-screen h-[62svh] md:h-[86vh] overflow-hidden">
          <img
            src={heroImage}
            alt="PowerLov par LOVCICOV Paris"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(1.12) contrast(0.98)", objectPosition: "center 28%" }}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(13,13,13,0.14) 0%, rgba(13,13,13,0.28) 55%, rgba(13,13,13,0.42) 100%)",
            }}
          />

          <div
            className="absolute inset-x-0 bottom-8 md:bottom-14 z-10"
            style={{ paddingInline: "clamp(24px, 5vw, 88px)" }}
          >
            <Reveal className="max-w-[22rem] md:max-w-4xl">
              <p
                className="mb-3 md:mb-5 text-[9px] md:text-[11px] uppercase"
                style={{ color: "rgba(244,240,232,0.78)", letterSpacing: "0.32em" }}
              >
                Collection · PowerLov
              </p>
              <h1
                className="mb-4 md:mb-6"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 300,
                  fontStyle: "italic",
                  fontSize: "clamp(34px, 6vw, 76px)",
                  lineHeight: 1.02,
                  color: "#F4F0E8",
                  letterSpacing: "-0.01em",
                }}
              >
                Wear your power.
              </h1>
              <p
                className="mb-6 md:mb-10 max-w-[18rem] md:max-w-md"
                style={{
                  fontWeight: 300,
                  fontSize: "clamp(12px, 1.15vw, 15px)",
                  lineHeight: 1.7,
                  color: "rgba(244,240,232,0.78)",
                }}
              >
                Une allure calme. Une intention claire. Une présence qui n'a rien à prouver.
              </p>
              <Link
                to="/collections/powerlov"
                className="inline-flex items-center justify-center px-5 py-2.5 md:px-8 md:py-3.5 text-[9px] md:text-[11px] uppercase transition-colors duration-300"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#0D0D0D",
                  letterSpacing: "0.28em",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#E8E4DD"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#FFFFFF"; }}
              >
                Découvrir la collection
              </Link>
            </Reveal>
          </div>
        </section>

        {/* CHAPITRE I — Ouverture éditoriale */}
        <section
          id="powerlov-manifesto"
          className="w-full"
          style={{ paddingBlock: "clamp(80px, 12vw, 160px)", paddingInline: "clamp(24px, 6vw, 96px)" }}
        >
          <Reveal className="mx-auto max-w-2xl text-center">
            <p
              className="mb-8 text-[10px] uppercase"
              style={{ color: "rgba(13,13,13,0.42)", letterSpacing: "0.32em" }}
            >
              Chapitre I — La collection
            </p>
            <p
              className="italic"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(24px, 3.4vw, 40px)",
                lineHeight: 1.35,
                color: "#0D0D0D",
                letterSpacing: "-0.005em",
              }}
            >
              Une vision contemporaine de la puissance parisienne : silencieuse, instinctive,
              parfaitement maîtrisée.
            </p>
          </Reveal>
        </section>

        {/* IMAGE ÉDITORIALE — respiration */}
        <section aria-hidden="true">
          <Link
            to={topWide.link}
            className="relative w-full overflow-hidden block group"
            style={{ aspectRatio: "16 / 9", backgroundColor: "#FAF8F4" }}
          >
            <img
              src={topWide.image}
              alt={topWide.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
              style={{ objectPosition: topWide.objectPosition }}
            />
          </Link>
        </section>

        {/* CHAPITRE II — L'allure */}
        <section
          className="w-full"
          style={{ paddingBlock: "clamp(80px, 12vw, 160px)", paddingInline: "clamp(24px, 6vw, 96px)" }}
        >
          <Reveal className="mx-auto max-w-2xl">
            <p
              className="mb-8 text-[10px] uppercase text-center"
              style={{ color: "rgba(13,13,13,0.42)", letterSpacing: "0.32em" }}
            >
              Chapitre II — L'allure
            </p>

            <div
              className="space-y-8 text-center"
              style={{
                fontWeight: 300,
                fontSize: "clamp(15px, 1.25vw, 17px)",
                lineHeight: 1.95,
                color: "rgba(13,13,13,0.82)",
              }}
            >
              <p>
                Inspirée par l'allure <em style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>effortless</em> de
                la Parisienne, PowerLov explore cette capacité unique à imposer une présence
                sans jamais en faire trop.
              </p>

              <p>
                Des lignes fortes.<br />
                Des silhouettes épurées.<br />
                Des pièces pensées pour accompagner le mouvement.
              </p>
            </div>
          </Reveal>
        </section>

        {/* CITATION — respiration typographique */}
        <section
          className="w-full"
          style={{
            paddingBlock: "clamp(90px, 14vw, 180px)",
            paddingInline: "clamp(24px, 6vw, 96px)",
            backgroundColor: "#F2EDE4",
          }}
        >
          <Reveal className="mx-auto max-w-3xl text-center">
            <p
              className="italic"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(28px, 4.2vw, 54px)",
                lineHeight: 1.25,
                color: "#0D0D0D",
              }}
            >
              « La puissance ne se montre pas.<br />
              Elle se ressent. »
            </p>
            <p
              className="mt-8 text-[10px] uppercase"
              style={{ color: "rgba(13,13,13,0.42)", letterSpacing: "0.32em" }}
            >
              LOVCICOV Paris
            </p>
          </Reveal>
        </section>

        {/* CHAPITRE III — Le vestiaire (produits) */}
        <section
          style={{ paddingBlock: "clamp(80px, 12vw, 140px)" }}
        >
          <Reveal className="mx-auto max-w-2xl text-center" >
            <p
              className="mb-6 text-[10px] uppercase"
              style={{ color: "rgba(13,13,13,0.42)", letterSpacing: "0.32em" }}
            >
              Chapitre III — Le vestiaire
            </p>
            <p
              className="italic mb-16 md:mb-24"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 300,
                fontSize: "clamp(20px, 2.6vw, 30px)",
                lineHeight: 1.4,
                color: "#0D0D0D",
                paddingInline: "clamp(24px, 6vw, 96px)",
              }}
            >
              Trois pièces manifestes. Un même langage.
            </p>
          </Reveal>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
            style={{ paddingInline: "clamp(20px, 4vw, 56px)" }}
          >
            {midProducts.map((product) => (
              <Link
                key={product.alt}
                to={product.link}
                className="group block"
              >
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "4 / 5", backgroundColor: "#F0EBE3" }}
                >
                  <img
                    src={product.image}
                    alt={product.alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                    style={{ objectPosition: product.objectPosition }}
                  />
                </div>
                <p
                  className="mt-5 text-center uppercase"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.22em",
                    color: "#0D0D0D",
                    fontWeight: 300,
                  }}
                >
                  {product.caption}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* CHAPITRE IV — L'invitation */}
        <section
          className="w-full"
          style={{ paddingBlock: "clamp(60px, 10vw, 120px)", paddingInline: "clamp(24px, 6vw, 96px)" }}
        >
          <Reveal className="mx-auto max-w-2xl text-center">
            <p
              style={{
                fontWeight: 300,
                fontSize: "clamp(15px, 1.2vw, 17px)",
                lineHeight: 1.95,
                color: "rgba(13,13,13,0.82)",
              }}
            >
              PowerLov est un vestiaire conçu pour celles et ceux qui avancent
              avec calme, intensité et liberté.
            </p>
          </Reveal>
        </section>

        {/* IMAGE FINALE + CTA */}
        <section>
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "16 / 9", backgroundColor: "#FAF8F4" }}
          >
            <Link to={bottomWide.link} className="block absolute inset-0 group">
              <img
                src={bottomWide.image}
                alt={bottomWide.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
                style={{ objectPosition: bottomWide.objectPosition }}
              />
            </Link>

            <div
              className="absolute inset-x-0 bottom-6 md:bottom-12 z-10 flex justify-center"
              style={{ paddingInline: "clamp(24px, 5vw, 72px)" }}
            >
              <Link
                to="/collections/powerlov"
                className="inline-flex items-center justify-center px-5 py-2.5 md:px-8 md:py-3.5 text-[9px] md:text-[11px] uppercase transition-colors duration-300"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#0D0D0D",
                  letterSpacing: "0.28em",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#E8E4DD"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#FFFFFF"; }}
              >
                Entrer dans la collection
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PowerLovEditorial;
