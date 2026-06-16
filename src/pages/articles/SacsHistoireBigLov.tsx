import ArticleTemplate from '@/components/ArticleTemplate';

const SacsHistoireBigLov = () => (
  <ArticleTemplate
    category="Récit · Sacs"
    title="L'histoire du Big LOV."
    intro="Comment un sac est devenu, pour la maison, une manière de parler de présence."
    heroBg="linear-gradient(135deg, #2E1F10 0%, #6B4A2E 100%)"
    sections={[
      {
        heading: 'Le point de départ',
        paragraphs: [
          "Le Big LOV est né d'une intuition simple : nous voulions un sac qu'on garde dix ans. Un sac qui ne soit pas une saison, mais une habitude. Un sac qu'on porte le matin et le soir, qu'on prête, qu'on retrouve.",
          "Texte placeholder. Le récit complet sera publié en septembre.",
        ],
      },
      {
        heading: 'La silhouette',
        paragraphs: [
          "Format ample, anses souples, structure tenue par le tressage. Le Big LOV se porte à la main ou à l'épaule. Il contient un ordinateur, un carnet, un foulard, tout ce qu'on emporte sans y penser.",
        ],
      },
      {
        heading: 'Une pièce, deux échelles',
        paragraphs: [
          "Le Small LOV est arrivé naturellement, comme une version plus intime du Big LOV. Même geste, même cuir, même tressage — mais à porter près du corps.",
        ],
      },
    ]}
  />
);

export default SacsHistoireBigLov;
