import type { Favorite } from '@/types';

// Seed favorites for the demo client (user-client-amel). Favorites are client-only
// (build prompt Section 5.5); the live set is held in the favorites redux slice.
export const favorites: Favorite[] = [
  { clientId: 'user-client-amel', craftsmanId: 'craft-1' },
  { clientId: 'user-client-amel', craftsmanId: 'craft-3' },
  { clientId: 'user-client-amel', craftsmanId: 'craft-5' },
];

export const favoriteIdsFor = (clientId: string): string[] =>
  favorites.filter((f) => f.clientId === clientId).map((f) => f.craftsmanId);
