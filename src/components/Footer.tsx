import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <p className="text-brand-lg text-sm mb-6">LOVCICOV</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Des vêtements qui changent ce que vous ressentez.
            </p>
          </div>

          <div>
            <p className="text-brand text-xs mb-4">Boutique</p>
            <div className="flex flex-col gap-3">
              <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Signature Essentials
              </Link>
              <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Mystic Lov
              </Link>
            </div>
          </div>

          <div>
            <p className="text-brand text-xs mb-4">Explorer</p>
            <div className="flex flex-col gap-3">
              <Link to="/scan" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Scan d'État
              </Link>
              <Link to="/experience" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Expérience
              </Link>
              <Link to="/philosophy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Philosophie
              </Link>
            </div>
          </div>

          <div>
            <p className="text-brand text-xs mb-4">Contact</p>
            <div className="flex flex-col gap-3">
              <a href="mailto:hello@lovcicov.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                hello@lovcicov.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            © 2026 LOVCICOV. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
