import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Blog frontmatter schema (AstroPaper pattern, adapted).
 * Required: title, description, pubDate. Everything else optional.
 */
const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/posts" }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      /** ISO date, e.g. 2026-02-13. Shown as published date. */
      pubDate: z.coerce.date(),
      /** ISO date. Shown as "Atualizado em" when newer than pubDate. */
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default(["notas"]),
      author: z.string().default("Idárcio Oliveira"),
      /** Drafts are never rendered nor listed. */
      draft: z.boolean().optional(),
      /** Highlight on /posts landing. */
      featured: z.boolean().optional(),
      /** Post hero/OG image (root-relative public path or absolute URL). Falls back to site.ogImage. */
      heroImage: z.string().optional(),
      /** Absolute URL for cross-posts. Otherwise canonical is auto. */
      canonicalURL: z.string().url().optional(),
    }),
});

export const collections = { blog };
