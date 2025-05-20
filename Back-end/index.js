const express = require("express");
require("./utils/cronJobs");
require("dotenv").config();
const cors = require("cors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Booking = require("./models/Bookings");

const { connectToDB } = require("./database/db");
const authRoutes = require("./routes/Auth");
const adminRoutes = require("./routes/admin/AdminPage");
const userRoutes = require("./routes/user/userPage");
const bookingRoute = require("./routes/booking/booking-service");
const techRoute = require("./routes/technician/techPage");
const paymentRoute = require("./routes/Payment");

const server = express();
const port_prod = "https://domestic-services-backend.onrender.com";

server.post(
  "/payment/stripe-webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    console.log("signature:", sig);
    const webhookSecret = process.env.WEBHOOK_SECRET;
    console.log("webhook secret:", webhookSecret);
    const payload = req.body;
    console.log("payload:", payload.length);
    try {
      const event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
      console.log("Webhook event:", event.type);
      // Handle successful payment
      if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object;
        console.log("db updating ....");
        // Add await and error handling
        await Booking.findByIdAndUpdate(
          paymentIntent.metadata.bookingId,
          { $set: { paymentStatus: true } }, // Explicit $set
          { new: true }
        ); // Add .exec() for proper promise handling

        console.log(`Updated booking ${paymentIntent.metadata.bookingId}`);
      }

      res.status(200).end();
    } catch (err) {
      console.error(`Webhook processing failed: ${err}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
);
server.use(express.json());
server.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true, // Allow cookies and credentials
  })
);

server.use(`${port_prod}/uploads/profile`, express.static("uploads"));

server.use("/auth/api", authRoutes);
server.use("/admin", adminRoutes);
server.use("/user", userRoutes);
server.use("/service/booking", bookingRoute);
server.use("/technician", techRoute);
server.use("/payment", paymentRoute);

server.get("/", (req, res) => {
  res.status(200).json({ message: " server is running" });
});

server.listen(8000, () => {
  connectToDB();
  console.log("server is running on port 8000");
});
