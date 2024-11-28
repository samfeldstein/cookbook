import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://ourfamilywebsite.netlify.app",
  prefetch: {
    prefetchAll: true,
  }
});
