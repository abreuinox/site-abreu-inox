import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-5 text-center">
      <div>
        <h1 className="font-display text-3xl font-bold">Página não encontrada</h1>
        <p className="mt-3 text-steel-dim">O endereço acessado não existe neste site.</p>
        <Link
          href="/"
          className="surface-steel mt-8 inline-flex rounded-full px-6 py-3 text-sm font-semibold"
        >
          Voltar para o início
        </Link>
      </div>
    </main>
  );
}
