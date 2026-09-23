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

// https://astro.build/config
// Note: AstroPaper loads "Google Sans Code" via Astro Fonts API.
// Here we load the same family via Fontsource (local npm bundle) for
// reliable offline builds — see src/layouts/main.astro imports.
export default defineConfig({
  site: 'https://iofdev.me',
  vite: {
      plugins: [tailwindcss()],
	},

  integrations: [mdx(), sitemap(), react()],

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
