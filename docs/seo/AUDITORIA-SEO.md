# Auditoria de SEO técnico: abreuinox.com

Data da auditoria: 27/10/2026. Método: inspeção do repositório, requisições HTTP
a produção (`curl`), WHOIS/RDAP, Wayback Machine e buscas públicas. Nada aqui é
estimativa de ferramenta paga; onde não houve acesso, está indicado.

## 1. Stack identificada

| Item | Situação encontrada |
| --- | --- |
| Framework | Next.js 16.4.3 (App Router, Turbopack), React 19, Tailwind CSS 4 |
| Renderização | 100% estática (SSG): todo o conteúdo está no HTML inicial |
| Rotas antes da revisão | Apenas `/` (página única com âncoras) |
| Metadata | Metadata API nativa no `layout.tsx` |
| Sitemap / robots | `app/sitemap.ts` (1 URL, `lastmod` = hora do build) e `app/robots.ts` |
| Dados estruturados | `LocalBusiness` + `WebSite` no layout |
| Middleware / proxy | Não existe |
| `vercel.json` | Só `framework: nextjs` |
| Redirects | `www.abreuinox.com` → `abreuinox.com` em `next.config.ts` |
| Analytics | Nenhum instalado. Outra sessão de trabalho adicionou, em paralelo, uma tag do Google Ads condicionada a variável de ambiente |
| Deploy | Vercel, via integração com o GitHub (`abreuinox/site-abreu-inox`) |

## 2. Disponibilidade e redirecionamentos (P0)

Testado em 27/10/2026, 21h (BRT):

| URL | Resultado |
| --- | --- |
| `https://abreuinox.com/` | 200, HTTPS válido, HSTS ativo |
| `https://www.abreuinox.com/` | 308 → `https://abreuinox.com/` → 200 |
| `http://abreuinox.com/` | 308 → `https://abreuinox.com/` → 200 |
| `http://www.abreuinox.com/` | 308 → `https://www.abreuinox.com/` → 308 → `https://abreuinox.com/` → 200 |
| `https://site-abreu-inox.vercel.app/` | **200 (conteúdo duplicado)**, canonical apontando para abreuinox.com |

**Conclusão:** o `ERR_TOO_MANY_REDIRECTS` **não ocorre mais**. Nenhuma cadeia tem
ciclo. A URL canônica escolhida é `https://abreuinox.com/` (com barra final,
pois o projeto usa `trailingSlash: true`).

## 3. Problemas encontrados

| # | Severidade | Problema | Evidência | Correção |
| --- | --- | --- | --- | --- |
| 1 | **Crítica** | Produção desatualizada: o site publicado dizia "Mais de 15 anos" enquanto o código dizia 30 | HTML de produção; `main` estava 1 commit à frente de `origin/main` | Publicado junto com esta entrega (push para `main`) |
| 2 | Alta | Site com uma única URL indexável: nenhuma página para serviços, projetos, empresa ou orçamento | `sitemap.xml` com 1 URL | 39 novas URLs com conteúdo próprio (ver ARQUITETURA-SEO.md) |
| 3 | Alta | Posicionamento restrito a corrimão/guarda-corpo no title e no H1 | `<title>Corrimão e Guarda Corpo de Inox em Brasília` | Title, H1 e descrição institucionais; corrimão ganhou página própria |
| 4 | Média | `site-abreu-inox.vercel.app` servia o site completo com status 200 | `curl` | Redirect 308 em `next.config.ts`, só para esse host (previews intactos) |
| 5 | Média | `lastmod` do sitemap mudava a cada build sem mudança de conteúdo | `app/sitemap.ts` usava `new Date()` | Datas de conteúdo reais (`site.contentUpdatedAt` e datas dos artigos) |
| 6 | Média | Navegação só por âncoras `#`: nenhum link interno para outras URLs | `Header.tsx` | Menu, rodapé, breadcrumbs e links contextuais para páginas reais |
| 7 | Média | Projetos do portfólio só acessíveis por botões (modal), sem URL | `ProjectGallery.tsx` | Cada card é um link `<a href>` para `/projetos/[slug]/`; o clique simples continua abrindo a visualização rápida |
| 8 | Média | 16 dos 25 projetos só apareciam após clicar em "Ver todos" | Grade paginada em 9 | `/projetos/` renderiza todos no HTML; sitemap lista todos |
| 9 | Baixa | Imagem OG definida por arquivo (`app/opengraph-image.jpg`), que tem prioridade sobre a metadata e impediria imagens por página | Docs do Next 16 | Movida para `public/images/brand/abreu-inox-og.jpg`, controlada por `pageMetadata()` |
| 10 | Baixa | Grafia "guarda corpo" sem hífen em todo o site | Conteúdo | Padronizado "guarda-corpo(s)" |
| 11 | Baixa | Nenhuma medição de conversão | Código | `Analytics.tsx` + `GoogleTag.tsx` (ativados por variável de ambiente) |
| 12 | Baixa | 404 sem navegação de retorno útil e sem `noindex` explícito | `not-found.tsx` | 404 com links para soluções e projetos e `robots: noindex` (status HTTP 404 confirmado) |
| 13 | Informativa | Classe `.text-steel` (gradiente) colide com o utilitário Tailwind `text-steel` (cor), e o utilitário vence: o efeito de "aço escovado" dos títulos não aparece | `globals.css` | Não alterado (é a aparência atual aprovada); registrar caso queiram o gradiente |

## 4. Itens verificados sem problema

- `lang="pt-BR"`, viewport e `theme-color` corretos.
- HTTPS e HSTS ativos; `X-Content-Type-Options`, `X-Frame-Options` e `Referrer-Policy` presentes.
- `robots.txt` libera todos os rastreadores, inclusive Googlebot, Bingbot e OAI-SearchBot (regra `User-Agent: *`).
- Nenhum `noindex` indevido. Nenhum `X-Robots-Tag` bloqueando.
- Imagens servidas por `next/image` (AVIF/WebP responsivos), com `alt` específico em todas as fotos do portfólio.
- Imagem do hero com `priority` (sem lazy loading no LCP).

## 5. Domínio histórico

`abreuinox.com.br` pertence à mesma empresa (mesmo WhatsApp), **está sem
registro** e ainda aparece no índice de buscadores. Detalhes e plano em
`PLANO-MIGRACAO-DOMINIO.md`.

## 6. O que não pôde ser auditado

- Google Search Console, Bing Webmaster Tools, GA4: sem acesso (não configurados).
- Perfil da Empresa no Google: não localizado em buscas públicas, e não há acesso à conta.
- Firewall/Bot Protection da Vercel: sem acesso ao painel. Os testes com `curl` não encontraram bloqueio.
- Core Web Vitals de campo (CrUX): o domínio é novo e ainda não tem dados de usuários reais.
