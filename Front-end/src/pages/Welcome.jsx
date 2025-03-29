import React from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";

const Welcome = () => {
  return (
    <div className="min-vh-100 bg-light position-relative overflow-hidden">
      {/* Background Decoration */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-right from-primary to-info opacity-10"></div>

      {/* Main Content */}
      <div className="container position-relative z-1 py-5">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-lg-8 text-center">
            {/* Main Title */}
            <h1
              className="display-3 fw-bold mb-4 text-gradient"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              DOMESTIC SERVICES
            </h1>

            {/* What We Do Section */}
            <div className="bg-white p-4 p-md-5 rounded-4 shadow-lg mb-5">
              <h2
                className="h1 mb-4 text-gradient"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, #11998e 0%, #38ef7d 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                What We Do
              </h2>

              <ul className="list-unstyled fs-4 text-start text-md-center">
                <li className="mb-3 d-flex align-items-center">
                  <span className="badge bg-primary me-3">✓</span>
                  Connect users with verified, professional technicians
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <span className="badge bg-primary me-3">✓</span>
                  Provide reliable home services at your doorstep
                </li>
                <li className="d-flex align-items-center">
                  <span className="badge bg-primary me-3">✓</span>
                  Offer transparent pricing and quality guarantees
                </li>
              </ul>
            </div>

            {/* Account Type Selection */}
            <div className="bg-white p-4 rounded-4 shadow-lg">
              <h2 className="h3 mb-4 text-dark">Select Account Type</h2>

              <div className="d-flex flex-column flex-md-row justify-content-center gap-4">
                <Link
                  to="/my-project/user/login"
                  className="btn btn-primary btn-lg px-5 py-3 rounded-pill fw-bold shadow-sm"
                >
                  <i className="bi bi-person-fill me-2"></i>
                  User Login
                </Link>

                <Link
                  to="/my-project/technician/login"
                  className="btn btn-outline-primary btn-lg px-5 py-3 rounded-pill fw-bold shadow-sm"
                >
                  <i className="bi bi-tools me-2"></i>
                  Technician Login
                </Link>
              </div>

              <p className="mt-4 text-muted">
                New to our platform?{" "}
                <Link
                  to="/my-project/user/signup"
                  className="text-primary fw-bold"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="position-absolute bottom-0 w-100 py-3 bg-dark">
        <div className="container text-center text-white">
          <p className="m-0">
            All Rights Reserved © {new Date().getFullYear()} Domestic Services
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
