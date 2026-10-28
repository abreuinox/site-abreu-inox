import type { FaqItem } from "@/data/solutions";

/** Perguntas frequentes sempre visíveis no HTML (sem acordeão). */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
      {items.map((item) => (
        <div key={item.question} className="bg-coal p-7">
          <dt className="font-display text-lg leading-snug font-bold">{item.question}</dt>
          <dd className="mt-3 leading-relaxed text-steel-dim">{item.answer}</dd>
        </div>
      ))}
    </dl>
  );
}
