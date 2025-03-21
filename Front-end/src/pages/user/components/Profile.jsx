import React, { useEffect, useState } from "react";
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
    user_contact: user?.contact || "",
    user_address: {
      flatNo: user?.address?.flatNo || "",
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      pincode: user?.address?.pincode || "",
    },
    user_location: {
      lat: user?.location?.lat || 0,
      lng: user?.location?.lng || 0,
    },
  });
  useEffect(() => {
    console.log(user);
  }, [user, userData]);

  // Track changes
  const [changes, setChanges] = useState({});

  // State to manage edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setChanges((prev) => ({ ...prev, [name]: value }));
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle nested input changes (e.g., address)
  const handleNestedChange = (e, nestedKey) => {
    const { name, value } = e.target;

    // Merge the updated field with the existing nested object
    setChanges((prev) => ({
      ...prev,
      [nestedKey]: { ...prev[nestedKey], [name]: value },
    }));

    setUserData((prev) => ({
      ...prev,
      [nestedKey]: { ...prev[nestedKey], [name]: value },
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send only the modified fields
    dispatch(updateUserProfile({ userId: user.id, updatedData: changes }));

    // Exit edit mode
    setIsEditing(false);
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
            />
          </div>
          <div style={styles.formGroup}>
            <label>Password:</label>
            <input
              type="password"
              name="user_password"
              value={userData.user_password}
              onChange={handleChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Contact:</label>
            <input
              type="number"
              name="user_contact"
              value={userData.user_contact}
              onChange={handleChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Flat No:</label>
            <input
              type="text"
              name="flatNo"
              value={userData.user_address.flatNo}
              onChange={(e) => handleNestedChange(e, "user_address")}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Street:</label>
            <input
              type="text"
              name="street"
              value={userData.user_address.street}
              onChange={(e) => handleNestedChange(e, "user_address")}
            />
          </div>
          <div style={styles.formGroup}>
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={userData.user_address.city}
              onChange={(e) => handleNestedChange(e, "user_address")}
            />
          </div>
          <div style={styles.formGroup}>
            <label>State:</label>
            <input
              type="text"
              name="state"
              value={userData.user_address.state}
              onChange={(e) => handleNestedChange(e, "user_address")}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Pincode:</label>
            <input
              type="number"
              name="pincode"
              value={userData.user_address.pincode}
              onChange={(e) => handleNestedChange(e, "user_address")}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Latitude:</label>
            <input
              type="number"
              name="lat"
              value={userData.user_location.lat}
              onChange={(e) => handleNestedChange(e, "user_location")}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Longitude:</label>
            <input
              type="number"
              name="lng"
              value={userData.user_location.lng}
              onChange={(e) => handleNestedChange(e, "user_location")}
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
            <strong>Contact:</strong> {userData.user_contact}
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
            <strong>Location:</strong> Lat: {userData.user_location.lat}, Lng:{" "}
            {userData.user_location.lng}
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
