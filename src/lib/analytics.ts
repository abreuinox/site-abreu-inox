/**
 * Eventos de medição do site (GA4). Taxonomia em
 * docs/seo/RELATORIO-IMPLEMENTACAO.md. A conversão do Google Ads fica em
 * lib/ads.ts. Não envie dados pessoais (nome, telefone, e-mail, texto livre).
 */
const ga4Pattern = /^G-[A-Z0-9]+$/;
const rawGa4Id = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";

/** ID do GA4 (G-XXXXXXX), ou "" quando não configurado. */
export const ga4Id = ga4Pattern.test(rawGa4Id) ? rawGa4Id : "";

export type EventName =
  | "click_whatsapp"
  | "click_phone"
  | "submit_quote"
  | "view_service"
  | "view_project";

export type EventParams = Record<string, string | number | undefined>;

/** Envia um evento ao gtag, quando a tag estiver carregada. */
export function track(name: EventName, params: EventParams = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, { page_path: window.location.pathname, ...params });
}
