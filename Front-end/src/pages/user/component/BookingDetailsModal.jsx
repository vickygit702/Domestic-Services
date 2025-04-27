import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap"; // ✅ Correctly importing Modal and Button
import { format } from "date-fns"; // ✅ Correctly importing format



const BookingDetailsModal = ({ show, onHide, selectedData }) => {
  const [bookingDetails, setBookingDetails] = useState({
      serviceDate: new Date(),
      serviceDescription: "",
  });
  const today = new Date();


  const handleSubmit = (e) => {
      e.preventDefault();
      const bookingData = {
          userId: user?._id,
          techId: selectedData?._id,
          serviceName: "Your Selected Service Name", // Modify accordingly
          startDate: bookingDetails.serviceDate.toISOString(),
          duration: 1, // Define the duration if needed
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
export default BookingDetailsModal;