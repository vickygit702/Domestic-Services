import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../../../redux/slices/userSlice";
import BookingDetailsModal from "./BookingDetailsModal";
import { useNavigate } from "react-router";
const MyBookings = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { userBookings = [] } = useSelector((state) => state.userBooks);
  const dispatch = useDispatch();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const url = `http://localhost:8000/user/${user.id}/status-page/myBookings`;
    dispatch(fetchBookings(url));
    console.log(userBookings);
  }, [dispatch]);

  const prevBook = userBookings.filter(
    (bookings) => bookings.status === "Completed"
  );

  const upcomeBook = userBookings.filter(
    (bookings) => bookings.status === "Confirmed"
  );

  // Calculate statistics
  const totalSpent = prevBook.reduce(
    (sum, booking) => sum + (booking.price || 0),
    0
  );

  const handleDetailsClick = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const favoriteService =
    prevBook.length > 0
      ? [...new Set(prevBook.map((b) => b.serviceType))].sort()[0]
      : "None yet";

  return (
    <div className="container-fluid px-4">
      {/* Statistics Cards */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3 mb-md-0">
          <div className="card border-0 shadow-sm h-100 bg-primary bg-opacity-10">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="bg-primary bg-opacity-25 rounded-circle p-3 me-3">
                  <i className="bi bi-calendar-check fs-3 text-primary"></i>
                </div>
                <div>
                  <h6 className="mb-0 text-muted">Upcoming</h6>
                  <h3 className="mb-0">{upcomeBook.length}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3 mb-md-0">
          <div className="card border-0 shadow-sm h-100 bg-success bg-opacity-10">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="bg-success bg-opacity-25 rounded-circle p-3 me-3">
                  <i className="bi bi-check-circle fs-3 text-success"></i>
                </div>
                <div>
                  <h6 className="mb-0 text-muted">Completed</h6>
                  <h3 className="mb-0">{prevBook.length}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100 bg-info bg-opacity-10">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="bg-info bg-opacity-25 rounded-circle p-3 me-3">
                  <i className="bi bi-currency-rupee fs-3 text-info"></i>
                </div>
                <div>
                  <h6 className="mb-0 text-muted">Total Spent</h6>
                  <h3 className="mb-0">₹{totalSpent.toFixed(2)}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Bookings */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white border-0">
          <h3 className="fw-bold mb-0 d-flex align-items-center">
            <i className="bi bi-calendar2-event me-2 text-primary"></i>
            Scheduled Services
          </h3>
        </div>
        <div className="card-body">
          {upcomeBook.length > 0 ? (
            <div className="row g-4">
              {upcomeBook.map((booking) => (
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
                            {new Date(
                              booking.bookeddate.start
                            ).toLocaleDateString("en-GB")}
                          </p>
                          <p className="mb-0">
                            <i className="bi bi-clock me-2 text-muted"></i>
                            {new Date(
                              booking.bookeddate.start
                            ).toLocaleTimeString("en-US", {
                              timeZone: "UTC",
                            })}
                          </p>
                        </div>
                        <div className="col-md-3">
                          <p className="mb-1">
                            <i className="bi bi-person me-2 text-muted"></i>
                            Technician #{booking.technicianid}
                          </p>
                          <p className="mb-0">
                            <i className="bi bi-cash me-2 text-muted"></i>
                            estimated amt :₹
                            {booking.est_price || "Not specified"}
                          </p>
                        </div>
                        <div className="col-md-3 text-end">
                          <span
                            className={`badge bg-${
                              booking.status === "Confirmed"
                                ? "warning"
                                : "success"
                            } text-dark p-2`}
                          >
                            {booking.status}
                          </span>
                          <button
                            className="btn btn-sm btn-outline-primary ms-2"
                            onClick={() => handleDetailsClick(booking)}
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-calendar-x fs-1 text-muted"></i>
              <h5 className="mt-3">No upcoming bookings</h5>
              <p className="text-muted">
                When you book a service, it will appear here
              </p>
              <button
                className="btn btn-primary mt-2"
                onClick={() => navigate(`/my-project/user/${user.id}`)}
              >
                Book a Service
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Previous Bookings */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-0">
          <h3 className="fw-bold mb-0 d-flex align-items-center">
            <i className="bi bi-check-circle me-2 text-success"></i>
            Service History
          </h3>
        </div>
        <div className="card-body">
          {prevBook.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Technician</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {prevBook.map((booking) => (
                    <tr key={booking.id}>
                      <td>
                        <strong>{booking.serviceType || "Service"}</strong>
                        <p className="small text-muted mb-0">
                          {booking.jobDetail}
                        </p>
                      </td>
                      <td>
                        {new Date(
                          booking.bookeddate.start
                        ).toLocaleDateString()}
                      </td>
                      <td>#{booking.technicianid}</td>
                      <td>₹{booking.price || "N/A"}</td>
                      <td>
                        {booking.rating ? (
                          <div className="text-warning">
                            {[...Array(5)].map((_, i) => (
                              <i
                                key={i}
                                className={`bi ${
                                  i < booking.rating
                                    ? "bi-star-fill"
                                    : "bi-star"
                                }`}
                              ></i>
                            ))}
                          </div>
                        ) : (
                          <button className="btn btn-sm btn-outline-warning">
                            Rate Now
                          </button>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary ms-2"
                          onClick={() => handleDetailsClick(booking)}
                        >
                          Details
                        </button>
                        <button className="btn btn-sm btn-outline-success">
                          Rebook
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-emoji-frown fs-1 text-muted"></i>
              <h5 className="mt-3">No service history yet</h5>
              <p className="text-muted">
                Your completed services will appear here
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Service Recommendations */}
      <div className="card border-0 shadow-sm mt-4">
        <div className="card-header bg-white border-0">
          <h3 className="fw-bold mb-0 d-flex align-items-center">
            <i className="bi bi-lightbulb me-2 text-warning"></i>
            Recommended For You
          </h3>
        </div>
        <div className="card-body">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center">
                  <div
                    className="bg-light bg-opacity-25 rounded-circle p-3 mb-3 mx-auto"
                    style={{ width: "80px", height: "80px" }}
                  >
                    <i className="bi bi-droplet fs-3 text-primary"></i>
                  </div>
                  <h5 className="card-title">
                    {favoriteService || "Plumbing"}
                  </h5>
                  <p className="text-muted small">
                    Based on your service history
                  </p>
                  <button className="btn btn-sm btn-primary">Book Again</button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center">
                  <div
                    className="bg-light bg-opacity-25 rounded-circle p-3 mb-3 mx-auto"
                    style={{ width: "80px", height: "80px" }}
                  >
                    <i className="bi bi-lightning fs-3 text-primary"></i>
                  </div>
                  <h5 className="card-title">Electrical</h5>
                  <p className="text-muted small">Popular in your area</p>
                  <button className="btn btn-sm btn-primary">Book Now</button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center">
                  <div
                    className="bg-light bg-opacity-25 rounded-circle p-3 mb-3 mx-auto"
                    style={{ width: "80px", height: "80px" }}
                  >
                    <i className="bi bi-fan fs-3 text-primary"></i>
                  </div>
                  <h5 className="card-title">AC Repair</h5>
                  <p className="text-muted small">Seasonal recommendation</p>
                  <button className="btn btn-sm btn-primary">Book Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BookingDetailsModal
        booking={selectedBooking}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </div>
  );
};

export default MyBookings;
