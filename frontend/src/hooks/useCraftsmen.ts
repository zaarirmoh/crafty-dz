import { useCallback, useEffect, useState } from 'react';
import { fetchCraftsmen, type CraftsmenFilters } from '@/api/fetchCraftsmen';
import type { Craftsman } from '@/types';

interface UseCraftsmenReturn {
  craftsmen: Craftsman[];
  total: number;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useCraftsmen = (filters: CraftsmenFilters = {}): UseCraftsmenReturn => {
  const [items, setItems] = useState<Craftsman[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Serialize so the effect re-runs on value changes, not object identity —
  // keeps the dependency array honest without suppression comments.
  const serialized = JSON.stringify(filters);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const parsed = JSON.parse(serialized) as CraftsmenFilters;
      const result = await fetchCraftsmen(parsed);
      setItems(result.items);
      setTotal(result.total);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [serialized]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return { craftsmen: items, total, loading, error, refetch: fetchData };
};
