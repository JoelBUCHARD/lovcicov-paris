import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JourneyContinuation from "@/components/JourneyContinuation";
import SEO from "@/components/SEO";
import { prefetchRoute } from "@/lib/prefetch";

type Category = "all" | "big" | "small";

type BagCard = {
  id: string;
  name: string;
  typeLabel: string;
  price: number;
  color: string;
  productSlug: "big-lov" | "small-lov";
  subcategory: "big" | "small";
};

const BAGS: BagCard[] = [
  { id: "big-noir",     name: "Big LOV — Noir",       typeLabel: "Sac cuir tressé", price: 890, color: "#1A1A1A", productSlug: "big-lov",   subcategory: "big" },
  { id: "small-camel",  name: "Small LOV — Camel",    typeLabel: "Sac cuir tressé", price: 690, color: "#B47B4A", productSlug: "small-lov", subcategory: "small" },
  { id: "big-creme",    name: "Big LOV — Crème",      typeLabel: "Sac cuir tressé", price: 890, color: "#E8DCC8", productSlug: "big-lov",   subcategory: "big" },
  { id: "small-cognac", name: "Small LOV — Cognac",   typeLabel: "Sac cuir tressé", price: 690, color: "#8B4A2E", productSlug: "small-lov", subcategory: "small" },
  { id: "big-rouge",    name: "Big LOV — Rouge",      typeLabel: "Sac cuir tressé", price: 890, color: "#A02828", productSlug: "big-lov",   subcategory: "big" },
  { id: "small-chocolat", name: "Small LOV — Chocolat", typeLabel: "Sac cuir tressé", price: 690, color: "#3F2818", productSlug: "small-lov", subcategory: "small" },
  { id: "big-camel",    name: "Big LOV — Camel",      typeLabel: "Sac cuir tressé", price: 890, color: "#B47B4A", productSlug: "big-lov",   subcategory: "big" },
  { id: "small-noir",   name: "Small LOV — Noir",     typeLabel: "Sac cuir tressé", price: 690, color: "#1A1A1A", productSlug: "small-lov", subcategory: "small" },
  { id: "big-cognac",   name: "Big LOV — Cognac",     typeLabel: "Sac cuir tressé", price: 890, color: "#8B4A2E", productSlug: "big-lov",   subcategory: "big" },
  { id: "small-creme",  name: "Small LOV — Crème",    typeLabel: "Sac cuir tressé", price: 690, color: "#E8DCC8", productSlug: "small-lov", subcategory: "small" },
];

const CATEGORY_LABELS: { key: Category; label: string }[] = [
  { key: "all", label: "Tout voir" },
  { key: "big", label: "Big LOV" },
  { key: "small", label: "Small LOV" },
];

const pageStyle = {
  backgroundColor: "#FAF8F4",
  color: "#0D0D0D",
  fontFamily: "Instrument Sans, system-ui, sans-serif",
};

const isLightColor = (hex: string) =>
  hex.toLowerCase() === "#e8dcc8" || hex.toLowerCase() === "#b47b4a";

const Sacs = () => {
  const location = useLocation();
  const [category, setCategory] = useState<Category>("all");

  const filtered = useMemo(
    () => BAGS.filter((b) => (category === "all" ? true : b.subcategory === category)),
    [category]
  );

  const from = `${location.pathname}${location.search}`;

  return (
    <div style={pageStyle} className="min-h-screen">
      <SEO
        title="LovBag — Sacs cuir tressé | LOVCICOV Paris"
        description="LovBag par LOVCICOV Paris : sacs en cuir pleine fleur tressés à la main. Big LOV et Small LOV, une palette de teintes signatures."
        path="/sacs"
      />
      <Navbar />

      <main className="pt-[73px] overflow-hidden">
        {/* HERO — placeholder gradient en attendant les visuels */}
        <section
          className="relative w-screen h-[95svh] md:h-[115vh] overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #6B4A2E 0%, #A0623E 35%, #C8463A 70%, #E8DCC8 100%)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(13,13,13,0.18) 0%, rgba(13,13,13,0.3) 48%, rgba(13,13,13,0.28) 100%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-3 z-10 md:bottom-6"
            style={{ paddingInline: "clamp(24px, 5vw, 72px)" }}
          >
            <div className="max-w-[19rem] md:max-w-3xl">
              <p
                className="mb-1 text-[8px] md:text-[11px] uppercase"
                style={{ color: "rgba(244,240,232,0.82)", letterSpacing: "0.22em" }}
              >
                LovBag
              </p>
              <p
                className="mb-2 md:mb-4 italic"
                style={{ fontWeight: 300, fontSize: "clamp(13px, 2vw, 22px)", color: "rgba(244,240,232,0.9)" }}
              >
                Le cuir tressé, geste après geste. Un sac pensé pour durer.
              </p>
            </div>
          </div>
        </section>

        {/* GIANT TITLE */}
        <section
          className="w-full text-center"
          style={{ padding: "clamp(48px, 8vw, 96px) clamp(16px, 4vw, 48px) clamp(24px, 4vw, 48px)" }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8 }}
            className="uppercase leading-[0.9]"
            style={{
              fontFamily: "Instrument Sans, system-ui, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(64px, 15vw, 260px)",
              letterSpacing: "-0.02em",
              color: "#0D0D0D",
            }}
          >
            LOVBAG
          </motion.h1>
        </section>

        {/* STICKY FILTER BAR */}
        <div
          className="sticky z-30 border-y border-[rgba(13,13,13,0.08)] backdrop-blur"
          style={{ top: 73, backgroundColor: "rgba(250,248,244,0.92)" }}
          id="lovbag-grid"
        >
          <div
            className="mx-auto flex items-center justify-between gap-4"
            style={{ padding: "14px clamp(16px, 4vw, 48px)", maxWidth: 1600 }}
          >
            <span className="whitespace-nowrap" aria-hidden="true" />
            <nav aria-label="Catégories LovBag" className="flex-1 overflow-x-auto no-scrollbar">
              <ul className="flex items-center justify-center gap-5 md:gap-9 whitespace-nowrap">
                {CATEGORY_LABELS.map(({ key, label }) => {
                  const active = category === key;
                  return (
                    <li key={key}>
                      <button
                        type="button"
                        onClick={() => setCategory(key)}
                        className="uppercase transition-colors duration-200"
                        style={{
                          fontSize: 10,
                          letterSpacing: "0.24em",
                          color: active ? "#0D0D0D" : "rgba(13,13,13,0.5)",
                          borderBottom: active ? "1px solid #0D0D0D" : "1px solid transparent",
                          paddingBottom: 4,
                        }}
                      >
                        {label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <button
              type="button"
              className="uppercase whitespace-nowrap"
              style={{ fontSize: 10, letterSpacing: "0.24em", color: "rgba(13,13,13,0.6)" }}
            >
              Filtres
            </button>
          </div>
        </div>

        {/* PRODUCT GRID */}
        <section
          aria-label="Sélection LovBag"
          style={{ padding: "clamp(24px, 4vw, 56px) clamp(12px, 3vw, 40px) 4px" }}
        >
          <style>{`
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>

          <div
            className="mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-1 md:gap-x-2 gap-y-1 md:gap-y-1.5 md:[grid-auto-flow:dense]"
            style={{ maxWidth: 1400 }}
          >
            {filtered.map((bag, i) => {
              const light = isLightColor(bag.color);
              const textColor = light ? "rgba(13,13,13,0.55)" : "rgba(244,240,232,0.75)";
              return (
                <motion.div
                  key={bag.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: Math.min(i, 6) * 0.035 }}
                  className="col-span-1 self-start"
                >
                  <Link
                    to={`/shop/${bag.productSlug}`}
                    state={{ from }}
                    onMouseEnter={() => prefetchRoute("/shop/item")}
                    onTouchStart={() => prefetchRoute("/shop/item")}
                    className="group flex flex-col focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0D0D0D]"
                  >
                    <div
                      className="relative w-full overflow-hidden"
                      style={{
                        aspectRatio: "4 / 5",
                        backgroundColor: bag.color,
                      }}
                    >
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                      <span
                        className="absolute bottom-3 left-3 uppercase"
                        style={{
                          fontSize: 9,
                          letterSpacing: "0.24em",
                          color: textColor,
                        }}
                      >
                        Visuel à venir
                      </span>
                    </div>
                    <div className="pt-1 md:pt-1.5 pb-1 text-center" style={{ minHeight: 72 }}>
                      <p
                        className="font-light"
                        style={{
                          fontSize: 9,
                          letterSpacing: "0.28em",
                          textTransform: "uppercase",
                          color: "rgba(13,13,13,0.5)",
                          marginBottom: 4,
                        }}
                      >
                        {bag.typeLabel}
                      </p>
                      <h3
                        className="text-[#0D0D0D] font-light"
                        style={{
                          fontSize: 11,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          lineHeight: 1.35,
                        }}
                      >
                        {bag.name}
                      </h3>
                      <p
                        className="mt-0.5 text-[#5F5E5A] font-light"
                        style={{ fontSize: 11, letterSpacing: "0.06em" }}
                      >
                        €{bag.price}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <p
              className="text-center uppercase mt-10"
              style={{ fontSize: 10, letterSpacing: "0.24em", color: "rgba(13,13,13,0.5)" }}
            >
              Aucune pièce dans cette collection
            </p>
          )}
        </section>

        {/* CLOSING IMAGE — placeholder */}
        <section
          className="w-full"
          style={{ padding: "clamp(32px, 5vw, 64px) clamp(12px, 3vw, 40px)" }}
        >
          <div
            className="mx-auto"
            style={{
              maxWidth: 1100,
              aspectRatio: "21 / 9",
              background:
                "linear-gradient(135deg, #2E1F10 0%, #6B4A2E 50%, #E8DCC8 100%)",
            }}
            aria-label="Visuel LovBag à venir"
          />
        </section>

        <JourneyContinuation
          eyebrow="Explorer"
          title="Trois univers, une même maison"
        />
      </main>

      <Footer />
    </div>
  );
};

export default Sacs;
