import { getCollection, type CollectionEntry } from "astro:content";
import { langInfo, ui, type Lang } from "../i18n";

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

/** All published posts, newest first (updatedDate ?? pubDate). Pass a lang to keep one language. */
export async function getSortedPosts(lang?: Lang): Promise<BlogPost[]> {
  const posts = await getCollection(
    "blog",
    ({ data }) => data.draft !== true && (!lang || data.lang === lang),
  );
  return posts.sort(
    (a, b) =>
      (b.data.updatedDate ?? b.data.pubDate).valueOf() -
      (a.data.updatedDate ?? a.data.pubDate).valueOf(),
  );
}

/**
 * Posts for a list in the given language. Every post is listed, but when a post
 * exists in both languages only the version in `lang` is kept.
 */
export async function getListedPosts(lang: Lang): Promise<BlogPost[]> {
  const all = await getSortedPosts();
  return all.filter(
    (post) =>
      post.data.lang === lang ||
      !all.some((p) => p.data.lang === lang && getTranslationKey(p) === getTranslationKey(post)),
  );
}

/** Unique tags across posts, slug + original name + count. */
export async function getUniqueTags(lang?: Lang) {
  const posts = lang ? await getListedPosts(lang) : await getSortedPosts();
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

/** Key that links the versions of one post across languages. */
export const getTranslationKey = (post: BlogPost) => post.data.translationKey ?? getSlug(post.id);

/** The same post in another language, if it exists and is published. */
export async function getTranslation(post: BlogPost, lang: Lang): Promise<BlogPost | undefined> {
  const key = getTranslationKey(post);
  return (await getSortedPosts(lang)).find((p) => getTranslationKey(p) === key);
}

/** ~200 wpm reading time, labelled in the post's language. */
export function getReadingTime(text: string, lang: Lang = "pt") {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return { minutes, text: ui[lang].readingTime(minutes) };
}

export const formatDate = (date: Date, lang: Lang = "pt") =>
  date.toLocaleDateString(langInfo[lang].dateLocale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Luanda",
  });

export const toISO = (date: Date) => date.toISOString();
