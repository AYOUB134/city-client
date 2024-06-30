// store.js

import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../features/home/HomeSlice';
import heroBoxReducer from '../features/herobox/HeroBoxSlice'; // Adjust path as necessary
import patientsReducer from '../features/patients/PatientsSlice'; // Adjust path as necessary
import doctorsReducer from '../features/herobox/DoctorSlice'; // Adjust path as necessary
import loginReducer from '../features/login/LoginSlice'; // Adjust path as necessary
import doctorssReducer from '../features/doctors/DoctorsSlice'; // Adjust path as necessary

export const store = configureStore({
  reducer: {
    home: homeReducer,
    herobox: heroBoxReducer,
    patients: patientsReducer,
    doctorss: doctorssReducer,
    doctors: doctorsReducer, // Ensure correct import path
    login: loginReducer,
  },
});
