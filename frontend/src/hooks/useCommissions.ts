import { useCallback, useEffect, useState } from 'react';
import {
  fetchClientCommissions,
  fetchCraftsmanCommissions,
  type CommissionWithClient,
  type CommissionWithCraftsman,
} from '@/api/commissions';

export const useClientCommissions = (clientId: string) => {
  const [commissions, setCommissions] = useState<CommissionWithCraftsman[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setCommissions(await fetchClientCommissions(clientId));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    void load();
  }, [load]);

  return { commissions, loading, error };
};

export const useCraftsmanCommissions = (craftsmanId: string) => {
  const [commissions, setCommissions] = useState<CommissionWithClient[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setCommissions(craftsmanId ? await fetchCraftsmanCommissions(craftsmanId) : []);
    setLoading(false);
  }, [craftsmanId]);

  useEffect(() => {
    void load();
  }, [load]);

  return { commissions, loading };
};
