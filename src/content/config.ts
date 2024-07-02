// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `type` and `schema` for each collection
const people = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
  }),
});

const recipes = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    author: z.string(),
    tags: z.array(z.string()),
  }),
});
// Export a single `collections` object to register your collection(s)
export const collections = {
  people: people,
  recipes: recipes,
};
