import LegalPage from './LegalPage';
import { OPEN_CONSENT_EVENT } from '@/components/ConsentBanner';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section>
    <h2 className="text-base md:text-lg font-medium mb-3 text-foreground">{title}</h2>
    <div className="space-y-3 text-muted-foreground">{children}</div>
  </section>
);

const Cookies = () => (
  <LegalPage
    eyebrow="COOKIES"
    title="Gestion des cookies"
    seo={{
      title: 'Cookies — LOVCICOV Paris',
      description: "Finalités des cookies utilisés par LOVCICOV Paris et modalités de retrait du consentement.",
      path: '/cookies',
    }}
  >
    <Section title="1. Finalités">
      <ul className="list-disc pl-5 space-y-1">
        <li>Mesure d'audience (Google Analytics 4) : comprendre la fréquentation du site.</li>
        <li>Publicité personnalisée (Meta) : mesurer et adapter nos campagnes.</li>
        <li>Emails (Klaviyo) : gestion de la newsletter et des messages transactionnels.</li>
        <li>Cookies strictement nécessaires : fonctionnement du site, panier, sécurité.</li>
      </ul>
    </Section>

    <Section title="2. Votre choix">
      <p>
        Aucun cookie de mesure d'audience ou de publicité n'est déposé avant votre consentement.
        Vous pouvez accepter, refuser ou personnaliser vos choix à tout moment.
      </p>
    </Section>

    <Section title="3. Retirer son consentement">
      <p>
        Votre choix est conservé six mois. Pour le modifier :{' '}
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
          className="underline hover:text-foreground"
        >
          gérer mes cookies
        </button>
        . Vous pouvez également supprimer les cookies depuis les réglages de votre navigateur.
      </p>
    </Section>
  </LegalPage>
);

export default Cookies;
