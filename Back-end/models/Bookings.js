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
  serviceName: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  bookedDate: { start: Date, end: Date },
  workDetail: { type: String },
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
