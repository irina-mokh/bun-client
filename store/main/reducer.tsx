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
    //update category total by period
    updateTotalByPeriod: (state, { payload }) => {
      const { categories, period, actions } = state;
      const id = payload;
      const categoriesCopy = [...categories.filter((cat) => cat.id == id)];
      const cat = categoriesCopy[0];
      const index = categories.findIndex((item) => item.id === id);
      let catTotal = cat.type == 'asset' ? cat.start : 0;
      const data = actions.filter((act) => act.from == id || act.to == id);
      // count totals depending on period
      if (cat.type == 'asset') {
        data.forEach((act: IAction) => {
          //  for assets
          // include all acts by date BEFORE including current period
          if (new Date(act.date.slice(0, 7)) <= new Date(period)) {
            if (act.from === id) {
              catTotal -= Number(act.sum);
            } else {
              catTotal += Number(act.sum);
            }
          }
        });
      } else {
        // for incomes and expenses
        // include only dates of current period
        data.forEach((act: IAction) => {
          if (act.date.slice(0, 7) == period) {
            catTotal += Number(act.sum);
          }
        });
      }
      state.categories[index].total = catTotal;
      console.log('upd total', id);
    },
    //update client totals of categories after creating/deleting action
    // updateTotals: (state, action) => {
    //   console.log('upd totals', action.payload);
    //   const { categories } = current(state);
    //   //clone state to mutate
    //   const clone: Array<ICategory> = JSON.parse(JSON.stringify(categories));
    //   // convert strings to numbers
    //   const sum = +action.payload.sum;
    //   const from = +action.payload.from;
    //   const to = +action.payload.to;

    //   const newCategories = clone.map((cat: ICategory) => {
    //     switch (cat.id) {
    //       case from:
    //         if (cat.type === 'income') {
    //           cat.total += sum;
    //         } else {
    //           cat.total -= sum;
    //         }
    //         break;
    //       case to:
    //         cat.total += sum;
    //         break;
    //     }
    //     return cat;
    //   });
    //   state.categories = newCategories;
    // },
  },
  extraReducers: {
    // CATEGORIES
    'main/getAllCategories/pending': (state) => {
      state.isLoading = true;
      state.error = null;
    },
    'main/getAllCategories/fulfilled': (state, action) => {
      state.categories = action.payload;
      state.actions = [];
      state.error = null;
      state.isLoading = false;
      console.log('getAllCategories fulfilled');
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
      const { data } = action.payload;
      state.actions = data;
      state.error = null;
      state.isLoading = false;
      console.log('getActions fulfilled');
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
      const newAction = action.payload;
      // const cur = action.payload;
      state.actions = [...state.actions, newAction];
      // updateTotals({
      //   from: cur.from,
      //   to: cur.to,
      //   sum: cur.sum,
      // });
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

export const { setPeriod, updateTotalByPeriod } = mainSlice.actions;

export default mainSlice.reducer;
