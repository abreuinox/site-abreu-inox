import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/**
 * Tudo liberado para buscadores e rastreadores de busca com IA
 * (Googlebot, Bingbot, OAI-SearchBot, etc.). Para bloquear um rastreador
 * específico, acrescente uma regra com o userAgent dele; decisão do
 * proprietário, documentada em docs/seo/ESTRATEGIA-GEO-AEO.md.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
