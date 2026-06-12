import type { Work } from '@/types';
import { craftImage } from './images';

// Works belong to a craftsman and each carry their own category (Section 5.2).
// Mix of `published` (public) and `draft` (Studio-only, Section 5.8).
export const works: Work[] = [
  // craft-1 — Yasmina Aït Saïd (demo craftsman): 3 published + 1 draft
  {
    id: 'work-1',
    craftsmanId: 'craft-1',
    title: 'Berber Water Jar',
    description: 'Hand-coiled and burnished earthenware jar with Kabyle diamond banding, fired in an open pit.',
    images: [craftImage('pottery,jar', 111), craftImage('pottery,clay', 112)],
    categoryId: 'cat-ceramics',
    price: 14000,
    status: 'published',
    createdAt: '2026-01-12',
  },
  {
    id: 'work-2',
    craftsmanId: 'craft-1',
    title: 'Set of Six Tagine Bowls',
    description: 'Matched serving bowls in natural slip with a band of triangular motifs.',
    images: [craftImage('pottery,bowl', 113)],
    categoryId: 'cat-ceramics',
    price: 11000,
    status: 'published',
    createdAt: '2026-02-03',
  },
  {
    id: 'work-3',
    craftsmanId: 'craft-1',
    title: 'Wedding Storage Vessel',
    description: 'Large ceremonial vessel painted with protective symbols, commissioned for Kabyle weddings.',
    images: [craftImage('pottery,ceramics,vase', 114)],
    categoryId: 'cat-ceramics',
    price: 26000,
    status: 'published',
    createdAt: '2026-03-19',
  },
  {
    id: 'work-4',
    craftsmanId: 'craft-1',
    title: 'Oil Lamp Study (unfinished)',
    description: 'Prototype reproduction of an antique oil lamp — still refining the spout.',
    images: [craftImage('pottery,clay', 115)],
    categoryId: 'cat-ceramics',
    status: 'draft',
    createdAt: '2026-05-28',
  },

  // craft-2 — Brahim Cherif
  {
    id: 'work-5',
    craftsmanId: 'craft-2',
    title: 'Engraved Copper Tray',
    description: 'Round serving tray chased with a central rosette and Kufic border.',
    images: [craftImage('copper,tray', 211), craftImage('copper,brass', 212)],
    categoryId: 'cat-copper',
    price: 19000,
    status: 'published',
    createdAt: '2026-02-21',
  },
  {
    id: 'work-6',
    craftsmanId: 'craft-2',
    title: 'Tinned Copper Ewer',
    description: 'Spouted ewer with hand-tinned interior, for the traditional washing ritual.',
    images: [craftImage('copper,ewer,metal', 213)],
    categoryId: 'cat-copper',
    price: 23000,
    status: 'published',
    createdAt: '2026-04-06',
  },

  // craft-3 — Naïma Boukhalfa
  {
    id: 'work-7',
    craftsmanId: 'craft-3',
    title: 'Aurès Diamond Rug',
    description: 'Hand-knotted wool rug, 2×3 m, in madder red with ivory diamond lattice.',
    images: [craftImage('rug,carpet', 311), craftImage('rug,textile', 312)],
    categoryId: 'cat-textiles',
    price: 64000,
    status: 'published',
    createdAt: '2026-01-30',
  },
  {
    id: 'work-8',
    craftsmanId: 'craft-3',
    title: 'Wool Floor Cushion',
    description: 'Flat-woven cushion cover with matching geometric bands.',
    images: [craftImage('textile,cushion,wool', 313)],
    categoryId: 'cat-textiles',
    price: 9000,
    status: 'published',
    createdAt: '2026-03-11',
  },

  // craft-5 — Farida Belkacem
  {
    id: 'work-9',
    craftsmanId: 'craft-5',
    title: 'Filigree Pendant',
    description: 'Silver filigree pendant with a central coral cabochon.',
    images: [craftImage('silver,jewelry,pendant', 511)],
    categoryId: 'cat-filigree',
    price: 21000,
    status: 'published',
    createdAt: '2026-02-14',
  },
  {
    id: 'work-10',
    craftsmanId: 'craft-5',
    title: 'Bridal Fibula Pair',
    description: 'A pair of triangular fibulae joined by a chain, worn to fasten ceremonial dress.',
    images: [craftImage('silver,jewelry', 512), craftImage('silver,filigree', 513)],
    categoryId: 'cat-filigree',
    price: 48000,
    status: 'published',
    createdAt: '2026-04-22',
  },
  {
    id: 'work-11',
    craftsmanId: 'craft-5',
    title: 'Filigree Earrings (draft)',
    description: 'New lightweight earring design, photographing next week.',
    images: [craftImage('silver,earrings', 514)],
    categoryId: 'cat-filigree',
    status: 'draft',
    createdAt: '2026-05-30',
  },

  // craft-4 — Slimane Haddad
  {
    id: 'work-12',
    craftsmanId: 'craft-4',
    title: 'Hand-Stitched Satchel',
    description: 'Vegetable-tanned leather satchel with saddle-stitched seams and a brass buckle.',
    images: [craftImage('leather,bag,satchel', 411)],
    categoryId: 'cat-leather',
    price: 17000,
    status: 'published',
    createdAt: '2026-03-02',
  },

  // craft-6 — Karim Ould Ali
  {
    id: 'work-13',
    craftsmanId: 'craft-6',
    title: 'Carved Juniper Chest',
    description: 'Dowry chest carved with Mozabite rosettes, finished in natural wax.',
    images: [craftImage('woodwork,chest,carving', 611)],
    categoryId: 'cat-woodwork',
    price: 39000,
    status: 'published',
    createdAt: '2026-02-27',
  },

  // craft-13 — Tarek Benhamou (suspended): work stays hidden publicly anyway
  {
    id: 'work-14',
    craftsmanId: 'craft-13',
    title: 'Olive-Wood Bowl',
    description: 'Turned olive-wood bowl — listing under review.',
    images: [craftImage('woodwork,bowl,olive', 1311)],
    categoryId: 'cat-woodwork',
    status: 'draft',
    createdAt: '2026-04-15',
  },
];
