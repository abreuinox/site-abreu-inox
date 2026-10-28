import Link from "next/link";
import { ArrowIcon } from "./icons";
import { Section } from "./Section";

const audiences = [
  {
    title: "Empresas e condomínios",
    text: "Corrimãos, guarda-corpos e estruturas para edifícios, recepções e áreas comuns, com nota fiscal e faturamento.",
    href: "/empresas-e-orgaos-publicos/",
    cta: "Atendimento para empresas",
  },
  {
    title: "Órgãos públicos e instituições",
    text: "Orçamentos a partir da especificação ou do termo de referência, com emissão de nota fiscal e condições de faturamento definidas na negociação.",
    href: "/empresas-e-orgaos-publicos/",
    cta: "Atendimento para órgãos públicos",
  },
  {
    title: "Arquitetos, engenheiros e construtoras",
    text: "Execução de peças especificadas em projeto, com tubos curvados, acabamentos escovado ou polido e soluções para escadas especiais.",
    href: "/orcamento/?perfil=arquitetura",
    cta: "Enviar um projeto",
  },
  {
    title: "Residências",
    text: "Corrimãos, guarda-corpos, escadas e móveis em inox sob medida, pensados para o espaço e o uso da casa.",
    href: "/solucoes/",
    cta: "Ver soluções",
  },
];

export function Audiences() {
  return (
    <Section
      id="clientes"
      eyebrow="Quem atendemos"
      title="Do projeto residencial à obra institucional"
      intro="Cada perfil de cliente tem necessidades diferentes de especificação, documentação e prazo. O atendimento começa entendendo a sua demanda."
    >
      <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
        {audiences.map((audience) => (
          <li key={audience.title} className="flex flex-col bg-coal p-7">
            <h3 className="font-display text-xl font-bold">{audience.title}</h3>
            <p className="mt-2 leading-relaxed text-steel-dim">{audience.text}</p>
            <Link
              href={audience.href}
              className="mt-5 inline-flex items-center gap-2 self-start py-2 font-semibold hover:underline"
            >
              {audience.cta}
              <ArrowIcon className="size-4" />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
