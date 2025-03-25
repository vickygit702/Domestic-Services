import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk to fetch services list with dynamic URL
export const fetchServices = createAsyncThunk(
  "services/fetchServices", // Action type prefix
  async (url, { rejectWithValue }) => {
    try {
      const response = await axios.get(url); // Use the dynamic URL
      return response.data; // Return the fetched data
    } catch (error) {
      // Handle errors
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  serviceList: [],
  categories: [],
  loading: false,
  error: null,
};

// Create the slice
const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.serviceList = action.payload.servicesList;
        state.categories = action.payload.categories;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch services";
      });
  },
});

// Export the reducer
export default servicesSlice.reducer;
