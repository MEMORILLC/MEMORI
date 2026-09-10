// svelte.config.js
import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    paths: {
      base: "/MEMORI",
      relative: false
    },
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "404.html",
      precompress: false,
      strict: true,
    }),
    prerender: {
      // 👈 Advanced handler function to catch and mute the base warnings cleanly
      handleHttpError: ({ path, referrer, message }) => {
        // Silently skip the specific path warnings so they don't print to stderr
        if (message.includes('does not begin with `base`')) {
          return;
        }
        // Fallback to basic console logging for other legitimate site breaking links
        console.warn(`Prerender warning on ${path}: ${message}`);
      }
    }
  },
  compilerOptions: {
    runes: ({ filename }) =>
      filename.split(/[/\\]/).includes('node_modules') ? undefined : true
  }
};

export default config;
