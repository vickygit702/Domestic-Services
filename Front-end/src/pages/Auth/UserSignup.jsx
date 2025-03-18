import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  signupUserFailure,
  signupUserStart,
  signupUserSuccess,
} from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const UserSignup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isInitialRender = useRef(true);
  const { user, error, loading } = useSelector((state) => state.auth);
  // State for form fields
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_contact: "",
    user_location: { lat: "", lng: "" },
    user_address: {
      flatNo: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  // State for error handling

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signupUserStart());
    try {
      //Send form data to the backend
      const response = await axios.post(
        "http://localhost:8000/auth/api/signupUser",
        formData
      );
      // Handle successful signup

      const { userDetail } = response.data;
      if (userDetail) {
        dispatch(signupUserSuccess(userDetail));
        toast.success(response.data.message);
      }
    } catch (e) {
      // Handle errors
      const errorMessage = e.response?.data?.message || "Signup failed";
      dispatch(signupUserFailure(errorMessage));
    }
  };

  useEffect(() => {
    if (user?.id) {
      navigate(`/my-project/user/${user.id}`);
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isInitialRender.current) {
      // Skip the effect on initial render
      isInitialRender.current = false;
      return;
    }
    if (error) {
      console.log("Error occurred:", error);
      toast.error(error);
      // Display error to the user (e.g., using a toast or alert)
    }
  }, [error]);
  if (loading) return <div>Loading.....</div>;
  return (
    <div>
      <h2>User Signup</h2>

      <form onSubmit={handleSubmit}>
        {/* Name */}

        <label>Name:</label>
        <input
          type="text"
          name="user_name"
          value={formData.user_name}
          onChange={handleChange}
          required
        />

        {/* Email */}

        <label>Email:</label>
        <input
          type="email"
          name="user_email"
          value={formData.user_email}
          onChange={handleChange}
          required
        />

        {/* Password */}

        <label>Password:</label>
        <input
          type="password"
          name="user_password"
          value={formData.user_password}
          onChange={handleChange}
          required
        />

        {/* Contact */}

        <label>Contact:</label>
        <input
          type="text"
          name="user_contact"
          value={formData.user_contact}
          onChange={handleChange}
          required
        />
        {/* Address */}
        <label>FlatNo:</label>
        <input
          type="text"
          name="flatNo"
          value={formData.user_address.flatNo}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              user_address: { ...prev.user_address, flatNo: e.target.value },
            }))
          }
          required
        />
        <label>Street:</label>
        <input
          type="text"
          name="street"
          value={formData.user_address.street}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              user_address: { ...prev.user_address, street: e.target.value },
            }))
          }
          required
        />
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={formData.user_address.city}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              user_address: { ...prev.user_address, city: e.target.value },
            }))
          }
          required
        />
        <label>State:</label>
        <input
          type="text"
          name="state"
          value={formData.user_address.state}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              user_address: { ...prev.user_address, state: e.target.value },
            }))
          }
          required
        />
        <label>Pincode:</label>
        <input
          type="text"
          name="pincode"
          value={formData.user_address.pincode}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              user_address: { ...prev.user_address, pincode: e.target.value },
            }))
          }
          required
        />

        {/* Location */}

        <label>Latitude:</label>
        <input
          type="text"
          name="lat"
          value={formData.user_location.lat}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              user_location: { ...prev.user_location, lat: e.target.value },
            }))
          }
          required
        />
        <label>Longitude:</label>
        <input
          type="text"
          name="long"
          value={formData.user_location.lng}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              user_location: { ...prev.user_location, lng: e.target.value },
            }))
          }
          required
        />
        {/* Submit Button */}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default UserSignup;
