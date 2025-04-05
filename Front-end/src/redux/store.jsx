import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import serviceReducer from "./slices/servicesSlice";
import userReducer from "./slices/userSlice";
import techReducer from "./slices/techSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    services: serviceReducer,
    userBooks: userReducer,
    techJobs: techReducer,
  },
});

export default store;
