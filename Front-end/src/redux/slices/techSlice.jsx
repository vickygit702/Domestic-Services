import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchJobs = createAsyncThunk(
  "jobs/fetch-jobs", // Action type prefix
  async (url, { rejectWithValue }) => {
    try {
      const response = await axios.get(url); // Use the dynamic URL

      return response.data;
    } catch (error) {
      // Handle errors
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateJobStatus = createAsyncThunk(
  "jobs/update-job-status", // Action type prefix
  async ({ url, selectedJob }, { rejectWithValue }) => {
    try {
      const response = await axios.put(url, { selectedJob }); // Use the dynamic URL
      // Return the fetched data
      return response.data;
    } catch (error) {
      // Handle errors
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  jobDetails: [],
  loading: false,
  error: null,
};

// Create the slice
const techSlice = createSlice({
  name: "techJobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobDetails = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch services";
      })
      .addCase(updateJobStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateJobStatus.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateJobStatus.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch services";
      });
  },
});

export default techSlice.reducer;
