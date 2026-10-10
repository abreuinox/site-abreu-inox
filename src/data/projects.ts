import catalog from "./projects.json";

/**
 * Catálogo de projetos do portfólio.
 *
 * Os projetos ficam em `projects.json` e as fotos em `public/images/projects/`.
 * Para publicar um projeto novo basta adicionar a foto e uma entrada no JSON,
 * sem mexer nos componentes. O passo a passo está em
 * `docs/portfolio.md`.
 */
export type ProjectImage = {
  /** Caminho a partir de `public/`, por exemplo `/images/projects/escada-01.jpg`. */
  src: string;
  /** Texto alternativo específico, descrevendo o que aparece na foto. */
  alt: string;
};

export type ProjectVideo = {
  /** Caminho a partir de `public/`, por exemplo `/videos/projects/escada.mp4`. */
  src: string;
  /** Imagem exibida antes de o vídeo começar. */
  poster: string;
  /** Descrição curta do que o vídeo mostra. */
  label: string;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: ProjectImage;
  /** Fotos adicionais do mesmo projeto. */
  gallery?: ProjectImage[];
  /** Vídeo do projeto, exibido como último item da galeria. */
  video?: ProjectVideo;
  /** Preencha somente quando a localização estiver confirmada pela empresa. */
  location?: string;
  /** Projetos em destaque aparecem primeiro e em tamanho maior. */
  featured?: boolean;
};

export const projects: Project[] = [...(catalog as Project[])].sort(
  (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false),
);

export const projectCategories: string[] = [
  ...new Set(projects.map((project) => project.category)),
];
