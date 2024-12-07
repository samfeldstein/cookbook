import { defineCollection, z } from 'astro:content';

// 2. Import loader(s)
import { glob} from 'astro/loaders';

const recipes = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/recipes" }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).optional(),
    ingredients: z.array(z.string()),
    directions: z.array(z.string())
  }),
});

export const collections = { recipes };
