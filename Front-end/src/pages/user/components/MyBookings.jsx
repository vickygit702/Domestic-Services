import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../../../redux/slices/userSlice";

const MyBookings = () => {
  const { user } = useSelector((state) => state.auth);
  const { userBookings = [] } = useSelector((state) => state.userBooks);
  const dispatch = useDispatch();
  useEffect(() => {
    const url = `http://localhost:8000/user/${user.id}/status-page/myBookings`;
    dispatch(fetchBookings(url));
  }, [dispatch]);

  const prevBook = userBookings.filter(
    (bookings) => bookings.status === "Completed"
  );
  console.log(prevBook);
  const upcomeBook = userBookings.filter(
    (bookings) => bookings.status === "Confirmed"
  );
  console.log(upcomeBook);
  // Sample data for upcoming and previous bookings

  return (
    <div style={styles.container}>
      <h2>My Bookings</h2>

      {/* Upcoming Bookings */}
      <h3>Upcoming Bookings</h3>
      <div style={styles.bookingList}>
        {upcomeBook.map((booking) => (
          <div key={booking.id} style={styles.bookingCard}>
            <p>
              <strong>Booking Date:</strong> {booking.bookeddate.start}
            </p>

            <p>
              <strong>Technician ID:</strong> {booking.technicianid}
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
        {prevBook.map((booking) => (
          <div key={booking.id} style={styles.bookingCard}>
            <p>
              <strong>Booking Date:</strong> {booking.bookeddate.start}
            </p>

            <p>
              <strong>Technician ID:</strong> {booking.technicianid}
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
