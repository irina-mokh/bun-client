import { createSlice } from '@reduxjs/toolkit';
import { IAction } from '../../interfaces/action';
import { getActions } from './action';

export type ICategoryState = {
  error: Error | null,
  isLoading: boolean,
  actions: IAction[] | [],
};

const initialState: ICategoryState = {
  error: null,
  isLoading: false,
  actions: [],
};

export const actionsSlice = createSlice({
  name: 'actions',
  initialState,
  reducers: {
    // removeError: (state) => {
    //   state.error = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getActions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getActions.fulfilled, (state, action) => {
        state.actions = action.payload;
        state.error = null;
      });
  },
});

// export const {  } = categorySlice.actions;

export default actionsSlice.reducer;
