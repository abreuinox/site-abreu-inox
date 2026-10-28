import Script from "next/script";
import { googleAdsId, isGoogleAdsConfigured } from "@/lib/ads";
import { ga4Id } from "@/lib/analytics";

/**
 * Tag do Google (gtag.js), carregada uma única vez para o Google Ads e o
 * GA4. Cada conta só é configurada quando o ID dela está definido; sem
 * nenhum ID, nada é carregado.
 */
export function GoogleTag() {
  const ids = [isGoogleAdsConfigured() ? googleAdsId : "", ga4Id].filter(Boolean);
  if (ids.length === 0) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ids[0]}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
${ids.map((id) => `gtag('config', '${id}');`).join("\n")}
        `}
      </Script>
    </>
  );
}
