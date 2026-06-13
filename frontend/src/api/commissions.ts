import type { Commission } from '@/types';
import { commissions } from '@/data/commissions';
import { craftsmen } from '@/data/craftsmen';
import { findUser } from '@/data/users';
import { mockResponse } from '@/lib/mock';

/** A commission joined with its craftsman's display info (resolved in the api). */
export interface CommissionWithCraftsman extends Commission {
  craftsmanName: string;
  craftsmanSlug: string;
}

const enrich = (commission: Commission): CommissionWithCraftsman => {
  const craftsman = craftsmen.find((c) => c.id === commission.craftsmanId);
  return {
    ...commission,
    craftsmanName: craftsman?.displayName ?? '—',
    craftsmanSlug: craftsman?.slug ?? '',
  };
};

export const fetchClientCommissions = async (
  clientId: string,
): Promise<CommissionWithCraftsman[]> => {
  const list = commissions.filter((c) => c.clientId === clientId).map(enrich);
  return mockResponse(list);
};

/** A commission joined with its client's display info (for the Studio inbox). */
export interface CommissionWithClient extends Commission {
  clientName: string;
  clientAvatar?: string;
}

export const fetchCraftsmanCommissions = async (
  craftsmanId: string,
): Promise<CommissionWithClient[]> => {
  const list = commissions
    .filter((c) => c.craftsmanId === craftsmanId)
    .map((c) => {
      const client = findUser(c.clientId);
      return { ...c, clientName: client?.name ?? 'Client', clientAvatar: client?.avatar };
    });
  return mockResponse(list);
};
