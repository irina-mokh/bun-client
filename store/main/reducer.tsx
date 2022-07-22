import { createSlice } from '@reduxjs/toolkit';
import { ICategory } from '../../interfaces/category';
import { createCategory, getAllCategories } from './action';

export type IAuthState = {
  error: Error | null,
  isLoading: boolean,
  categories: ICategory[] | [],
};

const initialState: IAuthState = {
  error: null,
  isLoading: false,
  categories: [],
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    // removeError: (state) => {
    //   state.error = null;
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
      });
  },
});

// export const {  } = categorySlice.actions;

export default mainSlice.reducer;
