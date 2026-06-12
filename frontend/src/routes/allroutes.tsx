import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

export type Role = 'client' | 'craftsman' | 'admin';

export interface AppRoute {
  path: string;
  component: LazyExoticComponent<ComponentType>;
  /** Roles allowed. Omit/empty = public. */
  roles?: Role[];
  layout: 'default' | 'header-only' | 'dashboard' | 'none';
}

// The single source of routes. To add a route, add ONE entry here — never edit
// routes/index.tsx. Every page is lazy-loaded (build prompt Section 20).
const allRoutes: AppRoute[] = [
  // ── Public ────────────────────────────────────────────────────────────────
  { path: '/', component: lazy(() => import('@/pages/Home/Home')), layout: 'default' },
  { path: '/explore', component: lazy(() => import('@/pages/Explore/Explore')), layout: 'default' },
  {
    path: '/craftsmen/:slug',
    component: lazy(() => import('@/pages/CraftsmanProfile/CraftsmanProfile')),
    layout: 'default',
  },
  {
    path: '/collections',
    component: lazy(() => import('@/pages/Collections/Collections')),
    layout: 'default',
  },
  {
    path: '/collections/:slug',
    component: lazy(() => import('@/pages/Collections/CollectionDetail')),
    layout: 'default',
  },
  { path: '/journal', component: lazy(() => import('@/pages/Journal/Journal')), layout: 'default' },
  {
    path: '/journal/:slug',
    component: lazy(() => import('@/pages/Journal/JournalPost')),
    layout: 'default',
  },
  { path: '/login', component: lazy(() => import('@/pages/auth/Login')), layout: 'header-only' },
  {
    path: '/register',
    component: lazy(() => import('@/pages/auth/Register')),
    layout: 'header-only',
  },

  // ── Client ────────────────────────────────────────────────────────────────
  {
    path: '/account',
    component: lazy(() => import('@/pages/account/Account/Account')),
    roles: ['client'],
    layout: 'default',
  },

  // ── Craftsman Studio ──────────────────────────────────────────────────────
  {
    path: '/studio',
    component: lazy(() => import('@/pages/studio/Overview/Overview')),
    roles: ['craftsman'],
    layout: 'dashboard',
  },
  {
    path: '/studio/profile',
    component: lazy(() => import('@/pages/studio/Profile/Profile')),
    roles: ['craftsman'],
    layout: 'dashboard',
  },
  {
    path: '/studio/works',
    component: lazy(() => import('@/pages/studio/Works/Works')),
    roles: ['craftsman'],
    layout: 'dashboard',
  },
  {
    path: '/studio/works/new',
    component: lazy(() => import('@/pages/studio/WorkForm/WorkForm')),
    roles: ['craftsman'],
    layout: 'dashboard',
  },
  {
    path: '/studio/works/:id/edit',
    component: lazy(() => import('@/pages/studio/WorkForm/WorkForm')),
    roles: ['craftsman'],
    layout: 'dashboard',
  },
  {
    path: '/studio/commissions',
    component: lazy(() => import('@/pages/studio/Commissions/Commissions')),
    roles: ['craftsman'],
    layout: 'dashboard',
  },

  // ── Admin ─────────────────────────────────────────────────────────────────
  {
    path: '/admin',
    component: lazy(() => import('@/pages/admin/Overview/Overview')),
    roles: ['admin'],
    layout: 'dashboard',
  },
  {
    path: '/admin/craftsmen',
    component: lazy(() => import('@/pages/admin/Craftsmen/Craftsmen')),
    roles: ['admin'],
    layout: 'dashboard',
  },
  {
    path: '/admin/users',
    component: lazy(() => import('@/pages/admin/Users/Users')),
    roles: ['admin'],
    layout: 'dashboard',
  },
  {
    path: '/admin/works',
    component: lazy(() => import('@/pages/admin/Works/Works')),
    roles: ['admin'],
    layout: 'dashboard',
  },
  {
    path: '/admin/journal',
    component: lazy(() => import('@/pages/admin/Journal/Journal')),
    roles: ['admin'],
    layout: 'dashboard',
  },
  {
    path: '/admin/taxonomy',
    component: lazy(() => import('@/pages/admin/Taxonomy/Taxonomy')),
    roles: ['admin'],
    layout: 'dashboard',
  },

  // ── Fallback ──────────────────────────────────────────────────────────────
  { path: '*', component: lazy(() => import('@/pages/NotFound/NotFound')), layout: 'default' },
];

export default allRoutes;
