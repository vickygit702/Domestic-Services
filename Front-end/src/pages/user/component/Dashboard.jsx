import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bookService } from "../../../redux/slices/userSlice";
import { Button, Modal, Badge, Spinner, Alert } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, isSameDay } from "date-fns";
import { motion } from "framer-motion";
import './Dashboard.css'; // Import CSS for styles

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [showAvailability, setShowAvailability] = useState(false);
    const [techInfo, setTechInfo] = useState([]);
    const [tileContent, setTileContent] = useState(null);
    const [loadingTech, setLoadingTech] = useState(false);
    const [techError, setTechError] = useState(null);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedTech, setSelectedTech] = useState(null);
    const [services, setServices] = useState([]);
    const { user } = useSelector((state) => state.auth);

    // Fetch services and categories
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get("http://localhost:8000/services");
                setServices(response.data.serviceList);
            } catch (err) {
                console.error("Error fetching services:", err);
            }
        };
        fetchServices();
    }, []);

    // Fetch technicians
    useEffect(() => {
        const fetchTechnicians = async () => {
            setLoadingTech(true);
            try {
                const response = await axios.get("http://localhost:8000/technician");
                setTechInfo(response.data.techDetails);
            } catch (err) {
                setTechError("Error fetching technicians: " + err.message);
            } finally {
                setLoadingTech(false);
            }
        };
        fetchTechnicians();
    }, []);

    const handleCloseAvailability = () => setShowAvailability(false);
    const handleShowAvailability = (tech, content) => {
        setSelectedTech(tech);
        setTileContent(() => content);
        setShowAvailability(true);
    };

    const handleBooking = (tech) => {
        setSelectedTech(tech);
        setShowBookingModal(true);
    };

    const handleBookSubmit = (bookingData) => {
        dispatch(bookService(bookingData));
        setShowBookingModal(false);
    };

    const filteredCategories = [...new Set(services.map(service => service.category))];

    const TechCard = ({ tech }) => {
        const bookedDates = tech.bookedSlots?.map((slot) => new Date(slot.start)) || [];

        const tileContent = ({ date, view }) => {
            if (view === "month") {
                const isBooked = bookedDates.some((bookedDate) => isSameDay(bookedDate, date));
                return isBooked ? <div className="availability-dot booked"></div> : <div className="availability-dot available"></div>;
            }
            return null;
        };

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="business-card" // Renamed to align with inspirational template
            >
                <img
                    src={`http://localhost:8000/uploads/profile/technicians/${tech.profileImg}`}
                    alt={tech.tech_name}
                    className="business-image" // Renamed
                />
                <div className="business-details"> {/* Renamed */}
                    <span className="category-badge">Technician</span> {/* Generic badge */}
                    <h3 className="business-name">{tech.tech_name}</h3> {/* Renamed */}
                    <p className="contact-person">Rating: {tech.tech_ratingAvg?.toFixed(1)} ({tech.jobsCompleted})</p> {/* Adjusted */}
                    <p className="business-address">Skills: {tech.worksKnown?.slice(0, 3).join(', ')}</p> {/* Adjusted */}
                    <Button variant="outline-primary" className="book-button" onClick={() => handleShowAvailability(tech, tileContent)}> {/* Styled button */}
                        Availability
                    </Button>
                    <Button variant="success" className="book-button" onClick={() => handleBooking(tech)}> {/* Styled button */}
                        Book Now
                    </Button>
                </div>
            </motion.div>
        );
    };

    // Booking Modal (No significant style changes here, using Bootstrap's modal)
    const BookingModal = ({ show, onHide, selectedData }) => {
        const [bookingDetails, setBookingDetails] = useState({
            serviceDate: new Date(),
            serviceTime: "",
            serviceDescription: "",
        });
        const today = new Date(); 

        const handleSubmit = (e) => {
            e.preventDefault();
            const bookingData = {
                userId: user?._id,
                techId: selectedData?._id,
                serviceName: "Your Selected Service Name",
                startDate: bookingDetails.serviceDate.toISOString(),
                serviceTime: bookingDetails.serviceTime,
                duration: 1,
                userLocation: user?.user_location,
                workDetail: bookingDetails.serviceDescription,
            };
            handleBookSubmit(bookingData);
        };

        return (
            <Modal show={show} onHide={onHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Book {selectedData?.tech_name || 'Service'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        {/* Service Date Input */}
                        <div className="mb-3">
                            <label htmlFor="serviceDateInput" className="form-label">Service Date</label>
                            <input
                                id="serviceDateInput"
                                type="date"
                                className="form-control"
                                value={bookingDetails.serviceDate instanceof Date ? format(bookingDetails.serviceDate, "yyyy-MM-dd") : today}
                                onChange={(e) => {
                                    const newDate = e.target.value ? new Date(e.target.value + 'T00:00:00') : new Date();
                                    setBookingDetails({
                                        ...bookingDetails,
                                        serviceDate: newDate
                                    });
                                }}
                                min={today} // Prevent selecting past dates
                                required
                            />
                        </div>

                        {/* Service Time Input */}
                        <div className="mb-3">
                            <label htmlFor="serviceTimeInput" className="form-label">Service Time</label>
                            <input
                                id="serviceTimeInput"
                                type="time"
                                className="form-control"
                                value={bookingDetails.serviceTime || ''}
                                onChange={(e) => setBookingDetails({
                                    ...bookingDetails,
                                    serviceTime: e.target.value
                                })}
                                required
                            />
                        </div>

                        {/* Service Description Input */}
                        <div className="mb-3">
                            <label htmlFor="serviceDescriptionInput" className="form-label">Service Description</label>
                            <textarea
                                id="serviceDescriptionInput"
                                className="form-control"
                                rows="3"
                                value={bookingDetails.serviceDescription || ''}
                                onChange={(e) => setBookingDetails({
                                    ...bookingDetails, serviceDescription: e.target.value
                                })}
                                required
                                placeholder="Briefly describe the service needed..."
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <Button variant="primary" type="submit" className="w-100">
                            Confirm Booking
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        );
    };

    if (loadingTech) {
        return (
            <div className="home-container flex justify-center items-center h-screen"> {/* Added home-container */}
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (techError) {
        return <Alert variant="danger">{techError}</Alert>;
    }

    return (
        <div className="home-container"> {/* Main container */}
            {/* Category List Section */}
            <div className="category-section">
                <div className="category-list">
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map((category, index) => {
                            const serviceInCategory = services.find(service => service.category === category);
                            return (
                                <a key={index} className="category-item">
                                    {serviceInCategory?.icon && (
                                        <img
                                            src={`http://localhost:8000/uploads/profile/service/${serviceInCategory.icon}`}
                                            alt="category icon"
                                            className="category-icon"
                                        />
                                    )}
                                    <h2 className="category-name">{category}</h2>
                                </a>
                            );
                        })
                    ) : (
                        Array(6).fill().map((_, index) => (
                            <div key={index} className="category-skeleton"></div>
                        ))
                    )}
                </div>
            </div>

            {/* Business List Section */}
            <div className="business-section">
                <h2 className="section-title">Available Technicians</h2>
                <div className="business-grid">
                    {techInfo.length > 0 ? (
                        techInfo.map((tech) => (
                            <TechCard key={tech._id} tech={tech} />
                        ))
                    ) : (
                        Array(8).fill().map((_, index) => (
                            <div key={index} className="business-skeleton"></div>
                        ))
                    )}
                </div>
            </div>

            {/* Availability Modal */}
            <Modal show={showAvailability} onHide={handleCloseAvailability} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{selectedTech?.tech_name}'s Availability</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="flex justify-center mb-3">
                        <Calendar tileContent={tileContent} minDate={new Date()} />
                    </div>
                    <div className="flex justify-center gap-4">
                        <div className="flex items-center">
                            <div className="availability-dot booked me-2"></div>
                            <span>Booked</span>
                        </div>
                        <div className="flex items-center">
                            <div className="availability-dot available me-2"></div>
                            <span>Available</span>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Booking Modal */}
            <BookingModal
                show={showBookingModal}
                onHide={() => setShowBookingModal(false)}
                selectedData={selectedTech}
            />
        </div>
    );
};

export default Dashboard;
