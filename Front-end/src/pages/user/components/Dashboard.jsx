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

  // Fetch services on component mount
  useEffect(() => {
    const url = `http://localhost:8000/user/${user.id}/services/fetchAllServices`; // Dynamic URL
    dispatch(fetchServices(url));
    // Pass the URL as an argument
    console.log(user);
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Handle service card click
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
  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search services..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={styles.searchBar}
      />
      {/* Banner for Subscription Advertisement */}
      <div style={styles.banner}>
        <h2>Subscribe to Our Premium Services!</h2>
        <p>Get exclusive benefits and discounts.</p>
        <button style={styles.subscribeButton}>Subscribe Now</button>
      </div>

      {/* Our Services Section */}
      <h2 style={styles.sectionTitle}>Our Services</h2>
      <div style={styles.servicesContainer}>
        {filteredCategory.map((service, index) => (
          <div
            key={index}
            style={styles.serviceCard}
            onClick={() => handleServiceClick(service)}
          >
            <h3>{service}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: "20px",
  },
  searchBar: {
    width: "98%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  banner: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    marginBottom: "20px",
  },
  subscribeButton: {
    padding: "10px 20px",
    backgroundColor: "#fff",
    color: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  sectionTitle: {
    marginBottom: "20px",
  },
  servicesContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  serviceCard: {
    backgroundColor: "#f4f4f4",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.3s",
  },
};

export default Dashboard;
