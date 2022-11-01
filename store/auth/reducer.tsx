import { createSlice } from '@reduxjs/toolkit';
import { createUser, login } from './actions';
import { IAuthState } from '../../interfaces/store';

const initialState: IAuthState = {
  user: null,
  error: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = null;
      state.user = null;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = String(action.payload);
      })

      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = String(action.payload);
      });
  },
});

export const { logOut, setError } = authSlice.actions;

export default authSlice.reducer;
