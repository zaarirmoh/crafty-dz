import type { Craftsman, User, Work } from '@/types';
import { craftsmen } from '@/data/craftsmen';
import { users } from '@/data/users';
import { works } from '@/data/works';
import { mockResponse } from '@/lib/mock';

// Admin sees every craftsman regardless of status (pending/suspended included).
export const fetchAllCraftsmen = async (): Promise<Craftsman[]> => mockResponse(craftsmen);

export const fetchAllUsers = async (): Promise<User[]> => mockResponse(users);

export interface WorkWithCraftsman extends Work {
  craftsmanName: string;
}

export const fetchAllWorks = async (): Promise<WorkWithCraftsman[]> => {
  const list = works.map((w) => {
    const craftsman = craftsmen.find((c) => c.id === w.craftsmanId);
    return { ...w, craftsmanName: craftsman?.displayName ?? '—' };
  });
  return mockResponse(list);
};
