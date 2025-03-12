import React from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  selectLoggedInUser,
  loginAsync,
  selectLoginStatus,
  selectLoginError,
  clearLoginError,
  resetLoginStatus,
} from "../../redux/Slices/AuthSlice";
const Login = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectLoginStatus);
  const error = useSelector(selectLoginError);
  const loggedInUser = useSelector(selectLoggedInUser);
  const navigate = useNavigate();

  const [loginData, setloginData] = useState({
    user_email: "",
    user_password: "",
  });

  useEffect(() => {
    if (loggedInUser?.isVerified) {
      navigate("/user/dashboard");
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  // handles login status and dispatches reset actions to relevant states in cleanup
  useEffect(() => {
    if (status === "fullfilled" && loggedInUser?.isVerified === true) {
      toast.success(`Login successful`);
      reset();
    }
    return () => {
      dispatch(clearLoginError());
      dispatch(resetLoginStatus());
    };
  }, [status]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setloginData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const cred = { ...loginData };

    dispatch(loginAsync(cred));
    console.log(cred);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="user_email"
            value={loginData.user_email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="user_password"
            value={loginData.user_password}
            onChange={handleChange}
          />
        </label>

        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default Login;
