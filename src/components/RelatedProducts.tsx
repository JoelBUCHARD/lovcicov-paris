import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { products as localProducts, Product } from "@/data/products";
import { useProductVisibility, localKey } from "@/hooks/useProductVisibility";

const imageModulesJpg = import.meta.glob("@/assets/**/*.jpg", { eager: true, import: "default" }) as Record<string, string>;
const imageModulesJpeg = import.meta.glob("@/assets/**/*.jpeg", { eager: true, import: "default" }) as Record<string, string>;
const imageModulesWebp = import.meta.glob("@/assets/**/*.webp", { eager: true, import: "default" }) as Record<string, string>;
const imageModulesPng = import.meta.glob("@/assets/**/*.png", { eager: true, import: "default" }) as Record<string, string>;
const assetJsonModules = import.meta.glob("@/assets/**/*.asset.json", { eager: true }) as Record<string, { url?: string; default?: { url?: string } }>;
const assetJsonAsImages: Record<string, string> = {};
for (const [path, mod] of Object.entries(assetJsonModules)) {
  const url = mod?.url ?? mod?.default?.url;
  if (url) assetJsonAsImages[path.replace(/\.asset\.json$/, "")] = url;
}
const imageModules = { ...imageModulesJpg, ...imageModulesJpeg, ...imageModulesWebp, ...imageModulesPng, ...assetJsonAsImages };
const resolveAsset = (key: string) => {
  const match = Object.entries(imageModules).find(([path]) => path.includes(key));
  return match ? match[1] : key;
};

export type Universe = "powerlov" | "mysticlov" | "stonelov";

const UNIVERSE_LABEL: Record<Universe, string> = {
  powerlov: "PowerLov",
  mysticlov: "MysticLov",
  stonelov: "StoneLov",
};

const UNIVERSE_COLOR: Record<Universe, string> = {
  powerlov: "#1A1A1A",
  mysticlov: "#E66060",
  stonelov: "#C4714A",
};
const UNIVERSE_BG: Record<Universe, string> = {
  powerlov: "#EDEAE4",
  mysticlov: "#EDEAE4",
  stonelov: "#EDEAE4",
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

const rehydrateViewed = (v: ViewedItem): ViewedItem => {
  if (v.image && v.image.length > 0) return v;
  // Try to re-resolve from local products (image may have been cached empty before resolver fix)
  if (v.key.startsWith("local:")) {
    const id = v.key.slice("local:".length);
    const p = localProducts.find((lp) => lp.id === id);
    if (p) return { ...v, image: resolveAsset(p.image) };
  }
  return v;
};

const readStorage = (): ViewedItem[] => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr
      .map(rehydrateViewed)
      .filter((v: ViewedItem) => {
        if (!v.image || v.image.length === 0) return false;
        // Drop viewed items that no longer exist in the catalog
        if (v.key.startsWith("local:")) {
          const id = v.key.slice("local:".length);
          return localProducts.some((lp) => lp.id === id);
        }
        return true;
      });
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
  const { isVisible } = useProductVisibility();

  useEffect(() => {
    setViewed(readStorage());
  }, [currentKey]);

  const recommendations = useMemo<ViewedItem[]>(() => {
    const out: ViewedItem[] = [];
    const seen = new Set<string>([currentKey]);

    const keep = (v: ViewedItem) => {
      if (v.key.startsWith("local:")) {
        const id = v.key.slice("local:".length);
        return isVisible(localKey(id));
      }
      return true;
    };

    // Priority 1: recently viewed (any universe)
    for (const v of viewed) {
      if (out.length >= 4) break;
      if (seen.has(v.key)) continue;
      if (!keep(v)) continue;
      out.push(v);
      seen.add(v.key);
    }

    // Priority 2: same universe from local products
    if (out.length < 4) {
      const sameUni = localProducts
        .filter((p) => collectionToUniverse(p.collection) === currentUniverse)
        .map(localProductToViewed)
        .filter((p) => !seen.has(p.key) && keep(p));
      for (const p of sameUni) {
        if (out.length >= 4) break;
        out.push(p);
        seen.add(p.key);
      }
    }

    // Priority 3: fallback — any universe from local products
    if (out.length < 4) {
      const rest = localProducts
        .map(localProductToViewed)
        .filter((p) => !seen.has(p.key) && keep(p));
      for (const p of rest) {
        if (out.length >= 4) break;
        out.push(p);
        seen.add(p.key);
      }
    }

    return out.slice(0, 4);
  }, [viewed, currentKey, currentUniverse, isVisible]);

  if (recommendations.length === 0) return null;

  return (
    <section
      style={{
        backgroundColor: UNIVERSE_BG[currentUniverse],
        borderTop: "0.5px solid #E8E4DC",
        padding: "56px 0 56px",
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

      <div className="px-6 md:px-3">
        <div
          className="
            flex md:grid md:grid-cols-4
            overflow-x-auto md:overflow-visible
            snap-x snap-mandatory md:snap-none
            -mx-6 px-6 md:mx-0 md:px-0
          "
          style={{ gap: "4px" }}
        >
          {recommendations.map((p) => (
            <Link
              key={p.key}
              to={p.link}
              className="group flex flex-col snap-start shrink-0 md:shrink md:w-auto bg-white rounded-[4px] border-[0.5px] border-solid border-[#E8D8C8] overflow-hidden w-[70%]"
            >
              <div
                className="overflow-hidden bg-secondary relative shrink-0"
                style={{ aspectRatio: "3 / 4" }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex flex-col flex-1 text-center pb-3 px-2 mt-3">
                <h3
                  className="flex-1"
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: "11px",
                    color: "#1A1A1A",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  {p.name}
                </h3>
                <p style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "#1A1A1A" }}>
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
