import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { articles } from "@/data/articles";
import { solutions } from "@/data/solutions";
import { whatsappUrl } from "@/lib/whatsapp";
import { InstagramIcon, WhatsAppIcon } from "./icons";

const institutional = [
  { href: "/sobre/", label: "Sobre a Abreu Inox" },
  { href: "/projetos/", label: "Projetos realizados" },
  { href: "/empresas-e-orgaos-publicos/", label: "Empresas e órgãos públicos" },
  { href: "/conteudos/", label: "Conteúdos técnicos" },
  { href: "/orcamento/", label: "Solicitar orçamento" },
];

const headingClass = "text-xs font-semibold tracking-[0.18em] text-steel-dim uppercase";
const linkClass = "inline-flex min-h-11 items-center hover:underline";

export function Footer() {
  return (
    <footer className="border-t border-line bg-coal">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image src={site.logo} alt="" width={48} height={48} className="size-12 rounded-full" />
            <span className="font-display text-lg font-bold tracking-[0.18em]">{site.name}</span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-steel-dim">
            Soluções em aço inox sob medida. {site.experience}.
          </p>
          <p className="mt-4 text-sm leading-relaxed">
            Atendimento: {site.serviceArea.label}, {site.serviceArea.note}.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-steel-dim">
            Base operacional: {site.base.label}.
          </p>
        </div>
        <nav aria-label="Soluções">
          <p className={headingClass}>Soluções</p>
          <ul className="mt-2 text-sm">
            {solutions.map((solution) => (
              <li key={solution.slug}>
                <Link href={`/solucoes/${solution.slug}/`} className={linkClass}>
                  {solution.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Institucional">
          <p className={headingClass}>Institucional</p>
          <ul className="mt-2 text-sm">
            {institutional.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className={`${headingClass} mt-6`}>Conteúdos</p>
          <ul className="mt-2 text-sm">
            {articles.slice(0, 2).map((article) => (
              <li key={article.slug}>
                <Link href={`/conteudos/${article.slug}/`} className={`${linkClass} py-2`}>
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className={headingClass}>Contato</p>
          <ul className="mt-2 text-sm">
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="footer"
                className="inline-flex min-h-11 items-center gap-2.5 hover:underline"
              >
                <WhatsAppIcon className="size-4" />
                WhatsApp {site.whatsapp.display}
              </a>
            </li>
            <li>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2.5 hover:underline"
              >
                <InstagramIcon className="size-4" />
                Instagram {site.instagram.handle}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl py-6 pr-24 pl-5 text-xs text-steel-dim sm:px-8">
          © {new Date().getFullYear()} {site.shortName}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
