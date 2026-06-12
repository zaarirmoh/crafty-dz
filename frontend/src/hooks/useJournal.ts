import { useCallback, useEffect, useState } from 'react';
import { fetchJournalPost, fetchJournalPosts } from '@/api/journal';
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

interface UseJournalPostReturn {
  post: JournalPost | null;
  loading: boolean;
  error: string | null;
  notFound: boolean;
}

export const useJournalPost = (slug: string): UseJournalPostReturn => {
  const [post, setPost] = useState<JournalPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setNotFound(false);
      const found = await fetchJournalPost(slug);
      if (!found) {
        setPost(null);
        setNotFound(true);
        return;
      }
      setPost(found);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    void load();
  }, [load]);

  return { post, loading, error, notFound };
};
