import React from "react";
import { createRoot } from "react-dom/client";
import "./scss/main.scss"; // or './main.scss' if using Option A
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import './index.css';

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <ToastContainer position="bottom-center" autoClose={1500} closeOnClick />
  </Provider>
);
