import type { Craftsman } from '@/types';
import { craftsmen } from '@/data/craftsmen';
import { mockResponse } from '@/lib/mock';

// Same signature this will keep against the real DRF backend — only the body
// changes later (build prompt Section 13).
export interface CraftsmenFilters {
  /** category id (single) */
  category?: string;
  /** category ids (multi-select, e.g. Explore checkboxes) */
  categories?: string[];
  /** region id */
  region?: string;
  minRating?: number;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  /** free-text search over name / specialty / bio */
  q?: string;
  sort?: 'rating' | 'price_asc' | 'price_desc';
  page?: number;
  pageSize?: number;
}

export interface CraftsmenResult {
  items: Craftsman[];
  total: number;
}

export const fetchCraftsmen = async (
  filters: CraftsmenFilters = {},
): Promise<CraftsmenResult> => {
  const {
    category,
    categories,
    region,
    minRating,
    minPrice,
    maxPrice,
    featured,
    q,
    sort,
    page = 1,
    pageSize = 9,
  } = filters;

  // Approval gate (Section 5.1): only approved craftsmen are ever public.
  let items = craftsmen.filter((c) => c.status === 'approved');

  if (category) items = items.filter((c) => c.categoryId === category);
  if (categories && categories.length > 0) {
    items = items.filter((c) => categories.includes(c.categoryId));
  }
  if (region) items = items.filter((c) => c.regionId === region);
  if (typeof minRating === 'number') items = items.filter((c) => c.rating >= minRating);
  if (typeof minPrice === 'number') items = items.filter((c) => c.commissionFrom >= minPrice);
  if (typeof maxPrice === 'number') items = items.filter((c) => c.commissionFrom <= maxPrice);
  if (featured) items = items.filter((c) => c.featured);
  if (q) {
    const needle = q.trim().toLowerCase();
    items = items.filter(
      (c) =>
        c.displayName.toLowerCase().includes(needle) ||
        c.specialty.toLowerCase().includes(needle) ||
        c.bio.toLowerCase().includes(needle),
    );
  }

  switch (sort) {
    case 'rating':
      items = [...items].sort((a, b) => b.rating - a.rating);
      break;
    case 'price_asc':
      items = [...items].sort((a, b) => a.commissionFrom - b.commissionFrom);
      break;
    case 'price_desc':
      items = [...items].sort((a, b) => b.commissionFrom - a.commissionFrom);
      break;
  }

  const total = items.length;
  const start = (page - 1) * pageSize;
  const paged = items.slice(start, start + pageSize);

  return mockResponse({ items: paged, total });
};
