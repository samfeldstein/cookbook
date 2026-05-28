import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://cookbook.samfeldstein.xyz",
  server: { host: true },
  prefetch: {
    prefetchAll: true,
  },
  integrations: [
    mdx(),
  ],
});
