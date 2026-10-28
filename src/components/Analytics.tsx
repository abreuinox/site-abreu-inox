"use client";

import { useEffect } from "react";
import { trackWhatsAppLead } from "@/lib/ads";
import { track } from "@/lib/analytics";

/**
 * Mede os cliques de contato do site inteiro com um único listener, para
 * que todo link de WhatsApp conte, sem precisar de um componente especial.
 * Os links podem informar onde estão com data-cta="hero", "header" etc.
 */
export function Analytics() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.("a");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const params = {
        cta_location: link.dataset.cta,
        link_text: link.textContent?.trim().slice(0, 60),
      };
      if (href.startsWith("https://wa.me/")) {
        track("click_whatsapp", params);
        trackWhatsAppLead();
      } else if (href.startsWith("tel:")) {
        track("click_phone", params);
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
