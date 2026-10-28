import { ButtonLink } from "./ButtonLink";
import { Section } from "./Section";
import { SolutionCards } from "./SolutionCards";
import { WhatsAppButton } from "./WhatsAppButton";

export function Services() {
  return (
    <Section
      id="servicos"
      eyebrow="O que fazemos"
      title="Soluções em aço inox para cada projeto"
      intro="A Abreu Inox vai além do corrimão: fabricamos e instalamos guarda-corpos, acabamentos para escadas curvas e helicoidais, móveis e peças em aço inox sob medida."
    >
      <SolutionCards />
      <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-steel">
          Precisa de algo diferente? Outras demandas em aço inox podem ser analisadas mediante
          consulta.
        </p>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <ButtonLink href="/solucoes/">Todas as soluções</ButtonLink>
          <WhatsAppButton variant="outline" cta="servicos">
            Consultar pelo WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </Section>
  );
}
