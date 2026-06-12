import type { Category } from '@/types';

// Seven craft categories (build prompt Section 1). `icon` holds a lucide-react
// icon name; the UI maps it to a component with a safe fallback.
export const categories: Category[] = [
  { id: 'cat-ceramics', slug: 'ceramics-pottery', nameKey: 'categories.ceramics', icon: 'Amphora' },
  { id: 'cat-leather', slug: 'leather-craft', nameKey: 'categories.leather', icon: 'Wallet' },
  { id: 'cat-copper', slug: 'copper-brass', nameKey: 'categories.copper', icon: 'CookingPot' },
  { id: 'cat-textiles', slug: 'textiles-rugs', nameKey: 'categories.textiles', icon: 'Layers' },
  { id: 'cat-filigree', slug: 'silver-filigree', nameKey: 'categories.filigree', icon: 'Gem' },
  { id: 'cat-woodwork', slug: 'woodwork', nameKey: 'categories.woodwork', icon: 'TreePine' },
  { id: 'cat-finearts', slug: 'fine-arts', nameKey: 'categories.fineArts', icon: 'Palette' },
];
