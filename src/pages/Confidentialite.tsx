import LegalPage from './LegalPage';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section>
    <h2 className="text-base md:text-lg font-medium mb-3 text-foreground">{title}</h2>
    <div className="space-y-3 text-muted-foreground">{children}</div>
  </section>
);

const Confidentialite = () => (
  <LegalPage
    eyebrow="RGPD"
    title="Politique de Confidentialité"
    seo={{
      title: "Confidentialité — LOVCICOV Paris",
      description: "Politique de confidentialité LOVCICOV Paris : données collectées, finalités, cookies et droits RGPD.",
      path: "/confidentialite",
    }}
  >
    <Section title="1. Responsable du traitement">
      <p>
        Le responsable du traitement des données collectées sur le site MYSTIC LOV est :<br />
        NATELSOL INVEST, SARL au capital de 624 009 €<br />
        Siège social : 11 avenue Frédéric Mistral, 13008 Marseille, France<br />
        Email : <a href="mailto:j.buchard@me.com" className="underline hover:text-foreground">j.buchard@me.com</a>
      </p>
    </Section>

    <Section title="2. Nature des données collectées">
      <p>Dans le cadre de l'utilisation du site, les données suivantes peuvent être collectées :</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Nom, prénom, adresse e-mail, adresse postale, numéro de téléphone (facultatif)</li>
        <li>Informations de commande (produits achetés, montants, historique)</li>
        <li>Adresse IP, type de navigateur, pages visitées (via cookies)</li>
      </ul>
    </Section>

    <Section title="3. Finalité du traitement">
      <p>Les données collectées ont pour but :</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>L'exécution des commandes et du service client</li>
        <li>La gestion de la facturation</li>
        <li>La prévention de la fraude</li>
        <li>La personnalisation de l'expérience utilisateur</li>
        <li>L'envoi d'informations commerciales si l'utilisateur y a consenti</li>
      </ul>
    </Section>

    <Section title="4. Durée de conservation">
      <p>Les données sont conservées pour la durée strictement nécessaire aux finalités précitées :</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>3 ans pour les prospects non clients</li>
        <li>5 à 10 ans pour les données liées à une commande (obligations comptables)</li>
      </ul>
    </Section>

    <Section title="5. Destinataires">
      <p>
        Les données collectées sont destinées à un usage interne exclusivement par NATELSOL INVEST.
        Elles peuvent être transmises à des prestataires sous-traitants (logistique, paiement)
        dans le cadre strict de l'exécution du contrat.
      </p>
      <p>
        Aucun transfert de données hors de l'Union européenne n'est réalisé sans garanties adéquates.
      </p>
    </Section>

    <Section title="6. Droits des utilisateurs">
      <p>
        Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des
        droits suivants :
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Droit d'accès</li>
        <li>Droit de rectification</li>
        <li>Droit à l'effacement</li>
        <li>Droit à la portabilité</li>
        <li>Droit d'opposition au traitement</li>
      </ul>
      <p>
        Pour exercer vos droits, contactez :{' '}
        <a href="mailto:j.buchard@me.com" className="underline hover:text-foreground">j.buchard@me.com</a>.
        Une réponse vous sera apportée sous 30 jours.
      </p>
    </Section>

    <Section title="7. Cookies">
      <p>
        Le site utilise des cookies fonctionnels et de mesure d'audience (Google Analytics, etc.).
        Vous pouvez les refuser ou les gérer via les réglages de votre navigateur.
      </p>
      <p>
        L'utilisateur est informé de l'usage des cookies lors de sa première visite sur le site
        via un bandeau d'information.
      </p>
    </Section>
  </LegalPage>
);

export default Confidentialite;
