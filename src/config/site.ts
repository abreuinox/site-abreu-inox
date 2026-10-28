/**
 * Dados oficiais da Abreu Inox.
 * Fonte única para contato, SEO e dados estruturados: altere aqui e o site
 * inteiro acompanha. Não inclua informação que a empresa não confirmou
 * (endereço completo, CEP, coordenadas, horário, avaliações, CNPJ, data de
 * fundação). Pendências de validação ficam em docs/seo/CHECKLIST-PUBLICACAO.md.
 */
export const site = {
  name: "ABREU INOX",
  shortName: "Abreu Inox",
  url: "https://abreuinox.com",
  locale: "pt_BR",
  tagline: "ABREU INOX. SOLUÇÕES EM AÇO INOX PARA CADA PROJETO.",

  seo: {
    title: "Abreu Inox | Soluções em Aço Inox Sob Medida em Brasília e DF",
    description:
      "Mais de 30 anos de experiência em aço inox: corrimãos, guarda-corpos, escadas e peças sob medida para empresas, órgãos públicos e residências no DF e em Goiás.",
  },

  /** Descrição institucional usada nos dados estruturados e no llms.txt. */
  about:
    "A Abreu Inox fabrica e instala soluções em aço inox sob medida, como corrimãos, guarda-corpos, acabamentos em inox para escadas curvas e helicoidais, móveis e peças personalizadas. Atende empresas, condomínios, construtoras, órgãos públicos e residências no Distrito Federal e em Goiás, com emissão de nota fiscal e faturamento.",

  whatsapp: {
    /** Formato internacional, apenas dígitos, como o WhatsApp exige. */
    number: "5561981128386",
    e164: "+5561981128386",
    display: "(61) 98112-8386",
  },

  instagram: {
    url: "https://www.instagram.com/abreuinox/",
    handle: "@abreuinox",
  },

  base: {
    label: "Ceilândia-DF",
    city: "Ceilândia",
    region: "DF",
    country: "BR",
  },

  serviceArea: {
    label: "Distrito Federal e Goiás",
    note: "mediante avaliação da demanda e viabilidade de atendimento",
    states: ["Distrito Federal", "Goiás"],
  },

  /** Experiência declarada pelo proprietário. Não confundir com a data de abertura do CNPJ. */
  experience: "Mais de 30 anos de experiência",
  experienceShort: "+30 anos",

  /** Imagem padrão de compartilhamento (1200x630). */
  ogImage: {
    url: "/images/brand/abreu-inox-og.jpg",
    width: 1200,
    height: 630,
    alt: "Abreu Inox: guarda-corpo em aço inox em escada helicoidal",
  },

  logo: "/images/brand/abreu-inox-logo.jpg",

  /**
   * Data da última revisão do conteúdo institucional (páginas fixas).
   * Atualize quando o texto das páginas mudar; o sitemap usa este valor.
   */
  contentUpdatedAt: "2026-10-27",
} as const;

/** Mensagens pré-preenchidas do WhatsApp, por perfil ou serviço de quem pede o orçamento. */
export const whatsappMessages = {
  default:
    "Olá! Encontrei a Abreu Inox pelo site e gostaria de solicitar um orçamento para um serviço em aço inox.",
  company:
    "Olá! Represento uma empresa e gostaria de solicitar um orçamento para fabricação ou instalação de estruturas em aço inox, com emissão de nota fiscal.",
  publicSector:
    "Olá! Represento um órgão público e gostaria de solicitar um orçamento de serviços em aço inox. Gostaria também de consultar as condições de faturamento e a documentação disponível.",
  corrimaos:
    "Olá! Encontrei a Abreu Inox pelo site e gostaria de solicitar um orçamento de corrimão em aço inox.",
  guardaCorpos:
    "Olá! Encontrei a Abreu Inox pelo site e gostaria de solicitar um orçamento de guarda-corpo em aço inox.",
  escadas:
    "Olá! Encontrei a Abreu Inox pelo site e gostaria de um orçamento de corrimão ou guarda-corpo em inox para escada curva ou helicoidal.",
  sobMedida:
    "Olá! Encontrei a Abreu Inox pelo site e gostaria de conversar sobre uma peça ou estrutura em aço inox sob medida.",
  project:
    "Olá! Vi um projeto no site da Abreu Inox e gostaria de um orçamento para algo parecido.",
} as const;

export type WhatsAppAudience = keyof typeof whatsappMessages;
