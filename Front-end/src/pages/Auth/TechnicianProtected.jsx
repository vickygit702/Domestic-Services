import React from "react";
import { Navigate } from "react-router";

const TechnicianProtected = ({ children }) => {
  if (true) {
    return children;
  }
  return <Navigate to={"/my-project/technician/login"} replace={true} />;
};

export default TechnicianProtected;
