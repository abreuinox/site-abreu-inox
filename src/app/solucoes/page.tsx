import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SolutionCards } from "@/components/SolutionCards";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/config/site";
import { solutions } from "@/data/solutions";
import { pageMetadata } from "@/lib/seo";
import { graph, serviceNode, webPageNode } from "@/lib/structured-data";

const path = "/solucoes/";
const title = "Soluções em Aço Inox Sob Medida no DF";
const description =
  "Corrimãos, guarda-corpos, escadas helicoidais e curvas, móveis e peças em aço inox sob medida. Conheça as soluções da Abreu Inox para o DF e Goiás.";

export const metadata = pageMetadata({ title, description, path });

export default function SolutionsPage() {
  return (
    <>
      <Breadcrumbs path={path} items={[{ name: "Soluções", path }]} />
      <PageHero
        eyebrow="Soluções"
        title="Soluções em aço inox sob medida"
        intro="A Abreu Inox fabrica e instala peças e estruturas em aço inox a partir das medidas do local e da necessidade de cada cliente. Escolha a solução para ver aplicações, projetos realizados e o que enviar para o orçamento."
      >
        <WhatsAppButton cta="solucoes-hero">Solicitar orçamento</WhatsAppButton>
      </PageHero>
      <Section id="lista" eyebrow="O que fazemos" title="Escolha a solução">
        <SolutionCards />
        <p className="mt-10 max-w-2xl text-steel">
          Não encontrou o que procura? Outras demandas em aço inox podem ser analisadas mediante
          consulta. Envie fotos de referência ou a descrição da peça.
        </p>
      </Section>
      <FinalCta />
      <JsonLd
        data={graph(
          webPageNode({
            path,
            name: title,
            description,
            type: "CollectionPage",
            dateModified: site.contentUpdatedAt,
          }),
          ...solutions.map((solution) => serviceNode(solution)),
        )}
      />
    </>
  );
}
