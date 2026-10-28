import type { WhatsAppAudience } from "@/config/site";

/**
 * Páginas de soluções (/solucoes/[slug]/).
 *
 * Cada solução só existe porque há serviço confirmado pela empresa e
 * projetos reais no portfólio. Antes de criar uma nova (ex.: bancadas,
 * equipamentos industriais), confirme a capacidade com o proprietário e
 * tenha fotos de trabalhos executados. Ver docs/seo/ARQUITETURA-SEO.md.
 */
export type FaqItem = { question: string; answer: string };

export type Solution = {
  slug: string;
  /** Nome curto, usado em menus, breadcrumbs e cards. */
  name: string;
  /** Title da página (o sufixo "| Abreu Inox" é adicionado pelo template). */
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** Resumo de uma frase para cards e dados estruturados. */
  summary: string;
  intro: string;
  /** Onde a solução é aplicada, com base nos serviços e projetos publicados. */
  applications: { title: string; text: string }[];
  /** Detalhes técnicos e de acabamento observados nos projetos executados. */
  details: { title: string; text: string }[];
  /** O que enviar para agilizar o orçamento desta solução. */
  briefing: string[];
  faq: FaqItem[];
  /** Categorias do portfólio (projects.json) exibidas nesta página. */
  projectCategories: string[];
  /** Projetos de outras categorias que também ilustram esta solução. */
  extraProjectIds?: string[];
  /** Serviços de services.ts cobertos por esta página. */
  serviceIds: string[];
  whatsapp: WhatsAppAudience;
  ctaLabel: string;
  /** Valor do campo "serviço" no formulário de orçamento. */
  quoteService: string;
};

export const solutions: Solution[] = [
  {
    slug: "corrimaos-em-inox",
    name: "Corrimãos em inox",
    metaTitle: "Corrimão de Inox Sob Medida em Brasília e no DF",
    metaDescription:
      "Corrimãos em aço inox sob medida para escadas, rampas de acessibilidade, arquibancadas e piscinas. Fabricação e instalação no DF e em Goiás. Peça seu orçamento.",
    h1: "Corrimãos em aço inox sob medida",
    summary:
      "Corrimãos em aço inox fabricados e instalados sob medida para escadas, rampas, arquibancadas e acessos a piscinas.",
    intro:
      "A Abreu Inox fabrica e instala corrimãos em aço inox para escadas internas, escadarias de edifícios, rampas de acessibilidade, arquibancadas e acessos a piscinas. Cada corrimão é dimensionado a partir das medidas do local, do tipo de fixação possível e do uso previsto, para residências, condomínios, empresas e órgãos públicos.",
    applications: [
      {
        title: "Escadas internas e de edifícios",
        text: "Corrimãos de parede ou fixados nos degraus, com continuidade entre os lances e arremates curvos na chegada da escada.",
      },
      {
        title: "Rampas de acessibilidade",
        text: "Corrimãos duplos, em duas alturas, para rampas e escadas de acesso de edifícios e áreas de circulação de público.",
      },
      {
        title: "Arquibancadas e ginásios",
        text: "Corrimãos duplos ao longo dos degraus e nos acessos de arquibancadas, para apoio na circulação.",
      },
      {
        title: "Piscinas e áreas de lazer",
        text: "Corrimãos fixados na borda para apoiar a entrada e a saída da piscina e corrimãos para rampas da área de lazer.",
      },
    ],
    details: [
      {
        title: "Fixação adequada ao local",
        text: "Fixação em parede, no piso ou nos próprios degraus, definida a partir da estrutura existente e do espaço de circulação.",
      },
      {
        title: "Curvas e extremidades",
        text: "Tubos curvados para acompanhar viradas de patamar e extremidades com arremate curvo, sem pontas expostas.",
      },
      {
        title: "Acabamento",
        text: "Projetos executados com aço inox escovado ou polido, conforme o padrão do ambiente e a preferência do cliente.",
      },
    ],
    briefing: [
      "Fotos do local (escada, rampa ou área) de diferentes ângulos",
      "Medidas aproximadas: comprimento, número de lances e altura dos degraus",
      "Onde o corrimão pode ser fixado: parede, piso ou degraus",
      "Se a obra tem projeto de arquitetura ou de acessibilidade",
      "Cidade e região do DF ou de Goiás onde fica a obra",
    ],
    faq: [
      {
        question: "Quanto custa um corrimão de inox?",
        answer:
          "O valor depende da metragem, do número de curvas e viradas, do tipo de fixação, do acabamento e do local da instalação. Por isso a Abreu Inox prepara um orçamento personalizado a partir de fotos e medidas do local. Envie as informações pelo WhatsApp ou pelo formulário de orçamento.",
      },
      {
        question: "A Abreu Inox instala corrimão em rampa de acessibilidade?",
        answer:
          "Sim. O portfólio inclui corrimãos duplos, em duas alturas, instalados em rampas e escadas de acesso de edifícios. Em obras com exigências de acessibilidade, as especificações devem seguir o projeto e a norma ABNT NBR 9050; informe no pedido se a obra tem projeto aprovado.",
      },
      {
        question: "Vocês fazem corrimão para condomínios, empresas e órgãos públicos?",
        answer:
          "Sim. A Abreu Inox atende residências, condomínios, empresas e órgãos públicos, com emissão de nota fiscal e faturamento.",
      },
      {
        question: "Em quais regiões vocês instalam corrimãos?",
        answer:
          "A base operacional fica em Ceilândia-DF. São feitos orçamentos para o Distrito Federal e Goiás, mediante avaliação da demanda e da viabilidade de atendimento.",
      },
    ],
    projectCategories: ["Corrimãos"],
    extraProjectIds: ["corrimao-piscina"],
    serviceIds: ["corrimoes"],
    whatsapp: "corrimaos",
    ctaLabel: "Solicitar orçamento de corrimão",
    quoteService: "Corrimão em inox",
  },
  {
    slug: "guarda-corpos-em-inox",
    name: "Guarda-corpos em inox",
    metaTitle: "Guarda-Corpo de Inox Sob Medida em Brasília e no DF",
    metaDescription:
      "Guarda-corpos em aço inox para escadas, mezaninos, sacadas, piscinas e halls, com ou sem vidro. Fabricação e instalação sob medida no DF e em Goiás.",
    h1: "Guarda-corpos em aço inox sob medida",
    summary:
      "Guarda-corpos em aço inox, com ou sem vidro, para escadas, mezaninos, sacadas, varandas, piscinas e halls de edifícios.",
    intro:
      "A Abreu Inox fabrica e instala guarda-corpos em aço inox para escadas, mezaninos, sacadas, varandas e áreas de piscina, além de guarda-corpos com vidro para organizar a circulação em halls e recepções. O desenho é definido para cada local: montantes, balaústres, longarinas e corrimão superior acompanham a geometria da escada ou do vão.",
    applications: [
      {
        title: "Escadas e mezaninos",
        text: "Guarda-corpos contínuos do primeiro degrau até o mezanino ou pavimento superior, inclusive nas viradas de patamar.",
      },
      {
        title: "Sacadas e varandas",
        text: "Proteção em aço inox para bordas de sacadas e varandas, com desenho adequado à fachada e ao uso do espaço.",
      },
      {
        title: "Piscinas e áreas de lazer",
        text: "Guarda-corpos acompanhando rampas e contornos curvos de áreas de piscina.",
      },
      {
        title: "Halls, recepções e controle de acesso",
        text: "Guarda-corpos em inox com fechamento em vidro para direcionar o fluxo de pessoas até catracas e elevadores.",
      },
    ],
    details: [
      {
        title: "Modelos executados",
        text: "Balaústres verticais, longarinas horizontais ou inclinadas, montantes de tubo redondo ou quadrado e fechamento em vidro.",
      },
      {
        title: "Corrimão integrado",
        text: "Corrimão superior simples ou duplo, contínuo entre lances e patamares.",
      },
      {
        title: "Acabamento",
        text: "Aço inox escovado ou polido, conforme o padrão do ambiente.",
      },
    ],
    briefing: [
      "Fotos do vão, da escada ou da área a proteger",
      "Medidas aproximadas de comprimento e altura disponível",
      "Modelo desejado: só inox ou inox com vidro",
      "Tipo de piso e onde é possível fixar os montantes",
      "Projeto de arquitetura, se houver",
    ],
    faq: [
      {
        question: "Qual a diferença entre guarda-corpo e corrimão?",
        answer:
          "O guarda-corpo é a barreira de proteção que evita quedas em bordas de escadas, mezaninos, sacadas e desníveis. O corrimão é a barra de apoio para as mãos durante a circulação. Muitos projetos combinam os dois: um guarda-corpo com corrimão integrado na parte superior.",
      },
      {
        question: "Vocês fazem guarda-corpo de inox com vidro?",
        answer:
          "Sim. O portfólio inclui guarda-corpos em aço inox com fechamento em vidro em halls de edifícios e recepções com catracas.",
      },
      {
        question: "Quais normas um guarda-corpo precisa atender?",
        answer:
          "No Brasil, guarda-corpos de edificações são tratados pela norma ABNT NBR 14718, que trata de requisitos como altura, resistência e aberturas. As exigências de cada obra devem ser verificadas no projeto e com o responsável técnico; informe no pedido se há especificação a seguir.",
      },
      {
        question: "Quanto tempo leva para fabricar um guarda-corpo?",
        answer:
          "O prazo depende do tamanho, do modelo e da agenda de produção. Ele é informado no orçamento, depois da avaliação da demanda.",
      },
    ],
    projectCategories: ["Guarda-corpos"],
    extraProjectIds: ["guarda-corpo-area-piscinas"],
    serviceIds: ["guarda-corpos", "guarda-corpos-piscinas"],
    whatsapp: "guardaCorpos",
    ctaLabel: "Solicitar orçamento de guarda-corpo",
    quoteService: "Guarda-corpo em inox",
  },
  {
    slug: "escadas-em-inox",
    name: "Escadas em inox",
    metaTitle: "Escada Helicoidal: Guarda-Corpo e Escadas em Inox no DF",
    metaDescription:
      "Escadas em aço inox e guarda-corpos com tubos curvados para escadas helicoidais e curvas em mármore ou granito. Projetos sob medida no DF e em Goiás.",
    h1: "Escadas em inox e acabamentos para escadas helicoidais e curvas",
    summary:
      "Escadas em aço inox sob medida e corrimãos e guarda-corpos com tubos curvados para escadas helicoidais e curvas.",
    intro:
      "Escadas helicoidais e curvas exigem tubos curvados com precisão para acompanhar o raio de cada degrau. A Abreu Inox fabrica escadas em aço inox projetadas para o espaço e executa corrimãos e guarda-corpos curvos para escadas helicoidais e curvas existentes, inclusive com degraus em mármore ou granito.",
    applications: [
      {
        title: "Escadas helicoidais",
        text: "Guarda-corpo e corrimão acompanhando o giro completo da escada, com fechamento circular no pavimento superior quando necessário.",
      },
      {
        title: "Escadas curvas residenciais",
        text: "Guarda-corpos com corrimão e tubos curvados sob medida, do início da escada ao pavimento superior.",
      },
      {
        title: "Escadas curvas de edifícios",
        text: "Balaústres verticais e corrimão duplo curvados para acompanhar os lances e o patamar.",
      },
      {
        title: "Escadas em aço inox",
        text: "Escadas em aço inox projetadas de acordo com o espaço disponível e o uso previsto.",
      },
    ],
    details: [
      {
        title: "Tubos calandrados",
        text: "Os tubos são curvados para seguir o raio da escada, o que mantém o corrimão contínuo e uniforme em todo o percurso.",
      },
      {
        title: "Compatível com mármore e granito",
        text: "Projetos executados em escadas com degraus em mármore e granito, com a fixação planejada conforme o revestimento.",
      },
      {
        title: "Montagem no local",
        text: "Instalação feita na obra, com o ajuste das peças às curvas e viradas da escada.",
      },
    ],
    briefing: [
      "Fotos da escada inteira e dos pontos de chegada",
      "Tipo de escada: helicoidal, curva ou reta com patamar",
      "Revestimento dos degraus (mármore, granito, madeira, concreto)",
      "Número aproximado de degraus e altura entre pavimentos",
      "Projeto de arquitetura, se houver",
    ],
    faq: [
      {
        question: "É possível instalar guarda-corpo de inox em uma escada helicoidal já pronta?",
        answer:
          "Sim. Vários projetos do portfólio da Abreu Inox são guarda-corpos e corrimãos instalados em escadas helicoidais e curvas existentes, com degraus em mármore ou granito. A viabilidade é avaliada a partir de fotos e medidas da escada.",
      },
      {
        question: "O corrimão curvo fica contínuo, sem emendas aparentes?",
        answer:
          "Os tubos são curvados para acompanhar o raio da escada, o que permite manter a continuidade do corrimão ao longo do giro. O acabamento das uniões é tratado durante a fabricação e a instalação.",
      },
      {
        question: "Vocês fabricam a escada inteira em inox?",
        answer:
          "Sim, escadas em aço inox projetadas para o espaço fazem parte dos serviços. A viabilidade de cada projeto é avaliada no orçamento.",
      },
    ],
    projectCategories: ["Escadas"],
    serviceIds: ["escadas", "escadas-helicoidais"],
    whatsapp: "escadas",
    ctaLabel: "Solicitar orçamento para escada",
    quoteService: "Escada ou guarda-corpo para escada helicoidal/curva",
  },
  {
    slug: "projetos-sob-medida",
    name: "Projetos sob medida",
    metaTitle: "Móveis e Peças em Aço Inox Sob Medida no DF",
    metaDescription:
      "Móveis, bases de mesa, estruturas de cadeiras, beliches, grelhas e peças em aço inox fabricados sob medida a partir da sua necessidade. Atendimento no DF e em Goiás.",
    h1: "Móveis, peças e estruturas em aço inox sob medida",
    summary:
      "Móveis, bases de mesa, estruturas de cadeiras, camas, beliches, grelhas e outras peças em aço inox desenvolvidas a partir da necessidade do cliente.",
    intro:
      "Além de corrimãos e guarda-corpos, a Abreu Inox desenvolve peças e estruturas em aço inox a partir da necessidade de cada cliente: móveis, bases de mesa, estruturas de cadeiras, camas e beliches, grelhas e outras peças que não existem prontas no mercado. Outras demandas em aço inox podem ser analisadas mediante consulta.",
    applications: [
      {
        title: "Móveis em inox",
        text: "Camas, beliches e móveis com estrutura em aço inox, dimensionados para o ambiente.",
      },
      {
        title: "Bases e estruturas",
        text: "Bases de mesa fabricadas para o tampo do cliente e estruturas de cadeiras e assentos conforme o projeto.",
      },
      {
        title: "Peças para áreas externas",
        text: "Estruturas como suportes para redes e grelhas lineares para captação de água em piso.",
      },
      {
        title: "Demandas especiais",
        text: "Peças desenvolvidas a partir de desenho, foto de referência ou descrição da necessidade.",
      },
    ],
    details: [
      {
        title: "Desenvolvido a partir da necessidade",
        text: "O projeto começa pela função da peça, pelas medidas do espaço e pelas condições de uso.",
      },
      {
        title: "Fabricação sob medida",
        text: "Cada peça é produzida para o espaço e o uso definidos no orçamento, e não adaptada de um modelo pronto.",
      },
      {
        title: "Avaliação de viabilidade",
        text: "Demandas fora do portfólio são analisadas caso a caso antes do orçamento.",
      },
    ],
    briefing: [
      "Descrição da peça e da função que ela vai cumprir",
      "Medidas aproximadas ou do espaço disponível",
      "Fotos de referência, desenho ou projeto, se houver",
      "Se a peça ficará em área interna, externa ou úmida",
      "Quantidade de peças",
    ],
    faq: [
      {
        question: "A Abreu Inox faz peças em inox que não estão no site?",
        answer:
          "Outras demandas em aço inox podem ser analisadas mediante consulta. Envie fotos de referência, desenho ou a descrição da necessidade para avaliação.",
      },
      {
        question: "Posso enviar um desenho ou foto de referência?",
        answer:
          "Sim. Desenhos, plantas e fotos de referência ajudam a entender a peça e agilizam o orçamento. Envie os arquivos pela conversa do WhatsApp.",
      },
      {
        question: "Qual aço inox usar em peças para área externa?",
        answer:
          "Depende da exposição da peça. Em ambientes com cloro, maresia ou produtos químicos, ligas com maior resistência à corrosão, como o inox 316, costumam ser indicadas. Informe no pedido onde a peça ficará para que a especificação seja avaliada.",
      },
    ],
    projectCategories: ["Móveis", "Sob medida"],
    serviceIds: [
      "bases-de-mesa",
      "estruturas-de-cadeiras",
      "camas-e-beliches",
      "moveis-e-estruturas",
    ],
    whatsapp: "sobMedida",
    ctaLabel: "Conversar sobre uma peça sob medida",
    quoteService: "Móvel ou peça sob medida",
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((solution) => solution.slug === slug);
}

/** Solução à qual um projeto do portfólio pertence (para links internos). */
export function solutionForProject(project: { id: string; category: string }): Solution | undefined {
  return (
    solutions.find((s) => s.extraProjectIds?.includes(project.id)) ??
    solutions.find((s) => s.projectCategories.includes(project.category))
  );
}
