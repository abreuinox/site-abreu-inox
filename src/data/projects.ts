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

const categoryCounts = new Map<string, number>();
for (const { category } of projects) {
  categoryCounts.set(category, (categoryCounts.get(category) ?? 0) + 1);
}

/** Categorias do filtro, das que têm mais projetos para as que têm menos. */
export const projectCategories: string[] = [...categoryCounts.keys()].sort(
  (a, b) => categoryCounts.get(b)! - categoryCounts.get(a)!,
);
