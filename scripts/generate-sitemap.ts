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

/** Handles/ids masqués depuis l'admin — exclus du plan du site. */
async function loadHiddenKeys(): Promise<Set<string>> {
  try {
    const url = process.env.VITE_SUPABASE_URL;
    const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) return new Set();
    const res = await fetch(
      `${url}/rest/v1/product_visibility?select=product_handle,visible&visible=eq.false`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } },
    );
    if (!res.ok) return new Set();
    const rows = (await res.json()) as Array<{ product_handle: string }>;
    return new Set(rows.map((r) => r.product_handle));
  } catch {
    return new Set();
  }
}

// Product entries from local catalog
async function loadProductEntries(): Promise<SitemapEntry[]> {
  try {
    const mod = await import("../src/data/products");
    const hidden = await loadHiddenKeys();
    const all = ((mod as any).allProducts ?? (mod as any).products) as Array<{ id: string; shopifyHandle?: string }>;
    const products = (all || []).filter(
      (p) => !hidden.has(`local:${p.id}`) && !(p.shopifyHandle && hidden.has(`shopify:${p.shopifyHandle}`)),
    );
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

// Magazine article entries
async function loadMagazineEntries(): Promise<SitemapEntry[]> {
  try {
    const mod = await import("../src/data/magazine");
    const articles = (mod as any).magazineArticles as Array<{ slug: string }>;
    return (articles || []).map(a => ({
      path: `/magazine/${a.slug}`,
      changefreq: "monthly" as const,
      priority: "0.6",
    }));
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
  const entries = [
    ...staticEntries,
    ...(await loadProductEntries()),
    ...(await loadMagazineEntries()),
  ];
  writeFileSync(resolve("public/sitemap.xml"), xml(entries));
  console.log(`sitemap.xml written (${entries.length} entries)`);
})();
