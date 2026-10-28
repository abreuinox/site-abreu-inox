import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { articles } from "@/data/articles";
import { pageMetadata } from "@/lib/seo";
import { graph, webPageNode } from "@/lib/structured-data";
import { formatDate } from "@/lib/format";

const path = "/conteudos/";
const title = "Conteúdos Técnicos sobre Aço Inox";
const description =
  "Guias da Abreu Inox sobre aço inox: diferenças entre 304 e 316, como escolher um corrimão, como pedir orçamento sob medida e como limpar e conservar o inox.";

export const metadata = pageMetadata({ title, description, path });

export default function ArticlesPage() {
  return (
    <>
      <Breadcrumbs path={path} items={[{ name: "Conteúdos", path }]} />
      <PageHero
        eyebrow="Conteúdos"
        title="Conteúdos técnicos sobre aço inox"
        intro="Respostas diretas para quem está planejando um corrimão, um guarda-corpo ou uma peça em aço inox: materiais, acabamentos, normas, orçamento e conservação."
      />
      <div className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {articles.map((article) => (
            <li key={article.slug} className="bg-coal p-7 sm:p-8">
              <p className="text-sm text-steel-dim">
                <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
              </p>
              <h2 className="mt-3 font-display text-2xl leading-snug font-bold">
                <Link href={`/conteudos/${article.slug}/`} className="hover:underline">
                  {article.title}
                </Link>
              </h2>
              <p className="mt-3 leading-relaxed text-steel-dim">{article.metaDescription}</p>
            </li>
          ))}
        </ul>
      </div>
      <FinalCta />
      <JsonLd data={graph(webPageNode({ path, name: title, description, type: "CollectionPage" }))} />
    </>
  );
}
