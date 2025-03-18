import React from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
const UserProtected = ({ children }) => {
  const { isVerified } = useSelector((state) => state.auth);
  if (isVerified) {
    return children;
  }
  return <Navigate to={"/my-project/user/login"} replace={true} />;
};

export default UserProtected;
