// LOVCICOV Magazine — editorial content graph.
// Each article is a long-form editorial piece. Products are only referenced when contextually relevant.

export interface MagazineSection {
  heading?: string;
  paragraphs: string[];
}

export interface MagazineArticle {
  slug: string;
  category: MagazineCategoryId;
  title: string;
  excerpt: string;
  intro: string;
  heroBg: string;
  publishedAt: string; // ISO date
  readingTime: number; // minutes
  sections: MagazineSection[];
  related?: string[]; // slugs
  ctaLabel?: string;
  ctaTo?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export type MagazineCategoryId =
  | 'style'
  | 'symbolisme'
  | 'pierres'
  | 'croissance'
  | 'guides'
  | 'maison'
  | 'savoir-faire'
  | 'portraits';

export interface MagazineCategory {
  id: MagazineCategoryId;
  label: string;
  description: string;
}

export const magazineCategories: MagazineCategory[] = [
  { id: 'style',        label: 'Style & Inspiration',   description: 'Silhouettes, associations, présence — la mode comme posture.' },
  { id: 'symbolisme',   label: 'Symbolisme & Sens',     description: 'Ce que portent les signes, les mots, les gestes.' },
  { id: 'pierres',      label: 'Pierres Naturelles',    description: 'Matière, provenance, entretien — le langage des minéraux.' },
  { id: 'croissance',   label: 'Croissance Personnelle', description: 'S’habiller comme un acte de clarté intérieure.' },
  { id: 'guides',       label: 'Guides & Sélections',   description: 'Repères pour choisir, offrir, transmettre.' },
  { id: 'maison',       label: 'Dans la Maison',        description: 'Les coulisses, les décisions, les convictions.' },
  { id: 'savoir-faire', label: 'Savoir-faire',          description: 'Les gestes, les matières, le temps long.' },
  { id: 'portraits',    label: 'Portraits de Femmes',   description: 'Celles qui incarnent la maison, à leur manière.' },
];

// Reusable editorial gradients — no external assets required.
const bgSand   = 'linear-gradient(135deg, #E8DCC8 0%, #C9B59A 100%)';
const bgLeather = 'linear-gradient(135deg, #6B4A2E 0%, #2E1F10 100%)';
const bgRust   = 'linear-gradient(135deg, #C8463A 0%, #E8DCC8 100%)';
const bgIvory  = 'linear-gradient(135deg, #F4EFE7 0%, #E1D5C2 100%)';
const bgStone  = 'linear-gradient(135deg, #A9A29A 0%, #4A4642 100%)';
const bgRose   = 'linear-gradient(135deg, #E8C7C0 0%, #B48A82 100%)';
const bgNight  = 'linear-gradient(135deg, #2A2A2E 0%, #0F0F12 100%)';
const bgBronze = 'linear-gradient(135deg, #C9A46B 0%, #7A5A34 100%)';

export const magazineArticles: MagazineArticle[] = [
  // — Savoir-faire — reprend les 3 récits sacs existants pour cohérence éditoriale
  {
    slug: 'le-geste-du-cuir-tresse',
    category: 'savoir-faire',
    title: 'Le geste du cuir tressé.',
    excerpt: 'Derrière chaque Big LOV, une main, un fil de cuir, et beaucoup de patience.',
    intro:
      "Derrière chaque Big LOV et chaque Small LOV, il y a une main, un fil de cuir, et beaucoup de patience.",
    heroBg: bgLeather,
    publishedAt: '2025-11-04',
    readingTime: 4,
    sections: [
      {
        heading: 'Un héritage de main',
        paragraphs: [
          "Le cuir tressé appartient à une longue lignée d’objets faits main — selleries, ceintures, paniers. Chez LOVCICOV, nous l’avons choisi parce qu’il porte en lui une promesse simple : celle d’un objet qui dure, qui se patine, qui devient plus beau avec le temps.",
          "Chaque sac est assemblé à la main, lanière après lanière. Le tressage n’est pas un détail décoratif — c’est la structure même du sac.",
        ],
      },
      {
        heading: 'Le choix du cuir',
        paragraphs: [
          "Nous travaillons avec un cuir pleine fleur, tanné en Europe, sélectionné pour sa souplesse et sa tenue. Sa surface mate accueille la couleur sans l’écraser.",
          "Ce cuir vit. Il prend la lumière, retient la trace du soleil, la mémoire des jours. C’est ce que nous cherchons : une pièce qui devient la vôtre.",
        ],
      },
      {
        heading: 'Le temps long',
        paragraphs: [
          "Un Big LOV demande plusieurs heures de tressage. Nous avons fait le choix d’une production restreinte, à contre-courant de la cadence habituelle de la mode. C’est ce qui nous permet de garantir une finition irréprochable.",
        ],
      },
    ],
    related: ['histoire-du-big-lov', 'comment-choisir-sa-couleur'],
    ctaLabel: 'Découvrir les sacs',
    ctaTo: '/sacs',
  },
  {
    slug: 'comment-choisir-sa-couleur',
    category: 'guides',
    title: 'Comment choisir sa couleur.',
    excerpt: 'Six teintes, six humeurs. Trouver le sac qui devient signature.',
    intro: 'Six teintes, six humeurs. Un petit guide pour trouver le sac qui devient signature.',
    heroBg: bgRust,
    publishedAt: '2025-11-11',
    readingTime: 3,
    sections: [
      {
        heading: 'Les indémodables',
        paragraphs: [
          "Le Noir et le Camel sont nos deux entrées en matière. Le Noir pour celles qui aiment la radicalité d’un vestiaire monochrome. Le Camel pour celles qui cherchent un neutre chaud, qui s’accorde aussi bien à un jean qu’à une robe longue.",
        ],
      },
      {
        heading: 'Les pièces de caractère',
        paragraphs: [
          "Le Rouge et le Cognac sont nos couleurs de signature. Elles s’adressent à celles qui veulent que le sac raconte quelque chose — qu’il devienne le point de bascule de la tenue.",
          "Portées sur une palette sobre, elles font office de bijou : un seul geste, et la silhouette bascule.",
        ],
      },
      {
        heading: 'Les nuances douces',
        paragraphs: [
          "Le Crème et le Chocolat sont les plus discrets de la palette. Le Crème pour les beaux jours, le Chocolat pour les transitions de saison.",
        ],
      },
    ],
    related: ['le-geste-du-cuir-tresse', 'histoire-du-big-lov'],
    ctaLabel: 'Voir la sélection sacs',
    ctaTo: '/sacs',
  },
  {
    slug: 'histoire-du-big-lov',
    category: 'maison',
    title: 'L’histoire du Big LOV.',
    excerpt: 'Comment un sac est devenu, pour la maison, une manière de parler de présence.',
    intro: 'Comment un sac est devenu, pour la maison, une manière de parler de présence.',
    heroBg: bgLeather,
    publishedAt: '2025-11-18',
    readingTime: 4,
    sections: [
      {
        heading: 'Le point de départ',
        paragraphs: [
          "Le Big LOV est né d’une intuition simple : nous voulions un sac qu’on garde dix ans. Un sac qui ne soit pas une saison, mais une habitude. Un sac qu’on porte le matin et le soir, qu’on prête, qu’on retrouve.",
        ],
      },
      {
        heading: 'La silhouette',
        paragraphs: [
          "Format ample, anses souples, structure tenue par le tressage. Le Big LOV se porte à la main ou à l’épaule. Il contient un ordinateur, un carnet, un foulard, tout ce qu’on emporte sans y penser.",
        ],
      },
      {
        heading: 'Une pièce, deux échelles',
        paragraphs: [
          "Le Small LOV est arrivé naturellement, comme une version plus intime du Big LOV. Même geste, même cuir, même tressage — mais à porter près du corps.",
        ],
      },
    ],
    related: ['le-geste-du-cuir-tresse', 'comment-choisir-sa-couleur'],
    ctaLabel: 'Explorer LOVBAG',
    ctaTo: '/sacs',
  },

  // — Style & Inspiration
  {
    slug: 'la-posture-comme-vetement',
    category: 'style',
    title: 'La posture comme vêtement.',
    excerpt: 'Ce qui fait la différence n’est pas la pièce, mais la manière de l’habiter.',
    intro:
      "Un vestiaire ne se lit pas dans la matière : il se lit dans le corps. Une réflexion sur la posture, cette étoffe invisible qui donne à chaque pièce sa vraie valeur.",
    heroBg: bgIvory,
    publishedAt: '2025-12-02',
    readingTime: 5,
    sections: [
      {
        heading: "L'étoffe invisible",
        paragraphs: [
          "On croit que le vêtement fait la femme. C’est l’inverse. Le vêtement révèle la façon dont on habite un espace, dont on regarde, dont on tient les épaules. Une même veste ne raconte jamais la même histoire selon celle qui la porte.",
          "La posture est notre première pièce. C’est celle que l’on emporte partout, que personne ne peut copier, et qui donne à chaque geste sa signature.",
        ],
      },
      {
        heading: 'Le silence des lignes',
        paragraphs: [
          "Chez LOVCICOV, nous dessinons des pièces qui laissent la place au corps. Les coupes sont nettes, les emmanchures précises, les longueurs justes — pour que rien ne parle plus fort que celle qui les porte.",
          "Cette économie du geste est un parti pris : moins d’effets, plus de présence.",
        ],
      },
      {
        heading: "Être vue, pas remarquée",
        paragraphs: [
          "Il y a une différence entre être vue et être remarquée. La première appartient à celles qui sont pleinement là. La seconde à celles qui cherchent à l’être. Notre vestiaire est pensé pour la première catégorie.",
        ],
      },
    ],
    related: ['discipline-comme-luxe', 'porter-son-intention'],
    ctaLabel: 'Explorer PowerLov',
    ctaTo: '/powerlov',
  },

  // — Croissance
  {
    slug: 'discipline-comme-luxe',
    category: 'croissance',
    title: 'La discipline comme luxe.',
    excerpt: 'Ce qui coûte le plus n’est ni la matière ni le temps : c’est la constance.',
    intro:
      "La devise PowerLov n’est pas une posture — c’est une lecture du monde. Explorer pourquoi la discipline, aujourd’hui, est devenue la plus rare des élégances.",
    heroBg: bgNight,
    publishedAt: '2025-12-09',
    readingTime: 6,
    sections: [
      {
        heading: 'Un mot à contre-courant',
        paragraphs: [
          "La discipline a mauvaise presse. On la confond avec la rigidité, avec l’effort visible, avec le renoncement. En réalité, elle est ce qui libère : elle enlève le bruit pour laisser la place à ce qui compte.",
        ],
      },
      {
        heading: 'Le luxe, aujourd’hui',
        paragraphs: [
          "Le luxe ne se joue plus dans la matière — la matière noble est devenue accessible. Il se joue dans le temps : le temps qu’on prend, le temps qu’on garde, le temps qu’on ne perd pas.",
          "Une routine tenue, un choix maintenu, une parole gardée : ce sont les nouvelles pièces rares. Elles ne s’achètent pas. Elles se construisent.",
        ],
      },
      {
        heading: 'S’habiller comme un rituel',
        paragraphs: [
          "S’habiller peut être un acte de discipline. Choisir des pièces qui durent, les porter souvent, y revenir. Ce n’est pas de la privation — c’est de la clarté.",
        ],
      },
    ],
    related: ['la-posture-comme-vetement', 'porter-son-intention'],
    ctaLabel: 'Découvrir PowerLov',
    ctaTo: '/powerlov',
  },

  // — Symbolisme
  {
    slug: 'porter-son-intention',
    category: 'symbolisme',
    title: 'Porter son intention.',
    excerpt: 'La broderie MysticLov n’est pas un motif — c’est une phrase adressée à soi.',
    intro:
      "Chaque pièce MysticLov porte une intention. Ce n’est pas un slogan, ni une décoration : c’est une phrase qu’on répète, chaque fois qu’on l’enfile.",
    heroBg: bgRose,
    publishedAt: '2025-12-16',
    readingTime: 5,
    sections: [
      {
        heading: "Le vêtement qui parle",
        paragraphs: [
          "Depuis toujours, les vêtements portent des signes. Blasons, monogrammes, devises. Chez MysticLov, ces signes reviennent — brodés main, en une phrase courte, souvent en anglais, toujours en majuscules.",
          "Ces mots ne s’adressent pas au monde. Ils s’adressent à celle qui les porte.",
        ],
      },
      {
        heading: 'Le talisman contemporain',
        paragraphs: [
          "Un talisman n’est pas un objet magique. C’est un objet qui rappelle. Il ancre une intention dans la matière, pour qu’on ne l’oublie pas au fil de la journée.",
          "C’est exactement ce que fait MysticLov : transformer un t-shirt, un hoodie, une pièce du quotidien, en support d’un mot qu’on choisit de porter.",
        ],
      },
      {
        heading: 'Choisir sa phrase',
        paragraphs: [
          "Choisir une pièce MysticLov, c’est choisir une phrase pour la saison. Pas un manifeste, pas une revendication — une note pour soi.",
        ],
      },
    ],
    related: ['langage-des-pierres', 'discipline-comme-luxe'],
    ctaLabel: 'Découvrir MysticLov',
    ctaTo: '/mysticlov',
  },

  // — Pierres naturelles
  {
    slug: 'langage-des-pierres',
    category: 'pierres',
    title: 'Le langage des pierres.',
    excerpt: 'Chaque pierre a une histoire, une origine, une matière. Apprendre à les lire.',
    intro:
      "Les pierres qui composent nos bijoux StoneLov ne sont jamais choisies au hasard. Petit guide pour comprendre ce qu’elles disent, et pourquoi elles nous accompagnent.",
    heroBg: bgStone,
    publishedAt: '2025-12-23',
    readingTime: 6,
    sections: [
      {
        heading: 'La provenance',
        paragraphs: [
          "Une pierre est d’abord un lieu. Le lapis-lazuli vient d’Afghanistan, la turquoise du Sinaï, l’œil de tigre d’Afrique du Sud. Elles portent en elles la mémoire d’un sol, d’une lumière, d’un chemin.",
          "Chez LOVCICOV, nous choisissons nos pierres avec des lapidaires indépendants. Ce sont eux qui garantissent la traçabilité et la qualité de la taille.",
        ],
      },
      {
        heading: 'La matière',
        paragraphs: [
          "Chaque pierre a une densité, une transparence, une manière de refléter la lumière. C’est ce que nous appelons son grain. Une pierre bien taillée respecte ce grain — elle ne cherche pas à imiter une autre matière.",
        ],
      },
      {
        heading: 'L’entretien',
        paragraphs: [
          "Les pierres naturelles se portent, se rangent, se nettoient. Un chiffon doux suffit. Évitez les parfums directement sur la pierre, et rangez chaque bijou à plat, à l’écart des autres.",
          "Bien entretenue, une pierre gagne en éclat avec les années.",
        ],
      },
    ],
    related: ['porter-son-intention', 'guide-cadeaux-fetes'],
    ctaLabel: 'Voir les bijoux StoneLov',
    ctaTo: '/stonelov',
  },

  // — Guides
  {
    slug: 'guide-cadeaux-fetes',
    category: 'guides',
    title: 'Guide cadeaux — l’essentiel LOVCICOV.',
    excerpt: 'Une sélection lente. Peu de pièces, pensées pour durer au-delà de la saison.',
    intro:
      "Offrir une pièce LOVCICOV, c’est offrir un objet qui reste. Voici comment naviguer nos trois univers pour trouver la juste attention.",
    heroBg: bgBronze,
    publishedAt: '2026-01-06',
    readingTime: 5,
    sections: [
      {
        heading: 'Pour celles qui aiment le vestiaire signé',
        paragraphs: [
          "Un sweat ou un t-shirt PowerLov. Coupe nette, matière dense, message clair. Un cadeau qui entre immédiatement dans un vestiaire existant, sans chercher à le remplacer.",
        ],
      },
      {
        heading: 'Pour celles qui aiment les objets qui parlent',
        paragraphs: [
          "Une pièce MysticLov brodée main. Le choix de la phrase compte : offrir un mot, c’est déposer une attention.",
        ],
      },
      {
        heading: 'Pour celles qui aiment le bijou',
        paragraphs: [
          "Un bijou StoneLov. La pierre se choisit autant pour sa couleur que pour ce qu’elle représente. Un cadeau qui se garde longtemps, se transmet parfois.",
        ],
      },
      {
        heading: 'Pour l’occasion la plus importante',
        paragraphs: [
          "Un sac LOVBAG. C’est l’objet cadeau par excellence : rare, artisanal, intemporel.",
        ],
      },
    ],
    related: ['langage-des-pierres', 'porter-son-intention'],
    ctaLabel: 'Explorer la boutique',
    ctaTo: '/shop',
  },

  // — Portraits
  {
    slug: 'georgiana-lovcicov-portrait',
    category: 'portraits',
    title: 'Georgiana Lovcicov — la maison en une femme.',
    excerpt: 'Portrait de la fondatrice, de son geste, de son exigence.',
    intro:
      "Fondatrice, directrice artistique, et première cliente. Portrait de celle qui a donné son nom à la maison — et qui continue de la dessiner, pièce après pièce.",
    heroBg: bgSand,
    publishedAt: '2026-01-13',
    readingTime: 5,
    sections: [
      {
        heading: 'Une intuition',
        paragraphs: [
          "LOVCICOV est né d’une intuition simple : ce que nous portons devrait nous rappeler ce que nous voulons être. Pas un déguisement, pas une carte de visite — un rappel discret.",
        ],
      },
      {
        heading: 'L’exigence',
        paragraphs: [
          "Chaque coupe est validée sur son propre corps, chaque broderie approuvée à la main, chaque pierre choisie en atelier. La maison ne grandit qu’à la vitesse de cette exigence.",
        ],
      },
      {
        heading: 'La suite',
        paragraphs: [
          "Rester indépendants. Grandir sans se disperser. Garder la main. Cette phrase revient souvent dans ses carnets. Elle résume assez bien l’avenir de la maison.",
        ],
      },
    ],
    related: ['discipline-comme-luxe', 'la-posture-comme-vetement'],
    ctaLabel: 'Lire le portrait complet',
    ctaTo: '/fondatrice',
  },
];

export const getArticle = (slug: string) => magazineArticles.find(a => a.slug === slug);
export const getCategory = (id: MagazineCategoryId) => magazineCategories.find(c => c.id === id)!;
export const articlesByCategory = (id: MagazineCategoryId) =>
  magazineArticles.filter(a => a.category === id);
