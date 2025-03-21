import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bookService } from "../../../redux/slices/userSlice";

const ServiceDetails = () => {
  const { categoryName } = useParams();
  const { serviceList = [] } = useSelector((state) => state.services);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");
  const itemsPerPage = 6;

  // Decode the service name
  const formattedTitle = categoryName || "Uncategorized";
  const decodedCategoryName = formattedTitle
    .replace(/-/g, " ")
    .replace(/_/g, " & ");

  // Filter services based on category
  const filteredServices = serviceList.filter(
    (service) =>
      service.category.trim().toLowerCase() ===
      decodedCategoryName.trim().toLowerCase()
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredServices.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  // Handle Book Now button click
  const handleBookNow = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleBookingSubmit = (e) => {
    e.preventDefault();

    // Create booking data object
    const bookingData = {
      userId: user.id,
      serviceName: selectedService.name,
      startDate,
      duration: parseInt(duration, 10), // Convert duration to a number
      userLocation: {
        lat: user.location.lat,
        lng: user.location.lng,
      },
    };

    console.log("Booking Data:", bookingData);
    const url = "http://localhost:8000/service/booking/book-service";
    dispatch(bookService(url, bookingData));
    // Here, you can send the booking data to an API or perform other actions
    // Example:
    // axios.post("/api/bookings", bookingData)
    //   .then((response) => console.log("Booking successful:", response.data))
    //   .catch((error) => console.error("Booking failed:", error));

    // Close the modal after submission
    setIsModalOpen(false);
  };

  return (
    <div style={styles.container}>
      <h2>{decodedCategoryName.toUpperCase()}</h2>

      {/* Service Cards */}
      <div style={styles.categoriesContainer}>
        {currentItems.map((service) => (
          <div key={service.id} style={styles.categoryCard}>
            <h3>{service.name}</h3>
            <p>{service.desc}</p>
            <p style={styles.price}>Rate: ${service.rate}/hr</p>
            <button
              style={styles.bookButton}
              onClick={() => handleBookNow(service)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div style={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              ...styles.pageButton,
              backgroundColor: currentPage === i + 1 ? "#007bff" : "#f4f4f4",
              color: currentPage === i + 1 ? "#fff" : "#333",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Book {selectedService.name}</h3>
            <p>{selectedService.desc}</p>
            <p>Rate: ${selectedService.rate}/hr</p>

            <form onSubmit={handleBookingSubmit}>
              <div style={styles.formGroup}>
                <label htmlFor="start-date">Start Date:</label>
                <input
                  type="datetime-local"
                  id="start-date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="duration">Duration (in hours):</label>
                <input
                  type="number"
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  min="1"
                  required
                  style={styles.input}
                />
              </div>

              <button type="submit" style={styles.bookButton}>
                Confirm Booking
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={styles.cancelButton}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: "20px",
  },
  categoriesContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  categoryCard: {
    backgroundColor: "#f4f4f4",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "left",
  },
  price: {
    fontWeight: "bold",
    marginBottom: "10px",
  },
  bookButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  pageButton: {
    padding: "10px 15px",
    margin: "0 5px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "400px",
    textAlign: "center",
  },
  formGroup: {
    margin: "17px",
    textAlign: "left",
  },
  input: {
    width: "90%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#ccc",
    color: "#333",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginLeft: "10px",
  },
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
