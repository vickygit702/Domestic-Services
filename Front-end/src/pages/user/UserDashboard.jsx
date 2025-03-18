import React from "react";

import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
const UserDashboard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div style={styles.container}>
      {/* Left Side Navbar */}
      <div style={styles.navbar}>
        <h2>User Dashboard</h2>
        <ul style={styles.navList}>
          <li>
            <Link
              to={`/my-project/user/${id}/dashboard`}
              style={styles.navLink}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to={`/my-project/user/${id}/my-bookings`}
              style={styles.navLink}
            >
              My Bookings
            </Link>
          </li>
          <li>
            <Link to={`/my-project/user/${id}/profile`} style={styles.navLink}>
              Profile
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        <Outlet /> {/* Nested routes will render here */}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
  },
  navbar: {
    width: "200px",
    // position: "fixed",
    backgroundColor: "#f4f4f4",
    padding: "20px",
    height: "92vh",
    borderRight: "1px solid #ccc",
  },
  navList: {
    listStyle: "none",
    padding: "0",
  },
  navLink: {
    textDecoration: "none",
    color: "#0519fa",
    fontSize: "16px",
    display: "block",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "5px",
    transition: "background-color 0.3s",
  },
  content: {
    flex: 1,
    padding: "20px",
  },
};

export default UserDashboard;
