/**
 * Dados oficiais da Abreu Inox.
 * Fonte única para contato, SEO e dados estruturados: altere aqui e o site
 * inteiro acompanha. Não inclua informação que a empresa não confirmou
 * (endereço completo, CEP, coordenadas, horário, avaliações).
 */
export const site = {
  name: "ABREU INOX",
  shortName: "Abreu Inox",
  url: "https://abreuinox.com",
  locale: "pt_BR",
  tagline: "ABREU INOX. SOLUÇÕES EM AÇO INOX PARA CADA PROJETO.",

  seo: {
    title: "Corrimão e Guarda Corpo de Inox em Brasília | Abreu Inox",
    description:
      "Corrimãos, guarda corpos, escadas, móveis e estruturas em aço inox sob medida. Atendemos DF e Goiás, com nota fiscal e faturamento. Peça seu orçamento.",
  },

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

  experience: "Mais de 30 anos de mercado",
} as const;

/** Mensagens pré-preenchidas do WhatsApp, por perfil de quem pede o orçamento. */
export const whatsappMessages = {
  default:
    "Olá! Encontrei a Abreu Inox pelo site e gostaria de solicitar um orçamento para um serviço em aço inox.",
  company:
    "Olá! Represento uma empresa e gostaria de solicitar um orçamento para fabricação ou instalação de estruturas em aço inox, com emissão de nota fiscal.",
  publicSector:
    "Olá! Represento um órgão público e gostaria de solicitar um orçamento de serviços em aço inox. Gostaria também de consultar as condições de faturamento e a documentação disponível.",
} as const;

export type WhatsAppAudience = keyof typeof whatsappMessages;
