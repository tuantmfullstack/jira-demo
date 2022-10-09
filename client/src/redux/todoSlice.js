import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPro, URL } from './CONSTANTS.js';

export const getTodoThunk = createAsyncThunk(
  'todos/getTodoThunk',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosPro.get(`tasks/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllTodosThunk = createAsyncThunk(
  'todos/getAllTodosThunk',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosPro.get('tasks');
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateTodoThunk = createAsyncThunk(
  'todos/updateTodoThunk',
  async (todo, { rejectWithValue }) => {
    try {
      const { data } = await axiosPro.patch(`tasks/${todo.id}`, todo.newTodo);
      console.log({ data });
      return data;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error);
    }
  }
);

export const deleteTodoThunk = createAsyncThunk(
  'todo/deleteTodoThunk',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosPro.delete(`tasks/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createTodoThunk = createAsyncThunk(
  'todo/createAsyncThunk',
  async (newTodo, { rejectWithValue }) => {
    try {
      const { data } = await axiosPro.post('tasks', newTodo);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    isLoading: false,
    todos: [],
    todo: '',
    err: false,
  },
  reducers: {},
  extraReducers: {
    [getAllTodosThunk.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllTodosThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload.data.tasks;
      state.err = false;
    },
    [getAllTodosThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = true;
    },
    [getTodoThunk.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTodoThunk.fulfilled]: (state, action) => {
      state.todo = action.payload.data.task;
      state.isLoading = false;
    },
    [getTodoThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = true;
    },
    [updateTodoThunk.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateTodoThunk.fulfilled]: (state, action) => {
      state.todo = action.payload.data.task;
      const todo = state.todos.find((todo) => todo.id === state.todo.id);
      const index = state.todos.indexOf(todo);
      state.todos.splice(index, 1, state.todo);
      state.isLoading = false;
    },
    [updateTodoThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = true;
    },
    [deleteTodoThunk.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteTodoThunk.fulfilled]: (state, action) => {
      const idx = state.todos.indexOf(action.payload.data.todo);
      state.todos.splice(idx, 1);
      state.isLoading = false;
    },
    [deleteTodoThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = true;
    },
    [createTodoThunk.pending]: (state, action) => {
      state.isLoading = true;
    },
    [createTodoThunk.fulfilled]: (state, action) => {
      state.todos.push(action.payload.data.task);
      state.isLoading = false;
    },
    [createTodoThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = true;
    },
  },
});

export default todoSlice;
