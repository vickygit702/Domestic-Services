const User = require("../models/User");
const Technician = require("../models/Technicians");

exports.signupUser = async (req, res) => {
  try {
    const user = await User.findOne({
      user_email: req.body.user_email,
    });

    // if user already exists
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // create new user
    const createdUser = new User(req.body);
    await createdUser.save();
    const userDetail = {
      id: createdUser._id,
      password: createdUser.user_password,
      name: createdUser.user_name,
      email: createdUser.user_email,
      contact: createdUser.user_contact,
      address: createdUser.user_address,
      location: createdUser.user_location,
      usertype: createdUser.userType,
      profileImg: createdUser.profileImg,
    };
    res.status(201).json({ userDetail, message: "user signup success" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occured during signup, please try again later" });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      user_email: req.body.user_email,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // if user already exists
    if (user.user_password === req.body.user_password) {
      const userDetail = {
        id: user._id,
        name: user.user_name,
        email: user.user_email,
        password: user.user_password,
        contact: user.user_contact,
        address: user.user_address,
        location: user.user_location,
        usertype: user.userType,
        profileImg: user.profileImg,
      };
      return res.status(200).json({ userDetail, message: "Login success.." });
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
    const technician = await Technician.findOne({
      tech_email: req.body.tech_email,
    });

    // if user already exists
    if (technician) {
      return res.status(400).json({ message: "Provider already exists" });
    }
    // create new user
    const newTechnician = new Technician(req.body);
    await newTechnician.save();
    const techDetail = {
      id: newTechnician._id,
      name: newTechnician.tech_name,
      email: newTechnician.tech_email,
      password: newTechnician.tech_password,
      contact: newTechnician.tech_contact,
      address: newTechnician.tech_address,
      location: newTechnician.tech_location,
      techtype: newTechnician.isPro,
      workKnown: newTechnician.worksKnown,
      experience: newTechnician.tech_experience,
      ratingAvg: newTechnician.tech_ratingAvg,
      completions: newTechnician.jobsCompleted,
      profileImg: newTechnician.profileImg,
    };
    res.status(201).json({ techDetail, message: "user signup success" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occured during signup, please try again later" });
  }
};
exports.loginTechnician = async (req, res) => {
  try {
    const technician = await Technician.findOne({
      tech_email: req.body.tech_email,
    });
    if (!technician) {
      return res.status(404).json({ message: "Technician not found" });
    }
    // if user already exists
    if (technician.tech_password === req.body.tech_password) {
      const techDetail = {
        id: technician._id,
        name: technician.tech_name,
        email: technician.tech_email,
        password: technician.tech_password,
        contact: technician.tech_contact,
        address: technician.tech_address,
        location: technician.tech_location,
        techtype: technician.isPro,
        workKnown: technician.worksKnown,
        experience: technician.tech_experience,
        ratingAvg: technician.tech_ratingAvg,
        completions: technician.jobsCompleted,
        profileImg: technician.profileImg,
      };
      return res.status(200).json({ techDetail, message: "Login success.." });
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
