import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import UserLogout from "../UserLogout";
const backend_url = import.meta.env.VITE_BACKENDURL;

const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id } = useParams();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div
      className="min-vh-100"
      style={{
        overflowX: "hidden",
        background:
          "linear-gradient(135deg,rgb(55, 125, 195) 0%,rgb(232, 144, 246) 100%)",
      }}
    >
      {/* Top Navigation Bar */}
      <nav
        className="navbar shadow-sm"
        style={{
          background: "rgb(255, 255, 255)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div className="container-fluid">
          {/* Company Logo/Name */}
          <NavLink
            to={`/my-project/user/${id}/dashboard`}
            className="navbar-brand fw-bold d-flex align-items-center"
          >
            <i className="bi bi-house-gear-fill me-2"></i>
            <span className="d-none d-sm-inline">Domestic Solutions</span>
          </NavLink>

          {/* Profile Dropdown */}
          <div className="d-flex align-items-center px-md-5">
            <div className="dropdown">
              <button
                className="btn btn-transparent dropdown-toggle d-flex align-items-center"
                onClick={toggleDropdown}
                style={{ color: "black" }}
              >
                <img
                  src={`${backend_url}/uploads/profile/user/${user.profileImg}`}
                  alt="profile"
                  className="rounded-circle bg-white me-2"
                  width="40"
                  height="40"
                />
                <span className="d-none d-lg-inline">{user.name}</span>
                <i
                  className={`bi bi-chevron-${
                    dropdownOpen ? "up" : "down"
                  } ms-1`}
                ></i>
              </button>

              {/* Dropdown Menu */}
              <div
                className={`dropdown-menu dropdown-menu-end shadow-lg ${
                  dropdownOpen ? "show" : ""
                }`}
                style={{
                  border: "none",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(10px)",
                  minWidth: "220px",
                }}
              >
                <div className="px-4 py-3 border-bottom">
                  <h6 className="mb-0 fw-bold">{user.name}</h6>
                  <small className="text-muted">{user.email}</small>
                </div>
                <div className="p-2">
                  <NavLink
                    to={`/my-project/user/${id}/dashboard`}
                    className="dropdown-item d-flex align-items-center py-2 rounded"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <i className="bi bi-speedometer2 me-2 text-primary"></i>
                    Dashboard
                  </NavLink>
                  <NavLink
                    to={`/my-project/user/${id}/my-bookings`}
                    className="dropdown-item d-flex align-items-center py-2 rounded"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <i className="bi bi-calendar-check me-2 text-primary"></i>
                    My Bookings
                  </NavLink>
                  <NavLink
                    to={`/my-project/user/${id}/profile`}
                    className="dropdown-item d-flex align-items-center py-2 rounded"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <i className="bi bi-person-circle me-2 text-primary"></i>
                    Profile
                  </NavLink>
                </div>
                <div className="dropdown-divider"></div>
                <div className="px-2">
                  <UserLogout />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container-fluid px-0">
        <div className="row g-0">
          {/* Main Content Area */}
          <div className="col-12">
            <div className="p-2 px-md-2">
              <div
                className="bg-white rounded-4 shadow-sm py-4"
                style={{
                  minHeight: "calc(100vh - 100px)",
                  background: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(5px)",
                }}
              >
                <Outlet />
              </div>
            </div>
            {/* Footer - Adjusted to connect with contact form */}
            <footer
              className="w-100 py-3"
              style={{
                background: "rgb(0, 0, 0)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-6 text-center text-md-start text-white">
                    <p className="m-0 small">
                      © {new Date().getFullYear()} Domestic Solutions. All
                      rights reserved.
                    </p>
                  </div>
                  <div className="col-md-6 text-center text-md-end mt-2 mt-md-0">
                    <div className="d-flex justify-content-center justify-content-md-end gap-3">
                      <a href="#" className="text-white-50 hover-text-white">
                        <i className="bi bi-facebook fs-5"></i>
                      </a>
                      <a href="#" className="text-white-50 hover-text-white">
                        <i className="bi bi-twitter fs-5"></i>
                      </a>
                      <a href="#" className="text-white-50 hover-text-white">
                        <i className="bi bi-instagram fs-5"></i>
                      </a>
                      <a href="#" className="text-white-50 hover-text-white">
                        <i className="bi bi-linkedin fs-5"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style>{`
        
        .dropdown-item:hover, .dropdown-item:focus {
          background-color: rgba(13, 110, 253, 0.1) !important;
          color: #0d6efd !important;
        }
        
        .dropdown-item.active {
          background-color: rgba(13, 110, 253, 0.2) !important;
          color: #0d6efd !important;
        }
        
        .navbar-brand:hover {
          opacity: 0.9;
        }
        
        @media (max-width: 767.98px) {
          .dropdown-menu {
            position: fixed !important;
            top: 70px !important;
            left: 10px !important;
            right: 10px !important;
            width: auto !important;
          }
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;
