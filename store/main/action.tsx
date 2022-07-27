import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../utils/axios';

export const createCategory = createAsyncThunk(
  'main/createCategory',
  async function (category, { rejectWithValue }) {
    const url = `category`;
    try {
      const response = await axiosClient.post(url, category);
      if (response.status !== 201) {
        throw new Error('error');
      } else {
        return response.data;
      }
    } catch (err) {
      console.log('Something went wrong ->', err);
      return rejectWithValue(err);
    }
  }
);

export const getAllCategories = createAsyncThunk(
  'main/getAllCategories',
  async function (id, { rejectWithValue }) {
    try {
      const response = await axiosClient.get(`category`);
      return response.data;
    } catch (err) {
      console.log('Something went wrong ->', err);
      return rejectWithValue(err);
    }
  }
);

export const createAction = createAsyncThunk(
  'main/createAction',
  async function (category, { rejectWithValue }) {
    const url = `action`;
    try {
      const response = await axiosClient.post(url, category);
      return response.data;
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
