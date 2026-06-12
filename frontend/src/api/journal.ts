import type { JournalPost } from '@/types';
import { journalPosts } from '@/data/journal';
import { mockResponse } from '@/lib/mock';

const byNewest = (a: JournalPost, b: JournalPost): number =>
  a.publishedAt < b.publishedAt ? 1 : -1;

export const fetchJournalPosts = async (limit?: number): Promise<JournalPost[]> => {
  const sorted = [...journalPosts].sort(byNewest);
  return mockResponse(typeof limit === 'number' ? sorted.slice(0, limit) : sorted);
};

export const fetchJournalPost = async (slug: string): Promise<JournalPost | null> => {
  const post = journalPosts.find((p) => p.slug === slug) ?? null;
  return mockResponse(post);
};
