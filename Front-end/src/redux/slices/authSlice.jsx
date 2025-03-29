import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to update user profile
export const updateUserProfile = createAsyncThunk(
  "update-profile",
  async ({ userId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/user/${userId}/update-profile`,
        updatedData
      );

      return response.data; // Return updated user data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProfileImage = createAsyncThunk(
  "upload-profile-image",
  async ({ userId, file }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/user/${userId}/upload-profile-image`,
        file,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

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
    },
    loginTechnicianSuccess(state, action) {
      state.technician = action.payload;
      state.loading = false;
      state.isVerified = true;
    },
    loginTechnicianFailure(state, action) {
      state.error = action.payload;
    },
    logoutTechnician(state) {
      state.technician = null;
      state.isVerified = false; // Set isVerified to false on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;

        // Ensure that action.payload.upd_user contains the updated user data
        if (action.payload.userUptodate) {
          state.user = { ...state.user, ...action.payload.userUptodate };
          console.log("updated user data :", state.user);
        } else {
          console.error(
            "Updated user data not found in response:",
            action.payload
          );
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update services";
      })
      .addCase(updateProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user && action.payload.imageUrl) {
          state.user.profileImg = action.payload.imageUrl;
        }
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
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
