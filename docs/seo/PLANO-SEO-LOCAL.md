# Plano de SEO local

## Diagnóstico (27/10/2026)

- **Perfil da Empresa no Google:** nenhum perfil da Abreu Inox apareceu nas buscas públicas. Sem acesso à conta, não é possível confirmar se existe perfil não verificado ou duplicado.
- **Diretórios** (Apontador, Guia Mais, Telelistas, Econodata, Facebook, LinkedIn): nenhuma ficha encontrada.
- **Instagram @abreuinox:**
  - cerca de 57 seguidores;
  - bio diz "Mais de 15 anos" e "DF e entorno";
  - link aponta para o WhatsApp, não para o site.
- **Telefones:** o site antigo tinha dois, (61) 98112-8386 e (61) 99583-1583. O site novo publica só o primeiro.

## Dados oficiais (NAP) a usar em todo lugar

| Campo | Valor | Status |
| --- | --- | --- |
| Nome | Abreu Inox | Confirmado (sem palavras-chave extras no nome do GBP: viola as diretrizes) |
| Telefone | (61) 98112-8386 | Confirmado |
| Site | https://abreuinox.com/ | Confirmado |
| Endereço | **Não publicar** (base em Ceilândia-DF) | Definir: a empresa recebe clientes no local? |
| Área de atendimento | Distrito Federal; Goiás | Confirmar quais cidades de GO (o GBP aceita até 20 áreas) |
| Horário | — | **Pendente** de confirmação |
| Descrição | Texto de `site.about` (`src/config/site.ts`) | Pronto |

## Perfil da Empresa no Google: passo a passo (exige acesso do proprietário)

1. Acessar business.google.com com a conta da empresa e procurar "Abreu Inox" para ver se já existe perfil (reivindicar, em vez de criar duplicado).
2. Tipo: **empresa de área de serviço**. Endereço oculto, porque o atendimento é na obra do cliente. Se houver loja ou oficina que recebe clientes com placa e horário, aí o endereço pode ser exibido.
3. Categoria principal sugerida: **"Serralheria"** (validar se o Google oferece "Fabricante de produtos de aço inoxidável"; escolher a que melhor descreve o serviço mais vendido).
4. Categorias secundárias, apenas as que forem verdade: "Fabricante de corrimãos", "Empresa de metalurgia", "Fabricante de móveis".
5. Áreas: Brasília, Ceilândia, Taguatinga, Águas Claras, etc. (até 20), e cidades de GO efetivamente atendidas.
6. Serviços: corrimãos em inox, guarda-corpos em inox, guarda-corpo com vidro, corrimão para escada helicoidal, móveis em inox sob medida. Cada serviço com link para a página correspondente do site.
7. Fotos: as mesmas 70 fotos reais do portfólio, sem metadados de GPS. Logo e foto de capa.
8. Site: `https://abreuinox.com/`. Botão de mensagem/WhatsApp.
9. Verificação: seguir o método que o Google oferecer (vídeo ou postal).
10. Avaliações: pedir a clientes reais, depois da entrega, com o link curto do perfil. **Nunca** comprar avaliações, avaliar a si mesmo ou oferecer desconto em troca. Responder todas.
11. Publicar 2 posts por mês com fotos de obras recentes.

## Citações externas (ordem sugerida)

1. Instagram: atualizar bio ("Mais de 30 anos de experiência em aço inox · DF e GO") e link para abreuinox.com. **Antes, confirmar o tempo de experiência** (ver `ESTRATEGIA-POSICIONAMENTO.md`).
2. Facebook: página com o mesmo NAP.
3. Bing Places: importar do Google Business Profile.
4. Apple Business Connect: grátis, alimenta Apple Maps e Siri.
5. Diretórios com moderação: Apontador, Guia Mais.
6. LinkedIn (página da empresa), útil para o público B2B/B2G.
7. Fornecedores de vidro/arquitetos parceiros: pedir menção com link, se houver parceria real.

Não criar páginas por bairro/cidade no site para "forçar" SEO local. A
relevância local vem do GBP, das citações e de projetos reais com localidade
autorizada (campo `location` em `projects.json`).

## O que fica pendente com o proprietário

- Confirmar se há ponto de atendimento ao público (define endereço visível ou área de serviço).
- Horário de atendimento.
- O segundo telefone (61) 99583-1583 ainda pertence à empresa? Se sim, decidir se entra no site; se não, garantir que não esteja em nenhuma ficha.
- Lista de cidades de Goiás atendidas.
- Autorização para citar a localidade de projetos (ex.: "Águas Claras, DF").
