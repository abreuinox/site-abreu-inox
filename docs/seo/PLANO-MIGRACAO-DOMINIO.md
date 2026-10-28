# Plano de migração do domínio histórico abreuinox.com.br

## Conclusão da investigação: é a mesma empresa

| Sinal | abreuinox.com.br (arquivo) | abreuinox.com |
| --- | --- | --- |
| Marca | Abreu Inox | Abreu Inox |
| Telefone | 061-98112-8386 / 99583-1583 | (61) 98112-8386 |
| Região | Distrito Federal | DF e Goiás |
| Serviço | Corrimão de inox | Corrimão + guarda-corpo + escadas + sob medida |
| Experiência | "mais de 15 anos" | "mais de 30 anos" |

Fontes: Wayback Machine, capturas de 02/12/2021, 01/11/2023 e 10/04/2025 (texto idêntico, site Wix de 2017).

## Situação atual do domínio (27/10/2026)

- **Não está registrado** (`whois.registro.br`: "No match"; sem DNS).
- Ainda aparece no índice de busca com o título "Abreu Inox | Corrimão de Inox em Brasília".
- Páginas que existiam: `/` (arquivada), `/galeria` e `/contato` (não arquivadas, citadas no sitemap do Wix).
- Backlinks encontrados: nenhum. O valor do domínio está mais no **histórico de marca** e na **proteção contra terceiros** do que em links.

## Risco

Um terceiro (concorrente ou especulador) pode registrar o domínio e usar a
reputação da marca. Domínios `.com.br` são liberados para novo registro depois
do período de congelamento. Hoje ele está livre.

## Plano (exige ação do proprietário)

1. **Registrar `abreuinox.com.br` no Registro.br** (CNPJ ou CPF do titular da empresa), o quanto antes.
2. Na Vercel, adicionar `abreuinox.com.br` e `www.abreuinox.com.br` ao projeto, ambos como **redirect 308 para `https://abreuinox.com`** (*Settings > Domains > Redirect to*).
3. No Registro.br, apontar o DNS conforme a Vercel indicar (registro A para a raiz e CNAME para www, ou usar os nameservers da Vercel).
4. Mapear URLs antigas no `next.config.ts` (só necessário se a Vercel servir o domínio como alias, e não como redirect de domínio):

| URL antiga | Destino |
| --- | --- |
| `/` | `https://abreuinox.com/` |
| `/galeria` | `https://abreuinox.com/projetos/` |
| `/contato` | `https://abreuinox.com/orcamento/` |
| `/*` (demais) | `https://abreuinox.com/` |

5. Testar: `curl -sI https://www.abreuinox.com.br/galeria` deve retornar 308 com `location` para `https://abreuinox.com/projetos/`, em um único salto, sem ciclos.
6. **Search Console:**
   - adicionar a propriedade de domínio `abreuinox.com.br` (verificação por DNS TXT);
   - usar a ferramenta **Mudança de endereço** apontando para `abreuinox.com`;
   - fazer o mesmo no Bing Webmaster Tools (Site Move).
7. Manter o domínio e os redirects **por pelo menos 1 ano**, idealmente indefinidamente. O custo é baixo.

**Não executado nesta entrega:** o domínio não pertence a ninguém no momento.
Registrá-lo exige o titular da empresa.
