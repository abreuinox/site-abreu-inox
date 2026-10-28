import { site } from "@/config/site";
import type { Article } from "@/data/articles";
import type { FaqItem, Solution } from "@/data/solutions";
import { solutions } from "@/data/solutions";
import { absoluteUrl } from "./seo";

/**
 * Grafo JSON-LD do site. Cada entidade tem um @id estável, e as páginas
 * referenciam a empresa e o site por esses ids em vez de repeti-los.
 *
 * Só entram dados confirmados: sem endereço postal completo, CEP,
 * coordenadas, horário, CNPJ, data de fundação ou avaliações.
 */
export const ids = {
  business: `${site.url}/#empresa`,
  website: `${site.url}/#website`,
  logo: `${site.url}/#logo`,
};

type Node = Record<string, unknown>;

const areaServed = site.serviceArea.states.map((name) => ({ "@type": "State", name }));

export function businessNode(): Node {
  return {
    "@type": "LocalBusiness",
    "@id": ids.business,
    name: site.shortName,
    alternateName: site.name,
    url: absoluteUrl("/"),
    description: site.about,
    slogan: site.tagline,
    telephone: site.whatsapp.e164,
    logo: {
      "@type": "ImageObject",
      "@id": ids.logo,
      url: absoluteUrl(site.logo),
      width: 640,
      height: 640,
      caption: site.shortName,
    },
    image: { "@id": ids.logo },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.base.city,
      addressRegion: site.base.region,
      addressCountry: site.base.country,
    },
    areaServed,
    sameAs: [site.instagram.url],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: site.whatsapp.e164,
      availableLanguage: "Portuguese",
      areaServed: "BR",
    },
    knowsAbout: [
      "Aço inoxidável",
      "Corrimãos em aço inox",
      "Guarda-corpos em aço inox",
      "Escadas helicoidais",
      "Móveis em aço inox sob medida",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Soluções em aço inox",
      itemListElement: solutions.map((solution) => ({
        "@type": "Offer",
        itemOffered: { "@id": serviceId(solution) },
      })),
    },
  };
}

export function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: absoluteUrl("/"),
    name: site.shortName,
    alternateName: site.name,
    inLanguage: "pt-BR",
    publisher: { "@id": ids.business },
  };
}

type WebPageInput = {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "CollectionPage" | "ContactPage";
  image?: string;
  /** A página fala principalmente sobre esta entidade (@id). */
  about?: string;
  breadcrumb?: boolean;
  dateModified?: string;
};

export function webPageNode({
  path,
  name,
  description,
  type = "WebPage",
  image,
  about = ids.business,
  breadcrumb = true,
  dateModified,
}: WebPageInput): Node {
  const url = absoluteUrl(path);
  return {
    "@type": type,
    "@id": `${url}#pagina`,
    url,
    name,
    description,
    inLanguage: "pt-BR",
    isPartOf: { "@id": ids.website },
    about: { "@id": about },
    ...(image
      ? { primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(image) } }
      : {}),
    ...(breadcrumb ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
    ...(dateModified ? { dateModified } : {}),
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbNode(path: string, crumbs: Crumb[]): Node {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function serviceId(solution: Solution): string {
  return `${absoluteUrl(`/solucoes/${solution.slug}/`)}#servico`;
}

export function serviceNode(solution: Solution, image?: string): Node {
  return {
    "@type": "Service",
    "@id": serviceId(solution),
    name: solution.name,
    serviceType: solution.name,
    description: solution.summary,
    url: absoluteUrl(`/solucoes/${solution.slug}/`),
    provider: { "@id": ids.business },
    areaServed,
    ...(image ? { image: absoluteUrl(image) } : {}),
  };
}

export function faqNode(path: string, faq: FaqItem[]): Node {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    isPartOf: { "@id": `${absoluteUrl(path)}#pagina` },
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function articleNode(article: Article): Node {
  const url = absoluteUrl(`/conteudos/${article.slug}/`);
  return {
    "@type": "Article",
    "@id": `${url}#artigo`,
    headline: article.title,
    description: article.metaDescription,
    url,
    mainEntityOfPage: { "@id": `${url}#pagina` },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: "pt-BR",
    author: { "@id": ids.business },
    publisher: { "@id": ids.business },
    image: absoluteUrl(site.ogImage.url),
  };
}

/** Empresa e site: presentes em todas as páginas, pelo layout raiz. */
export function siteGraph() {
  return { "@context": "https://schema.org", "@graph": [businessNode(), websiteNode()] };
}

export function graph(...nodes: Node[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
