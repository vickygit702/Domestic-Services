const axios = require("axios");
const Provider = require("../models/Provider");
const Service = require("../models/Services");
const Booking = require("../models/Bookings");

exports.fetchproviders = async (req, res) => {
  try {
    const { _id, service_name, location, isUrgent } = req.body;

    // Step 1: Find the service
    const service = await Service.findOne({ service_name: service_name });
    if (!service) return res.status(404).json({ message: "Service not found" });

    // Step 2: Find providers offering the requested service
    const providers = await Provider.find({ servicesOffered: service_name });
    if (providers.length === 0)
      return res.status(404).json({ message: "No providers available" });

    const formattedUserLocation = [location.lng, location.lat];
    const formattedProviders = providers.map((p) => ({
      id: p._id,
      location: [p.location.lng, p.location.lat], // Convert provider location
      isPro: p.isPro,
    }));

    // Step 3: Call Flask API to find the nearest provider
    const response = await axios.post("http://127.0.0.1:5000/find-provider", {
      userLocation: formattedUserLocation,
      providers: formattedProviders,
    });

    const nearestProvider = response.data.nearestProvider; // Getting nearest provider from Flask

    if (!nearestProvider)
      return res.status(500).json({ message: "No nearby provider found" });

    //Step 4: Price Calculation (consider urgency & pro providers)
    let price = service.baseRate;
    if (isUrgent) price *= service.urgencyMultiplier;
    if (nearestProvider.isPro) price *= service.proMultiplier;

    console.log("Final Price Before Saving:", price);
    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ message: "Invalid price calculation" });
    }
    const newBooking = new Booking({
      userId: _id,
      providerId: nearestProvider.id,
      serviceId: service._id,
      isUrgent,
      price,
      status: "confirmed",
    });
    await newBooking.save();

    return res
      .status(201)
      .json({ message: "Booking confirmed", booking: newBooking });
  } catch (error) {
    console.error("Booking error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
