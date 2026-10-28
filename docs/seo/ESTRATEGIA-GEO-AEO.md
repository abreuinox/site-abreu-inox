# Estratégia GEO/AEO: descoberta por buscadores com IA

Objetivo: fazer com que Google (incluindo AI Overviews), Bing/Copilot,
ChatGPT Search e Gemini **entendam sem ambiguidade** quem é a Abreu Inox, o
que faz, onde atende e como contratar. **Não há garantia de inclusão em
respostas de IA**, e ninguém pode prometer isso.

## O que é comprovado e o que é hipótese

| Prática | Status | Base |
| --- | --- | --- |
| Estar indexado no Google e no Bing | **Comprovado**: pré-requisito | AI Overviews usa o índice do Google; ChatGPT Search usa índices de busca próprios e de parceiros |
| Não bloquear `OAI-SearchBot` | **Comprovado**: a OpenAI documenta que ele é necessário para aparecer no ChatGPT Search | Documentação de rastreadores da OpenAI |
| Conteúdo no HTML inicial (sem depender de JS) | **Comprovado** para rastreadores; muitos rastreadores de IA não executam JS | Site 100% SSG |
| Dados estruturados consistentes | Comprovado para o Google entender entidades; para LLMs, **hipótese razoável** | Schema.org / Google Search Central |
| Respostas diretas no início do texto | **Hipótese forte**: facilita extração de trechos | Prática de AEO |
| Consistência de NAP (nome, telefone, site) em fontes externas | Comprovado para SEO local; **hipótese** para LLMs | Google Business Profile |
| `llms.txt` | **Hipótese / opcional**: nenhum grande buscador declarou usá-lo | Implementado só porque o custo é zero |

## Implementado no site

1. **Entidade única:** um nó `LocalBusiness` com `@id` `https://abreuinox.com/#empresa`, referenciado por todas as páginas (WebPage.about, Service.provider, Article.author). Sem objetos concorrentes descrevendo a empresa.
2. **Descrição canônica** (`site.about`) usada no JSON-LD, no `llms.txt` e no manifest.
3. **FAQ da home** responde às perguntas que um usuário faria a uma IA: "O que a Abreu Inox faz?", "Faz só corrimão?", "Onde atende?", "Atende órgãos públicos?", "Como pedir orçamento?".
4. **Bloco "Em resumo" em `/sobre/`**: ficha da empresa em lista de definição (fácil de extrair).
5. **Artigos com "lead" de resposta direta**, tabela comparativa (304 × 316), fontes e datas reais.
6. **`/llms.txt`**: gerado dos mesmos dados das páginas (não diverge).
7. **`robots.txt`**: `User-Agent: * / Allow: /`, o que libera Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, etc.

## Rastreadores: política atual

| Rastreador | Finalidade | Situação |
| --- | --- | --- |
| Googlebot | Busca Google e AI Overviews | Liberado |
| Google-Extended | Treino/grounding do Gemini (não afeta a busca) | Liberado (padrão) |
| Bingbot | Bing e Copilot | Liberado |
| OAI-SearchBot | ChatGPT Search | Liberado |
| GPTBot | Treino de modelos da OpenAI | Liberado (padrão) |
| ChatGPT-User | Acesso iniciado por usuário | Liberado |

**Decisão do proprietário:** para bloquear o uso em **treino** sem perder a
presença em **busca**, adicione regras `Disallow: /` só para `GPTBot` e
`Google-Extended` em `src/app/robots.ts`. Não bloqueie OAI-SearchBot,
Googlebot nem Bingbot.

**Vercel:** confira em *Firewall > Bot Protection / AI Bots* se a opção de
bloquear bots de IA está desligada. Ligada, ela bloqueia OAI-SearchBot na
borda, e o robots.txt não adianta. Ainda não foi verificado, por falta de
acesso ao painel.

## Situação atual da marca em IA (27/10/2026)

- Verificável: um sistema de busca com IA descreveu a Abreu Inox com base no **site antigo** ("mais de 15 anos", só corrimão, dois telefones). O índice ainda guarda o `.com.br`.
- O repositório público no GitHub aparece na busca pela marca.
- Não foi possível consultar ChatGPT, Gemini ou AI Overviews diretamente.

## Ações externas recomendadas (por impacto)

1. Registrar `abreuinox.com.br` e redirecionar (ver `PLANO-MIGRACAO-DOMINIO.md`). Isso faz os índices substituírem o conteúdo antigo.
2. Criar e verificar o Perfil da Empresa no Google com a mesma descrição.
3. Atualizar a bio do Instagram (anos, região, link para abreuinox.com).
4. Avaliar tornar o repositório GitHub privado (a Vercel continua fazendo deploy normalmente).
5. Conseguir 3 a 5 citações legítimas (diretórios, fornecedores, associações) com nome, WhatsApp e site idênticos.

## Monitoramento (manual, mensal)

Pergunte, em janela anônima, ao ChatGPT (com busca), ao Gemini e ao Google:
"Quem faz corrimão de inox em Brasília?", "Abreu Inox é confiável?",
"Empresa de guarda-corpo de inox no DF", "Abreu Inox telefone". Registre:
data, ferramenta, se a marca aparece, que informação foi citada e se está
correta. **Não atribua tráfego a IA sem evidência** (referrer
`chatgpt.com`/`gemini.google.com` no GA4 é evidência; aumento de tráfego direto não é).
