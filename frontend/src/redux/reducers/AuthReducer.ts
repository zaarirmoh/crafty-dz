import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Role, User } from '@/types';
import { demoUsers } from '@/data/users';

// Mock session (build prompt Section 12). No real tokens — `loginAs(role)` picks a
// representative demo user; the dev RoleSwitcher and mock auth pages dispatch these.
// The chosen role is persisted so a reload keeps the previewed experience.
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const STORAGE_KEY = 'authRole';

const isRole = (value: string | null): value is Role =>
  value === 'client' || value === 'craftsman' || value === 'admin';

const storedRole =
  typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
const initialUser: User | null = isRole(storedRole) ? demoUsers[storedRole] : null;

const initialState: AuthState = {
  user: initialUser,
  isAuthenticated: initialUser !== null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAs(state, action: PayloadAction<Role>) {
      state.user = demoUsers[action.payload];
      state.isAuthenticated = true;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, action.payload);
      }
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }
    },
  },
});

export const { loginAs, logout } = authSlice.actions;
export default authSlice.reducer;
