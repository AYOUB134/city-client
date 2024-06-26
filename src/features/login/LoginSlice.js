// LoginSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.userId = action.payload.userId;
      state.error = null;
    },
    loginFailure(state, action) {
      state.userId = null;
      state.error = action.payload.error;
    },
    logout(state) {
      state.userId = null;
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = loginSlice.actions;

export const selectUserId = (state) => state.login.userId;
export const selectError = (state) => state.login.error;

export default loginSlice.reducer;
