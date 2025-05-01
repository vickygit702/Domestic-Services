const moment = require("moment-timezone");
const Services = require("../../models/Services");
const User = require("../../models/User");
const Bookings = require("../../models/Bookings");
const Technician = require("../../models/Technicians");

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updateObject = {};
    for (const key in data) {
      if (typeof data[key] === "object" && !Array.isArray(data[key])) {
        // Handle nested objects (e.g., user_address)
        for (const nestedKey in data[key]) {
          updateObject[`${key}.${nestedKey}`] = data[key][nestedKey];
        }
      } else {
        // Handle top-level fields (e.g., user_name, user_email)
        updateObject[key] = data[key];
      }
    }

    upd_user = await User.findByIdAndUpdate(
      id,
      { $set: updateObject },
      { new: true }
    );
    const userUptodate = {
      id: upd_user._id,
      name: upd_user.user_name,
      email: upd_user.user_email,
      password: upd_user.user_password,
      contact: upd_user.user_contact,
      address: upd_user.user_address,
      location: upd_user.user_location,
      usertype: upd_user.userType,
    };
    res
      .status(200)
      .json({ userUptodate, message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occured in server please try again later" });
  }
};

exports.allServices = async (req, res) => {
  try {
    const s_List = await Services.find();
    const servicesList = s_List.map((service) => ({
      id: service._id,
      name: service.service_name,
      desc: service.description,
      rate: service.baseRate,
      category: service.category,
      icons: service.serviceIcon,
    }));
    const categories = [...new Set(s_List.map((service) => service.category))];
    res.status(200).json({
      categories,
      servicesList,
      message: "Services fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occured in server please try again later" });
  }
};
exports.myBookings = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("Fetching bookings for user ID:", userId);
    const userBookings = await Bookings.find({
      user_Id: userId,
    })
      .populate("tech_Id", "_id tech_name tech_email tech_contact")
      .lean();
    console.log(userBookings);
    if (!userBookings || userBookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user." });
    }

    const formattedBookings = userBookings.map(formatBooking);
    return res
      .status(200)
      .json({ formattedBookings, message: "Bookings fetched successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occured in server please try again later" });
  }
};
exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.body; // Destructure from request body

    // Verify the booking belongs to the user
    const booking = await Bookings.findOneAndUpdate(
      {
        _id: bookingId,
      },
      { status: "Cancelled" },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found or doesn't belong to this user.",
      });
    }
    const { tech_Id, bookedDate } = booking;
    const { start, end } = bookedDate;

    console.log(`techid: ${tech_Id} work dates removed from db`);
    await Technician.updateOne(
      { _id: tech_Id },
      { $pull: { bookedSlots: { start, end } } }
    );

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    console.error("Cancellation error:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while cancelling booking",
      error: error.message,
    });
  }
};

exports.submitReview = async (req, res) => {
  try {
    const { bookingId, technicianId, rating, review } = req.body;
    console.log("user ratings", rating);
    // Update booking with review
    const updatedBooking = await Bookings.findByIdAndUpdate(
      bookingId,
      {
        $set: {
          userRating: rating,
          userReview: review,
        },
      },
      { new: true }
    );

    // Update technician stats
    await Technician.findByIdAndUpdate(technicianId, {
      $inc: {
        jobsCompleted: 1,
      },
    });

    // Calculate new average rating
    const technician = await Technician.findById(technicianId);

    const avgRating =
      (technician.tech_ratingAvg + rating) / technician.jobsCompleted;

    await Technician.findByIdAndUpdate(technicianId, {
      $set: { tech_ratingAvg: avgRating },
    });

    res.json({
      success: true,
      updatedBooking,
    });
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ message: "Error submitting review" });
  }
};

exports.getAllTechDetails = async (req, res) => {
  try {
    const techDetails = await Technician.find({});
    res.json({
      success: true,
      techDetails,
    });
  } catch (error) {
    console.error("Error fetching tech details:", error);
    res.status(500).json({ message: "Error fetching tech details" });
  }
};

exports.getUpcomingBookings = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("Fetching upcoming bookings for user ID:", userId);
    const upcomingBookings = await Bookings.find({
      user_Id: userId,
      status: "Confirmed",
    })
      .populate("tech_Id", "_id tech_name tech_email tech_contact")
      .lean();
    if (!upcomingBookings || upcomingBookings.length === 0) {
      return res
        .status(204)
        .json({ message: "No upcoming bookings found for this user." });
    }

    const formattedBookings = upcomingBookings.map(formatBooking);
    return res.status(200).json({
      formattedBookings,
      message: "Upcoming bookings fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occured in server please try again later" });
  }
};

exports.getRecentReviews = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("Fetching recent reviews for user ID:", userId);
    const recentReviews = await Bookings.find({
      user_Id: userId,
      status: "Completed",
    })
      .populate("tech_Id", "_id tech_name tech_email tech_contact")
      .lean();
    if (!recentReviews || recentReviews.length === 0) {
      return res
        .status(404)
        .json({ message: "No reviews found for this user." });
    }

    const formattedReviews = recentReviews.map(formatReview);
    return res.status(200).json({
      formattedReviews,
      message: "Recent reviews fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occured in server please try again later" });
  }
};

const formatReview = (review) => {
  const formatted = {
    id: review._id,

    technician: review.tech_Id,
    rating: review.userRating,
    comment: review.userReview,
    date: review.actualWorked.end,
  };
  return formatted;
};

const formatBooking = (booking) => {
  const formatted = {
    id: booking._id,
    technicianid: booking.tech_Id._id,
    technician: booking.tech_Id,
    servicename: booking.serviceName,
    bookeddate: booking.bookedDate,
    jobDetail: booking.workDetail,
    status: booking.status,
    paymentStatus: booking.paymentStatus,
    price: booking.price,
    est_price: booking.est_price,
  };

  // Format actualWorked dates if they exist
  if (booking.actualWorked) {
    formatted.actualWorked = {
      ...booking.actualWorked,
      start: booking.actualWorked.start
        ? moment(booking.actualWorked.start)
            .tz("Asia/Kolkata")
            .format("YYYY-MM-DD HH:mm:ss")
        : null,
      end: booking.actualWorked.end
        ? moment(booking.actualWorked.end)
            .tz("Asia/Kolkata")
            .format("YYYY-MM-DD HH:mm:ss")
        : null,
    };
  }

  return formatted;
};
