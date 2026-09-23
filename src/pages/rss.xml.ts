import rss from "@astrojs/rss";
import { site } from "../../src/config";
import { getSlug, getSortedPosts } from "../../src/utils/posts";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getSortedPosts();
  return rss({
    title: `${site.title} — Posts`,
    description: site.description,
    site: context.site ?? site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.updatedDate ?? post.data.pubDate,
      link: `/posts/${getSlug(post.id)}/`,
      categories: post.data.tags,
    })),
  });
}
