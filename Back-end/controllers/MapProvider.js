const User = require("../models/User");

exports.fetchprovider = async (req, res) => {
  try {
    const serviceType = req.body.serviceType;
    const providers = await User.find({
      $and: [{ role: "provider" }, { occupation: { $eq: "serviceType" } }],
    }); // serviceType
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error occured during logging in, please try again later",
    });
  }
};
