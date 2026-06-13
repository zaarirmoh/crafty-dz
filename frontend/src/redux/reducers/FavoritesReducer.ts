import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { favoriteIdsFor } from '@/data/favorites';

// The client's saved-artisan set — shared across cards and the account area, so it
// lives in redux. Persisted to localStorage so it survives reloads in the demo.
const STORAGE_KEY = 'favorites';

const readInitial = (): string[] => {
  if (typeof localStorage === 'undefined') return favoriteIdsFor('user-client-amel');
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed as string[];
    } catch {
      /* ignore malformed storage */
    }
  }
  return favoriteIdsFor('user-client-amel');
};

const persist = (ids: string[]) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }
};

interface FavoritesState {
  ids: string[];
}

const initialState: FavoritesState = { ids: readInitial() };

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.ids = state.ids.includes(id)
        ? state.ids.filter((x) => x !== id)
        : [...state.ids, id];
      persist(state.ids);
    },
    setFavorites(state, action: PayloadAction<string[]>) {
      state.ids = action.payload;
      persist(state.ids);
    },
  },
});

export const { toggleFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
