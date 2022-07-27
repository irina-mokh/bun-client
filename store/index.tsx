import { configureStore, ThunkAction, Action, AnyAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { diff } from 'jsondiffpatch';

// import { authReducer } from './auth/reducer';
import mainReducer from './main/reducer';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

const rootReducers = combineReducers({
  main: mainReducer,
  // auth: authReducer,
});

const reducer = (state: ReturnType<typeof rootReducers>, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    // preserve state
    const main = {
      ...nextState.main,
    };
    if (state.main.categories.length) main.categories = state.main.categories;
    if (state.main.actions.length) main.actions = state.main.actions;
    nextState.main = main;

    console.log('___HYDRATE: state ', state);
    console.log('___HYDRATE: payload ', action.payload);
    console.log('___HYDRATE: nextState ', nextState);
    return nextState;
  } else {
    return rootReducers(state, action);
  }
};

const makeStore = () =>
  configureStore({
    reducer,
  });

type Store = ReturnType<typeof makeStore>;
export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper(makeStore, { debug: true });
