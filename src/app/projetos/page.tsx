import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProjectGallery } from "@/components/ProjectGallery";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/config/site";
import { projectCategories, projects } from "@/data/projects";
import { withDimensions } from "@/lib/project-images";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { graph, webPageNode } from "@/lib/structured-data";

const path = "/projetos/";
const title = "Projetos em Aço Inox: Corrimãos, Guarda-Corpos e Escadas";
const description = `Portfólio da Abreu Inox com ${projects.length} projetos reais em aço inox: corrimãos, guarda-corpos, escadas helicoidais, piscinas, móveis e peças sob medida no DF.`;

export const metadata = pageMetadata({ title, description, path });

export default function ProjectsPage() {
  return (
    <>
      <Breadcrumbs path={path} items={[{ name: "Projetos", path }]} />
      <PageHero
        eyebrow="Portfólio"
        title="Projetos em aço inox realizados pela Abreu Inox"
        intro="Fotografias reais de trabalhos fabricados e instalados pela nossa equipe. Filtre por categoria e abra cada projeto para ver todas as fotos e detalhes."
      >
        <WhatsAppButton audience="project" cta="projetos-hero">
          Quero um projeto parecido
        </WhatsAppButton>
      </PageHero>
      <div className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
        <h2 className="sr-only">Todos os projetos</h2>
        <ProjectGallery
          projects={withDimensions(projects)}
          categories={projectCategories}
          pageSize={projects.length}
        />
      </div>
      <FinalCta audience="project" />
      <JsonLd
        data={graph({
          ...webPageNode({
            path,
            name: title,
            description,
            type: "CollectionPage",
            image: projects[0]?.image.src,
            dateModified: site.contentUpdatedAt,
          }),
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: projects.length,
            itemListElement: projects.map((project, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: absoluteUrl(`/projetos/${project.id}/`),
              name: project.title,
            })),
          },
        })}
      />
    </>
  );
}
