const Services = require("../models/Services");

exports.getAllServices = async (req, res) => {
  try {
    const services = await Services.find({}); // Fetch *all* fields of each service

    res.status(200).json({
      serviceList: services, // Consistent key name
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({
      message: "Error fetching services",
      error: error.message,
    });
  }
};