import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bookService } from "../../../redux/slices/userSlice";
import { Modal } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";

const categoryIcons = {
  carpentry: "bi-hammer", // or bi-ladder for woodwork
  electrical: "bi-lightning",
  plumbing: "bi-droplet",
  roofing: "bi-house",
  flooring: "bi-grid-1x2",
  "window repair": "bi-window",
  "pest control": "bi-bug",
  "home cleaning": "bi-house-up",
  "drywall repair": "bi-square",
  "door installation": "bi-door-open",
  "chimney repair": "bi-bricks",
  "water heater repair": "bi-moisture",
  "garage door repair": "bi-door-closed",
  "ceiling fan installation": "bi-fan",
  "fireplace repair": "bi-fire",
  "window cleaning": "bi-shop-window",
  "siding repair": "bi-house-gear",
  "home insulation": "bi-thermometer",
  "home renovation": "bi-house-up",
  "basement waterproofing": "bi-water",
  "home inspection": "bi-house-down",
  "home wiring": "bi-plug",
  "home ventilation": "bi-fan",
  "home soundproofing": "bi-volume-up",
  "home elevator installation": "bi-arrow-up-square",
  "home bar installation": "bi-bar-chart",
  "home sauna installation": "bi-house-gear",
  "home gym setup": "bi-person-fill-up",
  "home wine cellar installation": "bi-cup-straw",

  // or bi-plug for outlets
  painting: "bi-brush",
  // or bi-pipe for pipes
  hvac: "bi-snow", // or bi-thermometer for temperature control
  gardening: "bi-flower1",

  // or bi-ladder for roof access
  "appliance repair": "bi-wrench", // or bi-washing-machine for specific appliances
  "home automation": "bi-lightbulb", // or bi-router for smart homes
  "movers and packers": "bi-box-seam", // or bi-truck for moving
  // represents floor tiles

  landscaping: "bi-tree-fill",
  "pool maintenance": "bi-water",

  "fence installation": "bi-border-all", // represents fencing pattern
  "gutter cleaning": "bi-cloud-rain", // represents water drainage
};

const ServiceDetails = () => {
  // ... [keep all existing state and logic]
  const { categoryName } = useParams();
  const { serviceList = [] } = useSelector((state) => state.services);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 6;

  const [bookData, setBookData] = useState({
    startDate: "",
    duration: 1,
    workDetail: "",
  });

  // Decode the service name
  const formattedTitle = categoryName || "Uncategorized";
  const decodedCategoryName = formattedTitle
    .replace(/-/g, " ")
    .replace(/_/g, " & ");

  // Filter services
  const filteredServices = serviceList.filter((service) => {
    const matchesCategory =
      service.category.trim().toLowerCase() ===
      decodedCategoryName.trim().toLowerCase();
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredServices.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  const handleBookNow = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const bookingData = {
      userId: user.id,
      serviceName: selectedService.name,
      startDate: bookData.startDate + ":00Z",
      duration: parseInt(bookData.duration, 10),
      workDetail: bookData.workDetail,
      userLocation: {
        lat: user.location.lat,
        lng: user.location.lng,
      },
    };
    dispatch(bookService(bookingData));
    setIsModalOpen(false);
  };

  return (
    <div className="container-fluid px-0 ">
      {/* Simplified Top Center Search */}
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-8 text-center">
            <div className="luxury-search-container mb-4">
              <div className="input-group input-group-luxury">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Find your perfect service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Premium Services Grid */}
      <div className="container">
        <AnimatePresence>
          {currentItems.length > 0 ? (
            <div className="row g-5">
              {currentItems.map((service) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="col-md-6 col-lg-4"
                >
                  <div className="luxury-card compact">
                    <div className="luxury-card-header">
                      <div className="luxury-icon">
                        <i
                          className={`bi ${
                            categoryIcons[service.name.toLowerCase()] ||
                            "bi-question-circle"
                          } fs-2`}
                        ></i>
                      </div>
                      <div className="luxury-badge">{service.category}</div>
                    </div>
                    <div className="luxury-card-body">
                      <h3>{service.name}</h3>
                      <p className="luxury-description">{service.desc}</p>
                      <div className="luxury-divider"></div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="luxury-price">
                          ${service.rate}
                          <span>/hour</span>
                        </div>
                        <button
                          className="luxury-btn"
                          onClick={() => handleBookNow(service)}
                        >
                          Book Now <i className="bi bi-arrow-right ms-2"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="luxury-empty-state text-center py-5"
            >
              <div className="luxury-empty-icon mb-4">
                <i className="bi bi-search fs-1"></i>
              </div>
              <h4 className="mb-3">No matching services found</h4>
              <button
                className="luxury-btn luxury-btn-outline"
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Centered Luxury Pagination */}
        {filteredServices.length > itemsPerPage && (
          <div className="d-flex justify-content-center mt-5">
            <div className="luxury-pagination">
              <button
                className={`luxury-pagination-btn ${
                  currentPage === 1 ? "disabled" : ""
                }`}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                <i className="bi bi-chevron-left"></i>
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`luxury-pagination-btn ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className={`luxury-pagination-btn ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Ultra-Premium Booking Modal */}
      <Modal
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        centered
        dialogClassName="luxury-modal"
      >
        <Modal.Header closeButton className="luxury-modal-header">
          <Modal.Title className="w-100">
            <div className="d-flex align-items-center">
              <div className="luxury-modal-icon me-3">
                <i className="bi bi-calendar2-check fs-3"></i>
              </div>
              <div>
                <h3 className="mb-0">Book {selectedService?.name}</h3>
                <small className="text-muted">
                  {selectedService?.category}
                </small>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="luxury-modal-body">
          <form onSubmit={handleBookingSubmit}>
            <div className="luxury-form-group mb-4">
              <label>
                <i className="bi bi-calendar3 me-2"></i> Date & Time
              </label>
              <input
                type="datetime-local"
                className="luxury-form-control"
                name="startDate"
                value={bookData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="luxury-form-group mb-4">
              <label>
                <i className="bi bi-stopwatch me-2"></i> Duration (hours)
              </label>
              <input
                type="number"
                className="luxury-form-control"
                name="duration"
                value={bookData.duration}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            <div className="luxury-form-group mb-4">
              <label>
                <i className="bi bi-card-text me-2"></i> Service Details
              </label>
              <textarea
                className="luxury-form-control"
                name="workDetail"
                rows="4"
                value={bookData.workDetail}
                onChange={handleChange}
                placeholder="Describe your needs in detail..."
              />
            </div>

            <div className="d-grid gap-3">
              <button type="submit" className="luxury-btn luxury-btn-primary">
                Confirm Booking <i className="bi bi-check-circle-fill ms-2"></i>
              </button>
              <button
                type="button"
                className="luxury-btn luxury-btn-secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Luxury CSS */}
      <style>{`
        :root {
          --luxury-primary: #4ca1af;
          --luxury-dark: #2c3e50;
          --luxury-light: #f8f9fa;
          --luxury-gray: #6c757d;
          --luxury-border: #e9ecef;
          --luxury-shadow: 0 4px 30px rgba(0, 0, 0, 0.07);
        }

        /* ========== Search Bar ========== */
        .luxury-search-container {
          max-width: 700px;
          margin: 2rem auto 3rem;
        }

        .input-group-luxury {
          border-radius: 50px;
          overflow: hidden;
          box-shadow: var(--luxury-shadow);
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .input-group-luxury .input-group-text {
          background: white;
          border: none;
          padding: 0 1.5rem;
          color: var(--luxury-primary);
        }

        .input-group-luxury .form-control {
          border: none;
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
          height: 52px;
        }

        /* ========== Service Cards ========== */
        .luxury-card {
          background: white;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
          transition: transform 0.3s ease, box-shadow 0.4s ease;
          border: 1px solid rgba(0, 0, 0, 0.02);
          height: 100%;
          display: flex;
          flex-direction: column;
          will-change: transform, box-shadow;
        }

        .luxury-card.compact {
          border-radius: 12px;
        }

        .luxury-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
        }

        .luxury-card-header {
          padding: 1.125rem;
          position: relative;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }

        .luxury-icon {
          width: 54px;
          height: 54px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 5px 15px rgba(76, 161, 175, 0.15);
          color: var(--luxury-primary);
          font-size: 1.25rem;
        }

        .luxury-badge {
          position: absolute;
          top: 1.125rem;
          right: 1.125rem;
          background: rgba(255, 255, 255, 0.95);
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--luxury-dark);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .luxury-card-body {
          padding: 1.125rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .luxury-card-body h3 {
          font-size: 1.1rem;
          margin-bottom: 0.75rem;
          color: var(--luxury-dark);
          font-weight: 600;
        }

        .luxury-description {
          color: var(--luxury-gray);
          margin-bottom: 1rem;
          flex-grow: 1;
          font-size: 0.85rem;
          line-height: 1.5;
        }

        .luxury-divider {
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            var(--luxury-border),
            transparent
          );
          margin: 0.75rem 0;
        }

        .luxury-price {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--luxury-dark);
        }

        .luxury-price span {
          font-size: 0.8rem;
          font-weight: 400;
          color: var(--luxury-gray);
          margin-left: 0.25rem;
        }

        /* ========== Buttons ========== */
        .luxury-btn {
          padding: 0.6rem 1.5rem;
          border-radius: 50px;
          border: none;
          font-weight: 500;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          letter-spacing: 0.5px;
        }

        .luxury-btn-primary {
          background: linear-gradient(
            135deg,
            var(--luxury-primary) 0%,
            var(--luxury-dark) 100%
          );
          color: white;
        }

        .luxury-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(76, 161, 175, 0.3);
        }

        .luxury-btn-secondary {
          background: white;
          border: 1px solid var(--luxury-border);
          color: var(--luxury-dark);
        }

        .luxury-btn-secondary:hover {
          background: var(--luxury-light);
        }

        .luxury-btn-outline {
          background: transparent;
          border: 1px solid var(--luxury-border);
          color: var(--luxury-dark);
        }

        /* ========== Pagination ========== */
        .luxury-pagination {
          display: flex;
          gap: 0.5rem;
          background: white;
          padding: 0.5rem;
          border-radius: 50px;
          box-shadow: var(--luxury-shadow);
        }

        .luxury-pagination-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: var(--luxury-gray);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          font-size: 0.85rem;
        }

        .luxury-pagination-btn.active {
          background: linear-gradient(
            135deg,
            var(--luxury-primary) 0%,
            var(--luxury-dark) 100%
          );
          color: white;
        }

        /* ========== Modal ========== */
        .luxury-modal .modal-dialog {
          max-width: 580px;
          margin: 1.75rem auto;
        }

        .luxury-modal .modal-content {
          border: none;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .luxury-modal-header {
          padding: 1.5rem 1.75rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          align-items: center;
        }

        .luxury-modal-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--luxury-primary);
        }

        .luxury-modal-body {
          padding: 1.75rem;
        }

        .luxury-modal-footer {
          padding: 1.25rem 1.75rem;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          display: flex;
          gap: 1rem;
        }

        /* ========== Form Elements ========== */
        .luxury-form-group {
          margin-bottom: 1.5rem;
        }

        .luxury-form-group label {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--luxury-dark);
        }

        .luxury-form-control {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid var(--luxury-border);
          border-radius: 10px;
          transition: all 0.3s ease;
        }

        .luxury-form-control:focus {
          border-color: var(--luxury-primary);
          box-shadow: 0 0 0 3px rgba(76, 161, 175, 0.15);
        }

        /* ========== Empty State ========== */
        .luxury-empty-state {
          padding: 3.75rem 1.25rem;
        }

        .luxury-empty-icon {
          width: 80px;
          height: 80px;
          background: var(--luxury-light);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem;
          color: var(--luxury-gray);
        }

        /* ========== Animations ========== */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in {
          animation: fadeIn 0.35s cubic-bezier(0.39, 0.575, 0.565, 1) both;
        }

        /* ========== Responsive ========== */
        @media (max-width: 768px) {
          .luxury-search-container {
            margin: 1.25rem auto 2rem;
          }

          .luxury-modal .modal-dialog {
            margin: 0.5rem auto;
          }

          .luxury-modal-header,
          .luxury-modal-body {
            padding: 1.25rem;
          }

          .luxury-modal-footer {
            flex-direction: column;
            gap: 0.75rem;
          }

          .luxury-pagination {
            flex-wrap: wrap;
            justify-content: center;
            border-radius: 14px;
            padding: 0.625rem;
          }
        }

        @media (max-width: 576px) {
          .luxury-icon {
            width: 44px;
            height: 44px;
            font-size: 1rem;
          }

          .luxury-badge {
            font-size: 0.6rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ServiceDetails;
