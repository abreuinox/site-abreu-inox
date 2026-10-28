import type { Metadata } from "next";
import { site } from "@/config/site";

/** URL absoluta e canônica; caminhos de página terminam em "/" (trailingSlash). */
export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const withSlash = clean.endsWith("/") || /\.[a-z0-9]+$/i.test(clean) ? clean : `${clean}/`;
  return `${site.url}${withSlash}`;
}

type PageImage = { url: string; width?: number; height?: number; alt: string };

type PageMetadataInput = {
  /** Sem o sufixo da marca: o template do layout adiciona "| Abreu Inox". */
  title: string;
  description: string;
  path: string;
  image?: PageImage;
  /** Usa o título exatamente como informado, sem o template (homepage). */
  absoluteTitle?: boolean;
  article?: { publishedTime: string; modifiedTime: string };
};

/**
 * Metadata completa de uma página: title, description, canonical absoluto,
 * Open Graph e Twitter. O Open Graph é declarado inteiro em cada página
 * porque o Next substitui (não mescla) objetos aninhados entre segmentos.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = site.ogImage,
  absoluteTitle = false,
  article,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = absoluteTitle ? title : `${title} | ${site.shortName}`;
  const images = [{ ...image, url: absoluteUrl(image.url) }];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: article ? "article" : "website",
      url,
      siteName: site.shortName,
      title: socialTitle,
      description,
      locale: site.locale,
      images,
      ...(article ?? {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images,
    },
  };
}
