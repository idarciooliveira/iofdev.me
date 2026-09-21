import { site } from "../../src/config";
import type { APIContext } from "astro";

export function GET(context: APIContext) {
  const base = (context.site ?? site.url).toString().replace(/\/+$/, "");
  const body = [`User-agent: *`, `Allow: /`, ``, `Sitemap: ${base}/sitemap-index.xml`].join("\n");
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
