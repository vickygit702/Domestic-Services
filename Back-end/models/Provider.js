const mongoose = require("mongoose");
const { Schema } = mongoose;

const providerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  location: {
    type: "Point",
    coordinates: [Number, Number],
  },
  worksKnown: {
    type: Array,
    default: [],
  },
  experience: {
    type: Number,
    default: 0,
  },
  ratingAvg: {
    type: Number,
    default: 0,
  },
  jobsCompleted: {
    type: Number,
    default: 0,
  },
  isPro: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Provider", providerSchema);
