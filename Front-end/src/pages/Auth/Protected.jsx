import React from "react";
import { Navigate } from "react-router";
const Protected = ({ children }) => {
  // Need to assign each routing securable
  const loggedInUser = useSelector();
  if (loggedInUser?.isVerified) {
    return children;
  }
  return <Navigate to={"/login"} replace={true} />;
};

export default Protected;
