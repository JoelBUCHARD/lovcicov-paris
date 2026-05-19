export interface StoneInfo {
  key: string;
  name: string; // display name uppercase
  color: string; // natural color hex
  meaning: string;
  symbol?: string; // short symbolic word (transformation, vitalité, etc.)
  patterns: RegExp[]; // patterns to detect in product name/description
}

export const STONE_MEANINGS: StoneInfo[] = [
  {
    key: 'amethyste',
    name: 'AMÉTHYSTE',
    color: '#7B4FE0',
    meaning: "Pierre de protection et d'intuition. Elle apaise l'esprit, favorise la clarté mentale et renforce la connexion à soi.",
    symbol: "la sagesse",
    patterns: [/am[ée]thyste/i],
  },
  {
    key: 'lapis',
    name: 'LAPIS-LAZULI',
    color: '#1A3A8F',
    meaning: "Pierre de sagesse et de vérité. Elle stimule la confiance en soi, encourage l'expression authentique et ouvre la conscience.",
    symbol: "la vérité",
    patterns: [/lapis[- ]?lazuli/i],
  },
  {
    key: 'malachite',
    name: 'MALACHITE',
    color: '#2D6A4F',
    meaning: "Pierre de transformation. Elle accompagne les périodes de changement, protège des influences extérieures et libère les émotions bloquées.",
    symbol: "la transformation",
    patterns: [/malachite/i],
  },
  {
    key: 'corail',
    name: 'CORAIL ROUGE',
    color: '#E63946',
    meaning: "Pierre de vitalité et de courage. Elle stimule la force de vie, renforce l'énergie et invite à avancer avec confiance.",
    symbol: "la vitalité",
    patterns: [/corail/i],
  },
  {
    key: 'turquoise',
    name: 'TURQUOISE',
    color: '#2EBFA5',
    meaning: "Pierre de protection et d'équilibre. Elle harmonise le corps et l'esprit, apporte la sérénité et renforce la communication.",
    symbol: "l'équilibre",
    patterns: [/turquoise/i],
  },
  {
    key: 'quartz-rose',
    name: 'QUARTZ ROSE',
    color: '#F2D9E0',
    meaning: "Pierre d'amour inconditionnel. Elle ouvre le cœur, favorise la douceur envers soi-même et attire les relations bienveillantes.",
    symbol: "l'amour",
    patterns: [/quartz\s*rose/i],
  },
  {
    key: 'aventurine',
    name: 'AVENTURINE',
    color: '#4A9B6E',
    meaning: "Pierre de chance et de prospérité. Elle encourage l'optimisme, dissout les blocages émotionnels et attire les opportunités.",
    symbol: "la chance",
    patterns: [/aventurine/i],
  },
  {
    key: 'obsidienne',
    name: 'OBSIDIENNE',
    color: '#1A1A1A',
    meaning: "Pierre de protection absolue. Elle absorbe les énergies négatives, ancre dans le présent et révèle la vérité intérieure.",
    symbol: "la protection",
    patterns: [/obsidienne/i],
  },
  {
    key: 'onyx',
    name: 'ONYX',
    color: '#2B2B2B',
    meaning: "Pierre de force et de maîtrise de soi. Elle stabilise les émotions, renforce la détermination et protège contre les doutes.",
    symbol: "la force",
    patterns: [/onyx/i],
  },
  {
    key: 'labradorite',
    name: 'LABRADORITE',
    color: '#3C5A6E',
    meaning: "Pierre de magie et d'intuition. Elle révèle les talents cachés, protège l'aura et stimule l'imagination créatrice.",
    symbol: "l'intuition",
    patterns: [/labradorite/i],
  },
  {
    key: 'grenat',
    name: 'GRENAT',
    color: '#7A1F2B',
    meaning: "Pierre de passion et d'énergie vitale. Elle réveille la sensualité, renforce l'engagement et insuffle une énergie profonde et durable.",
    symbol: "la passion",
    patterns: [/grenat/i],
  },
  {
    key: 'oeil-tigre',
    name: 'OEIL DE TIGRE',
    color: '#B07A2B',
    meaning: "Pierre de confiance et de clarté. Elle aide à prendre des décisions justes, renforce la volonté et ancre dans l'action.",
    symbol: "la confiance",
    patterns: [/œil\s*de\s*tigre/i, /oeil\s*de\s*tigre/i],
  },
];

// The 6 hero stones for the StoneLov collection page
export const HERO_STONE_KEYS = ['amethyste', 'lapis', 'malachite', 'corail', 'turquoise', 'quartz-rose'];

export function detectStones(text: string): StoneInfo[] {
  const matches: StoneInfo[] = [];
  for (const stone of STONE_MEANINGS) {
    if (stone.patterns.some((re) => re.test(text))) {
      matches.push(stone);
    }
  }
  return matches;
}
