import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router";
import {
  loginUserStart,
  loginUserFailure,
  loginUserSuccess,
} from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isInitialRender = useRef(true);
  const { user, error, loading } = useSelector((state) => state.auth);
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
        toast.success(response.data.message);
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
      toast.error(error);

      // Display error to the user (e.g., using a toast or alert)
    }
  }, [error]);
  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-lg border-0 rounded-3 overflow-hidden">
            {/* Card Header */}
            <div className="card-header bg-primary text-white py-4">
              <h2 className="text-center mb-0">User Login</h2>
              <p className="text-center mb-0 opacity-75">Access your account</p>
            </div>

            {/* Card Body */}
            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="d-grid mb-3">
                  <button className="btn btn-primary btn-lg" type="submit">
                    Login
                  </button>
                </div>

                {/* Signup Link */}
                <div className="text-center">
                  <p className="mb-0">
                    New User?{" "}
                    <Link
                      to="/my-project/user/signup"
                      className="text-primary fw-bold"
                    >
                      Create an account
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
