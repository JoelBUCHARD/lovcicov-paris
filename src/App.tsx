import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { MotionConfig, MotionGlobalConfig } from "framer-motion";

MotionGlobalConfig.skipAnimations = true;
import { useEffect, lazy, Suspense } from "react";
import { useCartSync } from "./hooks/useCartSync";
import { CartProvider } from "./context/CartContext";

// Eager: homepage + always-visible UI for fastest first paint
import Index from "./pages/Index";
import NewsletterPopup from "./components/NewsletterPopup";
import CookieBanner from "./components/CookieBanner";

// Lazy: all secondary routes are split into separate chunks.
// They will be fetched on demand (and prefetched on hover via src/lib/prefetch.ts).
const Shop = lazy(() => import("./pages/Shop"));
const SearchPage = lazy(() => import("./pages/Search"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const ShopifyProductDetail = lazy(() => import("./pages/ShopifyProductDetail"));
const Manifeste = lazy(() => import("./pages/Manifeste"));
const LeCercle = lazy(() => import("./pages/LeCercle"));
const Fondatrice = lazy(() => import("./pages/Fondatrice"));
const Drops = lazy(() => import("./pages/Drops"));
const Cart = lazy(() => import("./pages/Cart"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CollectionStandards = lazy(() => import("./pages/CollectionStandards"));
const CollectionPower = lazy(() => import("./pages/CollectionPower"));
const CollectionMystic = lazy(() => import("./pages/CollectionMystic"));
const MysticLovEditorial = lazy(() => import("./pages/MysticLovEditorial"));
const StoneLovEditorial = lazy(() => import("./pages/StoneLovEditorial"));
const PowerLovEditorial = lazy(() => import("./pages/PowerLovEditorial"));
const CampagneSac = lazy(() => import("./pages/CampagneSac")); // hidden — kept for september reactivation
const Sacs = lazy(() => import("./pages/Sacs"));
const ArticleSacsCuirTresse = lazy(() => import("./pages/articles/SacsCuirTresse"));
const ArticleSacsChoisirCouleur = lazy(() => import("./pages/articles/SacsChoisirCouleur"));
const ArticleSacsHistoireBigLov = lazy(() => import("./pages/articles/SacsHistoireBigLov"));
const CollectionBijoux = lazy(() => import("./pages/CollectionBijoux"));
const CollectionTshirts = lazy(() => import("./pages/CollectionTshirts"));
const Auth = lazy(() => import("./pages/Auth"));
const Account = lazy(() => import("./pages/Account"));
const MentionsLegales = lazy(() => import("./pages/MentionsLegales"));
const Confidentialite = lazy(() => import("./pages/Confidentialite"));
const LivraisonRetours = lazy(() => import("./pages/LivraisonRetours"));
const CGV = lazy(() => import("./pages/CGV"));
const AdminProducts = lazy(() => import("./pages/AdminProducts"));
const Magazine = lazy(() => import("./pages/Magazine"));
const MagazineArticle = lazy(() => import("./pages/MagazineArticle"));

const queryClient = new QueryClient();

const SCROLL_MEMORY_PATHS = [
  '/mysticlov',
  '/stonelov',
  '/powerlov',
  '/collections/mystic-lov',
  '/collections/powerlov',
  '/collections/stonelov',
  '/collections/standards',
  '/collections/bijoux',
  '/mysticlov/shop',
  '/stonelov/shop',
  '/shop',
];

const scrollKey = (pathname: string) => `scroll-memory:${pathname}`;

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPathname = (ScrollToTop as any)._prev as string | undefined;

  useEffect(() => {
    if (prevPathname && prevPathname !== pathname && SCROLL_MEMORY_PATHS.includes(prevPathname)) {
      try {
        sessionStorage.setItem(scrollKey(prevPathname), String(window.scrollY));
      } catch {}
    }
    (ScrollToTop as any)._prev = pathname;

    if (SCROLL_MEMORY_PATHS.includes(pathname)) {
      const saved = (() => {
        try { return sessionStorage.getItem(scrollKey(pathname)); } catch { return null; }
      })();
      if (saved !== null) {
        const y = parseInt(saved, 10) || 0;
        requestAnimationFrame(() => {
          window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior });
          try { sessionStorage.removeItem(scrollKey(pathname)); } catch {}
        });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent = () => {
  useCartSync();
  return (
    <>
      <ScrollToTop />
      <NewsletterPopup />
      <CookieBanner />
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/shop/:id" element={<ProductDetail />} />
          <Route path="/product/:handle" element={<ShopifyProductDetail />} />
          <Route path="/collections/standards" element={<CollectionStandards />} />
          <Route path="/powerlov" element={<PowerLovEditorial />} />
          <Route path="/collections/powerlov" element={<CollectionPower />} />
          <Route path="/powerlov/shop" element={<CollectionPower />} />
          <Route path="/collection/mysticlov" element={<Navigate to="/mysticlov" replace />} />
          <Route path="/collections/mystic-lov" element={<CollectionMystic />} />
          <Route path="/mysticlov" element={<MysticLovEditorial />} />
          <Route path="/mysticlov/shop" element={<CollectionMystic />} />
          <Route path="/stonelov" element={<StoneLovEditorial />} />
          <Route path="/stonelov/shop" element={<Shop />} />
          {/* /campagne-sac (LOVSAC) — temporairement masqué, redirection vers l'accueil. Réactivation prévue en septembre. */}
          <Route path="/campagne-sac" element={<Navigate to="/" replace />} />
          <Route path="/sacs" element={<Sacs />} />
          <Route path="/journal/sacs-cuir-tresse" element={<ArticleSacsCuirTresse />} />
          <Route path="/journal/sacs-choisir-couleur" element={<ArticleSacsChoisirCouleur />} />
          <Route path="/journal/sacs-histoire-big-lov" element={<ArticleSacsHistoireBigLov />} />
          <Route path="/collections/bijoux" element={<CollectionBijoux />} />
          <Route path="/collections/t-shirts" element={<CollectionTshirts />} />
          <Route path="/manifeste" element={<Manifeste />} />
          <Route path="/univers" element={<Fondatrice />} />
          <Route path="/drops" element={<Drops />} />
          <Route path="/le-cercle" element={<LeCercle />} />
          <Route path="/fondatrice" element={<Fondatrice />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/account" element={<Account />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="/livraison-retours" element={<LivraisonRetours />} />
          <Route path="/cgv" element={<CGV />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/magazine" element={<Magazine />} />
          <Route path="/magazine/:slug" element={<MagazineArticle />} />
          {/* Legacy /journal/* article routes redirect to their magazine equivalents */}
          <Route path="/journal/sacs-cuir-tresse" element={<Navigate to="/magazine/le-geste-du-cuir-tresse" replace />} />
          <Route path="/journal/sacs-choisir-couleur" element={<Navigate to="/magazine/comment-choisir-sa-couleur" replace />} />
          <Route path="/journal/sacs-histoire-big-lov" element={<Navigate to="/magazine/histoire-du-big-lov" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MotionConfig reducedMotion="always" transition={{ duration: 0 }}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </BrowserRouter>
      </TooltipProvider>
    </MotionConfig>
  </QueryClientProvider>
);

export default App;
