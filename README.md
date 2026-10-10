# Site Abreu Inox

Site institucional da Abreu Inox (Next.js 16, React 19, Tailwind CSS 4),
preparado para publicação na Vercel em `https://abreuinox.com`.

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # valida o catálogo de projetos e gera o build de produção
```

## Onde alterar cada coisa

| O quê | Arquivo |
| --- | --- |
| Contato, domínio, SEO, mensagens do WhatsApp | `src/config/site.ts` |
| Lista de serviços | `src/data/services.ts` |
| Projetos do portfólio | `src/data/projects.json` (guia em `docs/portfolio.md`) |
| Fotos e vídeos dos projetos | `public/images/projects/`, `public/videos/projects/` |
| Dados estruturados (LocalBusiness) | `src/lib/structured-data.ts` |
| Redirecionamento www e cabeçalhos | `next.config.ts` |

A pasta `IMG-ABREU-INOX/` guarda os arquivos originais e não é publicada
(está no `.gitignore` e no `.vercelignore`).

Regra do projeto: só entram no site dados confirmados pela empresa. Não
publicar endereço completo, CEP, coordenadas, horário, avaliações, nem
localização ou nome de cliente sem confirmação.

## Publicação na Vercel

1. Registrar o domínio `abreuinox.com` (em 09/10/2026 o WHOIS não encontrava
   registro para ele).
2. Criar o projeto na Vercel a partir desta pasta (`vercel` e depois
   `vercel --prod`, ou importando o repositório Git). Framework: Next.js, sem
   variáveis de ambiente.
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
