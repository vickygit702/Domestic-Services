const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  user_id: {
    type: ObjectId,
  },
  provider_id: {
    type: ObjectId,
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
