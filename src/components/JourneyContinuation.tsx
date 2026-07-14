import { Link } from "react-router-dom";
import powerAsset from "@/assets/powerlov/powerlov-hero-sacred-heart-paris.png.asset.json";
import mysticAsset from "@/assets/mysticlov/mysticlov-hero-cafe-paris.png.asset.json";
import stoneHero from "@/assets/stonelov/hero.png";

type UniverseKey = "power" | "mystic" | "stone";

type UniverseCard = {
  key: UniverseKey;
  eyebrow: string;
  title: string;
  caption: string;
  to: string;
  image: string;
  alt: string;
  objectPosition?: string;
};

const UNIVERSES: Record<UniverseKey, UniverseCard> = {
  power: {
    key: "power",
    eyebrow: "Chapitre — Force",
    title: "PowerLov",
    caption: "La discipline devient allure.",
    to: "/powerlov",
    image: powerAsset.url,
    alt: "PowerLov — pièce iconique devant le Sacré-Cœur",
    objectPosition: "center 30%",
  },
  mystic: {
    key: "mystic",
    eyebrow: "Chapitre — Intuition",
    title: "MysticLov",
    caption: "L'intention devient présence.",
    to: "/mysticlov",
    image: mysticAsset.url,
    alt: "MysticLov — Café de Paris",
    objectPosition: "center 35%",
  },
  stone: {
    key: "stone",
    eyebrow: "Chapitre — Talisman",
    title: "StoneLov",
    caption: "La pierre devient signature.",
    to: "/stonelov",
    image: stoneHero,
    alt: "StoneLov — hero savoir-faire",
    objectPosition: "center center",
  },
};

interface JourneyContinuationProps {
  /** The current universe — the two others will be shown. Omit to show all three. */
  current?: UniverseKey;
  /** Editorial intro shown above the cards. */
  eyebrow?: string;
  title?: string;
  /** Background — defaults to a warm off-white shared across pages. */
  background?: string;
}

const JourneyContinuation = ({
  current,
  eyebrow,
  title = "Trois univers, une même maison",
  background = "#EDEAE4",
}: JourneyContinuationProps) => {
  const order: UniverseKey[] = ["power", "mystic", "stone"];
  const cards = order
    .filter((k) => k !== current)
    .map((k) => UNIVERSES[k]);

  return (
    <section
      aria-label="Continuer l'exploration"
      className="w-full py-16 md:py-24 px-6 md:px-10"
      style={{ backgroundColor: background }}
    >
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center mb-10 md:mb-14">
          {eyebrow && (
            <p className="text-[10px] tracking-[0.28em] uppercase text-[#8A857C] mb-4">
              {eyebrow}
            </p>
          )}
          <h2
            className="text-[#1A1A1A] uppercase"
            style={{
              fontFamily: "Instrument Sans, system-ui, sans-serif",
              fontSize: "clamp(15px, 1.8vw, 19px)",
              fontWeight: 500,
              letterSpacing: "0.32em",
            }}
          >
            {title}
          </h2>
        </div>

        <div
          className={`grid gap-4 md:gap-6 ${
            cards.length === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3"
          }`}
        >
          {cards.map((c) => (
            <Link
              key={c.key}
              to={c.to}
              className="group block relative overflow-hidden bg-[#1A1A1A]"
              style={{ aspectRatio: "4 / 5" }}
              aria-label={`${c.title} — ${c.caption}`}
            >
              <img
                src={c.image}
                alt={c.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.03]"
                style={{ objectPosition: c.objectPosition ?? "center center" }}
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0) 75%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-center">
                <h3
                  className="text-white mb-4"
                  style={{
                    fontFamily: "Instrument Sans, system-ui, sans-serif",
                    fontSize: "clamp(20px, 2.4vw, 26px)",
                    letterSpacing: "0.14em",
                    fontWeight: 500,
                    textTransform: "uppercase",
                  }}
                >
                  {c.title}
                </h3>
                <span
                  className="inline-block text-[10px] tracking-[0.24em] uppercase text-white border-b border-white/60 pb-0.5 transition-colors group-hover:border-white"
                >
                  Découvrir
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

  );
};

export default JourneyContinuation;
