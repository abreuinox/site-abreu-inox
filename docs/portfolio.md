# Fotos do portfólio

As fotos ficam em `public/images/projects/`. Use apenas fotografias reais de
projetos da Abreu Inox.

## Como publicar um projeto

1. Salve as fotos em `public/images/projects/`, de preferência em JPG ou WebP, com o lado maior
   em torno de 2000 px e nomes sem espaços nem acentos
   (ex.: `guarda-corpo-vidro-01.jpg`).
2. Adicione uma entrada em `src/data/projects.json`:

```json
{
  "id": "guarda-corpo-vidro-01",
  "title": "Guarda-corpo em inox com vidro",
  "category": "Guarda-corpos",
  "description": "Descrição curta do que foi fabricado e instalado.",
  "image": {
    "src": "/images/projects/guarda-corpo-vidro-01.jpg",
    "alt": "Guarda-corpo em aço inox com vidro em escada interna"
  },
  "gallery": [
    {
      "src": "/images/projects/guarda-corpo-vidro-02.jpg",
      "alt": "Detalhe da fixação do guarda-corpo em aço inox"
    }
  ],
  "video": {
    "src": "/videos/projects/guarda-corpo-vidro.mp4",
    "poster": "/images/projects/guarda-corpo-vidro-capa.jpg",
    "label": "Vídeo do guarda-corpo em inox com vidro"
  },
  "location": "Brasília, DF",
  "featured": true
}
```

3. Rode `npm run check:projects` para validar o catálogo.

## Regras

- `id` é único e não muda depois de publicado.
- `category` agrupa os projetos no filtro do portfólio; use sempre a mesma
  grafia para a mesma categoria (ex.: "Corrimãos", "Guarda-corpos", "Escadas").
- `alt` descreve a foto especificamente; não repita o título.
- `gallery`, `video`, `location` e `featured` são opcionais.
- Vídeos ficam em `public/videos/projects/`, em MP4 (H.264), sem áudio e de
  preferência abaixo de 15 MB. Eles só são baixados quando o visitante abre o
  projeto.
- O projeto com `"featured": true` aparece em destaque no topo do portfólio.
- Remova os metadados das fotos antes de publicar: fotos de celular guardam a
  localização (GPS) de onde foram tiradas.
- Só preencha `location` com localização confirmada. Não cite cliente sem
  autorização.
