import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAction } from '../../interfaces/action';
import { AnyAction } from '@reduxjs/toolkit';
import { ICategory, ICategoryNew } from '../../interfaces/category';
import { axiosClient } from '../../utils/axios';

export const createCategory = createAsyncThunk(
  'main/createCategory',
  async function (category: ICategoryNew, { rejectWithValue }) {
    const url = `category`;
    try {
      const response = await axiosClient.post(url, category);
      return response.data;
    } catch (err) {
      console.log('Something went wrong ->', err);
      return rejectWithValue(err);
    }
  }
);

export const editCategory = createAsyncThunk(
  'main/editCategoryName',
  async function (cat: ICategory, { rejectWithValue }) {
    const url = `category`;
    try {
      await axiosClient.put(url, cat);
      return cat;
    } catch (err) {
      console.log('Something went wrong ->', err);
      return rejectWithValue(err);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'main/deleteCategory',
  async function (id: number, { rejectWithValue, dispatch }) {
    const url = `category`;

    // delete all actions inside category
    const response: AnyAction = await dispatch(getActions(id));
    const actions = response.payload.data;
    actions.forEach((action: IAction) => {
      if (action.id) {
        dispatch(deleteAction(action.id));
      }
    });

    try {
      await axiosClient.delete(url, { data: { id: id } });
      return id;
    } catch (err) {
      console.log('Something went wrong ->', err);
      return rejectWithValue(err);
    }
  }
);

export const getAllCategories = createAsyncThunk(
  'main/getAllCategories',
  async function (userId: number, { rejectWithValue }) {
    try {
      const response = await axiosClient.get(`category?userId=${userId}`);
      return response.data;
    } catch (err) {
      console.log('Something went wrong ->', err);
      return rejectWithValue(err);
    }
  }
);

export const createAction = createAsyncThunk(
  'main/createAction',
  async function (action: IAction, { rejectWithValue }) {
    const url = `action`;
    try {
      const response = await axiosClient.post(url, action);
      return response.data;
    } catch (err) {
      console.log('Something went wrong ->', err);
      return rejectWithValue(err);
    }
  }
);

export const deleteAction = createAsyncThunk(
  'main/deleteAction',
  async function (id: number, { rejectWithValue }) {
    const url = `action`;

    try {
      await axiosClient.delete(url, { data: { id: id } });
      return id;
    } catch (err) {
      console.log('Something went wrong ->', err);
      return rejectWithValue(err);
    }
  }
);

export const editAction = createAsyncThunk(
  'main/editAction',
  async function (action: IAction, { rejectWithValue }) {
    const url = `action`;
    try {
      await axiosClient.put(url, action);
      return action;
    } catch (err) {
      console.log('Something went wrong ->', err);
      return rejectWithValue(err);
    }
  }
);

export const getActions = createAsyncThunk(
  'main/getActions',
  async function (categoryId: number, { rejectWithValue }) {
    const url = `action${categoryId > 0 ? '?catId=' + categoryId : ''}`;
    try {
      const response = await axiosClient.get(url);
      return { data: response.data, catId: categoryId };
    } catch (err) {
      console.log('Something went wrong ->', err);
      return rejectWithValue(err);
    }
  }
);

export const getAction = createAsyncThunk(
  'main/getAction',
  async function (id: number, { rejectWithValue }) {
    try {
      const response = await axiosClient.get(`action/${id}`);
      return response.data;
    } catch (err) {
      console.log('Something went wrong ->', err);
      return rejectWithValue(err);
    }
  }
);
