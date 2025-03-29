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

  // State for error handling

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox changes for worksKnown
  const handleWorksKnownChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        worksKnown: [...formData.worksKnown, value],
      });
    } else {
      setFormData({
        ...formData,
        worksKnown: formData.worksKnown.filter((work) => work !== value),
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signupTechnicianStart());
    try {
      // Send form data to the backend
      const response = await axios.post(
        "http://localhost:8000/auth/api/signupTechnician",
        formData
      );

      // Handle successful signup
      const { techDetail } = response.data;
      if (techDetail) {
        dispatch(signupTechnicianSuccess(techDetail));
        toast.success(response.data.message);
      }
    } catch (e) {
      // Handle errors

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
              <h2 className="text-center mb-0">Technician Registration</h2>
              <p className="text-center mb-0 opacity-75">
                Join our network of skilled professionals
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
                  <h5 className="mb-3 text-primary">Personal Information</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="tech_name" className="form-label">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="tech_name"
                        name="tech_name"
                        value={formData.tech_name}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide your name.
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="tech_email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="tech_email"
                        name="tech_email"
                        value={formData.tech_email}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a valid email.
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="tech_password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="tech_password"
                        name="tech_password"
                        value={formData.tech_password}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide a password.
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="tech_contact" className="form-label">
                        Contact Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="tech_contact"
                        name="tech_contact"
                        value={formData.tech_contact}
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
                        value={formData.tech_address.flatNo}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            tech_address: {
                              ...prev.tech_address,
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
                        value={formData.tech_address.street}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            tech_address: {
                              ...prev.tech_address,
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
                        value={formData.tech_address.city}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            tech_address: {
                              ...prev.tech_address,
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
                        value={formData.tech_address.state}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            tech_address: {
                              ...prev.tech_address,
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
                        value={formData.tech_address.pincode}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            tech_address: {
                              ...prev.tech_address,
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
                        value={formData.tech_location.lat}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            tech_location: {
                              ...prev.tech_location,
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
                        value={formData.tech_location.lng}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            tech_location: {
                              ...prev.tech_location,
                              lng: e.target.value,
                            },
                          }))
                        }
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                <div className="mb-4">
                  <h5 className="mb-3 text-primary">Your Skills</h5>
                  <div className="mb-3">
                    <label className="form-label">Services You Provide</label>
                    <div className="row g-2">
                      {[
                        "Plumbing",
                        "Electrical",
                        "Carpentry",
                        "HVAC",
                        "Painting",
                      ].map((work) => (
                        <div className="col-6 col-md-4" key={work}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`work-${work}`}
                              name="worksKnown"
                              value={work}
                              checked={formData.worksKnown.includes(work)}
                              onChange={handleWorksKnownChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`work-${work}`}
                            >
                              {work}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="tech_experience" className="form-label">
                      Experience (years)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="tech_experience"
                      name="tech_experience"
                      value={formData.tech_experience}
                      onChange={handleChange}
                      required
                    />
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
