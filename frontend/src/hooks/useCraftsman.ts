import { useCallback, useEffect, useState } from 'react';
import {
  fetchCraftsmanBySlug,
  fetchReviewsByCraftsman,
  fetchWorksByCraftsman,
  type ReviewWithAuthor,
} from '@/api/craftsman';
import type { Craftsman, Work } from '@/types';

interface UseCraftsmanReturn {
  craftsman: Craftsman | null;
  works: Work[];
  reviews: ReviewWithAuthor[];
  loading: boolean;
  error: string | null;
  notFound: boolean;
}

export const useCraftsman = (slug: string): UseCraftsmanReturn => {
  const [craftsman, setCraftsman] = useState<Craftsman | null>(null);
  const [works, setWorks] = useState<Work[]>([]);
  const [reviews, setReviews] = useState<ReviewWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setNotFound(false);
      const found = await fetchCraftsmanBySlug(slug);
      if (!found) {
        setCraftsman(null);
        setWorks([]);
        setReviews([]);
        setNotFound(true);
        return;
      }
      const [w, r] = await Promise.all([
        fetchWorksByCraftsman(found.id),
        fetchReviewsByCraftsman(found.id),
      ]);
      setCraftsman(found);
      setWorks(w);
      setReviews(r);
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

  return { craftsman, works, reviews, loading, error, notFound };
};
