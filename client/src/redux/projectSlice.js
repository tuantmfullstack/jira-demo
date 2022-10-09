import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosPro } from './CONSTANTS.js';

export const getAllProjectsThunk = createAsyncThunk(
  'projects/getAllProjectsThunk',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosPro.get('projects');
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProjectThunk = createAsyncThunk(
  'projects/getProjectThunk',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosPro.get(`projects/${id}`);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createProjectThunk = createAsyncThunk(
  'projects/createProjectThunk',
  async (project, { rejectWithValue }) => {
    try {
      const { data } = await axiosPro.post('projects', project);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProjectThunk = createAsyncThunk(
  'projects/updateProjectThunk',
  async (project, { rejectWithValue }) => {
    try {
      const { data } = await axiosPro.patch(
        `projects/${project.id}`,
        project.data
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProjectThunk = createAsyncThunk(
  'projects/deleteProjectThunk',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosPro.delete(`projects/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    isLoading: false,
    projects: [],
    project: {},
    projectID: '',
    err: false,
  },
  reducers: {
    setProjectID: (state, action) => {
      state.projectID = action.payload;
    },
  },
  extraReducers: {
    [getAllProjectsThunk.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllProjectsThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.projects = action.payload.data.projects;
    },
    [getAllProjectsThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = true;
    },
    [getProjectThunk.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getProjectThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.project = action.payload.data.project;
      state.todos = action.payload.data.project.subTasks;
    },
    [getProjectThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = true;
    },
    [createProjectThunk.pending]: (state, action) => {
      state.isLoading = true;
    },
    [createProjectThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.projects.push(action.payload.data.project);
    },
    [createProjectThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = true;
    },
    [deleteProjectThunk.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteProjectThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      const idx = state.projects.indexOf(action.payload.data.project);
      state.projects.splice(idx, 1);
    },
    [deleteProjectThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = true;
    },
  },
});

export default projectSlice;
