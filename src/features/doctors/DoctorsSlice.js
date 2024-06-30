import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDoctors } from './DoctorsAPI';

export const getDoctors = createAsyncThunk('doctors/getDoctors', async () => {
  const data = await fetchDoctors();
  return data;
});

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDoctors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDoctors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getDoctors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default doctorsSlice.reducer;
