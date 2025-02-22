const Services = require("../../models/Services");
const User = require("../../models/User");
const Bookings = require("../../models/Bookings");
exports.updateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occured in server please try again later" });
  }
};

exports.setPremiumUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.userType = "premium";
    await user.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occured in server please try again later" });
  }
};
exports.allServices = async (req, res) => {
  try {
    const servicesList = await Services.find();
    res
      .status(200)
      .json({ servicesList, message: "Services fetched successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occured in server please try again later" });
  }
};
exports.myBookings = async (req, res) => {
  try {
    const user = await Bookings.find({ userId: req.params.id });
    res.status(200).json({ user, message: "Bookings fetched successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occured in server please try again later" });
  }
};
