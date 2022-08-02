import { configureStore, ThunkAction, Action, ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import thunk from 'redux-thunk';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { IState } from '../interfaces/store';

import authReducer from './auth/reducer';
import mainReducer from './main/reducer';

const rootReducers = combineReducers({
  main: mainReducer,
  auth: authReducer,
});

const reducer: typeof rootReducers = (state, action) => {
  let nextState: IState = {
    ...state,
    ...action.payload,
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

    const auth = {
      ...nextState.auth,
    };
    if (state) {
      if (state.auth.user) auth.user = state.auth.user;
      if (state.auth.token) auth.token = state.auth.token;
    }

    nextState.auth = auth;
    nextState.main = main;
    // clear storage
    Object.keys(nextState).forEach((key) => {
      storage.removeItem(`persist:${key}`);
    });
    // now destructor the returned action.payload object and get rid of _persist key
    nextState = (({ _persist, ...rest }) => rest)(action.payload);

    // console.log('___HYDRATE: state ', state);
    // console.log('___HYDRATE: payload ', action.payload);
    // console.log('___HYDRATE: nextState ', nextState);
  }
  return rootReducers(nextState, action);
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['main', 'auth'],
  blacklist: ['_persist'],
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
