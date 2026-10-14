// svelte.config.js
import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const basePath = process.env.CUSTOM_DOMAIN ? "" : "/MEMORI";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    paths: {
      base: basePath,
      relative: false
    },
    adapter: adapter({
      routes: {
        exclude: [
          "<all>",
          `${basePath}/gallery/*.webp`,
          `${basePath}/logos/*.webp`
        ]
      }
    }),
    prerender: {
      // 👈 Advanced handler function to catch and mute the base warnings cleanly
      handleHttpError: ({ path, message }) => {
        // Silently skip the specific path warnings so they don't print to stderr
        if (message.includes('does not begin with `base`')) {
          return;
        }
        // Fallback to basic console logging for other legitimate site breaking links
        globalThis.console.warn(`Prerender warning on ${path}: ${message}`);
      }
    }
  },
  compilerOptions: {
    runes: ({ filename }) =>
      filename.split(/[/\\]/).includes('node_modules') ? undefined : true
  }
};

export default config;
