"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project, ProjectImage } from "@/data/projects";
import { ArrowIcon, CloseIcon } from "./icons";
import { whatsappUrl } from "@/lib/whatsapp";

/** Projeto com as dimensões reais da foto principal, lidas no servidor. */
export type GalleryProject = Project & {
  image: ProjectImage & { width: number; height: number };
};

type Props = {
  projects: GalleryProject[];
  categories: string[];
  /** Quantos projetos a grade mostra antes do botão "Ver todos" (padrão: 9). */
  pageSize?: number;
};

const ALL = "Todos";
const PAGE_SIZE = 9;

function mediaLabel(project: Project) {
  const photoCount = (project.gallery?.length ?? 0) + 1;
  const photos = photoCount === 1 ? "Ver foto" : `Ver ${photoCount} fotos`;
  return project.video ? `${photos} e vídeo` : photos;
}

export function ProjectGallery({ projects, categories, pageSize = PAGE_SIZE }: Props) {
  const [category, setCategory] = useState(ALL);
  const [expanded, setExpanded] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const visible =
    category === ALL ? projects : projects.filter((p) => p.category === category);
  // O destaque só aparece na visão geral; com filtro, tudo entra na grade.
  const featured = category === ALL ? projects.find((p) => p.featured) : undefined;
  const rest = visible.filter((p) => p.id !== featured?.id);
  const grid = expanded ? rest : rest.slice(0, pageSize);
  const open = projects.find((p) => p.id === openId) ?? null;
  const photos = open ? [open.image, ...(open.gallery ?? [])] : [];
  // O vídeo, quando existe, entra como último item da galeria.
  const slideCount = photos.length + (open?.video ? 1 : 0);
  const photo = photos[photoIndex];
  const video = open?.video && photoIndex === photos.length ? open.video : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function openProject(id: string) {
    setPhotoIndex(0);
    setOpenId(id);
  }

  /**
   * Os cards são links para a página do projeto (rastreáveis e abríveis em
   * nova aba); o clique simples abre a visualização rápida na mesma página.
   */
  function onCardClick(event: React.MouseEvent, id: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    openProject(id);
  }

  function step(delta: number) {
    setPhotoIndex((index) => (index + delta + slideCount) % slideCount);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (slideCount < 2) return;
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  }

  return (
    <>
      {categories.length > 1 ? (
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filtrar projetos por categoria">
          {[ALL, ...categories].map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={category === name}
              onClick={() => {
                setCategory(name);
                setExpanded(false);
              }}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                category === name
                  ? "border-paper bg-paper text-ink"
                  : "border-white/20 text-steel hover:border-white/50"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      ) : null}

      {featured ? (
        <article className="mb-4 grid overflow-hidden rounded-2xl border border-line bg-coal lg:grid-cols-[1.7fr_1fr]">
          <Link
            href={`/projetos/${featured.id}/`}
            onClick={(event) => onCardClick(event, featured.id)}
            aria-label={`Abrir projeto: ${featured.title}`}
            className="group relative block aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[30rem]"
          >
            <Image
              src={featured.image.src}
              alt={featured.image.alt}
              fill
              sizes="(min-width: 1024px) 700px, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </Link>
          <div className="flex flex-col p-6 sm:p-9">
            <p className="text-xs font-semibold tracking-[0.18em] text-steel-dim uppercase">
              Projeto em destaque · {featured.category}
            </p>
            <h3 className="mt-4 font-display text-2xl leading-tight font-bold sm:text-3xl">
              <Link href={`/projetos/${featured.id}/`} className="hover:underline">
                {featured.title}
              </Link>
            </h3>
            <p className="mt-4 leading-relaxed text-steel">{featured.description}</p>
            <button
              type="button"
              onClick={() => openProject(featured.id)}
              className="mt-8 inline-flex items-center justify-center gap-2 self-start rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold transition-colors hover:border-white/60 hover:bg-white/5 lg:mt-auto"
            >
              {mediaLabel(featured)}
              <ArrowIcon className="size-4" />
            </button>
          </div>
        </article>
      ) : null}

      <ul className="gap-4 sm:columns-2 lg:columns-3">
        {grid.map((project) => (
          <li key={project.id} className="mb-4 break-inside-avoid">
            <Link
              href={`/projetos/${project.id}/`}
              onClick={(event) => onCardClick(event, project.id)}
              className="group relative block w-full overflow-hidden rounded-2xl border border-line bg-coal text-left"
            >
              <Image
                src={project.image.src}
                alt={project.image.alt}
                width={project.image.width}
                height={project.image.height}
                sizes="(min-width: 1024px) 352px, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent p-5 pt-16">
                <span className="block text-xs font-semibold tracking-[0.18em] text-steel uppercase">
                  {project.category}
                </span>
                <span className="mt-1 block font-display text-lg leading-snug font-bold">
                  {project.title}
                </span>
                {project.gallery?.length || project.video ? (
                  <span className="mt-1 block text-sm text-steel">{mediaLabel(project)}</span>
                ) : null}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {rest.length > grid.length ? (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-7 py-3.5 font-semibold transition-colors hover:border-white/60 hover:bg-white/5"
          >
            Ver todos os {visible.length} projetos
          </button>
        </div>
      ) : null}

      <dialog
        ref={dialogRef}
        onClose={() => setOpenId(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpenId(null);
        }}
        onKeyDown={onKeyDown}
        aria-labelledby="projeto-aberto-titulo"
        className="m-auto w-[min(72rem,calc(100vw-1.5rem))] max-w-none rounded-2xl border border-line bg-coal p-0 text-paper backdrop:bg-black/85"
      >
        {open ? (
          <div className="grid max-h-[calc(100dvh-1.5rem)] overflow-y-auto lg:grid-cols-[1.7fr_1fr]">
            <div className="relative aspect-[4/3] bg-black lg:aspect-auto lg:min-h-[36rem]">
              {video ? (
                <video
                  key={video.src}
                  src={video.src}
                  poster={video.poster}
                  aria-label={video.label}
                  controls
                  muted
                  playsInline
                  preload="none"
                  className="absolute inset-0 size-full bg-black object-contain"
                />
              ) : photo ? (
                <Image
                  key={photo.src}
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-contain"
                />
              ) : null}
              {slideCount > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Foto anterior"
                    className="absolute top-[40%] left-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/60 hover:bg-black/85"
                  >
                    <ArrowIcon className="size-5 rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Próxima foto"
                    className="absolute top-[40%] right-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/60 hover:bg-black/85"
                  >
                    <ArrowIcon className="size-5" />
                  </button>
                  <p
                    aria-live="polite"
                    className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs"
                  >
                    {video ? "Vídeo" : "Foto"} {photoIndex + 1} de {slideCount}
                  </p>
                </>
              ) : null}
            </div>
            <div className="flex flex-col p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <p className="pt-2 text-xs font-semibold tracking-[0.18em] text-steel-dim uppercase">
                  {open.category}
                </p>
                <button
                  type="button"
                  onClick={() => setOpenId(null)}
                  aria-label="Fechar projeto"
                  className="grid size-11 shrink-0 place-items-center rounded-full border border-white/20 hover:border-white/60"
                >
                  <CloseIcon className="size-4" />
                </button>
              </div>
              <h3 id="projeto-aberto-titulo" className="mt-3 font-display text-2xl font-bold">
                {open.title}
              </h3>
              {open.location ? (
                <p className="mt-2 text-sm text-steel-dim">{open.location}</p>
              ) : null}
              <p className="mt-4 leading-relaxed text-steel">{open.description}</p>
              <div className="mt-8 flex flex-col gap-3 lg:mt-auto">
                <a
                  href={whatsappUrl("project")}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="galeria"
                  className="surface-steel inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold"
                >
                  Quero um projeto como este
                </a>
                <Link
                  href={`/projetos/${open.id}/`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold hover:border-white/60"
                >
                  Ver página do projeto
                  <ArrowIcon className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
