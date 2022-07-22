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
  async function (category, { rejectWithValue }) {
    try {
      const response = await axiosClient.get(`/category`);
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
