import ArticleTemplate from '@/components/ArticleTemplate';

const SacsCuirTresse = () => (
  <ArticleTemplate
    category="Savoir-faire · Sacs"
    title="Le geste du cuir tressé."
    intro="Derrière chaque Big LOV et chaque Small LOV, il y a une main, un fil de cuir, et beaucoup de patience."
    heroBg="linear-gradient(135deg, #6B4A2E 0%, #2E1F10 100%)"
    sections={[
      {
        heading: 'Un héritage de main',
        paragraphs: [
          "Le cuir tressé appartient à une longue lignée d'objets faits main — selleries, ceintures, paniers. Chez LOVCICOV, nous l'avons choisi parce qu'il porte en lui une promesse simple : celle d'un objet qui dure, qui se patine, qui devient plus beau avec le temps.",
          "Chaque sac est assemblé à la main, lanière après lanière. Le tressage n'est pas un détail décoratif — c'est la structure même du sac.",
        ],
      },
      {
        heading: 'Le choix du cuir',
        paragraphs: [
          "Nous travaillons avec un cuir pleine fleur, tanné en Europe, sélectionné pour sa souplesse et sa tenue. Sa surface mate accueille la couleur sans l'écraser.",
          "Texte placeholder. Ce contenu sera affiné en septembre lors de l'activation officielle de la collection.",
        ],
      },
      {
        heading: 'Le temps long',
        paragraphs: [
          "Un Big LOV demande plusieurs heures de tressage. Nous avons fait le choix d'une production restreinte, à contre-courant de la cadence habituelle de la mode. C'est ce qui nous permet de garantir une finition irréprochable.",
        ],
      },
    ]}
  />
);

export default SacsCuirTresse;
