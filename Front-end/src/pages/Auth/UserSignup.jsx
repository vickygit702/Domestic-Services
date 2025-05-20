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
import { backend_url } from "../../config";

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

  // State for validation errors
  const [errors, setErrors] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_contact: "",
    flatNo: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    lat: "",
    lng: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Validation patterns
  const validationPatterns = {
    user_name: /^[a-zA-Z\s]{3,30}$/,
    user_email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    user_password: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9a-zA-Z]).{5,12}$/,
    user_contact: /^[0-9]{10}$/,
    flatNo: /^[a-zA-Z0-9\s\-/]{1,10}$/,
    street: /^[a-zA-Z0-9\s\-,.]{3,50}$/,
    city: /^[a-zA-Z\s]{3,30}$/,
    state: /^[a-zA-Z\s]{3,30}$/,
    pincode: /^[0-9]{6}$/,
    lat: /^-?([0-8]?[0-9]|90)(\.[0-9]{1,15})?$/,
    lng: /^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,15})?$/,
  };

  // Error messages
  const errorMessages = {
    user_name: "Name should be 3-30 characters with alphabets only",
    user_email: "Please enter a valid email address",
    user_password:
      "Password must be 5-12 chars with 1 uppercase & 1 special char",
    user_contact: "Contact number must be 10 digits",
    flatNo: "Flat/House No. should be 1-10 characters",
    street: "Street should be 3-50 characters",
    city: "City should be 3-30 alphabets",
    state: "State should be 3-30 alphabets",
    pincode: "Pincode should be 6 digits",
    lat: "Please enter a valid latitude (-90 to 90) with up to 15 decimal places",
    lng: "Please enter a valid longitude (-180 to 180) with up to 15 decimal places",
  };

  // Validate field
  const validateField = (name, value) => {
    if (!value.trim()) {
      return "This field is required";
    }

    if (validationPatterns[name] && !validationPatterns[name].test(value)) {
      return errorMessages[name];
    }

    return "";
  };

  // Handle input changes with validation
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    if (name in formData) {
      setFormData({ ...formData, [name]: value });
    } else if (name in formData.user_address) {
      setFormData((prev) => ({
        ...prev,
        user_address: {
          ...prev.user_address,
          [name]: value,
        },
      }));
    } else if (name in formData.user_location) {
      setFormData((prev) => ({
        ...prev,
        user_location: {
          ...prev.user_location,
          [name]: value,
        },
      }));
    }

    // Validate the field
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate top-level fields
    Object.keys(formData).forEach((key) => {
      if (typeof formData[key] === "string") {
        newErrors[key] = validateField(key, formData[key]);
        if (newErrors[key]) isValid = false;
      }
    });

    // Validate address fields
    Object.keys(formData.user_address).forEach((key) => {
      newErrors[key] = validateField(key, formData.user_address[key]);
      if (newErrors[key]) isValid = false;
    });

    // Validate location fields
    Object.keys(formData.user_location).forEach((key) => {
      newErrors[key] = validateField(key, formData.user_location[key]);
      if (newErrors[key]) isValid = false;
    });

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    dispatch(signupUserStart());
    try {
      const response = await axios.post(
        `${backend_url}/auth/api/signupUser`,
        formData
      );

      const { userDetail } = response.data;
      if (userDetail) {
        dispatch(signupUserSuccess(userDetail));
        toast.success(response.data.message);
      }
    } catch (e) {
      const errorMessage = e.response?.data?.message || "Signup failed";
      dispatch(signupUserFailure(errorMessage));
    }
  };

  useEffect(() => {
    if (user?.id) {
      navigate(`/my-project/user/${user.id}`, { replace: true });
    }
  }, [user?.id]);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    if (error) {
      console.log("Error occurred:", error);
      toast.error(error);
    }
  }, [error]);

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
            <div className="card-header bg-primary text-white py-4">
              <h2 className="text-center mb-0">Create Your Account</h2>
              <p className="text-center mb-0 opacity-75">
                Join our service platform today
              </p>
            </div>

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
                        className={`form-control ${
                          errors.user_name ? "is-invalid" : ""
                        }`}
                        id="user_name"
                        name="user_name"
                        value={formData.user_name}
                        onChange={handleChange}
                        required
                      />
                      {errors.user_name && (
                        <div className="invalid-feedback">
                          {errors.user_name}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="user_email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className={`form-control ${
                          errors.user_email ? "is-invalid" : ""
                        }`}
                        id="user_email"
                        name="user_email"
                        value={formData.user_email}
                        onChange={handleChange}
                        required
                      />
                      {errors.user_email && (
                        <div className="invalid-feedback">
                          {errors.user_email}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="user_password" className="form-label">
                        Password
                      </label>
                      <div className="input-group">
                        <input
                          type={showPassword ? "text" : "password"}
                          className={`form-control ${
                            errors.user_password ? "is-invalid" : ""
                          }`}
                          id="user_password"
                          name="user_password"
                          value={formData.user_password}
                          onChange={handleChange}
                          required
                        />
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={togglePasswordVisibility}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <i className="bi bi-eye-slash"></i> // Eye slash icon when password is visible
                          ) : (
                            <i className="bi bi-eye"></i> // Eye icon when password is hidden
                          )}
                        </button>
                        {errors.user_password && (
                          <div className="invalid-feedback">
                            {errors.user_password}
                          </div>
                        )}
                      </div>
                      <small className="text-muted">
                        Password must be 5-12 characters with at least 1
                        uppercase letter and 1 special character
                      </small>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="user_contact" className="form-label">
                        Contact Number
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.user_contact ? "is-invalid" : ""
                        }`}
                        id="user_contact"
                        name="user_contact"
                        value={formData.user_contact}
                        onChange={handleChange}
                        required
                      />
                      {errors.user_contact && (
                        <div className="invalid-feedback">
                          {errors.user_contact}
                        </div>
                      )}
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
                        className={`form-control ${
                          errors.flatNo ? "is-invalid" : ""
                        }`}
                        id="flatNo"
                        name="flatNo"
                        value={formData.user_address.flatNo}
                        onChange={handleChange}
                        required
                      />
                      {errors.flatNo && (
                        <div className="invalid-feedback">{errors.flatNo}</div>
                      )}
                    </div>
                    <div className="col-md-5">
                      <label htmlFor="street" className="form-label">
                        Street
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.street ? "is-invalid" : ""
                        }`}
                        id="street"
                        name="street"
                        value={formData.user_address.street}
                        onChange={handleChange}
                        required
                      />
                      {errors.street && (
                        <div className="invalid-feedback">{errors.street}</div>
                      )}
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="city" className="form-label">
                        City
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.city ? "is-invalid" : ""
                        }`}
                        id="city"
                        name="city"
                        value={formData.user_address.city}
                        onChange={handleChange}
                        required
                      />
                      {errors.city && (
                        <div className="invalid-feedback">{errors.city}</div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="state" className="form-label">
                        State
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.state ? "is-invalid" : ""
                        }`}
                        id="state"
                        name="state"
                        value={formData.user_address.state}
                        onChange={handleChange}
                        required
                      />
                      {errors.state && (
                        <div className="invalid-feedback">{errors.state}</div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="pincode" className="form-label">
                        Pincode
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.pincode ? "is-invalid" : ""
                        }`}
                        id="pincode"
                        name="pincode"
                        value={formData.user_address.pincode}
                        onChange={handleChange}
                        required
                      />
                      {errors.pincode && (
                        <div className="invalid-feedback">{errors.pincode}</div>
                      )}
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
                        className={`form-control ${
                          errors.lat ? "is-invalid" : ""
                        }`}
                        id="lat"
                        name="lat"
                        value={formData.user_location.lat}
                        onChange={handleChange}
                        required
                      />
                      {errors.lat && (
                        <div className="invalid-feedback">{errors.lat}</div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="lng" className="form-label">
                        Longitude
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.lng ? "is-invalid" : ""
                        }`}
                        id="lng"
                        name="lng"
                        value={formData.user_location.lng}
                        onChange={handleChange}
                        required
                      />
                      {errors.lng && (
                        <div className="invalid-feedback">{errors.lng}</div>
                      )}
                    </div>
                  </div>
                </div>

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
