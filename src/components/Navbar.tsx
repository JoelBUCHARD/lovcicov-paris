import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Search } from 'lucide-react';
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
    const setVar = () =>
      document.documentElement.style.setProperty(
        '--header-height',
        `${el.getBoundingClientRect().height}px`
      );
    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    window.addEventListener('resize', setVar);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', setVar);
    };
  }, []);

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
    setUniversOpen(false);
  }, [location.pathname]);

  const iconClass = 'hover:opacity-60 transition-opacity focus-visible:outline-none focus-visible:opacity-60';

  return (
    <>
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm transition-[padding,box-shadow,border-color] duration-500 ease-out ${
        scrolled ? 'border-b border-border/60 shadow-[0_1px_0_rgba(0,0,0,0.02)]' : 'border-b border-transparent'
      }`}
    >
      {/* Top bar */}
      <div
        className={`flex items-center justify-between px-6 md:px-12 lg:px-16 transition-[padding] duration-500 ease-out ${
          scrolled ? 'py-2.5 md:py-4' : 'py-4 md:py-7'
        }`}
      >
        {/* Left icons */}
        <div className="flex items-center gap-6 flex-1">
          <Link
            to="/search"
            onMouseEnter={() => prefetchRoute('/search')}
            className={iconClass}
            aria-label="Rechercher"
          >
            <Search size={15} strokeWidth={1.25} className="md:hidden" />
            <Search size={17} strokeWidth={1.25} className="hidden md:block" />
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
              scrolled ? 'h-[22px] md:h-8' : 'h-8 md:h-11'
            }`}
          />
        </Link>

        {/* Right icons */}
        <div className="flex items-center gap-4 md:gap-6 flex-1 justify-end">
          <Link
            to={isLoggedIn ? '/account' : '/auth'}
            onMouseEnter={() => prefetchRoute(isLoggedIn ? '/account' : '/auth')}
            className={iconClass}
            aria-label={isLoggedIn ? 'Mon compte' : 'Se connecter'}
          >
            <User size={15} strokeWidth={1.25} className="md:hidden" />
            <User size={17} strokeWidth={1.25} className="hidden md:block" />
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
        className={`flex items-center justify-start md:justify-center gap-7 md:gap-12 lg:gap-16 px-6 md:px-0 overflow-x-auto no-scrollbar overscroll-x-contain transition-[padding,opacity] duration-500 ease-out ${
          scrolled ? 'pb-2.5 md:pb-3 opacity-90' : 'pb-4 md:pb-5 opacity-100'
        }`}
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

    </>
  );
};

export default Navbar;
