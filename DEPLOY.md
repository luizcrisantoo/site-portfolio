# Guia de Deploy — Portfólio Luiz Eduardo

## Imagens (PRIORIDADE)

Substitua os SVGs placeholder por screenshots reais dos projetos:

```
assets/images/
├── clifor-before.webp        ← Google Business antes
├── clifor-after.webp         ← Site cliforolinda.com.br
├── novolar-before.webp       ← Sem presença digital
├── novolar-after.webp        ← Site novolargeriatrico.com.br
├── ortopedica-before.webp    ← Google Business antes
└── ortopedica-after.webp     ← Site clinicaortopedicadorecife.com.br
```

**Formato ideal:** WebP, 1600x1000px, qualidade 80%.
**Converter com:** https://squoosh.app (gratuito, roda no browser)

Após substituir, atualize os `src` no `index.html` de `.svg` para `.webp`.

## Deploy no GitHub Pages

```bash
git init
git add .
git commit -m "feat: portfólio v1"
git branch -M main
git remote add origin https://github.com/SEU-USER/site-portfolio.git
git push -u origin main
```

No GitHub: Settings → Pages → Source: main → / (root) → Save.

## Deploy na Vercel

1. Conecte o repositório em vercel.com
2. Framework Preset: Other
3. Output Directory: ./ (raiz)
4. Deploy automático a cada push

## Checklist pré-deploy

- [ ] Substituir imagens placeholder por screenshots reais (WebP)
- [ ] Atualizar links do LinkedIn e GitHub no index.html
- [ ] Testar no celular (slider funciona sem scroll?)
- [ ] Adicionar favicon.ico
- [ ] Configurar domínio personalizado (opcional)
