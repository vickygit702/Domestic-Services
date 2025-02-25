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
  bookingDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  duration: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Confirmed", "Completed", "Cancelled"],
    default: "Confirmed",
  },
  isUrgent: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Bookings", bookingSchema);
