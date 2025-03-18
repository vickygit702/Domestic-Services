import React from "react";

const MyBookings = () => {
  // Sample data for upcoming and previous bookings
  const bookings = {
    upcoming: [
      {
        id: 1,
        bookDate: "2023-10-15",
        technicianName: "John Doe",
        technicianId: "TECH123",
        rating: 4.5,
        status: "Scheduled",
        price: "$50",
      },
      {
        id: 2,
        bookDate: "2023-10-20",
        technicianName: "Jane Smith",
        technicianId: "TECH456",
        rating: 4.7,
        status: "Confirmed",
        price: "$60",
      },
    ],
    previous: [
      {
        id: 3,
        bookDate: "2023-09-25",
        technicianName: "Mike Johnson",
        technicianId: "TECH789",
        rating: 4.3,
        status: "Completed",
        price: "$45",
      },
      {
        id: 4,
        bookDate: "2023-09-30",
        technicianName: "Emily Brown",
        technicianId: "TECH101",
        rating: 4.8,
        status: "Completed",
        price: "$70",
      },
    ],
  };

  return (
    <div style={styles.container}>
      <h2>My Bookings</h2>

      {/* Upcoming Bookings */}
      <h3>Upcoming Bookings</h3>
      <div style={styles.bookingList}>
        {bookings.upcoming.map((booking) => (
          <div key={booking.id} style={styles.bookingCard}>
            <p>
              <strong>Booking Date:</strong> {booking.bookDate}
            </p>
            <p>
              <strong>Technician Name:</strong> {booking.technicianName}
            </p>
            <p>
              <strong>Technician ID:</strong> {booking.technicianId}
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {booking.rating}
            </p>
            <p>
              <strong>Status:</strong> {booking.status}
            </p>
            <p>
              <strong>Price:</strong> {booking.price}
            </p>
          </div>
        ))}
      </div>

      {/* Previous Bookings */}
      <h3>Previous Bookings</h3>
      <div style={styles.bookingList}>
        {bookings.previous.map((booking) => (
          <div key={booking.id} style={styles.bookingCard}>
            <p>
              <strong>Booking Date:</strong> {booking.bookDate}
            </p>
            <p>
              <strong>Technician Name:</strong> {booking.technicianName}
            </p>
            <p>
              <strong>Technician ID:</strong> {booking.technicianId}
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {booking.rating}
            </p>
            <p>
              <strong>Status:</strong> {booking.status}
            </p>
            <p>
              <strong>Price:</strong> {booking.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: "0px 20px",
  },
  bookingList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },
  bookingCard: {
    backgroundColor: "#f4f4f4",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "left",
  },
};

export default MyBookings;
