import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ServiceDetails = () => {
  const { serviceName } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const itemsPerPage = 6;

  // Decode the service name
  const formattedTitle = serviceName || "";
  const decodedServiceName = formattedTitle
    .replace(/-/g, " ")
    .replace(/_/g, " & ");

  // Service categories data with descriptions, prices, ratings, and reviews
  const services = {
    "home repair & maintenance": [
      {
        name: "Plumbing",
        description:
          "Fixing leaks, installing pipes, unclogging drains, repairing taps, and installing water heaters.",
        price: "$50/hr",
        rating: 4.5,
        reviews: 120,
      },
      {
        name: "Electrical Work",
        description:
          "Wiring, repairing circuit breakers, installing fans, fixing short circuits, and electrical safety checks.",
        price: "$60/hr",
        rating: 4.7,
        reviews: 95,
      },
      {
        name: "Carpentry",
        description:
          "Furniture repair, cabinet installation, custom woodwork, door and window repairs, and shelving installation.",
        price: "$45/hr",
        rating: 4.3,
        reviews: 80,
      },
      {
        name: "Roofing",
        description:
          "Roof repairs, leak fixing, tile replacement, waterproofing, and roof inspections.",
        price: "$70/hr",
        rating: 4.6,
        reviews: 110,
      },
      {
        name: "Roofing",
        description:
          "Roof repairs, leak fixing, tile replacement, waterproofing, and roof inspections.",
        price: "$70/hr",
        rating: 4.6,
        reviews: 110,
      },
      {
        name: "Roofing",
        description:
          "Roof repairs, leak fixing, tile replacement, waterproofing, and roof inspections.",
        price: "$70/hr",
        rating: 4.6,
        reviews: 110,
      },
      {
        name: "Roofing",
        description:
          "Roof repairs, leak fixing, tile replacement, waterproofing, and roof inspections.",
        price: "$70/hr",
        rating: 4.6,
        reviews: 110,
      },
      {
        name: "Roofing",
        description:
          "Roof repairs, leak fixing, tile replacement, waterproofing, and roof inspections.",
        price: "$70/hr",
        rating: 4.6,
        reviews: 110,
      },
    ],
    "appliance & gadget services": [
      {
        name: "HVAC Technicians",
        description:
          "AC repair, heater maintenance, ventilation system cleaning, and filter replacement.",
        price: "$55/hr",
        rating: 4.4,
        reviews: 90,
      },
      {
        name: "Refrigeration Experts",
        description:
          "Repairing refrigerators, deep freezers, and cooling systems.",
        price: "$65/hr",
        rating: 4.8,
        reviews: 130,
      },
      {
        name: "Washing Machine & Dryer Repair",
        description:
          "Fixing drum issues, motor problems, and replacing broken parts.",
        price: "$40/hr",
        rating: 4.2,
        reviews: 75,
      },
      {
        name: "Home Automation Experts",
        description:
          "Setting up smart home devices, security systems, IoT automation, and troubleshooting smart home networks.",
        price: "$75/hr",
        rating: 4.9,
        reviews: 150,
      },
    ],
    "outdoor & home improvement": [
      {
        name: "Painters",
        description:
          "Interior & exterior wall painting, waterproof coating, wallpaper installation, and texture painting.",
        price: "$35/hr",
        rating: 4.1,
        reviews: 70,
      },
      {
        name: "Movers & Packers",
        description:
          "Home shifting, furniture transportation, packing/unpacking, and assembling furniture at a new location.",
        price: "$30/hr",
        rating: 4.0,
        reviews: 65,
      },
    ],
  };

  // Get categories for the current service
  const categories = services[decodedServiceName.toLowerCase()] || [];

  // Filter services based on search query
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort services
  const sortedCategories = filteredCategories.sort((a, b) => {
    if (sortBy === "price") {
      return (
        parseFloat(a.price.replace("$", "")) -
        parseFloat(b.price.replace("$", ""))
      );
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(sortedCategories.length / itemsPerPage);

  // Handle Book Now button click
  const handleBookNow = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <div style={styles.container}>
      <h2>{decodedServiceName.toUpperCase()}</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search services..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={styles.searchBar}
      />

      {/* Sorting Options */}
      <div style={styles.sortOptions}>
        <label>Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={styles.sortSelect}
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </div>

      {/* Service Cards */}
      <div style={styles.categoriesContainer}>
        {currentItems.map((category, index) => (
          <div key={index} style={styles.categoryCard}>
            <h3>{category.name}</h3>
            <p>{category.description}</p>
            <p style={styles.price}>{category.price}</p>
            <div style={styles.ratings}>
              <span>⭐ {category.rating}</span>
              <span>({category.reviews} reviews)</span>
            </div>
            <button
              style={styles.bookButton}
              onClick={() => handleBookNow(category)}
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
            <p>{selectedService.description}</p>
            <p>Price: {selectedService.price}</p>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: "0px 20px",
  },
  searchBar: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  sortOptions: {
    marginBottom: "20px",
  },
  sortSelect: {
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  categoriesContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  categoryCard: {
    backgroundColor: "#f4f4f4",
    padding: "5px 5px",
    borderRadius: "10px",
    textAlign: "left",
  },
  price: {
    fontWeight: "bold",
    marginBottom: "10px",
  },
  ratings: {
    marginBottom: "15px",
    fontSize: "14px",
    color: "#666",
  },
  bookButton: {
    padding: "10px 20px",
    marginBottom: "5px",
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
    width: "300px",
    textAlign: "center",
  },
};

export default ServiceDetails;
