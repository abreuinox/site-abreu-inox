type Props = {
  eyebrow: string;
  title: string;
  intro: React.ReactNode;
  children?: React.ReactNode;
};

/** Abertura das páginas internas: rótulo, H1 único, texto e ações. */
export function PageHero({ eyebrow, title, intro, children }: Props) {
  return (
    <header className="mx-auto max-w-6xl px-5 pt-8 pb-16 sm:px-8 sm:pb-20">
      <p className="text-xs font-semibold tracking-[0.22em] text-steel-dim uppercase">{eyebrow}</p>
      <h1 className="text-steel mt-5 max-w-4xl font-display text-4xl leading-[1.08] font-extrabold tracking-tight text-balance sm:text-5xl">
        {title}
      </h1>
      <div className="mt-6 max-w-3xl text-lg leading-relaxed text-steel">{intro}</div>
      {children ? (
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">{children}</div>
      ) : null}
    </header>
  );
}
