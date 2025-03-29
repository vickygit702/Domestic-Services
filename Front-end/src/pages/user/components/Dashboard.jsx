import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchServices } from "../../../redux/slices/servicesSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { serviceList, categories, loading, error } = useSelector(
    (state) => state.services
  );

  useEffect(() => {
    const url = `http://localhost:8000/user/${user.id}/services/fetchAllServices`;
    dispatch(fetchServices(url));
  }, [dispatch]);

  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return <div className="alert alert-danger mx-4">Error: {error}</div>;

  const handleServiceClick = (category) => {
    const formattedTitle = category
      .toLowerCase()
      .replace(/ & /g, "_")
      .replace(/\s+/g, "-");
    navigate(`/my-project/user/${user.id}/dashboard/${formattedTitle}`);
  };

  const filteredCategory = categories.filter((service) =>
    service.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const imgurl = "../../../assets/premium-benefits.png";

  return (
    <div className="container-fluid px-4">
      {/* Search Bar */}
      <div className="row mb-4">
        <div className="col-md-8 mx-auto">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0 py-2"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-primary px-4">Search</button>
          </div>
        </div>
      </div>

      {/* Premium Banner */}
      <div className="row mb-4">
        <div className="col-12">
          <div
            className="card border-0 shadow-sm overflow-hidden bg-gradient"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            <div className="card-body p-4 ">
              <div className="row align-items-center">
                <div className="col-md-8 text-black ">
                  <h2 className="fw-bold mb-3">Upgrade to Premium</h2>
                  <p className="mb-4">
                    Get exclusive benefits, priority support, and special
                    discounts
                  </p>
                  <button className="btn btn-light rounded-pill px-4 fw-bold">
                    Subscribe Now <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="row mb-4">
        <div className="col-12">
          <h3
            className="fw-bold mb-4 text-gradient"
            style={{
              textAlign: "center",
              backgroundImage:
                "linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Our Services
          </h3>
          {/* <div className="d-flex justify-content-between align-items-center mb-4">
            <h3
              className="fw-bold text-gradient"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Our Services
            </h3>
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                id="filterDropdown"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-funnel-fill me-2"></i> Filter
              </button>
              <ul className="dropdown-menu" aria-labelledby="filterDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    All Services
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Most Popular
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Recently Added
                  </a>
                </li>
              </ul>
            </div>
          </div> */}

          <div className="row g-4">
            {filteredCategory.map((service, index) => (
              <div key={index} className="col-sm-6 col-md-4 col-lg-3">
                <div
                  className="card h-100 border-0 shadow-sm hover-shadow transition-all service-card"
                  onClick={() => handleServiceClick(service)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-body text-center p-4">
                    <div
                      className="bg-light bg-opacity-10 rounded-circle p-3 mb-3 mx-auto"
                      style={{
                        width: "80px",
                        height: "80px",
                        backgroundColor: "rgba(13, 110, 253, 0.1)",
                      }}
                    >
                      <i className="bi bi-tools fs-3 text-primary"></i>
                    </div>
                    <h5 className="card-title fw-bold mb-0">{service}</h5>
                    <p className="text-muted small mt-2">
                      {serviceList.filter((s) => s.category === service).length}{" "}
                      technicians available
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0">
              <h5 className="fw-bold mb-0">Recent Bookings</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Technician</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Plumbing</td>
                      <td>John Smith</td>
                      <td>May 15, 2023</td>
                      <td>
                        <span className="badge bg-success">Completed</span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary">
                          Details
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>Electrical</td>
                      <td>Sarah Johnson</td>
                      <td>May 18, 2023</td>
                      <td>
                        <span className="badge bg-warning text-dark">
                          Pending
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary">
                          Details
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .service-card {
          transition: all 0.3s ease;
        }
        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
        }
        .text-gradient {
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
