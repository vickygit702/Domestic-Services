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
});

module.exports = mongoose.model("Services", servicesSchema);
