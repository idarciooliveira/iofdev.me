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
 * 2. Add one entry below. That's it — the /books prototypes
 *    pick it up automatically.
 */
export const books: Book[] = [
  {
    slug: "o-alquimista",
    title: "O Alquimista",
    author: "Paulo Coelho",
    cover: "/books/alquimista.jpg",
    coverAlt: "Cover of O Alquimista by Paulo Coelho",
    year: "2024",
    rating: 5,
    status: "Finished",
    favorite: true,
    shelf: "Fiction & Meaning",
    takeaway: "Follow your personal legend — the universe conspires with those who move.",
  },
  {
    slug: "the-martian",
    title: "The Martian",
    author: "Andy Weir",
    cover: "/books/martin-of-year.jpg",
    coverAlt: "Cover of The Martian by Andy Weir",
    year: "2024",
    rating: 4,
    status: "Finished",
    favorite: false,
    shelf: "Sci-Fi & Survival",
    takeaway: "Solve one problem at a time. Work the problem, stay alive.",
  },
  {
    slug: "48-laws-of-power",
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    cover: "/books/book-sample.jpg",
    coverAlt: "Cover of The 48 Laws of Power by Robert Greene",
    year: "2023",
    rating: 4,
    status: "Finished",
    favorite: true,
    shelf: "Strategy & Mindset",
    takeaway: "Power is a game of perception, timing and restraint.",
  },
];

/** Repeat the 3 real covers so shelves look full (4 books per row). */
export const shelfSlots: Book[] = [
  books[0],
  books[1],
  books[2],
  books[0],
  books[1],
  books[2],
  books[0],
  books[1],
];

export const shelves = [
  { label: "Shelf 01 — Fiction & Meaning", books: shelfSlots.slice(0, 4) },
  { label: "Shelf 02 — Strategy & Survival", books: shelfSlots.slice(4, 8) },
];
