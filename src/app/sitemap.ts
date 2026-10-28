import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { articles } from "@/data/articles";
import { projects } from "@/data/projects";
import { solutions } from "@/data/solutions";
import { absoluteUrl } from "@/lib/seo";

/**
 * Só URLs canônicas, públicas e indexáveis. As datas vêm do conteúdo
 * (site.contentUpdatedAt e datas dos artigos), não do momento do build,
 * para o lastmod refletir mudanças reais.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const updated = site.contentUpdatedAt;
  const page = (path: string, images?: string[]) => ({
    url: absoluteUrl(path),
    lastModified: updated,
    ...(images?.length ? { images: images.map((src) => absoluteUrl(src)) } : {}),
  });

  return [
    page("/", ["/images/projects/escada-helicoidal-02.jpg"]),
    page("/solucoes/"),
    ...solutions.map((solution) => page(`/solucoes/${solution.slug}/`)),
    page("/empresas-e-orgaos-publicos/"),
    page("/projetos/"),
    ...projects.map((project) =>
      page(`/projetos/${project.id}/`, [
        project.image.src,
        ...(project.gallery ?? []).map((image) => image.src),
      ]),
    ),
    page("/sobre/"),
    page("/orcamento/"),
    page("/conteudos/"),
    ...articles.map((article) => ({
      url: absoluteUrl(`/conteudos/${article.slug}/`),
      lastModified: article.updatedAt,
    })),
  ];
}
