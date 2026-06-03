import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Instagram, Facebook } from 'lucide-react';
import lovcicovLogo from '@/assets/lovcicov-logo.png';

interface FooterProps {
  hideTopBorder?: boolean;
}

const Footer = ({ hideTopBorder }: FooterProps) => {
  const [email, setEmail] = useState('');

  return (
    <footer className={`bg-background ${hideTopBorder ? '' : 'border-t border-border'}`}>
      {/* Newsletter */}
      <div className="px-6 md:px-10 py-16 md:py-20 text-center bg-background">
        <p className="text-brand text-[11px] text-muted-foreground mb-4 tracking-[0.2em]">NEWSLETTER</p>
        <h3 className="text-2xl md:text-3xl font-medium mb-3 text-black">Rejoindre le cercle</h3>
        <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
          Soyez les premiers à découvrir les nouvelles collections et les sorties exclusives.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex max-w-sm mx-auto gap-2"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse e-mail"
            className="flex-1 py-3 px-3 bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary rounded-[2px]"
          />
          <button
            type="submit"
            className="text-brand text-[11px] px-6 py-3 bg-primary text-primary-foreground hover:bg-fuchsia transition-colors rounded-[2px]"
          >
            OK
          </button>
        </form>
      </div>

      {/* Shipping note */}
      <div className="border-t border-border px-6 md:px-10 py-4 text-center">
        <p className="text-[11px] text-muted-foreground tracking-[0.05em]">
          Livraison 9,90€ — offerte dès 99€ d'achat
        </p>
      </div>

      {/* Links */}
      <div className="border-t border-border px-6 md:px-10 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/"><img src={lovcicovLogo} alt="LOVCICOV Paris" className="h-7 w-auto" /></Link>
          
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <a href="mailto:contact@lovcicov.com" className="text-brand text-[11px] text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
            <Link to="/livraison-retours" className="text-brand text-[11px] text-muted-foreground hover:text-foreground transition-colors">
              Livraison & Retours
            </Link>
            <Link to="/mentions-legales" className="text-brand text-[11px] text-muted-foreground hover:text-foreground transition-colors">
              Mentions Légales
            </Link>
            <Link to="/confidentialite" className="text-brand text-[11px] text-muted-foreground hover:text-foreground transition-colors">
              Confidentialité
            </Link>
            <Link to="/cgv" className="text-brand text-[11px] text-muted-foreground hover:text-foreground transition-colors">
              CGV
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/lovcicov.paris/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Instagram size={16} strokeWidth={1.5} />
            </a>
            <a
              href="https://www.facebook.com/lovcicov"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Facebook size={16} strokeWidth={1.5} />
            </a>
            <span className="text-[10px] text-muted-foreground/60 ml-2">
              © LOVCICOV {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
