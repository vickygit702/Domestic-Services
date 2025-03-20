const Services = require("../../models/Services");
const User = require("../../models/User");
const Bookings = require("../../models/Bookings");

exports.updateUser = async (req, res) => {
  try {
    upd_user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ upd_user, message: "User updated successfully" });
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
    });
    console.log(userBookings);
    if (!userBookings || userBookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user." });
    }

    // Format the response
    const formattedBookings = userBookings.map((booking) => ({
      id: booking._id,
      technicianid: booking.tech_Id,
      servicename: booking.serviceName,
      bookeddate: booking.bookedDate,
      status: booking.status,
      price: booking.price,
    }));

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
