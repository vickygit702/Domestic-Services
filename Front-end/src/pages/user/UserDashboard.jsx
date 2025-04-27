import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import UserLogout from "../UserLogout"; // Assuming this component exists and handles logout logic

const UserDashboard = () => {
  // Retrieve user data from Redux store
  const { user } = useSelector((state) => state.auth);
  // Get the user ID from URL parameters
  const { id } = useParams();
  // State for sidebar visibility (mobile)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // State to track if the view is mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Effect to handle window resizing for mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 768;
      setIsMobile(mobileView);
      // Close sidebar automatically on larger screens
      if (!mobileView) {
        setSidebarOpen(false);
      }
    };
    // Add event listener for resize
    window.addEventListener("resize", handleResize);
    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array means this runs once on mount and cleanup on unmount

  // Function to toggle the sidebar state
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Default profile image path (ensure this file exists in your public folder)
  const defaultProfileImg = '/default-user.jpg';

  return (
    <div className="min-vh-100 bg-light">
      {/* Top Navigation Bar */}
      <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3 px-4 d-flex justify-content-between align-items-center">
        {/* Brand Logo */}
        <div className="d-flex align-items-center gap-4">
          <Link className="navbar-brand fw-bold fs-3 text-primary" to="/">
            DomesticPro
          </Link>
        </div>

        {/* Profile Dropdown */}
        <div className="d-flex align-items-center gap-3">
          <div className="dropdown">
            {/* Profile Image - Acts as dropdown toggle */}
            <img
              src={user?.profileImg ? `http://localhost:8000/uploads/profile/user/${user.profileImg}` : defaultProfileImg}
              alt="Profile"
              className="rounded-circle"
              width="40"
              height="40"
              role="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown" // Bootstrap attribute to toggle dropdown
              aria-expanded="false"
              style={{ objectFit: "cover", cursor: "pointer" }}
              // Error handler for profile image loading
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop if default also fails
                e.target.src = defaultProfileImg; // Fallback to default image
              }}
            />
            {/* Dropdown Menu */}
            <ul className="dropdown-menu dropdown-menu-end mt-2" aria-labelledby="dropdownMenuButton">
              <li><h6 className="dropdown-header">My Account</h6></li>
              <li><hr className="dropdown-divider" /></li>
              {/* Navigation Links */}
              <li><NavLink className="dropdown-item" to={`/my-project/user/${id}/profile`}>Profile</NavLink></li>
              <li><NavLink className="dropdown-item" to={`/my-project/user/${id}/my-bookings`}>My Bookings</NavLink></li>
              <li><hr className="dropdown-divider" /></li>
              {/* Logout Option - Apply text-danger to the list item */}
              <li className="text-danger">
                 {/* Assuming UserLogout renders an <a> or <button> that needs dropdown-item */}
                <UserLogout className="dropdown-item" />
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content Area - Renders nested routes */}
      <div className="d-flex">
        {/* Sidebar placeholder (can be added here if needed) */}
        {/* <aside>...</aside> */}
        {/* Outlet renders the matched child route component */}
        <main className="flex-grow-1 p-4"> {/* Added padding and flex-grow */}
           <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
