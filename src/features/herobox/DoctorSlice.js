// DoctorSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDoctors, createDoctor } from './DoctorAPI'; // Adjust path as necessary

export const getDoctorsAsync = createAsyncThunk(
  'doctors/getDoctors',
  async () => {
    try {
      const response = await fetchDoctors();
      return response;
    } catch (error) {
      throw error; // Let the calling code handle the error
    }
  }
);

export const addDoctorAsync = createAsyncThunk(
  'doctors/addDoctor',
  async (doctorData, { dispatch }) => {
    try {
      const response = await createDoctor(doctorData);
      // After a doctor is added, fetch the updated list of doctors
      dispatch(getDoctorsAsync());
      return response;
    } catch (error) {
      throw error; // Let the calling code handle the error
    }
  }
);

const doctorSlice = createSlice({
  name: 'doctors',
  initialState: {
    doctors: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDoctorsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDoctorsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.doctors = action.payload;
      })
      .addCase(getDoctorsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addDoctorAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addDoctorAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Since we are refetching the doctors list, we don't need to push the new doctor here
        // The new doctor will be included in the refreshed list
      })
      .addCase(addDoctorAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default doctorSlice.reducer;
