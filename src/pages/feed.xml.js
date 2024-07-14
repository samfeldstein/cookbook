import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { site } from "../../config.mjs";
import { sortCollectionByDate } from "../scripts/utils";

export async function GET() {
  const recipes = await getCollection("recipes");
  sortCollectionByDate(recipes);
  return rss({
    title: `${site.title}`,
    description:
      `${site.description}`,
    site: `${site.url}`,
    items: recipes.map((recipe) => ({
      title: recipe.data.title,
      pubDate: recipe.data.pubDate,
      link: `/recipes/${recipe.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
