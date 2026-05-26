import LegalPage from './LegalPage';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section>
    <h2 className="text-base md:text-lg font-medium mb-3 text-foreground">{title}</h2>
    <div className="space-y-3 text-muted-foreground">{children}</div>
  </section>
);

const MentionsLegales = () => (
  <LegalPage eyebrow="INFORMATIONS LÉGALES" title="Mentions Légales">
    <Section title="1. Identification de l'éditeur">
      <p>
        Le site MYSTIC LOV est édité par la société NATELSOL INVEST, société à responsabilité
        limitée (SARL) au capital social de 624 009,00 €, immatriculée au Registre du Commerce
        et des Sociétés de Marseille sous le numéro 790 009 096.
      </p>
      <p>
        Adresse du siège social : 11 avenue Frédéric Mistral, 13008 Marseille, France<br />
        SIREN : 790 009 096<br />
        SIRET : 790 009 096 00039<br />
        Numéro de TVA intracommunautaire : FR13790009096<br />
        Directeur de la publication : Joël Buchard<br />
        Adresse e-mail : <a href="mailto:j.buchard@me.com" className="underline hover:text-foreground">j.buchard@me.com</a>
      </p>
      <p>
        Le directeur de la publication est une personne physique agissant en sa qualité de gérant
        de la société NATELSOL INVEST.
      </p>
    </Section>

    <Section title="2. Hébergement">
      <p>
        Le site est hébergé par Lovable (hostinger of the published preview). Pour toute information,
        veuillez consulter le site de l'hébergeur ou le contacter directement.
      </p>
      <p>
        L'hébergement garantit la sécurité physique et logique du site et des données qui y sont
        stockées.
      </p>
    </Section>

    <Section title="3. Propriété intellectuelle">
      <p>
        L'ensemble des contenus présents sur le site MYSTIC LOV, incluant, de façon non limitative,
        les graphismes, images, textes, vidéos, animations, sons, logos, gifs et icônes ainsi que
        leur mise en forme sont la propriété exclusive de NATELSOL INVEST, à l'exception des marques,
        logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs.
      </p>
      <p>
        Toute reproduction, distribution, modification, adaptation, retransmission ou publication,
        même partielle, de ces différents éléments est strictement interdite sans l'accord exprès
        par écrit de NATELSOL INVEST. Cette représentation ou reproduction, par quelque procédé
        que ce soit, constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants
        du Code de la propriété intellectuelle.
      </p>
    </Section>

    <Section title="4. Responsabilité">
      <p>
        NATELSOL INVEST met tout en œuvre pour offrir aux utilisateurs des informations disponibles
        et vérifiées. Toutefois, elle ne saurait être tenue responsable des erreurs, d'une absence
        de disponibilité des informations et/ou de la présence de virus sur le site.
      </p>
      <p>
        Le site peut contenir des liens hypertextes vers d'autres sites web. NATELSOL INVEST ne
        peut en aucun cas être tenue responsable du contenu de ces sites et de l'usage qui pourra
        en être fait par les utilisateurs.
      </p>
    </Section>

    <Section title="5. Modification des mentions légales">
      <p>
        NATELSOL INVEST se réserve le droit de modifier les présentes mentions à tout moment.
        L'utilisateur s'engage donc à les consulter régulièrement.
      </p>
    </Section>

    <Section title="6. Loi applicable">
      <p>
        Le site internet MYSTIC LOV est soumis au droit français. En cas de litige, les tribunaux
        français seront seuls compétents.
      </p>
    </Section>
  </LegalPage>
);

export default MentionsLegales;
