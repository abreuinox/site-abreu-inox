import Image from "next/image";
import { site } from "@/config/site";
import { ArrowIcon } from "./icons";
import { WhatsAppButton } from "./WhatsAppButton";

const highlights = [
  { value: "+15 anos", label: "de mercado" },
  { value: "DF e Goiás", label: "área de atendimento" },
  { value: "Nota fiscal", label: "e faturamento" },
  { value: "Sob medida", label: "para cada projeto" },
];

export function Hero() {
  return (
    <section id="topo" className="bg-rails relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-16 pb-14 sm:px-8 sm:pt-24 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-steel-dim uppercase">
            {site.tagline}
          </p>
          <h1 className="text-steel mt-6 font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-balance sm:text-6xl">
            Corrimãos, guarda corpos e soluções em aço inox sob medida.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel">
            Fabricamos e instalamos corrimãos, guarda corpos, escadas, móveis e
            estruturas personalizadas em aço inox. Atendemos o Distrito Federal
            e Goiás, com nota fiscal e faturamento.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <WhatsAppButton>Solicitar orçamento</WhatsAppButton>
            <a
              href="#projetos"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 font-semibold transition-colors hover:border-white/60 hover:bg-white/5"
            >
              Ver projetos
              <ArrowIcon className="size-4" />
            </a>
          </div>
        </div>
        <figure className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-white/10">
          <Image
            src="/images/projects/escada-helicoidal-02.jpg"
            alt="Corrimão curvo em aço inox escovado em escada helicoidal, projeto da Abreu Inox"
            fill
            priority
            sizes="(min-width: 1024px) 448px, 100vw"
            className="object-cover object-[78%_center]"
          />
        </figure>
      </div>
      <ul className="mx-auto grid max-w-6xl grid-cols-2 border-t border-line px-5 sm:px-8 lg:grid-cols-4">
        {highlights.map((item) => (
          <li key={item.value} className="py-7 pr-4">
            <strong className="block font-display text-xl font-bold sm:text-2xl">
              {item.value}
            </strong>
            <span className="mt-1 block text-sm text-steel-dim">{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
