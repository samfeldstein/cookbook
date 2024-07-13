// Transformations
export function sortCollectionByDate(collection) {
  collection.sort((a, b) => new Date(b.data.pubDate) - new Date(a.data.pubDate));
  return collection;
}