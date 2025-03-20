import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../../redux/slices/authSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Initialize userData with fallback values
  const [userData, setUserData] = useState({
    user_name: user?.name || "",
    user_email: user?.email || "",
    user_password: user?.password || "",
    user_address: {
      flatNo: user?.address?.flatNo || "",
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      pincode: user?.address?.pincode || "",
    },
    user_contact: user?.contact || "",
  });

  console.log("User:", user);

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
    dispatch(updateUserProfile({ userId: user.id, updatedData: userData }));
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
              name="user_name"
              value={userData.user_name}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              name="user_email"
              value={userData.user_email}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Password:</label>
            <input
              type="password"
              name="user_password"
              value={userData.user_password}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Contact:</label>
            <input
              type="text"
              name="user_contact"
              value={userData.user_contact}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Flat No:</label>
            <input
              type="text"
              name="flatNo"
              value={userData.user_address.flatNo}
              onChange={(e) =>
                setUserData((prev) => ({
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
          <div style={styles.formGroup}>
            <label>Street:</label>
            <input
              type="text"
              name="street"
              value={userData.user_address.street}
              onChange={(e) =>
                setUserData((prev) => ({
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
          <div style={styles.formGroup}>
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={userData.user_address.city}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  user_address: { ...prev.user_address, city: e.target.value },
                }))
              }
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>State:</label>
            <input
              type="text"
              name="state"
              value={userData.user_address.state}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  user_address: { ...prev.user_address, state: e.target.value },
                }))
              }
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Pincode:</label>
            <input
              type="text"
              name="pincode"
              value={userData.user_address.pincode}
              onChange={(e) =>
                setUserData((prev) => ({
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
            <strong>Username:</strong> {userData.user_name}
          </p>
          <p>
            <strong>Email:</strong> {userData.user_email}
          </p>
          <p>
            <strong>Password:</strong> {userData.user_password}
          </p>
          <p>
            <strong>Address:</strong>
          </p>
          <p>Flat No: {userData.user_address.flatNo}</p>
          <p>Street: {userData.user_address.street}</p>
          <p>City: {userData.user_address.city}</p>
          <p>
            State: {userData.user_address.state} -{" "}
            {userData.user_address.pincode}
          </p>
          <p>
            <strong>Contact:</strong> {userData.user_contact}
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
    maxWidth: "800px",
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
