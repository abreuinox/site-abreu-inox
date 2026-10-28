# Checklist de publicação e validação

## A cada deploy (automatizável)

```bash
npm run build                          # valida projetos + TypeScript + gera 48 páginas
npm run typecheck
npx next start -p 3123 &               # servidor local de produção
npm run check:seo -- http://localhost:3123
npm run check:seo -- https://abreuinox.com    # depois do deploy
```

`check:seo` verifica, para cada URL do sitemap:
- status 200;
- H1 único;
- title e description presentes e únicos;
- canonical igual à URL;
- ausência de `noindex`;
- `lang="pt-BR"`;
- `og:image` absoluta;
- JSON-LD válido;
- links e imagens internos sem erro;
- 404 real;
- `robots.txt` com o sitemap.

## Testes manuais após o deploy

- [ ] `https://abreuinox.com/` abre e mostra "Mais de 30 anos".
- [ ] `https://www.abreuinox.com/sobre/` → 308 → `https://abreuinox.com/sobre/`.
- [ ] `https://site-abreu-inox.vercel.app/` → 308 → `https://abreuinox.com/`.
- [ ] No celular: menu abre e fecha; botões de WhatsApp abrem o app com a mensagem certa.
- [ ] `/orcamento/`: enviar o formulário vazio mostra os erros; preenchido, abre o WhatsApp com o briefing.
- [ ] `/orcamento/?servico=Corrim%C3%A3o%20em%20inox` chega com o serviço selecionado.
- [ ] Galeria: clique simples abre a visualização rápida; Ctrl/Cmd+clique abre a página do projeto.
- [ ] Vídeo do projeto "escada helicoidal" reproduz.
- [ ] Navegação por teclado: Tab mostra "Pular para o conteúdo"; foco visível; Esc fecha menu e galeria.
- [ ] [Rich Results Test](https://search.google.com/test/rich-results) em `/`, `/solucoes/corrimaos-em-inox/` e `/conteudos/aco-inox-304-ou-316/`.
- [ ] [Schema Markup Validator](https://validator.schema.org/) nas mesmas URLs.
- [ ] [PageSpeed Insights](https://pagespeed.web.dev/) mobile em `/` e em uma página de projeto.

### Sobre os dados estruturados

| Tipo | Válido no schema.org | Gera resultado enriquecido no Google? |
| --- | --- | --- |
| LocalBusiness, WebSite, WebPage | Sim | Não diretamente: ajuda a entender a entidade |
| BreadcrumbList | Sim | **Sim** (trilha no resultado) |
| Article | Sim | Elegível para melhorias de artigo |
| FAQPage | Sim | **Não**: desde 2023 o Google só exibe FAQ de sites governamentais e de saúde. Mantido para compreensão semântica |
| Service, CreativeWork, ImageObject | Sim | Não |

Não há `aggregateRating`/`Review` (seria autodeclarado e violaria as diretrizes).

## Tarefas que exigem acesso externo (proprietário)

| # | Tarefa | Onde | Prioridade |
| --- | --- | --- | --- |
| 1 | Confirmar a origem dos "30 anos" e alinhar o Instagram | Proprietário | P0 |
| 2 | Registrar `abreuinox.com.br` e redirecionar | Registro.br + Vercel | P0 |
| 3 | Verificar o Search Console (propriedade de domínio, DNS TXT na GoDaddy) e enviar `https://abreuinox.com/sitemap.xml` | search.google.com/search-console | P0 |
| 4 | Bing Webmaster Tools: importar do Search Console | bing.com/webmasters | P1 |
| 5 | Conferir na Vercel que *Firewall > Bot Protection / AI bots* não bloqueia buscadores | Vercel | P1 |
| 6 | Criar/reivindicar o Perfil da Empresa no Google (ver `PLANO-SEO-LOCAL.md`) | business.google.com | P1 |
| 7 | Criar a propriedade GA4 e definir `NEXT_PUBLIC_GA_ID` na Vercel | analytics.google.com + Vercel | P1 |
| 8 | Se for anunciar: `NEXT_PUBLIC_GOOGLE_ADS_ID` e `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` | Google Ads + Vercel | P2 |
| 9 | Revisar tecnicamente os 4 artigos (normas e recomendações de liga) | Proprietário/responsável técnico | P1 |
| 10 | Decidir se o repositório GitHub continua público | GitHub | P2 |
| 11 | Informar horário, cidades de GO e se há ponto de atendimento | Proprietário | P1 |

Depois de definir variáveis de ambiente na Vercel, é preciso **um novo deploy**
(variáveis `NEXT_PUBLIC_*` entram no build).

## Publicação ≠ indexação

- **Publicado:** a Vercel serve a página.
- **Rastreado:** o Googlebot buscou a página (Search Console > Inspeção de URL).
- **Indexado:** a página aparece no índice (Search Console > Páginas).
- **Classificado:** a página aparece para consultas (Search Console > Desempenho).
- **Convertido:** o visitante pediu orçamento (GA4: `submit_quote` e `click_whatsapp`).

Nenhuma dessas etapas pode ser dada como certa só porque a anterior aconteceu.
