import LegalPage from './LegalPage';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section>
    <h2 className="text-base md:text-lg font-medium mb-3 text-foreground">{title}</h2>
    <div className="space-y-3 text-muted-foreground">{children}</div>
  </section>
);

const MentionsLegales = () => (
  <LegalPage
    eyebrow="INFORMATIONS LÉGALES"
    title="Mentions Légales"
    seo={{
      title: "Mentions Légales — LOVCICOV Paris",
      description: "Éditeur, hébergeur et informations légales du site LOVCICOV Paris.",
      path: "/mentions-legales",
    }}
  >
    <Section title="1. Identification de l'éditeur">
      <p>Le site lovcicov.com est édité par :</p>
      <p>
        <strong className="text-foreground">MARQUE BLANCHE</strong>, société par actions simplifiée au capital de 1 000 euros,
        immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 944 407 519,
        dont le siège social est situé Bureau 326, 59 rue de Ponthieu, 75008 Paris, France.<br />
        SIRET : 944 407 519 00015<br />
        Code APE : 14.13Z — Fabrication de vêtements de dessus<br />
        TVA intracommunautaire : FR09944407519<br />
        Directeur de la publication : Joël Buchard, Président<br />
        Contact : <a href="mailto:contact@lovcicov.com" className="underline hover:text-foreground">contact@lovcicov.com</a> — 06 38 53 83 77
      </p>
    </Section>

    <Section title="2. Hébergement">
      <p>
        Le site est hébergé par Lovable. Le tunnel de paiement est opéré par Shopify International Limited,
        Victoria Buildings, 1-2 Haddington Road, Dublin 4, D04 XN32, Irlande.
      </p>
    </Section>


    <Section title="3. Propriété intellectuelle">
      <p>
        L'ensemble des contenus présents sur le site LOVCICOV, incluant, de façon non limitative,
        les graphismes, images, textes, vidéos, animations, sons, logos, gifs et icônes ainsi que
        leur mise en forme sont la propriété exclusive de MARQUE BLANCHE, à l'exception des marques,
        logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs.
      </p>
      <p>
        Toute reproduction, distribution, modification, adaptation, retransmission ou publication,
        même partielle, de ces différents éléments est strictement interdite sans l'accord exprès
        par écrit de MARQUE BLANCHE. Cette représentation ou reproduction, par quelque procédé
        que ce soit, constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants
        du Code de la propriété intellectuelle.
      </p>
    </Section>

    <Section title="4. Responsabilité">
      <p>
        MARQUE BLANCHE met tout en œuvre pour offrir aux utilisateurs des informations disponibles
        et vérifiées. Toutefois, elle ne saurait être tenue responsable des erreurs, d'une absence
        de disponibilité des informations et/ou de la présence de virus sur le site.
      </p>
      <p>
        Le site peut contenir des liens hypertextes vers d'autres sites web. MARQUE BLANCHE ne
        peut en aucun cas être tenue responsable du contenu de ces sites et de l'usage qui pourra
        en être fait par les utilisateurs.
      </p>
    </Section>

    <Section title="5. Modification des mentions légales">
      <p>
        MARQUE BLANCHE se réserve le droit de modifier les présentes mentions à tout moment.
        L'utilisateur s'engage donc à les consulter régulièrement.
      </p>
    </Section>

    <Section title="6. Loi applicable">
      <p>
        Le site internet LOVCICOV est soumis au droit français. En cas de litige, les tribunaux
        français seront seuls compétents.
      </p>
    </Section>
  </LegalPage>
);

export default MentionsLegales;
