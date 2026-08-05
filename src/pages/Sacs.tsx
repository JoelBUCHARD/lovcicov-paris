import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SavoirFaire from "@/components/sacs/SavoirFaire";
import SacCard from "@/components/sacs/SacCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { sacsProducts, MOTIF_LABEL, type SacMotif, type SacSilhouette } from "@/data/sacsTresses";
import { grigriProducts } from "@/data/products";
import { resolveProductImage } from "@/lib/productImage";
import { prefetchRoute } from "@/lib/prefetch";

type Tab = "sacs" | "accessoires";
type SilhouetteFilter = "all" | SacSilhouette;
type MotifFilter = "all" | SacMotif;

const pageStyle = {
  backgroundColor: "#FAF8F4",
  color: "#1A1A1A",
  fontFamily: "Instrument Sans, system-ui, sans-serif",
};

const serif = "'Cormorant Garamond', Georgia, serif";

const HERO = "/images/sacs/LOV-BIG-05_01.jpg";

const Sacs = () => {
  const [tab, setTab] = useState<Tab>("sacs");
  const [silhouette, setSilhouette] = useState<SilhouetteFilter>("all");
  const [motif, setMotif] = useState<MotifFilter>("all");

  const filtered = useMemo(
    () =>
      sacsProducts.filter(
        (p) =>
          (silhouette === "all" || p.silhouette === silhouette) &&
          (motif === "all" || p.motif === motif)
      ),
    [silhouette, motif]
  );

  const goToNewsletter = () => {
    const el = document.getElementById("footer-newsletter-email");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(() => (el as HTMLInputElement).focus(), 600);
    }
  };

  const filterBtn = (active: boolean) => ({
    fontSize: 11,
    letterSpacing: "0.18em",
    color: active ? "#1A1A1A" : "rgba(13,13,13,0.5)",
    borderBottom: active ? "1px solid #B3151C" : "1px solid transparent",
    paddingBottom: 4,
  });

  return (
    <div style={pageStyle} className="min-h-screen">
      <SEO
        title="Sacs tressés cuir de buffle — Big LOV & Small LOV | LOVCICOV Paris"
        description="La collection Sacs tressés LOVCICOV Paris : cuir de buffle tressé à la main, ouverture en V, charm cœur signature. Deux silhouettes, douze coloris."
        path="/sacs"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Collection Sacs tressés LOVCICOV Paris",
          description:
            "Cuir de buffle tressé main, ouverture en V, charm cœur signature. Douze coloris, deux silhouettes.",
          url: "https://lovcicov.com/sacs",
        }}
      />
      <Navbar />

      <main className="pt-[73px]">
        {/* HERO */}
        <section className="relative w-full overflow-hidden" style={{ height: "60vh" }}>
          <img
            src={HERO}
            alt="Sac Big LOV aztèque vert en cuir de buffle tressé main, porté dans une rue parisienne"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center 72%" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(13,13,13,0.10) 0%, rgba(13,13,13,0.30) 60%, rgba(13,13,13,0.45) 100%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 z-10 text-center" style={{ padding: "clamp(24px,4vw,56px)" }}>
            <h1
              style={{
                fontFamily: serif,
                fontSize: "clamp(34px, 5.5vw, 68px)",
                lineHeight: 1.05,
                color: "#FAF8F4",
              }}
            >
              La collection Sacs tressés
            </h1>
            <p
              className="mt-3"
              style={{ fontSize: "clamp(12px, 1.3vw, 15px)", color: "rgba(250,248,244,0.88)" }}
            >
              Cuir de buffle tressé main. Ouverture en V. Charm cœur signature.
            </p>
          </div>
        </section>

        {/* CHAPÔ */}
        <section className="text-center" style={{ padding: "clamp(48px,7vw,96px) clamp(24px,5vw,72px)" }}>
          <p
            className="mx-auto"
            style={{
              fontFamily: serif,
              maxWidth: 720,
              fontSize: "clamp(19px, 2.2vw, 27px)",
              lineHeight: 1.5,
              color: "#1A1A1A",
            }}
          >
            Tressés à la main en Inde, un fil de cuir de buffle après l'autre. Deux silhouettes,
            douze coloris, un même geste : celui de l'artisan.
          </p>
        </section>

        {/* ONGLETS */}
        <div
          className="sticky z-30 border-y border-[rgba(13,13,13,0.08)] backdrop-blur"
          style={{ top: 73, backgroundColor: "rgba(250,248,244,0.94)" }}
          id="sacs-grid"
        >
          <nav aria-label="Catégories" style={{ padding: "14px clamp(16px,4vw,48px)" }}>
            <ul className="flex items-center justify-center gap-8 md:gap-12">
              {(["sacs", "accessoires"] as Tab[]).map((k) => (
                <li key={k}>
                  <button
                    type="button"
                    onClick={() => setTab(k)}
                    className="uppercase transition-colors"
                    style={filterBtn(tab === k)}
                  >
                    {k === "sacs" ? "Sacs" : "Accessoires"}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {tab === "sacs" ? (
          <>
            {/* FILTRES */}
            <div style={{ padding: "clamp(28px,4vw,48px) clamp(16px,4vw,48px) 0" }}>
              <div
                role="group"
                aria-label="Filtrer par silhouette"
                className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
              >
                {([
                  ["all", "Toutes"],
                  ["big", "Big LOV"],
                  ["small", "Small LOV"],
                ] as [SilhouetteFilter, string][]).map(([k, label]) => (
                  <button
                    key={k}
                    type="button"
                    aria-pressed={silhouette === k}
                    onClick={() => setSilhouette(k)}
                    className="uppercase transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1A1A1A]"
                    style={filterBtn(silhouette === k)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div
                role="group"
                aria-label="Filtrer par motif"
                className="mt-5 flex flex-wrap items-center justify-center gap-6 md:gap-10"
              >
                {([
                  ["all", "Tous les motifs"],
                  ["tricolore", MOTIF_LABEL.tricolore],
                  ["bicolore", MOTIF_LABEL.bicolore],
                  ["azteque", MOTIF_LABEL.azteque],
                ] as [MotifFilter, string][]).map(([k, label]) => (
                  <button
                    key={k}
                    type="button"
                    aria-pressed={motif === k}
                    onClick={() => setMotif(k)}
                    className="uppercase transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1A1A1A]"
                    style={{ ...filterBtn(motif === k), fontSize: 10, letterSpacing: "0.22em" }}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p
                className="mt-6 text-center uppercase"
                style={{ fontSize: 10, letterSpacing: "0.22em", color: "rgba(13,13,13,0.45)" }}
                aria-live="polite"
              >
                {filtered.length} {filtered.length > 1 ? "modèles" : "modèle"}
              </p>
            </div>

            {/* GRILLE */}
            <section
              aria-label="Sacs tressés"
              style={{ padding: "clamp(24px,4vw,48px) clamp(16px,4vw,48px) clamp(48px,7vw,96px)" }}
            >
              <div
                className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14"
                style={{ maxWidth: 1400 }}
              >
                {filtered.map((p) => (
                  <SacCard key={p.ref} product={p} />
                ))}
              </div>
            </section>
          </>
        ) : (
          <section
            aria-label="Grigris LOVCICOV"
            style={{ padding: "clamp(24px,4vw,56px) clamp(12px,3vw,40px) clamp(32px,5vw,64px)" }}
          >
            <div
              className="mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 md:gap-x-4 gap-y-8 md:gap-y-10"
              style={{ maxWidth: 1400 }}
            >
              {grigriProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: Math.min(i, 6) * 0.035 }}
                >
                  <Link
                    to={`/shop/${p.id}`}
                    onMouseEnter={() => prefetchRoute("/shop/item")}
                    className="group flex flex-col focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0D0D0D]"
                  >
                    <div className="relative w-full overflow-hidden bg-[#F0EDE7]" style={{ aspectRatio: "1 / 1" }}>
                      <img
                        src={resolveProductImage(p.image)}
                        alt={p.name}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="pt-3 text-center">
                      <p
                        className="font-light product-card-eyebrow"
                        style={{
                          fontSize: 9,
                          letterSpacing: "0.28em",
                          textTransform: "uppercase",
                          color: "rgba(13,13,13,0.5)",
                          marginBottom: 4,
                        }}
                      >
                        Grigri
                      </p>
                      <h3
                        className="text-[#0D0D0D] font-light product-card-title"
                        style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", lineHeight: 1.35 }}
                      >
                        {p.name}
                      </h3>
                      <p className="mt-0.5 text-[#5F5E5A] font-light" style={{ fontSize: 11 }}>
                        €{p.price}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        <SavoirFaire />

        {/* CTA NEWSLETTER */}
        <section
          className="text-center"
          style={{ padding: "clamp(56px,8vw,104px) clamp(24px,5vw,72px)", backgroundColor: "#FAF8F4" }}
        >
          <h2 style={{ fontFamily: serif, fontSize: "clamp(24px,3vw,38px)", color: "#1A1A1A" }}>
            Les pièces partent vite.
          </h2>
          <p className="mt-3 mx-auto" style={{ maxWidth: 460, fontSize: 14, color: "rgba(13,13,13,0.65)" }}>
            Recevez les nouveaux coloris et les réassorts avant tout le monde.
          </p>
          <button
            type="button"
            onClick={goToNewsletter}
            className="mt-8 inline-flex items-center justify-center px-10 py-3 uppercase transition-colors"
            style={{
              backgroundColor: "#B3151C",
              color: "#FFFFFF",
              fontSize: 11,
              letterSpacing: "0.24em",
            }}
          >
            Rejoindre la liste
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Sacs;
