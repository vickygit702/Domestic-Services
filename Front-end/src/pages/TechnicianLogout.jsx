import React from "react";
import { useNavigate } from "react-router";
import { logoutTechnician } from "../redux/slices/authSlice";
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
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default TechnicianLogout;
