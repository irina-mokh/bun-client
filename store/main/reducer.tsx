import { createSlice, current } from '@reduxjs/toolkit';
import { IAction } from '../../interfaces/action';
import { ICategory } from '../../interfaces/category';
import { IMainState } from '../../interfaces/store';

const initialState: IMainState = {
  error: null,
  isLoading: false,
  categories: [],
  actions: [],
  period: new Date().toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit' }),
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setPeriod: (state, action) => {
      state.period = action.payload;
    },
    //update client totals of categories after creating/deleting action
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
      state.actions = [];
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
      const { data, catId } = action.payload;
      state.actions = data;
      state.error = null;
      state.isLoading = false;

      const { categories, period } = state;
      const cat = categories.filter((cat) => cat.id === catId)[0];
      const index = categories.findIndex((item) => item.id === catId);
      let catTotal = cat.type == 'asset' ? cat.total : 0;
      if (cat.type == 'asset') {
        data.forEach((act: IAction) => {
          // include all acts by date before current period
          if (new Date(act.date) <= new Date(period)) {
            if (act.from === catId) {
              catTotal -= Number(act.sum);
            } else {
              catTotal += Number(act.sum);
            }
          }
        });
        // for assets and expenses
      } else {
        // include only dates of current period
        data.forEach((act: IAction) => {
          if (act.date.slice(0, 7) == period) {
            catTotal += Number(act.sum);
          }
        });
      }
      state.categories[index].total = catTotal;
    },
    'main/getAction/pending': (state) => {
      state.isLoading = true;
      state.error = null;
    },
    'main/getAction/fulfilled': (state) => {
      state.error = null;
      state.isLoading = false;
    },
    'main/createAction/pending': (state) => {
      state.isLoading = true;
      state.error = null;
    },
    'main/createAction/fulfilled': (state, action) => {
      state.error = null;
      state.isLoading = false;
      const cur = action.payload;
      updateTotals({
        from: cur.from,
        to: cur.to,
        sum: cur.sum,
      });
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

export const { updateTotals, setPeriod } = mainSlice.actions;

export default mainSlice.reducer;
