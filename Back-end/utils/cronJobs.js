const cron = require("cron");
const Technician = require("../models/Technicians");

// Run every day at midnight (00:00)
cron.schedule("0 0 * * *", async () => {
  try {
    await Technician.updateMany(
      {},
      { $pull: { bookedSlots: { end: { $lt: new Date() } } } }
    );
    console.log("Old bookings cleared, technicians' availability updated.");
  } catch (error) {
    console.error("Error clearing old bookings:", error);
  }
});
