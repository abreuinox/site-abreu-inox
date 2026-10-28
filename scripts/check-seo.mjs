// Verifica o SEO técnico de um site no ar, a partir do sitemap.
// Uso: node scripts/check-seo.mjs [base]   (padrão: http://localhost:3000)
// Em produção: node scripts/check-seo.mjs https://abreuinox.com
const CANONICAL = "https://abreuinox.com";
const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const errors = [];
const warnings = [];
const toBase = (url) => url.replace(CANONICAL, base);

async function get(url, options = {}) {
  const response = await fetch(url, { redirect: "manual", ...options });
  return { status: response.status, location: response.headers.get("location"), headers: response.headers, text: await response.text() };
}

function decode(text) {
  return text
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

const sitemap = await get(`${base}/sitemap.xml`);
if (sitemap.status !== 200) {
  console.error(`sitemap.xml respondeu ${sitemap.status}`);
  process.exit(1);
}
const urls = [...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urls.some((url) => !url.startsWith(`${CANONICAL}/`))) errors.push("sitemap com URL fora do domínio canônico");

const robots = await get(`${base}/robots.txt`);
if (robots.status !== 200) errors.push(`robots.txt respondeu ${robots.status}`);
if (/Disallow:\s*\/\s*$/m.test(robots.text)) errors.push("robots.txt bloqueia o site inteiro");
if (!robots.text.includes(`${CANONICAL}/sitemap.xml`)) errors.push("robots.txt sem o sitemap");

const titles = new Map();
const descriptions = new Map();
const internalLinks = new Set();

for (const url of urls) {
  const page = await get(toBase(url));
  const where = url.replace(CANONICAL, "");
  if (page.status !== 200) {
    errors.push(`${where}: status ${page.status}`);
    continue;
  }
  const html = page.text;
  const h1s = html.match(/<h1[\s>]/g) ?? [];
  if (h1s.length !== 1) errors.push(`${where}: ${h1s.length} H1`);
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
  const description = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  if (!title) errors.push(`${where}: sem title`);
  if (title.length > 70) warnings.push(`${where}: title com ${title.length} caracteres (pode truncar)`);
  if (!description) errors.push(`${where}: sem meta description`);
  if (description.length > 170) warnings.push(`${where}: description com ${description.length} caracteres`);
  if (canonical !== url) errors.push(`${where}: canonical ${canonical} difere de ${url}`);
  if (/<meta name="robots" content="[^"]*noindex/.test(html)) errors.push(`${where}: noindex`);
  if (page.headers.get("x-robots-tag")?.includes("noindex")) errors.push(`${where}: X-Robots-Tag noindex`);
  if (!/<html lang="pt-BR"/.test(html)) errors.push(`${where}: sem lang pt-BR`);
  if (!/<meta property="og:image" content="https:\/\//.test(html)) errors.push(`${where}: sem og:image absoluta`);
  for (const [map, value] of [[titles, title], [descriptions, description]]) {
    map.set(value, [...(map.get(value) ?? []), where]);
  }
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(json);
      for (const node of data["@graph"] ?? [data]) {
        if (!node["@type"]) errors.push(`${where}: nó JSON-LD sem @type`);
      }
    } catch {
      errors.push(`${where}: JSON-LD inválido`);
    }
  }
  for (const [, href] of html.matchAll(/<a[^>]+href="(\/[^"#]*)/g)) internalLinks.add(decode(href).split("?")[0]);
  for (const [, src] of html.matchAll(/<img[^>]+src="(\/[^"]+)"/g)) internalLinks.add(decode(src));
}

for (const [map, label] of [[titles, "title"], [descriptions, "description"]]) {
  for (const [value, pages] of map) {
    if (value && pages.length > 1) errors.push(`${label} duplicado em ${pages.join(", ")}`);
  }
}

for (const link of internalLinks) {
  const response = await get(`${base}${link}`, { method: "HEAD" });
  if (response.status !== 200) errors.push(`link interno ${link}: status ${response.status}${response.location ? ` -> ${response.location}` : ""}`);
}

const missing = await get(`${base}/pagina-que-nao-existe/`);
if (missing.status !== 404) errors.push(`página inexistente respondeu ${missing.status}, esperado 404`);

console.log(`${urls.length} URLs do sitemap e ${internalLinks.size} links/imagens internos verificados em ${base}.`);
for (const warning of warnings) console.warn(`aviso: ${warning}`);
if (errors.length) {
  console.error(`\n${errors.length} problema(s):\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log("SEO técnico OK.");
