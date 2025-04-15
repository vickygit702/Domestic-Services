const cron = require("node-cron");
const Technician = require("../models/Technicians");

cron.schedule(
  "0 0 * * *", // Runs at midnight every day
  async () => {
    try {
      const now = new Date();
      console.log(
        "🕒 Cron job running at (IST):",
        now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
      );

      // Find and remove expired slots
      const result = await Technician.updateMany(
        {},
        { $pull: { bookedSlots: { end: { $lt: now } } } }
      );

      console.log(
        `♻️ Removed expired slots from ${result.modifiedCount} technicians.`
      );
    } catch (error) {
      console.error("❌ Error:", error.message);
    }
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata", // Ensures it runs at midnight IST
  }
);
