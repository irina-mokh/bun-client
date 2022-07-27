import { createSlice } from '@reduxjs/toolkit';
import { ICategory } from '../../interfaces/category';

import { HYDRATE } from 'next-redux-wrapper';
import { diff } from 'jsondiffpatch';
import { IAction } from '../../interfaces/action';

export type IMainState = {
  error: string | null,
  isLoading: boolean,
  categories: ICategory[] | [],
  actions: IAction[] | [],
  action: IAction | null,
};

const initialState: IMainState = {
  error: null,
  isLoading: false,
  categories: [],
  actions: [],
  action: null,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setEnt(state, action) {
      return action.payload;
    },
  },
  extraReducers: {
    // [HYDRATE]: (state, action) => {
    //   for (const prop in state) {
    //     state.prop = prop ? prop : action.payload.prop;
    //   }
    //   const nextState = {
    //     ...state,
    //   };
    //   console.log('___HYDRATE: state ', state);
    //   console.log('___HYDRATE: payload ', action.payload);
    //   console.log('___HYDRATE: nextState ', nextState);

    //   return nextState;
    // },
    'main/getAllCategories/pending': (state) => {
      state.isLoading = true;
      state.error = null;
    },
    'main/getAllCategories/fulfilled': (state, action) => {
      state.categories = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    'main/getAllCategories/rejected': (state, action) => {
      state.error = String(action.payload);
      state.isLoading = false;
    },

    //ACTIONS
    'main/getActions/pending': (state) => {
      state.isLoading = true;
      state.error = null;
    },
    'main/getActions/fulfilled': (state, action) => {
      state.actions = action.payload;
      state.error = null;
      state.isLoading = false;
    },

    'main/getAction/pending': (state) => {
      state.isLoading = true;
      state.error = null;
    },
    'main/getAction/fulfilled': (state, action) => {
      state.transaction = action.payload;
      state.error = null;
      state.isLoading = false;
    },
  },
});

// export const {  } = mainSlice.actions;

export default mainSlice.reducer;
