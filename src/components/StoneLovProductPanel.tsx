import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus, Instagram, Star } from "lucide-react";
import { Product, bijouxProducts } from "@/data/products";
import { detectStones } from "@/data/stoneMeanings";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

const imageModulesJpg = import.meta.glob("@/assets/*.jpg", { eager: true, import: "default" }) as Record<string, string>;
const imageModulesWebp = import.meta.glob("@/assets/*.webp", { eager: true, import: "default" }) as Record<string, string>;
const imageModules = { ...imageModulesJpg, ...imageModulesWebp };
const getImage = (key: string) => {
  const match = Object.entries(imageModules).find(([path]) => path.includes(key));
  return match ? match[1] : "";
};

const ARIAL = "Arial, sans-serif";
const TERRA = "#C4714A";
const PEACH_BG = "#FDF5EF";

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  highlight?: boolean;
}

const Collapsible = ({ title, children, highlight }: CollapsibleProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: "0.5px solid #E8D8C8" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
        style={{
          fontFamily: ARIAL,
          fontSize: 10,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#1A1A1A",
        }}
      >
        <span>{title}</span>
        {open ? <Minus size={14} strokeWidth={1.2} /> : <Plus size={14} strokeWidth={1.2} />}
      </button>
      <div
        style={{
          maxHeight: open ? 1000 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s ease",
          backgroundColor: highlight && open ? PEACH_BG : "transparent",
        }}
      >
        <div style={{ padding: open ? "8px 4px 20px" : "0 4px" }}>{children}</div>
      </div>
    </div>
  );
};

const bodyStyle: React.CSSProperties = {
  fontFamily: ARIAL,
  fontSize: 12,
  color: "#5F5E5A",
  lineHeight: 1.8,
};

const StoneLovProductPanel = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const stones = detectStones(`${product.name} ${product.description} ${product.details ?? ""}`);

  const crossSell = bijouxProducts.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    addToCart(product);
    toast({ title: "Ajouté au panier", description: product.name });
  };

  return (
    <div style={{ backgroundColor: PEACH_BG }} className="p-8 md:p-12">
      {/* BLOCK 2 — Title + subtitle */}
      <h1 style={{ fontFamily: ARIAL, fontSize: 22, fontWeight: 300, color: "#1A1A1A" }}>
        {product.name}
      </h1>
      <p
        style={{
          fontFamily: ARIAL,
          fontStyle: "italic",
          color: TERRA,
          fontSize: 11,
          letterSpacing: "0.1em",
          marginTop: 8,
        }}
      >
        Une pierre. Une énergie. Un talisman à porter.
      </p>

      {/* BLOCK 3 — Price + payment */}
      <p style={{ fontFamily: ARIAL, fontSize: 18, color: "#1A1A1A", marginTop: 24 }}>€{product.price}</p>
      <p style={{ fontFamily: ARIAL, fontSize: 10, fontStyle: "italic", color: "#888780", marginTop: 4 }}>
        Pierre choisie pour son énergie et sa vertu
      </p>
      <p style={{ fontFamily: ARIAL, fontSize: 11, fontStyle: "italic", color: "#888780", marginTop: 6 }}>
        4x sans frais avec Alma · Paiement sécurisé
      </p>

      {/* BLOCK 4 — Product info */}
      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <p style={{ fontFamily: ARIAL, fontSize: 11, color: "#5F5E5A", lineHeight: 1.9 }}>
          Fait main en Turquie · Monture en laiton doré
        </p>
        <p style={{ fontFamily: ARIAL, fontSize: 11, color: "#5F5E5A", lineHeight: 1.9 }}>
          Pierre naturelle — chaque pièce est unique
        </p>
        <p style={{ fontFamily: ARIAL, fontSize: 11, color: "#5F5E5A", lineHeight: 1.9 }}>
          {product.name.toLowerCase().includes('bracelet')
            ? 'Poids : environ 30g'
            : 'Poids : environ 100g — une vraie pièce qui se sent'}
        </p>
      </div>

      {/* Reassurance banner */}
      <div
        style={{
          backgroundColor: PEACH_BG,
          padding: "12px 20px",
          borderTop: "0.5px solid #E8D8C8",
          borderBottom: "0.5px solid #E8D8C8",
          marginTop: 8,
          marginBottom: 24,
          marginLeft: -32,
          marginRight: -32,
        }}
      >
        <p
          style={{
            fontFamily: ARIAL,
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "#B4A99A",
            textAlign: "center",
          }}
        >
          Livraison offerte dès 100€&nbsp; · &nbsp;Retours 14 jours&nbsp; · &nbsp;Fait main en Turquie&nbsp; · &nbsp;Pièce unique
        </p>
      </div>


      {/* BLOCK 5 skipped — jewelry, no sizes */}

      {/* BLOCK 6 — Add to cart */}
      <button
        onClick={handleAdd}
        className="w-full transition-colors hover:opacity-90"
        style={{
          backgroundColor: TERRA,
          color: "#FFFFFF",
          padding: "14px",
          borderRadius: 0,
          fontFamily: ARIAL,
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        Ajouter au panier
      </button>
      <p style={{ fontFamily: ARIAL, fontSize: 10, fontStyle: "italic", color: "#888780", marginTop: 8, textAlign: "center" }}>
        Expédié sous 48h · Emballage soigné
      </p>

      {/* BLOCK 11 — Cross-sell (remonté) */}
      <div style={{ marginTop: 32 }}>
        <p
          style={{
            fontFamily: ARIAL,
            fontSize: 9,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: TERRA,
            marginBottom: 16,
          }}
        >
          On porte aussi
        </p>
        <div className="grid grid-cols-3 gap-3 mb-10">
          {crossSell.map((p) => (
            <Link key={p.id} to={`/shop/${p.id}`} className="block group">
              <div className="aspect-[3/4] overflow-hidden bg-white mb-2">
                <img
                  src={getImage(p.image)}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p style={{ fontFamily: ARIAL, fontSize: 11, color: "#1A1A1A", lineHeight: 1.4 }}>{p.name}</p>
              <p style={{ fontFamily: ARIAL, fontSize: 11, color: "#888780", marginTop: 2 }}>€{p.price}</p>
            </Link>
          ))}
        </div>
      </div>


      {/* BLOCKS 7-10 — Collapsibles */}
      <Collapsible title="Histoire de la pierre" highlight>
        <p style={bodyStyle}>
          Chaque pierre de ce collier a été choisie pour sa singularité.
          {stones[0] ? ` La ${stones[0].name.toLowerCase()}, extraite de gisements rares, ` : " Issues de mines naturelles, ces pierres "}
          traverse les époques comme un symbole. Les artisans qui la travaillent
          perpétuent un savoir-faire transmis sur plusieurs générations.
          Chaque inclusion, chaque variation de teinte est unique — aucune pièce
          ne ressemble à une autre. C'est cette imperfection naturelle qui fait
          la beauté et l'âme du bijou.
        </p>
      </Collapsible>

      <Collapsible title="Composition & savoir-faire">
        <ul style={{ ...bodyStyle, listStyle: "none", padding: 0 }}>
          <li>· Matière principale : {stones.length ? stones.map((s) => s.name.toLowerCase()).join(", ") + " naturelles" : "Pierres naturelles"}</li>
          <li>· Monture : Acier doré à l'or fin</li>
          <li>· Fabrication : Assemblage à la main, Paris</li>
          <li>· Créée en collaboration avec Marque Blanche</li>
          <li>· Longueur ajustable : 42 — 48 cm</li>
        </ul>
      </Collapsible>

      <Collapsible title="Livraison & retour">
        <ul style={{ ...bodyStyle, listStyle: "none", padding: 0 }}>
          <li>· Livraison standard : 3 à 5 jours ouvrés</li>
          <li>· Livraison express : 24h disponible</li>
          <li>· Livraison offerte dès 100€ d'achat</li>
          <li>· Retours acceptés sous 14 jours</li>
          <li>· La pièce doit être retournée dans son emballage d'origine, non portée</li>
        </ul>
      </Collapsible>

      <Collapsible title="Vertus de la pierre" highlight>
        {stones.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }} className="space-y-4">
            {stones.map((s) => (
              <li key={s.key}>
                <p
                  style={{
                    fontFamily: ARIAL,
                    fontSize: 9,
                    letterSpacing: "0.15em",
                    color: TERRA,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  {s.name}
                </p>
                <p style={{ ...bodyStyle, fontStyle: "italic", margin: 0 }}>{s.meaning}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ ...bodyStyle, fontStyle: "italic" }}>{product.stoneMeaning}</p>
        )}
      </Collapsible>

      <div style={{ borderTop: "0.5px solid #E8D8C8", marginBottom: 32 }} />




      {/* BLOCK 12 — UGC */}
      <div style={{ backgroundColor: "#FAF7F2", padding: 20, marginLeft: -32, marginRight: -32, marginBottom: 32 }}>
        <p
          style={{
            fontFamily: ARIAL,
            fontSize: 9,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "#1A1A1A",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          Comme vu sur <Instagram size={14} strokeWidth={1.2} />
        </p>
        <div className="grid grid-cols-4 gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-square flex items-center justify-center text-center"
              style={{
                backgroundColor: "#FFFFFF",
                border: "0.5px dashed #E8D8C8",
                fontFamily: ARIAL,
                fontSize: 9,
                color: "#B4A99A",
                fontStyle: "italic",
                padding: 8,
                lineHeight: 1.4,
              }}
            >
              [Photo cliente @lovcicov.paris à ajouter]
            </div>
          ))}
        </div>
      </div>

      {/* BLOCK 13 — Reviews */}
      <div className="mb-8 text-center">
        <p
          style={{
            fontFamily: ARIAL,
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "#1A1A1A",
            marginBottom: 12,
          }}
        >
          Avis clients
        </p>
        <div className="flex justify-center gap-1 mb-3" style={{ color: TERRA }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} size={14} fill={TERRA} strokeWidth={0} />
          ))}
        </div>
        <p style={{ ...bodyStyle, marginBottom: 6 }}>Les premiers avis arrivent bientôt.</p>
        <p style={{ fontFamily: ARIAL, fontSize: 10, fontStyle: "italic", color: "#B4A99A" }}>
          Objectif : 30 avis vérifiés par pièce phare
        </p>
      </div>

      {/* BLOCK 14 — Secure payment footer */}
      <div
        style={{
          backgroundColor: "#FAF7F2",
          borderTop: "0.5px solid #E8E4DC",
          padding: "16px 12px",
          marginLeft: -32,
          marginRight: -32,
          marginBottom: -32,
        }}
      >
        <div
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
          style={{ fontFamily: ARIAL, fontSize: 11, color: "#888780" }}
        >
          <span>🔒 Paiement 100% sécurisé</span>
          <span>💳 Visa · Mastercard · Apple Pay</span>
          <span>🇫🇷 Marque française · Fait à Paris</span>
          <span>♻️ Very Slow Fashion · Anti fast-fashion</span>
        </div>
      </div>
    </div>
  );
};

export default StoneLovProductPanel;
