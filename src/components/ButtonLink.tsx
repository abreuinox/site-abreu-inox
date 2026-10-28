import Link from "next/link";
import { ArrowIcon } from "./icons";
import { buttonStyles } from "./WhatsAppButton";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
};

/** Link interno com o mesmo visual dos botões de orçamento. */
export function ButtonLink({ href, children, variant = "outline", className = "" }: Props) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full text-center font-semibold transition-colors ${buttonStyles.variants[variant]} ${buttonStyles.sizes.lg} ${className}`}
    >
      {children}
      <ArrowIcon className="size-4 shrink-0" />
    </Link>
  );
}
