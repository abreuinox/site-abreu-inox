import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { navLinks } from "@/config/navigation";
import { MobileMenu } from "./MobileMenu";
import { WhatsAppButton } from "./WhatsAppButton";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/85 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 sm:gap-3"
          aria-label={`${site.shortName}, página inicial`}
        >
          <Image
            src={site.logo}
            alt=""
            width={40}
            height={40}
            priority
            className="size-10 rounded-full"
          />
          <span className="hidden font-display text-sm font-bold tracking-[0.14em] whitespace-nowrap min-[375px]:inline sm:text-base sm:tracking-[0.18em]">
            {site.name}
          </span>
        </Link>
        <nav aria-label="Principal" className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-3 text-sm text-steel-dim transition-colors hover:text-paper"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <WhatsAppButton size="md" className="whitespace-nowrap" cta="header">
            <span className="hidden sm:inline">Pedir orçamento</span>
            <span className="sm:hidden">Orçamento</span>
          </WhatsAppButton>
          <MobileMenu
            links={navLinks}
            instagramUrl={site.instagram.url}
            instagramHandle={site.instagram.handle}
          />
        </div>
      </div>
    </header>
  );
}
