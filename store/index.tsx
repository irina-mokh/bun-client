import { configureStore, ThunkAction, Action, ThunkDispatch, AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { combineReducers, Reducer } from 'redux';

import thunk from 'redux-thunk';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { persistStore, persistReducer, PersistConfig, Persistor } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { IState } from '../interfaces/store';

import authReducer from './auth/reducer';
import mainReducer from './main/reducer';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const rootReducers = combineReducers<IState>({
  main: mainReducer,
  auth: authReducer,
});

const reducer = (state: IState, action: AnyAction) => {
  // console.log(state);
  const nextState: IState = {
    ...state,
  };
  if (action.type === HYDRATE) {
    // preserve state
    const main = {
      ...nextState.main,
    };

    const auth = {
      ...nextState.auth,
    };

    main.categories =
      state.main.categories.length > 0 ? state.main.categories : action.payload.main.categories;
    main.actions = state.main.actions.length > 0 ? state.main.actions : action.payload.main.actions;

    auth.user = state.auth.user ? state.auth.user : action.payload.auth.user;
    auth.token = state.auth.token ? state.auth.token : action.payload.auth.token;

    // console.log('auth:', auth);
    // console.log('main:', main);
    nextState.auth = auth;
    nextState.main = main;

    // console.log('___HYDRATE: state ', state);
    // console.log('___HYDRATE: payload ', action.payload);
    // console.log('___HYDRATE: nextState ', nextState);

    // clear storage
    // Object.keys(nextState).forEach((key) => {
    //   storage.removeItem(`persist:${key}`);
    // });
    // now destructor the returned action.payload object and get rid of _persist key
    // nextState = (({ _persist, ...rest }) => rest)(nextState);
  }
  return rootReducers(nextState, action);
};

const persistConfig: PersistConfig<IState> = {
  key: 'root',
  storage,
  whitelist: ['main', 'auth'],
  blacklist: ['_persist'],
  stateReconciler: autoMergeLevel2,
};
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor: Persistor = persistStore(store);

const makeStore = () => store;

export type AppDispatch = typeof store.dispatch;
export type RootReducer = ReturnType<typeof rootReducers>;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppThunkDispatch = ThunkDispatch<IState, void, AnyAction>;

export const wrapper = createWrapper(makeStore);
