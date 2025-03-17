import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TechnicianSignup = () => {
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    tech_name: "",
    tech_email: "",
    tech_password: "",
    tech_contact: "",
    lat: "",
    long: "",
    worksKnown: [],
    tech_experience: "",
  });

  // State for error handling
  const [error, setError] = useState("");

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

    try {
      // Send form data to the backend
      const response = await axios.post(
        "http://localhost:8000/auth/api/signupTechnician",
        formData
      );

      // Handle successful signup
      console.log("Signup successful:", response.data);
      navigate("/login"); // Redirect to login page
    } catch (err) {
      // Handle errors
      setError(err.response?.data?.message || "Signup failed");
      console.error("Signup error:", err);
    }
  };

  return (
    <div>
      <h2>Technician Signup</h2>

      <form onSubmit={handleSubmit}>
        {/* Name */}

        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        {/* Email */}

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Password */}

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* Contact */}

        <label>Contact:</label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          required
        />

        {/* Location */}

        <label>Latitude:</label>
        <input
          type="text"
          name="lat"
          value={formData.lat}
          onChange={handleChange}
          required
        />
        <label>Longitude:</label>
        <input
          type="text"
          name="long"
          value={formData.long}
          onChange={handleChange}
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
          name="experience"
          value={formData.experience}
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
