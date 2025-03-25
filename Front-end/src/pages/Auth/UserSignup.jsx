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
  // ... [keep all your existing state and logic] ...

  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow-lg border-0 rounded-3 overflow-hidden">
            {/* Card Header */}
            <div className="card-header bg-primary text-white py-4">
              <h2 className="text-center mb-0">Create Your Account</h2>
              <p className="text-center mb-0 opacity-75">
                Join our service platform today
              </p>
            </div>

            {/* Card Body */}
            <div className="card-body p-4 p-md-5">
              <form
                onSubmit={handleSubmit}
                className="needs-validation"
                noValidate
              >
                {/* Personal Information Section */}
                <div className="mb-4">
                  <h5 className="mb-3 text-primary">Personal Details</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="user_name" className="form-label">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="user_name"
                        name="user_name"
                        value={formData.user_name}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide your name.
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="user_email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="user_email"
                        name="user_email"
                        value={formData.user_email}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a valid email.
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="user_password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="user_password"
                        name="user_password"
                        value={formData.user_password}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a password.
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="user_contact" className="form-label">
                        Contact Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="user_contact"
                        name="user_contact"
                        value={formData.user_contact}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide your contact number.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div className="mb-4">
                  <h5 className="mb-3 text-primary">Address Information</h5>
                  <div className="row g-3">
                    <div className="col-md-3">
                      <label htmlFor="flatNo" className="form-label">
                        Flat/House No.
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="flatNo"
                        name="flatNo"
                        value={formData.user_address.flatNo}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            user_address: {
                              ...prev.user_address,
                              flatNo: e.target.value,
                            },
                          }))
                        }
                        required
                      />
                    </div>
                    <div className="col-md-5">
                      <label htmlFor="street" className="form-label">
                        Street
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="street"
                        name="street"
                        value={formData.user_address.street}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            user_address: {
                              ...prev.user_address,
                              street: e.target.value,
                            },
                          }))
                        }
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="city" className="form-label">
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        value={formData.user_address.city}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            user_address: {
                              ...prev.user_address,
                              city: e.target.value,
                            },
                          }))
                        }
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="state" className="form-label">
                        State
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="state"
                        name="state"
                        value={formData.user_address.state}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            user_address: {
                              ...prev.user_address,
                              state: e.target.value,
                            },
                          }))
                        }
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="pincode" className="form-label">
                        Pincode
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="pincode"
                        name="pincode"
                        value={formData.user_address.pincode}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            user_address: {
                              ...prev.user_address,
                              pincode: e.target.value,
                            },
                          }))
                        }
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Location Section */}
                <div className="mb-4">
                  <h5 className="mb-3 text-primary">Location Coordinates</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="lat" className="form-label">
                        Latitude
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lat"
                        name="lat"
                        value={formData.user_location.lat}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            user_location: {
                              ...prev.user_location,
                              lat: e.target.value,
                            },
                          }))
                        }
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="lng" className="form-label">
                        Longitude
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lng"
                        name="lng"
                        value={formData.user_location.lng}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            user_location: {
                              ...prev.user_location,
                              lng: e.target.value,
                            },
                          }))
                        }
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="d-grid mt-4">
                  <button className="btn btn-primary btn-lg" type="submit">
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
