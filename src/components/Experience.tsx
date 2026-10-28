import Link from "next/link";
import { Section } from "./Section";

export const processSteps = [
  {
    title: "Você apresenta a demanda",
    text: "Conte pelo WhatsApp ou pelo formulário o que precisa e, se puder, envie fotos, medidas ou o projeto.",
  },
  {
    title: "Avaliamos o projeto",
    text: "Analisamos a demanda, a solução mais adequada e a viabilidade de atendimento na sua região.",
  },
  {
    title: "Você recebe o orçamento",
    text: "Preparamos um orçamento personalizado para a sua peça ou estrutura sob medida.",
  },
];

export function ProcessSteps() {
  return (
    <ol className="grid gap-6 md:grid-cols-3">
      {processSteps.map((step, index) => (
        <li key={step.title} className="rounded-2xl border border-line bg-coal p-7">
          <span className="font-display text-4xl font-extrabold text-steel">{index + 1}</span>
          <h3 className="mt-4 font-display text-lg font-bold">{step.title}</h3>
          <p className="mt-2 leading-relaxed text-steel-dim">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function Experience() {
  return (
    <Section
      id="experiencia"
      eyebrow="Sobre a Abreu Inox"
      title="Mais de 30 anos de experiência em aço inox"
      intro={
        <>
          A Abreu Inox desenvolve projetos e estruturas em aço inox sob medida: de corrimãos e
          guarda-corpos a escadas, móveis e peças personalizadas.{" "}
          <Link href="/sobre/" className="underline hover:text-paper">
            Conheça a empresa
          </Link>
          .
        </>
      }
      className="bg-coal/40"
    >
      <p className="mb-6 font-display text-xl font-bold">Como funciona o atendimento</p>
      <ProcessSteps />
    </Section>
  );
}
