import Image from "next/image";
import { site } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { MobileMenu } from "./MobileMenu";
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
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-8">
        <a
          href="#topo"
          className="flex shrink-0 items-center gap-2.5 sm:gap-3"
          aria-label={`${site.shortName}, início`}
        >
          <Image
            src="/images/brand/abreu-inox-logo.jpg"
            alt=""
            width={40}
            height={40}
            priority
            className="size-10 rounded-full"
          />
          <span className="hidden font-display text-sm font-bold tracking-[0.14em] whitespace-nowrap min-[375px]:inline sm:text-base sm:tracking-[0.18em]">
            {site.name}
          </span>
        </a>
        <nav aria-label="Seções do site" className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-3 text-sm text-steel-dim transition-colors hover:text-paper"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <WhatsAppButton size="md" className="whitespace-nowrap">
            <span className="hidden sm:inline">Pedir orçamento</span>
            <span className="sm:hidden">Orçamento</span>
          </WhatsAppButton>
          <MobileMenu
            links={links}
            quoteUrl={whatsappUrl()}
            instagramUrl={site.instagram.url}
            instagramHandle={site.instagram.handle}
          />
        </div>
      </div>
    </header>
  );
}
