import type { Review } from '@/types';

// Reviews drive a craftsman's derived rating/reviewCount (build prompt Section 5.3).
export const reviews: Review[] = [
  // craft-1 — Yasmina Aït Saïd
  { id: 'rev-1', clientId: 'user-client-amel', craftsmanId: 'craft-1', rating: 5, comment: 'The water jar is extraordinary — the burnishing catches the light beautifully.', createdAt: '2026-04-10' },
  { id: 'rev-2', clientId: 'user-client-omar', craftsmanId: 'craft-1', rating: 5, comment: 'Communicative throughout and the bowls arrived perfectly packed.', createdAt: '2026-03-22' },
  { id: 'rev-3', clientId: 'user-client-sara', craftsmanId: 'craft-1', rating: 4, comment: 'A genuine heirloom piece. Took a little longer than expected, well worth it.', createdAt: '2026-02-15' },

  // craft-2 — Brahim Cherif
  { id: 'rev-4', clientId: 'user-client-amel', craftsmanId: 'craft-2', rating: 5, comment: 'The engraving on the tray is impossibly fine. A master at work.', createdAt: '2026-04-02' },
  { id: 'rev-5', clientId: 'user-client-sara', craftsmanId: 'craft-2', rating: 4, comment: 'Beautiful ewer, exactly as pictured.', createdAt: '2026-01-28' },

  // craft-3 — Naïma Boukhalfa
  { id: 'rev-6', clientId: 'user-client-omar', craftsmanId: 'craft-3', rating: 5, comment: 'The rug is the centrepiece of our home now. The reds are so deep.', createdAt: '2026-03-30' },
  { id: 'rev-7', clientId: 'user-client-amel', craftsmanId: 'craft-3', rating: 5, comment: 'Worth every dinar. You can feel the hours in it.', createdAt: '2026-02-11' },

  // craft-5 — Farida Belkacem
  { id: 'rev-8', clientId: 'user-client-sara', craftsmanId: 'craft-5', rating: 5, comment: 'The filigree pendant is delicate and stunning. Shipped quickly too.', createdAt: '2026-04-18' },
  { id: 'rev-9', clientId: 'user-client-omar', craftsmanId: 'craft-5', rating: 5, comment: 'A bridal pair for my sister — she was moved to tears.', createdAt: '2026-03-05' },
];

export const reviewsForCraftsman = (craftsmanId: string): Review[] =>
  reviews.filter((r) => r.craftsmanId === craftsmanId);
