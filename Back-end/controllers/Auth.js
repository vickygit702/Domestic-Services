const User = require("../models/User");

exports.signup = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    // if user already exists
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // create new user
    const createdUser = new User(req.body);
    await createdUser.save();
    res.status(201).json({ message: "user signup success" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occured during signup, please try again later" });
  }
};
exports.login = async (req, res) => {
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
