import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/AuthReducer';
import uiReducer from './reducers/UiReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
