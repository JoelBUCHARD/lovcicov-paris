import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
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
  const headerRef = useRef<HTMLElement | null>(null);

  // Expose la hauteur réelle du header (états scrollé/non scrollé, tous breakpoints)
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    let raf = 0;
    let last = -1;
    const setVar = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = el.getBoundingClientRect().height;
        if (Math.abs(h - last) < 0.5) return;
        last = h;
        document.documentElement.style.setProperty('--header-height', `${h}px`);
      });
    };
    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    window.addEventListener('resize', setVar);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('resize', setVar);
    };
  }, []);

  const [universOpen, setUniversOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileUniversOpen, setMobileUniversOpen] = useState(false);
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
    setUniversOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  // Verrouille le scroll de la page quand le panneau mobile est ouvert
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const iconClass = 'hover:opacity-60 transition-opacity focus-visible:outline-none focus-visible:opacity-60';

  return (
    <>
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border/60"
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-6 md:px-12 lg:px-16 py-5 md:pt-7 md:pb-5"
      >
        {/* Left icons */}
        <div className="flex items-center gap-6 flex-1">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className={`md:hidden ${iconClass}`}
            aria-label="Ouvrir le menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={17} strokeWidth={1.25} />
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
            className="h-8 md:h-11 w-auto"
          />
        </Link>

        {/* Right icons */}
        <div className="flex items-center gap-4 md:gap-6 flex-1 justify-end">
          <Link
            to="/search"
            onMouseEnter={() => prefetchRoute('/search')}
            className={`md:hidden ${iconClass}`}
            aria-label="Rechercher"
          >
            <Search size={17} strokeWidth={1.25} />
          </Link>
          <Link
            to={isLoggedIn ? '/account' : '/auth'}
            onMouseEnter={() => prefetchRoute(isLoggedIn ? '/account' : '/auth')}
            className={iconClass}
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
            <ShoppingBag size={15} strokeWidth={1.25} className="md:hidden" />
            <ShoppingBag size={17} strokeWidth={1.25} className="hidden md:block" />
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
        className="hidden md:flex items-center justify-center gap-7 md:gap-12 lg:gap-16 px-6 md:px-0 pb-6"
      >
        {primaryLinks.map(({ to, label }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              onMouseEnter={() => prefetchRoute(to)}
              className="group relative py-1 shrink-0"
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
          className="relative shrink-0"
          onMouseEnter={() => setUniversOpen(true)}
          onMouseLeave={() => setUniversOpen(false)}
        >
          <button
            onClick={() => setUniversOpen(o => !o)}
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

    </header>

    {/* Panneau mobile plein écran */}
    {mobileOpen && (
      <div className="md:hidden fixed inset-0 z-[100] bg-background overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-4">
            <Link to="/search" onClick={() => setMobileOpen(false)} className={iconClass} aria-label="Rechercher">
              <Search size={17} strokeWidth={1.25} />
            </Link>
            <Link
              to={isLoggedIn ? '/account' : '/auth'}
              onClick={() => setMobileOpen(false)}
              className={iconClass}
              aria-label={isLoggedIn ? 'Mon compte' : 'Se connecter'}
            >
              <User size={17} strokeWidth={1.25} />
            </Link>
            <Link to="/cart" onClick={() => setMobileOpen(false)} className={`relative ${iconClass}`} aria-label="Panier">
              <ShoppingBag size={17} strokeWidth={1.25} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2 text-[9px] tracking-normal text-foreground font-light">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className={iconClass}
            aria-label="Fermer le menu"
          >
            <X size={18} strokeWidth={1.25} />
          </button>
        </div>

        <nav aria-label="Navigation mobile" className="flex flex-col px-6 pb-16">
          {primaryLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className="py-5 border-b border-border/50 text-[12px] tracking-[0.24em] uppercase font-medium text-foreground"
            >
              {label}
            </Link>
          ))}

          <button
            type="button"
            onClick={() => setMobileUniversOpen(o => !o)}
            className="py-5 border-b border-border/50 text-left text-[12px] tracking-[0.24em] uppercase font-medium text-foreground"
            aria-expanded={mobileUniversOpen}
          >
            Univers
          </button>
          {mobileUniversOpen && (
            <div className="flex flex-col">
              {universLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className="py-4 pl-4 border-b border-border/40 text-[11px] tracking-[0.2em] uppercase font-medium text-foreground/60"
                >
                  {label}
                </Link>
              ))}
            </div>
          )}

</nav>
      </div>
    )}
    </>
  );
};

export default Navbar;
