// PatientSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPatients, createPatient } from './HeroBoxAPI'; // Adjust path as necessary

export const getPatientsAsync = createAsyncThunk(
  'patients/getPatients',
  async () => {
    try {
      const response = await fetchPatients();
      return response;
    } catch (error) {
      throw error; // Let the calling code handle the error
    }
  }
);

export const addPatientAsync = createAsyncThunk(
  'patients/addPatient',
  async (patientData, { dispatch }) => {
    try {
      const response = await createPatient(patientData);
      // After a patient is added, fetch the updated list of patients
      dispatch(getPatientsAsync());
      return response;
    } catch (error) {
      throw error; // Let the calling code handle the error
    }
  }
);

const patientSlice = createSlice({
  name: 'patients',
  initialState: {
    patients: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPatientsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPatientsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.patients = action.payload;
      })
      .addCase(getPatientsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addPatientAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addPatientAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Since we are refetching the patients list, we don't need to push the new patient here
        // The new patient will be included in the refreshed list
      })
      .addCase(addPatientAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default patientSlice.reducer;
