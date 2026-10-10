import { Section } from "./Section";

const steps = [
  {
    title: "Você apresenta a demanda",
    text: "Conte pelo WhatsApp o que precisa e, se puder, envie fotos e medidas do local.",
  },
  {
    title: "Avaliamos o projeto",
    text: "Analisamos a demanda e a viabilidade de atendimento na sua região.",
  },
  {
    title: "Você recebe o orçamento",
    text: "Preparamos um orçamento personalizado para a sua peça ou estrutura sob medida.",
  },
];

export function Experience() {
  return (
    <Section
      id="experiencia"
      eyebrow="Sobre a Abreu Inox"
      title="Mais de 15 anos de experiência"
      intro="Há mais de 15 anos no mercado, a Abreu Inox desenvolve projetos e estruturas em aço inox sob medida: de corrimões e guarda corpos a escadas, móveis e peças personalizadas."
      className="bg-coal/40"
    >
      <ol className="grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="rounded-2xl border border-line bg-coal p-7">
            <span className="text-steel font-display text-4xl font-extrabold">
              {index + 1}
            </span>
            <h3 className="mt-4 font-display text-lg font-bold">{step.title}</h3>
            <p className="mt-2 leading-relaxed text-steel-dim">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
