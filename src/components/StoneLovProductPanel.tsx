import { useState } from "react";
import { Plus, Minus, Loader2 } from "lucide-react";
import { Product, bijouxProducts } from "@/data/products";
import { detectStones } from "@/data/stoneMeanings";
import { useCart } from "@/context/CartContext";
import { useCartStore } from "@/stores/cartStore";
import { fetchShopifyProductByHandle } from "@/lib/shopify";
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
  const addShopifyItem = useCartStore((s) => s.addItem);
  const [isAdding, setIsAdding] = useState(false);
  const stones = detectStones(`${product.name} ${product.description} ${product.details ?? ""}`);

  const handleAdd = async () => {
    if (!product.shopifyHandle) {
      addToCart(product);
      toast({ title: "Ajouté au panier", description: product.name });
      return;
    }
    setIsAdding(true);
    try {
      const sp = await fetchShopifyProductByHandle(product.shopifyHandle);
      if (!sp) {
        toast({ title: "Produit indisponible", description: "Réessayez dans un instant." });
        return;
      }
      const variants = sp.variants.edges.map((e) => e.node);
      const variant = variants.find((v) => v.availableForSale) || variants[0];
      if (!variant) {
        toast({ title: "Aucune variante disponible" });
        return;
      }
      await addShopifyItem({
        product: { node: sp },
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
        selectedOptions: variant.selectedOptions,
      });
      toast({ title: "Ajouté au panier", description: product.name });
    } catch (err) {
      console.error("Add to cart failed", err);
      toast({ title: "Erreur", description: "Impossible d'ajouter au panier." });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div style={{ backgroundColor: PEACH_BG }} className="p-8 md:p-12">
      {/* BLOCK 2 — Title + subtitle */}
      <h1 style={{ fontFamily: ARIAL, fontSize: 22, fontWeight: 300, color: "#1A1A1A" }}>
        {product.name}
      </h1>

      {/* BLOCK 3 — Price + payment */}
      <p style={{ fontFamily: ARIAL, fontSize: 20, fontWeight: 700, color: "#1A1A1A", marginTop: 24 }}>€{product.price}</p>
      <p style={{ fontFamily: ARIAL, fontSize: 11, fontStyle: "italic", color: "#888780", marginTop: 4 }}>
        4x sans frais avec Alma
      </p>

      {/* BLOCK 4 — Product info */}
      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <p style={{ fontFamily: ARIAL, fontSize: 11, color: "#5F5E5A", lineHeight: 1.9 }}>
          Monture en laiton doré
        </p>
        <p style={{ fontFamily: ARIAL, fontSize: 11, color: "#5F5E5A", lineHeight: 1.9 }}>
          Pierre naturelle
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
          Livraison offerte dès 100€&nbsp; · &nbsp;Retours 14 jours
        </p>
      </div>


      {/* BLOCK 5 skipped — jewelry, no sizes */}

      {/* BLOCK 6 — Add to cart */}
      <button
        onClick={handleAdd}
        disabled={isAdding}
        className="w-full transition-colors hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-60"
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
        {isAdding ? <Loader2 size={14} className="animate-spin" /> : "Ajouter au panier"}
      </button>

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
          <li>· Monture : Laiton doré à la main</li>
          <li>· Longueur ajustable : 42 — 48 cm</li>
        </ul>
      </Collapsible>


      <Collapsible title="Livraison & retour">
        <ul style={{ ...bodyStyle, listStyle: "none", padding: 0 }}>
          <li>· Livraison standard : 3 à 5 jours ouvrés</li>
          <li>· Livraison express : 24h disponible</li>
          
          <li>· Retours acceptés sous 14 jours</li>
          <li>· La pièce doit être retournée dans son emballage d'origine, non portée</li>
        </ul>
      </Collapsible>

      <Collapsible title="L'énergie de cette pierre" highlight>
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
