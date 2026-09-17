// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
// Note: AstroPaper loads "Google Sans Code" via Astro Fonts API.
// Here we load the same family via Fontsource (local npm bundle) for
// reliable offline builds — see src/layouts/main.astro imports.
export default defineConfig({
  site: 'https://iofdev.me',
  vite: {
      plugins: [tailwindcss()],
	},

  integrations: [react()],
});