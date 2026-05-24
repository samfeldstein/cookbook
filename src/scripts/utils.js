// Transformations
export function sortCollectionByDate(collection) {
  collection.sort((a, b) => new Date(b.data.created) - new Date(a.data.created));
  return collection;
}