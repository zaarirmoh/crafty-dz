// Domain model for DzairCraft — see build prompt Section 4.
// Strict types only; no `any`. Enums are expressed as string unions.

export type Role = 'client' | 'craftsman' | 'admin';
export type Locale = 'en' | 'fr' | 'ar';

export type CraftsmanStatus = 'pending' | 'approved' | 'suspended';
export type WorkStatus = 'draft' | 'published';
export type CommissionStatus =
  | 'requested'
  | 'accepted'
  | 'in_progress'
  | 'completed'
  | 'declined'
  | 'cancelled';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  locale: Locale;
}

export interface Craftsman {
  id: string;
  userId: string;
  slug: string;
  displayName: string;
  /** e.g. "Master Potter" */
  specialty: string;
  categoryId: string;
  regionId: string;
  bio: string;
  /** 0–5, one decimal — derived from reviews. */
  rating: number;
  reviewCount: number;
  commissionFrom: number;
  coverImage: string;
  gallery: string[];
  yearsExperience: number;
  status: CraftsmanStatus;
  featured: boolean;
}

export interface Work {
  id: string;
  craftsmanId: string;
  title: string;
  description: string;
  images: string[];
  categoryId: string;
  price?: number;
  status: WorkStatus;
  /** ISO date string */
  createdAt: string;
}

export interface Category {
  id: string;
  slug: string;
  /** i18n key */
  nameKey: string;
  icon?: string;
}

export interface Region {
  id: string;
  slug: string;
  /** i18n key */
  nameKey: string;
}

export interface Commission {
  id: string;
  clientId: string;
  craftsmanId: string;
  workId?: string;
  message: string;
  budget?: number;
  status: CommissionStatus;
  /** ISO date string */
  createdAt: string;
}

export interface Review {
  id: string;
  clientId: string;
  craftsmanId: string;
  rating: number;
  comment: string;
  /** ISO date string */
  createdAt: string;
}

export interface Favorite {
  clientId: string;
  craftsmanId: string;
}

export interface JournalPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string;
  author: string;
  categoryId?: string;
  /** ISO date string */
  publishedAt: string;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  craftsmanIds: string[];
}
