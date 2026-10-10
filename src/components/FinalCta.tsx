import { site } from "@/config/site";
import { WhatsAppButton } from "./WhatsAppButton";

export function FinalCta() {
  return (
    <section id="orcamento" aria-labelledby="orcamento-titulo" className="bg-rails border-t border-line">
      <div className="mx-auto max-w-4xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <h2
          id="orcamento-titulo"
          className="text-steel font-display text-4xl leading-tight font-extrabold tracking-tight text-balance sm:text-6xl"
        >
          Solicite seu orçamento em aço inox
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-steel">
          Fale com a Abreu Inox pelo WhatsApp e receba um orçamento
          personalizado para o seu projeto.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4">
          <WhatsAppButton>Solicitar orçamento pelo WhatsApp</WhatsAppButton>
          <p className="text-sm text-steel-dim">WhatsApp {site.whatsapp.display}</p>
        </div>
      </div>
    </section>
  );
}
