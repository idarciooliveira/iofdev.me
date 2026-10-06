// @ts-check

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkToc from 'remark-toc';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const site = 'https://iofdev.me';

/**
 * lastmod per post URL, read from frontmatter (updatedDate ?? pubDate).
 * Kept in sync with the routes in src/i18n.ts: pt posts at /posts/<slug>/,
 * en posts at /en/posts/<slug>/.
 */
function postLastmod(dir = 'src/content/posts') {
  const out = new Map();
  for (const entry of readdirSync(dir, { recursive: true })) {
    const file = String(entry);
    const name = file.split('/').pop() ?? '';
    if (!/\.mdx?$/.test(name) || name.startsWith('_')) continue;
    const fm = readFileSync(join(dir, file), 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
    const field = (key) => fm.match(new RegExp(`^${key}:\\s*["']?([^"'\\n]+)`, 'm'))?.[1]?.trim();
    if (field('draft') === 'true') continue;
    const date = field('updatedDate') ?? field('pubDate');
    if (!date) continue;
    const prefix = field('lang') === 'en' ? '/en' : '';
    out.set(`${site}${prefix}/posts/${name.replace(/\.mdx?$/, '')}/`, new Date(date).toISOString());
  }
  return out;
}
const lastmod = postLastmod();
// Tag pages are thin lists of posts and carry noindex, so keep them out.
const isTagPage = (url) => /\/tags\/[^/]+\/(\d+\/)?$/.test(new URL(url).pathname);

// https://astro.build/config
// Note: AstroPaper loads "Google Sans Code" via Astro Fonts API.
// Here we load the same family via Fontsource (local npm bundle) for
// reliable offline builds — see src/layouts/main.astro imports.
export default defineConfig({
  site,
  vite: {
	server: {
	  allowedHosts: true,
	},
	plugins: [tailwindcss()],
	},

  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !isTagPage(page),
      serialize(item) {
        const date = lastmod.get(item.url);
        return date ? { ...item, lastmod: date } : item;
      },
    }),
    react(),
  ],

  markdown: {
    processor: unified({
      remarkPlugins: [[remarkToc, { heading: 'Índice|Table of contents' }]],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'append' }],
      ],
    }),
    shikiConfig: { theme: 'github-dark-default' },
  },
});
