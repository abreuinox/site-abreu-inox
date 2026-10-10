type Props = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

/** Moldura padrão das seções: rótulo, H2 e texto de abertura. */
export function Section({ id, eyebrow, title, intro, children, className = "" }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className={`border-t border-line ${className}`}>
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="text-xs font-semibold tracking-[0.22em] text-steel-dim uppercase">
          {eyebrow}
        </p>
        <h2
          id={`${id}-titulo`}
          className="mt-4 max-w-3xl font-display text-3xl leading-tight font-bold tracking-tight text-balance sm:text-5xl"
        >
          {title}
        </h2>
        {intro ? (
          <div className="mt-6 max-w-2xl text-lg leading-relaxed text-steel">{intro}</div>
        ) : null}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
