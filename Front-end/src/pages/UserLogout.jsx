import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logoutUser } from "../redux/slices/authSlice";

const UserLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      dispatch(logoutUser());
      navigate("/my-project/user/login");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };
  return (
    // <button className="btn btn-outline-light w-100" onClick={handleLogout}>
    //   Logout
    // </button>
    <button className="btn btn-outline-dark w-100" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default UserLogout;
