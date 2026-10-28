import type { WhatsAppAudience } from "@/config/site";
import type { FaqItem } from "./solutions";

/**
 * Conteúdos técnicos (/conteudos/[slug]/).
 *
 * Regras editoriais (docs/seo/ESTRATEGIA-CONTEUDO.md): conteúdo original,
 * resposta direta no primeiro parágrafo, datas reais de publicação e
 * revisão, fontes para qualquer dado técnico ou normativo. Trechos sobre
 * normas não substituem a avaliação do responsável técnico da obra.
 */
export type Block =
  | string
  | { list: string[] }
  | { table: { caption: string; head: string[]; rows: string[][] } };

export type Article = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** Resposta direta, exibida logo abaixo do título. */
  lead: string;
  /** Datas no formato AAAA-MM-DD. */
  publishedAt: string;
  updatedAt: string;
  sections: { heading: string; blocks: Block[] }[];
  faq?: FaqItem[];
  sources?: string[];
  /** Solução relacionada, para o link interno e o CTA. */
  relatedSolution?: string;
  whatsapp: WhatsAppAudience;
  ctaLabel: string;
};

export const articles: Article[] = [
  {
    slug: "aco-inox-304-ou-316",
    title: "Aço inox 304 ou 316: diferenças e onde usar cada um",
    metaTitle: "Aço Inox 304 ou 316: Diferenças e Onde Usar Cada Um",
    metaDescription:
      "Entenda a diferença entre os aços inox 304 e 316, por que o 316 resiste melhor a cloro e maresia e como escolher a liga para corrimãos, guarda-corpos e peças.",
    lead:
      "A principal diferença é o molibdênio: o inox 316 tem cerca de 2% a 3% desse elemento e o 304 não. Isso dá ao 316 mais resistência à corrosão por cloretos, presentes no cloro de piscinas, na maresia e em alguns produtos de limpeza. Em ambientes internos e urbanos comuns, o 304 costuma atender bem e tem custo menor.",
    publishedAt: "2026-10-27",
    updatedAt: "2026-10-27",
    sections: [
      {
        heading: "O que os dois têm em comum",
        blocks: [
          "Os aços 304 e 316 pertencem à família dos inox austeníticos, a mais usada em arquitetura, mobiliário e equipamentos. Os dois têm cromo suficiente para formar uma camada passiva na superfície, que protege o metal contra a corrosão e se regenera quando a superfície é limpa e exposta ao ar.",
          "Ambos aceitam acabamentos escovado e polido, podem ser curvados e soldados e, na condição de fornecimento, são praticamente não magnéticos.",
        ],
      },
      {
        heading: "Composição e comportamento",
        blocks: [
          {
            table: {
              caption: "Comparação simplificada entre os aços inox 304 e 316",
              head: ["Característica", "Inox 304", "Inox 316"],
              rows: [
                ["Cromo", "cerca de 17,5% a 19,5%", "cerca de 16% a 18%"],
                ["Níquel", "cerca de 8% a 10,5%", "cerca de 10% a 14%"],
                ["Molibdênio", "não contém", "cerca de 2% a 3%"],
                ["Resistência a cloretos", "boa em ambientes comuns", "superior em cloro, maresia e sal"],
                ["Custo relativo", "menor", "maior"],
              ],
            },
          },
          "As faixas acima são aproximadas e variam conforme a norma de especificação do material. Para compras técnicas, a referência é o certificado do fornecedor da chapa ou do tubo.",
        ],
      },
      {
        heading: "Quando o 304 costuma ser suficiente",
        blocks: [
          {
            list: [
              "Corrimãos e guarda-corpos em áreas internas de residências, edifícios e escritórios",
              "Móveis, bases de mesa e estruturas em ambientes internos",
              "Áreas externas urbanas sem contato frequente com cloro ou sal, com limpeza periódica",
            ],
          },
        ],
      },
      {
        heading: "Quando vale considerar o 316",
        blocks: [
          {
            list: [
              "Corrimãos e guarda-corpos de piscinas, pela presença de cloro na água e nos respingos",
              "Regiões litorâneas, expostas à maresia",
              "Locais com uso frequente de produtos de limpeza com cloro ou outros agentes agressivos",
              "Peças em contato constante com umidade e sal",
            ],
          },
          "Mesmo o 316 precisa de limpeza: depósitos de sujeira e cloro acumulados na superfície podem causar manchas em qualquer inox.",
        ],
      },
      {
        heading: "O acabamento também influencia",
        blocks: [
          "Superfícies mais lisas acumulam menos sujeira e resíduos, o que facilita a limpeza e ajuda a preservar a aparência. Por isso, em ambientes agressivos, a escolha do acabamento e a rotina de limpeza importam tanto quanto a liga.",
        ],
      },
      {
        heading: "Como decidir no seu projeto",
        blocks: [
          "Ao pedir um orçamento, informe onde a peça vai ficar (área interna, externa, próxima de piscina, com exposição a produtos químicos) e se há especificação de projeto. Com essas informações, a escolha da liga e do acabamento pode ser avaliada junto com o custo de cada opção.",
        ],
      },
    ],
    faq: [
      {
        question: "Como saber se uma peça é de inox 304 ou 316?",
        answer:
          "Visualmente os dois são iguais. A identificação segura é feita pelo certificado do material ou por análise química. Testes com ímã não diferenciam 304 de 316.",
      },
      {
        question: "Inox 316 nunca enferruja?",
        answer:
          "Nenhum inox é imune a manchas. O 316 resiste melhor a cloretos, mas sujeira acumulada, contato com partículas de aço comum e falta de limpeza podem causar manchas superficiais.",
      },
    ],
    sources: [
      "ASTM A240: especificação de chapas e tiras de aço inox cromo e cromo-níquel (composição química dos tipos 304 e 316)",
      "Abinox, Associação Brasileira do Aço Inoxidável: publicações técnicas sobre seleção e conservação do aço inox",
    ],
    relatedSolution: "guarda-corpos-em-inox",
    whatsapp: "default",
    ctaLabel: "Tirar dúvidas sobre o material do meu projeto",
  },
  {
    slug: "corrimao-de-inox-o-que-considerar",
    title: "Corrimão de inox: o que considerar antes de contratar",
    metaTitle: "Corrimão de Inox: O Que Considerar Antes de Contratar",
    metaDescription:
      "Guia para escolher um corrimão de inox: tipos de fixação, acessibilidade (NBR 9050), acabamento, liga, fatores de preço e o que enviar para pedir orçamento.",
    lead:
      "Para contratar um corrimão de inox, defina onde ele será instalado e como será fixado, verifique se a obra precisa atender às regras de acessibilidade da ABNT NBR 9050, escolha a liga e o acabamento conforme o ambiente e envie fotos e medidas do local para um orçamento sob medida.",
    publishedAt: "2026-10-27",
    updatedAt: "2026-10-27",
    sections: [
      {
        heading: "1. Onde e como o corrimão será fixado",
        blocks: [
          "O tipo de fixação depende da estrutura disponível e do espaço de circulação:",
          {
            list: [
              "De parede: suportes fixados na alvenaria, comuns em escadas enclausuradas e escadarias de edifícios",
              "No piso ou nos degraus: montantes que sustentam o corrimão, usados quando não há parede ao lado",
              "Integrado ao guarda-corpo: o corrimão é a parte superior do guarda-corpo, em escadas abertas e mezaninos",
            ],
          },
          "Em escadas curvas e helicoidais, o tubo precisa ser curvado para acompanhar o raio da escada, o que exige fabricação sob medida.",
        ],
      },
      {
        heading: "2. Acessibilidade: o que a NBR 9050 pede",
        blocks: [
          "Em edificações de uso público ou coletivo, rampas e escadas devem seguir a ABNT NBR 9050, norma brasileira de acessibilidade. Entre os pontos que ela trata para corrimãos estão:",
          {
            list: [
              "Corrimãos dos dois lados de rampas e escadas",
              "Duas alturas de corrimão, a 0,92 m e a 0,70 m do piso",
              "Seção que permita boa empunhadura, com diâmetro entre 3,0 cm e 4,5 cm no caso de seção circular",
              "Espaço livre entre o corrimão e a parede, para a mão passar",
              "Continuidade ao longo do percurso e prolongamento nas extremidades",
            ],
          },
          "Esses pontos são um resumo para orientação. A especificação de cada obra deve seguir a versão vigente da norma, o projeto de acessibilidade e a avaliação do responsável técnico.",
        ],
      },
      {
        heading: "3. Liga e acabamento",
        blocks: [
          "Em ambientes internos, o inox 304 costuma atender bem. Em piscinas e locais com cloro ou maresia, ligas com molibdênio, como o 316, resistem melhor à corrosão. O acabamento escovado disfarça marcas de uso; o polido tem brilho espelhado e destaca o desenho da peça.",
        ],
      },
      {
        heading: "4. O que influencia o preço",
        blocks: [
          {
            list: [
              "Metragem total e número de lances",
              "Quantidade de curvas, viradas de patamar e arremates",
              "Tipo de fixação e condição da estrutura existente",
              "Corrimão simples ou duplo (duas alturas)",
              "Liga, diâmetro do tubo e acabamento",
              "Local e condições de acesso para a instalação",
            ],
          },
        ],
      },
      {
        heading: "5. O que enviar para pedir orçamento",
        blocks: [
          {
            list: [
              "Fotos do local de diferentes ângulos",
              "Medidas aproximadas e número de degraus",
              "Onde é possível fixar o corrimão",
              "Projeto de arquitetura ou de acessibilidade, se houver",
              "Cidade e prazo desejado",
            ],
          },
        ],
      },
    ],
    faq: [
      {
        question: "Corrimão de inox escovado ou polido: qual escolher?",
        answer:
          "O escovado tem aparência fosca e disfarça marcas de mãos e pequenos riscos, por isso é comum em áreas de grande circulação. O polido tem brilho espelhado e é escolhido quando se quer destacar a peça. Os dois são em aço inox; a diferença é o acabamento da superfície.",
      },
      {
        question: "Rampa de acessibilidade precisa de corrimão dos dois lados?",
        answer:
          "Pela ABNT NBR 9050, rampas e escadas em rotas acessíveis devem ter corrimãos dos dois lados, em duas alturas. Confirme as exigências da sua obra com o projeto e o responsável técnico.",
      },
    ],
    sources: [
      "ABNT NBR 9050: Acessibilidade a edificações, mobiliário, espaços e equipamentos urbanos (seção sobre corrimãos e guarda-corpos)",
      "ASTM A240: composição química dos aços inox 304 e 316",
    ],
    relatedSolution: "corrimaos-em-inox",
    whatsapp: "corrimaos",
    ctaLabel: "Solicitar orçamento de corrimão",
  },
  {
    slug: "como-pedir-orcamento-de-inox-sob-medida",
    title: "Como pedir orçamento de uma peça ou estrutura em inox sob medida",
    metaTitle: "Como Pedir Orçamento de Inox Sob Medida: Briefing e Preço",
    metaDescription:
      "O que enviar para receber um orçamento de inox sob medida, quais fatores definem o preço e como funciona o atendimento para residências, empresas e órgãos públicos.",
    lead:
      "Para receber um orçamento de inox sob medida mais rápido e preciso, envie fotos do local, medidas aproximadas, a função da peça, onde ela vai ficar e, se houver, o projeto ou desenho. O preço depende principalmente da quantidade de material, da complexidade de fabricação, do acabamento e das condições de instalação.",
    publishedAt: "2026-10-27",
    updatedAt: "2026-10-27",
    sections: [
      {
        heading: "Informações que fazem diferença no orçamento",
        blocks: [
          {
            list: [
              "O que é a peça e para que ela serve (corrimão, guarda-corpo, móvel, estrutura)",
              "Fotos do local de instalação, de mais de um ângulo",
              "Medidas aproximadas ou as dimensões do espaço disponível",
              "Se a peça fica em área interna, externa ou próxima de piscina",
              "Projeto, planta, desenho ou foto de referência, se houver",
              "Quantidade de peças e prazo desejado",
              "Cidade ou região da obra",
            ],
          },
        ],
      },
      {
        heading: "Fatores que definem o preço",
        blocks: [
          {
            list: [
              "Quantidade de material (metragem de tubos e chapas)",
              "Complexidade: curvas, calandragem, soldas e detalhes de acabamento",
              "Liga do inox e acabamento (escovado ou polido)",
              "Vidro ou outros materiais combinados",
              "Tipo de fixação e condição da estrutura existente",
              "Acesso ao local e logística de instalação",
            ],
          },
          "Por isso, valores por metro encontrados na internet servem apenas como referência inicial. Duas escadas com a mesma metragem podem ter custos bem diferentes se uma delas for curva.",
        ],
      },
      {
        heading: "Como funciona o atendimento na Abreu Inox",
        blocks: [
          {
            list: [
              "Você apresenta a demanda pelo WhatsApp ou pelo formulário, com fotos e medidas se possível",
              "A demanda e a viabilidade de atendimento na sua região são avaliadas",
              "Você recebe um orçamento personalizado para a peça ou estrutura",
            ],
          },
        ],
      },
      {
        heading: "Para empresas, condomínios e órgãos públicos",
        blocks: [
          "Informe a razão social, os dados para faturamento e, se houver, o termo de referência, a especificação técnica ou a planilha de quantitativos. A Abreu Inox emite nota fiscal e trabalha com faturamento; condições, prazos e documentação são definidos na negociação.",
        ],
      },
      {
        heading: "Para arquitetos, engenheiros e construtoras",
        blocks: [
          "Envie o projeto em PDF ou o detalhamento da peça, com cotas, acabamentos e materiais especificados. Quando houver dúvidas de execução, elas podem ser discutidas antes do fechamento do orçamento.",
        ],
      },
    ],
    faq: [
      {
        question: "Preciso ter um projeto para pedir orçamento?",
        answer:
          "Não. Fotos do local, medidas aproximadas e a descrição do que você precisa já permitem iniciar a avaliação. Se houver projeto, ele torna o orçamento mais preciso.",
      },
      {
        question: "Como envio fotos e plantas?",
        answer:
          "Pela conversa do WhatsApp da Abreu Inox, depois de enviar a mensagem inicial pelo site ou pelo formulário de orçamento.",
      },
    ],
    whatsapp: "default",
    ctaLabel: "Apresentar meu projeto",
  },
  {
    slug: "limpeza-e-conservacao-do-aco-inox",
    title: "Limpeza e conservação do aço inox: guia prático",
    metaTitle: "Como Limpar Aço Inox: Limpeza e Conservação de Corrimãos",
    metaDescription:
      "Como limpar corrimãos, guarda-corpos e peças de aço inox sem manchar: produtos indicados, o que evitar e cuidados em piscinas e áreas externas.",
    lead:
      "Limpe o aço inox com água morna, detergente neutro e pano macio, sempre no sentido do acabamento escovado, depois enxágue e seque. Evite palha de aço comum, produtos com cloro, como água sanitária, e abrasivos fortes. Em piscinas e áreas externas, a limpeza deve ser mais frequente.",
    publishedAt: "2026-10-27",
    updatedAt: "2026-10-27",
    sections: [
      {
        heading: "Limpeza de rotina",
        blocks: [
          {
            list: [
              "Remova o pó com pano macio ou espanador",
              "Lave com água morna e detergente neutro, usando pano macio ou esponja não abrasiva",
              "Em peças escovadas, passe o pano no sentido das linhas do acabamento",
              "Enxágue com água limpa para retirar o detergente",
              "Seque com pano macio para evitar marcas de água",
            ],
          },
        ],
      },
      {
        heading: "O que evitar",
        blocks: [
          {
            list: [
              "Palha de aço comum e escovas de aço carbono: deixam partículas de ferro que enferrujam sobre o inox",
              "Água sanitária e produtos com cloro ou ácido clorídrico, como alguns limpadores de piso e pedra",
              "Saponáceos e abrasivos fortes, que riscam a superfície",
              "Deixar respingos de cimento, argamassa ou produtos de obra secarem sobre a peça",
            ],
          },
        ],
      },
      {
        heading: "Piscinas e áreas externas",
        blocks: [
          "O cloro da piscina e a sujeira acumulada favorecem manchas. Enxágue com água limpa os corrimãos e guarda-corpos próximos da piscina com frequência e faça a limpeza completa periodicamente. Em áreas externas, a chuva ajuda, mas não substitui a limpeza.",
        ],
      },
      {
        heading: "Manchas e pontos de ferrugem",
        blocks: [
          "Pontos alaranjados na superfície do inox geralmente são contaminação, e não corrosão da própria peça: partículas de aço comum vindas de obras próximas, ferramentas ou palha de aço. Para manchas leves, use produto específico para limpeza de inox, seguindo as instruções do fabricante. Manchas persistentes devem ser avaliadas por um profissional.",
        ],
      },
    ],
    faq: [
      {
        question: "Posso usar vinagre ou álcool no inox?",
        answer:
          "Álcool pode ser usado para remover marcas de dedos, seguido de pano seco. Produtos ácidos devem ser usados com cautela e sempre enxaguados. Na dúvida, prefira água morna e detergente neutro.",
      },
      {
        question: "Corrimão de inox enferruja?",
        answer:
          "O inox resiste à corrosão, mas pode manchar com sujeira acumulada, cloro e contato com partículas de aço comum. Limpeza regular e a escolha da liga certa para o ambiente evitam a maior parte dos problemas.",
      },
    ],
    sources: [
      "Abinox, Associação Brasileira do Aço Inoxidável: orientações de limpeza e conservação do aço inox",
    ],
    relatedSolution: "corrimaos-em-inox",
    whatsapp: "default",
    ctaLabel: "Falar com a Abreu Inox",
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
