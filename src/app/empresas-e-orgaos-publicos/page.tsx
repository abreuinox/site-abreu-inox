import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Business } from "@/components/Business";
import { FaqList } from "@/components/FaqList";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProjectCards } from "@/components/ProjectCards";
import { Section } from "@/components/Section";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/config/site";
import { projects } from "@/data/projects";
import type { FaqItem } from "@/data/solutions";
import { pageMetadata } from "@/lib/seo";
import { faqNode, graph, webPageNode } from "@/lib/structured-data";

const path = "/empresas-e-orgaos-publicos/";
const title = "Aço Inox para Empresas e Órgãos Públicos no DF";
const description =
  "Corrimãos, guarda-corpos e estruturas em aço inox para empresas, condomínios, construtoras e órgãos públicos no DF e em Goiás, com nota fiscal e faturamento.";

/** Projetos executados em edifícios e áreas de circulação de público. */
const institutionalProjectIds = [
  "guarda-corpo-vidro-catracas",
  "guarda-corpo-vidro-hall",
  "corrimao-rampa-acessibilidade",
  "corrimao-arquibancada",
  "guarda-corpo-escada-edificio",
  "corrimao-escadaria-rampa",
];

const steps = [
  {
    title: "Envie a especificação",
    text: "Termo de referência, memorial descritivo, projeto ou planilha de quantitativos. Se não houver documento, fotos e medidas do local já permitem iniciar.",
  },
  {
    title: "Informe os dados de faturamento",
    text: "Razão social, CNPJ e as condições de faturamento e documentação exigidas pela sua organização.",
  },
  {
    title: "Receba a proposta",
    text: "A demanda e a viabilidade são avaliadas e a proposta é preparada para os itens solicitados.",
  },
];

const faq: FaqItem[] = [
  {
    question: "A Abreu Inox emite nota fiscal?",
    answer: "Sim. A Abreu Inox emite nota fiscal e trabalha com faturamento para empresas e órgãos públicos.",
  },
  {
    question: "Vocês fazem orçamento a partir de termo de referência?",
    answer:
      "Sim. Envie o termo de referência, o memorial ou o projeto com a especificação dos itens. Condições, prazos e documentação são definidos na negociação.",
  },
  {
    question: "Que tipos de obras institucionais vocês já executaram?",
    answer:
      "O portfólio inclui guarda-corpos com vidro em halls e recepções com catracas, corrimãos duplos em rampas de acessibilidade de edifícios, corrimãos em arquibancada de ginásio e guarda-corpos em escadas de edifícios.",
  },
  {
    question: "Vocês atendem fora do Distrito Federal?",
    answer:
      "Sim, em Goiás, mediante avaliação da demanda e da viabilidade de atendimento. A base operacional fica em Ceilândia-DF.",
  },
];

export const metadata = pageMetadata({ title, description, path });

export default function InstitutionalPage() {
  const institutionalProjects = institutionalProjectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project) => project !== undefined);

  return (
    <>
      <Breadcrumbs path={path} items={[{ name: "Empresas e órgãos públicos", path }]} />
      <PageHero
        eyebrow="Atendimento corporativo e institucional"
        title="Soluções em aço inox para empresas, condomínios e órgãos públicos"
        intro="Corrimãos, guarda-corpos e estruturas em aço inox para edifícios comerciais, condomínios, recepções, áreas de circulação de público e obras institucionais no DF e em Goiás. A Abreu Inox emite nota fiscal, trabalha com faturamento e prepara propostas a partir da especificação de cada demanda."
      >
        <WhatsAppButton audience="company" cta="corporativo-hero">
          Solicitar proposta corporativa
        </WhatsAppButton>
        <WhatsAppButton audience="publicSector" variant="outline" cta="publico-hero">
          Orçamento para órgão público
        </WhatsAppButton>
      </PageHero>

      <Business
        title="O que a sua organização encontra na Abreu Inox"
        intro="Atendemos empresas, construtoras, condomínios e órgãos públicos com soluções em aço inox sob medida."
      />

      {institutionalProjects.length > 0 ? (
        <Section
          id="obras"
          eyebrow="Projetos realizados"
          title="Obras em edifícios e áreas de circulação de público"
          intro="Exemplos de trabalhos executados em edifícios, recepções e espaços de uso coletivo."
          className="bg-coal/40"
        >
          <ProjectCards projects={institutionalProjects} />
        </Section>
      ) : null}

      <Section id="processo" eyebrow="Como contratar" title="Como solicitar uma proposta">
        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-line bg-coal p-7">
              <span className="font-display text-4xl font-extrabold text-steel">{index + 1}</span>
              <h3 className="mt-4 font-display text-lg font-bold">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-steel-dim">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="perguntas" eyebrow="Perguntas frequentes" title="Dúvidas de empresas e órgãos públicos" className="bg-coal/40">
        <FaqList items={faq} />
      </Section>

      <FinalCta
        title="Solicite uma proposta para a sua organização"
        audience="company"
        label="Solicitar proposta corporativa"
        quoteHref="/orcamento/?perfil=empresa"
      />
      <JsonLd
        data={graph(
          webPageNode({ path, name: title, description, dateModified: site.contentUpdatedAt }),
          faqNode(path, faq),
        )}
      />
    </>
  );
}
