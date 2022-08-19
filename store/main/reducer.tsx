import { createSlice } from '@reduxjs/toolkit';
import { IMainState } from '../../interfaces/store';

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
  reducers: {},
  extraReducers: {
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
    'main/createCategory/fulfilled': (state, action) => {
      state.categories = [...state.categories, action.payload];
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
