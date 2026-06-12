import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Locale } from '@/types';

// Global UI state: active locale and text direction (build prompt Sections 12, 17).
// Arabic renders RTL; the active locale persists to localStorage under 'locale'.
type Dir = 'ltr' | 'rtl';

interface UiState {
  locale: Locale;
  dir: Dir;
}

const STORAGE_KEY = 'locale';

const isLocale = (value: string | null): value is Locale =>
  value === 'en' || value === 'fr' || value === 'ar';

const dirFor = (locale: Locale): Dir => (locale === 'ar' ? 'rtl' : 'ltr');

const stored =
  typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
const initialLocale: Locale = isLocale(stored) ? stored : 'en';

const initialState: UiState = {
  locale: initialLocale,
  dir: dirFor(initialLocale),
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLocale(state, action: PayloadAction<Locale>) {
      state.locale = action.payload;
      state.dir = dirFor(action.payload);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, action.payload);
      }
    },
  },
});

export const { setLocale } = uiSlice.actions;
export default uiSlice.reducer;
