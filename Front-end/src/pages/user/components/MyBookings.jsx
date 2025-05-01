import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings, cancelBookings } from "../../../redux/slices/userSlice";
import BookingDetailsModal from "./BookingDetailsModal";
import PaymentModal from "./PaymentModal";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const MyBookings = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const {
    userBookings = [],
    clearMessage,
    message,
  } = useSelector((state) => state.userBooks);
  const dispatch = useDispatch();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);

  const refreshBookings = useCallback(() => {
    const url = `http://localhost:8000/user/${user.id}/status-page/myBookings`;
    dispatch(fetchBookings(url));
  }, [dispatch, user.id]);

  useEffect(() => {
    refreshBookings();
  }, [refreshBookings]);

  // Categorize bookings by status
  const bookings = {
    inProgress: userBookings.filter((b) => b.status === "InProgress"),
    upcoming: userBookings.filter((b) => b.status === "Confirmed"),
    completed: userBookings.filter((b) => b.status === "Completed"),
    cancelled: userBookings.filter((b) => b.status === "Cancelled"),
  };

  // Statistics
  const stats = {
    totalSpent: bookings.completed.reduce((sum, b) => sum + (b.price || 0), 0),
    favoriteService:
      bookings.completed.length > 0
        ? [...new Set(bookings.completed.map((b) => b.serviceType))].sort()[0]
        : "None yet",
  };

  const handleDetailsClick = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        const url = `http://localhost:8000/user/${user.id}/status-page/cancel`;
        await dispatch(cancelBookings({ url, bookingId })).unwrap();
        refreshBookings(); // Refresh after cancellation
      } catch (error) {
        console.error("Cancellation failed:", error);
      }
    }
  };
  const handleMakePayment = (booking) => {
    setCurrentBooking(booking);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    // Optionally refresh bookings
    refreshBookings();
  };
  useEffect(() => {
    if (message) {
      const toastConfig = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      };

      if (typeof message === "string") {
        toast.success(message, toastConfig);
      } else if (message.type) {
        switch (message.type) {
          case "success":
            toast.success(message.text, toastConfig);
            break;
          case "error":
            toast.error(message.text, toastConfig);
            break;
          case "warning":
            toast.warn(message.text, toastConfig);
            break;
          default:
            toast.info(message.text, toastConfig);
        }
      }

      // Clear the message after displaying
      dispatch(clearMessage());
    }
  }, [message, dispatch]);

  return (
    <div className="container-fluid px-4">
      {/* Statistics Cards */}
      <div className="row mb-4">
        {[
          {
            title: "In Progress",
            count: bookings.inProgress.length,
            icon: "bi-hourglass-split",
            color: "info",
          },
          {
            title: "Upcoming",
            count: bookings.upcoming.length,
            icon: "bi-calendar-check",
            color: "primary",
          },
          {
            title: "Completed",
            count: bookings.completed.length,
            icon: "bi-check-circle",
            color: "success",
          },
          {
            title: "Cancelled",
            count: bookings.cancelled.length,
            icon: "bi-x-circle",
            color: "danger",
          },
        ].map((stat, index) => (
          <div key={index} className="col-md-3 mb-3 mb-md-0">
            <div
              className={`card border-0 shadow-sm h-100 bg-${stat.color} bg-opacity-10`}
            >
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div
                    className={`bg-${stat.color} bg-opacity-25 rounded-circle p-3 me-3`}
                  >
                    <i
                      className={`bi ${stat.icon} fs-3 text-${stat.color}`}
                    ></i>
                  </div>
                  <div>
                    <h6 className="mb-0 text-muted">{stat.title}</h6>
                    <h3 className="mb-0">{stat.count}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Sections */}
      {[
        {
          title: "In Progress",
          icon: "bi-hourglass-split",
          color: "info",
          bookings: bookings.inProgress,
        },
        {
          title: "Upcoming Services",
          icon: "bi-calendar2-event",
          color: "primary",
          bookings: bookings.upcoming,
          showCancelButton: true,
        },
        {
          title: "Completed Services",
          icon: "bi-check-circle",
          color: "success",
          bookings: bookings.completed,
          showPaymentButton: true,
        },
        {
          title: "Cancelled Services",
          icon: "bi-x-circle",
          color: "danger",
          bookings: bookings.cancelled,
        },
      ].map((section, sectionIndex) => (
        <div key={sectionIndex} className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-white border-0">
            <h3 className="fw-bold mb-0 d-flex align-items-center">
              <i
                className={`bi ${section.icon} me-2 text-${section.color}`}
              ></i>
              {section.title}
            </h3>
          </div>
          <div className="card-body">
            {section.bookings.length > 0 ? (
              <div className="row g-4">
                {section.bookings.map((booking) => (
                  <div key={booking.id} className="col-12">
                    <div className="card border-0 shadow-sm hover-shadow">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-md-3">
                            <h5 className="fw-bold mb-1">
                              {booking.servicename || "Service"}
                            </h5>
                            <small className="text-muted">#{booking.id}</small>
                          </div>
                          <div className="col-md-3">
                            <p className="mb-1">
                              <i className="bi bi-calendar me-2 text-muted"></i>
                              {booking.status === "Completed" ? (
                                <>
                                  {new Date(
                                    booking.actualWorked.start
                                  ).toLocaleDateString("en-GB")}
                                  {" to "}
                                  {new Date(
                                    booking.actualWorked.end
                                  ).toLocaleDateString("en-GB")}
                                </>
                              ) : booking.status === "InProgress" ||
                                booking.status === "Cancelled" ||
                                booking.status === "Confirmed" ? (
                                <>
                                  {new Date(
                                    booking.bookeddate.start
                                  ).toLocaleDateString("en-GB")}
                                  {" to "}
                                  {new Date(
                                    booking.bookeddate.end
                                  ).toLocaleDateString("en-GB")}
                                </>
                              ) : null}
                            </p>
                            <p className="mb-0">
                              <i className="bi bi-clock me-2 text-muted"></i>
                              {booking.status === "Completed" ? (
                                <>
                                  {new Date(
                                    booking.actualWorked.start
                                  ).toLocaleTimeString("en-US", {
                                    // timeZone: "UTC",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                  {" to "}

                                  {new Date(
                                    booking.actualWorked.end
                                  ).toLocaleTimeString("en-US", {
                                    // timeZone: "UTC",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </>
                              ) : booking.status === "InProgress" ||
                                booking.status === "Cancelled" ||
                                booking.status === "Confirmed" ? (
                                <>
                                  {new Date(
                                    booking.bookeddate.start
                                  ).toLocaleTimeString("en-US", {
                                    timeZone: "UTC",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                  {" to "}

                                  {new Date(
                                    booking.bookeddate.end
                                  ).toLocaleTimeString("en-US", {
                                    timeZone: "UTC",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </>
                              ) : null}
                            </p>
                          </div>
                          <div className="col-md-3">
                            <p className="mb-0">
                              <i className="bi bi-person me-2 text-muted"></i>
                              Technician #{booking.technician.tech_name}
                            </p>
                          </div>
                          <div className="d-flex flex-column gap-2 col-md-3 text-end">
                            <button
                              className="btn btn-sm btn-outline-primary ms-2"
                              onClick={() => handleDetailsClick(booking)}
                            >
                              Details
                            </button>
                            {section.showCancelButton && (
                              <button
                                className="btn btn-sm btn-outline-danger ms-2"
                                onClick={() => handleCancelBooking(booking.id)}
                              >
                                Cancel
                              </button>
                            )}
                            {section.showPaymentButton &&
                              booking.paymentStatus === false && (
                                <button
                                  className="btn btn-sm btn-success ms-2"
                                  onClick={() => handleMakePayment(booking)}
                                >
                                  Make Payment
                                </button>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <i
                  className={`bi ${
                    section.icon === "bi-hourglass-split"
                      ? "bi-hourglass"
                      : section.icon
                  } fs-1 text-muted`}
                ></i>
                <h5 className="mt-3">No {section.title.toLowerCase()}</h5>
                <p className="text-muted">
                  {section.title === "Upcoming Services"
                    ? "When you book a service, it will appear here"
                    : `Your ${section.title.toLowerCase()} will appear here`}
                </p>
                {section.title === "Upcoming Services" && (
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => navigate(`/my-project/user/${user.id}`)}
                  >
                    Book a Service
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
      {currentBooking && (
        <PaymentModal
          booking={currentBooking}
          show={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
      {/* Booking Details Modal */}
      <BookingDetailsModal
        booking={selectedBooking}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </div>
  );
};

export default MyBookings;
