import { defineCollection, z } from 'astro:content';

// 2. Import loader(s)
import { glob } from 'astro/loaders';

const recipes = defineCollection({
  loader: glob({ pattern: "**/*.{json,yml,astro, md, mdx}", base: "./src/content/recipes" }),
});

export const collections = { recipes };
