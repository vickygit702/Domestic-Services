import React from "react";
import { useNavigate } from "react-router";
import { logoutTechnician } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
const TechnicianLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      dispatch(logoutTechnician());
      navigate("/my-project/technician/login");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };
  return (
    <button onClick={handleLogout} className="btn btn-outline-dark w-100 ">
      <i className="bi bi-box-arrow-right me-2"></i> Logout
    </button>
  );
};

export default TechnicianLogout;
