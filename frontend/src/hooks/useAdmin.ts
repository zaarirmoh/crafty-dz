import { useEffect, useState } from 'react';
import { fetchAdminStats, type AdminStats } from '@/api/admin/stats';
import {
  fetchAllCraftsmen,
  fetchAllUsers,
  fetchAllWorks,
  type WorkWithCraftsman,
} from '@/api/admin/management';
import type { Craftsman, User } from '@/types';

export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    fetchAdminStats().then((data) => {
      if (active) {
        setStats(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);
  return { stats, loading };
};

export const useAllCraftsmen = () => {
  const [craftsmen, setCraftsmen] = useState<Craftsman[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    fetchAllCraftsmen().then((data) => {
      if (active) {
        setCraftsmen(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);
  return { craftsmen, loading };
};

export const useAllUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    fetchAllUsers().then((data) => {
      if (active) {
        setUsers(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);
  return { users, loading };
};

export const useAllWorks = () => {
  const [works, setWorks] = useState<WorkWithCraftsman[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    fetchAllWorks().then((data) => {
      if (active) {
        setWorks(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);
  return { works, loading };
};
