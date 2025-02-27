const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tech_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Technicians",
    required: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Services",
    required: true,
  },
  bookingTime: { type: Date, default: Date.now },
  serviceDate: { start: Date, end: Date },

  status: {
    type: String,
    enum: ["Confirmed", "Completed", "Cancelled"],
    default: "Confirmed",
  },

  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Bookings", bookingSchema);
