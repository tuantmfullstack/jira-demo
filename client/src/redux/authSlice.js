import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import { axiosPro } from './CONSTANTS.js';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axiosPro.post('login', user);
      console.log({ data });
      return data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error);
    }
  }
);

export const signupThunk = createAsyncThunk(
  'auth/signup',
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axiosPro.post('signup', user);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
    user: {},
    err: false,
  },
  reducers: {
    logout: (state, action) => {
      const cookies = new Cookies();
      cookies.set('token', '');
      localStorage.clear();
    },
  },
  extraReducers: {
    [loginThunk.pending]: (state, action) => {
      state.isLoading = true;
    },
    [loginThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data.user;
      localStorage.setItem('name', state.user.name);
      localStorage.setItem('email', state.user.email);
      localStorage.setItem('avatar', state.user.avatar);
      const cookies = new Cookies();
      cookies.set('token', action.payload.token);
    },
    [loginThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = true;
    },
    [signupThunk.pending]: (state, action) => {
      state.isLoading = true;
    },
    [signupThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data.user;
      localStorage.setItem('name', state.user.name);
      localStorage.setItem('email', state.user.email);
      localStorage.setItem('avatar', state.user.avatar);
      const cookies = new Cookies();
      cookies.set('token', action.payload.token);
    },
    [signupThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = true;
    },
  },
});

export default authSlice;
