# iofdev.me — Portfolio v2

Nova versão do portfólio pessoal construída com **Astro 5** e **Tailwind CSS 4**, com uma linguagem visual editorial inspirada no steipete.me.

## O que já está implementado

- Nova estrutura de navegação: `Home`, `About`, `Projects`, `Moments`, `Writing`. dsd
- Layout global com header fixo, página centralizada e footer
- Sistema de estilos com tokens CSS (cores, superfícies, contraste, gradientes)
- Componentes reutilizáveis para seções, hero, cards de projetos e timeline
- Página `Writing` com placeholders em gradiente (sem imagens reais, como pedido)

## Estrutura principal

- `src/layouts/main.astro` — shell global (SEO básico + nav + footer)
- `src/components/` — componentes reutilizáveis (`Nav`, `Hero`, `Section`, etc.)
- `src/pages/` — páginas principais do portfólio
- `src/styles/global.css` — design tokens e utilitários de composição

## Rodar localmente

```bash
pnpm install
pnpm dev
```

## Build de produção

```bash
pnpm build
pnpm preview
```

## Próximos passos sugeridos

- Substituir textos e links placeholder por conteúdo real
- Migrar `Writing` para Content Collections/MDX
- Adicionar Open Graph image e metadata por página
- Criar versão EN/PT com i18n
