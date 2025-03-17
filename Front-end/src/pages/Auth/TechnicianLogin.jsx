import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router";
import {
  loginTechnicianStart,
  loginTechnicianSuccess,
  loginTechnicianFailure,
} from "../../redux/slices/authSlice";

const TechnicianLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isInitialRender = useRef(true);
  const { technician, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginTechnicianStart());
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/api/loginTechnician",
        {
          tech_email: email,
          tech_password: password,
        }
      );

      const { techDetail } = response.data;
      if (techDetail) {
        dispatch(loginTechnicianSuccess(techDetail));
      }
    } catch (e) {
      const errorMessage = e.response?.data?.message || "Login failed";
      dispatch(loginTechnicianFailure(errorMessage));
    }
  };
  useEffect(() => {
    if (technician?.id) {
      navigate(`/my-project/technician/${technician.id}`);
    }
  }, [technician, navigate]);
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
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login Technician</h2>
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
      <Link to="/my-project/technician/signup">New Technician?</Link>
    </div>
  );
};

export default TechnicianLogin;
