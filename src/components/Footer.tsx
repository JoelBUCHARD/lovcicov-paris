import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-foreground text-primary-foreground">
      <div className="px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="text-brand-lg text-sm mb-6">LOVCICOV</p>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Pas une tendance. Un standard.
            </p>
          </div>

          <div>
            <p className="text-brand text-xs mb-4 text-primary-foreground/40">Pages</p>
            <div className="flex flex-col gap-3">
              <Link to="/shop" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Boutique
              </Link>
              <Link to="/manifeste" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Manifeste
              </Link>
              <Link to="/fondatrice" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                La Fondatrice
              </Link>
            </div>
          </div>

          <div>
            <p className="text-brand text-xs mb-4 text-primary-foreground/40">Contact</p>
            <div className="flex flex-col gap-3">
              <a href="mailto:contact@lovcicov.com" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                contact@lovcicov.com
              </a>
              <a href="https://instagram.com/lovcicov" target="_blank" rel="noopener noreferrer" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Instagram
              </a>
              <Link to="/mentions-legales" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Mentions légales
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10">
          <p className="text-xs text-primary-foreground/40">
            © LOVCICOV
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
