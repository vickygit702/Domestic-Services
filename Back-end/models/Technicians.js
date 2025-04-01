const mongoose = require("mongoose");
const { Schema } = mongoose;

const technicianSchema = new Schema({
  tech_name: {
    type: String,
    required: true,
  },
  tech_email: {
    type: String,
    unique: true,
    required: true,
  },
  tech_password: {
    type: String,
    required: true,
  },
  tech_contact: {
    type: Number,
    required: true,
  },
  tech_address: {
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
  tech_location: { type: { lat: Number, lng: Number }, required: true },
  worksKnown: [{ type: String, required: true }],
  tech_experience: {
    type: Number,
  },
  tech_ratingAvg: {
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
  profileImg: {
    type: String,
    default: "profile-tech.png",
  },
  earnings: { type: Number, default: 0 },
  bookedSlots: [
    {
      start: Date,
      end: Date,
    },
  ],
});

module.exports = mongoose.model("Technicians", technicianSchema);
