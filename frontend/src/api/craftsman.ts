import type { Craftsman, Review, Work } from '@/types';
import { findCraftsmanBySlug } from '@/data/craftsmen';
import { works } from '@/data/works';
import { reviews } from '@/data/reviews';
import { findUser } from '@/data/users';
import { mockResponse } from '@/lib/mock';

/** A review joined with its author's display info (resolved in the api layer). */
export interface ReviewWithAuthor extends Review {
  authorName: string;
  authorAvatar?: string;
}

export const fetchCraftsmanBySlug = async (slug: string): Promise<Craftsman | null> => {
  const found = findCraftsmanBySlug(slug);
  // Approval gate (Section 5.1): public profile only for approved craftsmen.
  return mockResponse(found && found.status === 'approved' ? found : null);
};

export const fetchWorksByCraftsman = async (craftsmanId: string): Promise<Work[]> => {
  // Only published works appear publicly (Section 5.8).
  const list = works.filter((w) => w.craftsmanId === craftsmanId && w.status === 'published');
  return mockResponse(list);
};

export const fetchReviewsByCraftsman = async (
  craftsmanId: string,
): Promise<ReviewWithAuthor[]> => {
  const list = reviews
    .filter((r) => r.craftsmanId === craftsmanId)
    .map((r) => {
      const author = findUser(r.clientId);
      return { ...r, authorName: author?.name ?? 'Client', authorAvatar: author?.avatar };
    });
  return mockResponse(list);
};
