import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Search, User, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [universOpen, setUniversOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm">
      {/* Top bar */}
      <div className="border-b border-border">
        <div className="flex items-center justify-between px-6 md:px-10 py-4">
          {/* Left icons */}
          <div className="hidden md:flex items-center gap-4 w-40">
            <button className="hover:opacity-60 transition-opacity">
              <Search size={18} strokeWidth={1.5} />
            </button>
          </div>

          {/* Center logo */}
          <Link to="/" className="text-brand-lg text-lg md:text-xl tracking-[0.35em]">
            LOVCICOV
          </Link>

          {/* Right icons */}
          <div className="flex items-center gap-4 w-40 justify-end">
            <Link to="/univers" className="hidden md:block hover:opacity-60 transition-opacity">
              <User size={18} strokeWidth={1.5} />
            </Link>
            <Link to="/cart" className="hover:opacity-60 transition-opacity">
              <ShoppingBag size={18} strokeWidth={1.5} />
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
          className={`text-brand text-[11px] tracking-[0.15em] transition-opacity hover:opacity-60 ${
            location.pathname === '/' ? 'opacity-100' : 'opacity-70'
          }`}
        >
          Accueil
        </Link>

        <Link
          to="/shop"
          className={`text-brand text-[11px] tracking-[0.15em] transition-opacity hover:opacity-60 ${
            location.pathname === '/shop' ? 'opacity-100' : 'opacity-70'
          }`}
        >
          Shop
        </Link>

        {/* Univers dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setUniversOpen(true)}
          onMouseLeave={() => setUniversOpen(false)}
        >
          <button
            className={`text-brand text-[11px] tracking-[0.15em] transition-opacity hover:opacity-60 flex items-center gap-1 ${
              location.pathname === '/univers' || location.pathname === '/manifeste' || location.pathname === '/fondatrice' ? 'opacity-100' : 'opacity-70'
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
              <Link to="/" className="text-brand text-xs opacity-70 hover:opacity-100 transition-opacity" onClick={() => setIsOpen(false)}>
                Accueil
              </Link>
              <Link to="/shop" className="text-brand text-xs opacity-70 hover:opacity-100 transition-opacity" onClick={() => setIsOpen(false)}>
                Shop
              </Link>
              <p className="text-brand text-[10px] text-muted-foreground/50 tracking-[0.2em] mt-2">Univers</p>
              <Link to="/manifeste" className="text-brand text-xs opacity-70 hover:opacity-100 transition-opacity pl-4" onClick={() => setIsOpen(false)}>
                Manifeste
              </Link>
              <Link to="/fondatrice" className="text-brand text-xs opacity-70 hover:opacity-100 transition-opacity pl-4" onClick={() => setIsOpen(false)}>
                La Fondatrice
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
