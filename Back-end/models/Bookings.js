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
  actualWorked: {
    start: Date,
    end: Date,
  },

  workDetail: { type: String },
  status: {
    type: String,
    enum: ["Confirmed", "InProgress", "Completed", "Cancelled"],
    default: "Confirmed",
  },
  est_price: {
    type: Number,
  },
  price: {
    type: Number,
  },
  paymentStatus: { type: Boolean, default: false },
  userRating: { type: Number, min: 1, max: 5 },
  userReview: { type: String },
});

module.exports = mongoose.model("Bookings", bookingSchema);
