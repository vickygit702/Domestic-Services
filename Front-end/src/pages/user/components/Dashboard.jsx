import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchServices } from "../../../redux/slices/servicesSlice";
import { bookServicePremiumUser } from "../../../redux/slices/userSlice";
import {
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Chip,
  Button,
  Grid,
  Box,
  Skeleton,
  TextField,
  InputAdornment,
  Rating,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, isSameDay } from "date-fns";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import BookingDialogBox from "./BookingDialogBox";
import { motion, AnimatePresence } from "framer-motion";

import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ReviewsIcon from "@mui/icons-material/Reviews";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [openAvailability, setOpenAvailability] = useState(false);
  const [techInfo, setTechInfo] = useState([]);
  const [tileContent, setTileContent] = useState(null);
  const [loadingTech, setLoadingTech] = useState(false);
  const [techError, setTechError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [recentReviews, setRecentReviews] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [bookingsError, setBookingsError] = useState(null);
  const [reviewsError, setReviewsError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const { user } = useSelector((state) => state.auth);
  const { serviceList, categories, loading, error } = useSelector(
    (state) => state.services
  );

  // Sample promotions data
  const promotions = [
    {
      id: 1,
      title: "Seasonal Discount",
      description: "20% off on all plumbing services this month",
      code: "PLUMB20",
      validUntil: "2025-12-31",
    },
    {
      id: 2,
      title: "New Customer Offer",
      description: "15% off your first booking with any technician",
      code: "FIRST15",
      validUntil: "2025-12-31",
    },
  ];

  const TechCard = ({ tech }) => {
    const bookedDates =
      tech.bookedSlots?.map((slot) => new Date(slot.start)) || [];

    const tileContent = ({ date, view }) => {
      if (view === "month") {
        const isBooked = bookedDates.some((bookedDate) =>
          isSameDay(bookedDate, date)
        );
        return isBooked ? <div className="booked-dot" /> : null;
      }
    };

    return (
      <motion.div
        key={tech.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="tech-card"
      >
        <div className={`tech-card-inner ${tech.isPro ? "pro-tech" : ""}`}>
          <div className="tech-card-header">
            <div className="tech-avatar">
              <img
                src={`http://localhost:8000/uploads/profile/technicians/${tech.profileImg}`}
                alt={tech.tech_name}
              />
              {tech.isPro && (
                <div className="pro-badge">
                  <VerifiedIcon />
                </div>
              )}
            </div>
            <div className="tech-rating">
              <StarIcon className="star-icon" />
              <span>{tech.tech_ratingAvg?.toFixed(1)}</span>
              <span className="jobs-count">({tech.jobsCompleted} jobs)</span>
            </div>
          </div>

          <div className="tech-card-body">
            <h5 className="tech-name">{tech.tech_name}</h5>

            <div className="tech-skills">
              <Typography variant="caption" className="skills-label">
                Skills:
              </Typography>
              <div className="skills-container">
                {tech.worksKnown.slice(0, 3).map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    size="small"
                    className="skill-chip"
                  />
                ))}
              </div>
            </div>
            <h4 className="tech-location">
              <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
              {tech.tech_address.city}
            </h4>
          </div>

          <div className="tech-card-footer">
            <Button
              variant="outlined"
              className="availability-btn"
              onClick={() => {
                setOpenAvailability(true);
                setSelectedTech(tech);
                setTileContent(() => tileContent);
              }}
            >
              Availability
            </Button>
            <Button
              variant="contained"
              className="book-btn"
              onClick={() => handleBooking(tech)}
            >
              Book Now
            </Button>
          </div>
        </div>
      </motion.div>
    );
  };

  useEffect(() => {
    const fetchTechnicians = async () => {
      setLoadingTech(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/user/${user.id}/services/fetchAllTechnicians`
        );
        setTechInfo(response.data.techDetails);
        setLoadingTech(false);
      } catch (err) {
        setTechError(err.message);
        setLoadingTech(false);
      }
    };
    fetchTechnicians();
  }, [user.id]);

  useEffect(() => {
    const url = `http://localhost:8000/user/${user.id}/services/fetchAllServices`;
    dispatch(fetchServices(url));
  }, [dispatch]);

  const fetchUpcomingBookings = async () => {
    setLoadingBookings(true);
    setBookingsError(null);
    try {
      const response = await axios.get(
        `http://localhost:8000/user/${user.id}/dashboard/upcoming-bookings`
      );
      const formattedBookings =
        response.data.formattedBookings?.map((booking) => ({
          id: booking.id,
          servicename: booking.servicename,
          technician: booking.technician,
          bookeddate: booking.bookeddate,
          status: booking.status,
        })) || [];
      console.log(formattedBookings);
      setUpcomingBookings(formattedBookings);
    } catch (err) {
      setBookingsError(err.message);
      console.error("Error fetching upcoming bookings:", err);
    } finally {
      setLoadingBookings(false);
    }
  };

  const fetchRecentReviews = async () => {
    setLoadingReviews(true);
    setReviewsError(null);
    try {
      const response = await axios.get(
        `http://localhost:8000/user/${user.id}/dashboard/recent-reviews`
      );
      const formattedReviews =
        response.data.formattedReviews?.map((review) => ({
          id: review.id,
          technician: review.technician,
          rating: review.rating,
          comment: review.comment,
          date: review.date,
        })) || [];
      console.log(formattedReviews);
      setRecentReviews(formattedReviews);
    } catch (err) {
      setReviewsError(err.message);
      console.error("Error fetching recent reviews:", err);
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchUpcomingBookings();
    fetchRecentReviews();
  }, [user.id]);

  const handleCloseAvailability = () => {
    setOpenAvailability(false);
  };

  const handleBooking = (tech) => {
    setSelectedTech(tech);
    setIsModalOpen(true);
  };

  const handleBookSubmit = (bookingData) => {
    dispatch(bookServicePremiumUser(bookingData));
  };

  const handleServiceClick = (category) => {
    const formattedTitle = category
      .toLowerCase()
      .replace(/ & /g, "_")
      .replace(/\s+/g, "-");
    navigate(`/my-project/user/${user.id}/dashboard/${formattedTitle}`);
  };
  const handleMyBooking = () => {
    navigate(`/my-project/user/${user.id}/my-bookings`);
  };

  const filteredCategory = categories.filter((service) =>
    service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTechnicians =
    activeTab === "pro" ? techInfo.filter((tech) => tech.isPro) : techInfo;

  const categoryIcons = {
    "Home Repair & Maintenance": "bi-tools",
    "Outdoor & Home Improvement": "bi-house-door",
    "Appliance & Gadget Services": "bi-plug",
    "Health & Wellness": "bi-heart-pulse",
    "Education & Tutoring": "bi-book",
    "Event Planning": "bi-calendar-event",
    "Pet Care": "bi-hospital",
    "Professional Services": "bi-briefcase",
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error-alert">Error: {error}</div>;
  }

  return (
    <div className="dashboard-container">
      {/* Services Section */}
      <Typography variant="h5" className="section-title">
        Our Services
      </Typography>
      <div className="services-section">
        <div className="services-grid">
          {filteredCategory.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="service-card"
              onClick={() => handleServiceClick(service)}
            >
              <div className="service-icon">
                <i className={`bi ${categoryIcons[service]}`}></i>
              </div>
              <h3>{service}</h3>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Technicians Section */}
      <div className="technicians-section">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Typography variant="h5" className="section-title mb-0">
            Technicians Profile
          </Typography>
          <div className="tech-filter-tabs">
            <Button
              variant={activeTab === "all" ? "contained" : "outlined"}
              size="small"
              onClick={() => setActiveTab("all")}
              className="me-2"
            >
              All Technicians
            </Button>
            <Button
              variant={activeTab === "pro" ? "contained" : "outlined"}
              size="small"
              onClick={() => setActiveTab("pro")}
            >
              Pro Technicians
            </Button>
          </div>
        </div>

        {loadingTech ? (
          <div className="technicians-grid">
            {[1, 2, 3, 4].map((item) => (
              <Skeleton
                key={item}
                variant="rectangular"
                className="tech-skeleton"
              />
            ))}
          </div>
        ) : (
          <div className="technicians-grid">
            <AnimatePresence>
              {filteredTechnicians.map((tech, index) => (
                <TechCard key={index} tech={tech} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Additional Features Section */}
      <div className="additional-features mb-3">
        {/* Promotions Section */}
        <div className="feature-card promotions-card">
          <div className="feature-header">
            <LocalOfferIcon className="feature-icon" />
            <h3>Current Promotions</h3>
          </div>
          <Divider className="feature-divider" />
          <div className="promotions-list">
            {promotions.map((promo) => (
              <div key={promo.id} className="promotion-item">
                <div className="promotion-content">
                  <h4>{promo.title}</h4>
                  <p>{promo.description}</p>
                  <div className="promo-code">
                    Use code: <strong>{promo.code}</strong>
                  </div>
                  <div className="promo-valid">
                    Valid until: {promo.validUntil}
                  </div>
                </div>
                <Button
                  variant="outlined"
                  size="small"
                  className="promo-apply-btn"
                  disabled
                >
                  Apply
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Bookings Section */}
        <div className="feature-card bookings-card">
          <div className="feature-header">
            <EventAvailableIcon className="feature-icon" />
            <h3>Your Upcoming Bookings</h3>
          </div>
          <Divider className="feature-divider" />

          {bookingsError ? (
            <Typography color="error">
              Error loading bookings: {bookingsError}
            </Typography>
          ) : loadingBookings ? (
            <div className="bookings-list">
              {[1, 2].map((item) => (
                <Skeleton key={item} variant="rectangular" height={80} />
              ))}
            </div>
          ) : (
            <div className="bookings-list">
              {upcomingBookings?.map((booking) => (
                <div key={booking.id} className="booking-item">
                  <div className="booking-service">{booking.servicename}</div>
                  <div className="booking-details">
                    <div>
                      <strong>Technician:</strong>{" "}
                      {booking.technician?.tech_name || "Unknown Technician"}
                    </div>
                    <div>
                      <strong>Date:</strong>{" "}
                      {booking.bookeddate?.start
                        ? new Date(booking.bookeddate.start).toLocaleDateString(
                            "en-GB"
                          )
                        : "No date set"}{" "}
                      at{" "}
                      {booking.bookeddate?.start
                        ? new Date(booking.bookeddate.start).toLocaleTimeString(
                            "en-US",
                            {
                              timeZone: "UTC",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )
                        : "No time set"}
                    </div>
                    <div
                      className={`booking-status ${(
                        booking.status || ""
                      ).toLowerCase()}`}
                    >
                      {booking.status || "Unknown status"}
                    </div>
                  </div>
                </div>
              ))}
              {upcomingBookings?.length === 0 && (
                <Typography variant="body2" color="textSecondary">
                  No upcoming bookings
                </Typography>
              )}
            </div>
          )}
          <Button
            variant="text"
            size="small"
            className="view-all-btn"
            endIcon={<i className="bi bi-arrow-right"></i>}
            onClick={handleMyBooking}
          >
            View all bookings
          </Button>
        </div>

        {/* Recent Reviews Section */}
        <div className="feature-card reviews-card">
          <div className="feature-header">
            <ReviewsIcon className="feature-icon" />
            <h3>Recent Reviews</h3>
          </div>
          <Divider className="feature-divider" />

          {reviewsError ? (
            <Typography color="error">
              Error loading reviews: {reviewsError}
            </Typography>
          ) : loadingReviews ? (
            <div className="reviews-list">
              {[1, 2].map((item) => (
                <Skeleton key={item} variant="rectangular" height={100} />
              ))}
            </div>
          ) : (
            <div className="reviews-list">
              {recentReviews?.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <div className="review-technician">
                      {review.technician?.tech_name || "Unknown Technician"}
                    </div>
                    <div className="review-date">
                      {review.date
                        ? new Date(review.date).toLocaleDateString("en-GB")
                        : "No date provided"}
                    </div>
                  </div>
                  <Rating
                    value={review.rating || 0}
                    readOnly
                    precision={0.5}
                    className="review-rating"
                  />
                  <div className="review-comment">
                    {review.comment || "No comment provided"}
                  </div>
                </div>
              ))}
              {recentReviews?.length === 0 && (
                <Typography variant="body2" color="textSecondary">
                  No recent reviews
                </Typography>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Contact Us Section */}
      <Typography variant="h5" className="section-title ">
        Contact Us
      </Typography>
      <div
        className="bg-white rounded-4 shadow-lg p-4 p-md-5 mb-0"
        style={{
          borderBottomLeftRadius: "0",
          borderBottomRightRadius: "0",
        }}
      >
        <div className="row">
          <div className="col-md-6 mb-2 mb-md-0">
            <div className="mb-1">
              <h3 className="h5 mb-3">Get in Touch</h3>
              <p>
                <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
                123 Service Lane, Domestic City, DS 12345
              </p>
              <p>
                <i className="bi bi-telephone-fill me-2 text-primary"></i>
                +1 (800) 123-4567
              </p>
              <p>
                <i className="bi bi-envelope-fill me-2 text-primary"></i>
                contact@domesticsolutions.com
              </p>
            </div>
            <div>
              <h3 className="h5 mb-3">Business Hours</h3>
              <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
              <p>Saturday: 9:00 AM - 5:00 PM</p>
              <p>Sunday: Emergency services only</p>
            </div>
          </div>
          <div className="col-md-6">
            <form>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Subject"
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Availability Dialog */}
      <Dialog
        open={openAvailability}
        onClose={handleCloseAvailability}
        maxWidth="sm"
        fullWidth
        className="availability-dialog"
      >
        <DialogTitle className="dialog-title">
          {selectedTech?.tech_name}'s Availability
          <IconButton
            aria-label="close"
            onClick={handleCloseAvailability}
            className="close-btn"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="dialog-content">
          <Box className="calendar-container">
            <Calendar
              tileContent={tileContent}
              minDate={new Date()}
              className="availability-calendar"
            />
          </Box>
          <Box className="legend-container">
            <Box className="legend-item">
              <Box className="booked-legend" />
              <Typography variant="body2">Booked</Typography>
            </Box>
            <Box className="legend-item">
              <Box className="available-legend" />
              <Typography variant="body2">Available</Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <BookingDialogBox
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedData={selectedTech}
        user={user}
        onBookSubmit={handleBookSubmit}
        type="technician"
      />

      {/* CSS Styles */}
      <style>{`
        /* Previous styles remain the same, adding new styles below */
        :root {
          --primary: #6a11cb;
          --secondary: #2575fc;
          --accent: #ff6b6b;
          --light: #f8f9fa;
          --dark: #212529;
          --success: #38ef7d;
          --warning: #ffc107;
          --info: #17a2b8;
          --gradient: linear-gradient(
            45deg,
            var(--primary) 0%,
            var(--secondary) 100%
          );
        }

        .dashboard-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        

        /* Services Section */
        .services-section {
          margin-bottom: 2rem;
        }

        .section-title {
          color: black;
          font-weight: 700 !important;
          margin-bottom: 1.3rem !important;
          text-align: center;
        }

        .search-field {
          margin-bottom: 2rem;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .search-field .MuiOutlinedInput-root {
          border-radius: 12px;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 2.5rem;
        }

        .service-card {
          background: white;
          border-radius: 12px;
          padding: 2rem 1.5rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .service-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(106, 17, 203, 0.1);
          border-radius: 50%;
        }

        .service-icon i {
          font-size: 2rem;
          color: var(--primary);
        }

        .service-card h3 {
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0;
          color: var(--dark);
        }

        /* Technicians Section */
        .technicians-section {
          margin-bottom: 3rem;
        }

        .technicians-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .tech-card {
          perspective: 1000px;
        }

        .tech-card-inner {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .pro-tech {
          border: 2px solid gold;
          position: relative;
        }

        .pro-tech::before {
          content: "PRO";
          position: absolute;
          top: 10px;
          right: 10px;
          background: gold;
          color: #333;
          font-size: 0.7rem;
          font-weight: bold;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          z-index: 2;
        }

        .tech-card-inner:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
        }

        .tech-card-header {
          position: relative;
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .tech-avatar {
          position: relative;
          width: 70px;
          height: 70px;
        }

        .tech-avatar img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid white;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .pro-badge {
          position: absolute;
          bottom: -5px;
          right: -5px;
          background: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .pro-badge svg {
          color: var(--primary);
          font-size: 1rem;
        }

        .tech-rating {
          display: flex;
          align-items: center;
          background: rgba(0, 0, 0, 0.03);
          padding: 0.5rem 0.8rem;
          border-radius: 50px;
          font-size: 0.8rem;
        }

        .star-icon {
          color: #ffc107;
          margin-right: 0.3rem;
          font-size: 1rem !important;
        }

        .jobs-count {
          opacity: 0.7;
          margin-left: 0.3rem;
          font-size: 0.8rem;
        }

        .tech-card-body {
          padding: 0 1.5rem 1.5rem;
          flex-grow: 1;
        }

        .tech-name {
          font-size: 1rem;
          font-weight: 600;
          margin: 0 0 0.7rem;
          color: var(--dark);
        }

        .tech-skills {
          margin-bottom: 1rem;
        }

        .skills-label {
          display: block;
          margin-bottom: 0.5rem;
          color: #6c757d;
          font-weight: 500;
        }

        .skills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .skill-chip {
          background: rgba(106, 17, 203, 0.1) !important;
          border-color: rgba(106, 17, 203, 0.2) !important;
          color: var(--primary) !important;
          font-size: 0.7rem !important;
          font-weight: 500 !important;
        }
        .tech-location {
          text-transform: lowercase;
          font-size: 0.9rem;
          font-weight: 600;
          margin: 0 0 0.2rem;
          color: var(--dark);
        }

        .tech-card-footer {
          display: flex;
          padding: 0 1.5rem 1.5rem;
          gap: 0.8rem;
        }

        .availability-btn {
          flex: 1;
          border-radius: 8px !important;
          text-transform: none !important;
          font-weight: 500 !important;
          border-color: rgba(0, 0, 0, 0.1) !important;
        }

        .book-btn {
          flex: 1;
          background: var(--gradient) !important;
          color: white !important;
          border-radius: 8px !important;
          text-transform: none !important;
          font-weight: 500 !important;
          box-shadow: none !important;
          transition: all 0.3s ease !important;
        }

        .book-btn:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 4px 12px rgba(106, 17, 203, 0.3) !important;
        }

        /* Availability Dialog */
        .availability-dialog .MuiPaper-root {
          border-radius: 16px !important;
          overflow: hidden;
        }

        .dialog-title {
          background: var(--gradient);
          color: white !important;
          padding: 1.5rem !important;
          font-weight: 600 !important;
        }

        .close-btn {
          position: absolute !important;
          right: 12px;
          top: 12px;
          color: white !important;
        }

        .dialog-content {
          padding: 2rem !important;
        }

        .calendar-container {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .availability-calendar {
          border: none;
          width: 100%;
          max-width: 400px;
        }

        .availability-calendar .react-calendar__tile--active {
          background: var(--primary) !important;
          color: white !important;
        }

        .availability-calendar .react-calendar__tile--now {
          background: rgba(106, 17, 203, 0.1);
        }

        .booked-dot {
          height: 6px;
          width: 6px;
          background-color: #ff4757;
          border-radius: 50%;
          margin: 2px auto;
        }

        .legend-container {
          display: flex;
          justify-content: center;
          gap: 2rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .booked-legend {
          width: 12px;
          height: 12px;
          background: #ff4757;
          border-radius: 50%;
        }

        .available-legend {
          width: 12px;
          height: 12px;
          background: #2ed573;
          border-radius: 50%;
        }

        /* Loading States */
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50vh;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 5px solid rgba(106, 17, 203, 0.1);
          border-radius: 50%;
          border-top-color: var(--primary);
          animation: spin 1s ease-in-out infinite;
        }

        .tech-skeleton {
          height: 300px;
          border-radius: 16px;
        }

        /* Error State */
        .error-alert {
          background: #ffebee;
          color: #c62828;
          padding: 1rem;
          border-radius: 8px;
          margin: 1rem;
          text-align: center;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .dashboard-container {
            padding: 1rem;
          }

          .premium-content {
            flex-direction: column;
            text-align: center;
            padding: 1.5rem 1rem;
          }

          .premium-graphic {
            position: relative;
            width: 100%;
            height: 120px;
            margin-top: 1rem;
          }

          .premium-text h2 {
            font-size: 1.5rem;
          }

          .services-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          }

          .technicians-grid {
            grid-template-columns: 1fr;
          }
        }
        /* Additional Features Section */
        .additional-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .feature-card {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
        }

        .feature-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }

        .feature-icon {
          font-size: 1.8rem !important;
          margin-right: 0.8rem;
          color: var(--primary);
        }

        .feature-header h3 {
          margin: 0;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .feature-divider {
          margin: 1rem 0 !important;
          background-color: rgba(0, 0, 0, 0.08) !important;
        }

        /* Promotions Card */
        .promotions-list {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .promotion-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: rgba(106, 17, 203, 0.05);
          border-radius: 12px;
        }

        .promotion-content {
          flex: 1;
        }

        .promotion-content h4 {
          margin: 0 0 0.5rem 0;
          font-size: 1rem;
          font-weight: 600;
        }

        .promotion-content p {
          margin: 0 0 0.5rem 0;
          font-size: 0.9rem;
          color: #555;
        }

        .promo-code {
          font-size: 0.85rem;
          color: var(--primary);
          margin-bottom: 0.3rem;
        }

        .promo-valid {
          font-size: 0.8rem;
          color: #777;
        }

        .promo-apply-btn {
          border-radius: 8px !important;
          text-transform: none !important;
          font-weight: 500 !important;
          margin-left: 1rem;
        }

        /* Bookings Card */
        .bookings-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .booking-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: rgba(56, 239, 125, 0.05);
          border-radius: 12px;
        }

        .booking-service {
          font-weight: 600;
          margin-bottom: 0.3rem;
        }

        .booking-details {
          font-size: 0.9rem;
          color: #555;
        }

        .booking-status {
          display: inline-block;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 500;
          margin-top: 0.3rem;
        }

        .booking-status.confirmed {
          background: rgba(56, 239, 125, 0.2);
          color: #11998e;
        }

        .booking-status.pending {
          background: rgba(255, 193, 7, 0.2);
          color: #ff9800;
        }

        .booking-action-btn {
          border-radius: 8px !important;
          text-transform: none !important;
          font-weight: 500 !important;
          margin-left: 1rem;
        }

        /* Reviews Card */
        .reviews-list {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .review-item {
          padding: 1rem;
          background: rgba(255, 193, 7, 0.05);
          border-radius: 12px;
        }

        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .review-technician {
          font-weight: 600;
        }

        .review-date {
          font-size: 0.8rem;
          color: #777;
        }

        .review-rating {
          margin-bottom: 0.5rem;
        }

        .review-comment {
          font-size: 0.9rem;
          color: #555;
        }

        /* View All Button */
        .view-all-btn {
          margin-top: 1rem;
          color: var(--primary) !important;
          text-transform: none !important;
          font-weight: 500 !important;
        }

        /* Tech Filter Tabs */
        .tech-filter-tabs {
          display: flex;
          gap: 0.5rem;
        }

        .tech-filter-tabs .MuiButton-root {
          text-transform: none !important;
          font-weight: 500 !important;
          border-radius: 8px !important;
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .additional-features {
            grid-template-columns: 1fr;
          }

          .tech-filter-tabs {
            margin-top: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
