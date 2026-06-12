import { useCallback, useEffect, useState } from 'react';
import {
  fetchCollectionBySlug,
  fetchCollections,
  type CollectionWithCraftsmen,
} from '@/api/collections';
import type { Collection } from '@/types';

interface UseCollectionsReturn {
  collections: Collection[];
  loading: boolean;
  error: string | null;
}

export const useCollections = (): UseCollectionsReturn => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetchCollections()
      .then((data) => {
        if (!active) return;
        setCollections(data);
        setError(null);
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : 'An error occurred');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { collections, loading, error };
};

interface UseCollectionReturn {
  data: CollectionWithCraftsmen | null;
  loading: boolean;
  error: string | null;
  notFound: boolean;
}

export const useCollection = (slug: string): UseCollectionReturn => {
  const [data, setData] = useState<CollectionWithCraftsmen | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setNotFound(false);
      const result = await fetchCollectionBySlug(slug);
      if (!result) {
        setData(null);
        setNotFound(true);
        return;
      }
      setData(result);
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

  return { data, loading, error, notFound };
};
