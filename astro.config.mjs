import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://our-family-cookbook.netlify.app",
  prefetch: {
    prefetchAll: true,
  }
});
