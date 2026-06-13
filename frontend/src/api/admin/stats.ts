import { craftsmen } from '@/data/craftsmen';
import { users } from '@/data/users';
import { commissions } from '@/data/commissions';
import { mockResponse } from '@/lib/mock';

export interface AdminStats {
  artisans: number;
  clients: number;
  pendingApprovals: number;
  commissions: number;
}

export const fetchAdminStats = async (): Promise<AdminStats> => {
  return mockResponse({
    artisans: craftsmen.filter((c) => c.status === 'approved').length,
    clients: users.filter((u) => u.role === 'client').length,
    pendingApprovals: craftsmen.filter((c) => c.status === 'pending').length,
    commissions: commissions.length,
  });
};
