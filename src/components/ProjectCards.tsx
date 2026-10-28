import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

/** Grade de projetos com links rastreáveis para a página de cada um. */
export function ProjectCards({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <li key={project.id}>
          <Link
            href={`/projetos/${project.id}/`}
            className="group block h-full overflow-hidden rounded-2xl border border-line bg-coal"
          >
            <span className="relative block aspect-[4/3] overflow-hidden">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                sizes="(min-width: 1024px) 352px, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </span>
            <span className="block p-5">
              <span className="block text-xs font-semibold tracking-[0.18em] text-steel-dim uppercase">
                {project.category}
              </span>
              <span className="mt-1 block font-display text-lg leading-snug font-bold group-hover:underline">
                {project.title}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
