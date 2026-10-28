import Link from "next/link";
import { breadcrumbNode, type Crumb, graph } from "@/lib/structured-data";
import { JsonLd } from "./JsonLd";

/** Trilha de navegação visível, com o BreadcrumbList correspondente. */
export function Breadcrumbs({ path, items }: { path: string; items: Crumb[] }) {
  const crumbs = [{ name: "Início", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Você está em" className="mx-auto max-w-6xl px-5 pt-8 sm:px-8">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-steel-dim">
          {crumbs.map((crumb, index) => {
            const last = index === crumbs.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-steel">
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link href={crumb.path} className="hover:text-paper hover:underline">
                      {crumb.name}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={graph(breadcrumbNode(path, crumbs))} />
    </>
  );
}
