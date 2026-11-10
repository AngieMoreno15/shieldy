export type FavoriteChangeListener = () => void;

let favoriteIds: ReadonlySet<string> = new Set();
const listeners = new Set<FavoriteChangeListener>();

export function getFavoriteDestinationIds(): ReadonlySet<string> {
  return favoriteIds;
}

export function subscribeToFavoriteDestinations(
  listener: FavoriteChangeListener,
): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function toggleFavoriteDestination(id: string): void {
  const updatedIds = new Set(favoriteIds);

  if (updatedIds.has(id)) {
    updatedIds.delete(id);
  } else {
    updatedIds.add(id);
  }

  favoriteIds = updatedIds;
  listeners.forEach((listener) => listener());
}
