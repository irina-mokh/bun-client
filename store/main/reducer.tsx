import { createSlice, current } from '@reduxjs/toolkit';
import { ICategory } from '../../interfaces/category';
import { IMainState } from '../../interfaces/store';

const initialState: IMainState = {
  error: null,
  isLoading: false,
  categories: [],
  actions: [],
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    //update totals of categories after creating/deleting action
    updateTotals: (state, action) => {
      const { categories } = current(state);
      //clone state to mutate
      const clone: Array<ICategory> = JSON.parse(JSON.stringify(categories));
      // convert strings to numbers
      const sum = +action.payload.sum;
      const from = +action.payload.from;
      const to = +action.payload.to;

      const newCategories = clone.map((cat: ICategory) => {
        switch (cat.id) {
          case from:
            if (cat.type === 'income') {
              cat.total += sum;
            } else {
              cat.total -= sum;
            }
            break;
          case to:
            cat.total += sum;
            break;
        }
        return cat;
      });
      state.categories = newCategories;
    },
  },
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
    'main/deleteCategory/fulfilled': (state, { payload: id }) => {
      const { categories } = state;
      state.categories = [...categories.filter((item) => item.id !== id)];
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
    'main/getAction/fulfilled': (state) => {
      state.error = null;
      state.isLoading = false;
    },
    'main/deleteAction/pending': (state) => {
      state.isLoading = true;
      state.error = null;
    },
    'main/deleteAction/fulfilled': (state, { payload: id }) => {
      const { actions } = state;
      state.actions = [...actions.filter((item) => item.id !== id)];
    },
    'main/editAction/fulfilled': (state, action) => {
      const index = state.actions.findIndex((item) => item.id == action.payload.id);
      state.actions[index] = action.payload;
    },
  },
});

export const { updateTotals } = mainSlice.actions;

export default mainSlice.reducer;
