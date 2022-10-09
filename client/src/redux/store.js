import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice.js';
import filterSlice from './filterSlice.js';
import projectSlice from './projectSlice.js';
import todoSlice from './todoSlice.js';
import userSlice from './userSlice.js';

const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
    users: userSlice.reducer,
    filters: filterSlice.reducer,
    projects: projectSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
