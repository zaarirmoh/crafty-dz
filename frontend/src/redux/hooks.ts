import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';

// Pre-typed hooks — components use these instead of the untyped react-redux ones.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
