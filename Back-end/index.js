const express = require("express");
require("./utils/cronJobs");
const cors = require("cors");

const { connectToDB } = require("./database/db");
const authRoutes = require("./routes/Auth");
const adminRoutes = require("./routes/admin/AdminPage");
const userRoutes = require("./routes/user/userPage");
const bookingRoute = require("./routes/booking/booking-service");
const techRoute = require("./routes/technician/techPage");

const server = express();

server.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true, // Allow cookies and credentials
  })
);

server.use(express.json());
server.use("/uploads/profile", express.static("uploads"));

server.use("/auth/api", authRoutes);
server.use("/admin", adminRoutes);
server.use("/user", userRoutes);
server.use("/service/booking", bookingRoute);
server.use("/technician", techRoute);

server.get("/", (req, res) => {
  res.status(200).json({ message: " server is running" });
});

server.listen(8000, () => {
  connectToDB();
  console.log("server is running on port 8000");
});
