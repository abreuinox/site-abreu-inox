/**
 * Google Ads no site: a tag só entra no ar quando o ID da conta está
 * definido. O rótulo da conversão marca o clique no WhatsApp (orçamento).
 * Os valores vêm de NEXT_PUBLIC_GOOGLE_ADS_ID e
 * NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL — sem eles, nada é carregado.
 */

export const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() ?? "";
export const googleAdsConversionLabel =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL?.trim() ?? "";

const adsIdPattern = /^AW-\d+$/;
const conversionLabelPattern = /^[A-Za-z0-9_-]+$/;

export function isGoogleAdsId(value: string): boolean {
  return adsIdPattern.test(value);
}

export function isConversionLabel(value: string): boolean {
  return conversionLabelPattern.test(value);
}

export function isGoogleAdsConfigured(): boolean {
  return isGoogleAdsId(googleAdsId);
}

export function conversionSendTo(): string | null {
  if (!isGoogleAdsId(googleAdsId) || !isConversionLabel(googleAdsConversionLabel)) {
    return null;
  }
  return `${googleAdsId}/${googleAdsConversionLabel}`;
}

type GtagCommand = "js" | "config" | "event" | "set" | "consent";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: [GtagCommand, ...unknown[]]) => void;
  }
}

/** Dispara a conversão de orçamento. Sem tag configurada, não faz nada. */
export function trackWhatsAppLead(): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  const sendTo = conversionSendTo();
  if (sendTo) {
    window.gtag("event", "conversion", { send_to: sendTo });
  }

  window.gtag("event", "generate_lead", { method: "whatsapp" });
}
