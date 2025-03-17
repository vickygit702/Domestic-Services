import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  loginUserStart,
  loginUserFailure,
  loginUserSuccess,
} from "../../redux/slices/authSlice";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isInitialRender = useRef(true);
  const { user, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUserStart());
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/api/loginUser",
        {
          user_email: email,
          user_password: password,
        }
      );

      const { userDetail } = response.data;
      if (userDetail) {
        dispatch(loginUserSuccess(userDetail));
      }
    } catch (e) {
      const errorMessage = e.response?.data?.message || "Login failed";
      dispatch(loginUserFailure(errorMessage));
    }
  };
  useEffect(() => {
    if (user?.id) {
      navigate(`/my-project/user/${user.id}`);
    }
  }, [user, navigate]);
  useEffect(() => {
    if (isInitialRender.current) {
      // Skip the effect on initial render
      isInitialRender.current = false;
      return;
    }
    if (error) {
      console.log("Error occurred:", error);
      // Display error to the user (e.g., using a toast or alert)
    }
  }, [error]);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default UserLogin;
