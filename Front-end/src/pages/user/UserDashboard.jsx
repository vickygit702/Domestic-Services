import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import UserLogout from "../UserLogout";

const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="container-fluid px-0 min-vh-100">
      {/* Mobile Header with Hamburger */}
      <div
        className="d-md-none bg-dark text-white p-3 d-flex justify-content-between align-items-center position-sticky top-0"
        style={{ zIndex: 1000 }}
      >
        <button className="btn btn-outline-light" onClick={toggleSidebar}>
          <i className={`bi bi-${sidebarOpen ? "x" : "list"}`}></i>
        </button>
        <img
          src={`http://localhost:8000/uploads/profile/user/${user.profileImg}`}
          alt="profile"
          className="rounded-circle bg-white"
          width="40"
          height="40"
        />
      </div>

      <div className="row g-0">
        {/* Left Side Navbar */}
        <div
          className={`col-md-3 col-lg-2 bg-dark text-white vh-100 position-fixed sidebar ${
            sidebarOpen ? "open" : ""
          }`}
          style={{ zIndex: 1000 }}
        >
          <div className="d-flex flex-column h-100 p-3 p-md-4 position-relative">
            {/* Profile Image - Desktop */}
            {!isMobile && (
              <div className="text-center mb-4">
                <img
                  src={`http://localhost:8000/uploads/profile/user/${user.profileImg}`}
                  alt="profile"
                  className="rounded-circle bg-white mx-auto"
                  width="80"
                  height="80"
                />
              </div>
            )}

            {/* Navigation */}
            <ul className="nav flex-column mb-3" style={{ flex: "1 1 auto" }}>
              <li className="nav-item mb-2">
                <Link
                  to={`/my-project/user/${id}/dashboard`}
                  className="nav-link text-white py-2 px-3 rounded d-flex align-items-center"
                  activeClassName="active bg-primary"
                  onClick={closeSidebar}
                >
                  <i className="bi bi-speedometer2 me-2"></i>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to={`/my-project/user/${id}/my-bookings`}
                  className="nav-link text-white py-2 px-3 rounded d-flex align-items-center"
                  activeClassName="active bg-primary"
                  onClick={closeSidebar}
                >
                  <i className="bi bi-calendar-check me-2"></i>
                  My Bookings
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to={`/my-project/user/${id}/profile`}
                  className="nav-link text-white py-2 px-3 rounded d-flex align-items-center"
                  activeClassName="active bg-primary"
                  onClick={closeSidebar}
                >
                  <i className="bi bi-person-circle me-2"></i>
                  Profile
                </Link>
              </li>
            </ul>
            <UserLogout />
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 ms-auto">
          <div className="p-4">
            <div className="bg-white rounded-4 shadow-sm p-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .nav-link:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
        .nav-link.active {
          background-color: #0d6efd !important;
        }

        /* Mobile sidebar styles */
        @media (max-width: 767.98px) {
          .sidebar {
            transform: translateX(-100%);
            transition: transform 0.3s ease-in-out;
            width: 280px;
            overflow-y: auto;
          }
          .sidebar.open {
            transform: translateX(0);
          }
          .sidebar > div {
            min-height: 100vh;
            padding-bottom: 80px; /* Space for logout button */
          }
          .nav {
            max-height: 560px;
            padding-left: 30px;
          }
        }

        /* Backdrop for mobile */
        .sidebar::after {
          content: "";
          position: fixed;
          top: 0;
          right: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
          pointer-events: none;
        }

        .sidebar.open::after {
          opacity: 1;
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
};
export default UserDashboard;
