import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/AuthSlice";

const store = configureStore({
  reducer: {
    AuthSlice,
  },
});

export default store;
