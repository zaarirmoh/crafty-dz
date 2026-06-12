# DzairCraft (crafty-dz) — Frontend Build Prompt

You are building the **frontend** of **DzairCraft** (repo: `crafty-dz`). Read this entire document before writing any code. It is authoritative. Follow the architecture, naming, and layering rules exactly — they are non-negotiable.

---

## 0. Current Scope — STATIC FRONTEND, NO BACKEND YET

There is **no API yet**. This build is **frontend-only with mock data**. This does **not** change the architecture — it changes *where the data comes from*:

- All `api/` functions return **mock data** from `src/data/`, wrapped in a simulated async promise (small `setTimeout` to mimic latency). They keep the exact same signatures, types, and naming they would have against the real backend.
- Auth is **mock auth**: a Redux-driven session that can be set to a `client`, `craftsman`, or `admin` user. No real tokens, no real login request — but keep the `httpClient` interceptor structure in place for later.
- When the real Django REST Framework backend lands, **only the bodies of `api/` functions change**. Components, hooks, redux, routing, and types must not need rewriting.
- Add a small **dev-only role switcher** (a floating widget, only rendered when `import.meta.env.DEV`) so the three role experiences can be previewed without a login flow.

Treat this as a real product build, not a throwaway prototype.

---

## 1. Project Context

**DzairCraft** is a platform that connects people with **master craftsmen ("artisans") who keep traditional Algerian heritage alive** — ceramics, leatherwork, coppersmithing, weaving, silver filigree, woodwork, and fine arts. Think of it as a curated atelier directory + commission marketplace, with an editorial layer.

The platform has **three kinds of users**:

| Role | What they do |
|------|--------------|
| **Client** (and guest) | Browse and discover craftsmen, view profiles and their works, save favorites, read the Journal, and request commissions. |
| **Craftsman (Artisan)** | Has their own back-office ("the Studio") to manage their public profile, post and edit their works, and respond to commission requests. |
| **Admin** | Operates the platform: dashboards & analytics, approving craftsman applications, moderating works and journal content, and managing categories/regions/users. |

**Craft categories** (seed at least these): Ceramics & Pottery, Leather Craft, Copper & Brass, Textiles & Rugs, Silver Filigree, Woodwork, Fine Arts.

**Regions / Origins** (Algerian heritage regions): Kabylie, Casbah (Algiers), Constantine, Mzab (Ghardaïa), Tlemcen, Aurès, Oran, Sahara. A craftsman has one primary region.

The tone is **warm, heritage-respecting, and editorial** — this is about honoring artisanship, not a generic e-commerce grid.

---

## 2. User Roles & Permissions

```
Guest      → public pages only (home, explore, craftsman profiles, collections, journal, login/register)
Client     → everything a guest can do + favorites, commission requests, and the client account area
Craftsman  → their own Studio (profile, works, commissions) — NOT the admin area
Admin      → the full Admin dashboard — NOT the craftsman Studio
```

Role gating is enforced at the **route layer** (see Section 11). A craftsman must be **approved by an admin** before their public profile and works are visible to clients/guests.

---

## 3. Core Features by Area

### Public / Client-facing
- **Home `/`** — hero that opens on the most characteristic thing in this world (a craftsman at work / heritage motif), featured artisans, category entry points, Journal teasers.
- **Explore `/explore`** — the master listing (this is the hero page, matches the reference design): a grid of craftsman cards with a left filter rail (category checkboxes, origin dropdown, minimum-rating slider, commission price min/max) plus sort control and pagination.
- **Craftsman profile `/craftsmen/:slug`** — cover, bio, specialty, region badge, rating & reviews, gallery of works, and a "Request a commission" CTA.
- **Collections `/collections` and `/collections/:slug`** — curated groupings of craftsmen/works around a theme.
- **Journal `/journal` and `/journal/:slug`** — editorial long-form about heritage crafts.
- **Auth `/login`, `/register`** — mock; selecting a role on register is allowed for demo.

### Client area (role: client)
- **`/account`** — saved/favorited artisans, my commission requests with status, profile settings.

### Craftsman Studio (role: craftsman)
- **`/studio`** — overview (profile completeness, recent commission requests, simple stats).
- **`/studio/profile`** — edit public profile (display name, specialty, region, bio, cover image, commission "from" price).
- **`/studio/works`** — list/manage works; **`/studio/works/new`** and **`/studio/works/:id/edit`**.
- **`/studio/commissions`** — incoming commission requests with accept / decline / status updates.

### Admin (role: admin)
- **`/admin`** — overview dashboard (totals: artisans, clients, pending approvals, commissions; simple charts/cards).
- **`/admin/craftsmen`** — manage craftsmen, **approve/reject pending applications**, suspend.
- **`/admin/users`** — manage clients & craftsmen accounts.
- **`/admin/works`** — moderate works.
- **`/admin/journal`** — manage editorial posts.
- **`/admin/taxonomy`** — manage categories & regions.

---

## 4. Domain Model (TypeScript types — define in `src/types/`)

Define strict interfaces for every entity. No `any`. Use union types for enums.

- **`User`** — `id`, `name`, `email`, `role: 'client' | 'craftsman' | 'admin'`, `avatar?`, `locale`.
- **`Craftsman`** — `id`, `userId`, `slug`, `displayName`, `specialty` (e.g. "Master Potter"), `categoryId`, `regionId`, `bio`, `rating` (0–5), `reviewCount`, `commissionFrom` (number), `coverImage`, `gallery: string[]`, `yearsExperience`, `status: 'pending' | 'approved' | 'suspended'`, `featured: boolean`.
- **`Work`** — `id`, `craftsmanId`, `title`, `description`, `images: string[]`, `categoryId`, `price?`, `status: 'draft' | 'published'`, `createdAt`.
- **`Category`** — `id`, `slug`, `nameKey` (i18n key), `icon?`.
- **`Region`** — `id`, `slug`, `nameKey`.
- **`Commission`** — `id`, `clientId`, `craftsmanId`, `workId?`, `message`, `budget?`, `status: 'requested' | 'accepted' | 'in_progress' | 'completed' | 'declined' | 'cancelled'`, `createdAt`.
- **`Review`** — `id`, `clientId`, `craftsmanId`, `rating`, `comment`, `createdAt`.
- **`Favorite`** — `clientId`, `craftsmanId`.
- **`JournalPost`** — `id`, `slug`, `title`, `excerpt`, `body`, `coverImage`, `author`, `categoryId?`, `publishedAt`.
- **`Collection`** — `id`, `slug`, `title`, `description`, `coverImage`, `craftsmanIds: string[]`.

---

## 5. Business Rules (mandatory)

1. **Approval gate** — Only craftsmen with `status: 'approved'` appear in Explore, Collections, search, and on public profiles. Pending/suspended craftsmen are visible **only** in the Admin area (and to themselves in their own Studio).
2. **One category + one region per craftsman** (primary). Works can each have their own category.
3. **Ratings** are 0–5 with one decimal; a craftsman's `rating` is derived from reviews. Display a rating chip on cards and profiles.
4. **Commission price** shows as "From $X" using the craftsman's `commissionFrom`.
5. **Favorites** are client-only. Guests who tap the heart are routed to `/login`.
6. **Commission requests** start as `requested`; the craftsman can `accept`/`decline`, then progress `in_progress → completed`. The client can `cancel` while `requested`.
7. **Role boundaries** — a craftsman cannot reach `/admin/*`; an admin cannot reach `/studio/*`; clients cannot reach either. Enforce in the route guard.
8. **Work publishing** — a work with `status: 'draft'` is not shown publicly; only `published` works appear on the craftsman's public profile.
9. **Featured** craftsmen surface on the Home page.
10. Every price is a number; format for display via a util (don't hardcode currency in components).

---

## 6. Design System

Visual direction: a **warm, editorial heritage** aesthetic — cream paper, espresso ink, blush category tags, and restrained copper/gold accents drawn from the crafts themselves. Cards are calm and generous; the type does the talking. This is the look to match:

### Color tokens (define as CSS variables / Tailwind theme)
```
--background:      #FAF6F0   /* warm cream paper */
--surface:         #FFFFFF   /* cards */
--surface-muted:   #F3ECE2   /* inset fields, rating chips */
--primary:         #3D2C23   /* espresso — buttons, footer */
--primary-hover:   #4D392E
--foreground:      #2B2017   /* headings / ink */
--muted-foreground:#6B5D51   /* body, captions */
--accent:          #B07B4F   /* copper — used sparingly */
--badge:           #F0DAD3   /* blush category tag bg */
--badge-foreground:#6B4A3A
--border:          #EAE1D6   /* hairline rules */
--star:            #2B2017
```
Arabic (RTL) and dark surfaces are not the default; keep the paper-light, espresso-ink identity.

### Typography
- **Display:** `Fraunces` (warm humanist serif) — used for page titles, craftsman names, hero. Restrained, characterful.
- **Body / reading:** `Fraunces` at a text optical size **or** `Newsreader` for descriptions and Journal long-form — keep the editorial serif feel seen in the card copy.
- **Labels / eyebrows / UI:** a clean sans (`Inter`) in **uppercase, letter-spaced** for things like `FILTER RESULTS`, `CATEGORY`, `SORT BY`, badges, and small meta.
- Set a clear type scale. The display face should feel like the brand, not a default.

> Keep to **two families** (Fraunces + Inter). Don't add a third. These are a strong starting recommendation anchored to the reference design — refine weights/scale, but stay in this world.

### Components & feel
- Generous whitespace, hairline `--border` dividers, **subtle** card elevation (soft, not heavy shadows).
- Category tags = blush pill, uppercase, tracked. Rating = small muted pill with a star glyph.
- Espresso buttons with uppercase tracked labels ("VIEW PROFILE", "RESET FILTERS").
- Restrained motion: page-load fade/rise, hover lift on cards, reduced-motion respected.
- Build to a quality floor: responsive down to mobile, visible keyboard focus, real empty/loading/error states.

---

## 7. Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18+ with TypeScript (strict mode) |
| **Build Tool** | Vite |
| **State Management** | Redux Toolkit + Custom Hooks |
| **UI Library** | shadcn/ui (Radix UI primitives) |
| **Styling** | Tailwind CSS |
| **Internationalization** | react-i18next (en, fr, ar — **ar is RTL**) |
| **HTTP Client** | Axios — configured in `utils/httpClient.ts` (present but unused while static) |
| **Data (current)** | **Mock data layer** in `src/data/` (no real API yet) |
| **Real-time** | WebSocket (later — not in static scope) |
| **Code Quality** | ESLint + TypeScript strict mode |

> **i18n note:** Algeria is French/Arabic-first. Provide `fr` and `ar` fully, `en` as the dev default. Arabic must render **RTL** — set `dir` on `<html>` from the active locale and ensure layouts mirror correctly.

---

## 8. Folder Structure

Every file must live in the correct folder. This tree is authoritative — do not invent new top-level folders. (`types/` and `data/` are the additions for this project.)

```
src/
├── api/                  # API functions only — no business logic
│   ├── fetchCraftsmen.ts
│   ├── craftsman.ts
│   ├── works.ts
│   ├── commissions.ts
│   ├── journal.ts
│   ├── collections.ts
│   └── admin/
│       └── stats.ts
├── assets/               # Images, icons, fonts (processed by Vite)
│   ├── images/
│   ├── icons/
│   └── fonts/
├── components/
│   ├── ui/               # shadcn/ui + custom design-system components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── ...
│   └── hoc/              # Layout wrappers and cross-cutting HOCs
│       ├── Wrapper.tsx
│       ├── WrapperByHeaderOnly.tsx
│       ├── DashboardWrapper.tsx
│       └── GlobalFunctions.ts
├── data/                 # MOCK DATA (static mode) — single source until API exists
│   ├── craftsmen.ts
│   ├── works.ts
│   ├── categories.ts
│   ├── regions.ts
│   ├── commissions.ts
│   ├── journal.ts
│   ├── collections.ts
│   └── users.ts
├── hooks/                # Custom React hooks
│   ├── useCraftsmen.ts
│   ├── useCraftsman.ts
│   ├── useDebounce.ts
│   └── useCommissions.ts
├── lib/
│   └── utils.ts          # cn() and other pure utilities
├── locales/              # i18n translation files
│   ├── en/  ├── fr/  └── ar/
│       ├── common.json
│       ├── explore.json
│       ├── studio.json
│       └── admin.json
├── pages/                # Route-level components
│   ├── Home/Home.tsx
│   ├── Explore/Explore.tsx
│   ├── CraftsmanProfile/CraftsmanProfile.tsx
│   ├── Collections/...
│   ├── Journal/...
│   ├── account/...       # client area
│   ├── studio/...        # craftsman area
│   └── admin/...         # admin area
├── redux/                # Global state
│   ├── store.ts
│   ├── reducers/
│   │   ├── AuthReducer.ts
│   │   └── UiReducer.ts
│   └── selectors/
│       ├── authSelector.ts
│       └── uiSelector.ts
├── routes/
│   ├── allroutes.tsx     # Route definitions array
│   └── index.tsx         # Router + role guards
├── types/                # Domain types (Section 4)
│   └── index.ts
└── utils/
    └── httpClient.ts     # Configured Axios instance (idle while static)
```

---

## 9. File Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Components | `PascalCase.tsx` | `CraftsmanCard.tsx` |
| Hooks | `use[Feature].ts` | `useCraftsmen.ts` |
| API functions | `camelCase.ts` | `fetchCraftsmen.ts` |
| Utilities | `camelCase.ts` | `httpClient.ts` |
| Redux slices | `[Feature]Reducer.ts` | `AuthReducer.ts` |
| Selectors | `[feature]Selector.ts` | `authSelector.ts` |
| Folders (multi-word) | `kebab-case` | `craftsman-profile/` |

---

## 10. Layout Wrappers (`components/hoc/`)

Keep the existing two wrappers and add a **role-aware dashboard wrapper** for the Studio and Admin areas.

**`Wrapper.tsx`** — main public/authenticated layout: top navbar + content + error boundary (the marketing/public chrome). Used for Home, Explore, profiles, Collections, Journal, and the client account pages.

**`WrapperByHeaderOnly.tsx`** — minimal layout: navbar only, no extra chrome. Used for auth pages and full-bleed flows.

**`DashboardWrapper.tsx`** — sidebar + topbar shell for back-office areas. It renders a role-appropriate sidebar:
- craftsman → Studio nav (Overview, Profile, Works, Commissions)
- admin → Admin nav (Overview, Craftsmen, Users, Works, Journal, Taxonomy)

Do not recreate layout logic inside page components — pages receive their chrome from the wrapper assigned in `allroutes.tsx`.

**`GlobalFunctions.ts`** — plain TS helpers shared across pages (formatPrice, formatDate, truncate, ratingLabel, roleLabel, slugify). No React, no hooks, no API calls, no dispatch here.

---

## 11. Routing with **role-based** guards (`routes/`)

Extend the route object to carry **role access**. This replaces the binary `protected` flag with proper role gating.

```ts
// routes/allroutes.tsx
import { lazy } from 'react';

export type Role = 'client' | 'craftsman' | 'admin';

export interface AppRoute {
  path: string;
  component: React.LazyExoticComponent<any>;
  /** Roles allowed. Omit/empty = public. */
  roles?: Role[];
  layout: 'default' | 'header-only' | 'dashboard' | 'none';
}

const Explore = lazy(() => import('@/pages/Explore/Explore'));
const Studio = lazy(() => import('@/pages/studio/Overview/Overview'));
const AdminHome = lazy(() => import('@/pages/admin/Overview/Overview'));

const allRoutes: AppRoute[] = [
  { path: '/', component: lazy(() => import('@/pages/Home/Home')), layout: 'default' },
  { path: '/explore', component: Explore, layout: 'default' },
  { path: '/craftsmen/:slug', component: lazy(() => import('@/pages/CraftsmanProfile/CraftsmanProfile')), layout: 'default' },
  { path: '/account', component: lazy(() => import('@/pages/account/Account/Account')), roles: ['client'], layout: 'default' },
  { path: '/studio', component: Studio, roles: ['craftsman'], layout: 'dashboard' },
  { path: '/studio/works', component: lazy(() => import('@/pages/studio/Works/Works')), roles: ['craftsman'], layout: 'dashboard' },
  { path: '/admin', component: AdminHome, roles: ['admin'], layout: 'dashboard' },
  // ...
];

export default allRoutes;
```

```ts
// routes/index.tsx — reads each route, applies layout + role guard.
// - No roles  → public.
// - Has roles → must be authenticated AND user.role ∈ roles, else:
//     not authenticated → redirect to /login
//     wrong role        → redirect to / (or a 403 page)
// Never put auth logic inside page components.
```

> To add a route: add **one** entry to `allroutes.tsx`. Do not modify `index.tsx`.

---

## 12. State Management (`redux/`)

### When to use Redux vs local state (mandatory)

| ✅ Use Redux for… | ❌ Do NOT put in Redux… |
|---|---|
| Authenticated user object & role (mock session) | API/mock response data for a single page |
| Global UI state: locale, theme, dir (rtl/ltr) | Form field values or local form errors |
| Auth status (isAuthenticated) | Modal / sheet open-close state |
| Permissions / role | Loading or error state for a single request |
| Shared notification/toast queue | Data used in only one component |

```ts
// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/AuthReducer';
import uiReducer from './reducers/UiReducer';

export const store = configureStore({
  reducer: { auth: authReducer, ui: uiReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

`AuthReducer` holds the **mock session** (`user`, `isAuthenticated`) plus actions `loginAs(role)` / `logout()` used by the dev role switcher and the mock auth pages. Always read state through selectors (`selectUser`, `selectRole`, `selectIsAuthenticated`) — never inline `state.auth.x` in components.

---

## 13. Mock Data Layer (static mode)

While there is no backend, `api/` functions read from `src/data/` and return promises so hooks/components are written exactly as they will be against the real API.

```ts
// src/lib/mock.ts — helper to simulate latency
export const mockResponse = <T>(data: T, ms = 300): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));
```

```ts
// api/fetchCraftsmen.ts
import type { Craftsman } from '@/types';
import { craftsmen } from '@/data/craftsmen';
import { mockResponse } from '@/lib/mock';

export interface CraftsmenFilters {
  category?: string;
  region?: string;
  minRating?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'rating' | 'price_asc' | 'price_desc';
  page?: number;
}

// Same signature it will have against DRF. Only this body changes later.
export const fetchCraftsmen = async (
  filters: CraftsmenFilters = {}
): Promise<{ items: Craftsman[]; total: number }> => {
  const approved = craftsmen.filter((c) => c.status === 'approved');
  // apply filters/sort/pagination over `approved`…
  return mockResponse({ items: /* filtered */ approved, total: approved.length });
};
```

**Rule:** business logic about *what data exists* lives in `data/`; filtering/shaping for a request lives in the `api/` function; React state lives in the hook. Components never import from `data/` directly — they go through hooks → api.

---

## 14. API Layer Rules (`api/`)

- Each file exports only async functions — no React hooks, no Redux dispatch.
- Naming: `fetchX`, `createX`, `updateX`, `deleteX`.
- Always type both request params and response.
- Use `httpClient` from `utils/httpClient.ts` — never import `axios` directly. (While static, functions read mock data instead, but the file layout and types stay API-ready.)
- Do not catch errors here — let them bubble to the custom hook.

```ts
// utils/httpClient.ts — kept ready for the real backend
import axios from 'axios';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

httpClient.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default httpClient;
```

> No token-refresh logic. On 401 → clear token, redirect to `/login`. Do not add a refresh interceptor.

---

## 15. Custom Hooks (`hooks/`)

- **Do not use React Query or SWR.** All data fetching is custom hooks calling `api/` functions directly.
- Each hook owns its own `loading`, `error`, `data` state and exposes `refetch`.
- Naming: `use[Feature]` / `use[Feature][Action]`.

```ts
// hooks/useCraftsmen.ts
import { useState, useEffect, useCallback } from 'react';
import { fetchCraftsmen, type CraftsmenFilters } from '@/api/fetchCraftsmen';
import type { Craftsman } from '@/types';

interface UseCraftsmenReturn {
  craftsmen: Craftsman[];
  total: number;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useCraftsmen = (filters: CraftsmenFilters): UseCraftsmenReturn => {
  const [craftsmen, setCraftsmen] = useState<Craftsman[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const { items, total } = await fetchCraftsmen(filters);
      setCraftsmen(items);
      setTotal(total);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => { fetchData(); }, [fetchData]);
  return { craftsmen, total, loading, error, refetch: fetchData };
};
```

---

## 16. UI Components (`components/ui/`)

Install/import these shadcn/ui components: **button, input, dialog, card, table, badge, dropdown-menu, select, tabs, toast (or sonner), tooltip, sheet, slider, checkbox, avatar, skeleton, pagination**. Import directly — do not recreate them.

When a needed component isn't in shadcn, create it in `components/ui/` following: functional component + hooks, `forwardRef` for DOM access, export both the component and its `Props` interface from the same file, set `displayName`, style **exclusively** with Tailwind utility classes, and spread `...props` for standard HTML attributes.

Build these project-specific components (in `components/ui/` or feature folders as appropriate): `CraftsmanCard`, `RatingChip`, `CategoryBadge`, `FilterRail`, `SortSelect`, `PriceRangeInput`, `CommissionCTA`, `WorkCard`, `StatCard` (admin), `StatusPill` (commission/craftsman status), `RoleSwitcher` (dev-only).

---

## 17. Internationalization (`locales/`)

- **en** (dev default), **fr**, **ar** — ship all three. Arabic is **RTL**.
- Set `<html dir>` and `lang` from the active locale (store `dir` in the `ui` slice). Verify the Studio/Admin sidebars, Explore filter rail, and cards mirror correctly in RTL.
- Each feature area has its own namespace; always pass the namespace to `useTranslation`.
- **No hardcoded UI strings** — every visible string goes through `t()` and exists in `en/`, `fr/`, and `ar/`.
- Language switch persists to `localStorage` under `'locale'` and updates the `ui` slice.

---

## 18. Adding a New Feature — Step-by-Step

Follow this order exactly; don't merge concerns across layers.

| Step | Layer | What to create |
|---|---|---|
| 1 | `data/` | Add/extend mock records (static mode only) |
| 2 | `api/` | Add `fetchX/createX/updateX/deleteX` (typed; reads mock data) |
| 3 | `redux/` (if needed) | Add a slice only if state is shared across routes |
| 4 | `hooks/` | Create `use[Feature].ts` with loading/error/data/refetch |
| 5 | `components/ui/` | Build reusable sub-components if needed |
| 6 | `pages/` | Create the page under `pages/[FeatureName]/[FeatureName].tsx` |
| 7 | `routes/allroutes.tsx` | Add ONE route object entry (with `roles`/`layout`) — do not touch `index.tsx` |
| 8 | `locales/` | Add translation keys to **en, fr, and ar** |

---

## 19. Import Order (ESLint-enforced)

```ts
// 1. React core
import React, { useState, useEffect } from 'react';
// 2. Third-party libraries
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
// 3. Internal — absolute imports with @/
import { Button } from '@/components/ui/button';
import { useCraftsmen } from '@/hooks/useCraftsmen';
import { fetchCraftsmen } from '@/api/fetchCraftsmen';
import { selectUser } from '@/redux/selectors/authSelector';
// 4. Relative imports (only when unavoidable)
import { helper } from './utils';
```

---

## 20. Performance Rules

- Lazy-load all page components via `React.lazy()` in `allroutes.tsx`.
- `React.memo` for components with stable props that re-render often (e.g. `CraftsmanCard`).
- `useMemo`/`useCallback` for expensive computations and stable callbacks passed as props.
- Never define a component inside another component's render body.
- Complete `useEffect` dependency arrays — no suppression comments.

---

## 21. Recommended Build Order (do this in phases — don't build everything at once)

1. **Foundations:** `types/`, `data/` (seed ~12+ craftsmen across categories/regions, plus works, journal, collections, commissions, users), design tokens + fonts, redux (`auth` mock session + `ui` locale/dir), i18n setup, the three layout wrappers, role-aware router, and the dev `RoleSwitcher`.
2. **Public:** Home → **Explore (priority — match the reference design exactly)** → Craftsman profile → Collections → Journal → mock auth pages.
3. **Client area:** `/account` (favorites, my commissions, settings).
4. **Craftsman Studio:** overview, profile editor, works CRUD (against mock data), commissions inbox.
5. **Admin:** overview/stats, craftsmen approval queue, users, works moderation, journal, taxonomy.
6. **Polish:** RTL pass, responsive down to mobile, empty/loading (skeleton)/error states everywhere, keyboard focus, reduced-motion.

Pause after Phase 1 and Phase 2 so the foundations and the Explore page can be reviewed before going deeper.

---

## 22. Code Review Checklist (verify before submitting any code)

- [ ] File is in the correct folder (Section 8) and named per the conventions (Section 9)
- [ ] Page uses the assigned wrapper — no custom layout logic inside pages
- [ ] New route added ONLY to `allroutes.tsx`, with correct `roles` + `layout`
- [ ] Role boundaries enforced in the guard (craftsman ≠ admin ≠ client)
- [ ] Redux used only for auth/global UI — not for page-local data
- [ ] Selectors used to read Redux — no inline `state.x.y` in components
- [ ] Components go through `hooks/ → api/` — they never import from `data/` directly
- [ ] `api/` functions are typed, named `fetchX/createX/...`, use `httpClient` shape (mock body ok), don't catch errors
- [ ] Custom hook wraps all data access — no fetch/axios in components; React Query/SWR not used
- [ ] Only **approved** craftsmen appear in public views
- [ ] All UI strings use `t()` and exist in **en, fr, ar**; RTL verified for `ar`
- [ ] TypeScript strict — no `any`, all interfaces defined
- [ ] All pages lazy-loaded; no component defined inside another's render body
- [ ] Empty / loading / error states present
- [ ] ESLint passes with zero errors

*End of build prompt.*
