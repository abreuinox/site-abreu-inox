/** Data AAAA-MM-DD por extenso em português, sem depender do fuso do servidor. */
export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(Date.UTC(year, month - 1, day)),
  );
}
