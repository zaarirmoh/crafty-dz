import type { Collection, Craftsman } from '@/types';
import { collections } from '@/data/collections';
import { craftsmen } from '@/data/craftsmen';
import { mockResponse } from '@/lib/mock';

export const fetchCollections = async (): Promise<Collection[]> => mockResponse(collections);

export interface CollectionWithCraftsmen {
  collection: Collection;
  craftsmen: Craftsman[];
}

export const fetchCollectionBySlug = async (
  slug: string,
): Promise<CollectionWithCraftsmen | null> => {
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) return mockResponse(null);
  // Only approved craftsmen are public (approval gate, Section 5.1).
  const members = craftsmen.filter(
    (c) => collection.craftsmanIds.includes(c.id) && c.status === 'approved',
  );
  return mockResponse({ collection, craftsmen: members });
};
