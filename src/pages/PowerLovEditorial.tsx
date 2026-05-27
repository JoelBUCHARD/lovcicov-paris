import { useEffect, useState, type ReactNode } from "react";
import Navbar from "@/components/Navbar";
import lovcicovLogo from "@/assets/lovcicov-logo.png";
import heroImage from "@/assets/powerlov/powerlov-hero.png";
import disciplineLounge from "@/assets/powerlov/powerlov-discipline-lounge.png";
import connectedNight from "@/assets/powerlov/powerlov-connected-night.png";
import energyParis from "@/assets/powerlov/powerlov-energy-paris.png";
import dancerBack from "@/assets/powerlov/powerlov-dancer-back.png";
import godDjBlack from "@/assets/powerlov/powerlov-god-dj-black.png";
import disciplineAge from "@/assets/powerlov/powerlov-discipline-age.png";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

type MessageBlock = {
  title: string;
  copy: string;
  image: string;
  imageAlt: string;
  theme: "light" | "dark";
  reverse?: boolean;
};

const messages: MessageBlock[] = [
  {
    title: "Discipline is my luxury",
    copy: "Le vrai flex, c'est de tenir ses promesses. À soi-même d'abord.",
    image: disciplineLounge,
    imageAlt: "Femme portant le t-shirt Discipline is my luxury dans un décor clair et solaire",
    theme: "light",
  },
  {
    title: "Connected. Disciplined. Empowered.",
    copy: "Quand tout s'aligne, l'allure fait le reste. Pas besoin d'en faire trop.",
    image: connectedNight,
    imageAlt: "Silhouette de dos portant le message Connected. Disciplined. Empowered. de nuit",
    theme: "dark",
    reverse: true,
  },
  {
    title: "Energy never lies",
    copy: "Votre sourire ment peut-être. Votre énergie, jamais.",
    image: energyParis,
    imageAlt: "Femme dans une rue parisienne portant le t-shirt Energy never lies",
    theme: "light",
  },
  {
    title: "God is a dancer",
    copy: "La vie a son rythme. Et visiblement, vous tenez la piste.",
    image: dancerBack,
    imageAlt: "Femme de dos portant le message God is a dancer dans une rue parisienne",
    theme: "dark",
    reverse: true,
  },
  {
    title: "God is a DJ",
    copy: "Vous n'avez pas besoin de tout contrôler. Juste d'arriver au bon tempo.",
    image: godDjBlack,
    imageAlt: "Homme portant un t-shirt noir God is a DJ devant une façade parisienne",
    theme: "light",
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
  fontFamily: "'Playfair Display', Georgia, serif",
  fontWeight: 500,
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
        <section className="relative min-h-[calc(100vh-73px)] w-full">
          <img
            src={heroImage}
            alt="Power Love par LOVCICOV Paris, femme portant un t-shirt Discipline is my luxury près d'une Porsche"
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
                LOVCICOV PARIS
              </p>
              <h1
                style={{
                  ...editorialTitleStyle,
                  color: "#F4F0E8",
                  fontSize: "clamp(52px, 10vw, 132px)",
                  lineHeight: 0.9,
                }}
                className="m-0 max-w-4xl uppercase"
              >
                POWER LOVE
              </h1>
              <p
                className="mt-6 max-w-2xl"
                style={{
                  ...editorialTitleStyle,
                  color: "#F4F0E8",
                  fontSize: "clamp(24px, 4vw, 42px)",
                  lineHeight: 1.08,
                }}
              >
                L'attitude est le vrai luxe.
              </p>
              <p
                className="mt-4 max-w-xl text-[15px] md:text-[17px]"
                style={{ color: "rgba(244,240,232,0.86)", lineHeight: 1.7 }}
              >
                On n'a rien inventé. On l'a juste écrit dans le dos.
              </p>
              <button
                type="button"
                onClick={scrollToManifesto}
                className="mt-8 inline-flex items-center justify-center border px-7 py-3 text-[11px] uppercase transition-colors duration-300"
                style={{
                  borderColor: "rgba(244,240,232,0.5)",
                  color: "#F4F0E8",
                  backgroundColor: "transparent",
                  letterSpacing: "0.2em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#C8102E";
                  e.currentTarget.style.borderColor = "#C8102E";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "rgba(244,240,232,0.5)";
                }}
              >
                Découvrir
              </button>
            </Reveal>
          </div>
        </section>

        <section
          id="powerlov-manifesto"
          className="w-full"
          style={{ backgroundColor: "#0D0D0D", padding: `${sectionPadding} clamp(24px, 6vw, 88px)` }}
        >
          <Reveal className="mx-auto max-w-5xl text-center">
            <p
              className="mb-5 text-[11px] uppercase"
              style={{ color: "rgba(244,240,232,0.72)", letterSpacing: "0.22em" }}
            >
              Le manifeste
            </p>
            <p
              style={{
                ...editorialTitleStyle,
                color: "#F4F0E8",
                fontSize: "clamp(26px, 4vw, 54px)",
                lineHeight: 1.22,
              }}
              className="m-0"
            >
              Power Love, c'est pour celles et ceux qui ont compris. Que la discipline est un luxe.
              Que l'énergie ne ment jamais. Et qu'un basique blanc peut en dire plus long qu'un grand
              discours. Pas de leçon de vie ici — juste des vérités qu'on assume, avec le sourire. Pas
              juste un t-shirt. Une intention.
            </p>
          </Reveal>
        </section>

        <section style={{ backgroundColor: "#F4F0E8" }}>
          {messages.map((message, index) => {
            const isDark = message.theme === "dark";

            return (
              <section
                key={message.title}
                className="w-full"
                style={{
                  backgroundColor: isDark ? "#0D0D0D" : "#F4F0E8",
                  color: isDark ? "#F4F0E8" : "#0D0D0D",
                }}
              >
                <Reveal
                  className={`mx-auto grid max-w-[1600px] grid-cols-1 items-stretch gap-0 md:grid-cols-2 ${
                    message.reverse ? "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1" : ""
                  }`}
                >
                  <div className="min-h-[520px] md:min-h-[720px]">
                    <img
                      src={message.image}
                      alt={message.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div
                    className="flex items-center"
                    style={{ padding: "clamp(28px, 6vw, 96px)" }}
                  >
                    <div className="max-w-xl">
                      <p
                        className="mb-4 text-[11px] uppercase"
                        style={{
                          color: isDark ? "rgba(244,240,232,0.68)" : "rgba(13,13,13,0.48)",
                          letterSpacing: "0.2em",
                        }}
                      >
                        Message {String(index + 1).padStart(2, "0")}
                      </p>
                      <h2
                        style={{
                          ...editorialTitleStyle,
                          fontSize: "clamp(36px, 5vw, 76px)",
                          lineHeight: 0.96,
                        }}
                        className="m-0 max-w-lg uppercase"
                      >
                        {message.title}
                      </h2>
                      <p
                        className="mt-6 max-w-md text-[16px] md:text-[18px]"
                        style={{
                          color: isDark ? "rgba(244,240,232,0.86)" : "rgba(13,13,13,0.76)",
                          lineHeight: 1.8,
                        }}
                      >
                        {message.copy}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </section>
            );
          })}
        </section>

        <section
          className="w-full"
          style={{ backgroundColor: "#F4F0E8", padding: `${sectionPadding} clamp(24px, 6vw, 88px)` }}
        >
          <Reveal className="mx-auto grid max-w-[1450px] grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p
                className="mb-4 text-[11px] uppercase"
                style={{ color: "rgba(13,13,13,0.48)", letterSpacing: "0.2em" }}
              >
                Pour qui ?
              </p>
              <h2
                style={{
                  ...editorialTitleStyle,
                  fontSize: "clamp(34px, 4.7vw, 68px)",
                  lineHeight: 1,
                }}
                className="m-0 max-w-3xl"
              >
                20 ans ou 60 ans. La même audace.
              </h2>
              <p
                className="mt-8 max-w-2xl text-[16px] md:text-[18px]"
                style={{ color: "rgba(13,13,13,0.76)", lineHeight: 1.9 }}
              >
                Power Love ne demande pas votre âge. Juste votre cran. La fille qui démarre, la maman
                qui jongle, la femme qui n'a plus rien à prouver — même blanc, même message, mille façons
                de le porter.
              </p>
            </div>
            <div className="overflow-hidden">
              <img
                src={disciplineAge}
                alt="Femme souriante portant le message Discipline is my luxury dans une rue parisienne"
                loading="lazy"
                className="h-full min-h-[520px] w-full object-cover"
              />
            </div>
          </Reveal>
        </section>

        <section
          className="w-full"
          style={{ backgroundColor: "#0D0D0D", padding: `${sectionPadding} clamp(24px, 6vw, 88px)` }}
        >
          <Reveal className="mx-auto grid max-w-[1450px] grid-cols-1 gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div className="overflow-hidden">
              <img
                src={connectedNight}
                alt="Détail du t-shirt blanc Power Love avec le message Connected. Disciplined. Empowered."
                loading="lazy"
                className="h-full min-h-[520px] w-full object-cover"
                style={{ objectPosition: "center 18%" }}
              />
            </div>
            <div>
              <p
                className="mb-4 text-[11px] uppercase"
                style={{ color: "rgba(244,240,232,0.66)", letterSpacing: "0.2em" }}
              >
                La promesse premium
              </p>
              <h2
                style={{
                  ...editorialTitleStyle,
                  color: "#F4F0E8",
                  fontSize: "clamp(34px, 4.6vw, 64px)",
                  lineHeight: 1.04,
                }}
                className="m-0 max-w-3xl"
              >
                Du beau coton, une coupe oversize parfaite, une fabrication soignée.
              </h2>
              <p
                className="mt-7 max-w-xl text-[16px] md:text-[18px]"
                style={{ color: "rgba(244,240,232,0.82)", lineHeight: 1.9 }}
              >
                Le reste, c'est vous qui l'apportez. L'allure. L'énergie. Le petit supplément d'âme qui
                fait qu'un t-shirt blanc ne ressemble soudain à aucun autre.
              </p>
            </div>
          </Reveal>
        </section>

        <section
          className="w-full"
          style={{ backgroundColor: "#F4F0E8", padding: `${sectionPadding} clamp(24px, 6vw, 88px)` }}
        >
          <Reveal className="mx-auto max-w-4xl text-center">
            <p
              className="mb-4 text-[11px] uppercase"
              style={{ color: "rgba(13,13,13,0.48)", letterSpacing: "0.2em" }}
            >
              Le Cercle
            </p>
            <h2
              style={{
                ...editorialTitleStyle,
                fontSize: "clamp(34px, 4.8vw, 72px)",
                lineHeight: 1,
              }}
              className="m-0"
            >
              Power Love, c'est plus qu'une collection. C'est une bande.
            </h2>
            <p
              className="mx-auto mt-6 max-w-2xl text-[16px] md:text-[18px]"
              style={{ color: "rgba(13,13,13,0.76)", lineHeight: 1.9 }}
            >
              Rejoignez Le Cercle de Georgiana. Des pièces, des idées, des élans, et cette sensation très
              chic de ne pas être seule à penser comme ça.
            </p>
            <a
              href="https://lovcicov.paris/le-cercle"
              target="_blank"
              rel="noreferrer"
              className="mt-9 inline-flex items-center justify-center px-8 py-4 text-[11px] uppercase transition-colors duration-300"
              style={{
                backgroundColor: "#0D0D0D",
                color: "#F4F0E8",
                letterSpacing: "0.2em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#C8102E";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#0D0D0D";
              }}
            >
              Rejoindre Le Cercle
            </a>
          </Reveal>
        </section>
      </main>

      <footer
        className="border-t"
        style={{
          backgroundColor: "#F4F0E8",
          borderColor: "rgba(13,13,13,0.12)",
          padding: "28px clamp(24px, 6vw, 88px) 36px",
        }}
      >
        <div className="mx-auto flex max-w-[1450px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <img src={lovcicovLogo} alt="LOVCICOV Paris" className="h-6 w-auto" />
              <span className="text-[11px] uppercase" style={{ letterSpacing: "0.22em", color: "rgba(13,13,13,0.62)" }}>
                Paris
              </span>
            </div>
            <p
              className="mt-4"
              style={{ ...editorialTitleStyle, fontSize: "clamp(22px, 3vw, 34px)", lineHeight: 1.05 }}
            >
              Power Love
            </p>
          </div>

          <div className="flex flex-col gap-3 text-[12px] uppercase md:items-end" style={{ letterSpacing: "0.16em" }}>
            <a
              href="https://lovcicov.paris"
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-300"
              style={{ color: "rgba(13,13,13,0.72)" }}
            >
              lovcicov.paris
            </a>
            <a
              href="https://www.instagram.com/lovcicov.paris/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-300"
              style={{ color: "rgba(13,13,13,0.72)" }}
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PowerLovEditorial;
