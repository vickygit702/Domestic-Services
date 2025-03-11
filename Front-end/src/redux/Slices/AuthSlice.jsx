import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, signup } from "./AuthApi";

const initialState = {
  status: "idle",
  errors: null,
  signupStatus: "idle",
  loginStatus: "idle",
  signupError: null,
  loginError: null,
  loggedInUser: null,
  successMessage: null,
};

export const signupAsync = createAsyncThunk(
  "auth/signupAsync",
  async (cred) => {
    const res = await signup(cred);
    return res;
  }
);

export const loginAsync = createAsyncThunk("auth/loginAsync", async (cred) => {
  const res = await login(cred);
  return res;
});

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    clearAuthSuccessMessage: (state) => {
      state.successMessage = null;
    },
    clearAuthErrors: (state) => {
      state.errors = null;
    },
    resetAuthStatus: (state) => {
      state.status = "idle";
    },
    resetSignupStatus: (state) => {
      state.signupStatus = "idle";
    },
    clearSignupError: (state) => {
      state.signupError = null;
    },
    resetLoginStatus: (state) => {
      state.loginStatus = "idle";
    },
    clearLoginError: (state) => {
      state.loginError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupAsync.pending, (state) => {
        state.signupStatus = "pending";
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.signupStatus = "fullfilled";
        state.loggedInUser = action.payload;
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.signupStatus = "rejected";
        state.signupError = action.error;
      })

      .addCase(loginAsync.pending, (state) => {
        state.loginStatus = "pending";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loginStatus = "fullfilled";
        state.loggedInUser = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loginStatus = "rejected";
        state.loginError = action.error;
      });
  },
});

export const selectAuthStatus = (state) => state.AuthSlice.status;
export const selectAuthErrors = (state) => state.AuthSlice.errors;
export const selectLoggedInUser = (state) => state.AuthSlice.loggedInUser;
export const selectAuthSuccessMessage = (state) =>
  state.AuthSlice.successMessage;
export const selectSignupStatus = (state) => state.AuthSlice.signupStatus;
export const selectSignupError = (state) => state.AuthSlice.signupError;
export const selectLoginStatus = (state) => state.AuthSlice.loginStatus;
export const selectLoginError = (state) => state.AuthSlice.loginError;

export const {
  clearAuthSuccessMessage,
  clearAuthErrors,
  resetAuthStatus,
  clearSignupError,
  resetSignupStatus,
  clearLoginError,
  resetLoginStatus,
} = authSlice.actions;

export default authSlice.reducer;
