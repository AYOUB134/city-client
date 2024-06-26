// src/features/herobox/HeroBoxSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPatients, createPatient } from './HeroBoxAPI';

export const getPatients = createAsyncThunk('herobox/getPatients', async () => {
  const response = await fetchPatients();
  return response;
});

export const addPatient = createAsyncThunk('herobox/addPatient', async (patientData) => {
  const response = await createPatient(patientData);
  return response;
});

const heroBoxSlice = createSlice({
  name: 'herobox',
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
      })
      .addCase(addPatient.fulfilled, (state, action) => {
        state.patients.push(action.payload);
      });
  },
});

export default heroBoxSlice.reducer;
