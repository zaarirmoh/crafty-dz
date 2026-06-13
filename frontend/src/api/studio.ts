import type { Craftsman, Work } from '@/types';
import { craftsmen } from '@/data/craftsmen';
import { works } from '@/data/works';
import { mockResponse } from '@/lib/mock';

/** The craftsman record belonging to the signed-in studio user. */
export const fetchMyCraftsman = async (userId: string): Promise<Craftsman | null> =>
  mockResponse(craftsmen.find((c) => c.userId === userId) ?? null);

/** All of a craftsman's works — draft + published (the Studio sees both). */
export const fetchMyWorks = async (craftsmanId: string): Promise<Work[]> =>
  mockResponse(works.filter((w) => w.craftsmanId === craftsmanId));

export const fetchWorkById = async (id: string): Promise<Work | null> =>
  mockResponse(works.find((w) => w.id === id) ?? null);
