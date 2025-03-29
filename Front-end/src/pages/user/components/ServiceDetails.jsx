import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bookService } from "../../../redux/slices/userSlice";
import { Modal } from "react-bootstrap";

const ServiceDetails = () => {
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

  // Filter services based on category and search term
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
    <div className="container-fluid px-4 py-4">
      {/* Page Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h1
              className="fw-bold text-gradient"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {decodedCategoryName.toUpperCase()}
            </h1>
            <div className="w-25">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <p className="text-muted">
            Browse and book available service providers
          </p>
        </div>
      </div>

      {/* Service Cards */}
      <div className="row g-4">
        {currentItems.length > 0 ? (
          currentItems.map((service) => (
            <div key={service.id} className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100 service-card">
                <div className="card-body">
                  <div className="d-flex align-items-start mb-3">
                    <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                      <i className="bi bi-tools fs-4 text-primary"></i>
                    </div>
                    <div>
                      <h3 className="h5 fw-bold mb-1">{service.name}</h3>
                      <p className="text-muted small mb-2">
                        Category: {service.category}
                      </p>
                    </div>
                  </div>
                  <p className="mb-4">{service.desc}</p>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <div>
                      <span className="badge bg-success fs-6">
                        ${service.rate}/hr
                      </span>
                    </div>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleBookNow(service)}
                    >
                      <i className="bi bi-calendar-plus me-2"></i>Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <i className="bi bi-exclamation-circle fs-1 text-muted"></i>
            <h4 className="mt-3">No services found</h4>
            <p className="text-muted">
              Try adjusting your search or check back later
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredServices.length > 0 && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Booking Modal */}
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-calendar-plus me-2"></i>
            Book {selectedService?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-4">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Service Rate:</span>
              <span className="fw-bold">${selectedService?.rate}/hr</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="text-muted">Category:</span>
              <span className="fw-bold">{selectedService?.category}</span>
            </div>
          </div>

          <form onSubmit={handleBookingSubmit}>
            <div className="mb-3">
              <label htmlFor="start-date" className="form-label">
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                className="form-control"
                id="start-date"
                name="startDate"
                value={bookData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="duration" className="form-label">
                Duration (hours)
              </label>
              <input
                type="number"
                className="form-control"
                id="duration"
                name="duration"
                value={bookData.duration}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="aboutwork" className="form-label">
                Work Description
              </label>
              <textarea
                className="form-control"
                id="aboutwork"
                name="workDetail"
                rows="3"
                value={bookData.workDetail}
                onChange={handleChange}
                placeholder="Describe the work needed..."
              />
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-check-circle me-2"></i>
                Confirm Booking
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <style jsx>{`
        .service-card {
          transition: all 0.3s ease;
        }
        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
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

export default ServiceDetails;

// const [searchQuery, setSearchQuery] = useState("");
// const [sortBy, setSortBy] = useState("name");

// Filter services based on search query
// const filteredCategories = serviceList.filter((s_name) =>
//   s_name.name.toLowerCase().includes(searchQuery.toLowerCase())
// );

// Sort services
// const sortedCategories = filteredServices.sort((a, b) => {
//   if (sortBy === "price") {
//     return (
//       parseFloat(a.rate.replace("$", "")) -
//       parseFloat(b.rate.replace("$", ""))
//     );
//   } else if (sortBy === "name") {
//     return a.name.localeCompare(b.name);
//   }
//   return 0;
// });

{
  /* Sorting Options */
}
{
  /* <div style={styles.sortOptions}>
        <label>Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={styles.sortSelect}
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </div> */
}

// ratings: {
//   marginBottom: "15px",
//   fontSize: "14px",
//   color: "#666",
// },
