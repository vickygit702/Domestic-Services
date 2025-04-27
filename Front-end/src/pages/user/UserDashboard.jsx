// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom"; // Changed Link to NavLink
// import UserLogout from "../UserLogout";

// const UserDashboard = () => {
//   const { user } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//       if (window.innerWidth >= 768) {
//         setSidebarOpen(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const closeSidebar = () => {
//     if (isMobile) {
//       setSidebarOpen(false);
//     }
//   };

//   return (
//     <div className="container-fluid px-0 min-vh-100">
//       {/* Mobile Header with Hamburger */}
//       <div
//         className="d-md-none bg-dark text-white p-3 d-flex justify-content-between align-items-center position-sticky top-0"
//         style={{ zIndex: 1000 }}
//       >
//         <button className="btn btn-outline-light" onClick={toggleSidebar}>
//           <i className={`bi bi-${sidebarOpen ? "x" : "list"}`}></i>
//         </button>
//         <img
//           src={`http://localhost:8000/uploads/profile/user/${user.profileImg}`}
//           alt="profile"
//           className="rounded-circle bg-white"
//           width="40"
//           height="40"
//         />
//       </div>

//       <div className="row g-0">
//         {/* Left Side Navbar */}
//         <div
//           className={`col-md-3 col-lg-2 bg-dark text-white vh-100 position-fixed sidebar ${
//             sidebarOpen ? "open" : ""
//           }`}
//           style={{ zIndex: 1000 }}
//         >
//           <div className="d-flex flex-column h-100 p-3 p-md-4 position-relative">
//             {/* Profile Image - Desktop */}
//             {!isMobile && (
//               <div className="text-center mb-4">
//                 <img
//                   src={`http://localhost:8000/uploads/profile/user/${user.profileImg}`}
//                   alt="profile"
//                   className="rounded-circle bg-white mx-auto"
//                   width="80"
//                   height="80"
//                 />
//               </div>
//             )}

//             {/* Navigation */}
//             <ul className="nav flex-column mb-3" style={{ flex: "1 1 auto" }}>
//               <li className="nav-item mb-2">
//                 <NavLink
//                   to={`/my-project/user/${id}/dashboard`}
//                   className={({ isActive }) =>
//                     `nav-link text-white py-2 px-3 rounded d-flex align-items-center ${
//                       isActive ? "active bg-primary" : ""
//                     }`
//                   }
//                   onClick={closeSidebar}
//                   end // Add this if it's an exact match
//                 >
//                   <i className="bi bi-speedometer2 me-2"></i>
//                   Dashboard
//                 </NavLink>
//               </li>
//               <li className="nav-item mb-2">
//                 <NavLink
//                   to={`/my-project/user/${id}/my-bookings`}
//                   className={({ isActive }) =>
//                     `nav-link text-white py-2 px-3 rounded d-flex align-items-center ${
//                       isActive ? "active bg-primary" : ""
//                     }`
//                   }
//                   onClick={closeSidebar}
//                 >
//                   <i className="bi bi-calendar-check me-2"></i>
//                   My Bookings
//                 </NavLink>
//               </li>
//               <li className="nav-item mb-2">
//                 <NavLink
//                   to={`/my-project/user/${id}/profile`}
//                   className={({ isActive }) =>
//                     `nav-link text-white py-2 px-3 rounded d-flex align-items-center ${
//                       isActive ? "active bg-primary" : ""
//                     }`
//                   }
//                   onClick={closeSidebar}
//                 >
//                   <i className="bi bi-person-circle me-2"></i>
//                   Profile
//                 </NavLink>
//               </li>
//             </ul>
//             <UserLogout />
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="col-md-9 col-lg-10 ms-auto">
//           <div className="p-3">
//             <div className="bg-white rounded-4 shadow-sm p-2">
//               <Outlet />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Custom CSS */}
//       <style>{`
//         .nav-link:hover {
//           background-color: rgba(255, 255, 255, 0.1) !important;
//         }
//         .nav-link.active {
//           background-color: #0d6efd !important;
//         }

//         /* Mobile sidebar styles */
//         @media (max-width: 767.98px) {
//           .sidebar {
//             transform: translateX(-100%);
//             transition: transform 0.3s ease-in-out;
//             width: 260px;
//             overflow-y: auto;
//           }
//           .sidebar.open {
//             transform: translateX(0);
//           }
//           .sidebar > div {
//             min-height: 100vh;
//             padding-bottom: 80px;
//           }
//           .nav {
//             max-height: 490px;

//           }
//         }

//         /* Backdrop for mobile */
//         .sidebar::after {
//           content: "";
//           position: fixed;
//           top: 0;
//           right: 0;
//           width: 100vw;
//           height: 100vh;
//           background-color: rgba(0, 0, 0, 0.5);
//           z-index: -1;
//           opacity: 0;
//           transition: opacity 0.3s ease-in-out;
//           pointer-events: none;
//         }

//         .sidebar.open::after {
//           opacity: 1;
//           pointer-events: auto;
//         }
//       `}</style>
//     </div>
//   );
// };
// export default UserDashboard;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import UserLogout from "../UserLogout";

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
                  src={`http://localhost:8000/uploads/profile/user/${user.profileImg}`}
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
