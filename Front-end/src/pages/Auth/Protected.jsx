import React from "react";
import { Navigate } from "react-router";
const Protected = ({ children }) => {
  if (false) {
    return children;
  }
  return <Navigate to={"/login"} replace={true} />;
};

export default Protected;
