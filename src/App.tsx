import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useCartSync } from "./hooks/useCartSync";
import { CartProvider } from "./context/CartContext";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import ShopifyProductDetail from "./pages/ShopifyProductDetail";
import Manifeste from "./pages/Manifeste";
import Fondatrice from "./pages/Fondatrice";
import Drops from "./pages/Drops";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import CollectionStandards from "./pages/CollectionStandards";
import CollectionMystic from "./pages/CollectionMystic";
import MysticLovEditorial from "./pages/MysticLovEditorial";
import StoneLovEditorial from "./pages/StoneLovEditorial";
import CollectionBijoux from "./pages/CollectionBijoux";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import MentionsLegales from "./pages/MentionsLegales";
import Confidentialite from "./pages/Confidentialite";
import LivraisonRetours from "./pages/LivraisonRetours";
import NewsletterPopup from "./components/NewsletterPopup";
import CookieBanner from "./components/CookieBanner";

const queryClient = new QueryClient();

// Pages whose scroll position should be remembered when navigating away
// (e.g. clicking a product) and restored on return (e.g. browser back).
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
    // Save scroll position of the page we are leaving, if it's tracked.
    if (prevPathname && prevPathname !== pathname && SCROLL_MEMORY_PATHS.includes(prevPathname)) {
      try {
        sessionStorage.setItem(scrollKey(prevPathname), String(window.scrollY));
      } catch {}
    }
    (ScrollToTop as any)._prev = pathname;

    // If the new page is tracked and has a saved position, restore it.
    if (SCROLL_MEMORY_PATHS.includes(pathname)) {
      const saved = (() => {
        try { return sessionStorage.getItem(scrollKey(pathname)); } catch { return null; }
      })();
      if (saved !== null) {
        const y = parseInt(saved, 10) || 0;
        // Defer to next frame so content has a chance to mount.
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
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ProductDetail />} />
        <Route path="/product/:handle" element={<ShopifyProductDetail />} />
        <Route path="/collections/standards" element={<CollectionStandards />} />
        <Route path="/collections/mystic-lov" element={<CollectionMystic />} />
        <Route path="/mysticlov" element={<MysticLovEditorial />} />
        <Route path="/mysticlov/shop" element={<CollectionMystic />} />
        <Route path="/stonelov" element={<StoneLovEditorial />} />
        <Route path="/stonelov/shop" element={<Shop />} />
        <Route path="/collections/bijoux" element={<CollectionBijoux />} />
        <Route path="/manifeste" element={<Manifeste />} />
        <Route path="/univers" element={<Fondatrice />} />
        <Route path="/drops" element={<Drops />} />
        <Route path="/fondatrice" element={<Fondatrice />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/account" element={<Account />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/confidentialite" element={<Confidentialite />} />
        <Route path="/livraison-retours" element={<LivraisonRetours />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
