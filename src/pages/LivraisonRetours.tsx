import LegalPage from './LegalPage';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section>
    <h2 className="text-base md:text-lg font-medium mb-3 text-foreground">{title}</h2>
    <div className="space-y-3 text-muted-foreground">{children}</div>
  </section>
);

const LivraisonRetours = () => (
  <LegalPage eyebrow="INFORMATIONS PRATIQUES" title="Livraison & Retours">
    <Section title="1. Préparation de votre commande">
      <p>
        Chaque commande est préparée avec soin dans nos ateliers à Marseille sous 1 à 3 jours
        ouvrés après confirmation du paiement. Vous recevez un e-mail de confirmation dès
        l'expédition, accompagné du numéro de suivi.
      </p>
    </Section>

    <Section title="2. Délais et tarifs de livraison">
      <p><strong className="text-foreground">France métropolitaine</strong> — 2 à 4 jours ouvrés via Colissimo suivi.</p>
      <p><strong className="text-foreground">Union Européenne</strong> — 3 à 7 jours ouvrés.</p>
      <p><strong className="text-foreground">Reste du monde</strong> — 5 à 10 jours ouvrés.</p>
      <p>
        <strong className="text-foreground">Livraison offerte</strong> en France métropolitaine
        dès 150 € d'achat. Les tarifs précis pour chaque destination sont calculés automatiquement
        au moment du paiement.
      </p>
    </Section>

    <Section title="3. Suivi de commande">
      <p>
        Un numéro de suivi vous est transmis par e-mail dès l'expédition. Vous pouvez également
        retrouver le statut de vos commandes dans votre espace personnel.
      </p>
    </Section>

    <Section title="4. Droit de rétractation">
      <p>
        Conformément aux articles L221-18 et suivants du Code de la consommation, vous disposez
        d'un délai de <strong className="text-foreground">14 jours</strong> à compter de la
        réception de votre commande pour exercer votre droit de rétractation, sans avoir à
        justifier de motifs ni à payer de pénalités.
      </p>
      <p>
        Pour exercer ce droit, contactez-nous à
        {' '}<a href="mailto:contact@lovcicov.com" className="underline hover:text-foreground">contact@lovcicov.com</a>{' '}
        en précisant votre numéro de commande et les articles concernés.
      </p>
    </Section>

    <Section title="5. Conditions de retour">
      <p>
        Les articles doivent être retournés <strong className="text-foreground">neufs, non
        portés, dans leur emballage d'origine</strong> et accompagnés de leur facture. Tout
        article abîmé, porté ou incomplet ne pourra être repris.
      </p>
      <p>
        Les frais de retour sont à la charge du client, sauf en cas de produit défectueux ou
        d'erreur de notre part.
      </p>
      <p>
        Adresse de retour : NATELSOL INVEST — LOVCICOV, 11 avenue Frédéric Mistral, 13008
        Marseille, France.
      </p>
    </Section>

    <Section title="6. Remboursement">
      <p>
        Le remboursement est effectué dans un délai maximum de 14 jours à compter de la
        réception et de la vérification de votre retour, sur le moyen de paiement utilisé lors
        de la commande.
      </p>
    </Section>

    <Section title="7. Produits défectueux">
      <p>
        En cas de défaut de fabrication ou d'erreur de préparation, contactez-nous sous 7 jours
        après réception à
        {' '}<a href="mailto:contact@lovcicov.com" className="underline hover:text-foreground">contact@lovcicov.com</a>.
        Nous prendrons en charge le retour et procéderons à l'échange ou au remboursement intégral.
      </p>
    </Section>

    <Section title="8. Service client">
      <p>
        Pour toute question, notre équipe est joignable par e-mail à
        {' '}<a href="mailto:contact@lovcicov.com" className="underline hover:text-foreground">contact@lovcicov.com</a>{' '}
        du lundi au vendredi, de 10h à 18h.
      </p>
    </Section>
  </LegalPage>
);

export default LivraisonRetours;
