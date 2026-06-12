import { useCallback, useEffect, useState } from 'react';
import { fetchCategories, fetchRegions } from '@/api/fetchTaxonomy';
import type { Category, Region } from '@/types';

interface UseTaxonomyReturn {
  categories: Category[];
  regions: Region[];
  loading: boolean;
  error: string | null;
  /** id → i18n nameKey */
  categoryName: (id: string) => string | undefined;
  regionName: (id: string) => string | undefined;
}

/** Loads the category + region taxonomy once and exposes id→nameKey lookups. */
export const useTaxonomy = (): UseTaxonomyReturn => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void (async () => {
      try {
        setLoading(true);
        const [cats, regs] = await Promise.all([fetchCategories(), fetchRegions()]);
        if (!active) return;
        setCategories(cats);
        setRegions(regs);
        setError(null);
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const categoryName = useCallback(
    (id: string) => categories.find((c) => c.id === id)?.nameKey,
    [categories],
  );
  const regionName = useCallback(
    (id: string) => regions.find((r) => r.id === id)?.nameKey,
    [regions],
  );

  return { categories, regions, loading, error, categoryName, regionName };
};
