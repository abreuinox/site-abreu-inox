import type { WhatsAppAudience } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

type Props = {
  children: React.ReactNode;
  audience?: WhatsAppAudience;
  variant?: "primary" | "outline";
  size?: "md" | "lg";
  className?: string;
  /** Onde o botão está na página, para a medição de cliques (data-cta). */
  cta?: string;
};

const variants = {
  primary: "surface-steel shadow-[0_10px_40px_-12px_rgb(255_255_255/0.35)]",
  outline:
    "border border-white/25 text-paper hover:border-white/60 hover:bg-white/5",
};

const sizes = {
  md: "min-h-11 px-4 py-2.5 text-sm sm:px-5",
  lg: "px-7 py-4 text-base",
};

export const buttonStyles = { variants, sizes };

/** Botão de orçamento: sempre abre o WhatsApp comercial com a mensagem do perfil. */
export function WhatsAppButton({
  children,
  audience = "default",
  variant = "primary",
  size = "lg",
  className = "",
  cta,
}: Props) {
  return (
    <a
      href={whatsappUrl(audience)}
      target="_blank"
      rel="noopener noreferrer"
      data-cta={cta}
      className={`inline-flex items-center justify-center gap-2.5 rounded-full text-center font-semibold transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
    >
      <WhatsAppIcon className="size-5 shrink-0" />
      {children}
    </a>
  );
}
