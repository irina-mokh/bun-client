import { createSlice } from '@reduxjs/toolkit';
import { ICategory } from '../../interfaces/category';
import { createCategory, getAllCategories } from './action';
import { HYDRATE } from 'next-redux-wrapper';

export type IMainState = {
  error: string | null,
  isLoading: boolean,
  categories: ICategory[] | [],
};

const initialState: IMainState = {
  error: null,
  isLoading: false,
  categories: [],
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    // rehydrate(state, action) {
    //   return action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.error = String(action.payload);
      });
  },
});

// export const {  } = mainSlice.actions;

export default mainSlice.reducer;
