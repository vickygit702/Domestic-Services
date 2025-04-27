import React from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";

const Welcome = () => {
  // Stats data
  const stats = [
    { value: "1250+", label: "Verified Technicians", color: "bg-gray" },
    { value: "15+", label: "Services", color: "bg-blue" },
    { value: "8500+", label: "Happy Customers", color: "bg-pink" },
    { value: "12K+", label: "Jobs Completed", color: "bg-orange" },
  ];

  // Services data
  const services = [
    { name: "Plumbing", icon: "bi-droplet", color: "text-blue" },
    { name: "Electrical", icon: "bi-lightning-charge", color: "text-yellow" },
    { name: "Cleaning", icon: "bi-snow", color: "text-green" },
    { name: "AC Repair", icon: "bi-snow", color: "text-cyan" },
    { name: "Carpentry", icon: "bi-hammer", color: "text-brown" },
    { name: "Painting", icon: "bi-brush", color: "text-indigo" },
  ];

  return (
    <div
      className="min-vh-100 position-relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
      }}
    >
      {/* Animated Background Elements */}
      <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden">
        {/* Blob decorations */}
        <div
          className="position-absolute"
          style={{
            top: "20%",
            left: "-10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(106,17,203,0.15) 0%, rgba(37,117,252,0.1) 70%, transparent 100%)",
            filter: "blur(40px)",
            zIndex: 0,
          }}
        ></div>
        <div
          className="position-absolute"
          style={{
            bottom: "10%",
            right: "-5%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(17,153,142,0.15) 0%, rgba(56,239,125,0.1) 70%, transparent 100%)",
            filter: "blur(50px)",
            zIndex: 0,
          }}
        ></div>

        {/* Grid pattern overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.03) 2px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 2px, transparent 1px)",
            backgroundSize: "40px 40px",
            zIndex: 0,
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="container position-relative z-1 py-5">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-lg-10 text-center">
            {/* Hero Section */}
            <div className="mb-5 px-3">
              <div
                className="d-inline-block p-3 mb-4 rounded-4"
                style={{
                  background:
                    "linear-gradient(45deg, rgba(253, 49, 192, 0.15) 0%, rgba(37,117,252,0.15) 100%)",
                }}
              >
                <span className="badge bg-primary bg-opacity-10 text-black fs-3 fw-bold">
                  PREMIUM DOMESTIC SOLUTIONS
                </span>
              </div>

              <p
                className="lead text-muted mb-4 mx-auto"
                style={{ maxWidth: "600px" }}
              >
                Connecting you with certified professionals for all your home
                maintenance and repair needs
              </p>

              {/* Stats Cards - Colorful Grid */}
              <div className="row g-4 justify-content-center mb-5">
                {stats.map((stat, index) => (
                  <div key={index} className="col-md-6 col-lg-3">
                    <div
                      className={`p-4 rounded-4 shadow-sm text-white ${stat.color}`}
                      style={{
                        background: `linear-gradient(135deg, var(--bs-${
                          stat.color.split("-")[1]
                        }), #${Math.floor(Math.random() * 16777215).toString(
                          16
                        )})`,
                        minHeight: "140px",
                      }}
                    >
                      <h3 className="display-5 fw-bold mb-1">{stat.value}</h3>
                      <p className="mb-0 text-white-80">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Services Section */}
            <div className="mb-5">
              <h2
                className="h1 fw-bold mb-4"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, #11998e 0%, #38ef7d 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Our Services
              </h2>
              <div className="row g-4">
                {services.map((service, index) => (
                  <div key={index} className="col-6 col-md-4 col-lg-2">
                    <div
                      className="p-4 rounded-4 border-0 shadow-sm text-center hover-shadow transition-all"
                      style={{
                        transition: "all 0.3s ease",
                        background: "rgba(255,255,255,0.9)",
                      }}
                    >
                      <i
                        className={`bi ${service.icon} fs-3 mb-3 ${service.color}`}
                      ></i>
                      <h3 className="h5 fw-bold">{service.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial Preview */}
            <div
              className="bg-white rounded-4 shadow-lg p-4 mb-5"
              style={{
                background:
                  "linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.9))",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="row align-items-center">
                <div className="col-md-3 text-center mb-3 mb-md-0">
                  <div
                    className="mx-auto rounded-circle overflow-hidden"
                    style={{
                      width: "100px",
                      height: "100px",
                      background: "#f0f0f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i className="bi bi-person-circle fs-1 text-muted"></i>
                  </div>
                  <div className="mt-2 fw-bold">Sarah J.</div>
                  <div className="small text-muted">Homeowner</div>
                </div>
                <div className="col-md-9">
                  <blockquote className="mb-0">
                    <i className="bi bi-quote fs-3 text-primary opacity-25"></i>
                    <p className="lead fs-5 mb-3">
                      I've used Domestic Services for multiple repairs and each
                      time the technicians were professional, punctual, and
                      fixed the issues perfectly.
                    </p>
                    <div className="text-warning">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="bi bi-star-fill"></i>
                      ))}
                    </div>
                  </blockquote>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-primary rounded-4 overflow-hidden shadow-lg mb-5 position-relative">
              <div
                className="position-absolute top-0 start-0 w-100 h-100 opacity-10"
                style={{
                  background:
                    "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')",
                }}
              ></div>
              <div className="p-4 p-md-5 position-relative">
                <h2 className="display-8 fw-bold text-white mb-4">
                  Ready to transform your home?
                </h2>
                <p className="lead text-white text-opacity-80 mb-4">
                  Join thousands of satisfied homeowners and professional
                  technicians
                </p>

                <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
                  <Link
                    to="/my-project/user/signup"
                    className="btn btn-light btn-lg px-4 py-3 rounded-pill fw-bold shadow-sm text-primary"
                  >
                    <i className="bi bi-person-plus-fill me-2"></i>
                    Sign Up as User
                  </Link>
                  <Link
                    to="/my-project/technician/signup"
                    className="btn btn-outline-light btn-lg px-4 py-3 rounded-pill fw-bold shadow-sm"
                  >
                    <i className="bi bi-tools me-2"></i>
                    Join as Technician
                  </Link>
                </div>
              </div>
            </div>

            {/* Login Section */}
            <div className="bg-white rounded-4 shadow-lg p-4">
              <h3 className="h4 mb-4 text-dark fw-bold">Already a member?</h3>
              <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
                <Link
                  to="/my-project/user/login"
                  className="btn btn-outline-dark btn-lg px-4 py-2 rounded-pill fw-bold"
                >
                  <i className="bi bi-person-fill me-2"></i>
                  User Login
                </Link>
                <Link
                  to="/my-project/technician/login"
                  className="btn btn-outline-dark btn-lg px-4 py-2 rounded-pill fw-bold"
                >
                  <i className="bi bi-tools me-2"></i>
                  Technician Login
                </Link>
              </div>
              <div className="mt-4">
                <Link to="/about" className="text-muted me-3">
                  About Us
                </Link>
                <Link to="/contact" className="text-muted me-3">
                  Contact
                </Link>
                <Link to="/faq" className="text-muted">
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="position-absolute bottom-0 w-100 py-3"
        style={{
          background: "rgba(149, 220, 188, 0.8)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start text-black-50">
              <p className="m-0 small ">
                © {new Date().getFullYear()} Domestic Solutions. All rights
                reserved.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end mt-2 mt-md-0">
              <div className="d-flex justify-content-center justify-content-md-end gap-3">
                <a href="#" className="text-black-50 hover-text-white">
                  <i className="bi bi-facebook fs-5"></i>
                </a>
                <a href="#" className="text-black-50 hover-text-white">
                  <i className="bi bi-twitter fs-5"></i>
                </a>
                <a href="#" className="text-black-50 hover-text-white">
                  <i className="bi bi-instagram fs-5"></i>
                </a>
                <a href="#" className="text-black-50 hover-text-white">
                  <i className="bi bi-linkedin fs-5"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
