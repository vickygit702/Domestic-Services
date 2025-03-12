import React from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
const Protected = ({ children }) => {
  // Need to assign each routing securable
  const loggedInUser = useSelector();
  if (loggedInUser) {
    return children;
  }

  return <Navigate to={"/login"} replace={true} />;
};

export default Protected;
