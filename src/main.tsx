import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";

// Recover from stale lazy chunks after a redeploy: when a dynamic import
// fails (module script 404s because the hashed file no longer exists),
// force a one-time reload so the browser fetches the new index.html.
const RELOAD_KEY = "__chunk_reload_at__";
const shouldReload = () => {
  const last = Number(sessionStorage.getItem(RELOAD_KEY) || 0);
  return Date.now() - last > 10_000;
};
const handleChunkError = (e: Event | PromiseRejectionEvent) => {
  const msg = String(
    (e as PromiseRejectionEvent).reason?.message ||
      (e as any).message ||
      ""
  );
  if (
    /Importing a module script failed|Failed to fetch dynamically imported module|Loading chunk .* failed|error loading dynamically imported module/i.test(
      msg
    ) &&
    shouldReload()
  ) {
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
    window.location.reload();
  }
};
window.addEventListener("error", handleChunkError);
window.addEventListener("unhandledrejection", handleChunkError);


// Le catalogue Shopify (prix, type, disponibilité, variantes) est chargé
// AVANT le rendu : il est la source de vérité du site.
import { loadShopifyCatalog } from "./lib/shopifyCatalog";

const withTimeout = (p: Promise<void>, ms: number) =>
  Promise.race([p, new Promise<void>((r) => setTimeout(r, ms))]);

withTimeout(loadShopifyCatalog(), 8000).then(async () => {
  const { default: App } = await import("./App.tsx");
  createRoot(document.getElementById("root")!).render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
});
