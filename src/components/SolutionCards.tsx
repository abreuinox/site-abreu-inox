import Link from "next/link";
import { services } from "@/data/services";
import { solutions } from "@/data/solutions";
import { ArrowIcon } from "./icons";

/** Cards das soluções, com os serviços de cada uma e link para a página. */
export function SolutionCards({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const Heading = `h${headingLevel}` as "h2" | "h3";
  return (
    <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
      {solutions.map((solution) => (
        <li key={solution.slug} className="flex flex-col bg-coal p-7 sm:p-8">
          <Heading className="font-display text-2xl font-bold">
            <Link href={`/solucoes/${solution.slug}/`} className="hover:underline">
              {solution.name}
            </Link>
          </Heading>
          <p className="mt-3 leading-relaxed text-steel-dim">{solution.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {services
              .filter((service) => solution.serviceIds.includes(service.id))
              .map((service) => (
                <li
                  key={service.id}
                  className="rounded-full border border-white/15 px-3 py-1 text-sm text-steel"
                >
                  {service.title}
                </li>
              ))}
          </ul>
          <Link
            href={`/solucoes/${solution.slug}/`}
            className="mt-7 inline-flex items-center gap-2 self-start py-2 font-semibold hover:underline"
            aria-label={`Ver ${solution.name.toLowerCase()}`}
          >
            Ver solução
            <ArrowIcon className="size-4" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
