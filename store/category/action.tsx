import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../utils/axios';

export const createAction = createAsyncThunk(
  'category/createAction',
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
  'category/getActions',
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
  'category/getAction',
  async function (id: number, { rejectWithValue }) {
    try {
      const response = await axiosClient.get(`action/=${id}`);
      return response.data;
    } catch (err) {
      console.log('Something went wrong ->', err);
      return rejectWithValue(err);
    }
  }
);
