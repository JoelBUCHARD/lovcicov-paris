import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CartProvider } from "./context/CartContext";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Manifeste from "./pages/Manifeste";
import Fondatrice from "./pages/Fondatrice";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import CollectionStandards from "./pages/CollectionStandards";
import CollectionMystic from "./pages/CollectionMystic";
import CollectionBijoux from "./pages/CollectionBijoux";
import Auth from "./pages/Auth";
import Account from "./pages/Account";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductDetail />} />
          <Route path="/collections/standards" element={<CollectionStandards />} />
          <Route path="/collections/mystic-lov" element={<CollectionMystic />} />
          <Route path="/collections/bijoux" element={<CollectionBijoux />} />
          <Route path="/manifeste" element={<Manifeste />} />
          <Route path="/univers" element={<Fondatrice />} />
          <Route path="/fondatrice" element={<Fondatrice />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
