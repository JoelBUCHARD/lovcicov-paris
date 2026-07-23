import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Instagram, Facebook } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import lovcicovLogo from '@/assets/lovcicov-logo.png';
import TrustBand from '@/components/TrustBand';

interface FooterProps {
  hideTopBorder?: boolean;
  hideNewsletter?: boolean;
}

const Footer = ({ hideTopBorder, hideNewsletter }: FooterProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('subscribe-newsletter', {
        body: { email },
      });
      if (error || (data && (data as any).error)) {
        throw new Error(error?.message || (data as any).error);
      }
      toast.success('Bienvenue dans Le Cercle ✦', {
        description: 'Vérifiez votre boîte mail pour confirmer votre inscription.',
      });
      setEmail('');
    } catch (err) {
      toast.error('Inscription impossible', {
        description: (err as Error).message || 'Veuillez réessayer.',
      });
    } finally {
      setLoading(false);
    }
  };

  const year = new Date().getFullYear();

  return (
    <footer
      className={`${hideTopBorder ? '' : 'border-t border-border'}`}
      style={{ backgroundColor: '#FFFFFF' }}
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">Pied de page LOVCICOV Paris</h2>

      <TrustBand />



      {/* Newsletter — invitation into Le Cercle */}
      {!hideNewsletter && (
        <section
          aria-label="Newsletter"
          className="bg-white px-6 md:px-10 py-10 md:py-14 text-center"
        >
          <p className="text-brand text-[10px] text-muted-foreground mb-6 tracking-[0.32em]">
            LE CERCLE LOVCICOV
          </p>
          <h3 className="text-[26px] md:text-[34px] font-normal tracking-[-0.01em] mb-4 text-foreground">
            Une invitation à l'intime
          </h3>
          <p className="text-[13px] md:text-sm text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
            Nouvelles collections, drops confidentiels et rendez-vous privés —
            adressés à celles et ceux qui portent la maison.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row max-w-md mx-auto gap-2"
          >
            <label htmlFor="footer-newsletter-email" className="sr-only">
              Adresse e-mail
            </label>
            <input
              id="footer-newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse e-mail"
              className="flex-1 py-3 px-4 bg-transparent border-b border-border text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-foreground transition-colors text-center sm:text-left"
            />
            <button
              type="submit"
              disabled={loading}
              className="text-brand text-[10px] px-8 py-3 bg-foreground text-background hover:bg-foreground/85 transition-colors tracking-[0.28em] disabled:opacity-60"
            >
              {loading ? '...' : 'Rejoindre'}
            </button>
          </form>
        </section>
      )}

      {/* Main footer grid */}
      <div className="border-t border-border/70">
        <div className="container-luxury py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 text-center md:text-left">
            {/* Maison */}
            <nav aria-label="La Maison">
              <p className="text-brand text-[10px] text-muted-foreground mb-5 tracking-[0.28em]">
                La Maison
              </p>
              <ul className="space-y-3">
                <li><Link to="/manifeste" className="text-[12px] tracking-[0.06em] text-foreground/80 hover:text-foreground transition-colors">Manifeste</Link></li>
                <li><Link to="/fondatrice" className="text-[12px] tracking-[0.06em] text-foreground/80 hover:text-foreground transition-colors">La Fondatrice</Link></li>
                
                <li><Link to="/le-cercle" className="text-[12px] tracking-[0.06em] text-foreground/80 hover:text-foreground transition-colors">Le Cercle</Link></li>
              </ul>
            </nav>

            {/* Univers */}
            <nav aria-label="Univers">
              <p className="text-brand text-[10px] text-muted-foreground mb-5 tracking-[0.28em]">
                Univers
              </p>
              <ul className="space-y-3">
                <li><Link to="/powerlov" className="text-[12px] tracking-[0.06em] text-foreground/80 hover:text-foreground transition-colors">PowerLov</Link></li>
                <li><Link to="/mysticlov" className="text-[12px] tracking-[0.06em] text-foreground/80 hover:text-foreground transition-colors">MysticLov</Link></li>
                <li><Link to="/stonelov" className="text-[12px] tracking-[0.06em] text-foreground/80 hover:text-foreground transition-colors">StoneLov</Link></li>
                <li><Link to="/shop" className="text-[12px] tracking-[0.06em] text-foreground/80 hover:text-foreground transition-colors">La Boutique</Link></li>
              </ul>
            </nav>

            {/* Service */}
            <nav aria-label="Service">
              <p className="text-brand text-[10px] text-muted-foreground mb-5 tracking-[0.28em]">
                Service
              </p>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:contact@lovcicov.com" className="text-[12px] tracking-[0.06em] text-foreground/80 hover:text-foreground transition-colors">
                    Nous écrire
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/33786386782" target="_blank" rel="noopener noreferrer" className="text-[12px] tracking-[0.06em] text-foreground/80 hover:text-foreground transition-colors">
                    WhatsApp
                  </a>
                </li>
                <li><Link to="/livraison-retours" className="text-[12px] tracking-[0.06em] text-foreground/80 hover:text-foreground transition-colors">Livraison & Retours</Link></li>
              </ul>
            </nav>

            {/* Légal */}
            <nav aria-label="Informations légales">
              <p className="text-brand text-[10px] text-muted-foreground mb-5 tracking-[0.28em]">
                Informations
              </p>
              <ul className="space-y-3">
                <li><Link to="/mentions-legales" className="text-[12px] tracking-[0.06em] text-foreground/80 hover:text-foreground transition-colors">Mentions Légales</Link></li>
                <li><Link to="/confidentialite" className="text-[12px] tracking-[0.06em] text-foreground/80 hover:text-foreground transition-colors">Confidentialité</Link></li>
                <li><Link to="/cgv" className="text-[12px] tracking-[0.06em] text-foreground/80 hover:text-foreground transition-colors">CGV</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Closing — brand signature */}
      <div className="border-t border-border/70">
        <div className="container-luxury py-14 md:py-16 text-center">
          <Link to="/" aria-label="LOVCICOV Paris — Accueil" className="inline-flex mb-6">
            <img src={lovcicovLogo} alt="LOVCICOV Paris" className="h-8 md:h-9 w-auto" />
          </Link>

          <p className="text-brand-lg text-[10px] md:text-[11px] text-muted-foreground mb-8">
            Paris — Maison Française
          </p>

          <div className="flex items-center justify-center gap-8 mb-10">
            <a
              href="https://www.instagram.com/lovcicov.paris/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram — @lovcicov.paris"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Instagram size={18} strokeWidth={1.25} />
            </a>
            <span aria-hidden className="w-px h-4 bg-border" />
            <a
              href="https://www.facebook.com/lovcicov"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook — LOVCICOV"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Facebook size={18} strokeWidth={1.25} />
            </a>
          </div>

          <p className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground/70 pb-20 md:pb-0">
            © {year} LOVCICOV · Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
