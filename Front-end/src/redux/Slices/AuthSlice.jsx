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
    resetOtpVerificationStatus: (state) => {
      state.otpVerificationStatus = "idle";
    },
    clearOtpVerificationError: (state) => {
      state.otpVerificationError = null;
    },
    resetResendOtpStatus: (state) => {
      state.resendOtpStatus = "idle";
    },
    clearResendOtpError: (state) => {
      state.resendOtpError = null;
    },
    clearResendOtpSuccessMessage: (state) => {
      state.resendOtpSuccessMessage = null;
    },
    resetForgotPasswordStatus: (state) => {
      state.forgotPasswordStatus = "idle";
    },
    clearForgotPasswordSuccessMessage: (state) => {
      state.forgotPasswordSuccessMessage = null;
    },
    clearForgotPasswordError: (state) => {
      state.forgotPasswordError = null;
    },
    resetResetPasswordStatus: (state) => {
      state.resetPasswordStatus = "idle";
    },
    clearResetPasswordSuccessMessage: (state) => {
      state.resetPasswordSuccessMessage = null;
    },
    clearResetPasswordError: (state) => {
      state.resetPasswordError = null;
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
