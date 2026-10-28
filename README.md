# Site Abreu Inox

Site institucional da Abreu Inox (Next.js 16, React 19, Tailwind CSS 4),
preparado para publicação na Vercel em `https://abreuinox.com`.

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # valida o catálogo de projetos e gera o build de produção
npm run check:seo -- http://localhost:3000   # com o site rodando: SEO técnico de todas as URLs
```

## Onde alterar cada coisa

| O quê | Arquivo |
| --- | --- |
| Contato, domínio, SEO, mensagens do WhatsApp | `src/config/site.ts` |
| Google Ads (ID da conta e rótulo da conversão) | `.env.local` / variáveis da Vercel — veja `.env.example` |
| Lista de serviços | `src/data/services.ts` |
| Páginas de soluções (`/solucoes/...`) | `src/data/solutions.ts` |
| Conteúdos técnicos (`/conteudos/...`) | `src/data/articles.ts` |
| Perguntas frequentes da home | `src/data/faq.ts` |
| Menu principal | `src/config/navigation.ts` |
| Metadata por página (title, canonical, Open Graph) | `src/lib/seo.ts` |
| GA4 e eventos de conversão | `src/lib/analytics.ts`, `src/components/Analytics.tsx` |
| Projetos do portfólio | `src/data/projects.json` (guia em `docs/portfolio.md`) |
| Fotos e vídeos dos projetos | `public/images/projects/`, `public/videos/projects/` |
| Dados estruturados (grafo JSON-LD) | `src/lib/structured-data.ts` |
| Redirecionamentos (www, vercel.app) e cabeçalhos | `next.config.ts` |
| Estratégia e documentação de SEO | `docs/seo/` |

A pasta `IMG-ABREU-INOX/` guarda os arquivos originais e não é publicada
(está no `.gitignore` e no `.vercelignore`).

Regra do projeto: só entram no site dados confirmados pela empresa. Não
publicar endereço completo, CEP, coordenadas, horário, avaliações, nem
localização ou nome de cliente sem confirmação.

## Publicação na Vercel

1. Registrar o domínio `abreuinox.com` (em 09/10/2026 o WHOIS não encontrava
   registro para ele).
2. Criar o projeto na Vercel a partir desta pasta (`vercel` e depois
   `vercel --prod`, ou importando o repositório Git). Framework: Next.js.
   Para campanhas do Google Ads, definir `NEXT_PUBLIC_GOOGLE_ADS_ID` e
   `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` (veja `.env.example`).
3. Em *Settings > Domains*, adicionar `abreuinox.com` (principal) e
   `www.abreuinox.com` redirecionando para `abreuinox.com`.
4. No provedor do domínio, criar os registros DNS que a Vercel indicar
   (normalmente um registro `A` para o domínio raiz e um `CNAME` para `www`).
5. Aguardar a Vercel emitir o certificado HTTPS e então conferir:
   - `https://abreuinox.com/` abre com cadeado;
   - `http://abreuinox.com` e `https://www.abreuinox.com` redirecionam para
     `https://abreuinox.com/`;
   - `https://abreuinox.com/robots.txt` e `/sitemap.xml` respondem.
6. Cadastrar o site no Google Search Console e enviar o sitemap.
7. No Perfil da Empresa no Google, se a empresa não recebe clientes no local,
   configurar como empresa de área de serviço (DF e Goiás), sem endereço
   visível.

O redirecionamento de `www` para o domínio raiz também está garantido em
código (`next.config.ts`), e o HTTPS é automático na Vercel.
