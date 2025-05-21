const Booking = require("../models/Bookings");
const Technician = require("../models/Technicians");
const User = require("../models/User");
const Service = require("../models/Services");
const axios = require("axios");
const twilio = require("twilio"); // If using Twilio

// Initialize Twilio client (example)
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
// Book a service
exports.bookService = async (req, res) => {
  try {
    const {
      userId,
      serviceName,
      startDate,
      duration,
      userLocation,
      workDetail,
    } = req.body;

    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //const dates = getBookingDate("2025-02-25T11:00:00Z", 20);
    const dates = getBookingDate(startDate, duration);
    if (dates === "error") {
      return res
        .status(404)
        .json({ message: "Booking must start between 8 AM and 8 PM UTC" });
    }
    const { bookingStartTime, overallEndTime } = dates;
    console.log(bookingStartTime);
    // Step 1: Find available technicians for the requested service
    const availableTechnicians = await Technician.find({
      worksKnown: serviceName,
      bookedSlots: {
        $not: {
          $elemMatch: {
            $or: [
              {
                start: { $lt: overallEndTime },
                end: { $gt: bookingStartTime },
              }, // Overlapping bookings
            ],
          },
        },
      },
    });

    if (availableTechnicians.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No technicians available for the selected time slot",
        type: "warning",
      });
    }

    const formattedUserLocation = [userLocation.lng, userLocation.lat];
    const formattedTechnician = availableTechnicians.map((p) => ({
      id: p._id,
      location: [p.tech_location.lng, p.tech_location.lat],
    }));

    // Step 2: Call AI model to find the nearest technician
    const response = await axios.post(
      "https://technician-api-fmgh.onrender.com/find-technicians",
      {
        userLocation: formattedUserLocation,
        technicians: formattedTechnician,
      }
    );

    const nearestTechnician = response.data;
    const selectedTechnician = await Technician.findById(nearestTechnician.id);

    const serviceDetail = await Service.findOne({ service_name: serviceName });

    let tot_price = serviceDetail.baseRate * duration;

    console.log("Final Price Before Saving:", tot_price);
    if (isNaN(tot_price) || tot_price <= 0) {
      return res.status(400).json({ message: "Invalid price calculation" });
    }

    const newBooking = new Booking({
      user_Id: userId,
      tech_Id: selectedTechnician._id,
      ser_Id: serviceDetail._id,
      perHour: serviceDetail.baseRate,
      serviceName,
      bookedDate: {
        start: bookingStartTime,
        end: overallEndTime,
      },
      workDetail: workDetail,
      est_price: tot_price,
    });

    await newBooking.save();

    // Step 4: Update Technician Availability
    selectedTechnician.bookedSlots.push({
      start: bookingStartTime,
      end: overallEndTime,
    });
    await selectedTechnician.save();

    // 1. Get and validate the technician's phone number
    if (!selectedTechnician.tech_contact) {
      console.error("Technician contact number is missing");
      return; // Skip SMS if no number exists
    }

    let technicianPhone = String(selectedTechnician.tech_contact); // Force convert to string

    // 2. Format the number (add +91 for India)
    technicianPhone = technicianPhone.replace(/\D/g, ""); // Remove non-digits

    if (technicianPhone.length === 10) {
      technicianPhone = `+91${technicianPhone}`; // Indian number
    }
    //map location
    const lat = user.user_location.lat;
    const lng = user.user_location.lng;
    const googleMapsLink = `https://www.google.com/maps?q=${lat},${lng}`;
    // 3. Send SMS (Twilio example)
    try {
      const message = `New booking details:
        Service: ${serviceName}
        Customer: ${user.user_name}
        Contact: ${user.user_contact}
        Address: ${user.user_address}
        Date: ${bookingStartTime.toUTCString()}; 
        Work Details: ${workDetail}
        Location:${googleMapsLink}`;
      // await twilioClient.messages.create({
      //   body: message,
      //   from: process.env.TWILIO_PHONE_NUMBER,
      //   to: technicianPhone,
      // });
      console.log(" SMS sent to technician successfully", message);
    } catch (err) {
      console.error("SMS failed:", err.message);
    }
    res.status(201).json({
      success: true,
      message: "Booking successful! Your technician will contact you soon.",
      booking: newBooking,
      type: "success",
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to process booking",
      type: "error",
    });
  }
};

exports.bookServicePremiumUser = async (req, res) => {
  try {
    const {
      userId,
      technicianid,
      serviceName,
      startDate,
      duration,
      userLocation,
      workDetail,
    } = req.body;

    const user = await User.findById(userId);

    //const dates = getBookingDate("2025-02-25T11:00:00Z", 20);
    const dates = getBookingDate(startDate, duration);
    if (dates === "error") {
      return res.status(404).json({
        success: false,
        message: "Booking must start between 8 AM and 8 PM UTC",
        type: "warning",
      });
    }
    const { bookingStartTime, overallEndTime } = dates;
    console.log(bookingStartTime);
    // Step 1: Find available technicians for the requested service

    const technician = await Technician.findById(technicianid);

    if (!technician) {
      return res.status(400).json({
        success: false,
        message: "Selected technician not available",
        type: "error",
      });
    }

    const serviceDetail = await Service.findOne({ service_name: serviceName });

    let tot_price = serviceDetail.baseRate * duration;

    console.log("Final Price Before Saving:", tot_price);
    if (isNaN(tot_price) || tot_price <= 0) {
      return res.status(400).json({ message: "Invalid price calculation" });
    }

    const newBooking = new Booking({
      user_Id: userId,
      tech_Id: technician._id,
      ser_Id: serviceDetail._id,
      perHour: serviceDetail.baseRate,
      serviceName,
      perHour: serviceDetail.baseRate,

      bookedDate: {
        start: bookingStartTime,
        end: overallEndTime,
      },
      workDetail: workDetail,
      est_price: tot_price,
    });

    await newBooking.save();

    // Step 4: Update Technician Availability
    technician.bookedSlots.push({
      start: bookingStartTime,
      end: overallEndTime,
    });
    await technician.save();

    // 1. Get and validate the technician's phone number
    if (!technician.tech_contact) {
      console.error("Technician contact number is missing");
      return; // Skip SMS if no number exists
    }

    let technicianPhone = String(technician.tech_contact); // Force convert to string

    // 2. Format the number (add +91 for India)
    technicianPhone = technicianPhone.replace(/\D/g, ""); // Remove non-digits

    if (technicianPhone.length === 10) {
      technicianPhone = `+91${technicianPhone}`; // Indian number
    }
    //map location
    const lat = userLocation.lat;
    const lng = userLocation.lng;
    const googleMapsLink = `https://www.google.com/maps?q=${lat},${lng}`;
    // 3. Send SMS (Twilio example)
    try {
      const message = `New booking details:
        Service: ${serviceName}
        Customer: ${user.user_name}
        Contact: ${user.user_contact}
        Address: ${user.user_address}
        Date: ${bookingStartTime.toUTCString()}; 
        Work Details: ${workDetail}
        Location:${googleMapsLink}`;
      // await twilioClient.messages.create({
      //   body: message,
      //   from: process.env.TWILIO_PHONE_NUMBER,
      //   to: technicianPhone,
      // });
      console.log(" SMS sent to technician successfully", message);
    } catch (err) {
      console.error("SMS failed:", err.message);
    }
    res.status(201).json({
      success: true,
      message: "booking confirmed! Your technician will arrive as scheduled.",
      booking: newBooking,
      type: "success",
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to process premium booking",
      type: "error",
    });
  }
};

function getBookingDate(startDate, duration) {
  const bookingStartTime = new Date(startDate);
  const workStartHour = 8; // 8 AM
  const workEndHour = 20; // 8 PM

  // Validate booking start time (must be within working hours)
  if (
    bookingStartTime.getUTCHours() < workStartHour ||
    bookingStartTime.getUTCHours() >= workEndHour
  ) {
    return "error";
  } else {
    // Step 1: Calculate the overall end time of the booking
    let workRemaining = duration; // Total hours needed
    let currentDay = new Date(bookingStartTime);
    let overallEndTime = new Date(bookingStartTime);

    while (workRemaining > 0) {
      // Calculate available hours in the current day
      const availableHoursToday = Math.min(
        workRemaining,
        workEndHour - currentDay.getUTCHours()
      );

      // Add the available hours to the overall end time
      overallEndTime.setUTCHours(
        currentDay.getUTCHours() + availableHoursToday
      );

      // Deduct the allocated hours from remaining work
      workRemaining -= availableHoursToday;

      // Move to the next day if more work remains
      if (workRemaining > 0) {
        currentDay.setUTCDate(currentDay.getUTCDate() + 1); // Move to the next day
        currentDay.setUTCHours(workStartHour, 0, 0, 0); // Reset time to 8 AM UTC
        overallEndTime = new Date(currentDay); // Reset overallEndTime to the start of the next day
      }
    }
    const output = {
      bookingStartTime,
      overallEndTime,
    };
    return output;
  }
}
