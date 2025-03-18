import React, { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  // Sample user data (replace with data from Redux or API)
  const [userData, setUserData] = useState({
    username: user.name,
    email: user.email,
    password: "********", // Masked password
    address: "123 Main St, City, Country",
    contact: user.contact,
  });

  // State to manage edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Add logic to update profile (e.g., API call)
    console.log("Updated Profile:", userData);
  };

  return (
    <div style={styles.container}>
      <h2>Profile</h2>

      {isEditing ? (
        // Edit Mode
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Contact:</label>
            <input
              type="text"
              name="contact"
              value={userData.contact}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" style={styles.saveButton}>
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            style={styles.cancelButton}
          >
            Cancel
          </button>
        </form>
      ) : (
        // View Mode
        <div style={styles.profileDetails}>
          <p>
            <strong>Username:</strong> {userData.username}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Password:</strong> {userData.password}
          </p>
          <p>
            <strong>Address:</strong> {userData.address}
          </p>
          <p>
            <strong>Contact:</strong> {userData.contact}
          </p>
          <button onClick={() => setIsEditing(true)} style={styles.editButton}>
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
  },
  formGroup: {
    marginBottom: "15px",
  },
  profileDetails: {
    maxWidth: "400px",
  },
  editButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  saveButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginRight: "10px",
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Profile;
