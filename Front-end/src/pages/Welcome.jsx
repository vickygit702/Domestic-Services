import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBroom, FaTools, FaPaintRoller, FaTruckMoving, FaFaucet, FaPlug } from "react-icons/fa";
import PopularBusinessCard from "./user/component/PopularBusinessCard";


const Welcome = () => {
  const popularServices = [
    {
      id: "clqpla5ey0b0m0bk4kvpqtmq9", // Example ID
      name: "Washing Cloths",
      image: "https://media.graphassets.com/FMCZEUelRfGQcjXfQXPj",
      address: "525 N Tyron Street, New York",
      category: "Cleaning", // Added category
      provider: "Emma Potter", // Added provider
    },
    {
      id: "some-other-id", // Example ID
      name: "House Cleaning",
      image: "https://plus.unsplash.com/premium_photo-1664910244290-867148725f01?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGRvbWVzdGljJTIwd29ya3xlbnwwfHwwfHx8MA%3D%3D",
      address: "255 Grand Park Ave, New York",
      category: "Cleaning", // Example category
      provider: "John Doe", // Example provider
    },
    {
      id: "another-unique-id", // Example ID
      name: "House Repairing",
      image: "https://plus.unsplash.com/premium_photo-1723640428792-c6ddd28f305b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG91c2UlMjByZXBhaXJpbmd8ZW58MHx8MHx8fDA%3D",
      address: "412 N Tryon Street, New York",
      category: "Repair", // Example category
      provider: "Jane Smith", // Example provider
    },
    {
      id: "yet-another-id", // Example ID
      name: "Bathroom Cleaning",
      image: "https://plus.unsplash.com/premium_photo-1664372899446-0d43797d8223?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmF0aHJvb20lMjBjbGVhbmluZ3xlbnwwfHwwfHx8MA%3D%3D",
      address: "528 N Tryon Street, NC",
      category: "Cleaning", // Example category
      provider: "Peter Jones", // Example provider
    },
  ];

  const serviceCategories = [
    { name: "Cleaning", icon: <FaBroom /> },
    { name: "Repair", icon: <FaTools /> },
    { name: "Painting", icon: <FaPaintRoller /> },
    { name: "Shifting", icon: <FaTruckMoving /> },
    { name: "Plumbing", icon: <FaFaucet /> },
    { name: "Electric", icon: <FaPlug /> },
  ];
  return (
    <div className="min-vh-100 bg-light">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold text-primary" to="/">
            DomesticPro
          </Link>
          <div className="d-flex">
            <Link
              to="/my-project/user/login"
              className="btn btn-primary px-3 py-2 small"
              style={{ borderRadius: "50px" }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero-section" className="py-5 bg-light">
      <div className="container text-center py-4">
        <h1 className="display-6 fw-bold mb-3">
          Find Trusted Domestic <span className="text-primary">Services</span> Near You
        </h1>
        <p className="lead text-muted small mb-4">
          Connecting homeowners with verified professionals for all your home service needs.
        </p>

        {/* Search Input */}
        <div className="input-group mb-4 mx-auto" style={{ maxWidth: "450px" }}>
          <span className="input-group-text bg-white border-end-0">
            <FaSearch className="text-muted" />
          </span>
          <input
            type="text"
            className="form-control border-start-0 rounded-pill"
            placeholder="Search services..."
          />
          <button className="btn btn-primary rounded-pill px-4" type="button">
            Search
          </button>
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-center gap-3">
          <Link
            to="/my-project/user/login"
            className="btn btn-primary btn-sm rounded-pill px-4 py-2 fw-bold d-flex align-items-center"
          >
            <i className="bi bi-person-fill me-2"></i>
            User Login
          </Link>
          <Link
            to="/my-project/technician/login"
            className="btn btn-outline-primary btn-sm rounded-pill px-4 py-2 fw-bold d-flex align-items-center"
          >
            <i className="bi bi-tools me-2"></i>
            Technician Login
          </Link>
        </div>
      </div>
    </section>


      {/* Main Content */}
      <div className="container py-4">
        {/* Service Categories */}
        <section className="mb-4">
          <h3 className="h6 fw-bold mb-3">Services</h3>
          <div className="row g-2">
            {serviceCategories.map((service, index) => (
              <div key={index} className="col-6 col-md-3 col-lg-2">
                <div className="card h-100 border-0 shadow-sm text-center p-2">
                  <div className="text-primary fs-4 mb-1">{service.icon}</div>
                  <div className="fw-medium small">{service.name}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Businesses */}
        <section>
          <h3 className="h6 fw-bold mb-3">Popular Businesses</h3>
          <div className="row g-3">
            {popularServices.map((service, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <PopularBusinessCard service={service} />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white py-3">
        <div className="container">
          <div className="text-center">
            <p className="m-0 small">
              All Rights Reserved © {new Date().getFullYear()} Domestic Services
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;