import { blog } from "../config";
import type { Lang } from "../i18n";
import { getListedPosts, getSlug, getSortedPosts, getUniqueTags, getTranslation, slugify } from "./posts";

type Paginate = (data: unknown[], options: Record<string, unknown>) => unknown;

/** Paginated /posts or /en/posts listing. */
export async function postsListPaths(lang: Lang, paginate: Paginate) {
  return paginate(await getListedPosts(lang), { pageSize: blog.perPage });
}

/** One page per post in the given language. Neighbours come from the full list, in any language. */
export async function postPaths(lang: Lang) {
  const listed = await getListedPosts(lang);
  const posts = await getSortedPosts(lang);
  return Promise.all(
    posts.map(async (post) => {
      const i = listed.findIndex((p) => p.id === post.id);
      return {
      params: { slug: getSlug(post.id) },
      props: {
        post,
        prev: listed[i - 1] ?? null,
        next: listed[i + 1] ?? null,
        translation: (await getTranslation(post, lang === "en" ? "pt" : "en")) ?? null,
      },
    };
    }),
  );
}

/** Paginated tag pages for the given language. */
export async function tagPaths(lang: Lang, paginate: Paginate) {
  const posts = await getListedPosts(lang);
  const tags = await getUniqueTags(lang);
  return tags.flatMap((t) =>
    paginate(
      posts.filter((p) => p.data.tags.some((name: string) => slugify(name) === t.tag)),
      { params: { tag: t.tag }, pageSize: blog.perPage, props: { tagName: t.tagName } },
    ),
  );
}
