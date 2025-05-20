import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  signupTechnicianStart,
  signupTechnicianFailure,
  signupTechnicianSuccess,
} from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const TechnicianSignup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isInitialRender = useRef(true);
  const { technician, error, loading } = useSelector((state) => state.auth);

  // State for form fields
  const [formData, setFormData] = useState({
    tech_name: "",
    tech_email: "",
    tech_password: "",
    tech_contact: "",
    tech_address: {
      flatNo: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
    tech_location: { lat: "", lng: "" },
    worksKnown: [],
    tech_experience: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    tech_name: "",
    tech_email: "",
    tech_password: "",
    tech_contact: "",
    tech_experience: "",
    flatNo: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    lat: "",
    lng: "",
  });

  // State for services and search
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingServices, setIsLoadingServices] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);

  // Validation patterns
  const validationPatterns = {
    tech_name: /^[a-zA-Z\s]{3,30}$/,
    tech_email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    tech_password: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9a-zA-Z]).{5,12}$/,
    tech_contact: /^[0-9]{10}$/,
    tech_experience: /^[0-9]{1,2}$/,
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
    tech_name: "Name should be 3-30 characters with alphabets only",
    tech_email: "Please enter a valid email address",
    tech_password:
      "Password must be 5-12 chars with 1 uppercase & 1 special char",
    tech_contact: "Contact number must be 10 digits",
    tech_experience: "Experience should be 1-2 digits (years)",
    flatNo: "Flat/House No. should be 1-10 characters",
    street: "Street should be 3-50 characters",
    city: "City should be 3-30 alphabets",
    state: "State should be 3-30 alphabets",
    pincode: "Pincode should be 6 digits",
    lat: "Please enter a valid latitude (-90 to 90) with up to 15 decimal places",
    lng: "Please enter a valid longitude (-180 to 180) with up to 15 decimal places",
  };

  // Fetch services from backend
  useEffect(() => {
    const fetchServices = async () => {
      setIsLoadingServices(true);
      try {
        const response = await axios.get(
          "http://localhost:8000/auth/api/fetch-services"
        );
        setServices(response.data.services); // Access the services array from response
      } catch (error) {
        console.error("Error fetching services:", error);
        toast.error("Failed to load services");
        // Fallback to default services if API fails
        setServices([
          "Plumbing",
          "Electrical",
          "Carpentry",
          "HVAC",
          "Painting",
        ]);
      } finally {
        setIsLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

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
    } else if (name in formData.tech_address) {
      setFormData((prev) => ({
        ...prev,
        tech_address: {
          ...prev.tech_address,
          [name]: value,
        },
      }));
    } else if (name in formData.tech_location) {
      setFormData((prev) => ({
        ...prev,
        tech_location: {
          ...prev.tech_location,
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
      if (typeof formData[key] === "string" && key !== "worksKnown") {
        newErrors[key] = validateField(key, formData[key]);
        if (newErrors[key]) isValid = false;
      }
    });

    // Validate address fields
    Object.keys(formData.tech_address).forEach((key) => {
      newErrors[key] = validateField(key, formData.tech_address[key]);
      if (newErrors[key]) isValid = false;
    });

    // Validate location fields
    Object.keys(formData.tech_location).forEach((key) => {
      newErrors[key] = validateField(key, formData.tech_location[key]);
      if (newErrors[key]) isValid = false;
    });

    setErrors(newErrors);
    return isValid;
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter services based on search term
  const filteredServices = services.filter((service) =>
    service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle checkbox changes for worksKnown
  const handleWorksKnownChange = (service) => {
    setFormData((prev) => {
      const isSelected = prev.worksKnown.includes(service);

      // If trying to add when already have 2
      if (!isSelected && prev.worksKnown.length >= 2) {
        toast.warning("Maximum 2 skills allowed");
        return prev;
      }

      return {
        ...prev,
        worksKnown: isSelected
          ? prev.worksKnown.filter((work) => work !== service)
          : [...prev.worksKnown, service],
      };
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    if (formData.worksKnown.length === 0) {
      toast.error("Please select at least one service you provide");
      return;
    }
    if (formData.worksKnown.length > 2) {
      toast.error("Maximum 2 skills allowed");
      return;
    }

    dispatch(signupTechnicianStart());
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/api/signupTechnician",
        formData
      );

      const { techDetail } = response.data;
      if (techDetail) {
        dispatch(signupTechnicianSuccess(techDetail));
        toast.success(response.data.message);
      }
    } catch (e) {
      const errorMessage = e.response?.data?.message || "Signup failed";
      dispatch(signupTechnicianFailure(errorMessage));
    }
  };

  useEffect(() => {
    if (technician?.id) {
      navigate(`/my-project/technician/${technician.id}`);
    }
  }, [technician, navigate]);

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

  if (loading) {
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
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow-lg border-0 rounded-3 overflow-hidden">
            <div className="card-header bg-primary text-white py-4">
              <h2 className="text-center mb-0">Technician Registration</h2>
              <p className="text-center mb-0 opacity-75">
                Join our network of skilled professionals
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
                  <h5 className="mb-3 text-primary">Personal Information</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="tech_name" className="form-label">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.tech_name ? "is-invalid" : ""
                        }`}
                        id="tech_name"
                        name="tech_name"
                        value={formData.tech_name}
                        onChange={handleChange}
                        required
                      />
                      {errors.tech_name && (
                        <div className="invalid-feedback">
                          {errors.tech_name}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="tech_email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className={`form-control ${
                          errors.tech_email ? "is-invalid" : ""
                        }`}
                        id="tech_email"
                        name="tech_email"
                        value={formData.tech_email}
                        onChange={handleChange}
                        required
                      />
                      {errors.tech_email && (
                        <div className="invalid-feedback">
                          {errors.tech_email}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="tech_password" className="form-label">
                        Password
                      </label>
                      <div className="input-group">
                        <input
                          type={showPassword ? "text" : "password"}
                          className={`form-control ${
                            errors.tech_password ? "is-invalid" : ""
                          }`}
                          id="tech_password"
                          name="tech_password"
                          value={formData.tech_password}
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
                            <i className="bi bi-eye-slash"></i>
                          ) : (
                            <i className="bi bi-eye"></i>
                          )}
                        </button>
                      </div>
                      {errors.tech_password && (
                        <div className="invalid-feedback">
                          {errors.tech_password}
                        </div>
                      )}
                      <small className="text-muted">
                        Password must be 5-12 characters with at least 1
                        uppercase letter and 1 special character
                      </small>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="tech_contact" className="form-label">
                        Contact Number
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.tech_contact ? "is-invalid" : ""
                        }`}
                        id="tech_contact"
                        name="tech_contact"
                        value={formData.tech_contact}
                        onChange={handleChange}
                        required
                      />
                      {errors.tech_contact && (
                        <div className="invalid-feedback">
                          {errors.tech_contact}
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
                        value={formData.tech_address.flatNo}
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
                        value={formData.tech_address.street}
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
                        value={formData.tech_address.city}
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
                        value={formData.tech_address.state}
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
                        value={formData.tech_address.pincode}
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
                        value={formData.tech_location.lat}
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
                        value={formData.tech_location.lng}
                        onChange={handleChange}
                        required
                      />
                      {errors.lng && (
                        <div className="invalid-feedback">{errors.lng}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                <div className="mb-4">
                  <h5 className="mb-3 text-primary">Your Skills</h5>
                  <div className="mb-3">
                    <label className="form-label">
                      Services You Provide (Max 2)
                    </label>
                    <div className="mb-3 position-relative">
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Search services..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onFocus={() => setShowServicesDropdown(true)}
                      />

                      {/* Click outside handler */}
                      {showServicesDropdown && (
                        <div
                          className="position-fixed top-0 left-0 w-100 h-100"
                          style={{ zIndex: 1 }}
                          onClick={() => setShowServicesDropdown(false)}
                        />
                      )}

                      {showServicesDropdown && (
                        <div
                          className="position-absolute w-100 bg-white border rounded mt-1"
                          style={{
                            maxHeight: "300px",
                            overflowY: "auto",
                            zIndex: 2,
                          }}
                        >
                          {isLoadingServices ? (
                            <div className="text-center p-2">
                              <div
                                className="spinner-border text-primary"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            </div>
                          ) : filteredServices.length > 0 ? (
                            filteredServices.map((service) => (
                              <div
                                key={service}
                                className={`p-2 border-bottom ${
                                  formData.worksKnown.includes(service)
                                    ? "bg-light"
                                    : ""
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleWorksKnownChange(service);
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={formData.worksKnown.includes(
                                      service
                                    )}
                                    readOnly
                                  />
                                  <label className="form-check-label w-100">
                                    {service}
                                  </label>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="p-2 text-muted">
                              No services found
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Selected skills display */}
                    <div className="mt-3">
                      <h6>Selected Skills:</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {formData.worksKnown.map((service) => (
                          <span key={service} className="badge bg-primary">
                            {service}
                            <button
                              type="button"
                              className="ms-2 btn-close btn-close-white"
                              aria-label="Remove"
                              onClick={() => handleWorksKnownChange(service)}
                              style={{ fontSize: "0.5rem" }}
                            />
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="tech_experience" className="form-label">
                      Experience (years)
                    </label>
                    <input
                      type="number"
                      className={`form-control ${
                        errors.tech_experience ? "is-invalid" : ""
                      }`}
                      id="tech_experience"
                      name="tech_experience"
                      value={formData.tech_experience}
                      onChange={handleChange}
                      required
                    />
                    {errors.tech_experience && (
                      <div className="invalid-feedback">
                        {errors.tech_experience}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="d-grid mt-4">
                  <button className="btn btn-primary btn-lg" type="submit">
                    Register as Technician
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

export default TechnicianSignup;
