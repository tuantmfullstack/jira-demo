import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    users: [],
    search: '',
  },
  reducers: {
    filterUsers: (state, action) => {
      state.users = action.payload;
    },
    searchTodo: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: {},
});

export default filterSlice;
