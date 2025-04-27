import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import BookingDetailsModal from './BookingDetailsModal'; // Import the other modal component

const BookingDialogBox = ({ isOpen, onClose, selectedData, user, onBookSubmit, type }) => {
  const [bookData, setBookData] = useState({
    startDate: '',
    duration: 1,
    workDetail: '',
    selectedService: '',
  });

  const [bookingDetails, setBookingDetails] = useState(null); // Track booking details

  useEffect(() => {
    if (selectedData) {
      setBookData({ ...bookData, selectedService: type === 'technician' ? '' : bookData.selectedService });
    }
  }, [selectedData, type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleServiceSelect = (service) => {
    setBookData({ ...bookData, selectedService: service });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === 'technician' && !bookData.selectedService) {
      alert('Please select a service');
      return;
    }

    const baseBookingData = {
      userId: user?.id,
      startDate: bookData.startDate ? `${bookData.startDate}:00Z` : '',
      duration: parseInt(bookData.duration, 10) || 1,
      workDetail: bookData.workDetail,
    };

    const bookingData = {
      ...baseBookingData,
      ...(type === 'service'
        ? {
            serviceName: selectedData?.name,
            technicianName: selectedData?.technicianName,
            userLocation: {
              lat: user?.location?.lat,
              lng: user?.location?.lng,
            },
          }
        : {
            technicianid: selectedData?._id,
            serviceName: bookData.selectedService,
            technicianName: selectedData?.name,
            userLocation: {
              lat: user?.location?.lat,
              lng: user?.location?.lng,
            },
          }),
    };

    onBookSubmit(bookingData);  // Pass booking data to the parent
    setBookingDetails(bookingData);  // Set booking details for the details modal
    onClose();  // Close the booking dialog box
  };

  return (
    <>
      <Modal show={isOpen} onHide={onClose} centered dialogClassName="luxury-modal">
        <Modal.Header closeButton className="luxury-modal-header">
          <Modal.Title>Booking {type === 'service' ? selectedData?.name : selectedData?.technicianName}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="luxury-modal-body">
          <form onSubmit={handleSubmit}>
            {/* Form fields for booking */}
            <div className="luxury-form-group">
              <label>Date & Time</label>
              <input
                type="datetime-local"
                className="luxury-form-control"
                name="startDate"
                value={bookData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            {/* Duration */}
            <div className="luxury-form-group">
              <label>Duration</label>
              <input
                type="number"
                className="luxury-form-control"
                name="duration"
                value={bookData.duration}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            {/* Service selection (only for technician type) */}
            {type === 'technician' && selectedData?.worksKnown && (
              <div className="luxury-form-group">
                <label>Select Service</label>
                <div className="d-flex flex-wrap gap-2">
                  {selectedData.worksKnown.map((skill, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`luxury-btn ${bookData.selectedService === skill ? 'luxury-btn-primary' : 'luxury-btn-outline'}`}
                      onClick={() => handleServiceSelect(skill)}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Work detail */}
            <div className="luxury-form-group">
              <label>Work Detail</label>
              <textarea
                className="luxury-form-control"
                name="workDetail"
                rows="4"
                value={bookData.workDetail}
                onChange={handleChange}
                placeholder="Describe the work required"
              />
            </div>

            {/* Submit button */}
            <button type="submit" className="luxury-btn luxury-btn-primary">
              Confirm Booking
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Show the booking details modal */}
      <BookingDetailsModal
        isOpen={bookingDetails !== null}  // If there are booking details, show the modal
        onClose={() => setBookingDetails(null)}  // Close the details modal
        bookingDetails={bookingDetails}
      />
    </>
  );
};

export default BookingDialogBox;
