import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://cookbook.samfeldstein.xyz/",
  prefetch: {
    prefetchAll: true,
  }
});
