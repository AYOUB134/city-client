// src/features/patients/PatientsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPatients, updatePatient, addPatient } from './PatientsAPI';

export const fetchPatientsAsync = createAsyncThunk('patients/fetchPatients', async () => {
  const response = await fetchPatients();
  return response;
});

export const updatePatientAsync = createAsyncThunk(
  'patients/updatePatient',
  async ({ patientId, updatedPatientData }) => {
    const response = await updatePatient(patientId, updatedPatientData);
    return response;
  }
);

export const addPatientAsync = createAsyncThunk(
  'patients/addPatient',
  async (newPatientData) => {
    const response = await addPatient(newPatientData);
    return response;
  }
);

const initialState = {
  patients: [],
  status: 'idle',
  error: null,
};

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    addPatientToList: (state, action) => {
      state.patients.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPatientsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.patients = action.payload;
      })
      .addCase(fetchPatientsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updatePatientAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePatientAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.patients = state.patients.map((patient) =>
          patient._id === action.payload._id ? { ...patient, ...action.payload } : patient
        );
      })
      .addCase(updatePatientAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addPatientAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addPatientAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.patients.push(action.payload); // Add new patient to the state
      })
      .addCase(addPatientAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearError, addPatientToList } = patientsSlice.actions;

export default patientsSlice.reducer;















// // src/features/patients/PatientsSlice.js

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { fetchPatients, updatePatientStatus, addPatient } from './PatientsAPI';

// export const fetchPatientsAsync = createAsyncThunk('patients/fetchPatients', async () => {
//   const response = await fetchPatients();
//   return response;
// });

// export const updatePatientStatusAsync = createAsyncThunk(
//   'patients/updatePatientStatus',
//   async ({ patientId, status, bill }) => {
//     const response = await updatePatientStatus(patientId, status, bill);
//     return response;
//   }
// );

// export const addPatientAsync = createAsyncThunk(
//   'patients/addPatient',
//   async (newPatientData) => {
//     const response = await addPatient(newPatientData);
//     return response;
//   }
// );

// const initialState = {
//   patients: [],
//   status: 'idle',
//   error: null,
// };

// const patientsSlice = createSlice({
//   name: 'patients',
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//     addPatientToList: (state, action) => {
//       state.patients.push(action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPatientsAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchPatientsAsync.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.patients = action.payload;
//       })
//       .addCase(fetchPatientsAsync.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(updatePatientStatusAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(updatePatientStatusAsync.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.patients = state.patients.map((patient) =>
//           patient._id === action.payload._id ? { ...patient, status: action.payload.status } : patient
//         );
//       })
//       .addCase(updatePatientStatusAsync.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(addPatientAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(addPatientAsync.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.patients.push(action.payload); // Add new patient to the state
//       })
//       .addCase(addPatientAsync.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export const { clearError, addPatientToList } = patientsSlice.actions;

// export default patientsSlice.reducer;
