import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'lov_consent';
const SIX_MONTHS = 1000 * 60 * 60 * 24 * 182;

export const OPEN_CONSENT_EVENT = 'lov:open-consent';

type Consent = { analytics: boolean; marketing: boolean; ts: number };

const readConsent = (): Consent | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    if (typeof parsed?.ts !== 'number') return null;
    if (Date.now() - parsed.ts > SIX_MONTHS) return null;
    return parsed;
  } catch {
    return null;
  }
};

const applyConsent = (analytics: boolean, marketing: boolean) => {
  if (typeof window === 'undefined') return;
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  const gtag = w.gtag || function () { w.dataLayer.push(arguments); };
  gtag('consent', 'update', {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: marketing ? 'granted' : 'denied',
    ad_user_data: marketing ? 'granted' : 'denied',
    ad_personalization: marketing ? 'granted' : 'denied',
  });
  w.dataLayer.push({ event: 'consent_update', consent_analytics: analytics, consent_marketing: marketing });
  if (analytics) w.dataLayer.push({ event: 'consent_analytics_granted' });
  if (marketing) w.dataLayer.push({ event: 'consent_marketing_granted' });
};

const ConsentBanner = () => {
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const saved = readConsent();
    if (saved) {
      applyConsent(saved.analytics, saved.marketing);
    } else {
      setVisible(true);
    }
    const open = () => {
      const current = readConsent();
      setAnalytics(current?.analytics ?? false);
      setMarketing(current?.marketing ?? false);
      setCustomizing(false);
      setVisible(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  const save = (a: boolean, m: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ analytics: a, marketing: m, ts: Date.now() }));
    } catch {}
    applyConsent(a, m);
    setVisible(false);
    setCustomizing(false);
  };

  if (!visible) return null;

  const btn =
    'text-brand text-[11px] tracking-[0.16em] uppercase flex-1 px-5 py-3 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors rounded-[2px]';

  return (
    <div
      role="dialog"
      aria-label="Consentement aux cookies"
      className="fixed bottom-0 left-0 right-0 z-[60] px-4 pb-4 md:px-6 md:pb-6 pointer-events-none"
    >
      <div className="pointer-events-auto max-w-3xl mx-auto bg-background border border-border shadow-lg p-5 md:p-6 rounded-[2px]">
        <p className="text-brand text-[10px] tracking-[0.2em] text-muted-foreground mb-2">CONFIDENTIALITÉ</p>
        <p className="text-sm text-foreground leading-relaxed">
          Nous utilisons des cookies pour mesurer l'audience et personnaliser nos publicités.
          Vous pouvez accepter, refuser ou personnaliser.{' '}
          <Link to="/cookies" className="underline hover:text-fuchsia">En savoir plus</Link>.
        </p>

        {customizing && (
          <div className="mt-5 space-y-3">
            {[
              { id: 'analytics', label: "Mesure d'audience", value: analytics, set: setAnalytics },
              { id: 'marketing', label: 'Publicité personnalisée', value: marketing, set: setMarketing },
            ].map((row) => (
              <label
                key={row.id}
                htmlFor={`consent-${row.id}`}
                className="flex items-center justify-between gap-4 border border-border px-4 py-3 rounded-[2px] cursor-pointer"
              >
                <span className="text-[13px] text-foreground">{row.label}</span>
                <input
                  id={`consent-${row.id}`}
                  type="checkbox"
                  checked={row.value}
                  onChange={(e) => row.set(e.target.checked)}
                  className="h-4 w-4 accent-current"
                />
              </label>
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-col sm:flex-row gap-2">
          {customizing ? (
            <button type="button" onClick={() => save(analytics, marketing)} className={btn}>
              Enregistrer
            </button>
          ) : (
            <>
              <button type="button" onClick={() => save(true, true)} className={btn}>
                Tout accepter
              </button>
              <button type="button" onClick={() => save(false, false)} className={btn}>
                Tout refuser
              </button>
              <button type="button" onClick={() => setCustomizing(true)} className={btn}>
                Personnaliser
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
