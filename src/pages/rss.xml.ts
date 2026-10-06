import rss from "@astrojs/rss";
import { site } from "../config";
import { postUrl, ui, type Lang } from "../i18n";
import { getSlug, getListedPosts } from "../utils/posts";
import type { APIContext } from "astro";

export async function rssFeed(context: APIContext, lang: Lang) {
  const posts = await getListedPosts(lang);
  return rss({
    title: `${site.title} — ${ui[lang].rssTitle}`,
    description: site.description,
    site: context.site ?? site.url,
    customData: `<language>${lang}</language>`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.updatedDate ?? post.data.pubDate,
      link: postUrl(post.data.lang, getSlug(post.id)),
      categories: post.data.tags,
    })),
  });
}

export const GET = (context: APIContext) => rssFeed(context, "pt");
