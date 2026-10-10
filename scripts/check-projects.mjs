// Valida o catálogo de projetos antes do build: campos obrigatórios,
// identificadores únicos e existência de cada foto em public/.
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const projects = JSON.parse(
  readFileSync(join(root, "src/data/projects.json"), "utf8"),
);

const errors = [];
const ids = new Set();

function checkImage(image, where) {
  if (!image || typeof image.src !== "string" || typeof image.alt !== "string") {
    errors.push(`${where}: a imagem precisa de "src" e "alt".`);
    return;
  }
  if (!image.src.startsWith("/images/projects/")) {
    errors.push(`${where}: "src" deve começar com /images/projects/ (${image.src}).`);
  } else if (!existsSync(join(root, "public", image.src))) {
    errors.push(`${where}: arquivo não encontrado em public${image.src}.`);
  }
  if (!image.alt.trim()) {
    errors.push(`${where}: o texto alternativo ("alt") está vazio.`);
  }
}

if (!Array.isArray(projects)) {
  errors.push("projects.json deve ser uma lista de projetos.");
} else {
  projects.forEach((project, index) => {
    const where = `Projeto ${index + 1} (${project.id ?? "sem id"})`;
    for (const field of ["id", "title", "category", "description"]) {
      if (typeof project[field] !== "string" || !project[field].trim()) {
        errors.push(`${where}: campo obrigatório "${field}" ausente ou vazio.`);
      }
    }
    if (ids.has(project.id)) errors.push(`${where}: "id" duplicado.`);
    ids.add(project.id);
    if ("location" in project && !String(project.location).trim()) {
      errors.push(`${where}: remova "location" quando não houver localização confirmada.`);
    }
    checkImage(project.image, `${where}, imagem principal`);
    (project.gallery ?? []).forEach((image, i) =>
      checkImage(image, `${where}, galeria ${i + 1}`),
    );
    if (project.video) {
      const { src, poster, label } = project.video;
      checkImage({ src: poster, alt: label }, `${where}, capa do vídeo`);
      if (typeof src !== "string" || !src.startsWith("/videos/projects/")) {
        errors.push(`${where}: o vídeo deve ficar em /videos/projects/.`);
      } else if (!existsSync(join(root, "public", src))) {
        errors.push(`${where}: vídeo não encontrado em public${src}.`);
      }
    }
  });
}

if (errors.length > 0) {
  console.error("Catálogo de projetos inválido:\n- " + errors.join("\n- "));
  process.exit(1);
}
console.log(`Catálogo de projetos válido: ${projects.length} projeto(s).`);
