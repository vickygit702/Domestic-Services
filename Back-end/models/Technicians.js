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

  tech_location: { type: { lat: Number, lng: Number }, required: true },
  worksKnown: [{ type: String, required: true }],
  tech_experience: {
    type: Number,
  },
  tech_ratingAvg: {
    type: Number,
  },
  jobsCompleted: {
    type: Number,
    default: 0,
  },
  isPro: {
    type: Boolean,
    default: false,
  },
  bookedSlots: [
    {
      startTime: Date,
      endTime: Date,
    },
  ],
});

module.exports = mongoose.model("Technicians", technicianSchema);
