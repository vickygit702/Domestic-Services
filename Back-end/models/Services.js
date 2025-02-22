const mongoose = require("mongoose");
const { Schema } = mongoose;

const servicesSchema = new Schema({
  service_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  baseRate: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    // required: true,
  },
  category: {
    type: String,
    required: true,
  },
  isUrgent: {
    type: Boolean,
    default: false,
  },
  urgencyMultiplier: { type: Number, default: 1.5 },
  proMultiplier: { type: Number, default: 1.2 },
});

module.exports = mongoose.model("Services", servicesSchema);
