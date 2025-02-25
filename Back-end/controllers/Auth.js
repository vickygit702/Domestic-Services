const User = require("../models/User");
const Technician = require("../models/Technicians");

exports.signupUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    // if user already exists
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // create new user
    const createdUser = new User(req.body);
    await createdUser.save();
    res.status(201).json({ createdUser, message: "user signup success" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occured during signup, please try again later" });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // if user already exists
    if (existingUser.password === req.body.password) {
      return res.status(200).json({ message: "Login success.." });
    } else {
      return res.status(400).json({ message: "Password is incorrect" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error occured during logging in, please try again later",
    });
  }
};

exports.signupTechnician = async (req, res) => {
  try {
    const existingTechnician = await Technician.findOne({
      email: req.body.email,
    });

    // if user already exists
    if (existingTechnician) {
      return res.status(400).json({ message: "Provider already exists" });
    }
    // create new user
    const newTechnician = new Technician(req.body);
    await newTechnician.save();
    res.status(201).json({ newTechnician, message: "user signup success" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occured during signup, please try again later" });
  }
};
exports.loginTechnician = async (req, res) => {
  try {
    const existingTechnician = await Technician.findOne({
      email: req.body.email,
    });
    if (!existingTechnician) {
      return res.status(404).json({ message: "Provider not found" });
    }
    // if user already exists
    if (existingTechnician.password === req.body.password) {
      return res
        .status(200)
        .json({ existingTechnician, message: "Login success.." });
    } else {
      return res.status(400).json({ message: "Password is incorrect" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error occured during logging in, please try again later",
    });
  }
};
