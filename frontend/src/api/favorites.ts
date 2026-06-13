import type { Craftsman } from '@/types';
import { craftsmen } from '@/data/craftsmen';
import { mockResponse } from '@/lib/mock';

export const fetchFavoriteCraftsmen = async (ids: string[]): Promise<Craftsman[]> => {
  // Keep approved-only (a favorited artisan could later be suspended).
  const list = craftsmen.filter((c) => ids.includes(c.id) && c.status === 'approved');
  return mockResponse(list);
};
