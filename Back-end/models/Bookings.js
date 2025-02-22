const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Provider",
    required: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Services",
    required: true,
  },
  bookingDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending",
  },
  isUrgent: {
    type: Boolean,
    default: false,
  },
  price: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
});

module.exports = mongoose.model("Bookings", bookingSchema);
