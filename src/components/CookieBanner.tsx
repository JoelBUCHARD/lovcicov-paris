import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'lovcicov-cookie-consent';

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        const t = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(t);
      }
    } catch {}
  }, []);

  const handleChoice = (value: 'accept' | 'refuse') => {
    try { localStorage.setItem(STORAGE_KEY, value); } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] px-4 pb-4 md:px-6 md:pb-6 pointer-events-none">
      <div className="pointer-events-auto max-w-3xl mx-auto bg-background border border-border shadow-lg p-5 md:p-6 rounded-[2px]">
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <div className="flex-1">
            <p className="text-brand text-[10px] tracking-[0.2em] text-muted-foreground mb-2">
              CONFIDENTIALITÉ
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              Nous utilisons des cookies pour assurer le bon fonctionnement du site et mesurer son
              audience. Vous pouvez accepter ou refuser leur dépôt. Voir notre{' '}
              <Link to="/confidentialite" className="underline hover:text-fuchsia">
                politique de confidentialité
              </Link>.
            </p>
          </div>
          <div className="flex gap-2 md:flex-col md:w-40">
            <button
              onClick={() => handleChoice('accept')}
              className="text-brand text-[11px] flex-1 px-5 py-3 bg-primary text-primary-foreground hover:bg-fuchsia transition-colors rounded-[2px]"
            >
              Accepter
            </button>
            <button
              onClick={() => handleChoice('refuse')}
              className="text-brand text-[11px] flex-1 px-5 py-3 border border-border text-foreground hover:bg-secondary transition-colors rounded-[2px]"
            >
              Refuser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
