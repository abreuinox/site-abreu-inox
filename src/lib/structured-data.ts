import { site } from "@/config/site";
import { services } from "@/data/services";

const businessId = `${site.url}/#empresa`;
const websiteId = `${site.url}/#website`;

/**
 * JSON-LD da empresa. Só entram dados confirmados: sem endereço postal
 * completo, CEP, coordenadas, horário de funcionamento ou avaliações.
 */
export function structuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": businessId,
        name: site.name,
        url: `${site.url}/`,
        description: site.seo.description,
        slogan: site.tagline,
        telephone: site.whatsapp.e164,
        image: `${site.url}/images/brand/abreu-inox-logo.jpg`,
        logo: `${site.url}/images/brand/abreu-inox-logo.jpg`,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.base.city,
          addressRegion: site.base.region,
          addressCountry: site.base.country,
        },
        areaServed: site.serviceArea.states.map((name) => ({
          "@type": "State",
          name,
        })),
        sameAs: [site.instagram.url],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: site.whatsapp.e164,
          availableLanguage: "pt-BR",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Serviços em aço inox",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.description,
              provider: { "@id": businessId },
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: `${site.url}/`,
        name: site.shortName,
        inLanguage: "pt-BR",
        publisher: { "@id": businessId },
      },
    ],
  };
}
