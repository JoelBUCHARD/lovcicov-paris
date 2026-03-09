import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';

const navLinks = [
  { label: 'Nouveautés', path: '/shop' },
  { label: 'Collections', path: '/shop?collection=standard' },
  { label: 'Mystic Lov', path: '/shop?collection=mystic' },
  { label: 'Bijoux', path: '/shop?collection=bijoux' },
  { label: 'Manifeste', path: '/manifeste' },
  { label: 'La Fondatrice', path: '/fondatrice' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm">
      {/* Top bar */}
      <div className="border-b border-border">
        <div className="flex items-center justify-between px-6 md:px-10 py-4">
          {/* Left icons - hidden on mobile */}
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
            <Link to="/fondatrice" className="hidden md:block hover:opacity-60 transition-opacity">
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
      <nav className="hidden md:flex items-center justify-center gap-8 py-3 border-b border-border/50">
        {navLinks.map((link) => (
          <Link
            key={link.path + link.label}
            to={link.path}
            className={`text-brand text-[11px] tracking-[0.15em] transition-opacity hover:opacity-60 ${
              location.pathname === link.path ? 'opacity-100' : 'opacity-70'
            }`}
          >
            {link.label}
          </Link>
        ))}
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
              {navLinks.map((link) => (
                <Link
                  key={link.path + link.label}
                  to={link.path}
                  className="text-brand text-xs opacity-70 hover:opacity-100 transition-opacity"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
