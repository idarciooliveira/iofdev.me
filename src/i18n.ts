/** Languages for blog posts. Portuguese is the default and has no URL prefix. */
export type Lang = "en" | "pt";

export const defaultLang: Lang = "pt";
export const langs: Lang[] = ["pt", "en"];

export const langInfo: Record<Lang, { label: string; name: string; dateLocale: string; ogLocale: string }> = {
  en: { label: "EN", name: "English", dateLocale: "en-GB", ogLocale: "en_US" },
  pt: { label: "PT", name: "Português", dateLocale: "pt-AO", ogLocale: "pt_AO" },
};

export const otherLang = (lang: Lang): Lang => (lang === "en" ? "pt" : "en");

const prefix = (lang: Lang) => (lang === defaultLang ? "" : `/${lang}`);
export const postsPath = (lang: Lang) => `${prefix(lang)}/posts`;
export const tagsPath = (lang: Lang) => `${prefix(lang)}/tags`;
export const postUrl = (lang: Lang, slug: string) => `${postsPath(lang)}/${slug}/`;
export const rssPath = (lang: Lang) => `${prefix(lang)}/rss.xml`;

export const ui = {
  en: {
    home: "Home",
    posts: "Posts",
    tags: "Tags",
    readingTime: (min: number) => `${min} min read`,
    updatedOn: "Updated on",
    previousPost: "← Previous Post",
    nextPost: "Next Post",
    postsPageTitle: (n: number) => (n === 1 ? "Posts" : `Posts (page ${n})`),
    postsDescription: "Notes, lessons and ideas about software engineering, frontend and product.",
    postsSectionTitle: "Quick notes and lessons",
    postsSectionDescription: "Drafts and lessons about frontend, product and engineering in real projects.",
    postsH1: "Posts, notes on software engineering",
    postsOfYear: (y: number) => `Posts from ${y}`,
    tagPageTitle: (tag: string, n: number) => (n === 1 ? `Tag: ${tag}` : `Tag: ${tag} (page ${n})`),
    tagDescription: (tag: string) => `Posts about ${tag}: software engineering notes and lessons.`,
    tagCount: (n: number) => `${n} post${n === 1 ? "" : "s"} on this topic.`,
    tagH1: (tag: string) => `Posts about ${tag}`,
    tagsDescription: "Every topic covered in the posts, with a count for each.",
    tagsSectionTitle: "Browse by topic",
    tagsSectionDescription: "All post topics, sorted by frequency.",
    tagsH1: "Tags, browse posts by topic",
    noTags: "No tags yet.",
    prevPage: "← Previous",
    nextPage: "Next →",
    prevPageLabel: "Previous page",
    nextPageLabel: "Next page",
    pageOf: (n: number, last: number) => `Page ${n} of ${last}`,
    paginationLabel: "Pagination",
    postsAdjacent: "Adjacent posts",
    switchTo: "Read in Português",
    allPosts: "All Posts →",
    emptyPosts: "No posts in English yet.",
    rssTitle: "Posts",
  },
  pt: {
    home: "Início",
    posts: "Posts",
    tags: "Tags",
    readingTime: (min: number) => `${min} min de leitura`,
    updatedOn: "Atualizado em",
    previousPost: "← Post anterior",
    nextPost: "Post seguinte",
    postsPageTitle: (n: number) => (n === 1 ? "Posts" : `Posts (página ${n})`),
    postsDescription: "Anotações, aprendizados e ideias sobre engenharia de software, frontend e produto.",
    postsSectionTitle: "Notas rápidas e aprendizados",
    postsSectionDescription: "Rascunhos e aprendizados sobre frontend, produto e engenharia em projetos reais.",
    postsH1: "Posts, notas sobre engenharia de software",
    postsOfYear: (y: number) => `Posts de ${y}`,
    tagPageTitle: (tag: string, n: number) => (n === 1 ? `Tag: ${tag}` : `Tag: ${tag} (página ${n})`),
    tagDescription: (tag: string) => `Posts sobre ${tag}: notas e aprendizados de engenharia de software.`,
    tagCount: (n: number) => `${n} post(s) sobre este tema.`,
    tagH1: (tag: string) => `Posts sobre ${tag}`,
    tagsDescription: "Todos os temas abordados nos posts, com a contagem de cada um.",
    tagsSectionTitle: "Explorar por tema",
    tagsSectionDescription: "Todos os temas dos posts, ordenados por frequência.",
    tagsH1: "Tags, explorar posts por tema",
    noTags: "Ainda não há tags.",
    prevPage: "← Anterior",
    nextPage: "Seguinte →",
    prevPageLabel: "Página anterior",
    nextPageLabel: "Próxima página",
    pageOf: (n: number, last: number) => `Página ${n} de ${last}`,
    paginationLabel: "Paginação",
    postsAdjacent: "Posts adjacentes",
    switchTo: "Read in English",
    allPosts: "Todos os posts →",
    emptyPosts: "Ainda não há posts em português.",
    rssTitle: "Posts",
  },
} as const;
