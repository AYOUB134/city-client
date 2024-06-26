// src/home/HomeSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPatients } from './HomeAPI';

export const getPatients = createAsyncThunk('home/getPatients', async () => {
  const response = await fetchPatients();
  return response;
});

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    patients: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPatients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPatients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.patients = action.payload;
      })
      .addCase(getPatients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default homeSlice.reducer;
