export interface Book {
  slug: string;
  title: string;
  author: string;
  cover: string;
  coverAlt: string;
  year?: string;
  rating?: number;
  status?: "Finished" | "Reading" | "Want to read";
  favorite?: boolean;
  shelf?: string;
  takeaway?: string;
}

/**
 * How to add a new book:
 * 1. Drop the cover in `public/books/` (kebab-case, e.g. `dune.jpg`,
 *    keep it under ~300KB, JPG/WebP, portrait ~2:3).
 * 2. Add one entry below. That's it — the /books page
 *    picks it up automatically via `shelves`.
 */
export const books: Book[] = [
  {
    slug: "ai-engineering",
    title: "AI Engineering: Building Applications with Foundation Models",
    author: "Chip Huyen",
    cover: "/books/ai-engineering.jpg",
    coverAlt: "Cover of AI Engineering by Chip Huyen",
    status: "Reading",
    favorite: false,
    shelf: "Currently Reading",
    takeaway: "Currently reading. Notes on building apps on foundation models.",
  },
  {
    slug: "the-alchemist",
    title: "The Alchemist",
    author: "Paulo Coelho",
    cover: "/books/the-alquimist.jpg",
    coverAlt: "Cover of The Alchemist by Paulo Coelho",
    rating: 5,
    status: "Finished",
    favorite: true,
    shelf: "Mindset & Meaning",
    takeaway: "Follow your personal legend. Keep moving.",
  },
  {
    slug: "12-rules-for-life",
    title: "12 Rules for Life: An Antidote to Chaos",
    author: "Jordan B. Peterson",
    cover: "/books/12-Rules-Life-Antidote.jpg",
    coverAlt: "Cover of 12 Rules for Life by Jordan B. Peterson",
    rating: 5,
    status: "Finished",
    favorite: false,
    shelf: "Mindset & Meaning",
    takeaway: "Order from chaos: stand straight, tell the truth, take responsibility.",
  },
  {
    slug: "cant-hurt-me",
    title: "Can't Hurt Me",
    author: "David Goggins",
    cover: "/books/Cant-Hurt-Me.jpg",
    coverAlt: "Cover of Can't Hurt Me by David Goggins",
    rating: 5,
    status: "Finished",
    favorite: false,
    shelf: "Mindset & Meaning",
    takeaway: "Callous your mind through hard work and accountability.",
  },
  {
    slug: "the-way-of-the-superior-man",
    title: "The Way of the Superior Man",
    author: "David Deida",
    cover: "/books/Way-Superior-Man.jpg",
    coverAlt: "Cover of The Way of the Superior Man by David Deida",
    rating: 4,
    status: "Finished",
    favorite: true,
    shelf: "Mindset & Meaning",
    takeaway: "Live your purpose. Stay present.",
  },
  {
    slug: "the-defining-decade",
    title: "The Defining Decade",
    author: "Meg Jay",
    cover: "/books/the-defining-decades.jpg",
    coverAlt: "Cover of The Defining Decade by Meg Jay",
    rating: 4,
    status: "Finished",
    favorite: true,
    shelf: "Life & Purpose",
    takeaway: "Your twenties matter. Build work skills, relationships and identity early.",
  },
  {
    slug: "the-holy-bible-kjv",
    title: "The Holy Bible",
    author: "King James Version",
    cover: "/books/the-holy-bible.jpg",
    coverAlt: "Cover of The Holy Bible, King James Version",
    rating: 5,
    status: "Finished",
    favorite: false,
    shelf: "Life & Purpose",
    takeaway: "A grounding text I return to.",
  },
  {
    slug: "14-habits-highly-productive-developers",
    title: "14 Habits of Highly Productive Developers",
    author: "Zeno Rocha",
    cover: "/books/Habits-Highly-Productive-Developers-English-ebook.jpg",
    coverAlt: "Cover of 14 Habits of Highly Productive Developers by Zeno Rocha",
    rating: 4,
    status: "Finished",
    favorite: false,
    shelf: "Life & Purpose",
    takeaway: "Small habits add up. Focus, learn in public, stay healthy.",
  },
  {
    slug: "o-homem-mais-rico-da-babilonia",
    title: "O Homem Mais Rico da Babilónia",
    author: "George S. Clason",
    cover: "/books/o-homem-mais-rico-da-babilonia.jpg",
    coverAlt: "Cover of O Homem Mais Rico da Babilónia by George S. Clason",
    rating: 4,
    status: "Finished",
    favorite: true,
    shelf: "Money & Focus",
    takeaway: "Pay yourself first. Save 10%, control spending, put money to work.",
  },
  {
    slug: "os-segredos-da-mente-milionaria",
    title: "Os Segredos da Mente Milionária",
    author: "T. Harv Eker",
    cover: "/books/os-segredos-da-mente-milionaria.jpg",
    coverAlt: "Cover of Os Segredos da Mente Milionária by T. Harv Eker",
    rating: 4,
    status: "Finished",
    favorite: false,
    shelf: "Money & Focus",
    takeaway: "Your money habits shape what you keep.",
  },
  {
    slug: "a-unica-coisa",
    title: "A Única Coisa",
    author: "Gary Keller & Jay Papasan",
    cover: "/books/a-unica-coisa.jpg",
    coverAlt: "Cover of A Única Coisa by Gary Keller and Jay Papasan",
    rating: 4,
    status: "Finished",
    favorite: false,
    shelf: "Money & Focus",
    takeaway: "Focus on what matters most right now.",
  },
  {
    slug: "a-vaca-roxa",
    title: "A Vaca Roxa",
    author: "Seth Godin",
    cover: "/books/vaca-roxa-transformar-destacar-concorrentes.jpg",
    coverAlt: "Cover of A Vaca Roxa by Seth Godin",
    rating: 4,
    status: "Finished",
    favorite: false,
    shelf: "Business & Story",
    takeaway: "Be worth noticing.",
  },
  {
    slug: "como-as-gigantes-caem",
    title: "Como as Gigantes Caem",
    author: "Jim Collins",
    cover: "/books/how-you-might-fall.jpg",
    coverAlt: "Cover of Como as Gigantes Caem (How the Mighty Fall) by Jim Collins",
    rating: 4,
    status: "Finished",
    favorite: false,
    shelf: "Business & Story",
    takeaway: "How companies decline in five stages, and how discipline slows it.",
  },
  {
    slug: "historias-que-o-meu-chefe-nunca-me-contou",
    title: "Histórias Que o Meu Chefe Nunca Me Contou",
    author: "Juan Mateo",
    cover: "/books/historias-Contou-storytelling-otimizar-equipa.jpg",
    coverAlt: "Cover of Histórias Que o Meu Chefe Nunca Me Contou by Juan Mateo",
    rating: 4,
    status: "Finished",
    favorite: false,
    shelf: "Business & Story",
    takeaway: "Storytelling for leading teams.",
  },
];

/** Books finished (the wood shelves). Currently-reading books get their own spotlight. */
export const finishedBooks: Book[] = books.filter((b) => b.status !== "Reading");

/** Spotlighted at the top of /books. */
export const currentlyReading: Book[] = books.filter((b) => b.status === "Reading");

/** Favorites always sit on the top shelf — just toggle `favorite` and they move up. */
export const favoriteBooks: Book[] = finishedBooks.filter((b) => b.favorite);
const otherBooks: Book[] = finishedBooks.filter((b) => !b.favorite);

/** All real covers, in shelf order. */
export const shelfSlots: Book[] = [...favoriteBooks, ...otherBooks];

/** Fill 4-book rows first — at most one partial row, always last. */
const ROW_SIZE = 4;

function fillRows(list: Book[]): Book[][] {
  const rows: Book[][] = [];
  for (let i = 0; i < list.length; i += ROW_SIZE) {
    const row = list.slice(i, i + ROW_SIZE);
    if (row.length) rows.push(row);
  }
  return rows;
}

const restThemes = ["Mindset & Meaning", "Growth & Focus", "Business & Story"];
const unsortedShelves = [
  { theme: "★ Favorites", books: favoriteBooks, isFavorites: true },
  ...fillRows(otherBooks).map((books, i) => ({
    theme: restThemes[i] ?? "More reads",
    books,
    isFavorites: false,
  })),
].filter((s) => s.books.length > 0);

unsortedShelves.sort(
  (a, b) => b.books.length - a.books.length || Number(b.isFavorites) - Number(a.isFavorites),
);

export const shelves = unsortedShelves.map((s, i) => ({
  label: `Shelf 0${i + 1} — ${s.theme}`,
  books: s.books,
}));
