import Image from "next/image";
import { site } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { InstagramIcon, WhatsAppIcon } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-line bg-coal">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/brand/abreu-inox-logo.jpg"
              alt=""
              width={48}
              height={48}
              className="size-12 rounded-full"
            />
            <span className="font-display text-lg font-bold tracking-[0.18em]">{site.name}</span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-steel-dim">
            Soluções em aço inox para cada projeto. {site.experience}.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-steel-dim uppercase">
            Contato
          </p>
          <ul className="mt-2 text-sm">
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
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
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-steel-dim uppercase">
            Atendimento
          </p>
          <p className="mt-4 text-sm leading-relaxed">
            {site.serviceArea.label}, {site.serviceArea.note}.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-steel-dim">
            Base operacional: {site.base.label}.
          </p>
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
