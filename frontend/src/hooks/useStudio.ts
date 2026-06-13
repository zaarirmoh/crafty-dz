import { useCallback, useEffect, useState } from 'react';
import { fetchMyCraftsman, fetchMyWorks, fetchWorkById } from '@/api/studio';
import type { Craftsman, Work } from '@/types';

export const useMyCraftsman = (userId: string) => {
  const [craftsman, setCraftsman] = useState<Craftsman | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setCraftsman(userId ? await fetchMyCraftsman(userId) : null);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    void load();
  }, [load]);

  return { craftsman, loading };
};

export const useMyWorks = (craftsmanId: string) => {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setWorks(craftsmanId ? await fetchMyWorks(craftsmanId) : []);
    setLoading(false);
  }, [craftsmanId]);

  useEffect(() => {
    void load();
  }, [load]);

  return { works, loading };
};

export const useWork = (id: string) => {
  const [work, setWork] = useState<Work | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setWork(id ? await fetchWorkById(id) : null);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  return { work, loading };
};
