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
    tech_location: { lat: "", lng: "" },
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
  if (loading) return <div>Loading.....</div>;
  return (
    <div>
      <h2>Technician Signup</h2>

      <form onSubmit={handleSubmit}>
        {/* Name */}

        <label>Name:</label>
        <input
          type="text"
          name="tech_name"
          value={formData.tech_name}
          onChange={handleChange}
          required
        />

        {/* Email */}

        <label>Email:</label>
        <input
          type="email"
          name="tech_email"
          value={formData.tech_email}
          onChange={handleChange}
          required
        />

        {/* Password */}

        <label>Password:</label>
        <input
          type="password"
          name="tech_password"
          value={formData.tech_password}
          onChange={handleChange}
          required
        />

        {/* Contact */}

        <label>Contact:</label>
        <input
          type="text"
          name="tech_contact"
          value={formData.tech_contact}
          onChange={handleChange}
          required
        />

        {/* Address */}
        <label>FlatNo:</label>
        <input
          type="text"
          name="flatNo"
          value={formData.tech_address.flatNo}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              tech_address: { ...prev.tech_address, flatNo: e.target.value },
            }))
          }
          required
        />
        <label>Street:</label>
        <input
          type="text"
          name="street"
          value={formData.tech_address.street}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              tech_address: { ...prev.tech_address, street: e.target.value },
            }))
          }
          required
        />
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={formData.tech_address.city}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              tech_address: { ...prev.tech_address, city: e.target.value },
            }))
          }
          required
        />
        <label>State:</label>
        <input
          type="text"
          name="state"
          value={formData.tech_address.state}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              tech_address: { ...prev.tech_address, state: e.target.value },
            }))
          }
          required
        />
        <label>Pincode:</label>
        <input
          type="text"
          name="pincode"
          value={formData.tech_address.pincode}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              tech_address: { ...prev.tech_address, pincode: e.target.value },
            }))
          }
          required
        />

        {/* Location */}

        <label>Latitude:</label>
        <input
          type="text"
          name="lat"
          value={formData.tech_location.lat}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              tech_location: { ...prev.tech_location, lat: e.target.value },
            }))
          }
          required
        />
        <label>Longitude:</label>
        <input
          type="text"
          name="lng"
          value={formData.tech_location.lng}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              tech_location: { ...prev.tech_location, lng: e.target.value },
            }))
          }
          required
        />

        {/* Works Known (Checkboxes) */}

        <label>Works Known:</label>
        {["Plumbing", "Electrical", "Carpentry", "HVAC", "Painting"].map(
          (work) => (
            <div key={work}>
              <input
                type="checkbox"
                name="worksKnown"
                value={work}
                checked={formData.worksKnown.includes(work)}
                onChange={handleWorksKnownChange}
              />
              <label>{work}</label>
            </div>
          )
        )}

        {/* Experience */}

        <label>Experience (in years):</label>
        <input
          type="number"
          name="tech_experience"
          value={formData.tech_experience}
          onChange={handleChange}
          required
        />

        {/* Submit Button */}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

// Styles
// const styles = {
//   container: {
//     maxWidth: "400px",
//     margin: "0 auto",
//     padding: "20px",
//     border: "1px solid #ccc",
//     borderRadius: "5px",
//     backgroundColor: "#f9f9f9",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   formGroup: {
//     marginBottom: "15px",
//   },
//   checkboxGroup: {
//     display: "flex",
//     alignItems: "center",
//     marginBottom: "5px",
//   },
//   error: {
//     color: "red",
//     marginBottom: "15px",
//   },
//   submitButton: {
//     padding: "10px",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
// };

export default TechnicianSignup;
