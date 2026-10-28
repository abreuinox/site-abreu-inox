import { readFileSync } from "node:fs";
import { join } from "node:path";
import { imageSize } from "image-size";
import type { Project } from "@/data/projects";
import type { GalleryProject } from "@/components/ProjectGallery";

/** Dimensões reais de uma foto em public/, lidas no build. */
export function imageDimensions(src: string): { width: number; height: number } {
  const { width, height } = imageSize(readFileSync(join(process.cwd(), "public", src)));
  return { width, height };
}

/** Projetos com as dimensões da foto principal, para a grade respeitar a proporção. */
export function withDimensions(projects: Project[]): GalleryProject[] {
  return projects.map((project) => ({
    ...project,
    image: { ...project.image, ...imageDimensions(project.image.src) },
  }));
}
