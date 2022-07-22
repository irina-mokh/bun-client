import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../utils/axios';

export const createAction = createAsyncThunk(
  'category/createAction',
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

export const getActions = createAsyncThunk(
  'category/getActions',
  async function (categoryId: number, { rejectWithValue }) {
    try {
      const response = await axiosClient.get(`/action?catId=${categoryId}`);
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
