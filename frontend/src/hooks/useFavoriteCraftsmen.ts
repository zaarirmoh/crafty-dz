import { useCallback, useEffect, useState } from 'react';
import { fetchFavoriteCraftsmen } from '@/api/favorites';
import type { Craftsman } from '@/types';

export const useFavoriteCraftsmen = (ids: string[]) => {
  const [craftsmen, setCraftsmen] = useState<Craftsman[]>([]);
  const [loading, setLoading] = useState(true);

  const key = JSON.stringify(ids);
  const load = useCallback(async () => {
    setLoading(true);
    const list = await fetchFavoriteCraftsmen(JSON.parse(key) as string[]);
    setCraftsmen(list);
    setLoading(false);
  }, [key]);

  useEffect(() => {
    void load();
  }, [load]);

  return { craftsmen, loading };
};
