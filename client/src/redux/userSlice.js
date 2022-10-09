import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPro } from './CONSTANTS.js';

export const getAllUsersThunk = createAsyncThunk(
  'users/getAllUsersThunk',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosPro.get('users');
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    isLoading: false,
    users: [],
    user: {},
    err: false,
  },
  reducers: {},
  extraReducers: {
    [getAllUsersThunk.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllUsersThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload.data.users;
      state.err = false;
    },
    [getAllUsersThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = true;
    },
  },
});

export default userSlice;
