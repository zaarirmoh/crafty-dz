import type { RootState } from '@/redux/store';

export const selectLocale = (state: RootState) => state.ui.locale;
export const selectDir = (state: RootState) => state.ui.dir;
