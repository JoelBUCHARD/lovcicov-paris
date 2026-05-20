import { Link } from 'react-router-dom';
import { useState } from 'react';
import lovcicovLogo from '@/assets/lovcicov-logo.png';

const Footer = () => {
  const [email, setEmail] = useState('');

  return (
    <footer className="border-t border-border bg-background">
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

      {/* Links */}
      <div className="border-t border-border px-6 md:px-10 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/"><img src={lovcicovLogo} alt="LOVCICOV Paris" className="h-7 w-auto" /></Link>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link to="/shop" className="text-brand text-[11px] text-muted-foreground hover:text-foreground transition-colors">
              Shop
            </Link>
            <Link to="/manifeste" className="text-brand text-[11px] text-muted-foreground hover:text-foreground transition-colors">
              Manifeste
            </Link>
            <Link to="/fondatrice" className="text-brand text-[11px] text-muted-foreground hover:text-foreground transition-colors">
              La Fondatrice
            </Link>
            <a href="mailto:contact@lovcicov.com" className="text-brand text-[11px] text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
            <a href="https://instagram.com/lovcicov" target="_blank" rel="noopener noreferrer" className="text-brand text-[11px] text-muted-foreground hover:text-foreground transition-colors">
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
