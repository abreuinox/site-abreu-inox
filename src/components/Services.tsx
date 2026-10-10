import { services } from "@/data/services";
import { Section } from "./Section";
import { WhatsAppButton } from "./WhatsAppButton";

export function Services() {
  return (
    <Section
      id="servicos"
      eyebrow="O que fazemos"
      title="Nossos serviços em aço inox"
      intro="A Abreu Inox vai além do corrimão: desenvolvemos peças, móveis e estruturas em aço inox sob medida para cada projeto."
    >
      <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <li key={service.id} className="bg-coal p-7 transition-colors hover:bg-graphite">
            <span className="font-display text-sm font-semibold text-steel-dim">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-display text-xl font-bold">{service.title}</h3>
            <p className="mt-2 leading-relaxed text-steel-dim">{service.description}</p>
          </li>
        ))}
      </ul>
      <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-steel">
          Precisa de algo diferente? Outras demandas em aço inox podem ser
          analisadas mediante consulta.
        </p>
        <WhatsAppButton variant="outline" className="shrink-0">
          Consultar pelo WhatsApp
        </WhatsAppButton>
      </div>
    </Section>
  );
}
