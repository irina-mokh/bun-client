import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';

// import { authReducer } from './auth/reducer';
import mainReducer from './main/reducer';
import categoryReducer from './category/reducer';
import { createWrapper } from 'next-redux-wrapper';

export function makeStore() {
  return configureStore({
    reducer: {
      main: mainReducer,
      category: categoryReducer,
      // auth: authReducer,
    },
  });
}

export const store = makeStore();

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper(makeStore, { debug: true });
