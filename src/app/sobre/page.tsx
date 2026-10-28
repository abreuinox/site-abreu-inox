import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/ButtonLink";
import { ProcessSteps } from "@/components/Experience";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SolutionCards } from "@/components/SolutionCards";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/config/site";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";
import { graph, webPageNode } from "@/lib/structured-data";

const path = "/sobre/";
const title = "Sobre a Abreu Inox: Mais de 30 Anos em Aço Inox";
const description =
  "Conheça a Abreu Inox: mais de 30 anos de experiência em soluções em aço inox sob medida, base em Ceilândia-DF e atendimento no Distrito Federal e em Goiás.";

const facts = [
  { label: "Nome", value: site.shortName },
  { label: "Especialidade", value: "Soluções em aço inox sob medida: fabricação e instalação" },
  { label: "Experiência", value: site.experience },
  { label: "Base operacional", value: site.base.label },
  { label: "Área de atendimento", value: `${site.serviceArea.label}, ${site.serviceArea.note}` },
  { label: "Clientes", value: "Residências, condomínios, empresas, construtoras e órgãos públicos" },
  { label: "Faturamento", value: "Emissão de nota fiscal e faturamento" },
  { label: "Contato", value: `WhatsApp ${site.whatsapp.display} · Instagram ${site.instagram.handle}` },
];

export const metadata = pageMetadata({ title, description, path });

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs path={path} items={[{ name: "Sobre", path }]} />
      <PageHero
        eyebrow="Sobre a Abreu Inox"
        title="Mais de 30 anos de experiência em soluções em aço inox"
        intro={
          <>
            <p>
              A Abreu Inox fabrica e instala soluções em aço inox sob medida para empresas,
              instituições, condomínios e residências. O trabalho começou com corrimãos e hoje
              inclui guarda-corpos, acabamentos para escadas curvas e helicoidais, escadas, móveis
              e peças desenvolvidas a partir da necessidade de cada cliente.
            </p>
            <p className="mt-4">
              Com base operacional em Ceilândia-DF, a empresa atende Brasília, as demais regiões
              do Distrito Federal e Goiás, mediante avaliação da demanda.
            </p>
          </>
        }
      >
        <WhatsAppButton cta="sobre-hero">Falar com a Abreu Inox</WhatsAppButton>
        <ButtonLink href="/projetos/">Ver {projects.length} projetos realizados</ButtonLink>
      </PageHero>

      <Section id="dados" eyebrow="Em resumo" title="A Abreu Inox em poucas linhas" className="bg-coal/40">
        <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {facts.map((fact) => (
            <div key={fact.label} className="bg-coal p-6">
              <dt className="text-xs font-semibold tracking-[0.18em] text-steel-dim uppercase">{fact.label}</dt>
              <dd className="mt-2 leading-relaxed font-medium">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section
        id="como-trabalhamos"
        eyebrow="Como trabalhamos"
        title="Cada peça começa pelas medidas do local"
        intro="Corrimãos, guarda-corpos e móveis em inox raramente cabem em um modelo pronto. Por isso o atendimento começa pela avaliação da demanda: o espaço, o uso, o acabamento desejado e as exigências da obra."
      >
        <ProcessSteps />
      </Section>

      <Section
        id="solucoes"
        eyebrow="O que fazemos"
        title="Soluções em aço inox"
        className="bg-coal/40"
      >
        <SolutionCards />
      </Section>

      <Section
        id="diferenciais"
        eyebrow="Por que a Abreu Inox"
        title="O que você encontra no atendimento"
      >
        <ul className="grid gap-6 md:grid-cols-2">
          <li className="rounded-2xl border border-line bg-coal p-7">
            <h3 className="font-display text-lg font-bold">Experiência em peças curvas</h3>
            <p className="mt-2 leading-relaxed text-steel-dim">
              O portfólio inclui corrimãos e guarda-corpos com tubos curvados para escadas
              helicoidais e curvas, um tipo de trabalho que exige fabricação sob medida.{" "}
              <Link href="/solucoes/escadas-em-inox/" className="underline hover:text-paper">
                Ver escadas em inox
              </Link>
              .
            </p>
          </li>
          <li className="rounded-2xl border border-line bg-coal p-7">
            <h3 className="font-display text-lg font-bold">Atendimento a empresas e órgãos públicos</h3>
            <p className="mt-2 leading-relaxed text-steel-dim">
              Emissão de nota fiscal, faturamento e orçamentos a partir de especificações técnicas.{" "}
              <Link href="/empresas-e-orgaos-publicos/" className="underline hover:text-paper">
                Ver atendimento corporativo
              </Link>
              .
            </p>
          </li>
          <li className="rounded-2xl border border-line bg-coal p-7">
            <h3 className="font-display text-lg font-bold">Fotografias reais de obras</h3>
            <p className="mt-2 leading-relaxed text-steel-dim">
              Todos os projetos publicados no site são trabalhos fabricados e instalados pela
              equipe da Abreu Inox.
            </p>
          </li>
          <li className="rounded-2xl border border-line bg-coal p-7">
            <h3 className="font-display text-lg font-bold">Orçamento personalizado</h3>
            <p className="mt-2 leading-relaxed text-steel-dim">
              Cada orçamento é preparado para a peça ou estrutura pedida, a partir de fotos,
              medidas e, quando houver, do projeto.
            </p>
          </li>
        </ul>
      </Section>

      <FinalCta />
      <JsonLd
        data={graph(
          webPageNode({
            path,
            name: title,
            description,
            type: "AboutPage",
            image: site.logo,
            dateModified: site.contentUpdatedAt,
          }),
        )}
      />
    </>
  );
}
