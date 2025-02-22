const User = require("../models/User");
const Provider = require("../models/Provider");

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

exports.signupProvider = async (req, res) => {
  try {
    const existingProvider = await Provider.findOne({ email: req.body.email });

    // if user already exists
    if (existingProvider) {
      return res.status(400).json({ message: "Provider already exists" });
    }
    // create new user
    const createdProvider = new Provider(req.body);
    await createdProvider.save();
    res.status(201).json({ createdProvider, message: "user signup success" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occured during signup, please try again later" });
  }
};
exports.loginProvider = async (req, res) => {
  try {
    const existingProvider = await Provider.findOne({ email: req.body.email });
    if (!existingProvider) {
      return res.status(404).json({ message: "Provider not found" });
    }
    // if user already exists
    if (existingProvider.password === req.body.password) {
      return res
        .status(200)
        .json({ existingProvider, message: "Login success.." });
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
