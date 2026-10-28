"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseIcon, InstagramIcon, MenuIcon, WhatsAppIcon } from "./icons";
import { whatsappUrl } from "@/lib/whatsapp";

type Props = {
  links: { href: string; label: string }[];
  instagramUrl: string;
  instagramHandle: string;
};

/** Menu das seções para telas menores, onde a navegação do topo não cabe. */
export function MobileMenu({ links, instagramUrl, instagramHandle }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Fecha o menu ao trocar de página.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="menu-mobile"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        className="grid size-11 place-items-center rounded-full border border-white/20"
      >
        {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
      </button>
      {open ? (
        <div
          id="menu-mobile"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-ink px-5 pt-2 pb-6 sm:px-8"
        >
          <nav aria-label="Principal">
            <ul>
              {links.map((link) => (
                <li key={link.href} className="border-b border-line">
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className="block py-4 font-display text-lg font-semibold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="menu"
            className="surface-steel mt-6 flex items-center justify-center gap-2.5 rounded-full px-6 py-4 font-semibold"
          >
            <WhatsAppIcon className="size-5" />
            Solicitar orçamento
          </a>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2.5 rounded-full border border-white/25 px-6 py-4 font-semibold"
          >
            <InstagramIcon className="size-5" />
            Instagram {instagramHandle}
          </a>
        </div>
      ) : null}
    </div>
  );
}
