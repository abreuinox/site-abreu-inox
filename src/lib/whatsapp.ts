import { site, whatsappMessages, type WhatsAppAudience } from "@/config/site";

/**
 * Monta o link de orçamento pelo WhatsApp com a mensagem codificada.
 * URLSearchParams codifica espaço como "+"; trocamos por "%20" porque alguns
 * clientes do WhatsApp exibem o "+" literalmente (um "+" real vira "%2B").
 */
export function whatsappUrl(audience: WhatsAppAudience = "default"): string {
  const params = new URLSearchParams({ text: whatsappMessages[audience] });
  const query = params.toString().replace(/\+/g, "%20");
  return `https://wa.me/${site.whatsapp.number}?${query}`;
}
