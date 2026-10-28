import type { WhatsAppAudience } from "@/config/site";
import { site } from "@/config/site";
import { ButtonLink } from "./ButtonLink";
import { WhatsAppButton } from "./WhatsAppButton";

type Props = {
  title?: string;
  text?: string;
  audience?: WhatsAppAudience;
  label?: string;
  /** Link para o formulário de orçamento, com o serviço já preenchido. */
  quoteHref?: string;
};

export function FinalCta({
  title = "Solicite seu orçamento em aço inox",
  text = "Fale com a Abreu Inox pelo WhatsApp ou envie um briefing pelo formulário e receba um orçamento personalizado para o seu projeto.",
  audience = "default",
  label = "Solicitar orçamento pelo WhatsApp",
  quoteHref = "/orcamento/",
}: Props) {
  return (
    <section id="orcamento" aria-labelledby="orcamento-titulo" className="bg-rails border-t border-line">
      <div className="mx-auto max-w-4xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <h2
          id="orcamento-titulo"
          className="text-steel font-display text-4xl leading-tight font-extrabold tracking-tight text-balance sm:text-6xl"
        >
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-steel">{text}</p>
        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton audience={audience} cta="final">
              {label}
            </WhatsAppButton>
            <ButtonLink href={quoteHref}>Enviar briefing</ButtonLink>
          </div>
          <p className="text-sm text-steel-dim">WhatsApp {site.whatsapp.display}</p>
        </div>
      </div>
    </section>
  );
}
