import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/ButtonLink";
import { FaqList } from "@/components/FaqList";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProjectCards } from "@/components/ProjectCards";
import { Section } from "@/components/Section";
import { TrackView } from "@/components/TrackView";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/config/site";
import { articles } from "@/data/articles";
import { projects } from "@/data/projects";
import { getSolution, type Solution, solutions } from "@/data/solutions";
import { pageMetadata } from "@/lib/seo";
import { faqNode, graph, serviceNode, webPageNode } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

function solutionProjects(solution: Solution) {
  return projects.filter(
    (project) =>
      solution.projectCategories.includes(project.category) ||
      solution.extraProjectIds?.includes(project.id),
  );
}

export async function generateMetadata({ params }: PageProps<"/solucoes/[slug]">): Promise<Metadata> {
  const solution = getSolution((await params).slug);
  if (!solution) return {};
  const [cover] = solutionProjects(solution);
  return pageMetadata({
    title: solution.metaTitle,
    description: solution.metaDescription,
    path: `/solucoes/${solution.slug}/`,
    image: cover ? { url: cover.image.src, alt: cover.image.alt } : undefined,
  });
}

export default async function SolutionPage({ params }: PageProps<"/solucoes/[slug]">) {
  const solution = getSolution((await params).slug);
  if (!solution) notFound();

  const path = `/solucoes/${solution.slug}/`;
  const related = solutionProjects(solution);
  const relatedArticles = articles.filter((article) => article.relatedSolution === solution.slug);
  const others = solutions.filter((s) => s.slug !== solution.slug);
  const quoteHref = `/orcamento/?servico=${encodeURIComponent(solution.quoteService)}`;

  return (
    <>
      <Breadcrumbs
        path={path}
        items={[
          { name: "Soluções", path: "/solucoes/" },
          { name: solution.name, path },
        ]}
      />
      <PageHero eyebrow={`Soluções · ${site.serviceArea.label}`} title={solution.h1} intro={solution.intro}>
        <WhatsAppButton audience={solution.whatsapp} cta="solucao-hero">
          {solution.ctaLabel}
        </WhatsAppButton>
        <ButtonLink href={quoteHref}>Enviar briefing</ButtonLink>
      </PageHero>

      <Section id="aplicacoes" eyebrow="Aplicações" title={`Onde instalamos ${solution.name.toLowerCase()}`}>
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {solution.applications.map((item) => (
            <li key={item.title} className="bg-coal p-7">
              <h3 className="font-display text-xl font-bold">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-steel-dim">{item.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {related.length > 0 ? (
        <Section
          id="projetos"
          eyebrow="Projetos realizados"
          title={`${solution.name} executados pela Abreu Inox`}
          intro="Fotografias reais de trabalhos fabricados e instalados pela nossa equipe."
          className="bg-coal/40"
        >
          <ProjectCards projects={related} />
        </Section>
      ) : null}

      <Section id="detalhes" eyebrow="Detalhes" title="Fabricação e acabamento">
        <ul className="grid gap-6 md:grid-cols-3">
          {solution.details.map((item) => (
            <li key={item.title} className="rounded-2xl border border-line bg-coal p-7">
              <h3 className="font-display text-lg font-bold">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-steel-dim">{item.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="briefing"
        eyebrow="Orçamento"
        title="O que enviar para agilizar o orçamento"
        className="bg-coal/40"
      >
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <ul className="space-y-3">
            {solution.briefing.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-steel">
                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-steel" />
                {item}
              </li>
            ))}
          </ul>
          <div className="rounded-2xl border border-line bg-graphite p-7 sm:p-8">
            <p className="font-display text-xl font-bold">Pronto para pedir o orçamento?</p>
            <p className="mt-3 leading-relaxed text-steel-dim">
              Envie as informações pelo WhatsApp ou preencha o briefing. Fotos e plantas podem ser
              enviadas na conversa.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <WhatsAppButton audience={solution.whatsapp} className="w-full" cta="solucao-briefing">
                {solution.ctaLabel}
              </WhatsAppButton>
              <ButtonLink href={quoteHref} className="w-full">
                Preencher briefing
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <Section id="perguntas" eyebrow="Perguntas frequentes" title={`Dúvidas sobre ${solution.name.toLowerCase()}`}>
        <FaqList items={solution.faq} />
        {relatedArticles.length > 0 ? (
          <div className="mt-10">
            <p className="text-xs font-semibold tracking-[0.18em] text-steel-dim uppercase">
              Leia também
            </p>
            <ul className="mt-3 space-y-2">
              {relatedArticles.map((article) => (
                <li key={article.slug}>
                  <Link href={`/conteudos/${article.slug}/`} className="font-semibold underline hover:text-steel">
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Section>

      <Section id="outras" eyebrow="Outras soluções" title="Conheça também" className="bg-coal/40">
        <ul className="grid gap-4 sm:grid-cols-3">
          {others.map((other) => (
            <li key={other.slug}>
              <Link
                href={`/solucoes/${other.slug}/`}
                className="block h-full rounded-2xl border border-line bg-coal p-6 hover:border-white/40"
              >
                <span className="block font-display text-lg font-bold">{other.name}</span>
                <span className="mt-2 block text-sm leading-relaxed text-steel-dim">{other.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <FinalCta
        title={`Orçamento de ${solution.name.toLowerCase()}`}
        audience={solution.whatsapp}
        label={solution.ctaLabel}
        quoteHref={quoteHref}
      />
      <TrackView event="view_service" params={{ service: solution.slug }} />
      <JsonLd
        data={graph(
          webPageNode({
            path,
            name: solution.metaTitle,
            description: solution.metaDescription,
            about: `${site.url}${path}#servico`,
            image: related[0]?.image.src,
            dateModified: site.contentUpdatedAt,
          }),
          serviceNode(solution, related[0]?.image.src),
          faqNode(path, solution.faq),
        )}
      />
    </>
  );
}
