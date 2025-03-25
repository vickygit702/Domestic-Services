import React from "react";
import { createRoot } from "react-dom/client";
import "./scss/main.scss"; // or './main.scss' if using Option A

import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <ToastContainer position="bottom-center" autoClose={1500} closeOnClick />
  </Provider>
);
