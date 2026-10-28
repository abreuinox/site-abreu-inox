import { site } from "@/config/site";
import { Section } from "./Section";

export function ServiceArea() {
  return (
    <Section
      id="atendimento"
      eyebrow="Onde atendemos"
      title="Atendimento no Distrito Federal e Goiás"
      intro="Realizamos orçamentos para demandas em diferentes regiões do DF e de Goiás, mediante avaliação da demanda e viabilidade de atendimento."
    >
      <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
        <div className="bg-coal p-7">
          <dt className="text-xs font-semibold tracking-[0.18em] text-steel-dim uppercase">
            Base operacional
          </dt>
          <dd className="mt-3 font-display text-lg leading-snug font-bold">{site.base.label}</dd>
        </div>
        <div className="bg-coal p-7">
          <dt className="text-xs font-semibold tracking-[0.18em] text-steel-dim uppercase">
            Área de atendimento
          </dt>
          <dd className="mt-3 font-display text-lg leading-snug font-bold">
            {site.serviceArea.label}
          </dd>
        </div>
        <div className="bg-coal p-7">
          <dt className="text-xs font-semibold tracking-[0.18em] text-steel-dim uppercase">
            Como atendemos
          </dt>
          <dd className="mt-3 font-display text-lg leading-snug font-bold">
            Orçamento pelo WhatsApp ou pelo formulário, com avaliação de cada demanda
          </dd>
        </div>
      </dl>
    </Section>
  );
}
