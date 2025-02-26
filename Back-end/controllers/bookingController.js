const Booking = require("../models/Bookings");
const Technician = require("../models/Technicians");
const axios = require("axios");

// Book a service
exports.bookService = async (req, res) => {
  try {
    const { userId, serviceName, bookingDate, duration, userLocation } =
      req.body;

    // Step 1: Find available technicians for the requested service
    const availableTechnicians = await Technician.find({
      servicesOffered: serviceName,
    });

    if (availableTechnicians.length === 0) {
      return res.status(400).json({ message: "No technicians available" });
    }

    const formattedUserLocation = [userLocation.lng, userLocation.lat];
    const formattedTechnician = availableTechnicians.map((p) => ({
      id: p._id,
      location: [p.location.lng, p.location.lat],
    }));

    // Step 2: Call AI model to find the nearest technician
    const response = await axios.post("http://127.0.0.1:5000/find-provider", {
      formattedUserLocation,
      formattedTechnician,
    });

    const nearestTechnicianId = response.data.nearestProviderId;
    const selectedTechnician = await Technician.findById(nearestTechnicianId);

    if (!selectedTechnician) {
      return res.status(400).json({ message: "No nearby technician found" });
    }

    // Step 3: Create Booking
    const endDate = new Date(bookingDate);
    endDate.setDate(endDate.getDate() + duration);

    const newBooking = new Booking({
      userId,
      technicianId: selectedTechnician._id,
      serviceName,
      bookingDate,
      duration,
      endDate,
      price: selectedTechnician.baseRate * duration,
      status: "Confirmed",
    });

    await newBooking.save();

    // Step 4: Update Technician Availability
    selectedTechnician.bookedSlots.push({ start: bookingDate, end: endDate });
    await selectedTechnician.save();

    res
      .status(201)
      .json({ message: "Booking successful", booking: newBooking });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
