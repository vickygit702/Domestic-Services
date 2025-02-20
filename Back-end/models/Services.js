const mongoose = require("mongoose");
const { Schema } = mongoose;

const servicesSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  baseRate: {
    type: Number,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  },
  isUrgent: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Services", servicesSchema);
