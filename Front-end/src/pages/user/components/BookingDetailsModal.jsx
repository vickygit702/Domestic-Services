import { Modal, Button } from "react-bootstrap";
import { motion } from "framer-motion";

const BookingDetailsModal = ({ booking, show, onHide }) => {
  if (!booking) return null;
  let durationMs;
  if (booking.status === "Completed") {
    durationMs = Math.abs(
      new Date(booking.actualWorked.end).getTime() -
        new Date(booking.actualWorked.start).getTime()
    );
  } else {
    durationMs = Math.abs(
      new Date(booking.bookeddate.end).getTime() -
        new Date(booking.bookeddate.start).getTime()
    );
  }

  console.log(durationMs); // Duration in milliseconds

  // More useful formatted versions:
  const durationMinutes = Math.floor(durationMs / (1000 * 60));
  const durationHrs = (durationMs / (1000 * 60 * 60)).toFixed(2);

  console.log(`Duration: ${durationMinutes} minutes`);
  console.log(`Duration: ${durationHrs} hours`);
  const basePrice =
    booking.status === "Completed" ? booking.price : booking.est_price;
  const platformFee = basePrice * 0.2;
  const totalAmount = basePrice + platformFee;
  const durationHours = durationHrs; // booking.duration -  update actual duration

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      backdrop="static"
      className="premium-modal"
    >
      {/* Animated Header with gradient */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 0.1 }}
      >
        <Modal.Header
          closeButton
          className="bg-gradient-primary text-white border-0"
        >
          <Modal.Title className="d-flex align-items-center">
            <i className="bi bi-receipt-cutoff me-3 fs-1"></i>
            <div>
              <p className="mb-0 fw-bold ">Booking Summary</p>
              <small className="opacity-75">#{booking.id}</small>
            </div>
          </Modal.Title>
        </Modal.Header>
      </motion.div>

      <Modal.Body className="py-2">
        {/* Service Card */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="card border-0 shadow-sm mb-2"
        >
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-2 text-center">
                <div className="bg-primary bg-opacity-10 rounded-circle p-1 d-inline-flex">
                  <i className="bi bi-tools fs-3 text-primary"></i>
                </div>
              </div>
              <div className="col-md-7">
                <h5 className="fw-bold mb-1">{booking.servicename}</h5>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  <span className="badge bg-light text-dark">
                    <i className="bi bi-calendar me-1"></i>
                    {booking.status === "Completed" ? (
                      <>
                        {new Date(
                          booking.actualWorked.start
                        ).toLocaleDateString("en-GB")}
                        {" to "}
                        {new Date(booking.actualWorked.end).toLocaleDateString(
                          "en-GB"
                        )}

                        {/* {new Date(
                                    booking.actualWorked.start
                                  ).toLocaleTimeString("en-US", {
                                    // timeZone: "UTC",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                  -
                                  {new Date(
                                    booking.actualWorked.end
                                  ).toLocaleTimeString("en-US", {
                                    // timeZone: "UTC",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}{" "} */}
                      </>
                    ) : booking.status === "InProgress" ||
                      booking.status === "Cancelled" ||
                      booking.status === "Confirmed" ? (
                      <>
                        {new Date(booking.bookeddate.start).toLocaleDateString(
                          "en-GB"
                        )}
                        {" to "}
                        {new Date(booking.bookeddate.end).toLocaleDateString(
                          "en-GB"
                        )}
                      </>
                    ) : null}
                  </span>
                  <span className="badge bg-light text-dark">
                    <i className="bi bi-clock me-1"></i>
                    {booking.status === "Completed" ? (
                      <>
                        {new Date(
                          booking.actualWorked.start
                        ).toLocaleTimeString("en-US", {
                          // timeZone: "UTC",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        -
                        {new Date(booking.actualWorked.end).toLocaleTimeString(
                          "en-US",
                          {
                            // timeZone: "UTC",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}{" "}
                      </>
                    ) : booking.status === "InProgress" ||
                      booking.status === "Cancelled" ||
                      booking.status === "Confirmed" ? (
                      <>
                        {new Date(booking.bookeddate.start).toLocaleTimeString(
                          "en-US",
                          {
                            timeZone: "UTC",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                        {" to "}

                        {new Date(booking.bookeddate.end).toLocaleTimeString(
                          "en-US",
                          {
                            timeZone: "UTC",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </>
                    ) : null}
                  </span>
                  <span className="badge bg-light text-dark">
                    <i className="bi bi-person me-1"></i>
                    Tech #{booking.technicianid}
                  </span>
                </div>
              </div>
              <div className="col-md-3 text-end">
                <span
                  className={`badge rounded-pill py-2 px-3 fw-medium ${
                    booking.status === "Confirmed"
                      ? "bg-warning text-dark"
                      : "bg-success text-white"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pricing Breakdown */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="card border-0 shadow-sm mb-2"
        >
          <div className="card-header bg-white border-0">
            <h6 className="mb-0 fw-bold">
              <i className="bi bi-credit-card me-2"></i>
              Payment Details
            </h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Description</th>
                    <th className="text-end">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Base Service Fee ({durationHours} hrs)</td>
                    <td className="text-end">{basePrice.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="d-flex align-items-center">
                        Platform Fee (20%)
                        <i
                          className="bi bi-info-circle ms-2"
                          data-bs-toggle="tooltip"
                          title="Includes service charges and support"
                        ></i>
                      </span>
                    </td>
                    <td className="text-end">{platformFee.toFixed(2)}</td>
                  </tr>
                  <tr className="border-top">
                    <td className="fw-bold">Total Amount</td>
                    <td className="text-end fw-bold">
                      {totalAmount.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="row g-3"
        >
          <div className="col-md-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h6 className="fw-bold mb-2">
                  <i className="bi bi-info-circle me-2 text-primary"></i>
                  Service Details
                </h6>
                <p className="mb-2 ">
                  <i className="bi bi-journal-text me-2 text-muted"></i>
                  {booking.jobDetail || "No additional details provided"}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h6 className="fw-bold mb-2">
                  <i className="bi bi-shield-check me-2 text-success"></i>
                  Premium Benefits
                </h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    24/7 Priority Support
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Service Guarantee
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    Free Rescheduling
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </Modal.Body>

      <Modal.Footer className="border-0">
        <motion.div
          className="w-100 d-flex justify-content-between"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <button className="btn btn-outline-secondary" onClick={onHide}>
            Close
          </button>
          <div>
            {/* <button className="btn btn-primary me-2">
              <i className="bi bi-printer me-2"></i>
              Print Receipt
            </button> */}
            <button className="btn btn-success">
              <i className="bi bi-chat-text me-2"></i>
              Contact Support
            </button>
          </div>
        </motion.div>
      </Modal.Footer>
      <style jsx>{`
        .premium-modal {
          --modal-border-radius: 12px;
          --primary-gradient: linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%);
        }

        .premium-modal .modal-content {
          border-radius: var(--modal-border-radius);
          overflow: hidden;
          border: none;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }

        .premium-modal .modal-header {
          background: var(--primary-gradient);
          padding: 1rem;
        }
        .premium-modal .table thead {
          font-size: 1rem;
        }
        .premium-modal .table tbody {
          font-size: 0.8rem;
        }
        .premium-modal .modal-body {
          padding: 1rem;
        }

        .premium-modal .card {
          border-radius: 10px !important;
          transition: transform 0.3s ease;
        }

        .premium-modal .card:hover {
          transform: translateY(-3px);
        }
      `}</style>
    </Modal>
  );
};

export default BookingDetailsModal;
