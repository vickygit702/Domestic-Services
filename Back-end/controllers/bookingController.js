const Booking = require("../models/Bookings");
const Technician = require("../models/Technicians");
const Service = require("../models/Services");
const axios = require("axios");

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

    //const dates = getBookingDate("2025-02-25T11:00:00Z", 20);
    const dates = getBookingDate(startDate, duration);
    if (dates === "error") {
      return res
        .status(404)
        .json({ message: "Booking must start between 8 AM and 8 PM UTC" });
    }
    const { bookingStartTime, overallEndTime } = dates;

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
      return res.status(400).json({ message: "No technicians available" });
    }

    const formattedUserLocation = [userLocation.lng, userLocation.lat];
    const formattedTechnician = availableTechnicians.map((p) => ({
      id: p._id,
      location: [p.tech_location.lng, p.tech_location.lat],
    }));

    // Step 2: Call AI model to find the nearest technician
    const response = await axios.post(
      "http://127.0.0.1:5000/find-technicians",
      {
        userLocation: formattedUserLocation,
        technicians: formattedTechnician,
      }
    );

    const nearestTechnician = response.data;
    const selectedTechnician = await Technician.findById(nearestTechnician.id);

    if (!selectedTechnician) {
      return res.status(400).json({ message: "invalid technician detail" });
    }

    const serviceDetail = await Service.findOne({ service_name: serviceName });

    let tot_price = serviceDetail.baseRate;

    if (selectedTechnician.isPro) {
      tot_price *= 1.2;
    } else {
      tot_price *= 1;
    }
    console.log("Final Price Before Saving:", tot_price);
    if (isNaN(tot_price) || tot_price <= 0) {
      return res.status(400).json({ message: "Invalid price calculation" });
    }

    const newBooking = new Booking({
      user_Id: userId,
      tech_Id: selectedTechnician._id,
      serviceName,
      bookedDate: {
        start: bookingStartTime,
        end: overallEndTime,
      },
      workDetail: workDetail,
      price: tot_price,
    });

    await newBooking.save();

    // Step 4: Update Technician Availability
    selectedTechnician.bookedSlots.push({
      start: bookingStartTime,
      end: overallEndTime,
    });
    await selectedTechnician.save();

    res
      .status(201)
      .json({ message: "Booking successful", booking: newBooking });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Internal server error" });
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
