import type { JournalPost } from '@/types';
import { craftImage } from './images';

// Editorial long-form about heritage crafts (Section 3, public Journal).
export const journalPosts: JournalPost[] = [
  {
    id: 'post-1',
    slug: 'fire-and-earth-kabyle-pottery',
    title: 'Fire and Earth: The Unglazed Pottery of Kabylie',
    excerpt: 'How pit-fired earthenware carries a coded language of protective symbols down the female line.',
    body: 'In the villages above Tizi Ouzou, pottery has never been a wheel-thrown trade. It is hand-built, coil by coil, by women who learned the gestures from their mothers.\n\nThe motifs are not decoration. Each diamond, comb and zigzag belongs to a vocabulary of protection and fertility, painted in slip before the pit fire blackens and fixes it.',
    coverImage: craftImage('pottery,ceramics', 1401),
    author: 'Yasmina Aït Saïd',
    categoryId: 'cat-ceramics',
    publishedAt: '2026-03-04',
  },
  {
    id: 'post-2',
    slug: 'the-copper-souk-of-constantine',
    title: 'The Copper Souk of Constantine',
    excerpt: 'A morning among the hammers of the Rue des Cuivres, where sound is the measure of a good tray.',
    body: 'You hear the copper market before you see it. The ring of a hundred hammers sets a rhythm that the smiths say tells them when the metal is work-hardened enough.\n\nBrahim Cherif has kept his father’s stall for thirty years. He still tins each ewer by hand over a charcoal flame.',
    coverImage: craftImage('copper,brass,metal', 1402),
    author: 'Nadia Cherifi',
    categoryId: 'cat-copper',
    publishedAt: '2026-04-18',
  },
  {
    id: 'post-3',
    slug: 'reading-an-aures-rug',
    title: 'How to Read an Aurès Rug',
    excerpt: 'The diamonds, hooks and combs of Chaoui weaving are a written record of a weaver’s life.',
    body: 'A rug from the Aurès is not designed in advance. It grows from the bottom of the loom, and the weaver improvises within an inherited grammar.\n\nMadder gives the deep red; walnut husk the brown; the ivory is the wool’s own colour, left undyed.',
    coverImage: craftImage('rug,textile,weaving', 1403),
    author: 'Naïma Boukhalfa',
    categoryId: 'cat-textiles',
    publishedAt: '2026-05-09',
  },
  {
    id: 'post-4',
    slug: 'silver-lace-of-the-casbah',
    title: 'Silver Lace: Filigree in the Casbah',
    excerpt: 'Inside a workshop where Ottoman-era techniques are being taught to a new generation.',
    body: 'Filigree is patience made visible. Fine silver is drawn into thread, twisted, then soldered into open lacework that seems impossibly light.\n\nFarida Belkacem now teaches three apprentices, determined that the craft will outlast her.',
    coverImage: craftImage('silver,jewelry,filigree', 1404),
    author: 'Nadia Cherifi',
    categoryId: 'cat-filigree',
    publishedAt: '2026-05-27',
  },
];
