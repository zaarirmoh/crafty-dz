import type { Region } from '@/types';

// Algerian heritage regions (build prompt Section 1). A craftsman has one
// primary region. Names are resolved via i18n keys.
export const regions: Region[] = [
  { id: 'reg-kabylie', slug: 'kabylie', nameKey: 'regions.kabylie' },
  { id: 'reg-casbah', slug: 'casbah-algiers', nameKey: 'regions.casbah' },
  { id: 'reg-constantine', slug: 'constantine', nameKey: 'regions.constantine' },
  { id: 'reg-mzab', slug: 'mzab-ghardaia', nameKey: 'regions.mzab' },
  { id: 'reg-tlemcen', slug: 'tlemcen', nameKey: 'regions.tlemcen' },
  { id: 'reg-aures', slug: 'aures', nameKey: 'regions.aures' },
  { id: 'reg-oran', slug: 'oran', nameKey: 'regions.oran' },
  { id: 'reg-sahara', slug: 'sahara', nameKey: 'regions.sahara' },
];
