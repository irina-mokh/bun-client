import { configureStore, ThunkAction, Action, ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import thunk from 'redux-thunk';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { IState } from '../interfaces/store';

// import { authReducer } from './auth/reducer';
import mainReducer from './main/reducer';

const rootReducers = combineReducers({
  main: mainReducer,
  // auth: authReducer,
});

const reducer: typeof rootReducers = (state, action) => {
  const nextState: IState = {
    ...state, // use previous state
    ...action.payload, // apply delta from hydration
  };
  if (action.type === HYDRATE) {
    // preserve state
    const main = {
      ...nextState.main,
    };
    if (state) {
      if (state.main.categories.length) main.categories = state.main.categories;
      if (state.main.actions.length) main.actions = state.main.actions;
    }
    nextState.main = main;

    // console.log('___HYDRATE: state ', state);
    // console.log('___HYDRATE: payload ', action.payload);
    // console.log('___HYDRATE: nextState ', nextState);
  }
  return rootReducers(nextState, action);
};

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['main'],
};
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

const makeStore = () => store;

export type AppDispatch = typeof store.dispatch;
export type RootState = typeof store.getState;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppThunkDispatch = ThunkDispatch<IState, void, AnyAction>;

export const wrapper = createWrapper(makeStore);
