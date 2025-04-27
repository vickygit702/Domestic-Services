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
  category: {
    type: String,
    required: true,
  },
  icon: {   // New field for the service icon
    type: String, // We will store the file path or URL
    required: false,  // Optional
  },
});

module.exports = mongoose.model("Services", servicesSchema);
  