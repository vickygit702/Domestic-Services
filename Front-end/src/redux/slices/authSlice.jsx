import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  technician: null,
  isVerified: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signupUserStart(state) {
      state.loading = true;
    },
    signupUserSuccess(state, action) {
      state.user = action.payload;
      state.loading = false;
    },
    signupUserFailure(state, action) {
      state.error = action.payload;
    },
    signupTechnicianStart(state) {
      state.loading = true;
    },
    signupTechnicianSuccess(state, action) {
      state.technician = action.payload;
      state.loading = false;
    },
    signupTechnicianFailure(state, action) {
      state.error = action.payload;
    },
    loginUserStart(state) {
      state.loading = true;
    },
    loginUserSuccess(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.isVerified = true;
    },
    loginUserFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    logoutUser(state) {
      state.user = null;
      state.isVerified = false; // Set isVerified to false on logout
    },
    loginTechnicianStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginTechnicianSuccess(state, action) {
      state.technician = action.payload;
      state.loading = false;
      state.isVerified = true;
      state.error = null;
    },
    loginTechnicianFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    logoutTechnician(state) {
      state.technician = null;
      state.isVerified = false; // Set isVerified to false on logout
    },
  },
});

export const {
  signupUserStart,
  signupUserSuccess,
  signupUserFailure,
  loginUserStart,
  loginUserSuccess,
  loginUserFailure,
  signupTechnicianStart,
  signupTechnicianSuccess,
  signupTechnicianFailure,
  loginTechnicianStart,
  loginTechnicianSuccess,
  loginTechnicianFailure,
  logoutTechnician,
  logoutUser,
} = authSlice.actions;

export default authSlice.reducer;
