import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

export const bookService = createAsyncThunk(
  "booking/book-service", // Action type prefix
  async ({ url, bookingData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(url, bookingData); // Use the dynamic URL
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
  error: null,
};

// Create the slice
const userSlice = createSlice({
  name: "userBooks",
  initialState,
  reducers: {},
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
      })
      .addCase(bookService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to book service";
      });
  },
});

// Export the reducer
export default userSlice.reducer;
