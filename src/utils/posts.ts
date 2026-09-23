import { getCollection, type CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

/** URL slug for a post, stable across year-folder organization.
 *  e.g. "2026/my-post.md" → "my-post", "my-post.mdx" → "my-post". */
export const getSlug = (id: string) =>
  id
    .replace(/\.(md|mdx)$/, "")
    .split("/")
    .pop() as string;

export const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

/** All published posts, newest first (updatedDate ?? pubDate). */
export async function getSortedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection("blog", ({ data }) => data.draft !== true);
  return posts.sort(
    (a, b) =>
      (b.data.updatedDate ?? b.data.pubDate).valueOf() -
      (a.data.updatedDate ?? a.data.pubDate).valueOf(),
  );
}

/** Unique tags across posts, slug + original name + count. */
export async function getUniqueTags() {
  const posts = await getSortedPosts();
  const map = new Map<string, { tag: string; tagName: string; count: number }>();
  for (const post of posts) {
    for (const tagName of post.data.tags) {
      const tag = slugify(tagName);
      const entry = map.get(tag);
      if (entry) entry.count += 1;
      else map.set(tag, { tag, tagName, count: 1 });
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** ~200 wpm reading time, PT label. */
export function getReadingTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return { minutes, text: `${minutes} min de leitura` };
}

export const formatDate = (date: Date) =>
  date.toLocaleDateString("pt-AO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Luanda",
  });

export const toISO = (date: Date) => date.toISOString();
