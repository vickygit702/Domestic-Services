import React from "react";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const backend_url = import.meta.env.VITE_BACKENDURL;

// Async Thunk to fetch services list with dynamic URL
export const fetchBookings = createAsyncThunk(
  "status-page/myBookings", // Action type prefix
  async (url, { rejectWithValue }) => {
    try {
      const response = await axios.get(url); // Use the dynamic URL
      // Return the fetched data
      return response.data;
    } catch (error) {
      // Handle errors
      return rejectWithValue(error.response.data);
    }
  }
);

export const cancelBookings = createAsyncThunk(
  "status-page/myBookings/cancel",
  async ({ url, bookingId }, { rejectWithValue }) => {
    try {
      const response = await axios.put(url, { bookingId }); // Send as object in request body
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const bookService = createAsyncThunk(
  "booking/book-service", // Action type prefix
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backend_url}/service/booking/book-service`,
        bookingData
      ); // Use the dynamic URL
      console.log(response.data);
      // Return the fetched data
      return response.data;
    } catch (error) {
      // Handle errors
      return rejectWithValue(error.response.data);
    }
  }
);

export const bookServicePremiumUser = createAsyncThunk(
  "booking/book-service-premium-user", // Action type prefix
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backend_url}/service/booking/book-service-premium-user`,
        bookingData
      ); // Use the dynamic URL
      console.log(response.data);
      // Return the fetched data
      return response.data;
    } catch (error) {
      // Handle errors
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  userBookings: [],
  loading: false,
  message: null,
  error: null,
};

// Create the slice
const userSlice = createSlice({
  name: "userBooks",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.userBookings = action.payload.formattedBookings;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch services";
      })
      .addCase(bookService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookService.fulfilled, (state, action) => {
        state.loading = false;
        state.message = {
          text: action.payload.message,
          type: action.payload.type || "success",
        };
      })
      .addCase(bookService.rejected, (state, action) => {
        state.loading = false;
        state.message = {
          text: action.payload?.message || "Booking failed",
          type: "error",
        };
        state.error = action.payload?.message || "Failed to book service";
      })
      .addCase(bookServicePremiumUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookServicePremiumUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = {
          text: action.payload.message,
          type: action.payload.type || "success",
        };
      })
      .addCase(bookServicePremiumUser.rejected, (state, action) => {
        state.loading = false;
        state.message = {
          text: action.payload?.message || "Booking failed",
          type: "error",
        };
      })
      .addCase(cancelBookings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(cancelBookings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = {
          text: action.payload.message,
          type: action.payload.type || "success",
        };
      })
      .addCase(cancelBookings.rejected, (state, action) => {
        state.status = "failed";
        state.message = {
          text: action.payload?.message || "Booking failed",
          type: "error",
        };
        state.error = action.payload;
      });
  },
});

// Export the reducer
export const { clearMessage } = userSlice.actions;
export default userSlice.reducer;
