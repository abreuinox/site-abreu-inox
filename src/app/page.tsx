import { Audiences } from "@/components/Audiences";
import { Experience } from "@/components/Experience";
import { FaqList } from "@/components/FaqList";
import { FinalCta } from "@/components/FinalCta";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { Portfolio } from "@/components/Portfolio";
import { Section } from "@/components/Section";
import { ServiceArea } from "@/components/ServiceArea";
import { Services } from "@/components/Services";
import { site } from "@/config/site";
import { homeFaq } from "@/data/faq";
import { pageMetadata } from "@/lib/seo";
import { faqNode, graph, webPageNode } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: site.seo.title,
  description: site.seo.description,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <Audiences />
      <Experience />
      <ServiceArea />
      <Section id="perguntas" eyebrow="Perguntas frequentes" title="Perguntas sobre a Abreu Inox">
        <FaqList items={homeFaq} />
      </Section>
      <FinalCta />
      <JsonLd
        data={graph(
          webPageNode({
            path: "/",
            name: site.seo.title,
            description: site.seo.description,
            image: "/images/projects/escada-helicoidal-02.jpg",
            breadcrumb: false,
            dateModified: site.contentUpdatedAt,
          }),
          faqNode("/", homeFaq),
        )}
      />
    </>
  );
}
