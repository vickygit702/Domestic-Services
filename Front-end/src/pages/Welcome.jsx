import React from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";

const Welcome = () => {
  return (
    <div>
      <h1>Welcome to my project </h1>
      <div>
        <h2>Select Type</h2>
        <Link to="/my-project/user/login"> User Login</Link>
        <Link to="/my-project/technician/login"> technician Login</Link>
      </div>
    </div>
  );
};

export default Welcome;
