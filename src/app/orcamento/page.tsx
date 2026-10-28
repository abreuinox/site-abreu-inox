import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { InstagramIcon } from "@/components/icons";
import { site } from "@/config/site";
import { solutions } from "@/data/solutions";
import { pageMetadata } from "@/lib/seo";
import { graph, webPageNode } from "@/lib/structured-data";
import { whatsappUrl } from "@/lib/whatsapp";

const path = "/orcamento/";
const title = "Orçamento de Aço Inox Sob Medida no DF";
const description =
  "Solicite um orçamento à Abreu Inox pelo WhatsApp ou envie um briefing com fotos, medidas e projeto. Corrimãos, guarda-corpos, escadas e peças em inox no DF e em Goiás.";

const quoteServices = [...solutions.map((solution) => solution.quoteService), "Outro"];

export const metadata = pageMetadata({ title, description, path });

export default function QuotePage() {
  return (
    <>
      <Breadcrumbs path={path} items={[{ name: "Orçamento", path }]} />
      <PageHero
        eyebrow="Orçamento"
        title="Solicite um orçamento em aço inox"
        intro="Fale direto pelo WhatsApp ou preencha o briefing abaixo: ele abre o WhatsApp com a sua demanda organizada, e você pode anexar fotos, plantas e documentos na conversa."
      >
        <WhatsAppButton cta="orcamento-hero">Falar agora pelo WhatsApp</WhatsAppButton>
      </PageHero>

      <section aria-labelledby="briefing-titulo" className="border-t border-line bg-coal/40">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h2 id="briefing-titulo" className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Briefing do projeto
            </h2>
            <p className="mt-3 mb-8 max-w-xl leading-relaxed text-steel">
              Quanto mais detalhes, mais rápido e preciso o orçamento. Campos com * são obrigatórios.
            </p>
            <QuoteForm whatsappNumber={site.whatsapp.number} services={quoteServices} />
            <noscript>
              <p className="mt-6 text-steel">
                O formulário precisa de JavaScript. Você também pode{" "}
                <a href={whatsappUrl()} className="underline">
                  solicitar o orçamento direto pelo WhatsApp
                </a>
                .
              </p>
            </noscript>
          </div>
          <aside className="space-y-6">
            <div className="rounded-2xl border border-line bg-graphite p-7">
              <h2 className="font-display text-xl font-bold">Contato direto</h2>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta="orcamento-contato"
                    className="inline-flex min-h-11 items-center hover:underline"
                  >
                    WhatsApp {site.whatsapp.display}
                  </a>
                </li>
                <li>
                  <a
                    href={site.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2.5 hover:underline"
                  >
                    <InstagramIcon className="size-4" />
                    Instagram {site.instagram.handle}
                  </a>
                </li>
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-steel-dim">
                Base operacional: {site.base.label}. Atendimento: {site.serviceArea.label},{" "}
                {site.serviceArea.note}.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-coal p-7">
              <h2 className="font-display text-xl font-bold">O que ajuda no orçamento</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-steel">
                <li>Fotos do local de mais de um ângulo</li>
                <li>Medidas aproximadas</li>
                <li>Projeto, planta ou desenho, se houver</li>
                <li>Para empresas e órgãos públicos: especificação ou termo de referência</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <JsonLd
        data={graph(
          webPageNode({ path, name: title, description, type: "ContactPage", dateModified: site.contentUpdatedAt }),
        )}
      />
    </>
  );
}
