import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAction, IActionForm } from '../../interfaces/action';
import { ICategoryNew } from '../../interfaces/category';
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

export const deleteCategory = createAsyncThunk(
  'main/deleteCategory',
  async function (id: number, { rejectWithValue }) {
    const url = `category`;
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
  async function (id: number, { rejectWithValue }) {
    try {
      const response = await axiosClient.get(`category?userId=${id}`);
      return response.data;
    } catch (err) {
      console.log('Something went wrong ->', err);
      return rejectWithValue(err);
    }
  }
);

export const createAction = createAsyncThunk(
  'main/createAction',
  async function (action: IActionForm, { rejectWithValue }) {
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
      await axiosClient.patch(url, action);
      return action.id;
    } catch (err) {
      console.log('Something went wrong ->', err);
      return rejectWithValue(err);
    }
  }
);

export const getActions = createAsyncThunk(
  'main/getActions',
  async function (categoryId: number, { rejectWithValue }) {
    try {
      const response = await axiosClient.get(`action?catId=${categoryId}`);
      return response.data;
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
