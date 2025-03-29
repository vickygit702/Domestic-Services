const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  user_name: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    unique: true,
    required: true,
  },
  user_password: {
    type: String,
    unique: true,
  },
  user_contact: {
    type: Number,
    required: true,
  },
  user_address: {
    flatNo: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
  },

  user_location: { type: { lat: Number, lng: Number }, required: true },
  userType: { type: String, enum: ["normal", "premium"], default: "normal" },
  profileImg: {
    type: String,
    default: "profile-user.png",
  },
});

module.exports = mongoose.model("User", userSchema);
