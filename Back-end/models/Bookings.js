const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
  user_id: {
    type: ObjectId,
  },
  provider_id: {
    type: ObjectId,
  },
  service_id: {
    type: ObjectId,
  },
  status: {
    type: String,
    default: "Pending",
  },
  isUrgent: {
    type: Boolean,
    default: false,
  },
  totalPrice: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Bookings", bookingSchema);
