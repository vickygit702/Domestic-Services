const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
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
  },
  contact: {
    type: Number,
    required: true,
  },
  location: { type: { lat: Number, lng: Number }, required: true },
  userType: { type: String, enum: ["normal", "premium"], default: "normal" },

  isVerified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
