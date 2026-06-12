import type { RootState } from '@/redux/store';

// Always read auth state through these selectors — never inline state.auth.x.
export const selectUser = (state: RootState) => state.auth.user;
export const selectRole = (state: RootState) => state.auth.user?.role ?? null;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
