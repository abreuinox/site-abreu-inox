import Image from "next/image";
import { site } from "@/config/site";
import { WhatsAppButton } from "./WhatsAppButton";

const links = [
  { href: "#servicos", label: "Serviços" },
  { href: "#projetos", label: "Projetos" },
  { href: "#empresas", label: "Empresas" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#atendimento", label: "Atendimento" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#topo" className="flex items-center gap-3" aria-label={`${site.shortName}, início`}>
          <Image
            src="/images/brand/abreu-inox-logo.jpg"
            alt=""
            width={40}
            height={40}
            priority
            className="size-10 rounded-full"
          />
          <span className="font-display text-base font-bold tracking-[0.18em]">
            {site.name}
          </span>
        </a>
        <nav aria-label="Seções do site" className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-steel-dim transition-colors hover:text-paper"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <WhatsAppButton size="md">
          <span className="hidden sm:inline">Pedir orçamento</span>
          <span className="sm:hidden">Orçamento</span>
        </WhatsAppButton>
      </div>
    </header>
  );
}
