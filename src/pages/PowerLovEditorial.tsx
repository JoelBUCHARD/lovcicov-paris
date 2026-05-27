import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import hero from "@/assets/powerlov/hero.jpg";
import editorial from "@/assets/powerlov/editorial.jpg";
import tshirtDiscipline from "@/assets/powerlov-tshirt-discipline.png";
import tshirtEmpowered from "@/assets/powerlov-tshirt-empowered.png";

const BG = "#F5F3F0";
const BG2 = "#ECECEA";
const INK = "#1A1A1A";
const WARM = "#5F5E5A";
const LABEL = "#888780";
const BORDER = "#D8D6D2";
const RED = "#E63946";

const FONT = "Arial, sans-serif";

const messages = [
  { msg: "God is a DJ", desc: "Parce que la vie a son propre rythme." },
  { msg: "Badass", desc: "L'audace comme mode de vie." },
  { msg: "My discipline is my luxury.", desc: "Ce que tu construis chaque jour." },
  { msg: "Wear your power.", desc: "Ce que tu portes change ce que tu ressens." },
];

const products = [
  { id: "powerlov-discipline", name: "T-Shirt Discipline Is My Luxury", image: tshirtDiscipline, price: "59 €" },
  { id: "powerlov-empowered", name: "T-Shirt Connected Disciplined Empowered", image: tshirtEmpowered, price: "59 €" },
];

const PowerLovEditorial = () => {
  return (
    <div style={{ backgroundColor: BG, fontFamily: FONT }} className="min-h-screen">
      <Navbar />
      <main className="pt-[73px]">
        {/* BLOCK 1 — HERO */}
        <section className="relative w-screen h-screen overflow-hidden">
          <img
            src={hero}
            alt="PowerLov — Wear your power"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center 35%" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(26,26,26,0) 55%, rgba(26,26,26,0.5) 100%)" }}
          />
          <div className="absolute bottom-0 left-0 z-10" style={{ padding: 48 }}>
            <p
              className="uppercase"
              style={{ color: LABEL, fontSize: 9, letterSpacing: "0.25em", marginBottom: 12 }}
            >
              POWERLOV
            </p>
            <h1
              style={{
                color: "#FFFFFF",
                fontWeight: 200,
                fontStyle: "italic",
                fontSize: "clamp(36px, 6vw, 80px)",
                lineHeight: 1.05,
                margin: 0,
              }}
            >
              Wear your power.
            </h1>
            <p
              style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 8 }}
            >
              La femme qui a mille vies.
            </p>
          </div>
        </section>

        {/* BLOCK 2 — MANIFESTO STRIP */}
        <section style={{ backgroundColor: INK, padding: 40 }} className="w-full text-center">
          <p
            style={{
              color: "#FFFFFF",
              fontWeight: 200,
              fontStyle: "italic",
              fontSize: "clamp(24px, 4vw, 56px)",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            Pas juste un t-shirt. Un message.
          </p>
          <p style={{ color: LABEL, fontSize: 11, marginTop: 20 }}>
            God is a DJ · Badass · My discipline is my luxury · Wear your power · No rules.
          </p>
        </section>

        {/* BLOCK 3 — EDITORIAL SPLIT */}
        <section className="w-full flex flex-col md:flex-row">
          <div
            className="w-full md:w-1/2 flex items-center"
            style={{ backgroundColor: BG, padding: 60 }}
          >
            <div>
              <p
                className="uppercase"
                style={{ color: LABEL, fontSize: 9, letterSpacing: "0.2em", marginBottom: 20 }}
              >
                L'UNIVERS
              </p>
              <h2
                style={{
                  color: INK,
                  fontSize: 22,
                  fontWeight: 300,
                  marginBottom: 20,
                  lineHeight: 1.3,
                }}
              >
                Des basiques qui portent un message fort.
              </h2>
              <p style={{ color: WARM, fontSize: 13, lineHeight: 1.9, margin: 0 }}>
                PowerLov s'adresse à la femme audacieuse.
                Celle qui cherche le courage à 20 ans.
                Celle qui cherche le côté rock à 60 ans.
                Celle qui s'habille vite, bien, et qui porte
                quelque chose qui lui ressemble vraiment.
                Pas un stéréotype. Une signature.
              </p>
              <div style={{ width: 40, height: 1, backgroundColor: BORDER, margin: "24px 0" }} />
              <p
                className="uppercase"
                style={{ color: LABEL, fontSize: 10, letterSpacing: "0.1em", margin: 0 }}
              >
                Coton 280g · Unisex · Made in France
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src={editorial}
              alt="PowerLov editorial"
              loading="lazy"
              className="w-full h-full object-cover"
              style={{ minHeight: 420 }}
            />
          </div>
        </section>

        {/* BLOCK 4 — MESSAGES DISPLAY */}
        <section style={{ backgroundColor: BG2, padding: "80px 40px" }} className="w-full">
          <p
            className="uppercase text-center"
            style={{ color: LABEL, fontSize: 9, letterSpacing: "0.2em", marginBottom: 48 }}
          >
            LES MESSAGES
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {messages.map((m) => (
              <div
                key={m.msg}
                style={{
                  backgroundColor: "#FFFFFF",
                  border: `0.5px solid ${BORDER}`,
                  padding: 40,
                }}
              >
                <p
                  style={{
                    color: INK,
                    fontWeight: 200,
                    fontStyle: "italic",
                    fontSize: "clamp(20px, 3vw, 40px)",
                    lineHeight: 1.15,
                    margin: 0,
                  }}
                >
                  {m.msg}
                </p>
                <p style={{ color: LABEL, fontSize: 11, marginTop: 20 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* BLOCK 5 — PRODUCT GRID */}
        <section style={{ backgroundColor: BG, padding: "80px 40px" }} className="w-full">
          <p
            className="uppercase"
            style={{ color: LABEL, fontSize: 9, letterSpacing: "0.2em", marginBottom: 40 }}
          >
            LA COLLECTION
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {products.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="block group"
                style={{ backgroundColor: "#FFFFFF" }}
              >
                <div className="aspect-[3/4] overflow-hidden" style={{ backgroundColor: "#FFFFFF" }}>
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div style={{ padding: 16 }}>
                  <p style={{ color: INK, fontSize: 12, margin: 0 }}>{p.name}</p>
                  <p style={{ color: WARM, fontSize: 11, marginTop: 6 }}>{p.price}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: 56 }}>
            <Link
              to="/collections/powerlov"
              className="uppercase no-underline hover:underline"
              style={{ color: INK, fontSize: 11, letterSpacing: "0.2em" }}
            >
              VOIR TOUTE LA COLLECTION →
            </Link>
          </div>
        </section>

        {/* BLOCK 6 — CLOSING STATEMENT */}
        <section
          style={{ backgroundColor: INK, padding: "80px 40px" }}
          className="w-full text-center"
        >
          <p
            style={{
              color: "#FFFFFF",
              fontWeight: 200,
              fontStyle: "italic",
              fontSize: "clamp(28px, 5vw, 64px)",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Incarner. Pas juste porter.
          </p>
          <p style={{ color: LABEL, fontSize: 13, marginTop: 20 }}>
            PowerLov by LOVCICOV PARIS
          </p>
          <div style={{ marginTop: 40 }}>
            <Link
              to="/le-cercle"
              className="inline-block uppercase"
              style={{
                backgroundColor: "#FFFFFF",
                color: INK,
                padding: "14px 32px",
                fontSize: 11,
                letterSpacing: "0.2em",
                borderRadius: 0,
                transition: "background-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = RED;
                e.currentTarget.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#FFFFFF";
                e.currentTarget.style.color = INK;
              }}
            >
              REJOINDRE LE CERCLE
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PowerLovEditorial;
