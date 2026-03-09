import { Link } from 'react-router-dom';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  return (
    <footer className="border-t border-border">
      {/* Newsletter */}
      <div className="px-6 md:px-10 py-16 md:py-20 text-center">
        <p className="text-brand text-[11px] text-muted-foreground mb-4 tracking-[0.2em]">NEWSLETTER</p>
        <h3 className="text-2xl md:text-3xl font-serif font-light mb-3">Rejoindre le cercle</h3>
        <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
          Soyez les premiers à découvrir les nouvelles collections et les sorties exclusives.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex max-w-sm mx-auto border-b border-foreground"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse e-mail"
            className="flex-1 py-3 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="submit"
            className="text-brand text-[11px] px-4 py-3 hover:opacity-60 transition-opacity"
          >
            OK
          </button>
        </form>
      </div>

      {/* Links */}
      <div className="border-t border-border px-6 md:px-10 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="text-brand-lg text-sm tracking-[0.3em]">LOVCICOV</Link>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link to="/shop" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase">
              Boutique
            </Link>
            <Link to="/manifeste" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase">
              Manifeste
            </Link>
            <Link to="/fondatrice" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase">
              La Fondatrice
            </Link>
            <a href="mailto:contact@lovcicov.com" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase">
              Contact
            </a>
            <a href="https://instagram.com/lovcicov" target="_blank" rel="noopener noreferrer" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase">
              Instagram
            </a>
          </div>

          <p className="text-[10px] text-muted-foreground/60">
            © LOVCICOV {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
