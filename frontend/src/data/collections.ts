import type { Collection } from '@/types';
import { craftImage } from './images';

// Curated groupings of craftsmen around a theme (Section 3, public Collections).
// craftsmanIds reference only approved craftsmen so collections stay public-safe.
export const collections: Collection[] = [
  {
    id: 'col-1',
    slug: 'masters-of-the-kabyle-hills',
    title: 'Masters of the Kabyle Hills',
    description: 'Potters and carvers keeping the mountain traditions of Kabylie alive.',
    coverImage: craftImage('pottery,ceramics', 1501),
    craftsmanIds: ['craft-1', 'craft-6'],
  },
  {
    id: 'col-2',
    slug: 'the-copper-route',
    title: 'The Copper Route',
    description: 'From Constantine to Oran, the metalsmiths who work copper and brass by hand.',
    coverImage: craftImage('copper,brass,metal', 1502),
    craftsmanIds: ['craft-2', 'craft-10'],
  },
  {
    id: 'col-3',
    slug: 'threads-of-the-south',
    title: 'Threads of the South',
    description: 'Weavers of the Aurès and the Sahara, and the wool that crosses the desert.',
    coverImage: craftImage('rug,textile,weaving', 1503),
    craftsmanIds: ['craft-3', 'craft-9'],
  },
];
