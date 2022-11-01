// actions.tsx is for async actions
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';
import { INewUser } from '../../interfaces/user';
import { axiosClient } from '../../utils/axios';

interface KnownErr {
  message: string;
}
export const createUser = createAsyncThunk(
  'auth/createUser',
  async function (user: INewUser, { rejectWithValue }) {
    const url = `user/registration`;
    try {
      const response = await axiosClient.post(url, user);
      return response.data;
    } catch (err) {
      console.log('Something went wrong ->', err);
      return rejectWithValue(err);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async function (user: INewUser, { rejectWithValue }) {
    const url = `user/login`;
    try {
      const response = await axiosClient.post(url, user);
      return response.data;
    } catch (err) {
      console.log('Something went wrong ->', err);
      return rejectWithValue('Invalid email or password');
    }
  }
);
