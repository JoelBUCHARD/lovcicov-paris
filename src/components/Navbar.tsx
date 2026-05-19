import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, User, ChevronDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useCartStore } from '@/stores/cartStore';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [universOpen, setUniversOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const shopifyTotalItems = useCartStore(state => state.totalItems);
  const totalItems = shopifyTotalItems();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsLoggedIn(!!session);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card">
      {/* Top bar */}
      <div className="border-b border-border">
        <div className="flex items-center justify-between px-6 md:px-10 py-4">
          {/* Left icons */}
          <div className="hidden md:flex items-center gap-4 w-40">
          </div>

          {/* Center logo */}
          <Link to="/" className="flex flex-col items-center text-center" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="text-brand-lg text-lg md:text-xl tracking-[0.2em] text-foreground">LOVCICOV</span>
            <span className="text-[8px] md:text-[9px] tracking-[0.2em] text-muted-foreground mt-[-2px]">PARIS</span>
          </Link>

          {/* Right icons */}
          <div className="flex items-center gap-4 w-40 justify-end">
            <Link to={isLoggedIn ? '/account' : '/auth'} className="hidden md:block hover:opacity-60 transition-opacity">
              <User size={18} strokeWidth={1.5} />
            </Link>
            <Link to="/cart" className="hover:opacity-60 transition-opacity relative">
              <ShoppingBag size={18} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              className="md:hidden hover:opacity-60 transition-opacity"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop navigation */}
      <nav className="hidden md:flex items-center justify-center gap-10 py-3 border-b border-border/50">
        <Link
          to="/"
          className={`text-brand text-[10px] tracking-[0.12em] text-muted-foreground transition-colors hover:text-fuchsia ${
            location.pathname === '/' ? 'opacity-100' : 'opacity-70'
          }`}
        >
          Accueil
        </Link>

        <Link
          to="/shop?collection=standard"
          className="text-brand text-[10px] tracking-[0.12em] text-muted-foreground transition-colors hover:text-gray-400"
        >
          PowerLov
        </Link>

        <Link
          to="/shop?collection=mystic"
          className="text-brand text-[10px] tracking-[0.12em] text-muted-foreground transition-colors hover:text-purple-400"
        >
          MysticLov
        </Link>

        <Link
          to="/shop?collection=bijoux"
          className="text-brand text-[10px] tracking-[0.12em] text-muted-foreground transition-colors hover:text-[#C4654A]"
        >
          StoneLov
        </Link>

        {/* Univers dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setUniversOpen(true)}
          onMouseLeave={() => setUniversOpen(false)}
        >
          <button
            className={`text-brand text-[10px] tracking-[0.12em] text-muted-foreground transition-colors hover:text-fuchsia flex items-center gap-1 ${
              location.pathname === '/manifeste' || location.pathname === '/fondatrice' || location.pathname === '/drops' ? 'opacity-100' : 'opacity-70'
            }`}
          >
            Univers
            <ChevronDown size={10} strokeWidth={2} className={`transition-transform ${universOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {universOpen && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-background border border-border shadow-lg min-w-[180px]"
              >
                <Link
                  to="/manifeste"
                  className="block px-6 py-3 text-brand text-[11px] tracking-[0.1em] text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
                >
                  Manifeste
                </Link>
                <Link
                  to="/fondatrice"
                  className="block px-6 py-3 text-brand text-[11px] tracking-[0.1em] text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
                >
                  La Fondatrice
                </Link>
                <Link
                  to="/drops"
                  className="block px-6 py-3 text-brand text-[11px] tracking-[0.1em] text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
                >
                  Drops
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="flex flex-col px-6 py-8 gap-5">
              <Link to="/" className="text-brand text-[10px] tracking-[0.12em] text-muted-foreground hover:text-fuchsia transition-colors" onClick={() => setIsOpen(false)}>
                Accueil
              </Link>
              <Link to="/shop?collection=standard" className="text-brand text-[10px] tracking-[0.12em] text-muted-foreground hover:text-fuchsia transition-colors" onClick={() => setIsOpen(false)}>
                PowerLov
              </Link>
              <Link to="/shop?collection=mystic" className="text-brand text-[10px] tracking-[0.12em] text-muted-foreground hover:text-fuchsia transition-colors" onClick={() => setIsOpen(false)}>
                MysticLov
              </Link>
              <Link to="/shop?collection=bijoux" className="text-brand text-[10px] tracking-[0.12em] text-muted-foreground hover:text-fuchsia transition-colors" onClick={() => setIsOpen(false)}>
                StoneLov
              </Link>
              <p className="text-brand text-[10px] text-muted-foreground/50 tracking-[0.2em] mt-2">Univers</p>
              <Link to="/manifeste" className="text-brand text-[10px] tracking-[0.12em] text-muted-foreground hover:text-fuchsia transition-colors pl-4" onClick={() => setIsOpen(false)}>
                Manifeste
              </Link>
              <Link to="/fondatrice" className="text-brand text-[10px] tracking-[0.12em] text-muted-foreground hover:text-fuchsia transition-colors pl-4" onClick={() => setIsOpen(false)}>
                La Fondatrice
              </Link>
              <Link to="/drops" className="text-brand text-[10px] tracking-[0.12em] text-muted-foreground hover:text-fuchsia transition-colors pl-4" onClick={() => setIsOpen(false)}>
                Drops
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Trust bar */}
      <div className="w-full bg-[#F5F0E8] border-b border-[#E8E4DD]">
        <div className="flex items-center justify-center gap-3 md:gap-6 py-2.5 px-4 flex-wrap">
          {[
            'Livraison offerte dès 150€',
            'Paiement sécurisé',
            'Retours sous 14 jours',
            'Service client disponible',
          ].map((item, i) => (
            <div key={item} className="flex items-center gap-3 md:gap-6">
              {i > 0 && (
                <span className="hidden md:inline-block w-px h-3 bg-[#C9B99A]" />
              )}
              <span className="text-[9px] tracking-[0.15em] uppercase text-[#8B7D6B] font-light whitespace-nowrap">
                ✦ {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
