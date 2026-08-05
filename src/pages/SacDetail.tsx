import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SacGallery from "@/components/sacs/SacGallery";
import SavoirFaire from "@/components/sacs/SavoirFaire";
import SacCard from "@/components/sacs/SacCard";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";
import {
  getSacBySlug,
  getSameSilhouette,
  getSameMotif,
  SILHOUETTES,
  MOTIF_LABEL,
  DETAILS_FINITIONS,
  MATIERE_ENTRETIEN,
  DIMENSIONS_TOLERANCE,
  LIVRAISON_RETOURS,
} from "@/data/sacsTresses";

const serif = "'Cormorant Garamond', Georgia, serif";

const Accordion = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[rgba(13,13,13,0.12)]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-4 text-left uppercase focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1A1A1A]"
        style={{ fontSize: 11, letterSpacing: "0.2em", color: "#1A1A1A" }}
      >
        {title}
        <span aria-hidden="true" style={{ fontSize: 16, lineHeight: 1 }}>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="pb-5" style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(13,13,13,0.7)" }}>
          {children}
        </div>
      )}
    </div>
  );
};

const SacDetail = () => {
  const { slug } = useParams();
  const product = getSacBySlug(slug);
  const { addToCart } = useCart();

  if (!product) return <Navigate to="/sacs" replace />;

  const silhouette = SILHOUETTES[product.silhouette];
  const variants = getSameSilhouette(product);
  const related = getSameMotif(product);

  const handleAdd = () => {
    addToCart({
      id: `sac-${product.ref.toLowerCase()}`,
      name: product.name,
      price: product.price,
      collection: "sacs",
      description: product.description,
      details: product.description,
      image: product.images[0],
    });
    toast({ title: "Ajouté au panier", description: product.name });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF8F4", color: "#1A1A1A" }}>
      <SEO
        title={`${product.name} — Sac tressé cuir de buffle | LOVCICOV Paris`}
        description={product.description}
        path={`/sacs/${product.slug}`}
        type="product"
        image={`https://lovcicov.com${product.images[0]}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          sku: product.ref,
          image: product.images.map((i) => `https://lovcicov.com${i}`),
          description: product.description,
          brand: { "@type": "Brand", name: "LOVCICOV Paris" },
          material: "Cuir de buffle",
          color: product.coloris,
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            url: `https://lovcicov.com/sacs/${product.slug}`,
          },
        }}
      />
      <Navbar />

      <main className="pt-[73px]">
        <nav aria-label="Fil d'ariane" style={{ padding: "20px clamp(16px,4vw,48px) 0" }}>
          <Link
            to="/sacs"
            className="uppercase hover:opacity-60 transition-opacity"
            style={{ fontSize: 10, letterSpacing: "0.22em", color: "rgba(13,13,13,0.55)" }}
          >
            ← La collection Sacs tressés
          </Link>
        </nav>

        <section
          className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16"
          style={{ maxWidth: 1400, padding: "clamp(20px,3vw,40px) clamp(16px,4vw,48px)" }}
        >
          {/* GALERIE */}
          <SacGallery images={product.images} alt={product.alt} />

          {/* INFORMATIONS */}
          <div className="lg:pt-6 lg:max-w-[460px]">
            <p className="uppercase" style={{ fontSize: 10, letterSpacing: "0.26em", color: "rgba(13,13,13,0.5)" }}>
              {silhouette.label} · {MOTIF_LABEL[product.motif]}
            </p>
            <h1 className="mt-3" style={{ fontFamily: serif, fontSize: "clamp(30px,3.4vw,46px)", lineHeight: 1.1 }}>
              {product.name}
            </h1>
            <p className="mt-3" style={{ fontSize: 14, color: "rgba(13,13,13,0.65)" }}>
              {product.coloris} · {product.finitions}
            </p>
            <p className="mt-4" style={{ fontSize: 18 }}>{product.price} €</p>

            {/* SÉLECTEUR DE COLORIS */}
            <div className="mt-8">
              <p className="uppercase" style={{ fontSize: 10, letterSpacing: "0.22em", color: "rgba(13,13,13,0.55)" }}>
                Autres coloris {silhouette.label}
              </p>
              <ul className="mt-3 flex flex-wrap gap-3">
                {variants.map((v) => {
                  const current = v.slug === product.slug;
                  return (
                    <li key={v.ref}>
                      <Link
                        to={`/sacs/${v.slug}`}
                        aria-label={v.name}
                        aria-current={current ? "page" : undefined}
                        title={v.name}
                        className="flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1A1A1A]"
                        style={{
                          width: 30,
                          height: 30,
                          border: current ? "1px solid #1A1A1A" : "1px solid rgba(13,13,13,0.18)",
                          padding: 3,
                        }}
                      >
                        <span
                          aria-hidden="true"
                          className="block w-full h-full rounded-full"
                          style={{
                            background:
                              v.swatch.length > 1
                                ? `linear-gradient(135deg, ${v.swatch
                                    .map(
                                      (c, i) =>
                                        `${c} ${(i * 100) / v.swatch.length}% ${((i + 1) * 100) /
                                          v.swatch.length}%`
                                    )
                                    .join(", ")})`
                                : v.swatch[0],
                          }}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="mt-8 w-full uppercase transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "#B3151C",
                color: "#FFFFFF",
                fontSize: 11,
                letterSpacing: "0.24em",
                padding: "16px 0",
              }}
            >
              Ajouter au panier
            </button>
            <p className="mt-3 text-center" style={{ fontSize: 11, color: "rgba(13,13,13,0.55)" }}>
              Livraison offerte dès 150 € · Retours sous 14 jours
            </p>

            <p className="mt-8" style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(13,13,13,0.75)" }}>
              {product.description}
            </p>

            <div className="mt-10">
              <Accordion title="Détails & finitions">
                <ul className="list-disc pl-5 space-y-1.5">
                  {DETAILS_FINITIONS.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </Accordion>
              <Accordion title="Dimensions">
                <p>{silhouette.dimensions}</p>
                <p>{silhouette.anses}</p>
                <p className="mt-3" style={{ fontSize: 12, color: "rgba(13,13,13,0.55)" }}>
                  {DIMENSIONS_TOLERANCE}
                </p>
              </Accordion>
              <Accordion title="Matière & entretien">
                <p>{MATIERE_ENTRETIEN}</p>
              </Accordion>
              <Accordion title="Livraison & retours">
                <p>{LIVRAISON_RETOURS}</p>
              </Accordion>
            </div>
          </div>
        </section>

        {/* VOUS AIMEREZ AUSSI */}
        <section
          aria-label="Vous aimerez aussi"
          style={{ padding: "clamp(48px,7vw,96px) clamp(16px,4vw,48px)" }}
        >
          <h2
            className="text-center uppercase"
            style={{ fontSize: 10, letterSpacing: "0.28em", color: "rgba(13,13,13,0.55)", marginBottom: 40 }}
          >
            Vous aimerez aussi
          </h2>
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-12" style={{ maxWidth: 1200 }}>
            {related.map((p) => (
              <SacCard key={p.ref} product={p} />
            ))}
          </div>
        </section>

        <SavoirFaire />
      </main>

      <Footer />
    </div>
  );
};

export default SacDetail;
