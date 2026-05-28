import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

// 2. Import loader(s)
import { glob } from 'astro/loaders';

const recipes = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/recipes' }),
  schema: z.object({
    title: z.string(),
    tags: z
      .union([z.string(), z.array(z.string())])
      .nullish()
      .transform((value) => {
        if (value == null) return [];
        return Array.isArray(value) ? value : [value];
      }),
    created: z.coerce.date(),
    updated: z.coerce.date().optional(),
    description: z.string().optional(),
  }),
});

export const collections = { recipes };
