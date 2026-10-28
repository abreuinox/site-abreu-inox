import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/ButtonLink";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/config/site";
import { articles, type Block, getArticle } from "@/data/articles";
import { getSolution } from "@/data/solutions";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { articleNode, faqNode, graph, webPageNode } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps<"/conteudos/[slug]">): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return pageMetadata({
    title: article.metaTitle,
    description: article.metaDescription,
    path: `/conteudos/${article.slug}/`,
    article: { publishedTime: article.publishedAt, modifiedTime: article.updatedAt },
  });
}

function ArticleBlock({ block }: { block: Block }) {
  if (typeof block === "string") return <p>{block}</p>;
  if ("list" in block) {
    return (
      <ul className="list-disc space-y-2 pl-6 marker:text-steel-dim">
        {block.list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  return (
    <div className="overflow-x-auto rounded-2xl border border-line">
      <table className="w-full min-w-[32rem] text-left text-base">
        <caption className="p-4 text-left text-sm text-steel-dim">{block.table.caption}</caption>
        <thead className="bg-graphite">
          <tr>
            {block.table.head.map((cell) => (
              <th key={cell} scope="col" className="px-4 py-3 font-semibold">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.table.rows.map((row) => (
            <tr key={row[0]} className="border-t border-line">
              {row.map((cell, index) =>
                index === 0 ? (
                  <th key={cell} scope="row" className="px-4 py-3 font-semibold">
                    {cell}
                  </th>
                ) : (
                  <td key={cell} className="px-4 py-3 text-steel">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function ArticlePage({ params }: PageProps<"/conteudos/[slug]">) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  const path = `/conteudos/${article.slug}/`;
  const solution = article.relatedSolution ? getSolution(article.relatedSolution) : undefined;
  const others = articles.filter((a) => a.slug !== article.slug);

  return (
    <>
      <Breadcrumbs
        path={path}
        items={[
          { name: "Conteúdos", path: "/conteudos/" },
          { name: article.title, path },
        ]}
      />
      <article className="mx-auto max-w-3xl px-5 pt-8 pb-20 sm:px-8 sm:pb-28">
        <header>
          <p className="text-xs font-semibold tracking-[0.22em] text-steel-dim uppercase">
            Conteúdo técnico
          </p>
          <h1 className="text-steel mt-5 font-display text-4xl leading-[1.08] font-extrabold tracking-tight text-balance sm:text-5xl">
            {article.title}
          </h1>
          <p className="mt-5 text-sm text-steel-dim">
            Por {site.shortName} · Publicado em{" "}
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            {article.updatedAt !== article.publishedAt ? (
              <>
                {" "}
                · Atualizado em <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
              </>
            ) : null}
          </p>
          <p className="mt-8 rounded-2xl border border-line bg-coal p-6 text-lg leading-relaxed">
            {article.lead}
          </p>
        </header>

        <div className="mt-12 space-y-12">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl leading-snug font-bold sm:text-3xl">{section.heading}</h2>
              <div className="mt-5 space-y-5 text-lg leading-relaxed text-steel">
                {section.blocks.map((block, index) => (
                  <ArticleBlock key={index} block={block} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {article.faq?.length ? (
          <section className="mt-14">
            <h2 className="mb-6 font-display text-2xl font-bold sm:text-3xl">Perguntas frequentes</h2>
            <FaqList items={article.faq} />
          </section>
        ) : null}

        {article.sources?.length ? (
          <section className="mt-14 border-t border-line pt-8">
            <h2 className="font-display text-lg font-bold">Fontes e referências</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-relaxed text-steel-dim">
              {article.sources.map((source) => (
                <li key={source}>{source}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-steel-dim">
              Este conteúdo é informativo e não substitui o projeto e a avaliação do responsável
              técnico da obra.
            </p>
          </section>
        ) : null}

        <aside className="mt-14 rounded-2xl border border-line bg-graphite p-7 sm:p-8">
          <p className="font-display text-xl font-bold">Precisa de uma solução em aço inox?</p>
          <p className="mt-3 leading-relaxed text-steel-dim">
            A Abreu Inox fabrica e instala peças sob medida no DF e em Goiás.
            {solution ? (
              <>
                {" "}
                Conheça a solução de{" "}
                <Link href={`/solucoes/${solution.slug}/`} className="underline hover:text-paper">
                  {solution.name.toLowerCase()}
                </Link>
                .
              </>
            ) : null}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton audience={article.whatsapp} cta="artigo">
              {article.ctaLabel}
            </WhatsAppButton>
            <ButtonLink href="/orcamento/">Enviar briefing</ButtonLink>
          </div>
        </aside>

        <nav aria-label="Outros conteúdos" className="mt-14">
          <h2 className="font-display text-lg font-bold">Outros conteúdos</h2>
          <ul className="mt-4 space-y-2">
            {others.map((other) => (
              <li key={other.slug}>
                <Link href={`/conteudos/${other.slug}/`} className="underline hover:text-steel">
                  {other.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </article>
      <JsonLd
        data={graph(
          webPageNode({
            path,
            name: article.title,
            description: article.metaDescription,
            about: `${site.url}${path}#artigo`,
            dateModified: article.updatedAt,
          }),
          articleNode(article),
          ...(article.faq?.length ? [faqNode(path, article.faq)] : []),
        )}
      />
    </>
  );
}
