import type { Commission } from '@/types';

// Commission requests (Section 5.6). Several target the demo craftsman (craft-1)
// so the Studio inbox has content, and several belong to the demo client
// (user-client-amel) so the client account area is populated.
export const commissions: Commission[] = [
  {
    id: 'comm-1',
    clientId: 'user-client-amel',
    craftsmanId: 'craft-2',
    message: 'Could you make an engraved copper tray, around 40cm, for a wedding gift?',
    budget: 20000,
    status: 'requested',
    createdAt: '2026-06-01',
  },
  {
    id: 'comm-2',
    clientId: 'user-client-amel',
    craftsmanId: 'craft-1',
    workId: 'work-1',
    message: 'I’d love a water jar like your Berber piece, in a slightly taller form.',
    budget: 16000,
    status: 'accepted',
    createdAt: '2026-05-20',
  },
  {
    id: 'comm-3',
    clientId: 'user-client-omar',
    craftsmanId: 'craft-1',
    message: 'Set of tagine bowls for a restaurant — six to start, possibly more.',
    budget: 12000,
    status: 'requested',
    createdAt: '2026-06-08',
  },
  {
    id: 'comm-4',
    clientId: 'user-client-sara',
    craftsmanId: 'craft-1',
    message: 'A ceremonial storage vessel for a museum display.',
    budget: 30000,
    status: 'in_progress',
    createdAt: '2026-04-28',
  },
  {
    id: 'comm-5',
    clientId: 'user-client-amel',
    craftsmanId: 'craft-5',
    workId: 'work-9',
    message: 'A filigree pendant with a green stone instead of coral, please.',
    budget: 22000,
    status: 'completed',
    createdAt: '2026-03-15',
  },
  {
    id: 'comm-6',
    clientId: 'user-client-omar',
    craftsmanId: 'craft-1',
    message: 'Looking for 50 identical mugs by next week.',
    status: 'declined',
    createdAt: '2026-05-02',
  },
];
