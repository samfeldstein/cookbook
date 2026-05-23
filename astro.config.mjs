import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://cookbook.samfeldstein.xyz",
  server: { host: true },
  prefetch: {
    prefetchAll: true,
  }
});
