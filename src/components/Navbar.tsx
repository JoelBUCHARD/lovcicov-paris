import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, User, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useCartStore } from '@/stores/cartStore';
import { useCart } from '@/context/CartContext';
import { prefetchRoute } from '@/lib/prefetch';
import lovcicovLogo from '@/assets/lovcicov-logo.png';

const primaryLinks = [
  { to: '/powerlov', label: 'PowerLov' },
  { to: '/mysticlov', label: 'MysticLov' },
  { to: '/stonelov', label: 'StoneLov' },
  { to: '/sacs', label: 'LOVBAG' },
];

const universLinks = [
  { to: '/manifeste', label: 'Manifeste' },
  { to: '/fondatrice', label: 'La Fondatrice' },
  
  // { to: '/drops', label: 'Drops' }, // temporairement caché
  { to: '/le-cercle', label: 'Le Cercle' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [universOpen, setUniversOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const shopifyItems = useCartStore(state => state.items);
  const shopifyTotalItems = shopifyItems.reduce((sum, i) => sum + i.quantity, 0);
  const { totalItems: localTotalItems } = useCart();
  const totalItems = shopifyTotalItems + localTotalItems;

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsLoggedIn(!!session);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setUniversOpen(false);
  }, [location.pathname]);

  const iconClass = 'hover:opacity-60 transition-opacity focus-visible:outline-none focus-visible:opacity-60';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm transition-[padding,box-shadow,border-color] duration-500 ease-out ${
        scrolled ? 'border-b border-border/60 shadow-[0_1px_0_rgba(0,0,0,0.02)]' : 'border-b border-transparent'
      }`}
    >
      {/* Top bar */}
      <div
        className={`flex items-center justify-between px-6 md:px-12 lg:px-16 transition-[padding] duration-500 ease-out ${
          scrolled ? 'py-3 md:py-4' : 'py-5 md:py-7'
        }`}
      >
        {/* Left icons */}
        <div className="flex items-center gap-6 flex-1">
          <button
            className={`md:hidden ${iconClass}`}
            onClick={() => setIsOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <Menu size={18} strokeWidth={1.25} />
          </button>
          <Link
            to="/search"
            onMouseEnter={() => prefetchRoute('/search')}
            className={`hidden md:block ${iconClass}`}
            aria-label="Rechercher"
          >
            <Search size={17} strokeWidth={1.25} />
          </Link>
        </div>

        {/* Center logo */}
        <Link
          to="/"
          className="flex items-center justify-center focus-visible:outline-none"
          aria-label="LOVCICOV Paris — Accueil"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            src={lovcicovLogo}
            alt="LOVCICOV Paris"
            className={`w-auto transition-[height] duration-500 ease-out ${
              scrolled ? 'h-7 md:h-8' : 'h-9 md:h-11'
            }`}
          />
        </Link>

        {/* Right icons */}
        <div className="flex items-center gap-5 md:gap-6 flex-1 justify-end">
          <Link
            to={isLoggedIn ? '/account' : '/auth'}
            onMouseEnter={() => prefetchRoute(isLoggedIn ? '/account' : '/auth')}
            className={`hidden md:block ${iconClass}`}
            aria-label={isLoggedIn ? 'Mon compte' : 'Se connecter'}
          >
            <User size={17} strokeWidth={1.25} />
          </Link>
          <Link
            to="/cart"
            onMouseEnter={() => prefetchRoute('/cart')}
            className={`relative ${iconClass}`}
            aria-label={`Panier${totalItems > 0 ? ` (${totalItems} articles)` : ''}`}
          >
            <ShoppingBag size={17} strokeWidth={1.25} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 text-[9px] tracking-normal text-foreground font-light">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Desktop navigation */}
      <nav
        aria-label="Navigation principale"
        className={`hidden md:flex items-center justify-center gap-12 lg:gap-16 transition-[padding,opacity] duration-500 ease-out ${
          scrolled ? 'pb-3 opacity-90' : 'pb-5 opacity-100'
        }`}
      >
        {primaryLinks.map(({ to, label }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              onMouseEnter={() => prefetchRoute(to)}
              className="group relative py-1"
            >
              <span
                className={`text-[10px] tracking-[0.24em] uppercase font-medium transition-colors ${
                  isActive ? 'text-foreground' : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {label}
              </span>
              <span
                className={`pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-px bg-foreground transition-[width] duration-500 ease-out ${
                  isActive ? 'w-6' : 'w-0 group-hover:w-6'
                }`}
              />
            </Link>
          );
        })}

        {/* Univers dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setUniversOpen(true)}
          onMouseLeave={() => setUniversOpen(false)}
        >
          <button
            className="text-[10px] tracking-[0.24em] uppercase font-medium text-foreground/60 hover:text-foreground transition-colors py-1"
            aria-haspopup="true"
            aria-expanded={universOpen}
          >
            Univers
          </button>

          <AnimatePresence>
            {universOpen && (
              <motion.div
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 2 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-full left-1/2 -translate-x-1/2 pt-4 min-w-[200px]"
              >
                <div className="bg-card border border-border/60 py-2">
                  {universLinks.map(({ to, label }) => (
                    <Link
                      key={to}
                      to={to}
                      className="block px-6 py-2.5 text-[10px] tracking-[0.2em] uppercase font-medium text-foreground/60 hover:text-foreground transition-colors text-center"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Mobile menu — full screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-50 bg-card"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-border/60">
              <Link to="/search" onClick={() => setIsOpen(false)} aria-label="Rechercher">
                <Search size={18} strokeWidth={1.25} />
              </Link>
              <img src={lovcicovLogo} alt="LOVCICOV Paris" className="h-8 w-auto" />
              <button onClick={() => setIsOpen(false)} aria-label="Fermer le menu">
                <X size={20} strokeWidth={1.25} />
              </button>
            </div>

            <nav
              aria-label="Navigation mobile"
              className="flex flex-col px-8 pt-12 pb-10 overflow-y-auto h-[calc(100vh-73px)]"
            >
              {/* Collections */}
              <p className="text-[10px] tracking-[0.24em] uppercase text-muted-foreground/60 mb-6">
                Collections
              </p>
              <div className="flex flex-col">
                {primaryLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setIsOpen(false)}
                    className="text-[15px] tracking-[0.18em] uppercase font-medium text-foreground py-4 border-b border-border/40 hover:text-fuchsia transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>

              {/* Univers */}
              <p className="text-[10px] tracking-[0.24em] uppercase text-muted-foreground/60 mt-10 mb-6">
                Univers
              </p>
              <div className="flex flex-col">
                {universLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setIsOpen(false)}
                    className="text-[13px] tracking-[0.16em] uppercase font-normal text-foreground/80 py-3.5 border-b border-border/40 hover:text-fuchsia transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>

              {/* Compte */}
              <p className="text-[10px] tracking-[0.24em] uppercase text-muted-foreground/60 mt-10 mb-6">
                Compte
              </p>
              <Link
                to={isLoggedIn ? '/account' : '/auth'}
                onClick={() => setIsOpen(false)}
                className="text-[13px] tracking-[0.16em] uppercase font-normal text-foreground/80 py-3.5 border-b border-border/40 hover:text-fuchsia transition-colors flex items-center gap-3"
              >
                <User size={14} strokeWidth={1.25} />
                {isLoggedIn ? 'Mon compte' : 'Se connecter'}
              </Link>
            </nav>

          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
