import ArticleTemplate from '@/components/ArticleTemplate';

const SacsChoisirCouleur = () => (
  <ArticleTemplate
    category="Style · Sacs"
    title="Comment choisir sa couleur."
    intro="Six teintes, six humeurs. Un petit guide pour trouver le sac qui devient signature."
    heroBg="linear-gradient(135deg, #C8463A 0%, #E8DCC8 100%)"
    sections={[
      {
        heading: 'Les indémodables',
        paragraphs: [
          "Le Noir et le Camel sont nos deux entrées en matière. Le Noir pour celles qui aiment la radicalité d'un vestiaire monochrome. Le Camel pour celles qui cherchent un neutre chaud, qui s'accorde aussi bien à un jean qu'à une robe longue.",
        ],
      },
      {
        heading: 'Les pièces de caractère',
        paragraphs: [
          "Le Rouge et le Cognac sont nos couleurs de signature. Elles s'adressent à celles qui veulent que le sac raconte quelque chose — qu'il devienne le point de bascule de la tenue.",
          "Texte placeholder. Le guide complet sera enrichi en septembre.",
        ],
      },
      {
        heading: 'Les nuances douces',
        paragraphs: [
          "Le Crème et le Chocolat sont les plus discrets de la palette. Le Crème pour les beaux jours, le Chocolat pour les transitions de saison.",
        ],
      },
    ]}
  />
);

export default SacsChoisirCouleur;
