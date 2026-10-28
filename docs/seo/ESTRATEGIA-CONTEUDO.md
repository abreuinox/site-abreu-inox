# Estratégia de conteúdo

## Critérios de qualidade (obrigatórios)

1. **Original:** nada copiado de concorrentes ou fabricantes.
2. **Resposta direta primeiro:** o campo `lead` responde à pergunta do título em 2 a 3 frases.
3. **Verificável:** dados técnicos com fonte (`sources`). Normas citadas pelo nome e número, sempre com o aviso de que não substituem o responsável técnico.
4. **Datas reais:** `publishedAt` e `updatedAt` só mudam quando o texto muda.
5. **Ligado ao negócio:** todo artigo aponta para uma solução (`relatedSolution`) e tem CTA.
6. **Sem promessas:** não citar preço, prazo, garantia ou norma "atendida" sem confirmação.
7. **Volume baixo, valor alto:** 1 a 2 artigos por mês é suficiente. Nada de artigos gerados em massa.

## Publicados em 27/10/2026

| Artigo | Palavra-chave | Intenção | Solução ligada |
| --- | --- | --- | --- |
| Aço inox 304 ou 316 | inox 304 ou 316 | Informacional | Guarda-corpos |
| Corrimão de inox: o que considerar | corrimão de inox, altura corrimão NBR 9050 | Comercial investigativa | Corrimãos |
| Como pedir orçamento de inox sob medida | orçamento inox sob medida, preço corrimão inox | Comercial | Orçamento |
| Limpeza e conservação do aço inox | como limpar inox, corrimão inox enferruja | Pós-venda / informacional | Corrimãos |

**Revisão pendente pelo proprietário:** confirmar que as orientações técnicas
estão de acordo com a prática da empresa, principalmente:
- as medidas da NBR 9050 (0,92 m / 0,70 m e diâmetro de 3,0 a 4,5 cm);
- a indicação de 316 para piscinas.

## Próximos temas (por prioridade comercial)

| # | Título proposto | URL | Palavra-chave | Observação |
| --- | --- | --- | --- | --- |
| 1 | Guarda-corpo de inox: altura, norma e modelos | `/conteudos/guarda-corpo-de-inox-altura-e-norma/` | guarda corpo inox altura | Requer revisão da NBR 14718 vigente |
| 2 | Guarda-corpo para escada helicoidal: o que considerar | `/conteudos/guarda-corpo-escada-helicoidal/` | corrimão escada helicoidal | Diferencial forte; usar fotos do portfólio |
| 3 | Corrimão para rampa de acessibilidade em condomínios e empresas | `/conteudos/corrimao-rampa-acessibilidade/` | corrimão rampa acessibilidade | Público corporativo |
| 4 | Inox escovado ou polido | `/conteudos/inox-escovado-ou-polido/` | inox escovado ou polido | Usar fotos reais dos dois acabamentos |
| 5 | Como preparar um termo de referência para corrimãos e guarda-corpos em inox | `/conteudos/termo-de-referencia-corrimao-inox/` | — | Público B2G; validar com quem já atendeu órgãos |
| 6 | Guarda-corpo de inox com vidro: quando usar | `/conteudos/guarda-corpo-inox-com-vidro/` | guarda corpo inox com vidro | Projetos reais de halls |

## Estudos de caso (P2)

Para cada projeto autorizado, o proprietário fornece:
- setor do cliente (sem nome, se não autorizado);
- região;
- necessidade;
- solução;
- materiais/acabamento confirmados;
- prazo aproximado.

Esses campos entram em `projects.json`. Proposta: adicionar os campos opcionais
`sector`, `need`, `solution` e `finish` ao tipo `Project`, à validação em
`scripts/check-projects.mjs` e à página do projeto.

## Fluxo editorial

Rascunho → revisão técnica do proprietário → publicação (commit em `src/data/articles.ts`) → solicitar indexação no Search Console → revisar a cada 12 meses ou quando a norma mudar.
