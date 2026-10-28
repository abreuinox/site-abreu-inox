# Relatório de implementação: SEO, GEO/AEO e conversão

Data: 27/10/2026.

## Resumo

O site deixou de ser uma página única focada em corrimão e virou um site
institucional com 40 URLs indexáveis. Todas são estáticas e têm:
- metadata própria e canonical absoluto;
- breadcrumbs;
- JSON-LD ligado a uma entidade única da empresa;
- links internos entre soluções, projetos e conteúdos.

Também foram criados um fluxo de orçamento estruturado (WhatsApp) e a
estrutura de medição (GA4 e Google Ads, ativados por variável de ambiente).

## Entregas por fase

### P0: crítico
- [x] Domínio validado: sem loop, HTTPS e HSTS OK, `www` → apex em 308.
- [x] Conteúdo desatualizado em produção ("15 anos") corrigido pelo deploy do commit pendente.
- [x] `site-abreu-inox.vercel.app` → 308 para `abreuinox.com` (previews preservados).
- [x] Redirects em um único salto, preservando o caminho e a query (UTM).
- [x] Canonical absoluto em todas as páginas; sitemap só com URLs canônicas e `lastmod` real.
- [x] `robots.txt` liberando buscadores e rastreadores de IA de busca.
- [x] 404 real (status 404, `noindex`, links de retorno).

### P1: crescimento
- [x] Homepage reestruturada:
  - hero institucional;
  - soluções;
  - portfólio;
  - "Quem atendemos";
  - experiência e processo;
  - área de atendimento;
  - FAQ;
  - CTA.
- [x] `/sobre/`, `/solucoes/` + 4 páginas de solução, `/empresas-e-orgaos-publicos/`.
- [x] `/projetos/` + 25 páginas de projeto com todas as fotos no HTML.
- [x] Grafo JSON-LD: LocalBusiness, WebSite, WebPage, Service, BreadcrumbList, FAQPage, Article, CreativeWork/ImageObject, ItemList.
- [x] `/orcamento/` com briefing validado → WhatsApp; CTAs específicos por página e mensagens de WhatsApp por serviço.
- [x] Medição: eventos e carregamento condicional de GA4/Ads.

### P2: expansão
- [x] 4 artigos técnicos com fontes e datas reais.
- [x] `/llms.txt` gerado a partir dos dados do site.
- [ ] Estudos de caso (dependem de dados do proprietário).
- [ ] Citações externas e GBP (dependem de acesso).

## Arquivos

**Novos:**

| Tipo | Arquivos |
| --- | --- |
| Rotas | `src/app/{sobre,solucoes,solucoes/[slug],empresas-e-orgaos-publicos,projetos,projetos/[slug],conteudos,conteudos/[slug],orcamento,llms.txt}/` |
| Dados | `src/data/{solutions,articles,faq}.ts`, `src/config/navigation.ts` |
| Bibliotecas | `src/lib/{seo,analytics,format,project-images}.ts` |
| Componentes | `Analytics`, `Audiences`, `Breadcrumbs`, `ButtonLink`, `FaqList`, `JsonLd`, `PageHero`, `ProjectCards`, `QuoteForm`, `SolutionCards`, `TrackView` |
| Testes | `scripts/check-seo.mjs` (`npm run check:seo`) |
| Documentação | `docs/seo/*.md` |

**Alterados:**
- configuração: `next.config.ts` (redirects), `src/config/site.ts`, `.env.example`;
- app: `src/app/{layout,page,sitemap,robots,manifest,not-found}.tsx|ts`;
- dados estruturados: `src/lib/structured-data.ts`;
- componentes: Header, Footer, MobileMenu, Hero, Services, Experience, Business, Portfolio, ProjectGallery, FinalCta, WhatsAppButton, FloatingWhatsApp, ServiceArea, GoogleTag;
- conteúdo: `projects.json`/`services.ts` (grafia "guarda-corpo").

**Movido:** `src/app/opengraph-image.jpg` → `public/images/brand/abreu-inox-og.jpg`.

### Integração com o trabalho do Google Ads

Durante esta execução, outra sessão adicionou ao repositório:
- `src/lib/ads.ts`;
- `src/components/GoogleTag.tsx`;
- um componente `WhatsAppAnchor`, aplicado em 2 links.

Para não haver duas tags `gtag.js` nem cliques medidos em dobro:
- `lib/ads.ts` e `trackWhatsAppLead()` foram **mantidos**;
- a conversão do Ads agora é disparada pelo listener central (`Analytics.tsx`), o que cobre **todos** os links de WhatsApp do site, e não só 2;
- `GoogleTag.tsx` carrega `gtag.js` uma única vez e configura Ads e GA4;
- `WhatsAppAnchor` foi removido (substituído pelo listener).

## Taxonomia de eventos

| Evento | Quando dispara | Parâmetros | Observação |
| --- | --- | --- | --- |
| `click_whatsapp` | Clique em qualquer link `wa.me` | `page_path`, `cta_location` (hero, header, menu, flutuante, solucao-hero, galeria…), `link_text` | Intenção de contato, não lead confirmado |
| `generate_lead` + `conversion` (Ads) | Mesmo clique (`lib/ads.ts`) | `method: whatsapp` | Comportamento do trabalho de Ads. **Atenção:** é um clique, não um lead confirmado. Recomenda-se marcar como evento-chave no GA4 só `submit_quote` e tratar `generate_lead` como "lead provável" |
| `submit_quote` | Formulário validado, WhatsApp aberto com o briefing | `client_type`, `service`, `deadline`, `has_attachments` | Melhor sinal de lead qualificado disponível sem backend |
| `click_phone` | Clique em link `tel:` | `cta_location` | Hoje não há links `tel:` (contato é WhatsApp) |
| `view_service` | Página de solução aberta | `service` | — |
| `view_project` | Página de projeto aberta | `project`, `category` | — |
| `file_upload_quote` | **Não implementado** | — | Os anexos vão pela conversa do WhatsApp; o site não recebe arquivos |

Nenhum dado pessoal (nome, telefone, e-mail, texto) é enviado aos eventos.
A conclusão real do lead (mensagem enviada e orçamento emitido) só pode ser
medida no WhatsApp/CRM. Sugestão: anotar na planilha comercial a origem
"site" de cada contato.

## Painel de acompanhamento (especificação)

| Métrica | Fonte | Recorte |
| --- | --- | --- |
| Páginas indexadas | Search Console > Páginas | Total e por diretório (`/solucoes/`, `/projetos/`, `/conteudos/`) |
| Impressões, cliques, CTR, posição | Search Console > Desempenho | Consultas de marca (contém "abreu") × sem marca; por página |
| Sessões orgânicas | GA4 (Aquisição > canal "Organic Search") | Por página de destino |
| Referências de IA | GA4 (origem `chatgpt.com`, `gemini.google.com`, `perplexity.ai`, `copilot.microsoft.com`) | Só o que tiver referrer |
| Cliques de WhatsApp | GA4 `click_whatsapp` | Por `cta_location` e página |
| Briefings enviados | GA4 `submit_quote` | Por `service` e `client_type` |
| Leads qualificados, propostas, contratos | Planilha/CRM comercial | Origem = site |
| Conversão por landing page | GA4 (exploração: página de destino × `submit_quote`) | Mensal |

## Testes executados (27/10/2026, build local de produção)

| Teste | Resultado |
| --- | --- |
| `npm run build` (inclui `check:projects` e TypeScript) | OK: 48 rotas estáticas |
| `npm run typecheck` | OK |
| `npm run check:seo` em `http://localhost:3123` | OK: 40 URLs, 107 links/imagens internos, 0 erros; 1 aviso (title de 1 projeto com 74 caracteres) |
| Redirects por host (www e vercel.app) | 308 em 1 salto, preservando caminho e query |
| 404 | Status 404 |
| `llms.txt` | 200, `text/markdown` |
| Capturas de tela (Chrome headless, 500 px e 1366 px) | Layout sem rolagem horizontal; tabela do artigo rola dentro do contêiner |

Resultados em produção: ver `CHECKLIST-PUBLICACAO.md` e a seção abaixo, atualizada após o deploy.

## Validação em produção

Deploy `c76fc2d` publicado na Vercel em 27/10/2026 (push para `main`).

| Teste em https://abreuinox.com | Resultado |
| --- | --- |
| `npm run check:seo -- https://abreuinox.com` | OK: 40 URLs, 107 links/imagens internos, 0 erros |
| Texto "30 anos de experiência" na home | Presente ("15 anos" não aparece mais) |
| `https://www.abreuinox.com/sobre/` | 308 → `https://abreuinox.com/sobre/` (1 salto) |
| `http://abreuinox.com/projetos/` | 308 → `https://abreuinox.com/projetos/` (1 salto) |
| `http://www.abreuinox.com/` | 2 saltos (HTTPS da Vercel → apex), sem ciclo |
| `https://site-abreu-inox.vercel.app/solucoes/` | 308 → `https://abreuinox.com/solucoes/` (1 salto) |
| `/llms.txt` | 200 |

Publicado **não** significa indexado: o próximo passo é verificar o Search
Console e enviar o sitemap.

## Pendências e próximos passos

Ver a tabela "Tarefas que exigem acesso externo" em `CHECKLIST-PUBLICACAO.md`.
Principais:
1. Confirmar os "30 anos".
2. Registrar `abreuinox.com.br`.
3. Search Console + sitemap.
4. GBP.
5. GA4.
6. Revisão técnica dos artigos.
