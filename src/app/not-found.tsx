import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto grid min-h-[60dvh] max-w-3xl place-items-center px-5 py-20 text-center">
      <div>
        <h1 className="font-display text-3xl font-bold">Página não encontrada</h1>
        <p className="mt-3 text-steel-dim">
          O endereço acessado não existe neste site. Veja as soluções em aço inox ou os projetos
          realizados.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" variant="primary">
            Voltar para o início
          </ButtonLink>
          <ButtonLink href="/solucoes/">Ver soluções</ButtonLink>
          <ButtonLink href="/projetos/">Ver projetos</ButtonLink>
        </div>
      </div>
    </div>
  );
}
