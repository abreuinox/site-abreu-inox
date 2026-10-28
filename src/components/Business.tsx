import { CheckIcon } from "./icons";
import { Section } from "./Section";
import { WhatsAppButton } from "./WhatsAppButton";

const commitments = [
  "Emitimos nota fiscal",
  "Trabalhamos com faturamento",
  "Atendemos empresas privadas",
  "Atendemos órgãos públicos",
  "Orçamentos para demandas em diferentes regiões do DF e de Goiás",
  "Projetos e estruturas desenvolvidos sob medida",
];

type Props = { title?: string; intro?: React.ReactNode };

export function Business({
  title = "Soluções em inox para empresas e órgãos públicos",
  intro = "Atendemos empresas, construtoras, condomínios e órgãos públicos com soluções em aço inox sob medida. Emitimos nota fiscal, trabalhamos com faturamento e preparamos orçamentos personalizados para cada demanda.",
}: Props) {
  return (
    <Section id="empresas" eyebrow="Empresas e órgãos públicos" title={title} intro={intro}>
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {commitments.map((item) => (
            <li key={item} className="flex items-start gap-3 bg-coal p-6">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-paper text-ink">
                <CheckIcon className="size-3.5" />
              </span>
              <span className="leading-snug font-medium">{item}</span>
            </li>
          ))}
        </ul>
        <div className="rounded-2xl border border-line bg-graphite p-7 sm:p-8">
          <h3 className="font-display text-xl font-bold">Solicite um orçamento institucional</h3>
          <p className="mt-3 leading-relaxed text-steel-dim">
            Escolha o seu perfil e fale direto com o nosso comercial pelo WhatsApp.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <WhatsAppButton audience="company" className="w-full" cta="empresas">
              Orçamento para empresas
            </WhatsAppButton>
            <WhatsAppButton audience="publicSector" variant="outline" className="w-full" cta="orgaos-publicos">
              Orçamento para órgãos públicos
            </WhatsAppButton>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-steel-dim">
            As condições de faturamento, prazos, documentação e contratação são
            definidas conforme a negociação.
          </p>
        </div>
      </div>
    </Section>
  );
}
