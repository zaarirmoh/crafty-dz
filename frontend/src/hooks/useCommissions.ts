import { useCallback, useEffect, useState } from 'react';
import { fetchClientCommissions, type CommissionWithCraftsman } from '@/api/commissions';

export const useClientCommissions = (clientId: string) => {
  const [commissions, setCommissions] = useState<CommissionWithCraftsman[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const list = await fetchClientCommissions(clientId);
      setCommissions(list);
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
