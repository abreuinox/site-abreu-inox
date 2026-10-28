import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/ButtonLink";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { ProjectCards } from "@/components/ProjectCards";
import { Section } from "@/components/Section";
import { TrackView } from "@/components/TrackView";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { projects } from "@/data/projects";
import { solutionForProject } from "@/data/solutions";
import { imageDimensions } from "@/lib/project-images";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { graph, ids, webPageNode } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

/** Descrição do projeto com a assinatura da marca quando couber sem truncar. */
function projectDescription(text: string) {
  const signed = `${text} Projeto da Abreu Inox.`;
  return signed.length <= 160 ? signed : text;
}

function getProject(slug: string) {
  return projects.find((project) => project.id === slug);
}

export async function generateMetadata({ params }: PageProps<"/projetos/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: projectDescription(project.description),
    path: `/projetos/${project.id}/`,
    image: { url: project.image.src, alt: project.image.alt, ...imageDimensions(project.image.src) },
  });
}

export default async function ProjectPage({ params }: PageProps<"/projetos/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const path = `/projetos/${project.id}/`;
  const solution = solutionForProject(project);
  const photos = [project.image, ...(project.gallery ?? [])].map((photo) => ({
    ...photo,
    ...imageDimensions(photo.src),
  }));
  const similar = projects
    .filter((p) => p.id !== project.id && p.category === project.category)
    .slice(0, 3);
  const quoteHref = `/orcamento/?servico=${encodeURIComponent(solution?.quoteService ?? "Outro")}`;

  return (
    <>
      <Breadcrumbs
        path={path}
        items={[
          { name: "Projetos", path: "/projetos/" },
          { name: project.title, path },
        ]}
      />
      <article className="mx-auto max-w-6xl px-5 pt-8 pb-20 sm:px-8 sm:pb-28">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-steel-dim uppercase">
            Projeto · {project.category}
          </p>
          <h1 className="text-steel mt-5 font-display text-4xl leading-[1.08] font-extrabold tracking-tight text-balance sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-steel">{project.description}</p>
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <div>
              <dt className="text-steel-dim">Categoria</dt>
              <dd className="font-semibold">{project.category}</dd>
            </div>
            <div>
              <dt className="text-steel-dim">Material</dt>
              <dd className="font-semibold">Aço inox</dd>
            </div>
            {project.location ? (
              <div>
                <dt className="text-steel-dim">Local</dt>
                <dd className="font-semibold">{project.location}</dd>
              </div>
            ) : null}
            {solution ? (
              <div>
                <dt className="text-steel-dim">Solução</dt>
                <dd className="font-semibold">
                  <Link href={`/solucoes/${solution.slug}/`} className="underline hover:text-steel">
                    {solution.name}
                  </Link>
                </dd>
              </div>
            ) : null}
          </dl>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton audience="project" cta="projeto-topo">
              Quero um projeto como este
            </WhatsAppButton>
            <ButtonLink href={quoteHref}>Enviar briefing</ButtonLink>
          </div>
        </header>

        <h2 className="sr-only">Fotos do projeto</h2>
        <ul className="mt-12 gap-4 sm:columns-2">
          {photos.map((photo, index) => (
            <li key={photo.src} className="mb-4 break-inside-avoid">
              <figure className="overflow-hidden rounded-2xl border border-line bg-coal">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  priority={index === 0}
                  sizes="(min-width: 1152px) 552px, (min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full"
                />
              </figure>
            </li>
          ))}
        </ul>

        {project.video ? (
          <figure className="mt-4 overflow-hidden rounded-2xl border border-line bg-black">
            <video
              src={project.video.src}
              poster={project.video.poster}
              aria-label={project.video.label}
              controls
              muted
              playsInline
              preload="none"
              className="mx-auto max-h-[80dvh] w-full object-contain"
            />
            <figcaption className="p-4 text-sm text-steel-dim">{project.video.label}</figcaption>
          </figure>
        ) : null}
      </article>

      {similar.length > 0 ? (
        <Section id="semelhantes" eyebrow="Veja também" title="Projetos semelhantes" className="bg-coal/40">
          <ProjectCards projects={similar} />
          <div className="mt-10">
            <ButtonLink href="/projetos/">Ver todos os projetos</ButtonLink>
          </div>
        </Section>
      ) : null}

      <FinalCta
        title="Quer um projeto como este?"
        text="Envie fotos e medidas do seu espaço e receba um orçamento personalizado da Abreu Inox."
        audience="project"
        label="Quero um projeto como este"
        quoteHref={quoteHref}
      />
      <TrackView event="view_project" params={{ project: project.id, category: project.category }} />
      <JsonLd
        data={graph({
          ...webPageNode({
            path,
            name: project.title,
            description: project.description,
            image: project.image.src,
          }),
          mainEntity: {
            "@type": "CreativeWork",
            "@id": `${absoluteUrl(path)}#projeto`,
            name: project.title,
            description: project.description,
            genre: project.category,
            material: "Aço inox",
            creator: { "@id": ids.business },
            image: photos.map((photo) => ({
              "@type": "ImageObject",
              contentUrl: absoluteUrl(photo.src),
              caption: photo.alt,
              width: photo.width,
              height: photo.height,
            })),
          },
        })}
      />
    </>
  );
}
