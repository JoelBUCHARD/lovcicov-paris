// Runs before `vite dev` and `vite build`; writes public/sitemap.xml.
import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://lovcicov.com";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/shop", changefreq: "weekly", priority: "0.9" },
  { path: "/powerlov", changefreq: "weekly", priority: "0.9" },
  { path: "/powerlov/shop", changefreq: "weekly", priority: "0.8" },
  { path: "/mysticlov", changefreq: "weekly", priority: "0.9" },
  { path: "/mysticlov/shop", changefreq: "weekly", priority: "0.8" },
  { path: "/stonelov", changefreq: "weekly", priority: "0.9" },
  { path: "/stonelov/shop", changefreq: "weekly", priority: "0.8" },
  { path: "/collections/powerlov", changefreq: "weekly", priority: "0.8" },
  { path: "/collections/mystic-lov", changefreq: "weekly", priority: "0.8" },
  { path: "/collections/bijoux", changefreq: "weekly", priority: "0.8" },
  { path: "/collections/t-shirts", changefreq: "weekly", priority: "0.8" },
  { path: "/collections/standards", changefreq: "weekly", priority: "0.7" },
  { path: "/sacs", changefreq: "monthly", priority: "0.7" },
  { path: "/manifeste", changefreq: "monthly", priority: "0.6" },
  { path: "/fondatrice", changefreq: "monthly", priority: "0.6" },
  { path: "/univers", changefreq: "monthly", priority: "0.6" },
  { path: "/le-cercle", changefreq: "monthly", priority: "0.5" },
  { path: "/drops", changefreq: "monthly", priority: "0.5" },
  { path: "/search", changefreq: "weekly", priority: "0.4" },
  { path: "/magazine", changefreq: "weekly", priority: "0.8" },
  { path: "/journal/sacs-cuir-tresse", changefreq: "monthly", priority: "0.5" },
  { path: "/journal/sacs-choisir-couleur", changefreq: "monthly", priority: "0.5" },
  { path: "/journal/sacs-histoire-big-lov", changefreq: "monthly", priority: "0.5" },
  { path: "/mentions-legales", changefreq: "yearly", priority: "0.2" },
  { path: "/confidentialite", changefreq: "yearly", priority: "0.2" },
  { path: "/livraison-retours", changefreq: "yearly", priority: "0.2" },
  { path: "/cgv", changefreq: "yearly", priority: "0.2" },
];

// Product entries from local catalog
async function loadProductEntries(): Promise<SitemapEntry[]> {
  try {
    const mod = await import("../src/data/products");
    const products = (mod as any).products as Array<{ id: string; shopifyHandle?: string }>;
    const seen = new Set<string>();
    const entries: SitemapEntry[] = [];
    for (const p of products || []) {
      const idPath = `/shop/${p.id}`;
      if (!seen.has(idPath)) {
        seen.add(idPath);
        entries.push({ path: idPath, changefreq: "monthly", priority: "0.7" });
      }
      if (p.shopifyHandle) {
        const hPath = `/product/${p.shopifyHandle}`;
        if (!seen.has(hPath)) {
          seen.add(hPath);
          entries.push({ path: hPath, changefreq: "monthly", priority: "0.7" });
        }
      }
    }
    return entries;
  } catch {
    return [];
  }
}

function xml(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
    ``,
  ].join("\n");
}

(async () => {
  const entries = [...staticEntries, ...(await loadProductEntries())];
  writeFileSync(resolve("public/sitemap.xml"), xml(entries));
  console.log(`sitemap.xml written (${entries.length} entries)`);
})();
