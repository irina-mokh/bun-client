import { configureStore } from '@reduxjs/toolkit';
// import { authReducer } from './auth/reducer';
import mainReducer from './main/reducer';
import categoryReducer from './category/reducer';

export const store = configureStore({
  reducer: {
    main: mainReducer,
    category: categoryReducer,
    // auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
