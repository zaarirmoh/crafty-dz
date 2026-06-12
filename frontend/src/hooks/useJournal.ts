import { useCallback, useEffect, useState } from 'react';
import { fetchJournalPosts } from '@/api/journal';
import type { JournalPost } from '@/types';

interface UseJournalReturn {
  posts: JournalPost[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useJournal = (limit?: number): UseJournalReturn => {
  const [posts, setPosts] = useState<JournalPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchJournalPosts(limit);
      setPosts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return { posts, loading, error, refetch: fetchData };
};
