import {
  Flame,
  Gem,
  Hammer,
  Palette,
  Scissors,
  Shirt,
  TreePine,
  type LucideIcon,
} from 'lucide-react';

// Category slug → lucide icon. Explicit map (tree-shakeable, guaranteed to exist)
// rather than resolving the icon-name strings stored on the data records.
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  'ceramics-pottery': Flame,
  'leather-craft': Scissors,
  'copper-brass': Hammer,
  'textiles-rugs': Shirt,
  'silver-filigree': Gem,
  woodwork: TreePine,
  'fine-arts': Palette,
};

export const categoryIcon = (slug: string): LucideIcon => CATEGORY_ICONS[slug] ?? Palette;
