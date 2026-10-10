import { readFileSync } from "node:fs";
import { join } from "node:path";
import { imageSize } from "image-size";
import { site } from "@/config/site";
import { projectCategories, projects } from "@/data/projects";
import { whatsappUrl } from "@/lib/whatsapp";
import { InstagramIcon } from "./icons";
import { type GalleryProject, ProjectGallery } from "./ProjectGallery";
import { Section } from "./Section";
import { WhatsAppButton } from "./WhatsAppButton";

/** Lê as dimensões de cada foto para a grade respeitar a proporção original. */
function withDimensions(): GalleryProject[] {
  return projects.map((project) => {
    const file = readFileSync(join(process.cwd(), "public", project.image.src));
    const { width, height } = imageSize(file);
    return { ...project, image: { ...project.image, width, height } };
  });
}

export function Portfolio() {
  const hasProjects = projects.length > 0;

  return (
    <Section
      id="projetos"
      eyebrow="Portfólio"
      title="Projetos realizados pela Abreu Inox"
      intro={
        hasProjects
          ? "Fotografias reais de trabalhos fabricados e instalados pela nossa equipe. Toque em um projeto para ver os detalhes."
          : `Acompanhe fotografias reais dos nossos trabalhos no Instagram ${site.instagram.handle}, ou peça pelo WhatsApp fotos de projetos parecidos com o seu.`
      }
      className="bg-coal/40"
    >
      {hasProjects ? (
        <ProjectGallery
          projects={withDimensions()}
          categories={projectCategories}
          quoteUrl={whatsappUrl()}
        />
      ) : null}
      <div className={`flex flex-col gap-3 sm:flex-row sm:items-center ${hasProjects ? "mt-10" : ""}`}>
        <a
          href={site.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/25 px-7 py-4 font-semibold transition-colors hover:border-white/60 hover:bg-white/5"
        >
          <InstagramIcon className="size-5" />
          {hasProjects ? "Mais projetos no Instagram" : "Ver projetos no Instagram"}
        </a>
        <WhatsAppButton variant={hasProjects ? "outline" : "primary"}>
          {hasProjects ? "Solicitar orçamento" : "Pedir fotos de projetos"}
        </WhatsAppButton>
      </div>
    </Section>
  );
}
