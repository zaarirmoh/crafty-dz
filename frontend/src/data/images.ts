// Centralized image catalog for the mock data layer (static mode).
// Real, keyword-matched remote photos via loremflickr, made deterministic with a
// `lock` so the same record always renders the same image. Note: Unsplash's
// keyword endpoint (source.unsplash.com) now returns 503, so loremflickr is used
// for craft-relevant imagery. To swap to specific Unsplash photos later, only
// these helpers change — data files import them rather than hardcoding URLs.

/** Deterministic, keyword-matched real photo. */
export const craftImage = (tags: string, lock: number, w = 1200, h = 900): string =>
  `https://loremflickr.com/${w}/${h}/${encodeURIComponent(tags)}?lock=${lock}`;

/** Clean, deterministic initials avatar (DiceBear — always resolves). */
export const avatarFor = (seed: string): string =>
  `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(seed)}`;

/** A gallery of N deterministic images for the same craft tags. */
export const gallery = (tags: string, baseLock: number, count = 4): string[] =>
  Array.from({ length: count }, (_, i) => craftImage(tags, baseLock + i + 1, 900, 700));
