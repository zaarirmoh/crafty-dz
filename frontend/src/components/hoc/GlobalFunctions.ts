// Pure, framework-free helpers shared across pages (build prompt Section 10).
// No React, no hooks, no API calls, no dispatch in this file.
import type { Role } from '@/types';

const DEFAULT_CURRENCY = 'DZD';

/** Format a numeric price for display. Currency lives here, never in components. */
export const formatPrice = (
  amount: number,
  locale = 'en',
  currency = DEFAULT_CURRENCY,
): string =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);

/** Localized long date, e.g. "12 June 2026". */
export const formatDate = (iso: string, locale = 'en'): string =>
  new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(iso));

/** Trim to `max` chars on a word-ish boundary with an ellipsis. */
export const truncate = (text: string, max = 140): string =>
  text.length <= max ? text : `${text.slice(0, max).trimEnd()}…`;

/** Clamp to 0–5 and render with one decimal, e.g. "4.5". */
export const ratingLabel = (rating: number): string =>
  Math.min(5, Math.max(0, rating)).toFixed(1);

/** Map a role to its display label (UI should prefer i18n; this is a fallback). */
export const roleLabel = (role: Role): string =>
  ({ client: 'Client', craftsman: 'Artisan', admin: 'Admin' })[role];

/** URL-safe slug from arbitrary text (strips accents). */
export const slugify = (input: string): string =>
  input
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
