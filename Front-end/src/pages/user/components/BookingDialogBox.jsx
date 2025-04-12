import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const BookingDialogBox = ({
  isOpen,
  onClose,
  selectedData, // Make sure this is passed correctly from parent
  user,
  onBookSubmit,
  type, // 'service' or 'technician'
}) => {
  const [bookData, setBookData] = useState({
    startDate: "",
    duration: 1,
    workDetail: "",
    selectedService: "",
  });

  // Add null checks for selectedData
  if (!selectedData) {
    return null; // or return a loading state
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleServiceSelect = (service) => {
    setBookData({ ...bookData, selectedService: service });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add validation for technician type
    if (type === "technician" && !bookData.selectedService) {
      alert("Please select a service");
      return;
    }

    const baseBookingData = {
      userId: user?.id,
      startDate: bookData.startDate ? `${bookData.startDate}:00Z` : "",
      duration: parseInt(bookData.duration, 10) || 1,
      workDetail: bookData.workDetail,
    };

    const bookingData = {
      ...baseBookingData,
      ...(type === "service"
        ? {
            serviceName: selectedData?.name,
            userLocation: {
              lat: user?.location?.lat,
              lng: user?.location?.lng,
            },
          }
        : {
            technicianid: selectedData?._id,
            serviceName: bookData.selectedService,
            userLocation: {
              lat: user?.location?.lat,
              lng: user?.location?.lng,
            },
          }),
    };

    onBookSubmit(bookingData);
    onClose();
  };

  return (
    <>
      <Modal
        show={isOpen}
        onHide={onClose}
        centered
        dialogClassName="luxury-modal"
      >
        <Modal.Header closeButton className="luxury-modal-header">
          <Modal.Title className="w-100">
            <div className="d-flex align-items-center">
              <div className="luxury-modal-icon me-4">
                <i className="bi bi-calendar2-check fs-2"></i>
              </div>
              <div>
                <h5 className="mb-0">
                  Book{" - "}
                  {type === "service"
                    ? selectedData?.category || "Service"
                    : selectedData?.tech_name || "Technician"}
                </h5>
                <small className="text-muted">
                  {type === "service" ? selectedData?.name || "" : ""}
                </small>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="luxury-modal-body">
          <form onSubmit={handleSubmit}>
            {/* Date & Time */}
            <div className="luxury-form-group mb-2">
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

            {/* Duration */}
            <div className="luxury-form-group mb-2">
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

            {/* Service Selection (only for technicians) */}
            {type === "technician" && selectedData?.worksKnown && (
              <div className="luxury-form-group mb-2">
                <label>
                  <i className="bi bi-tools me-2"></i> Select Service
                </label>
                <div className="d-flex flex-wrap gap-2">
                  {selectedData.worksKnown.map((skill, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`luxury-btn ${
                        bookData.selectedService === skill
                          ? "luxury-btn-primary"
                          : "luxury-btn-outline"
                      }`}
                      onClick={() => handleServiceSelect(skill)}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
                {!bookData.selectedService && (
                  <small className="text-danger">Please select a service</small>
                )}
              </div>
            )}

            {/* Service Details */}
            <div className="luxury-form-group mb-2">
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

            {/* Submit Buttons */}
            <div className="d-grid gap-3">
              <button
                type="submit"
                className="luxury-btn luxury-btn-primary"
                disabled={type === "technician" && !bookData.selectedService}
              >
                Confirm Booking <i className="bi bi-check-circle-fill ms-2"></i>
              </button>
              <button
                type="button"
                className="luxury-btn luxury-btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <style>{`
        :root {
          --luxury-primary: #4ca1af;
          --luxury-dark: #2c3e50;
          --luxury-light: #f8f9fa;
          --luxury-gray: #6c757d;
          --luxury-border: #e9ecef;
          --luxury-shadow: 0 4px 30px rgba(0, 0, 0, 0.07);
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

        /* ========== Modal ========== */
        .luxury-modal .modal-dialog {
          max-width: 580px;
          margin: 1.5rem auto;
        }

        .luxury-modal .modal-content {
          border: none;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .luxury-modal-header {
          padding: 1rem 1.75rem;
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
          padding: 1.4rem;
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
    </>
  );
};

export default BookingDialogBox;
