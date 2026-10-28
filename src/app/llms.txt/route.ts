import { site } from "@/config/site";
import { articles } from "@/data/articles";
import { homeFaq } from "@/data/faq";
import { projects } from "@/data/projects";
import { solutions } from "@/data/solutions";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * Resumo do site em Markdown para ferramentas que leem /llms.txt.
 * É opcional: não é requisito do Google, do ChatGPT nem do Gemini.
 * Gerado a partir dos mesmos dados das páginas, para não divergir delas.
 */
export function GET() {
  const body = [
    `# ${site.shortName}`,
    "",
    `> ${site.about}`,
    "",
    `- Experiência: ${site.experience.toLowerCase()}`,
    `- Base operacional: ${site.base.label}`,
    `- Área de atendimento: ${site.serviceArea.label}, ${site.serviceArea.note}`,
    `- Contato comercial: WhatsApp ${site.whatsapp.display} (${site.whatsapp.e164})`,
    `- Instagram: ${site.instagram.url}`,
    `- Site oficial: ${absoluteUrl("/")}`,
    "",
    "## Soluções",
    "",
    ...solutions.map((s) => `- [${s.name}](${absoluteUrl(`/solucoes/${s.slug}/`)}): ${s.summary}`),
    "",
    "## Institucional",
    "",
    `- [Sobre a Abreu Inox](${absoluteUrl("/sobre/")})`,
    `- [Empresas e órgãos públicos](${absoluteUrl("/empresas-e-orgaos-publicos/")})`,
    `- [Projetos realizados](${absoluteUrl("/projetos/")}): ${projects.length} projetos com fotos reais`,
    `- [Solicitar orçamento](${absoluteUrl("/orcamento/")})`,
    "",
    "## Conteúdos técnicos",
    "",
    ...articles.map((a) => `- [${a.title}](${absoluteUrl(`/conteudos/${a.slug}/`)})`),
    "",
    "## Perguntas frequentes",
    "",
    ...homeFaq.flatMap((item) => [`### ${item.question}`, "", item.answer, ""]),
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
