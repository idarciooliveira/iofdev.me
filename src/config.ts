/** Single source of truth for site + blog SEO (AstroPaper pattern). */
export const site = {
  url: "https://iofdev.me",
  title: "Idárcio Oliveira",
  description:
    "Portfólio de Idárcio Oliveira — Engenheiro de Software. Notas sobre frontend, arquitetura, produto e acessibilidade.",
  author: "Idárcio Oliveira",
  profile: "https://iofdev.me/about",
  /** Default social image: absolute-path PNG/JPG, min 1200x630. No SVG. */
  ogImage: "/og-default.jpg",
  lang: "pt",
  timezone: "Africa/Luanda",
} as const;

export const blog = {
  /** Posts per paginated listing page (/posts, /tags/[tag]). */
  perPage: 8,
  /** Recent posts shown on section previews. */
  perIndex: 6,
} as const;
