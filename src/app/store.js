import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../features/home/HomeSlice';
import heroBoxReducer from '../features/herobox/HeroBoxSlice';
import patientsReducer from '../features/patients/PatientsSlice';
import loginReducer from '../features/login/LoginSlice'; // Import loginReducer

export const store = configureStore({
  reducer: {
    home: homeReducer,
    herobox: heroBoxReducer,
    patients: patientsReducer,
    login: loginReducer, // Include loginReducer in the store
  },
});
