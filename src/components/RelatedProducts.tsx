import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { products as localProducts, Product } from "@/data/products";

const imageModulesJpg = import.meta.glob("@/assets/*.jpg", { eager: true, import: "default" }) as Record<string, string>;
const imageModulesWebp = import.meta.glob("@/assets/*.webp", { eager: true, import: "default" }) as Record<string, string>;
const imageModulesPng = import.meta.glob("@/assets/*.png", { eager: true, import: "default" }) as Record<string, string>;
const imageModules = { ...imageModulesJpg, ...imageModulesWebp, ...imageModulesPng };
const resolveAsset = (key: string) => {
  const match = Object.entries(imageModules).find(([path]) => path.includes(key));
  return match ? match[1] : key;
};

export type Universe = "powerlov" | "mysticlov" | "stonelov";

const UNIVERSE_LABEL: Record<Universe, string> = {
  powerlov: "POWERLOV",
  mysticlov: "MYSTICLOV",
  stonelov: "STONELOV",
};
const UNIVERSE_COLOR: Record<Universe, string> = {
  powerlov: "#1A1A1A",
  mysticlov: "#E66060",
  stonelov: "#C4714A",
};
const UNIVERSE_BG: Record<Universe, string> = {
  powerlov: "#FAF7F2",
  mysticlov: "#FAF7F2",
  stonelov: "#FDF5EF",
};

const STORAGE_KEY = "lovcicov_recently_viewed";
const MAX_STORED = 6;

export interface ViewedItem {
  key: string; // unique
  name: string;
  price: string; // formatted, no currency symbol
  image: string; // resolved URL
  universe: Universe;
  link: string;
  inStock?: boolean;
}

const collectionToUniverse = (c: Product["collection"]): Universe =>
  c === "standard" ? "powerlov" : c === "mystic" ? "mysticlov" : "stonelov";

const localProductToViewed = (p: Product): ViewedItem => ({
  key: `local:${p.id}`,
  name: p.name,
  price: String(p.price),
  image: resolveAsset(p.image),
  universe: collectionToUniverse(p.collection),
  link: `/shop/${p.id}`,
  inStock: true,
});

const readStorage = (): ViewedItem[] => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
};

const writeStorage = (items: ViewedItem[]) => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_STORED)));
  } catch {}
};

export const trackViewedProduct = (item: ViewedItem) => {
  if (typeof window === "undefined") return;
  const current = readStorage().filter((x) => x.key !== item.key);
  writeStorage([item, ...current]);
};

interface Props {
  currentKey: string;
  currentUniverse: Universe;
}

const RelatedProducts = ({ currentKey, currentUniverse }: Props) => {
  const [viewed, setViewed] = useState<ViewedItem[]>([]);

  useEffect(() => {
    setViewed(readStorage());
  }, [currentKey]);

  const recommendations = useMemo<ViewedItem[]>(() => {
    const out: ViewedItem[] = [];
    const seen = new Set<string>([currentKey]);

    // Priority 1: recently viewed (any universe)
    for (const v of viewed) {
      if (out.length >= 3) break;
      if (seen.has(v.key)) continue;
      out.push(v);
      seen.add(v.key);
    }

    // Priority 2: same universe from local products
    if (out.length < 3) {
      const sameUni = localProducts
        .filter((p) => collectionToUniverse(p.collection) === currentUniverse)
        .map(localProductToViewed)
        .filter((p) => !seen.has(p.key));
      for (const p of sameUni) {
        if (out.length >= 3) break;
        out.push(p);
        seen.add(p.key);
      }
    }

    // Priority 3: fallback — any universe from local products
    if (out.length < 3) {
      const rest = localProducts
        .map(localProductToViewed)
        .filter((p) => !seen.has(p.key));
      for (const p of rest) {
        if (out.length >= 3) break;
        out.push(p);
        seen.add(p.key);
      }
    }

    return out.slice(0, 3);
  }, [viewed, currentKey, currentUniverse]);

  if (recommendations.length === 0) return null;

  return (
    <section
      style={{
        backgroundColor: UNIVERSE_BG[currentUniverse],
        borderTop: "0.5px solid #E8E4DC",
        padding: "40px 0",
      }}
    >
      <h2
        className="text-center"
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "10px",
          color: "#1A1A1A",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: "40px",
        }}
      >
        Vous aimerez aussi
      </h2>

      <div className="px-6 md:px-12">
        <div
          className="
            flex md:grid md:grid-cols-3 gap-6
            overflow-x-auto md:overflow-visible
            snap-x snap-mandatory md:snap-none
            -mx-6 px-6 md:mx-0 md:px-0
          "
          style={{ gap: "24px" }}
        >
          {recommendations.map((p) => (
            <Link
              key={p.key}
              to={p.link}
              className="group block snap-start shrink-0 md:shrink"
              style={{ width: "70%", maxWidth: "100%" }}
            >
              <div className="md:w-full" style={{ width: "100%" }}>
                <div
                  className="overflow-hidden bg-secondary"
                  style={{ aspectRatio: "1 / 1" }}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <p
                  className="text-center"
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: "12px",
                    color: "#1A1A1A",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginTop: "12px",
                  }}
                >
                  {p.name}
                </p>
                <p
                  className="text-center"
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: "9px",
                    color: UNIVERSE_COLOR[p.universe],
                    letterSpacing: "0.15em",
                    marginTop: "4px",
                  }}
                >
                  {UNIVERSE_LABEL[p.universe]}
                </p>
                <p
                  className="text-center"
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: "14px",
                    color: "#1A1A1A",
                    marginTop: "4px",
                  }}
                >
                  €{p.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
