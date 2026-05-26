import LegalPage from './LegalPage';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section>
    <h2 className="text-base md:text-lg font-medium mb-3 text-foreground">{title}</h2>
    <div className="space-y-3 text-muted-foreground">{children}</div>
  </section>
);

const CGV = () => (
  <LegalPage eyebrow="CONDITIONS DE VENTE" title="Conditions Générales de Vente">
    <p className="text-sm text-muted-foreground">
      En vigueur au <strong className="text-foreground">26 mai 2026</strong>
    </p>

    <Section title="ARTICLE 1 — IDENTIFICATION">
      <p>
        Le site lovcicov.com est édité par :
      </p>
      <p>
        <strong className="text-foreground">LOVCICOV PARIS</strong><br />
        Fondatrice : Georgiana Lovcicov<br />
        Email : <a href="mailto:contact@lovcicov.com" className="underline hover:text-foreground">contact@lovcicov.com</a><br />
        Site web : <a href="https://www.lovcicov.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">www.lovcicov.com</a>
      </p>
      <p>Ci-après dénommé &quot;le Vendeur&quot;.</p>
    </Section>

    <Section title="ARTICLE 2 — CHAMP D'APPLICATION">
      <p>
        Les présentes Conditions Générales de Vente s'appliquent à toute commande passée sur le site lovcicov.com par tout consommateur non professionnel, ci-après dénommé &quot;le Client&quot;.
      </p>
      <p>
        Toute commande implique l'acceptation pleine et entière des présentes CGV. Le Client déclare avoir pris connaissance des présentes CGV et les avoir acceptées avant de passer commande.
      </p>
      <p>
        Les présentes CGV prévalent sur tout autre document, sauf accord écrit préalable entre les parties.
      </p>
    </Section>

    <Section title="ARTICLE 3 — PRODUITS">
      <p>Les produits proposés à la vente sur lovcicov.com sont :</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Des vêtements (t-shirts, sweats) unisex, fabriqués en France, en coton biologique certifié vegan</li>
        <li>Des bijoux en pierres naturelles, fabriqués à la main en Turquie, monture en laiton doré</li>
      </ul>
      <p>
        Chaque produit est présenté avec une description détaillée de ses caractéristiques essentielles. Les photographies illustrant les produits sont aussi fidèles que possible mais ne peuvent assurer une parfaite similitude avec le produit, notamment en ce qui concerne les couleurs.
      </p>
      <p>
        Pour les bijoux en pierres naturelles : chaque pierre étant unique, des variations de couleur, de texture et d'inclusion sont inhérentes à la nature du produit et ne constituent pas un défaut.
      </p>
      <p>
        LOVCICOV PARIS se réserve le droit de modifier son offre de produits à tout moment.
      </p>
    </Section>

    <Section title="ARTICLE 4 — PRIX">
      <p>Les prix sont indiqués en euros, toutes taxes comprises (TTC).</p>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm my-3 max-w-sm">
        <div className="font-medium text-foreground">Produit</div>
        <div className="font-medium text-foreground">Prix</div>
        <div>T-shirt MysticLov</div>
        <div>70 €</div>
        <div>Sweat col rond MysticLov</div>
        <div>120 €</div>
        <div>Sweat à capuche MysticLov</div>
        <div>180 €</div>
        <div>Collier simple StoneLov</div>
        <div>69 €</div>
        <div>Collier double StoneLov</div>
        <div>89 €</div>
        <div>Bracelet StoneLov</div>
        <div>39 €</div>
      </div>
      <p>
        Les prix peuvent être modifiés à tout moment. Le prix applicable est celui affiché au moment de la validation de la commande.
      </p>
      <p>
        Les frais de livraison sont indiqués séparément avant la validation de la commande.
      </p>
    </Section>

    <Section title="ARTICLE 5 — COMMANDE">
      <p>La commande est validée après :</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Sélection des produits et ajout au panier</li>
        <li>Validation du panier</li>
        <li>Renseignement des informations de livraison</li>
        <li>Acceptation des présentes CGV</li>
        <li>Confirmation du paiement</li>
      </ul>
      <p>
        Un email de confirmation est envoyé au Client dès validation de la commande. Cet email récapitule les produits commandés, le prix total et l'adresse de livraison.
      </p>
      <p>
        LOVCICOV PARIS se réserve le droit d'annuler toute commande en cas de rupture de stock, de problème de paiement ou de commande anormalement élevée. Le Client en sera informé par email dans les plus brefs délais et remboursé intégralement.
      </p>
    </Section>

    <Section title="ARTICLE 6 — PAIEMENT">
      <p>Le paiement s'effectue en ligne de manière sécurisée via :</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Carte bancaire (Visa, Mastercard, American Express)</li>
        <li>Apple Pay</li>
        <li>Google Pay</li>
      </ul>
      <p>
        Les transactions sont sécurisées par le protocole SSL. LOVCICOV PARIS n'a accès à aucune donnée bancaire du Client. Le paiement est débité au moment de la validation de la commande.
      </p>
      <p>
        En cas de refus de paiement, la commande est automatiquement annulée.
      </p>
    </Section>

    <Section title="ARTICLE 7 — LIVRAISON">
      <p>
        LOVCICOV PARIS revendique le Very Slow Fashion — chaque pièce est fabriquée avec soin et intention. Les délais de livraison sont indicatifs et courent à compter de la confirmation du paiement.
      </p>
      <p><strong className="text-foreground">Délais de livraison :</strong></p>
      <ul className="list-disc pl-5 space-y-1">
        <li>France métropolitaine : 3 à 7 jours ouvrés</li>
        <li>Belgique et Europe : 5 à 10 jours ouvrés</li>
        <li>International : 7 à 15 jours ouvrés</li>
      </ul>
      <p><strong className="text-foreground">Frais de livraison :</strong></p>
      <ul className="list-disc pl-5 space-y-1">
        <li>T-shirts : 4,50 €</li>
        <li>Sweats col rond : 5,50 €</li>
        <li>Sweats à capuche : 6,50 €</li>
        <li>Livraison offerte dès 250 € d'achat</li>
      </ul>
      <p>
        Les produits sont expédiés à l'adresse indiquée par le Client lors de la commande. LOVCICOV PARIS ne peut être tenu responsable des retards imputables au transporteur ou à des événements indépendants de sa volonté (grève, intempéries, etc.).
      </p>
      <p>
        En cas de colis perdu, le Client doit contacter LOVCICOV PARIS dans un délai de 30 jours suivant la date de livraison estimée.
      </p>
    </Section>

    <Section title="ARTICLE 8 — DROIT DE RÉTRACTATION">
      <p>
        Conformément à l'article L221-18 du Code de la consommation, le Client dispose d'un délai de <strong className="text-foreground">14 jours calendaires</strong> à compter de la réception du produit pour exercer son droit de rétractation, sans avoir à justifier de motif ni à payer de pénalité.
      </p>
      <p><strong className="text-foreground">Pour exercer ce droit :</strong></p>
      <p>
        Envoyer un email à <a href="mailto:contact@lovcicov.com" className="underline hover:text-foreground">contact@lovcicov.com</a> avec les informations suivantes :
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Numéro de commande</li>
        <li>Produit(s) concerné(s)</li>
        <li>Motif de retour (facultatif)</li>
      </ul>
      <p>
        Le Client sera informé de la procédure de retour par email dans un délai de 48 h.
      </p>
      <p><strong className="text-foreground">Exceptions au droit de rétractation :</strong></p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Produits personnalisés ou réalisés sur mesure</li>
        <li>Produits descellés ou portés</li>
      </ul>
    </Section>

    <Section title="ARTICLE 9 — RETOURS ET REMBOURSEMENTS">
      <p>
        Les retours sont acceptés sous 14 jours calendaires suivant la réception, sous réserve que :
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Le produit soit retourné dans son emballage d'origine</li>
        <li>Le produit n'ait pas été porté, lavé ou endommagé</li>
        <li>Toutes les étiquettes soient encore attachées</li>
      </ul>
      <p>
        <strong className="text-foreground">Frais de retour :</strong> à la charge du Client sauf en cas de produit défectueux ou d'erreur de LOVCICOV PARIS.
      </p>
      <p>
        <strong className="text-foreground">Remboursement :</strong> effectué dans un délai de 14 jours suivant la réception et vérification du produit retourné, via le même moyen de paiement utilisé lors de la commande.
      </p>
      <p>
        <strong className="text-foreground">Échange :</strong> possible sous réserve de disponibilité du produit souhaité. À préciser lors de la demande de retour.
      </p>
    </Section>

    <Section title="ARTICLE 10 — GARANTIES LÉGALES">
      <p>
        Tous les produits LOVCICOV PARIS bénéficient des garanties légales suivantes :
      </p>
      <p>
        <strong className="text-foreground">Garantie légale de conformité</strong> (articles L217-4 et suivants du Code de la consommation) : 2 ans à compter de la livraison du produit.
      </p>
      <p>
        <strong className="text-foreground">Garantie contre les vices cachés</strong> (articles 1641 et suivants du Code civil) : le Client peut demander le remboursement du produit ou une réduction du prix dans un délai de 2 ans à compter de la découverte du vice.
      </p>
      <p>
        Pour tout problème lié à la qualité d'un produit, contactez{' '}
        <a href="mailto:contact@lovcicov.com" className="underline hover:text-foreground">contact@lovcicov.com</a> avec photos à l'appui.
      </p>
    </Section>

    <Section title="ARTICLE 11 — PROPRIÉTÉ INTELLECTUELLE">
      <p>
        L'ensemble des contenus du site lovcicov.com (textes, photos, visuels, logo, DA, univers créatifs) est la propriété exclusive de LOVCICOV PARIS et est protégé par le droit d'auteur.
      </p>
      <p>
        Toute reproduction, représentation, modification ou exploitation de ces contenus, sans autorisation écrite préalable de LOVCICOV PARIS, est strictement interdite et constitue une contrefaçon sanctionnée par le Code de la propriété intellectuelle.
      </p>
    </Section>

    <Section title="ARTICLE 12 — DONNÉES PERSONNELLES">
      <p>
        Les données collectées lors de la commande (nom, prénom, adresse, email, téléphone) sont utilisées uniquement pour :
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Le traitement et le suivi de la commande</li>
        <li>L'envoi d'informations sur les produits et services si le Client y a consenti</li>
        <li>La gestion du service client</li>
      </ul>
      <p>
        Conformément au Règlement Général sur la Protection des Données (RGPD), le Client dispose des droits suivants :
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Droit d'accès à ses données</li>
        <li>Droit de rectification</li>
        <li>Droit à l'effacement</li>
        <li>Droit d'opposition</li>
      </ul>
      <p>
        Pour exercer ces droits :{' '}
        <a href="mailto:contact@lovcicov.com" className="underline hover:text-foreground">contact@lovcicov.com</a>
      </p>
      <p>Les données ne sont jamais revendues à des tiers.</p>
    </Section>

    <Section title="ARTICLE 13 — JEUX CONCOURS ET OPÉRATIONS PROMOTIONNELLES">
      <p>
        Toute opération promotionnelle ou jeu concours organisé par LOVCICOV PARIS est soumis à un règlement spécifique disponible sur demande à{' '}
        <a href="mailto:contact@lovcicov.com" className="underline hover:text-foreground">contact@lovcicov.com</a>.
      </p>
      <p>
        Pour les jeux concours avec tirage au sort, une voie d'accès gratuite est toujours disponible conformément à la législation française. Les modalités de participation sans achat sont précisées dans le règlement de chaque opération.
      </p>
    </Section>

    <Section title="ARTICLE 14 — RESPONSABILITÉ">
      <p>LOVCICOV PARIS ne peut être tenu responsable :</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Des dommages résultant d'une mauvaise utilisation du produit</li>
        <li>Des retards de livraison imputables au transporteur</li>
        <li>Des interruptions ou dysfonctionnements du site indépendants de sa volonté</li>
        <li>Des dommages indirects résultant de l'utilisation du site</li>
      </ul>
    </Section>

    <Section title="ARTICLE 15 — MÉDIATION ET LITIGES">
      <p>
        En cas de litige, le Client peut recourir à une médiation conventionnelle ou à tout autre mode alternatif de règlement des différends.
      </p>
      <p>
        <strong className="text-foreground">Médiateur de la consommation :</strong> Le Client peut saisir gratuitement le médiateur de la consommation via la plateforme européenne de règlement en ligne des litiges :{' '}
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">https://ec.europa.eu/consumers/odr</a>
      </p>
      <p>
        En l'absence de résolution amiable, les tribunaux français seront compétents. La loi applicable est la loi française.
      </p>
    </Section>

    <Section title="ARTICLE 16 — MODIFICATION DES CGV">
      <p>
        LOVCICOV PARIS se réserve le droit de modifier les présentes CGV à tout moment. Les CGV applicables sont celles en vigueur au moment de la commande.
      </p>
    </Section>

    <Section title="ARTICLE 17 — CONTACT">
      <p>
        Pour toute question relative à une commande ou aux présentes CGV :
      </p>
      <p>
        Email : <a href="mailto:contact@lovcicov.com" className="underline hover:text-foreground">contact@lovcicov.com</a><br />
        Site : <a href="https://www.lovcicov.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">www.lovcicov.com</a>
      </p>
    </Section>
  </LegalPage>
);

export default CGV;
