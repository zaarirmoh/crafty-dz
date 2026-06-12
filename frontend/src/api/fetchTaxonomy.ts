import type { Category, Region } from '@/types';
import { categories } from '@/data/categories';
import { regions } from '@/data/regions';
import { mockResponse } from '@/lib/mock';

// Reference taxonomy. Static today; will be a real endpoint later.
export const fetchCategories = async (): Promise<Category[]> =>
  mockResponse(categories, 150);

export const fetchRegions = async (): Promise<Region[]> => mockResponse(regions, 150);
