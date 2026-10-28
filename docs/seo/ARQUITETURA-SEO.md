# Arquitetura de informação e SEO

## Mapa de URLs publicado

| URL | Tipo | H1 | Schema | No sitemap |
| --- | --- | --- | --- | --- |
| `/` | Home | Soluções em aço inox sob medida, com mais de 30 anos de experiência | WebPage, FAQPage (+ LocalBusiness, WebSite no layout) | Sim |
| `/solucoes/` | Hub | Soluções em aço inox sob medida | CollectionPage, Service ×4 | Sim |
| `/solucoes/corrimaos-em-inox/` | Serviço | Corrimãos em aço inox sob medida | WebPage, Service, FAQPage, BreadcrumbList | Sim |
| `/solucoes/guarda-corpos-em-inox/` | Serviço | Guarda-corpos em aço inox sob medida | idem | Sim |
| `/solucoes/escadas-em-inox/` | Serviço | Escadas em inox e acabamentos para escadas helicoidais e curvas | idem | Sim |
| `/solucoes/projetos-sob-medida/` | Serviço | Móveis, peças e estruturas em aço inox sob medida | idem | Sim |
| `/empresas-e-orgaos-publicos/` | Setor | Soluções em aço inox para empresas, condomínios e órgãos públicos | WebPage, FAQPage | Sim |
| `/projetos/` | Portfólio | Projetos em aço inox realizados pela Abreu Inox | CollectionPage + ItemList | Sim |
| `/projetos/[slug]/` (25) | Projeto | Título do projeto | WebPage + CreativeWork com ImageObject | Sim, com imagens |
| `/sobre/` | Institucional | Mais de 30 anos de experiência em soluções em aço inox | AboutPage | Sim |
| `/orcamento/` | Conversão | Solicite um orçamento em aço inox | ContactPage | Sim |
| `/conteudos/` | Hub editorial | Conteúdos técnicos sobre aço inox | CollectionPage | Sim |
| `/conteudos/[slug]/` (4) | Artigo | Título do artigo | Article, FAQPage | Sim |
| `/llms.txt` | Resumo para IAs | — | — | Não (não é página) |

Total: 40 URLs indexáveis (antes: 1).

## Rotas propostas no briefing e não criadas (e por quê)

| Rota | Decisão |
| --- | --- |
| `/solucoes/solucoes-industriais`, `/solucoes/solucoes-corporativas` | Sem evidência de capacidade industrial. O público corporativo foi coberto por `/empresas-e-orgaos-publicos/` |
| `/solucoes/bancadas-em-inox` | Bancadas não aparecem nos serviços nem no portfólio |
| `/setores/*` | Três páginas finas seriam piores que uma página forte. Empresas e órgãos públicos foram unidos; arquitetos têm entrada própria na home e no formulário (`?perfil=arquitetura`). Desmembrar quando houver mais conteúdo |
| `/contato` | Contato é WhatsApp + Instagram: está em `/orcamento/`, no rodapé e no cabeçalho. Uma página só com isso seria duplicada |

## Canonicals e URLs

- Domínio canônico: `https://abreuinox.com`, sem www, com barra final (`trailingSlash: true`).
- Toda página declara canonical absoluto via `pageMetadata()` (`src/lib/seo.ts`).
- Redirects 308 em um salto: `www.abreuinox.com/*` e `site-abreu-inox.vercel.app/*` → `abreuinox.com/*`.
- Parâmetros (UTM, `?servico=`, `?perfil=`) não geram URLs novas: o canonical aponta para a URL limpa, e as páginas são estáticas.
- Slugs de projeto = `id` em `projects.json`. **Nunca altere um id publicado**; se precisar, adicione um redirect 308 em `next.config.ts`.

## Links internos

- Cabeçalho: Soluções, Projetos, Empresas e órgãos públicos, Sobre, Conteúdos, Orçamento.
- Rodapé: as 4 soluções, páginas institucionais e 2 artigos.
- Breadcrumbs visíveis em todas as páginas internas, com BreadcrumbList.
- Solução → projetos daquela categoria → página do projeto → solução (ciclo fechado).
- Artigo → solução relacionada; solução → artigos relacionados ("Leia também").
- Projeto → projetos semelhantes (mesma categoria).

## Como criar novas páginas sem quebrar o padrão

1. **Solução nova:** adicione um item em `src/data/solutions.ts`. A página, o sitemap, o rodapé, o schema `Service` e o `hasOfferCatalog` atualizam sozinhos. Pré-requisitos: serviço confirmado e fotos reais.
2. **Projeto novo:** siga `docs/portfolio.md`. A página `/projetos/[id]/` é criada no build.
3. **Artigo novo:** adicione um item em `src/data/articles.ts`, com datas reais e fontes.
4. Ao mudar texto institucional, atualize `site.contentUpdatedAt` (data do `lastmod` no sitemap).
5. Rode `npm run build`, depois `npx next start` e `npm run check:seo`.

## Oportunidades futuras

- Separar `/setores/orgaos-publicos/` quando houver obras públicas autorizadas para divulgação.
- Página "guarda-corpos para piscinas" se o volume de projetos de piscina crescer (hoje são 2).
- Campos editoriais nos projetos (setor, necessidade, solução, prazo) para virarem estudos de caso.
