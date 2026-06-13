import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectFavoriteIds } from '@/redux/selectors/favoritesSelector';
import { toggleFavorite as toggleFavoriteAction } from '@/redux/reducers/FavoritesReducer';

export const useFavorites = () => {
  const ids = useAppSelector(selectFavoriteIds);
  const dispatch = useAppDispatch();

  const toggle = useCallback(
    (id: string) => dispatch(toggleFavoriteAction(id)),
    [dispatch],
  );
  const isFavorite = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, toggle, isFavorite };
};
