const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
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
  rating: {
    type: Number,
  },
  review: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Reviews", reviewSchema);
