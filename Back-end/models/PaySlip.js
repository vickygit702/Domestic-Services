const mongoose = require("mongoose");

const payslipSchema = new mongoose.Schema(
  {
    payslipId: { type: String, required: true, unique: true },
    technicianId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Technicians",
      required: true,
    },
    date: { type: Date, required: true },
    period: { type: String, required: true }, // Format: "June 2023"
    paymentMethod: {
      type: String,

      dafault: "Bank Transfer",
    },
    bankAccount: { type: String, required: true },
    amount: { type: Number, required: true }, // Net pay amount
    status: {
      type: String,
      required: true,
    },
    earningData: [
      {
        jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Bookings" },
        jobName: String,
        workDate: Date,
        amount: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payslip", payslipSchema);
