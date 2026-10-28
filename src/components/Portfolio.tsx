import { site } from "@/config/site";
import { projectCategories, projects } from "@/data/projects";
import { withDimensions } from "@/lib/project-images";
import { ButtonLink } from "./ButtonLink";
import { InstagramIcon } from "./icons";
import { ProjectGallery } from "./ProjectGallery";
import { Section } from "./Section";

export function Portfolio() {
  return (
    <Section
      id="projetos"
      eyebrow="Portfólio"
      title="Projetos realizados pela Abreu Inox"
      intro="Fotografias reais de trabalhos fabricados e instalados pela nossa equipe. Toque em um projeto para ver os detalhes."
      className="bg-coal/40"
    >
      <ProjectGallery
        projects={withDimensions(projects)}
        categories={projectCategories}
      />
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
        <ButtonLink href="/projetos/" variant="primary">
          Ver todos os {projects.length} projetos
        </ButtonLink>
        <a
          href={site.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/25 px-7 py-4 font-semibold transition-colors hover:border-white/60 hover:bg-white/5"
        >
          <InstagramIcon className="size-5" />
          Mais projetos no Instagram
        </a>
      </div>
    </Section>
  );
}
