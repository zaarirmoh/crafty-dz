import type { RootState } from '@/redux/store';

export const selectFavoriteIds = (state: RootState) => state.favorites.ids;
